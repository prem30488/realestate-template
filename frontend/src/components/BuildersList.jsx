import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { Container, Grid, Card, CardContent, Typography, Box, Avatar, Chip, CircularProgress } from '@mui/material';
import { Business as BusinessIcon, Star as StarIcon, Work as WorkIcon, LocationOn as LocationIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const BuildersList = () => {
  const { city } = useParams();
  const [builders, setBuilders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/builders`, {
          params: { city: city !== 'all' ? city : undefined }
        });
        setBuilders(response.data);
      } catch (error) {
        console.error('Error fetching builders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBuilders();
  }, [city]);

  return (
    <Box sx={{ pt: 12, pb: 8, bgcolor: '#f8fafc', minHeight: '80vh' }}>
      <Container>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, textAlign: 'center', color: '#1a1a2e' }}>
          Top Builders in {city !== 'all' && city ? city : 'Your Area'}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#64748b', textAlign: 'center', mb: 6 }}>
          Discover verified and highly-rated construction companies for your next project.
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress size={60} sx={{ color: '#6a11cb' }} />
          </Box>
        ) : builders.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 10, p: 5, bgcolor: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <BusinessIcon sx={{ fontSize: 60, color: '#cbd5e1', mb: 2 }} />
            <Typography variant="h5" sx={{ color: '#475569', fontWeight: 600 }}>No builders found</Typography>
            <Typography sx={{ color: '#94a3b8', mt: 1 }}>We couldn't find any verified builders in {city}. Try searching in another city.</Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {builders.map((builder) => (
              <Grid item xs={12} md={6} lg={4} key={builder.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }
                }}>
                  <Box sx={{ p: 3, display: 'flex', alignItems: 'flex-start', gap: 2, borderBottom: '1px solid #f1f5f9' }}>
                    <Avatar src={builder.logo_url} sx={{ width: 70, height: 70, border: '2px solid #e2e8f0', bgcolor: 'white', color: '#6a11cb' }}>
                      <BusinessIcon fontSize="large" />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', lineHeight: 1.2, mb: 0.5 }}>
                        {builder.company_name}
                        {builder.is_verified && <CheckCircleIcon sx={{ fontSize: 16, color: '#10b981', ml: 0.5, verticalAlign: 'middle' }} />}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationIcon sx={{ fontSize: 14 }} /> {builder.city}{builder.state ? `, ${builder.state}` : ''}
                      </Typography>
                      {builder.established_year && (
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mt: 0.5 }}>
                          Est. {builder.established_year} • {builder.company_type}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="body2" sx={{ color: '#475569', mb: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {builder.description || 'A highly reputable construction firm dedicated to building quality properties and infrastructure.'}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: '12px' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                          <StarIcon sx={{ color: '#fbbf24', fontSize: 20 }} /> {builder.average_rating}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>{builder.total_reviews} Reviews</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', px: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>{builder.total_projects_completed}</Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Completed</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>{builder.active_projects}</Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Active</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>Services Offered</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {(builder.services_offered || []).slice(0, 3).map((service, index) => (
                          <Chip key={index} label={service} size="small" sx={{ bgcolor: '#e0e7ff', color: '#4338ca', fontWeight: 600 }} />
                        ))}
                        {(builder.services_offered?.length > 3) && (
                          <Chip label={`+${builder.services_offered.length - 3} more`} size="small" sx={{ bgcolor: '#f1f5f9', color: '#64748b' }} />
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                  
                  <Box sx={{ p: 3, pt: 0, mt: 'auto', display: 'flex', gap: 2 }}>
                    <a href={`mailto:${builder.email}`} style={{ flex: 1, textDecoration: 'none' }}>
                      <Box sx={{ py: 1.5, textAlign: 'center', bgcolor: '#f1f5f9', borderRadius: '10px', color: '#334155', fontWeight: 600, transition: '0.2s', '&:hover': { bgcolor: '#e2e8f0' } }}>
                        Email
                      </Box>
                    </a>
                    {builder.website_url ? (
                      <a href={builder.website_url.startsWith('http') ? builder.website_url : `https://${builder.website_url}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
                        <Box sx={{ py: 1.5, textAlign: 'center', bgcolor: '#6a11cb', borderRadius: '10px', color: 'white', fontWeight: 600, transition: '0.2s', '&:hover': { bgcolor: '#2575fc' } }}>
                          Website
                        </Box>
                      </a>
                    ) : builder.phone_primary ? (
                      <a href={`tel:${builder.phone_primary}`} style={{ flex: 1, textDecoration: 'none' }}>
                        <Box sx={{ py: 1.5, textAlign: 'center', bgcolor: '#6a11cb', borderRadius: '10px', color: 'white', fontWeight: 600, transition: '0.2s', '&:hover': { bgcolor: '#2575fc' } }}>
                          Call
                        </Box>
                      </a>
                    ) : null}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default BuildersList;
