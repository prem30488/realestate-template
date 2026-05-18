import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Button, Card, CardContent, 
  CardActionArea, Chip, CircularProgress, Divider
} from '@mui/material';
import { 
  Palette as PaletteIcon, 
  CheckCircle as CheckCircleIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import { THEMES } from '../../styleguide/ThemeWrapper';

const ThemeSettings = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Default');
  const [currentActiveTheme, setCurrentActiveTheme] = useState('Default');
  const [fullSettings, setFullSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/admin/settings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data) {
        setFullSettings(res.data);
        const theme = res.data.app_theme || 'Default';
        setSelectedTheme(theme);
        setCurrentActiveTheme(theme);
      }
    } catch (err) {
      toast.error('Failed to load theme settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyTheme = async () => {
    if (!fullSettings) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const updatedSettings = {
        ...fullSettings,
        app_theme: selectedTheme
      };

      await axios.put(`${API_BASE_URL}/api/admin/settings`, updatedSettings, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local storage and trigger event
      localStorage.setItem('app_theme', selectedTheme);
      window.dispatchEvent(new Event('themeChanged'));

      setCurrentActiveTheme(selectedTheme);
      toast.success(`${selectedTheme} theme applied and saved successfully!`);
    } catch (err) {
      toast.error('Failed to save theme settings');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} sx={{ color: '#6a11cb', mb: 2 }} />
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
          Loading premium themes registry...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 5 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PaletteIcon sx={{ fontSize: 36, color: '#6a11cb' }} />
            Theme Settings
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Change the global visual appearance of the entire Real Estate Platform instantly.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={fetchSettings}
            startIcon={<RefreshIcon />}
            sx={{
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 600,
              px: 2.5,
              borderColor: '#cbd5e1',
              color: '#475569',
              '&:hover': { borderColor: '#94a3b8', bgcolor: '#f8fafc' }
            }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            onClick={handleApplyTheme}
            disabled={saving}
            startIcon={<SaveIcon />}
            sx={{
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 600,
              px: 3.5,
              bgcolor: '#6a11cb',
              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
              boxShadow: '0 4px 15px rgba(106, 17, 203, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5b0fb3 0%, #1d61d9 100%)',
                boxShadow: '0 6px 20px rgba(106, 17, 203, 0.4)',
              }
            }}
          >
            {saving ? 'Applying...' : 'Save & Apply Theme'}
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 4, borderColor: '#e2e8f0' }} />

      {/* Main Grid */}
      <Grid container spacing={3.5}>
        {Object.entries(THEMES).map(([themeName, colors]) => {
          const isSelected = selectedTheme === themeName;
          const isActive = currentActiveTheme === themeName;

          return (
            <Grid item xs={12} sm={6} md={4} key={themeName}>
              <Card 
                sx={{ 
                  borderRadius: '16px',
                  border: isSelected ? '2px solid #6a11cb' : '1px solid #e2e8f0',
                  boxShadow: isSelected 
                    ? '0 10px 25px rgba(106, 17, 203, 0.15)' 
                    : '0 4px 12px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: isSelected 
                      ? '0 12px 30px rgba(106, 17, 203, 0.22)' 
                      : '0 10px 25px rgba(0,0,0,0.08)',
                  }
                }}
              >
                {/* Active Indicator Tag */}
                {isActive && (
                  <Chip 
                    label="Active"
                    color="success"
                    size="small"
                    icon={<CheckCircleIcon sx={{ fontSize: '14px !important' }} />}
                    sx={{ 
                      position: 'absolute', 
                      top: 12, 
                      right: 12, 
                      fontWeight: 700, 
                      fontSize: '0.75rem',
                      zIndex: 2,
                      bgcolor: '#10b981',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                    }}
                  />
                )}

                <CardActionArea onClick={() => setSelectedTheme(themeName)} sx={{ p: 0.5 }}>
                  <CardContent sx={{ p: 2.5 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                      <Box 
                        sx={{ 
                          width: 14, 
                          height: 14, 
                          borderRadius: '50%', 
                          bgcolor: colors.primary,
                          mr: 1.5,
                          boxShadow: `0 0 10px ${colors.primary}80`
                        }} 
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem' }}>
                        {themeName}
                      </Typography>
                    </Box>

                    {/* Color Swatches Grid */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8', display: 'block', mb: 1 }}>
                        COLOR PALETTE
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {/* Primary */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: colors.primary, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
                          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#64748b' }}>Primary</Typography>
                        </Box>
                        {/* Secondary */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: colors.secondary || colors.primary, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
                          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#64748b' }}>Sec</Typography>
                        </Box>
                        {/* Nav */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: colors.nav || colors.primary, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
                          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#64748b' }}>Nav</Typography>
                        </Box>
                        {/* Sale Badge */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: colors.badgeSale || '#ef4444', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
                          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#64748b' }}>Sale</Typography>
                        </Box>
                        {/* Background */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: colors.background || '#ffffff', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
                          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#64748b' }}>Bg</Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Live Preview Panel inside Card */}
                    <Box 
                      sx={{ 
                        p: 2, 
                        borderRadius: '12px', 
                        bgcolor: colors.background === '#fff' ? '#f8fafc' : `${colors.background}15`,
                        border: '1px dashed #cbd5e1',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: colors.text }}>
                          Preview UI Elements
                        </Typography>
                        <Chip 
                          label="Featured" 
                          size="small"
                          sx={{ 
                            height: 20, 
                            fontSize: '0.65rem', 
                            fontWeight: 700, 
                            bgcolor: colors.badgeSale || colors.primary, 
                            color: 'white' 
                          }} 
                        />
                      </Box>

                      {/* Fake Button */}
                      <Box 
                        sx={{ 
                          py: 1, 
                          px: 2, 
                          borderRadius: '6px', 
                          bgcolor: colors.primary, 
                          color: '#fff',
                          textAlign: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          boxShadow: `0 2px 8px ${colors.primary}40`,
                        }}
                      >
                        Action Button
                      </Box>
                    </Box>

                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ThemeSettings;
