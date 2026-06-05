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
  Avatar,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  PhotoCamera as PhotoIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Work as WorkIcon,
  VerifiedUser as SpecializationIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const BrokerManager = () => {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    photo: '',
    designation: '',
    experience: '',
    specialization: '',
    city: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: ''
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/cities`)
      .then(res => setCities(res.data))
      .catch(() => { });
  }, []);

  const fetchBrokers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/brokers`, {
        params: {
          search: searchTerm,
          page: page + 1,
          limit: rowsPerPage
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setBrokers(response.data.brokers);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching brokers:', error);
      toast.error(error.response?.data?.message || 'Error fetching brokers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBrokers();
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
      await axios.patch(`${API_BASE_URL}/api/admin/brokers/${id}/toggle-delete`,
        { isDeleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Broker ${!currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchBrokers();
    } catch (error) {
      toast.error('Error updating broker status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this broker?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/admin/brokers/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Broker deleted permanently');
        fetchBrokers();
      } catch (error) {
        toast.error('Error deleting broker');
      }
    }
  };

  const handleOpen = (broker = null) => {
    if (broker) {
      setEditingId(broker.id);
      setFormData({
        name: broker.name || '',
        email: broker.email || '',
        phoneNumber: broker.phoneNumber || '',
        photo: broker.photo || '',
        designation: broker.designation || '',
        experience: broker.experience || '',
        specialization: broker.specialization || '',
        city: broker.city || '',
        facebook: broker.facebook || '',
        twitter: broker.twitter || '',
        linkedin: broker.linkedin || '',
        instagram: broker.instagram || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '', email: '', phoneNumber: '', photo: '', designation: '',
        experience: '', specialization: '', city: '', facebook: '', twitter: '',
        linkedin: '', instagram: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error('Name is required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/brokers/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Broker updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/brokers`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Broker added successfully');
      }
      handleClose();
      fetchBrokers();
    } catch (error) {
      toast.error(error.response?.data?.message || `Error ${editingId ? 'updating' : 'adding'} broker`);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Broker Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage company brokers and agents</Typography>
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
          Add New Broker
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, designation, email or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
              <TableCell sx={{ fontWeight: 700 }}>Broker</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Specialization</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && brokers.length === 0 ? (
              <TableRow><TableCell colSpan={7} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : brokers.length === 0 ? (
              <TableRow><TableCell colSpan={7} align="center"><Typography sx={{ py: 4 }}>No brokers found</Typography></TableCell></TableRow>
            ) : brokers.map((broker) => (
              <TableRow key={broker.id} hover sx={{ transition: '0.2s', opacity: broker.isDeleted ? 0.6 : 1 }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={broker.photo}
                      alt={broker.name}
                      sx={{ width: 45, height: 45, border: '2px solid #eee' }}
                    >
                      {broker.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{broker.name}</Typography>
                      <Typography variant="caption" color="textSecondary">{broker.experience || 'No exp.'} experience</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 14, color: '#666' }} />
                      <Typography variant="caption">{broker.email || 'N/A'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 14, color: '#666' }} />
                      <Typography variant="caption">{broker.phoneNumber || 'N/A'}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={broker.city || '—'} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                </TableCell>
                <TableCell>
                  <Chip label={broker.designation || 'Broker'} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{broker.specialization || 'General'}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch
                      checked={!broker.isDeleted}
                      onChange={() => handleToggleDelete(broker.id, broker.isDeleted)}
                      color="success"
                      size="small"
                    />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: !broker.isDeleted ? 'success.main' : 'text.disabled' }}>
                      {!broker.isDeleted ? 'Active' : 'Hidden'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(broker)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(broker.id)} size="small">
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

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '15px' } }}>
        <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3 }}>
          {editingId ? 'Edit Broker Information' : 'Add New Broker'}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            {/* Basic Info */}
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g. Senior Real Estate Agent"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>
                  }
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment>
                  }
                }}
              />
            </Grid>

            {/* Professional Info */}
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g. 5+ Years"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><WorkIcon fontSize="small" /></InputAdornment>
                  }
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="e.g. Luxury Villas, Commercial"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><SpecializationIcon fontSize="small" /></InputAdornment>
                  }
                }}
              />
            </Grid>

            {/* City */}
            <Grid xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <Select
                  value={formData.city}
                  label="City"
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                >
                  <MenuItem value="">-- No City --</MenuItem>
                  {cities.map(c => (
                    <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label="Photo URL"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><PhotoIcon fontSize="small" /></InputAdornment>
                  }
                }}
              />
            </Grid>

            {/* Social Links */}
            <Grid xs={12}><Typography variant="subtitle2" sx={{ fontWeight: 700, mb: -1 }}>Social Media Profiles</Typography></Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Facebook URL"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><FacebookIcon fontSize="small" sx={{ color: '#1877F2' }} /></InputAdornment>
                  }
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Twitter URL"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><TwitterIcon fontSize="small" sx={{ color: '#1DA1F2' }} /></InputAdornment>
                  }
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="LinkedIn URL"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><LinkedInIcon fontSize="small" sx={{ color: '#0A66C2' }} /></InputAdornment>
                  }
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Instagram URL"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><InstagramIcon fontSize="small" sx={{ color: '#E4405F' }} /></InputAdornment>
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px' }}>
            {editingId ? 'Update Broker' : 'Create Broker'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrokerManager;
