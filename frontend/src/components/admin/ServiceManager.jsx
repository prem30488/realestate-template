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
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Title as TitleIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  EmojiEmotions as IconIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
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
    description: '',
    icon: '',
    image: ''
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/services`, {
        params: { 
          search: searchTerm,
          page: page + 1,
          limit: rowsPerPage
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data.services);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error(error.response?.data?.message || 'Error fetching services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchServices();
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
      await axios.patch(`${API_BASE_URL}/api/admin/services/${id}/toggle-delete`, 
        { isDeleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Service ${!currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchServices();
    } catch (error) {
      toast.error('Error updating service status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this service?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/admin/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Service deleted permanently');
        fetchServices();
      } catch (error) {
        toast.error('Error deleting service');
      }
    }
  };

  const handleOpen = (service = null) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        title: service.title || '',
        description: service.description || '',
        icon: service.icon || '',
        image: service.image || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        icon: '',
        image: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error('Title is required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/services/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Service updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/services`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Service added successfully');
      }
      handleClose();
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || `Error ${editingId ? 'updating' : 'adding'} service`);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Service Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage company services and offerings</Typography>
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
          Add New Service
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by title or description..."
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
              <TableCell sx={{ fontWeight: 700 }}>Service</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Icon</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && services.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : services.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><Typography sx={{ py: 4 }}>No services found</Typography></TableCell></TableRow>
            ) : services.map((service) => (
              <TableRow key={service.id} hover sx={{ transition: '0.2s', opacity: service.isDeleted ? 0.6 : 1 }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      src={service.image} 
                      alt={service.title}
                      sx={{ width: 45, height: 45, border: '2px solid #eee', borderRadius: '8px' }}
                    >
                      <ImageIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{service.title}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    icon={<IconIcon sx={{ fontSize: '1rem !important' }} />}
                    label={service.icon || 'No icon'} 
                    size="small" 
                    variant="outlined" 
                    sx={{ fontWeight: 600 }} 
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant="body2" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {service.description || 'No description'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch 
                      checked={!service.isDeleted} 
                      onChange={() => handleToggleDelete(service.id, service.isDeleted)} 
                      color="success"
                      size="small"
                    />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: !service.isDeleted ? 'success.main' : 'text.disabled' }}>
                      {!service.isDeleted ? 'Active' : 'Hidden'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(service)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(service.id)} size="small">
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
          {editingId ? 'Edit Service Information' : 'Add New Service'}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Service Title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><TitleIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline
                rows={4}
                label="Description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                placeholder="Describe what this service is about..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Icon Name" 
                value={formData.icon} 
                onChange={(e) => setFormData({...formData, icon: e.target.value})} 
                placeholder="e.g. FaBuilding, BiHome"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><IconIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Image URL" 
                value={formData.image} 
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><ImageIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px' }}>
            {editingId ? 'Update Service' : 'Create Service'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceManager;
