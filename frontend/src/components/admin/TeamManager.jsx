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
  TablePagination
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  PhotoCamera as PhotoIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Sort as SortIcon,
  Badge as BadgeIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const TeamManager = () => {
  const [teamMembers, setTeamMembers] = useState([]);
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
    bio: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    order: 0
  });

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/team`, {
        params: { 
          search: searchTerm,
          page: page + 1,
          limit: rowsPerPage
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeamMembers(response.data.teamMembers);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error(error.response?.data?.message || 'Error fetching team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTeamMembers();
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
      await axios.patch(`${API_BASE_URL}/api/admin/team/${id}/toggle-delete`, 
        { isDeleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Team member ${!currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchTeamMembers();
    } catch (error) {
      toast.error('Error updating team member status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this team member?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/admin/team/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Team member deleted permanently');
        fetchTeamMembers();
      } catch (error) {
        toast.error('Error deleting team member');
      }
    }
  };

  const handleOpen = (member = null) => {
    if (member) {
      setEditingId(member.id);
      setFormData({
        name: member.name || '',
        designation: member.designation || '',
        photo: member.photo || '',
        bio: member.bio || '',
        facebook: member.facebook || '',
        twitter: member.twitter || '',
        linkedin: member.linkedin || '',
        instagram: member.instagram || '',
        order: member.order || 0
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '', designation: '', photo: '', bio: '', facebook: '',
        twitter: '', linkedin: '', instagram: '', order: teamMembers.length + 1
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
        await axios.put(`${API_BASE_URL}/api/admin/team/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Team member updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/team`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Team member added successfully');
      }
      handleClose();
      fetchTeamMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || `Error ${editingId ? 'updating' : 'adding'} team member`);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Team Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage the visionary team members shown on the About Us page</Typography>
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
          Add Team Member
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, designation or bio..."
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
              <TableCell sx={{ fontWeight: 700 }}>Team Member</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Bio Preview</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">Sort Order</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && teamMembers.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : teamMembers.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center"><Typography sx={{ py: 4 }}>No team members found</Typography></TableCell></TableRow>
            ) : teamMembers.map((member) => (
              <TableRow key={member.id} hover sx={{ transition: '0.2s', opacity: member.isDeleted ? 0.6 : 1 }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      src={member.photo} 
                      alt={member.name}
                      sx={{ width: 45, height: 45, border: '2px solid #eee' }}
                    >
                      {member.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{member.name}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={member.designation || 'Team Member'} size="small" variant="outlined" sx={{ fontWeight: 600, color: '#6a11cb', borderColor: '#6a11cb' }} />
                </TableCell>
                <TableCell sx={{ maxWidth: 250 }}>
                  <Typography variant="caption" noWrap sx={{ display: 'block', textOverflow: 'ellipsis' }}>
                    {member.bio || 'No bio provided'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip label={member.order} size="small" sx={{ fontWeight: 700, bgcolor: '#f1f2f6' }} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch 
                      checked={!member.isDeleted} 
                      onChange={() => handleToggleDelete(member.id, member.isDeleted)} 
                      color="success"
                      size="small"
                    />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: !member.isDeleted ? 'success.main' : 'text.disabled' }}>
                      {!member.isDeleted ? 'Active' : 'Hidden'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(member)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(member.id)} size="small">
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
          {editingId ? 'Edit Team Member' : 'Add Team Member'}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Full Name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Designation" 
                value={formData.designation} 
                onChange={(e) => setFormData({...formData, designation: e.target.value})} 
                placeholder="e.g. Founder & Chief Visionary Officer"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><BadgeIcon fontSize="small" /></InputAdornment>
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={8}>
              <TextField 
                fullWidth 
                label="Photo URL" 
                value={formData.photo} 
                onChange={(e) => setFormData({...formData, photo: e.target.value})}
                placeholder="e.g. assets/images/agent/agent-1.jpg or https://..."
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><PhotoIcon fontSize="small" /></InputAdornment>
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField 
                fullWidth 
                type="number"
                label="Sort Order" 
                value={formData.order} 
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><SortIcon fontSize="small" /></InputAdornment>
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline
                rows={3}
                label="Professional Biography" 
                value={formData.bio} 
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Describe their achievements, role and real estate background..."
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}><DescriptionIcon fontSize="small" /></InputAdornment>
                  }
                }}
              />
            </Grid>

            {/* Social Links */}
            <Grid item xs={12}><Typography variant="subtitle2" sx={{ fontWeight: 700, mb: -1 }}>Social Media Profiles</Typography></Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Facebook URL" 
                value={formData.facebook} 
                onChange={(e) => setFormData({...formData, facebook: e.target.value})} 
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><FacebookIcon fontSize="small" sx={{ color: '#1877F2' }} /></InputAdornment>
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Twitter URL" 
                value={formData.twitter} 
                onChange={(e) => setFormData({...formData, twitter: e.target.value})} 
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><TwitterIcon fontSize="small" sx={{ color: '#1DA1F2' }} /></InputAdornment>
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="LinkedIn URL" 
                value={formData.linkedin} 
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})} 
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><LinkedInIcon fontSize="small" sx={{ color: '#0A66C2' }} /></InputAdornment>
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Instagram URL" 
                value={formData.instagram} 
                onChange={(e) => setFormData({...formData, instagram: e.target.value})} 
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
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px', '&:hover': { bgcolor: '#2575fc' } }}>
            {editingId ? 'Update Member' : 'Add Member'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamManager;
