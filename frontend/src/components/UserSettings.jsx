import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Grid, TextField, Button, Switch, 
  FormControlLabel, Divider, InputAdornment, IconButton,
  List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction
} from '@mui/material';
import { 
  Lock as LockIcon, 
  NotificationsActive as NotificationsIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  DeleteForever as DeleteIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Email as EmailIcon,
  PhoneAndroid as PhoneIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../constants';

const UserSettings = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  
  // Password State
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Preferences State
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    smsAlerts: false,
    promotions: true,
    publicProfile: true
  });

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePreferenceChange = (name) => (e) => {
    setPreferences({ ...preferences, [name]: e.target.checked });
  };

  const submitPasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match!');
      return;
    }
    if (passwords.new.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      setPasswordLoading(true);
      // Mock API call since specific user password endpoint might not be set
      // const token = localStorage.getItem('token');
      // await axios.patch(`${API_BASE_URL}/api/user/password`, passwords, { headers: { Authorization: `Bearer ${token}` }});
      
      setTimeout(() => {
        toast.success('Password updated successfully! (Local mock)');
        setPasswords({ current: '', new: '', confirm: '' });
        setPasswordLoading(false);
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      toast.success("Account deletion request submitted.");
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto', pb: 8 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 4 }}>
        Account Settings
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column: Security */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '20px', mb: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
              <SecurityIcon sx={{ color: '#6a11cb' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Security & Password</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockIcon color="action" /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockIcon color="action" /></InputAdornment>
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showPassword ? 'text' : 'password'}
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockIcon color="action" /></InputAdornment>
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              
              <Button 
                variant="contained" 
                onClick={submitPasswordChange}
                disabled={passwordLoading || !passwords.current || !passwords.new}
                sx={{ 
                  bgcolor: '#6a11cb', 
                  color: 'white', 
                  py: 1.5, 
                  borderRadius: '10px',
                  fontWeight: 700,
                  alignSelf: 'flex-start',
                  '&:hover': { bgcolor: '#2575fc' }
                }}
              >
                Update Password
              </Button>
            </Box>
          </Paper>

          {/* Danger Zone */}
          <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '20px', border: '1px solid #ffcdd2', bgcolor: '#fffafb', boxShadow: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <DeleteIcon color="error" />
              <Typography variant="h6" color="error" sx={{ fontWeight: 700 }}>Danger Zone</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Once you delete your account, there is no going back. Please be certain.
            </Typography>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleDeleteAccount}
              sx={{ borderRadius: '10px', fontWeight: 700 }}
            >
              Delete Account
            </Button>
          </Paper>
        </Grid>

        {/* Right Column: Preferences */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
              <NotificationsIcon sx={{ color: '#f39c12' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Preferences</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <List disablePadding>
              <ListItem disableGutters sx={{ py: 2, borderBottom: '1px solid #f0f0f0' }}>
                <ListItemIcon sx={{ minWidth: 40 }}><EmailIcon color="action" /></ListItemIcon>
                <ListItemText 
                  primary="Email Notifications" 
                  secondary="Receive updates and alerts via email"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                <ListItemSecondaryAction>
                  <Switch 
                    edge="end" 
                    checked={preferences.emailAlerts} 
                    onChange={handlePreferenceChange('emailAlerts')} 
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem disableGutters sx={{ py: 2, borderBottom: '1px solid #f0f0f0' }}>
                <ListItemIcon sx={{ minWidth: 40 }}><PhoneIcon color="action" /></ListItemIcon>
                <ListItemText 
                  primary="SMS Alerts" 
                  secondary="Get text messages for important updates"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                <ListItemSecondaryAction>
                  <Switch 
                    edge="end" 
                    checked={preferences.smsAlerts} 
                    onChange={handlePreferenceChange('smsAlerts')} 
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem disableGutters sx={{ py: 2, borderBottom: '1px solid #f0f0f0' }}>
                <ListItemIcon sx={{ minWidth: 40 }}><LanguageIcon color="action" /></ListItemIcon>
                <ListItemText 
                  primary="Promotional Emails" 
                  secondary="Receive offers and newsletters"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                <ListItemSecondaryAction>
                  <Switch 
                    edge="end" 
                    checked={preferences.promotions} 
                    onChange={handlePreferenceChange('promotions')} 
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem disableGutters sx={{ py: 2 }}>
                <ListItemIcon sx={{ minWidth: 40 }}><PersonIcon color="action" /></ListItemIcon>
                <ListItemText 
                  primary="Public Profile" 
                  secondary="Allow others to see your basic profile"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                <ListItemSecondaryAction>
                  <Switch 
                    edge="end" 
                    checked={preferences.publicProfile} 
                    onChange={handlePreferenceChange('publicProfile')} 
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserSettings;
