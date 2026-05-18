import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Card, CardContent, CardMedia,
  Button, Chip, CircularProgress, Divider
} from '@mui/material';
import { LocationOn, Bed, Bathtub, SquareFoot, Favorite, ArrowForward } from '@mui/icons-material';
import { API_BASE_URL } from '../constants';

const ShortlistedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShortlist = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your shortlisted properties.');
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/api/shortlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch shortlist');
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShortlist();
    window.scrollTo(0, 0);
  }, []);

  const handleRemove = async (propertyId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/shortlist/${propertyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setProperties(prev => prev.filter(p => p.id !== propertyId));
      }
    } catch (err) {
      console.error('Error removing from shortlist:', err);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', pt: '100px', pb: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Favorite sx={{ color: '#e53935', fontSize: 32 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', fontFamily: 'Outfit, sans-serif' }}>
              Shortlisted Properties
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#555' }}>
            {properties.length} propert{properties.length === 1 ? 'y' : 'ies'} saved
          </Typography>
          <Divider sx={{ mt: 3, borderColor: '#e2e8f0' }} />
        </Box>

        {/* Loading */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {/* Error */}
        {!loading && error && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" color="error">{error}</Typography>
          </Box>
        )}

        {/* Empty State */}
        {!loading && !error && properties.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#f8fafc', borderRadius: '20px' }}>
            <Favorite sx={{ fontSize: 64, color: '#e2e8f0', mb: 2 }} />
            <Typography variant="h5" sx={{ color: '#000', mb: 1 }}>No saved properties yet</Typography>
            <Typography variant="body1" sx={{ color: '#555', mb: 3 }}>
              Browse properties and click "Save" to add them here.
            </Typography>
            <Button component={Link} to="/properties" variant="contained" sx={{ borderRadius: '30px', px: 4 }}>
              Browse Properties
            </Button>
          </Box>
        )}

        {/* Properties Grid */}
        {!loading && !error && properties.length > 0 && (
          <Grid container spacing={3}>
            {properties.map(property => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card sx={{
                  height: '100%',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.12)', transform: 'translateY(-4px)', borderColor: '#2563eb' }
                }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={property.images?.[0]?.imageUrl || `https://picsum.photos/400/220?random=${property.id}`}
                      alt={property.title}
                    />
                    <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                      <Chip label={property.status} color="primary" size="small" sx={{ fontWeight: 'bold' }} />
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute', top: 10, right: 10,
                        bgcolor: 'rgba(255,255,255,0.9)', borderRadius: '50%',
                        width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', '&:hover': { bgcolor: '#fee2e2' }
                      }}
                      onClick={() => handleRemove(property.id)}
                      title="Remove from shortlist"
                    >
                      <Favorite sx={{ color: '#e53935', fontSize: 20 }} />
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{
                      fontWeight: 800, color: '#1a56db', mb: 0.5,
                      background: 'linear-gradient(45deg, #1a56db, #2563eb)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>
                      ₹ {parseFloat(property.price).toLocaleString('en-IN')}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#000', mb: 1, fontSize: '1rem' }} noWrap>
                      <Link to={`/properties/${property.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {property.title}
                      </Link>
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: '#555' }}>
                      <LocationOn fontSize="small" sx={{ mr: 0.5, color: '#2563eb' }} />
                      <Typography variant="body2" noWrap>{property.location}, {property.city}</Typography>
                    </Box>

                    <Divider sx={{ mb: 2, borderColor: '#e2e8f0' }} />

                    <Grid container spacing={1} sx={{ mb: 2, color: '#555' }}>
                      <Grid item xs={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Bed fontSize="small" sx={{ color: '#888' }} />
                          <Typography variant="body2">{property.no_of_bedrooms}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Bathtub fontSize="small" sx={{ color: '#888' }} />
                          <Typography variant="body2">{property.no_of_bathrooms}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <SquareFoot fontSize="small" sx={{ color: '#888' }} />
                          <Typography variant="body2">{property.area} <Box component="span" sx={{ fontSize: '10px' }}>sqft</Box></Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button
                        size="small"
                        variant="text"
                        startIcon={<Favorite sx={{ color: '#e53935' }} />}
                        sx={{ color: '#e53935', fontSize: '12px', p: 0, minWidth: 'auto' }}
                        onClick={() => handleRemove(property.id)}
                      >
                        Remove
                      </Button>
                      <Button
                        component={Link}
                        to={`/properties/${property.id}`}
                        variant="contained"
                        size="small"
                        endIcon={<ArrowForward />}
                        sx={{ borderRadius: '20px', fontSize: '12px' }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ShortlistedProperties;
