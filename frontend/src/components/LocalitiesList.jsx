import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Button
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Search as SearchIcon,
  Map as MapIcon,
  Home as HomeIcon,
  Navigation as NavigationIcon,
  Explore as ExploreIcon,
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';

const LocalitiesList = () => {
  const { city } = useParams();
  const [localities, setLocalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/public/localities`, {
          params: { city: city !== 'all' ? city : undefined }
        });
        if (response.data && response.data.success) {
          setLocalities(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching localities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocalities();
  }, [city]);

  // Filter localities by search term
  const filteredLocalities = localities.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (loc.postal_code && loc.postal_code.includes(searchTerm))
  );

  // Helper to render golden stars based on rating
  const renderStars = (ratingValue) => {
    const rating = ratingValue ? parseFloat(ratingValue) : 4.0;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const extraFullStar = rating % 1 >= 0.75 ? 1 : 0;

    const displayFullStars = fullStars + extraFullStar;
    const displayHalfStars = hasHalfStar ? 1 : 0;
    const displayEmptyStars = 5 - displayFullStars - displayHalfStars;

    for (let i = 0; i < displayFullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} sx={{ color: '#ffb020', fontSize: 18 }} />);
    }
    if (displayHalfStars) {
      stars.push(<StarHalfIcon key="half" sx={{ color: '#ffb020', fontSize: 18 }} />);
    }
    for (let i = 0; i < displayEmptyStars; i++) {
      stars.push(<StarBorderIcon key={`empty-${i}`} sx={{ color: '#cbd5e1', fontSize: 18 }} />);
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mt: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {stars}
        </Box>
        <Typography variant="body2" sx={{ ml: 1, fontWeight: 700, color: '#475569' }}>
          {rating.toFixed(1)}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ pt: 14, pb: 8, bgcolor: '#f8fafc', minHeight: '85vh' }}>
      {/* Decorative gradient banner */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '280px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #c084fc 100%)',
          zIndex: 0,
          opacity: 0.9
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        {/* Breadcrumbs / Header Info */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: 'white',
              textShadow: '0 4px 12px rgba(0,0,0,0.1)',
              letterSpacing: '-1px',
              mb: 1
            }}
          >
            Explore Localities in {city}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 400,
              maxWidth: '600px',
              mb: 4
            }}
          >
            Browse popular neighborhoods, view postal codes, coordinates, and find real estate opportunities.
          </Typography>

          {/* Search bar card */}
          <Card
            sx={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              p: 1.5,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              bgcolor: 'rgba(255, 255, 255, 0.95)'
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder={`Search localities in ${city}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#7c3aed', fontSize: 24 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '16px',
                    '& fieldset': { border: 'none' },
                    bgcolor: '#f1f5f9',
                    fontWeight: 600,
                    color: '#1e293b'
                  }
                }
              }}
            />
          </Card>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', mt: 4 }}>
            <CircularProgress size={60} sx={{ color: '#7c3aed' }} />
          </Box>
        ) : filteredLocalities.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              mt: 6,
              p: 6,
              bgcolor: 'white',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              border: '1px solid #e2e8f0'
            }}
          >
            <ExploreIcon sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
            <Typography variant="h4" sx={{ color: '#334155', fontWeight: 800, mb: 1 }}>
              No Localities Found
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', mb: 3 }}>
              We couldn't find any localities matching "{searchTerm}" in {city}.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setSearchTerm('')}
              sx={{
                bgcolor: '#7c3aed',
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
                '&:hover': { bgcolor: '#6d28d9' }
              }}
            >
              Clear Search
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {/* Locality stats banner */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 2 }}>
              <Typography variant="body1" sx={{ color: '#475569', fontWeight: 600 }}>
                Showing <Box component="span" sx={{ color: '#7c3aed', fontWeight: 800 }}>{filteredLocalities.length}</Box> localities in {city}
              </Typography>
            </Box>

            <Grid container spacing={3.5}>
              {filteredLocalities.map((locality) => (
                <Grid xs={12} sm={6} md={4} key={locality.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '24px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.02)',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: 'linear-gradient(90deg, #4f46e5, #c084fc)',
                        opacity: 0,
                        transition: 'opacity 0.3s'
                      },
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                        borderColor: '#c084fc',
                        '&::before': { opacity: 1 }
                      }
                    }}
                  >
                    {locality.image_url && (
                      <Box
                        sx={{
                          height: '180px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}
                      >
                        <Box
                          component="img"
                          src={locality.image_url}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                            '&:hover': { transform: 'scale(1.1)' }
                          }}
                        />
                      </Box>
                    )}
                    <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Locality Header */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3.5 }}>
                        <Box
                          sx={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '16px',
                            bgcolor: 'rgba(124, 58, 237, 0.1)',
                            color: '#7c3aed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <LocationIcon sx={{ fontSize: 28 }} />
                        </Box>
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>
                            {locality.name}
                          </Typography>
                          {locality.postal_code && (
                            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mt: 0.5 }}>
                              PIN: {locality.postal_code}
                            </Typography>
                          )}
                          {renderStars(locality.rating)}
                        </Box>
                      </Box>

                      {/* Technical Info (Lat/Lng Grid) */}
                      {(locality.latitude || locality.longitude) && (
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: '#f8fafc',
                            borderRadius: '16px',
                            border: '1px dashed #e2e8f0',
                            mb: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyStyle: 'space-between', width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#475569', flex: 1 }}>
                              <NavigationIcon sx={{ fontSize: 14, color: '#94a3b8', transform: 'rotate(45deg)' }} />
                              <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>Latitude:</Typography>
                            </Box>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace', fontWeight: 700, color: '#334155' }}>
                              {parseFloat(locality.latitude).toFixed(6)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyStyle: 'space-between', width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#475569', flex: 1 }}>
                              <MapIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                              <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>Longitude:</Typography>
                            </Box>
                            <Typography variant="caption" sx={{ fontFamily: 'monospace', fontWeight: 700, color: '#334155' }}>
                              {parseFloat(locality.longitude).toFixed(6)}
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Link
                          to={`/locality/${locality.name}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ExploreIcon />}
                            sx={{
                              borderRadius: '14px',
                              py: 1.5,
                              bgcolor: '#7c3aed',
                              color: 'white',
                              fontWeight: 700,
                              textTransform: 'none',
                              transition: 'all 0.2s',
                              '&:hover': {
                                bgcolor: '#6d28d9',
                                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
                              }
                            }}
                          >
                            Explore {locality.name}
                          </Button>
                        </Link>

                        <Link
                          to={`/properties?city=${city}&locality_id=${locality.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<HomeIcon />}
                            sx={{
                              borderRadius: '14px',
                              py: 1.5,
                              color: '#7c3aed',
                              borderColor: 'rgba(124, 58, 237, 0.3)',
                              fontWeight: 700,
                              textTransform: 'none',
                              transition: 'all 0.2s',
                              '&:hover': {
                                bgcolor: '#7c3aed',
                                color: 'white',
                                borderColor: '#7c3aed',
                                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
                              }
                            }}
                          >
                            View Properties
                          </Button>
                        </Link>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default LocalitiesList;
