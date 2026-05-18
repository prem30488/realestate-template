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
  TablePagination
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Title as TitleIcon,
  Numbers as ValueIcon,
  EmojiEmotions as IconIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const FunFactManager = () => {
  const [funfacts, setFunfacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    icon: ''
  });

  const fetchFunFacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/funfacts`, {
        params: { 
          search: searchTerm,
          page: page + 1,
          limit: rowsPerPage
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setFunfacts(response.data.funfacts);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching funfacts:', error);
      toast.error(error.response?.data?.message || 'Error fetching funfacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchFunFacts();
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
      await axios.patch(`${API_BASE_URL}/api/admin/funfacts/${id}/toggle-delete`, 
        { isDeleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`FunFact ${!currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchFunFacts();
    } catch (error) {
      toast.error('Error updating funfact status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this funfact?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/admin/funfacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('FunFact deleted permanently');
        fetchFunFacts();
      } catch (error) {
        toast.error('Error deleting funfact');
      }
    }
  };

  const handleOpen = (funfact = null) => {
    if (funfact) {
      setEditingId(funfact.id);
      setFormData({
        title: funfact.title || '',
        value: funfact.value || '',
        icon: funfact.icon || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        value: '',
        icon: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.value) {
      toast.error('Title and Value are required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/funfacts/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('FunFact updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/funfacts`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('FunFact added successfully');
      }
      handleClose();
      fetchFunFacts();
    } catch (error) {
      toast.error(error.response?.data?.message || `Error ${editingId ? 'updating' : 'adding'} funfact`);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>FunFact Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage company statistics and fun facts</Typography>
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
          Add New FunFact
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by title or value..."
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
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Value</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Icon</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && funfacts.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : funfacts.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><Typography sx={{ py: 4 }}>No funfacts found</Typography></TableCell></TableRow>
            ) : funfacts.map((fact) => (
              <TableRow key={fact.id} hover sx={{ transition: '0.2s', opacity: fact.isDeleted ? 0.6 : 1 }}>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{fact.title}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={fact.value} size="small" color="primary" sx={{ fontWeight: 700 }} />
                </TableCell>
                <TableCell>
                  <Chip 
                    icon={<IconIcon sx={{ fontSize: '1rem !important' }} />}
                    label={fact.icon || 'No icon'} 
                    size="small" 
                    variant="outlined" 
                    sx={{ fontWeight: 600 }} 
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch 
                      checked={!fact.isDeleted} 
                      onChange={() => handleToggleDelete(fact.id, fact.isDeleted)} 
                      color="success"
                      size="small"
                    />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: !fact.isDeleted ? 'success.main' : 'text.disabled' }}>
                      {!fact.isDeleted ? 'Active' : 'Hidden'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(fact)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(fact.id)} size="small">
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
          {editingId ? 'Edit FunFact' : 'Add New FunFact'}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid  xs={12}>
              <TextField 
                fullWidth 
                label="Fact Title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                required
                placeholder="e.g. Happy Clients"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><TitleIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid  xs={12}>
              <TextField 
                fullWidth 
                label="Value" 
                value={formData.value} 
                onChange={(e) => setFormData({...formData, value: e.target.value})} 
                required
                placeholder="e.g. 2500+"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><ValueIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid  xs={12}>
              <TextField 
                fullWidth 
                label="Icon Name" 
                value={formData.icon} 
                onChange={(e) => setFormData({...formData, icon: e.target.value})} 
                placeholder="e.g. FaUserFriends, BiHome"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><IconIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px' }}>
            {editingId ? 'Update FunFact' : 'Create FunFact'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FunFactManager;
