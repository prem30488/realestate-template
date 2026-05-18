import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Grid, TextField, Button, Avatar, 
  Divider, Chip, InputAdornment, IconButton
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Phone as PhoneIcon,
  Shield as ShieldIcon,
  Security as SecurityIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../constants';

const ROLE_COLORS = {
  superadmin: 'error',
  admin: 'warning',
  user: 'primary'
};

const UserProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Optionally fetch latest user details if there was an endpoint
    // We'll rely on local storage user info for now and sync if needed
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // We try to update via admin API if admin, but ideally we need a standard profile update endpoint
    // Since we don't have a specific profile endpoint in the backend, we simulate or use admin endpoint if permitted
    // Or just toast for now to avoid errors if endpoint doesn't exist
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      // If we had a specific endpoint like /api/profile
      // await axios.put(`${API_BASE_URL}/api/profile`, formData, { headers: { Authorization: `Bearer ${token}` }});
      
      // Update local storage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      toast.success('Profile updated successfully! (Local mock)');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', pb: 8 }}>
      <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        {/* Header Section */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 3, mb: 4 }}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              fontSize: '3rem',
              fontWeight: 800,
              bgcolor: ROLE_COLORS[user.role] === 'error' ? '#c0392b' : 
                       ROLE_COLORS[user.role] === 'warning' ? '#f39c12' : '#6a11cb'
            }}
          >
            {user.username?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          
          <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 1 }}>
              {user.username}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' }, flexWrap: 'wrap' }}>
              <Chip 
                icon={user.role === 'superadmin' ? <ShieldIcon /> : user.role === 'admin' ? <AdminIcon /> : <PersonIcon />} 
                label={user.role?.toUpperCase() || 'USER'} 
                color={ROLE_COLORS[user.role] || 'primary'} 
                size="small" 
                sx={{ fontWeight: 700 }}
              />
              {user.role === 'admin' && user.privileges && user.privileges.length > 0 && (
                <Chip icon={<SecurityIcon />} label={`${user.privileges.length} Privileges`} size="small" variant="outlined" />
              )}
            </Box>
          </Box>

          <Box>
            {!isEditing ? (
              <Button 
                variant="outlined" 
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                sx={{ borderRadius: '10px' }}
              >
                Edit Profile
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={() => setIsEditing(false)} color="error" title="Cancel">
                  <CancelIcon />
                </IconButton>
                <IconButton onClick={handleSave} color="success" title="Save" disabled={loading}>
                  <SaveIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Details Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              Personal Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon color="action" /></InputAdornment>,
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon color="action" /></InputAdornment>,
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Not provided"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PhoneIcon color="action" /></InputAdornment>,
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              Account Settings & Access
            </Typography>
            
            <Paper variant="outlined" sx={{ p: 3, borderRadius: '15px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155', mb: 1 }}>
                Role Level: {user.role?.toUpperCase()}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                {user.role === 'superadmin' 
                  ? 'You have unrestricted access to all platform features and settings.'
                  : user.role === 'admin'
                  ? 'You have administrative access to specific management modules.'
                  : 'You have standard user access to browse and post properties.'}
              </Typography>

              {user.role === 'admin' && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155', mb: 1.5 }}>
                    Your Admin Privileges:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {user.privileges?.length > 0 ? (
                      user.privileges.map((priv) => (
                        <Chip key={priv} label={priv} size="small" sx={{ bgcolor: '#e0e7ff', color: '#3730a3', fontWeight: 600 }} />
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">No specific privileges assigned.</Typography>
                    )}
                  </Box>
                </>
              )}
            </Paper>

            {isEditing && (
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={handleSave}
                  disabled={loading}
                  sx={{ borderRadius: '12px', px: 4, py: 1.5, fontWeight: 700 }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>

      </Paper>
    </Box>
  );
};

export default UserProfile;
