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
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  Chip,
  TablePagination,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Map as MapIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  AddCircle as AddCircleIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../constants';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
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

const steps = ['Select Location', 'Address Details', 'Property Specifics', 'Images'];

const MyPropertiesManager = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    typeId: '',
    city: '',
    state: '',
    country: 'India',
    location: '',
    latitude: 23.2156,
    longitude: 72.6369,
    price: '',
    status: 'For Sale',
    area: '',
    no_of_bedrooms: '',
    no_of_bathrooms: '',
    no_of_garage: '',
    description: '',
    featured: false,
    images: [],
    verified: false,
    furnishing_type: 'none',
    bachelor_friendly: false,
    availability: 'Immediate',
    family_friendly: false,
    live_in_friendly: false
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  
  // Amenities state
  const [allAmenities, setAllAmenities] = useState([]);
  const [amenitiesDialogOpen, setAmenitiesDialogOpen] = useState(false);
  const [selectedPropertyForAmenities, setSelectedPropertyForAmenities] = useState(null);
  const [selectedAmenityIds, setSelectedAmenityIds] = useState([]);
  const [savingAmenities, setSavingAmenities] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const endpoint = `${API_BASE_URL}/api/my-properties`;
      console.log('MyPropertiesManager: Fetching from:', endpoint);
      const response = await axios.get(endpoint, {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search: searchTerm
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      // The /api/my-properties endpoint returns a direct array
      setProperties(response.data);
      setTotalCount(response.data.length);
    } catch (error) {
      toast.error('Error fetching properties');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAmenities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/amenities`);
      setAllAmenities(response.data);
    } catch (error) {
      console.error('Error fetching all amenities:', error);
    }
  };

  const fetchPropertyAmenities = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/properties/${propertyId}/amenities`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedAmenityIds(response.data.map(a => a.id));
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('Access denied: You do not own this property');
        handleCloseAmenities();
      } else {
        toast.error('Error fetching property amenities');
      }
    }
  };

  useEffect(() => {
    fetchAllAmenities();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProperties();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, rowsPerPage, searchTerm, user?.id]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/property-types`)
      .then(res => setPropertyTypes(res.data))
      .catch(() => {});
  }, []);

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
      const endpoint = `${API_BASE_URL}/api/my-properties/${id}/toggle-delete`;
      await axios.patch(endpoint, {
        isDeleted: !currentStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Property ${!currentStatus ? 'deleted' : 'restored'} successfully`);
      fetchProperties();
    } catch (error) {
      toast.error('Error updating property status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this property?')) {
      try {
        const token = localStorage.getItem('token');
        const endpoint = `${API_BASE_URL}/api/my-properties/${id}`;
        await axios.delete(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Property deleted permanently');
        fetchProperties();
      } catch (error) {
        toast.error('Error deleting property');
      }
    }
  };

  const handleEdit = (property) => {
    setEditingId(property.id);
    setFormData({
      title: property.title || '',
      typeId: property.typeId || '',
      city: property.city || '',
      state: property.state || '',
      country: property.country || 'India',
      location: property.location || '',
      latitude: Number(property.latitude) || 23.2156,
      longitude: Number(property.longitude) || 72.6369,
      price: property.price || '',
      status: property.status || 'For Sale',
      area: property.area || '',
      no_of_bedrooms: property.no_of_bedrooms || '',
      no_of_bathrooms: property.no_of_bathrooms || '',
      no_of_garage: property.no_of_garage || '',
      description: property.description || '',
      featured: property.featured || false,
      images: property.images || [],
      verified: property.verified || false,
      furnishing_type: property.furnishing_type || 'none',
      bachelor_friendly: property.bachelor_friendly || false,
      availability: property.availability || 'Immediate',
      family_friendly: property.family_friendly || false,
      live_in_friendly: property.live_in_friendly || false
    });
    setOpen(true);
    setActiveStep(0);
  };

  const handleAddImage = () => {
    if (!newImageUrl) return;
    setFormData({
      ...formData,
      images: [...formData.images, { imageUrl: newImageUrl }]
    });
    setNewImageUrl('');
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setEditingId(null);
    setNewImageUrl('');
    setFormData({
      title: '', typeId: '', city: '', state: '', country: 'India', location: '',
      latitude: 23.2156, longitude: 72.6369, price: '', status: 'For Sale',
      area: '', no_of_bedrooms: '', no_of_bathrooms: '', no_of_garage: '',
      description: '',
      featured: false, images: [],
      verified: false, furnishing_type: 'none', bachelor_friendly: false,
      availability: 'Immediate', family_friendly: false, live_in_friendly: false
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingId) {
        const endpoint = `${API_BASE_URL}/api/my-properties/${editingId}`;
        await axios.put(endpoint, formData, config);
        toast.success('Property updated successfully');
      } else {
        const endpoint = `${API_BASE_URL}/api/my-properties`;
        await axios.post(endpoint, formData, config);
        toast.success('Property added successfully');
      }
      handleClose();
      fetchProperties();
    } catch (error) {
      toast.error(`Error ${editingId ? 'updating' : 'adding'} property`);
    }
  };

  const handleOpenAmenities = (property) => {
    setSelectedPropertyForAmenities(property);
    fetchPropertyAmenities(property.id);
    setAmenitiesDialogOpen(true);
  };

  const handleCloseAmenities = () => {
    setAmenitiesDialogOpen(false);
    setSelectedPropertyForAmenities(null);
    setSelectedAmenityIds([]);
  };

  const handleToggleAmenity = (amenityId) => {
    setSelectedAmenityIds(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSaveAmenities = async () => {
    setSavingAmenities(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/api/admin/properties/${selectedPropertyForAmenities.id}/amenities`, 
        { amenityIds: selectedAmenityIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Amenities updated successfully');
      handleCloseAmenities();
    } catch (error) {
      toast.error('Error updating amenities');
    } finally {
      setSavingAmenities(false);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData({ ...formData, latitude: e.latlng.lat, longitude: e.latlng.lng });
      },
    });
    return formData.latitude ? <Marker position={[formData.latitude, formData.longitude]} /> : null;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ height: 400, mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Click on the map to set property location</Typography>
            <MapContainer center={[formData.latitude, formData.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
            <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
              <Typography variant="caption">Lat: {Number(formData.latitude || 0).toFixed(6)}</Typography>
              <Typography variant="caption">Long: {Number(formData.longitude || 0).toFixed(6)}</Typography>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid xs={12}>
              <TextField fullWidth label="Property Title" variant="outlined" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </Grid>
            <Grid xs={12}>
              <TextField fullWidth label="Location/Area Name" variant="outlined" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
            </Grid>
            <Grid xs={6}>
              <TextField fullWidth label="City" variant="outlined" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
            </Grid>
            <Grid xs={6}>
              <TextField fullWidth label="State" variant="outlined" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid xs={6}>
              <TextField select fullWidth label="Property Type" value={formData.typeId} onChange={(e) => setFormData({...formData, typeId: e.target.value})}>
                {propertyTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={6}>
              <TextField select fullWidth label="Status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                <MenuItem value="For Sale">For Sale</MenuItem>
                <MenuItem value="For Rent">For Rent</MenuItem>
              </TextField>
            </Grid>
            <Grid xs={6}>
              <TextField fullWidth label="Price" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </Grid>
            <Grid xs={6}>
              <TextField fullWidth label="Area (SqFt)" type="number" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} />
            </Grid>
            <Grid xs={4}>
              <TextField fullWidth label="Bedrooms" type="number" value={formData.no_of_bedrooms} onChange={(e) => setFormData({...formData, no_of_bedrooms: e.target.value})} />
            </Grid>
            <Grid xs={4}>
              <TextField fullWidth label="Bathrooms" type="number" value={formData.no_of_bathrooms} onChange={(e) => setFormData({...formData, no_of_bathrooms: e.target.value})} />
            </Grid>
            <Grid xs={4}>
              <TextField fullWidth label="Garage" type="number" value={formData.no_of_garage} onChange={(e) => setFormData({...formData, no_of_garage: e.target.value})} />
            </Grid>
            <Grid xs={6}>
              <TextField select fullWidth label="Furnishing Type" value={formData.furnishing_type} onChange={(e) => setFormData({...formData, furnishing_type: e.target.value})}>
                <MenuItem value="none">None / Unfurnished</MenuItem>
                <MenuItem value="semi-furnished">Semi-Furnished</MenuItem>
                <MenuItem value="full-furnished">Fully Furnished</MenuItem>
              </TextField>
            </Grid>
            <Grid xs={6}>
              <TextField select fullWidth label="Availability" value={formData.availability} onChange={(e) => setFormData({...formData, availability: e.target.value})}>
                <MenuItem value="Immediate">Immediate</MenuItem>
                <MenuItem value="1 month">1 month</MenuItem>
                <MenuItem value="2 months">2 months</MenuItem>
                <MenuItem value="3 months">3 months</MenuItem>
                <MenuItem value="6 months">6 months</MenuItem>
                <MenuItem value="1 year">1 year</MenuItem>
              </TextField>
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
              <FormControlLabel
                control={<Checkbox checked={formData.verified} onChange={(e) => setFormData({...formData, verified: e.target.checked})} color="primary" />}
                label="Verified Property"
              />
              <FormControlLabel
                control={<Checkbox checked={formData.bachelor_friendly} onChange={(e) => setFormData({...formData, bachelor_friendly: e.target.checked})} color="primary" />}
                label="Bachelor Friendly"
              />
              <FormControlLabel
                control={<Checkbox checked={formData.family_friendly} onChange={(e) => setFormData({...formData, family_friendly: e.target.checked})} color="primary" />}
                label="Family Friendly"
              />
              <FormControlLabel
                control={<Checkbox checked={formData.live_in_friendly} onChange={(e) => setFormData({...formData, live_in_friendly: e.target.checked})} color="primary" />}
                label="Live-in Friendly"
              />
            </Grid>
            <Grid xs={12}>
              <TextField 
                fullWidth 
                label="Property Description" 
                multiline 
                rows={4} 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                placeholder="Describe the property's key features, surrounding area, etc."
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
              <TextField 
                fullWidth 
                size="small" 
                label="Add Image URL" 
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button 
                variant="contained" 
                startIcon={<AddCircleIcon />}
                onClick={handleAddImage}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Add Image
              </Button>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2 }}>Image Gallery ({formData.images.length})</Typography>
            {formData.images.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                {formData.images.map((img, index) => (
                  <Paper 
                    key={index}
                    elevation={2} 
                    sx={{ 
                      position: 'relative', 
                      width: 200,
                      height: 200,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #eee',
                      flexShrink: 0,
                      '&:hover .delete-overlay': { opacity: 1 }
                    }}
                  >
                    <Box
                      component="img"
                      src={img.imageUrl}
                      alt={`Property ${index}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <Box
                      className="delete-overlay"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(255,255,255,0.9)',
                        color: '#d32f2f',
                        borderRadius: '50%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        opacity: 0,
                        transition: '0.3s',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#f44336', color: 'white' }
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <ClearIcon sx={{ fontSize: 18 }} />
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3, fontStyle: 'italic' }}>
                No images added yet. Add some URLs above.
              </Typography>
            )}
            
            <Box sx={{ p: 2, border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center', bgcolor: '#fafafa' }}>
              <Typography variant="caption" color="textSecondary">
                Pro Tip: You can find high quality property images on Unsplash or Pexels.
              </Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>My Properties</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#6a11cb' }} onClick={() => setOpen(true)}>
          Add Property
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by title, location, city or status..."
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

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} align="center"><CircularProgress size={24} sx={{ my: 2 }} /></TableCell></TableRow>
            ) : properties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property) => (
              <TableRow key={property.id} sx={{ opacity: property.isDeleted ? 0.6 : 1 }}>
                <TableCell sx={{ fontWeight: 600 }}>{property.title}</TableCell>
                <TableCell>{property.location}, {property.city}</TableCell>
                <TableCell>₹ {parseFloat(property.price).toLocaleString()}</TableCell>
                <TableCell><Chip label={property.propertyType?.name || 'N/A'} size="small" /></TableCell>
                <TableCell>
                  <Chip 
                    label={property.status} 
                    color={property.status === 'For Sale' ? 'primary' : 'secondary'} 
                    size="small" 
                    variant="outlined" 
                  />
                </TableCell>
                <TableCell>
                  <Switch 
                    checked={!property.isDeleted} 
                    onChange={() => handleToggleDelete(property.id, property.isDeleted)} 
                    color="success"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button 
                    size="small" 
                    variant="outlined" 
                    sx={{ mr: 1, textTransform: 'none', borderRadius: '8px' }}
                    onClick={() => handleOpenAmenities(property)}
                  >
                    Amenities
                  </Button>
                  <IconButton color="primary" size="small" onClick={() => handleEdit(property)}><EditIcon /></IconButton>
                  <IconButton color="error" size="small" onClick={() => handleDelete(property.id)}><DeleteIcon /></IconButton>
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

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{editingId ? 'Edit Property' : 'Add New Property'}</DialogTitle>
        <DialogContent dividers>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>
          {renderStepContent(activeStep)}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Box sx={{ flexGrow: 1 }} />
          {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="success" onClick={handleSubmit}>Finish & Save</Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Amenities Management Dialog */}
      <Dialog open={amenitiesDialogOpen} onClose={handleCloseAmenities} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          Manage Amenities - {selectedPropertyForAmenities?.title}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#6a11cb', mb: 1 }}>
              Indoor Amenities
            </Typography>
            <Grid container spacing={1}>
              {allAmenities.filter(a => a.type?.toLowerCase() === 'indoor').map((amenity) => (
                <Grid  xs={6} key={amenity.id}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={selectedAmenityIds.includes(amenity.id)}
                        onChange={() => handleToggleAmenity(amenity.id)}
                        color="primary"
                      />
                    }
                    label={amenity.title}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2575fc', mb: 1 }}>
              Outdoor Amenities
            </Typography>
            <Grid container spacing={1}>
              {allAmenities.filter(a => a.type?.toLowerCase() === 'outdoor').map((amenity) => (
                <Grid  xs={6} key={amenity.id}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={selectedAmenityIds.includes(amenity.id)}
                        onChange={() => handleToggleAmenity(amenity.id)}
                        color="secondary"
                      />
                    }
                    label={amenity.title}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseAmenities} disabled={savingAmenities}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSaveAmenities} 
            disabled={savingAmenities}
            sx={{ bgcolor: '#6a11cb' }}
          >
            {savingAmenities ? <CircularProgress size={24} /> : 'Save Amenities'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyPropertiesManager;
