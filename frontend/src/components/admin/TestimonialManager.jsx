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
  Avatar,
  Rating
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Image as ImageIcon,
  FormatQuote as QuoteIcon,
  Work as WorkIcon,
  Star as StarIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    photo: '',
    content: '',
    rating: 5
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/testimonials`, {
        params: { 
          search: searchTerm,
          page: page + 1,
          limit: rowsPerPage
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestimonials(response.data.testimonials);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error(error.response?.data?.message || 'Error fetching testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTestimonials();
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
      await axios.patch(`${API_BASE_URL}/api/admin/testimonials/${id}/toggle-delete`, 
        { isDeleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Testimonial ${!currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchTestimonials();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this testimonial?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/admin/testimonials/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Testimonial deleted permanently');
        fetchTestimonials();
      } catch (error) {
        toast.error(error.response?.data?.error || 'Error deleting testimonial');
      }
    }
  };

  const handleOpen = (testimonial = null) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({
        name: testimonial.name || '',
        designation: testimonial.designation || '',
        photo: testimonial.photo || '',
        content: testimonial.content || '',
        rating: testimonial.rating || 5
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        designation: '',
        photo: '',
        content: '',
        rating: 5
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.content) {
      toast.error('Name and content are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/testimonials/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Testimonial updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/testimonials`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Testimonial added successfully');
      }
      handleClose();
      fetchTestimonials();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error saving testimonial');
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Testimonials Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage client feedback and reviews</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          sx={{ 
            bgcolor: '#6a11cb', 
            borderRadius: '10px',
            px: 3,
            py: 1,
            '&:hover': { bgcolor: '#2575fc' } 
          }} 
          onClick={() => handleOpen()}
        >
          Add Testimonial
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, designation or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            )
          }}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Client</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Testimonial</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && testimonials.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : testimonials.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><Typography sx={{ py: 4 }}>No testimonials found</Typography></TableCell></TableRow>
            ) : testimonials.map((item) => (
              <TableRow key={item.id} hover sx={{ transition: '0.2s', opacity: item.isDeleted ? 0.6 : 1 }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      src={item.photo} 
                      alt={item.name}
                      sx={{ width: 45, height: 45, border: '1px solid #eee' }}
                    >
                      {item.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{item.name}</Typography>
                      <Typography variant="caption" color="textSecondary">{item.designation}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant="body2" sx={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    "{item.content}"
                  </Typography>
                </TableCell>
                <TableCell>
                  <Rating value={item.rating} readOnly size="small" precision={0.5} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch 
                      checked={!item.isDeleted} 
                      onChange={() => handleToggleDelete(item.id, item.isDeleted)} 
                      color="success"
                      size="small"
                    />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: !item.isDeleted ? 'success.main' : 'text.disabled' }}>
                      {!item.isDeleted ? 'Active' : 'Hidden'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(item)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(item.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '15px' } }}>
        <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3 }}>
          {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid  xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Client Name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid  xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Designation / Company" 
                value={formData.designation} 
                onChange={(e) => setFormData({...formData, designation: e.target.value})} 
                InputProps={{
                  startAdornment: <InputAdornment position="start"><WorkIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid  xs={12}>
              <TextField 
                fullWidth 
                label="Photo URL" 
                value={formData.photo} 
                onChange={(e) => setFormData({...formData, photo: e.target.value})} 
                placeholder="https://example.com/avatar.jpg"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><ImageIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid  xs={12}>
              <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>Rating</Typography>
              <Rating 
                value={formData.rating} 
                onChange={(event, newValue) => setFormData({...formData, rating: newValue})}
                size="large"
              />
            </Grid>
            <Grid  xs={12}>
              <TextField 
                fullWidth 
                label="Testimonial Content" 
                multiline
                rows={4}
                value={formData.content} 
                onChange={(e) => setFormData({...formData, content: e.target.value})} 
                required
                placeholder="What did the client say?"
                InputProps={{
                  startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}><QuoteIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px' }}>
            {editingId ? 'Update Testimonial' : 'Save Testimonial'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestimonialManager;
