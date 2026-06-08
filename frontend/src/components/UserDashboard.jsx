import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Map as MapIcon,
  Visibility as VisibilityIcon,
  Description as GuideIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../constants';
import { useCity } from '../context/CityContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link as RouterLink } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet fix
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const UserDashboard = () => {
  const { selectedCity } = useCity();
  const [shortlisted, setShortlisted] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [savedGuides, setSavedGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');

        // Fetch shortlist
        const shortlistRes = await axios.get(`${API_BASE_URL}/api/shortlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setShortlisted(shortlistRes.data);

        // Fetch viewed properties
        const viewedRes = await axios.get(`${API_BASE_URL}/api/viewed-properties`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setViewed(viewedRes.data);

        // Fetch city details for map centering
        const cityRes = await fetch(`${API_BASE_URL}/api/cities/${encodeURIComponent(selectedCity)}`);
        if (cityRes.ok) {
          const data = await cityRes.json();
          setCityData(data);
        }

        // Fetch saved guides from localStorage
        const saved = JSON.parse(localStorage.getItem('savedGuides') || '[]');
        setSavedGuides(saved);
      } catch (error) {
        toast.error('Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCity]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress sx={{ color: '#ff5e14' }} />
      </Box>
    );
  }

  const mapCenter = cityData?.latitude && cityData?.longitude
    ? [parseFloat(cityData.latitude), parseFloat(cityData.longitude)]
    : (shortlisted.length > 0 && shortlisted[0].latitude ? [parseFloat(shortlisted[0].latitude), parseFloat(shortlisted[0].longitude)] : [23.0225, 72.5714]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202e', mb: 1 }}>
            Welcome Back!
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon sx={{ color: '#ff5e14', fontSize: 20 }} /> Exploring properties in <strong>{selectedCity}</strong>
          </Typography>
        </Box>
        <Button
          variant="contained"
          component={RouterLink}
          to="/my-properties"
          sx={{
            bgcolor: '#ff5e14',
            '&:hover': { bgcolor: '#e54d00' },
            borderRadius: '12px',
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 700,
            boxShadow: '0 8px 20px rgba(255, 94, 20, 0.25)'
          }}
        >
          Post a Property
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Shortlist Map Section */}
        <Grid xs={12} lg={8}>
          <Paper sx={{ p: 0, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' }}>
            <Box sx={{ p: 3, bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 1 }}>
              <MapIcon sx={{ color: '#64748b' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a202e' }}>Shortlisted Locations</Typography>
            </Box>
            <Box sx={{ height: 500, width: '100%' }}>
              <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {shortlisted.map((prop) => (
                  prop.latitude && prop.longitude && (
                    <Marker key={prop.id} position={[parseFloat(prop.latitude), parseFloat(prop.longitude)]}>
                      <Popup>
                        <Box sx={{ width: 200 }}>
                          {prop.images?.[0] && (
                            <img src={prop.images[0].imageUrl} alt={prop.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }} />
                          )}
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{prop.title}</Typography>
                          <Typography variant="caption" color="textSecondary">{prop.location}</Typography>
                          <Typography variant="body2" sx={{ color: '#ff5e14', fontWeight: 700, mt: 0.5 }}>
                            ₹{parseFloat(prop.price).toLocaleString()}
                          </Typography>
                        </Box>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Shortlist Sidebar List */}
        <Grid xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202e' }}>My Shortlist</Typography>
                <Chip label={shortlisted.length} sx={{ bgcolor: '#fff1f0', color: '#ff4d4f', fontWeight: 700, fontSize: '12px' }} />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ maxHeight: 420, overflowY: 'auto', pr: 1, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { bgcolor: '#e2e8f0', borderRadius: '10px' } }}>
                {shortlisted.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <FavoriteIcon sx={{ fontSize: 48, color: '#f1f5f9', mb: 2 }} />
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>You haven't shortlisted any properties yet.</Typography>
                  </Box>
                ) : (
                  shortlisted.map((prop) => (
                    <Card
                      key={prop.id}
                      sx={{
                        display: 'flex',
                        mb: 2,
                        borderRadius: '16px',
                        boxShadow: 'none',
                        border: '1px solid #f1f5f9',
                        transition: '0.2s',
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 16px rgba(0,0,0,0.05)', borderColor: '#ff5e14' }
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 100, height: 100, borderRadius: '12px', m: 1 }}
                        image={prop.images?.[0]?.imageUrl || 'https://via.placeholder.com/100'}
                        alt={prop.title}
                      />
                      <CardContent sx={{ p: '12px !important', flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5, color: '#1a202e' }}>
                          {prop.title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                          {prop.location}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ff5e14', fontWeight: 800 }}>
                          ₹{parseFloat(prop.price).toLocaleString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Box>

              {shortlisted.length > 0 && (
                <Button
                  fullWidth
                  variant="outlined"
                  component={RouterLink}
                  to="/shortlist"
                  sx={{ mt: 2, borderRadius: '10px', borderColor: '#e2e8f0', color: '#64748b', textTransform: 'none', fontWeight: 600 }}
                >
                  View All Shortlisted Properties
                </Button>
              )}
            </Paper>

            <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202e' }}>Recently Viewed</Typography>
                <Chip label={viewed.length} sx={{ bgcolor: '#e0f2fe', color: '#0284c7', fontWeight: 700, fontSize: '12px' }} />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ maxHeight: 420, overflowY: 'auto', pr: 1, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { bgcolor: '#e2e8f0', borderRadius: '10px' } }}>
                {viewed.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <VisibilityIcon sx={{ fontSize: 48, color: '#f1f5f9', mb: 2 }} />
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>You haven't viewed any properties yet.</Typography>
                  </Box>
                ) : (
                  viewed.map((prop) => (
                    <Card
                      key={prop.id}
                      component={RouterLink}
                      to={`/properties/${prop.id}`}
                      sx={{
                        display: 'flex',
                        textDecoration: 'none',
                        mb: 2,
                        borderRadius: '16px',
                        boxShadow: 'none',
                        border: '1px solid #f1f5f9',
                        transition: '0.2s',
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 16px rgba(0,0,0,0.05)', borderColor: '#0284c7' }
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 100, height: 100, borderRadius: '12px', m: 1 }}
                        image={prop.images?.[0]?.imageUrl || 'https://via.placeholder.com/100'}
                        alt={prop.title}
                      />
                      <CardContent sx={{ p: '12px !important', flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5, color: '#1a202e' }}>
                          {prop.title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                          {prop.location}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#0284c7', fontWeight: 800 }}>
                          ₹{parseFloat(prop.price).toLocaleString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Box>

              {viewed.length > 0 && (
                <Button
                  fullWidth
                  variant="outlined"
                  component={RouterLink}
                  to="/viewed-properties"
                  sx={{ mt: 2, borderRadius: '10px', borderColor: '#e2e8f0', color: '#64748b', textTransform: 'none', fontWeight: 600 }}
                >
                  View All Browsing History
                </Button>
              )}
            </Paper>

            <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202e' }}>Saved Guides</Typography>
                <Chip label={savedGuides.length} sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontWeight: 700, fontSize: '12px' }} />
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ maxHeight: 300, overflowY: 'auto', pr: 1, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { bgcolor: '#e2e8f0', borderRadius: '10px' } }}>
                {savedGuides.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <GuideIcon sx={{ fontSize: 40, color: '#f1f5f9', mb: 1 }} />
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>No guides saved yet.</Typography>
                  </Box>
                ) : (
                  savedGuides.map((guide, idx) => (
                    <Box
                      key={idx}
                      component={RouterLink}
                      to={guide.path}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2,
                        p: 1.5,
                        borderRadius: '12px',
                        textDecoration: 'none',
                        border: '1px solid #f1f5f9',
                        transition: '0.2s',
                        '&:hover': { bgcolor: '#f8fafc', borderColor: '#16a34a' }
                      }}
                    >
                      <img src={guide.image} alt="" style={{ width: 50, height: 50, borderRadius: '8px', objectFit: 'cover' }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a202e', lineHeight: 1.2 }}>
                          {guide.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600 }}>
                          {guide.category}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: '20px', bgcolor: '#ff5e14', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Premium Assistance</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>Need help finding the right home? Our experts are here for you.</Typography>
                <Button variant="contained" sx={{ bgcolor: 'white', color: '#ff5e14', fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#f8fafc' } }}>
                  Contact Support
                </Button>
              </Box>
              <HomeIcon sx={{ position: 'absolute', right: -20, bottom: -20, fontSize: 120, opacity: 0.1, color: 'white' }} />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
