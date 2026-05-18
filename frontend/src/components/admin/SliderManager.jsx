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
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Image as ImageIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const SliderManager = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    price: '',
    priceUnit: 'Starting at',
    area: '',
    beds: '',
    baths: '',
    garage: '',
    image: '',
    link: ''
  });

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/sliders`);
      setSliders(response.data);
    } catch (error) {
      toast.error('Error fetching sliders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleToggleDelete = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/admin/sliders/${id}/toggle-delete`, {
        isDeleted: !currentStatus
      });
      toast.success(`Slider ${!currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchSliders();
    } catch (error) {
      toast.error('Error updating slider status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this slider?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/admin/sliders/${id}`);
        toast.success('Slider deleted permanently');
        fetchSliders();
      } catch (error) {
        toast.error('Error deleting slider');
      }
    }
  };

  const handleOpen = (slider = null) => {
    if (slider) {
      setEditingId(slider.id);
      setFormData({
        title: slider.title || '',
        location: slider.location || '',
        type: slider.type || '',
        price: slider.price || '',
        priceUnit: slider.priceUnit || 'Starting at',
        area: slider.area || '',
        beds: slider.beds || '',
        baths: slider.baths || '',
        garage: slider.garage || '',
        image: slider.image || '',
        link: slider.link || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '', location: '', type: '', price: '', priceUnit: 'Starting at',
        area: '', beds: '', baths: '', garage: '', image: '', link: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/sliders/${editingId}`, formData);
        toast.success('Slider updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/sliders`, formData);
        toast.success('Slider added successfully');
      }
      handleClose();
      fetchSliders();
    } catch (error) {
      toast.error(`Error ${editingId ? 'updating' : 'adding'} slider`);
    }
  };

  const filteredSliders = sliders.filter(slider => 
    slider.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slider.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slider.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Hero Slider Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage the homepage background sliders</Typography>
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
          Add New Slider
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by title, location or type..."
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
              <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Title & Location</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : filteredSliders.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center"><Typography sx={{ py: 4 }}>No sliders found</Typography></TableCell></TableRow>
            ) : filteredSliders.map((slider) => (
              <TableRow key={slider.id} hover sx={{ transition: '0.2s', opacity: slider.isDeleted ? 0.6 : 1 }}>
                <TableCell>
                  <Box 
                    component="img" 
                    src={slider.image} 
                    alt={slider.title}
                    sx={{ width: 80, height: 50, objectFit: 'cover', borderRadius: '4px', bgcolor: '#eee' }}
                    onError={(e) => { e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2280%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2080%2050%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%2280%22%20height%3D%2250%22%20fill%3D%22%23eee%22%3E%3C%2Frect%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23999%22%20font-family%3A%22Arial%22%20font-size%3D%2210%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E'; }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{slider.title}</Typography>
                  <Typography variant="caption" color="textSecondary">{slider.location}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={slider.type} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{slider.priceUnit} {slider.price}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch 
                      checked={!slider.isDeleted} 
                      onChange={() => handleToggleDelete(slider.id, slider.isDeleted)} 
                      color="success"
                      size="small"
                    />
                    <Typography variant="caption">{!slider.isDeleted ? 'Active' : 'Hidden'}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(slider)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(slider.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '15px' } }}>
        <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3 }}>
          {editingId ? 'Edit Slider' : 'Add New Slider'}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid  xs={12} md={8}>
              <TextField fullWidth label="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </Grid>
            <Grid  xs={12} md={4}>
              <TextField fullWidth label="Type (e.g. Apartment, Villa)" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} />
            </Grid>
            <Grid  xs={12}>
              <TextField fullWidth label="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
            </Grid>
            <Grid  xs={12} md={4}>
              <TextField fullWidth label="Price Unit" value={formData.priceUnit} onChange={(e) => setFormData({...formData, priceUnit: e.target.value})} placeholder="e.g. Starting at" />
            </Grid>
            <Grid  xs={12} md={4}>
              <TextField fullWidth label="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </Grid>
            <Grid  xs={12} md={4}>
              <TextField fullWidth label="Area" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} />
            </Grid>
            <Grid  xs={4}>
              <TextField fullWidth label="Beds" type="number" value={formData.beds} onChange={(e) => setFormData({...formData, beds: e.target.value})} />
            </Grid>
            <Grid  xs={4}>
              <TextField fullWidth label="Baths" type="number" value={formData.baths} onChange={(e) => setFormData({...formData, baths: e.target.value})} />
            </Grid>
            <Grid  xs={4}>
              <TextField fullWidth label="Garage" type="number" value={formData.garage} onChange={(e) => setFormData({...formData, garage: e.target.value})} />
            </Grid>
            <Grid  xs={12}>
              <TextField 
                fullWidth 
                label="Image URL" 
                value={formData.image} 
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><ImageIcon /></InputAdornment>
                }}
              />
            </Grid>
            <Grid  xs={12}>
              <TextField 
                fullWidth 
                label="Link URL" 
                value={formData.link} 
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LinkIcon /></InputAdornment>
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px' }}>
            {editingId ? 'Update Slider' : 'Create Slider'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SliderManager;
