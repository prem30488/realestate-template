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
  VideoLibrary as VideoIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const InstaReelManager = () => {
  const [reels, setReels] = useState([]);
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
    videoUrl: '',
    thumbnailUrl: ''
  });

  const fetchReels = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/instareels`, {
        params: { 
          search: searchTerm,
          page: page + 1,
          limit: rowsPerPage
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setReels(response.data.reels);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching reels:', error);
      toast.error(error.response?.data?.message || 'Error fetching reels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchReels();
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
      await axios.patch(`${API_BASE_URL}/api/admin/instareels/${id}/toggle-delete`, 
        { isDeleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Reel ${!currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchReels();
    } catch (error) {
      toast.error('Error updating reel status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this reel?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/admin/instareels/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Reel deleted permanently');
        fetchReels();
      } catch (error) {
        toast.error('Error deleting reel');
      }
    }
  };

  const handleOpen = (reel = null) => {
    if (reel) {
      setEditingId(reel.id);
      setFormData({
        title: reel.title || '',
        videoUrl: reel.videoUrl || '',
        thumbnailUrl: reel.thumbnailUrl || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        videoUrl: '',
        thumbnailUrl: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.videoUrl) {
      toast.error('Title and Video URL are required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/instareels/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Reel updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/instareels`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Reel added successfully');
      }
      handleClose();
      fetchReels();
    } catch (error) {
      toast.error(error.response?.data?.message || `Error ${editingId ? 'updating' : 'adding'} reel`);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Insta Reel Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage Instagram reels and videos</Typography>
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
          Add New Reel
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by title..."
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
              <TableCell sx={{ fontWeight: 700 }}>Reel</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Video URL</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && reels.length === 0 ? (
              <TableRow><TableCell colSpan={4} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : reels.length === 0 ? (
              <TableRow><TableCell colSpan={4} align="center"><Typography sx={{ py: 4 }}>No reels found</Typography></TableCell></TableRow>
            ) : reels.map((reel) => (
              <TableRow key={reel.id} hover sx={{ transition: '0.2s', opacity: reel.isDeleted ? 0.6 : 1 }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      src={reel.thumbnailUrl} 
                      alt={reel.title}
                      variant="rounded"
                      sx={{ width: 50, height: 50, border: '2px solid #eee' }}
                    >
                      <VideoIcon />
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{reel.title}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" sx={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => window.open(reel.videoUrl, '_blank')}>
                    View Video
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch 
                      checked={!reel.isDeleted} 
                      onChange={() => handleToggleDelete(reel.id, reel.isDeleted)} 
                      color="success"
                      size="small"
                    />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: !reel.isDeleted ? 'success.main' : 'text.disabled' }}>
                      {!reel.isDeleted ? 'Active' : 'Hidden'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(reel)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(reel.id)} size="small">
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
          {editingId ? 'Edit Reel Information' : 'Add New Reel'}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Reel Title" 
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
                label="Video URL" 
                value={formData.videoUrl} 
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} 
                required
                placeholder="https://www.instagram.com/reels/..."
                InputProps={{
                  startAdornment: <InputAdornment position="start"><VideoIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Thumbnail URL" 
                value={formData.thumbnailUrl} 
                onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})} 
                placeholder="Optional image for the manager view"
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
            {editingId ? 'Update Reel' : 'Create Reel'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstaReelManager;
