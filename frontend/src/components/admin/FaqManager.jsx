import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  CircularProgress,
  Chip,
  InputAdornment,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  QuestionAnswer as QuestionIcon,
  Info as HelpIcon,
  CheckCircle as AnsweredIcon,
  Home as PropertyIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const FaqManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [propertiesList, setPropertiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [formData, setFormData] = useState({
    propertyId: '',
    question: '',
    answer: ''
  });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/faqs`, {
        params: {
          search: searchTerm,
          page: page + 1,
          limit: rowsPerPage
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setFaqs(response.data.faqs);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error(error.response?.data?.error || 'Error fetching FAQs');
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/properties`, {
        params: { limit: 1000 }
      });
      setPropertiesList(response.data.properties || []);
    } catch (error) {
      console.error('Error fetching properties list:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchFaqs();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleDelete = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/api/admin/faqs/${id}/toggle-delete`,
        { isDeleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`FAQ ${!currentStatus ? 'hidden' : 'activated'} successfully`);
      fetchFaqs();
    } catch (error) {
      toast.error('Error updating FAQ status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this FAQ?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/admin/faqs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('FAQ deleted permanently');
        fetchFaqs();
      } catch (error) {
        toast.error('Error deleting FAQ');
      }
    }
  };

  const handleOpen = (faq = null) => {
    if (faq) {
      setEditingId(faq.id);
      setEditingFaq(faq);
      setFormData({
        propertyId: faq.propertyId || '',
        question: faq.question || '',
        answer: faq.answer === 'Coming Soon...' ? '' : faq.answer || ''
      });
    } else {
      setEditingId(null);
      setEditingFaq(null);
      setFormData({
        propertyId: propertiesList.length > 0 ? propertiesList[0].id : '',
        question: '',
        answer: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.propertyId || !formData.question || !formData.answer) {
      toast.error('Property, Question, and Answer are all required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/faqs/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('FAQ updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/faqs`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('FAQ added successfully');
      }
      handleClose();
      fetchFaqs();
    } catch (error) {
      toast.error(error.response?.data?.error || `Error ${editingId ? 'updating' : 'adding'} FAQ`);
    }
  };

  const isPendingAnswer = (answer) => {
    return !answer || answer.trim() === 'Coming Soon...';
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <QuestionIcon sx={{ color: '#6a11cb', fontSize: 36 }} /> FAQ Manager
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            Answer user questions, manage property FAQs, and control visibility on listings
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#6a11cb',
            borderRadius: '10px',
            px: 3,
            py: 1.2,
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(106, 17, 203, 0.4)',
            '&:hover': { bgcolor: '#2575fc' }
          }}
          onClick={() => handleOpen()}
        >
          Add New FAQ
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search questions or answers..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              )
            }
          }}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, width: '25%' }}>Property</TableCell>
              <TableCell sx={{ fontWeight: 700, width: '35%' }}>Question & Answer</TableCell>
              <TableCell sx={{ fontWeight: 700, width: '15%' }}>Answer Status</TableCell>
              <TableCell sx={{ fontWeight: 700, width: '12%' }}>Visibility</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, width: '13%' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && faqs.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : faqs.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><Typography sx={{ py: 4, color: 'text.secondary' }}>No FAQs found</Typography></TableCell></TableRow>
            ) : faqs.map((faq) => {
              const pending = isPendingAnswer(faq.answer);
              return (
                <TableRow key={faq.id} hover sx={{ transition: '0.2s', opacity: faq.isDeleted ? 0.6 : 1 }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <PropertyIcon sx={{ color: '#8e44ad' }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                          {faq.property?.title || `Property #${faq.propertyId}`}
                        </Typography>
                        {faq.property?.location && (
                          <Typography variant="caption" color="textSecondary">
                            {faq.property.location}, {faq.property.city}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ my: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 0.7, mb: 0.5 }}>
                        <HelpIcon sx={{ fontSize: 16, color: '#e67e22' }} /> {faq.question}
                      </Typography>
                      <Typography variant="body2" sx={{ color: pending ? '#e74c3c' : '#555', fontStyle: pending ? 'italic' : 'normal', pl: 2, borderLeft: '2px solid', borderColor: pending ? '#e74c3c' : '#2ecc71' }}>
                        {pending ? 'Pending Admin Answer...' : faq.answer}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {pending ? (
                      <Chip
                        icon={<HelpIcon sx={{ fontSize: '1rem !important', color: '#d97706 !important' }} />}
                        label="Needs Answer"
                        size="small"
                        sx={{ bgcolor: '#fef3c7', color: '#d97706', fontWeight: 700, px: 0.5 }}
                      />
                    ) : (
                      <Chip
                        icon={<AnsweredIcon sx={{ fontSize: '1rem !important', color: '#059669 !important' }} />}
                        label="Answered"
                        size="small"
                        sx={{ bgcolor: '#d1fae5', color: '#059669', fontWeight: 700, px: 0.5 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Switch
                        checked={!faq.isDeleted}
                        onChange={() => handleToggleDelete(faq.id, faq.isDeleted)}
                        color="success"
                        size="small"
                      />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: !faq.isDeleted ? 'success.main' : 'text.disabled', ml: 0.5 }}>
                        {!faq.isDeleted ? 'Active' : 'Hidden'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={pending ? 'Answer Question' : 'Edit FAQ'}>
                      <IconButton color="primary" onClick={() => handleOpen(faq)} size="small" sx={{ mr: 0.5, bgcolor: pending ? '#fef3c7' : 'transparent' }}>
                        <EditIcon fontSize="small" sx={{ color: pending ? '#d97706' : 'inherit' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Permanent Delete">
                      <IconButton color="error" onClick={() => handleDelete(faq.id)} size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '20px', overflow: 'hidden' } }}>
        <Box sx={{ background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', p: 3, color: '#fff' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <QuestionIcon /> {editingId ? 'Edit & Answer FAQ' : 'Add New FAQ'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            Provide accurate answers to property inquiries for potential buyers
          </Typography>
        </Box>
        <DialogContent sx={{ p: 4, pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            {editingId && editingFaq ? (
              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '12px', borderColor: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1.2, bgcolor: '#ede9fe', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PropertyIcon sx={{ color: '#6a11cb', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 800, color: '#64748b', letterSpacing: '0.8px', display: 'block', mb: 0.2 }}>
                    Target Property
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
                    {editingFaq.property?.title || `Property #${editingFaq.propertyId}`}
                  </Typography>
                  {editingFaq.property?.location && (
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                      {editingFaq.property.location}, {editingFaq.property.city}
                    </Typography>
                  )}
                </Box>
              </Paper>
            ) : (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="property-select-label">Select Property</InputLabel>
                <Select
                  labelId="property-select-label"
                  value={formData.propertyId}
                  onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                  label="Select Property"
                  required
                  sx={{ borderRadius: '12px' }}
                >
                  {propertiesList.map((prop) => (
                    <MenuItem key={prop.id} value={prop.id}>
                      {prop.title} ({prop.location}, {prop.city})
                    </MenuItem>
                  ))}
                  {propertiesList.length === 0 && (
                    <MenuItem disabled value="">No active properties available</MenuItem>
                  )}
                </Select>
              </FormControl>
            )}

            <TextField
              fullWidth
              label="Question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
              multiline
              rows={2}
              placeholder="What is the exact inquiry or frequently asked question?"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />

            <TextField
              fullWidth
              label="Admin Answer"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              required
              multiline
              rows={4}
              placeholder="Provide a detailed, helpful answer..."
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <Button onClick={handleClose} sx={{ color: '#64748b', fontWeight: 600, borderRadius: '10px', px: 3 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#6a11cb', '&:hover': { bgcolor: '#2575fc' }, px: 4, py: 1.2, fontWeight: 700, borderRadius: '10px', boxShadow: '0 4px 12px rgba(106, 17, 203, 0.3)' }}>
            {editingId ? 'Save Answer / Update' : 'Publish FAQ'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FaqManager;
