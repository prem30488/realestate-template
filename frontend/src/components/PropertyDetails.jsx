import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Card, CardContent,
  Button, Divider, Chip, IconButton, CircularProgress,
  List, ListItem, ListItemIcon, ListItemText, Avatar,
  Accordion, AccordionSummary, AccordionDetails, TextField,
  Rating, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
  LocationOn, Bed, Bathtub, SquareFoot, DirectionsCar,
  CheckCircle, WhatsApp, Phone, Email, ArrowBack,
  Share, FavoriteBorder, Map as MapIcon, Visibility,
  ExpandMore, Star, Edit, Info, Add, Business
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../constants';
import PremiumImageCarousel from './PremiumImageCarousel';
import './PropertyDetails.css';

// Fix for Leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

const PropertyDetails = ({ onLoginRequired }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [viewed, setViewed] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [shareMsg, setShareMsg] = useState('');

  // Reviews & FAQ state
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [openFaqModal, setOpenFaqModal] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('Coming Soon...');
  const [submittingFaq, setSubmittingFaq] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/properties/${id}`);
        if (!res.ok) throw new Error('Property not found');
        const data = await res.json();
        setProperty(data);

        // Fetch reviews & faqs
        try {
          const revRes = await fetch(`${API_BASE_URL}/api/properties/${id}/reviews`);
          if (revRes.ok) setReviews(await revRes.json());
          const faqRes = await fetch(`${API_BASE_URL}/api/properties/${id}/faqs`);
          if (faqRes.ok) setFaqs(await faqRes.json());
        } catch (e) {
          console.error('Error fetching reviews or faqs', e);
        }

        // Check if saved and viewed
        const token = localStorage.getItem('token');
        if (token) {
          const statusRes = await fetch(`${API_BASE_URL}/api/shortlist/check/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (statusRes.ok) {
            const statusData = await statusRes.json();
            setSaved(statusData.isShortlisted);
          }

          const viewRes = await fetch(`${API_BASE_URL}/api/viewed-properties/check/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (viewRes.ok) {
            const viewData = await viewRes.json();
            setViewed(viewData.isViewed);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      if (onLoginRequired) onLoginRequired();
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/shortlist/${id}`, {
        method: saved ? 'DELETE' : 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setSaved(!saved);
    } catch (err) {
      console.error('Error saving property:', err);
    }
  };

  const handleMarkViewed = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      if (onLoginRequired) onLoginRequired();
      return;
    }
    setViewing(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/viewed-properties/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setViewed(true);
        toast.success('Property added to your Viewed Properties history!');
      }
    } catch (err) {
      console.error('Error marking property viewed:', err);
      toast.error('Could not record view');
    } finally {
      setViewing(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: property.title, text: `Check out this property: ${property.title}`, url });
      } catch (err) { /* user cancelled */ }
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setShareMsg('Link copied!');
        setTimeout(() => setShareMsg(''), 2000);
      });
    }
  };

  const handleOpenReviewModal = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      if (onLoginRequired) onLoginRequired();
      return;
    }
    setOpenReviewModal(true);
  };

  const handleOpenFaqModal = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      if (onLoginRequired) onLoginRequired();
      return;
    }
    setOpenFaqModal(true);
  };

  const handleAddReview = async () => {
    if (!reviewComment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }
    const token = localStorage.getItem('token');
    setSubmittingReview(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/properties/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating: reviewRating, comment: reviewComment })
      });
      if (!res.ok) throw new Error('Failed to submit review');
      const data = await res.json();
      setReviews([data.review, ...reviews]);
      setReviewComment('');
      setReviewRating(5);
      setOpenReviewModal(false);
      toast.success('Review added successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleAddFaq = async () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) {
      toast.error('Question and answer are required');
      return;
    }
    const token = localStorage.getItem('token');
    setSubmittingFaq(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/properties/${id}/faqs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ question: newFaqQuestion, answer: newFaqAnswer })
      });
      if (!res.ok) throw new Error('Failed to submit FAQ');
      const data = await res.json();
      setFaqs([...faqs, data.faq]);
      setNewFaqQuestion('');
      setNewFaqAnswer('');
      setOpenFaqModal(false);
      toast.success('FAQ added successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmittingFaq(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#ffffff' }}>
      <CircularProgress color="primary" />
    </Box>
  );

  if (error || !property) return (
    <Box sx={{ p: 10, textAlign: 'center', bgcolor: '#ffffff', minHeight: '100vh', pt: '150px' }}>
      <Typography variant="h4" color="textPrimary">{error || 'Property not found'}</Typography>
      <Button component={Link} to="/properties" sx={{ mt: 3 }} className="primary-btn">Back to Properties</Button>
    </Box>
  );

  const indoorAmenities = property.amenities?.filter(a => a.type?.toLowerCase() === 'indoor') || [];
  const outdoorAmenities = property.amenities?.filter(a => a.type?.toLowerCase() === 'outdoor') || [];
  const otherAmenities = property.amenities?.filter(a => !['indoor', 'outdoor'].includes(a.type?.toLowerCase())) || [];

  const defaultFaqs = [
    { id: 'd1', question: 'What is the booking or buying process for this property?', answer: 'You can initiate inquiry via WhatsApp or direct call to the agent. Once terms are agreed, standard documentation and initial deposit will secure the property.' },
    { id: 'd2', question: 'Are property prices or security deposits negotiable?', answer: 'Price flexibility depends entirely on the owner and current market demand. Feel free to discuss offers directly during your inquiry.' },
    { id: 'd3', question: 'Is home loan or legal assistance available?', answer: 'Yes, our platform partners with top financial institutions to provide streamlined home loan approvals and property title verification.' }
  ];
  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;
  const avgRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '5.0';

  return (
    <Box className="white-theme-bg" sx={{ minHeight: '100vh', pt: '100px', pb: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Button
              component={Link}
              to="/properties"
              startIcon={<ArrowBack />}
              sx={{ color: '#555', mb: 2, '&:hover': { color: '#000' } }}
            >
              Back to search
            </Button>
            <Typography variant="h3" className="premium-heading" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
              {property.title}
              {property.verified && (
                <CheckCircle sx={{ color: '#2563eb', fontSize: '32px' }} titleAccess="Verified Property" />
              )}
            </Typography>
            <Box className="property-location" sx={{ fontSize: '18px' }}>
              <LocationOn sx={{ mr: 1, color: 'var(--premium-accent-secondary)' }} />
              {property.location}, {property.city}, {property.state}
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h3" className="price-tag" sx={{ mb: 1 }}>
              ₹ {parseFloat(property.price).toLocaleString('en-IN')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Chip label={property.status} color="primary" sx={{ fontWeight: 'bold' }} />
              <Chip label={property.propertyType?.name} variant="outlined" />
            </Box>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Main Content Area */}
          <Grid item xs={12} lg={8}>
            {/* Image Gallery */}
            <Box sx={{ borderRadius: '24px', overflow: 'hidden', mb: 4, height: { xs: '300px', md: '500px' }, border: '1px solid var(--premium-border)', boxShadow: 'var(--premium-shadow)' }}>
              <PremiumImageCarousel images={property.images?.map(img => img.imageUrl) || []} />
            </Box>

            {/* Key Features */}
            <Box className="premium-card" sx={{ p: 4, mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, color: 'textPrimary' }}>Property Overview</Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                  <Box className="amenity-large">
                    <Bed fontSize="large" />
                    <Typography variant="h6">{property.no_of_bedrooms}</Typography>
                    <Typography variant="body2" color="text.secondary">Bedrooms</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box className="amenity-large">
                    <Bathtub fontSize="large" />
                    <Typography variant="h6">{property.no_of_bathrooms}</Typography>
                    <Typography variant="body2" color="text.secondary">Bathrooms</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box className="amenity-large">
                    <SquareFoot fontSize="large" />
                    <Typography variant="h6">{property.area}</Typography>
                    <Typography variant="body2" color="text.secondary">Sq Ft</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box className="amenity-large">
                    <DirectionsCar fontSize="large" />
                    <Typography variant="h6">{property.no_of_garage}</Typography>
                    <Typography variant="body2" color="text.secondary">Garage</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3, borderColor: '#e2e8f0' }} />
              <Typography variant="h6" sx={{ mb: 2, color: 'textPrimary', fontWeight: 'bold' }}>Quick Features & Suitability</Typography>
              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body2" color="text.secondary">Furnishing Type</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b', textTransform: 'capitalize' }}>
                    {property.furnishing_type === 'none' ? 'Unfurnished' : property.furnishing_type}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body2" color="text.secondary">Availability</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                    {property.availability}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Suitability</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {property.bachelor_friendly && (
                      <Chip label="Bachelor Friendly" color="info" size="small" sx={{ fontWeight: 'bold', bgcolor: '#e0f2fe', color: '#0369a1', fontSize: '11px' }} />
                    )}
                    {property.family_friendly && (
                      <Chip label="Family Friendly" color="success" size="small" sx={{ fontWeight: 'bold', bgcolor: '#dcfce7', color: '#15803d', fontSize: '11px' }} />
                    )}
                    {property.live_in_friendly && (
                      <Chip label="Live-in Friendly" color="secondary" size="small" sx={{ fontWeight: 'bold', bgcolor: '#f3e8ff', color: '#7e22ce', fontSize: '11px' }} />
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3, borderColor: '#e2e8f0' }} />

              <Typography variant="h5" sx={{ mb: 2, color: '#000' }}>Description</Typography>
              <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {property.description || `Experience luxury living in this stunning ${property.propertyType?.name} located in the heart of ${property.city}. 
                This property features ${property.no_of_bedrooms} spacious bedrooms and ${property.no_of_bathrooms} modern bathrooms, 
                offering a perfect blend of comfort and style. The open-plan layout ensures plenty of natural light, 
                while the premium finishes throughout the home add an elegant touch.
                Ideal for families or professionals seeking a premium lifestyle in ${property.location}.`}
              </Typography>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h5" sx={{ mb: 3, color: 'textPrimary' }}>Amenities</Typography>
              <Grid container spacing={4}>
                {indoorAmenities.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, color: '#1a56db', fontWeight: 'bold' }}>Indoor Amenities</Typography>
                    <List dense>
                      {indoorAmenities.map(amenity => (
                        <ListItem key={amenity.id} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 35 }}>
                            <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText primary={amenity.title} sx={{ '& .MuiListItemText-primary': { color: '#000' } }} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                )}
                {outdoorAmenities.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, color: '#1a56db', fontWeight: 'bold' }}>Outdoor Amenities</Typography>
                    <List dense>
                      {outdoorAmenities.map(amenity => (
                        <ListItem key={amenity.id} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 35 }}>
                            <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText primary={amenity.title} sx={{ '& .MuiListItemText-primary': { color: '#000' } }} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                )}
                {otherAmenities.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, color: '#1a56db', fontWeight: 'bold' }}>Other Amenities</Typography>
                    <List dense>
                      {otherAmenities.map(amenity => (
                        <ListItem key={amenity.id} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 35 }}>
                            <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText primary={amenity.title} sx={{ '& .MuiListItemText-primary': { color: '#000' } }} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                )}
                {(!property.amenities || property.amenities.length === 0) && (
                  <Grid item xs={12}>
                    <Typography color="text.secondary">No specific amenities listed.</Typography>
                  </Grid>
                )}
              </Grid>
              {/* Locality Section */}
              {property.locality && (
                <Box sx={{ mt: 4, mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <Typography variant="h5" sx={{ mb: 2, color: 'textPrimary', display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1, color: '#2563eb' }} /> Locality Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">Name</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                        {property.locality.name}
                      </Typography>
                    </Grid>
                    {property.locality.postal_code && (
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Postal Code</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                          {property.locality.postal_code}
                        </Typography>
                      </Grid>
                    )}
                    {property.locality.rating && (
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Locality Rating</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Star sx={{ color: '#f59e0b', fontSize: '18px', mr: 0.5 }} />
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                            {property.locality.rating} / 5.0
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}

              {/* Project Section */}
              {property.project && (
                <Box sx={{ mt: 4, mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <Typography variant="h5" sx={{ mb: 2, color: 'textPrimary', display: 'flex', alignItems: 'center' }}>
                    <Business sx={{ mr: 1, color: '#2563eb' }} /> Project Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">Name</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                        {property.project.projectName}
                      </Typography>
                    </Grid>
                    {property.project.bhk && (
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">BHK configurations</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                          {property.project.bhk}
                        </Typography>
                      </Grid>
                    )}
                    {property.project.budget && (
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Price Range</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                          {property.project.budget}
                        </Typography>
                      </Grid>
                    )}
                    {property.project.project_size && (
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Project Size</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                          {property.project.project_size}
                        </Typography>
                      </Grid>
                    )}
                    {property.project.total_units && (
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Total Units</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                          {property.project.total_units} Units
                        </Typography>
                      </Grid>
                    )}
                    {property.project.ratings && (
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Project Rating</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Star sx={{ color: '#f59e0b', fontSize: '18px', mr: 0.5 }} />
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                            {property.project.ratings} / 5.0
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}

              {/* Map Section */}
              {property.latitude && property.longitude && !isNaN(parseFloat(property.latitude)) && !isNaN(parseFloat(property.longitude)) && (
                <>
                  <Divider sx={{ my: 4 }} />
                  <Typography variant="h5" sx={{ mb: 3, color: 'textPrimary', display: 'flex', alignItems: 'center' }}>
                    <MapIcon sx={{ mr: 1 }} /> Location Map
                  </Typography>
                  <Box sx={{ height: '1550px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--premium-border)' }}>
                    <MapContainer
                      center={[parseFloat(property.latitude), parseFloat(property.longitude)]}
                      zoom={15}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <ChangeView center={[parseFloat(property.latitude), parseFloat(property.longitude)]} zoom={15} />
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={[parseFloat(property.latitude), parseFloat(property.longitude)]}>
                        <Popup>{property.title}</Popup>
                      </Marker>
                    </MapContainer>
                  </Box>
                </>
              )}

              {/* FAQ Section */}
              <Box className="premium-card" sx={{ p: 4, mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Typography variant="h5" sx={{ color: 'textPrimary', display: 'flex', alignItems: 'center', fontWeight: 800 }}>
                    <Info sx={{ mr: 1, color: '#2563eb' }} /> Frequently Asked Questions
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Add />}
                    sx={{ borderRadius: '20px', borderColor: '#2563eb', color: '#2563eb' }}
                    onClick={handleOpenFaqModal}
                  >
                    Ask a Question
                  </Button>
                </Box>
                {displayFaqs.map((faq, idx) => (
                  <Accordion key={faq.id || idx} sx={{ mb: 1, borderRadius: '12px !important', boxShadow: 'none', border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMore />} sx={{ fontWeight: 700, color: '#1a202e' }}>
                      <Typography sx={{ fontWeight: 600 }}>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ bgcolor: '#f8fafc', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', color: '#475569' }}>
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{faq.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>

              {/* Reviews Section */}
              <Box className="premium-card" sx={{ p: 4, mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" sx={{ color: 'textPrimary', display: 'flex', alignItems: 'center', fontWeight: 800 }}>
                      <Edit sx={{ mr: 1, color: '#f59e0b' }} /> Reviews & Ratings
                    </Typography>
                    <Chip
                      icon={<Star sx={{ color: '#f59e0b !important', fontSize: '18px' }} />}
                      label={`${avgRating} / 5.0 (${reviews.length} Review${reviews.length === 1 ? '' : 's'})`}
                      sx={{ bgcolor: '#fef3c7', color: '#d97706', fontWeight: 800, fontSize: '14px' }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Edit />}
                    sx={{ borderRadius: '20px', bgcolor: '#f59e0b', '&:hover': { bgcolor: '#d97706' } }}
                    onClick={handleOpenReviewModal}
                  >
                    Write Review
                  </Button>
                </Box>
                <Divider sx={{ mb: 3 }} />
                {reviews.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4, bgcolor: '#f8fafc', borderRadius: '16px' }}>
                    <Star sx={{ fontSize: 48, color: '#cbd5e1', mb: 1 }} />
                    <Typography variant="h6" sx={{ color: '#64748b', mb: 1 }}>No reviews yet</Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>Be the first one to share your experience regarding this property!</Typography>
                  </Box>
                ) : (
                  <List sx={{ p: 0 }}>
                    {reviews.map((rev) => (
                      <React.Fragment key={rev.id}>
                        <ListItem sx={{ px: 0, py: 2.5, alignItems: 'flex-start' }}>
                          <Avatar sx={{ width: 44, height: 44, mr: 2, bgcolor: '#2563eb', fontWeight: 700 }}>
                            {rev.user?.username ? rev.user.username[0].toUpperCase() : 'U'}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a202e' }}>
                                {rev.user?.username || 'Anonymous User'}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </Typography>
                            </Box>
                            <Rating value={rev.rating} readOnly size="small" sx={{ color: '#f59e0b', mb: 1 }} />
                            <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                              {rev.comment}
                            </Typography>
                          </Box>
                        </ListItem>
                        <Divider component="li" sx={{ borderColor: '#f1f5f9' }} />
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Sidebar / Contact Info */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: '100px' }}>
              <Box className="premium-card" sx={{ p: 4, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, color: 'textPrimary' }}>Listed By</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{ width: 60, height: 60, mr: 2, border: '2px solid var(--premium-accent)' }}
                    src={`https://ui-avatars.com/api/?name=${property.owner?.username}&background=random`}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ color: 'textPrimary' }}>{property.owner?.username}</Typography>
                    <Typography variant="body2" color="text.secondary">Verified Professional</Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Button
                  fullWidth
                  variant="contained"
                  className="primary-btn"
                  startIcon={<WhatsApp />}
                  sx={{ mb: 2, height: '50px' }}
                  onClick={() => window.open(`https://wa.me/${property.owner?.phoneNumber || '919876543210'}?text=Hi, I'm interested in your property: ${property.title}`)}
                >
                  WhatsApp Inquiry
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  className="secondary-btn outline-glow"
                  startIcon={<Phone />}
                  sx={{ mb: 2, height: '50px' }}
                >
                  {property.owner?.phoneNumber || 'Call Agent'}
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  startIcon={<Email />}
                  sx={{ color: '#555', mt: 1 }}
                  onClick={() => window.open(`mailto:${property.owner?.email || ''}?subject=Inquiry about: ${property.title}`)}
                >
                  Send Email
                </Button>
              </Box>

              <Box className="premium-card" sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, color: 'textPrimary' }}>Quick Actions</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant={saved ? 'contained' : 'outlined'}
                      startIcon={<FavoriteBorder />}
                      sx={{ borderColor: '#e2e8f0', color: saved ? '#fff' : '#000', bgcolor: saved ? '#e53935' : 'transparent' }}
                      onClick={handleSave}
                    >
                      {saved ? 'Saved' : 'Save'}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Share />}
                      sx={{ borderColor: '#e2e8f0', color: '#000' }}
                      onClick={handleShare}
                    >
                      {shareMsg || 'Share'}
                    </Button>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant={viewed ? 'contained' : 'outlined'}
                  color="primary"
                  disabled={viewing}
                  startIcon={<Visibility />}
                  sx={{ mt: 2, borderRadius: '12px', py: 1.5, fontWeight: 'bold' }}
                  onClick={handleMarkViewed}
                >
                  {viewing ? 'Recording...' : viewed ? 'Viewed' : 'I have viewed it!!'}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Write Review Modal */}
        <Dialog open={openReviewModal} onClose={() => setOpenReviewModal(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px', p: 2 } }}>
          <DialogTitle sx={{ fontWeight: 800, color: '#1a202e', pb: 1 }}>Write a Review</DialogTitle>
          <DialogContent>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#64748b', fontWeight: 700 }}>Overall Rating</Typography>
              <Rating
                value={reviewRating}
                onChange={(event, newValue) => setReviewRating(newValue || 5)}
                size="large"
                sx={{ color: '#f59e0b' }}
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Your Experience / Comments"
              placeholder="Tell us what you liked or disliked about this property..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button variant="outlined" onClick={() => setOpenReviewModal(false)} sx={{ borderRadius: '12px', color: '#64748b', borderColor: '#cbd5e1' }}>Cancel</Button>
            <Button variant="contained" disabled={submittingReview} onClick={handleAddReview} sx={{ borderRadius: '12px', bgcolor: '#f59e0b', '&:hover': { bgcolor: '#d97706' } }}>
              {submittingReview ? 'Submitting...' : 'Post Review'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Ask Question Modal */}
        <Dialog open={openFaqModal} onClose={() => setOpenFaqModal(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px', p: 2 } }}>
          <DialogTitle sx={{ fontWeight: 800, color: '#1a202e', pb: 1 }}>Ask a Question</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
              Have a question about this listing? Ask below and the property owner or our support team will respond shortly.
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              label="Your Question"
              placeholder="e.g. Is covered car parking included with this property?"
              value={newFaqQuestion}
              onChange={(e) => setNewFaqQuestion(e.target.value)}
              sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              fullWidth
              disabled
              variant="outlined"
              label="Answer (Default)"
              value={newFaqAnswer}
              onChange={(e) => setNewFaqAnswer(e.target.value)}
              sx={{ mt: 3, '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f1f5f9' } }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button variant="outlined" onClick={() => setOpenFaqModal(false)} sx={{ borderRadius: '12px', color: '#64748b', borderColor: '#cbd5e1' }}>Cancel</Button>
            <Button variant="contained" disabled={submittingFaq} onClick={handleAddFaq} sx={{ borderRadius: '12px', bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' } }}>
              {submittingFaq ? 'Submitting...' : 'Submit Question'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default PropertyDetails;
