import React, { useState } from 'react';
import {
  Box, Typography, Paper, TextField, Button, Grid, 
  Switch, FormControlLabel, Divider, Tab, Tabs, InputAdornment, IconButton
} from '@mui/material';
import { 
  Save as SaveIcon, 
  Language as LanguageIcon, 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import { useEffect } from 'react';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AdminSettings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    maintenanceMode: false,
    userRegistration: true,
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    googleAnalyticsId: '',
    currency: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/admin/settings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data) {
        setSettings(res.data);
      }
    } catch (err) {
      toast.error('Failed to load settings');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/admin/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Settings saved successfully!');
    } catch (err) {
      toast.error('Failed to save settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pb: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
          Global Settings
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={loading}
          sx={{ 
            bgcolor: '#6a11cb', 
            '&:hover': { bgcolor: '#2575fc' },
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            px: 3
          }}
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </Box>

      <Paper sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            bgcolor: '#f8fafc',
            '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: '1rem' },
            '& .Mui-selected': { color: '#6a11cb' },
            '& .MuiTabs-indicator': { backgroundColor: '#6a11cb' }
          }}
        >
          <Tab label="General" />
          <Tab label="Contact & Social" />
          <Tab label="System Features" />
          <Tab label="SMTP / Email" />
        </Tabs>

        {/* General Settings */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site Name"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Currency Format"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                variant="outlined"
                helperText="e.g. USD, EUR, INR"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Site Description"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Google Analytics Tracking ID"
                name="googleAnalyticsId"
                value={settings.googleAnalyticsId}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Contact & Social Settings */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a2e' }}>Contact Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><EmailIcon color="action" /></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Phone"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><PhoneIcon color="action" /></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Business Address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1a1a2e' }}>Social Media Links</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Facebook URL"
                    name="facebook"
                    value={settings.facebook}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><FacebookIcon sx={{ color: '#1877F2' }} /></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Twitter URL"
                    name="twitter"
                    value={settings.twitter}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><TwitterIcon sx={{ color: '#1DA1F2' }} /></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Instagram URL"
                    name="instagram"
                    value={settings.instagram}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><InstagramIcon sx={{ color: '#E4405F' }} /></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="LinkedIn URL"
                    name="linkedin"
                    value={settings.linkedin}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><LinkedInIcon sx={{ color: '#0A66C2' }} /></InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>

        {/* System Features */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#1a1a2e' }}>Toggle Features</Typography>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.maintenanceMode} 
                    onChange={handleChange} 
                    name="maintenanceMode" 
                    color="error"
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Maintenance Mode</Typography>
                    <Typography variant="body2" color="text.secondary">
                      When enabled, the public site will display a maintenance page. Admins can still login.
                    </Typography>
                  </Box>
                }
              />
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings.userRegistration} 
                    onChange={handleChange} 
                    name="userRegistration" 
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>User Registration</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Allow new users to create accounts on the frontend.
                    </Typography>
                  </Box>
                }
              />
            </Paper>
          </Box>
        </TabPanel>

        {/* SMTP Settings */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ maxWidth: 800 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#1a1a2e' }}>Email Configuration</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Configure the SMTP server settings used for sending system emails and newsletters.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="SMTP Host"
                  name="smtpHost"
                  value={settings.smtpHost}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="SMTP Port"
                  name="smtpPort"
                  value={settings.smtpPort}
                  onChange={handleChange}
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SMTP Username"
                  name="smtpUser"
                  value={settings.smtpUser}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SMTP Password"
                  name="smtpPassword"
                  value={settings.smtpPassword}
                  onChange={handleChange}
                  variant="outlined"
                  type={showSmtpPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                          edge="end"
                        >
                          {showSmtpPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #eee' }}>
              <Button variant="outlined" color="primary">
                Send Test Email
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default AdminSettings;
