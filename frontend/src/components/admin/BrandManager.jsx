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
  CircularProgress,
  InputAdornment,
  TablePagination,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Image as ImageIcon,
  Label as LabelIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const BrandManager = () => {
  const [brands, setBrands] = useState([]);
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
    image: ''
  });

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/brands`, {
        params: { 
          search: searchTerm,
          page: page + 1,
          limit: rowsPerPage
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setBrands(response.data.brands);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error(error.response?.data?.message || 'Error fetching brands');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBrands();
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
      await axios.patch(`${API_BASE_URL}/api/admin/brands/${id}/toggle-delete`, 
        { isDeleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Brand ${!currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchBrands();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this brand logo?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/admin/brands/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Brand deleted permanently');
        fetchBrands();
      } catch (error) {
        toast.error(error.response?.data?.error || 'Error deleting brand');
      }
    }
  };

  const handleOpen = (brand = null) => {
    if (brand) {
      setEditingId(brand.id);
      setFormData({
        name: brand.name || '',
        image: brand.image || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        image: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.image) {
      toast.error('Name and image URL are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/brands/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Brand updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/brands`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Brand added successfully');
      }
      handleClose();
      fetchBrands();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error saving brand');
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Brand Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage partner logos and branding</Typography>
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
          Add New Brand
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by brand name..."
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
              <TableCell sx={{ fontWeight: 700 }}>Brand Logo</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Brand Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && brands.length === 0 ? (
              <TableRow><TableCell colSpan={4} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : brands.length === 0 ? (
              <TableRow><TableCell colSpan={4} align="center"><Typography sx={{ py: 4 }}>No brands found</Typography></TableCell></TableRow>
            ) : brands.map((item) => (
              <TableRow key={item.id} hover sx={{ transition: '0.2s', opacity: item.isDeleted ? 0.6 : 1 }}>
                <TableCell>
                  <Avatar 
                    src={item.image} 
                    alt={item.name}
                    variant="square"
                    sx={{ width: 100, height: 50, objectFit: 'contain', bgcolor: 'transparent' }}
                  >
                    <ImageIcon />
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{item.name}</Typography>
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

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '15px' } }}>
        <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3 }}>
          {editingId ? 'Edit Brand' : 'Add New Brand'}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField 
              fullWidth 
              label="Brand Name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required
              InputProps={{
                startAdornment: <InputAdornment position="start"><LabelIcon fontSize="small" /></InputAdornment>
              }}
            />
            <TextField 
              fullWidth 
              label="Logo URL" 
              value={formData.image} 
              onChange={(e) => setFormData({...formData, image: e.target.value})} 
              required
              placeholder="assets/images/brands/brand-1.png"
              InputProps={{
                startAdornment: <InputAdornment position="start"><ImageIcon fontSize="small" /></InputAdornment>
              }}
            />
            {formData.image && (
              <Box sx={{ p: 2, border: '1px dashed #ccc', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="textSecondary" display="block" mb={1}>Preview</Typography>
                <img src={formData.image} alt="Preview" style={{ maxHeight: 60, maxWidth: '100%' }} onError={(e) => { e.target.style.display = 'none'; }} />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px' }}>
            {editingId ? 'Update Brand' : 'Add Brand'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrandManager;
