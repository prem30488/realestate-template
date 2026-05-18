import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Card, CardContent, CardMedia,
  Pagination, CircularProgress, TextField, MenuItem, Select,
  FormControl, InputLabel, Button, Divider, Chip, IconButton,
  Slider, Drawer, useMediaQuery, useTheme
} from '@mui/material';
import {
  LocationOn, Bed, Bathtub, SquareFoot, FilterList,
  Map as MapIcon, GridView, Search as SearchIcon, ArrowForward
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { API_BASE_URL } from '../constants';
import './PropertiesList.css';

// Fix for Leaflet default icon issue in React
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
    if (center && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
      map.setView(center, zoom);
      // Force leaflet to recalculate size after the container is un-hidden
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [center[0], center[1], zoom, map]);
  return null;
}

const PropertiesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [properties, setProperties] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [showMap, setShowMap] = useState(true);
  const [mapCenter, setMapCenter] = useState([23.2156, 72.6369]);

  // Filters state
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    type: searchParams.get('type') || '',
    status: searchParams.get('status') || '',
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page')) || 1,
    minPrice: searchParams.get('minPrice') || 0,
    maxPrice: searchParams.get('maxPrice') || 100000000,
  });

  useEffect(() => {
    fetchPropertyTypes();
    fetchCities();
  }, []);

  useEffect(() => {
    fetchProperties();

    // Update map center synchronously from loaded cities if possible
    if (filters.city && cities.length > 0) {
      const selectedCity = cities.find(c => c.name === filters.city);
      if (selectedCity && selectedCity.latitude && selectedCity.longitude) {
        setMapCenter([parseFloat(selectedCity.latitude), parseFloat(selectedCity.longitude)]);
      } else {
        fetchCityCoords(filters.city);
      }
    } else if (filters.city) {
      // If cities aren't loaded yet (e.g. initial URL load)
      fetchCityCoords(filters.city);
    }
  }, [searchParams, cities]); // Run when cities load so initial URL city can pan immediately

  const fetchPropertyTypes = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/property-types`);
      const data = await res.json();
      setPropertyTypes(data);
    } catch (err) {
      console.error('Error fetching property types:', err);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cities`);
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  const fetchCityCoords = async (cityName) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cities/${encodeURIComponent(cityName)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.latitude && data.longitude) {
          setMapCenter([parseFloat(data.latitude), parseFloat(data.longitude)]);
        }
      }
    } catch (err) {
      console.error('Error fetching city coords:', err);
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(searchParams);
      if (!queryParams.has('limit')) queryParams.set('limit', '12');
      const res = await fetch(`${API_BASE_URL}/api/properties?${queryParams.toString()}`);
      const data = await res.json();
      setProperties(data.properties);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    updateSearchParams(newFilters);
  };

  const updateSearchParams = (newFilters) => {
    const params = {};
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key]) {
        params[key] = newFilters[key];
      }
    });
    setSearchParams(params);
  };

  const handlePageChange = (event, value) => {
    handleFilterChange('page', value);
  };

  const renderPropertyCard = (property) => (
    <Grid xs={12} sm={6} lg={showMap ? 12 : 4} key={property.id}>
      <Card className="property-list-card premium-card">
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="240"
            image={property.images?.[0]?.imageUrl || 'https://picsum.photos/400/300?random=' + property.id}
            alt={property.title}
          />
          <Box className="property-badges">
            <Chip
              label={property.status}
              color={property.status === 'For Rent' ? 'secondary' : 'primary'}
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
            {property.featured && (
              <Chip
                label="Featured"
                color="warning"
                size="small"
                sx={{ fontWeight: 'bold', ml: 1 }}
              />
            )}
          </Box>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" className="price-tag" sx={{ mb: 1 }}>
            ₹ {parseFloat(property.price).toLocaleString('en-IN')}
          </Typography>
          <Typography variant="h6" className="property-title" gutterBottom noWrap>
            <Link to={`/properties/${property.id}`}>{property.title}</Link>
          </Typography>
          <Box className="property-location" sx={{ mb: 2 }}>
            <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'var(--premium-accent)' }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {property.location}, {property.city}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, borderColor: '#e2e8f0' }} />
          <Grid container spacing={1} className="property-amenities-mini">
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Bed fontSize="small" sx={{ mr: 0.5, color: '#94a3b8' }} />
                <Typography variant="body2">{property.no_of_bedrooms}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Bathtub fontSize="small" sx={{ mr: 0.5, color: '#94a3b8' }} />
                <Typography variant="body2">{property.no_of_bathrooms}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SquareFoot fontSize="small" sx={{ mr: 0.5, color: '#94a3b8' }} />
                <Typography variant="body2">{property.area} <Box component="span" sx={{ fontSize: '10px' }}>SqFt</Box></Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Listed by: {property.owner?.username}
            </Typography>
            <Button
              component={Link}
              to={`/properties/${property.id}`}
              variant="contained"
              size="small"
              className="primary-btn"
              endIcon={<ArrowForward />}
            >
              Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  const FilterSidebar = () => (
    <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
      <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', color: '#000' }}>
        <FilterList sx={{ mr: 1 }} /> Filters
      </Typography>

      <TextField
        fullWidth
        label="Search Title/Location"
        variant="outlined"
        size="small"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        onKeyPress={(e) => e.key === 'Enter' && handleFilterChange('search', filters.search)}
        sx={{ mb: 3 }}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton size="small" onClick={() => handleFilterChange('search', filters.search)}>
                <SearchIcon />
              </IconButton>
            )
          }
        }}
      />

      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>City</InputLabel>
        <Select
          value={filters.city}
          label="City"
          onChange={(e) => handleFilterChange('city', e.target.value)}
        >
          <MenuItem value="">Any City</MenuItem>
          {filters.city && !cities.some(c => c.name === filters.city) && (
            <MenuItem value={filters.city} sx={{ display: 'none' }}>{filters.city}</MenuItem>
          )}
          {cities.map(city => (
            <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Property Type</InputLabel>
        <Select
          value={filters.type}
          label="Property Type"
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <MenuItem value="">Any Type</MenuItem>
          {filters.type && !propertyTypes.some(t => t.id.toString() === filters.type.toString()) && (
            <MenuItem value={filters.type} sx={{ display: 'none' }}>Loading...</MenuItem>
          )}
          {propertyTypes.map(type => (
            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          label="Status"
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <MenuItem value="">Any Status</MenuItem>
          <MenuItem value="Rent">For Rent</MenuItem>
          <MenuItem value="Sell">For Sale</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ px: 1 }}>
        <Typography variant="body2" gutterBottom color="#333">Price Range</Typography>
        <Slider
          value={[filters.minPrice, filters.maxPrice]}
          onChange={(e, val) => setFilters({ ...filters, minPrice: val[0], maxPrice: val[1] })}
          onChangeCommitted={(e, val) => {
            handleFilterChange('minPrice', val[0]);
            handleFilterChange('maxPrice', val[1]);
          }}
          valueLabelDisplay="auto"
          min={0}
          max={100000000}
          step={100000}
          sx={{ mb: 4 }}
        />
      </Box>

      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          const reset = { city: '', type: '', status: '', search: '', page: 1, minPrice: 0, maxPrice: 100000000 };
          setFilters(reset);
          setSearchParams({});
        }}
        sx={{ borderColor: '#e2e8f0', color: '#000' }}
      >
        Clear All
      </Button>
    </Box>
  );

  return (
    <Box className="white-theme-bg" sx={{ minHeight: '100vh', pt: '120px', pb: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h3" className="premium-heading">Explore Properties</Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Showing {properties.length} of {totalCount} properties
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant={showMap ? "contained" : "outlined"}
              startIcon={<MapIcon />}
              onClick={() => setShowMap(!showMap)}
              className={showMap ? "primary-btn" : "secondary-btn outline-glow"}
              sx={{ borderRadius: '30px' }}
            >
              {showMap ? "Hide Map" : "Show Map"}
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Filters Sidebar */}
          {!isMobile && (
            <Grid item md={3}>
              <FilterSidebar />
            </Grid>
          )}

          {/* Properties Grid & Map */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={4}>
              {showMap && (
                <Grid item xs={12} lg={6} sx={{ mb: isMobile ? 4 : 0 }}>
                  <Box className="map-view-container" sx={{ height: isMobile ? '300px' : 'calc(100vh - 250px)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--premium-border)', position: 'sticky', top: '120px' }}>
                    <MapContainer
                      center={mapCenter}
                      zoom={12}
                      style={{ height: '100%', width: '1400px' }}
                    >
                      <ChangeView center={mapCenter} zoom={12} />
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {properties.map(p => p.latitude && p.longitude && !isNaN(parseFloat(p.latitude)) && !isNaN(parseFloat(p.longitude)) && (
                        <Marker key={p.id} position={[parseFloat(p.latitude), parseFloat(p.longitude)]}>
                          <Popup>
                            <Box sx={{ width: 200 }}>
                              <img src={p.images?.[0]?.imageUrl || 'https://picsum.photos/200/120'} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }} />
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{p.title}</Typography>
                              <Typography variant="body2" color="primary">₹ {parseFloat(p.price).toLocaleString('en-IN')}</Typography>
                              <Link to={`/properties/${p.id}`} style={{ fontSize: '12px', color: 'var(--premium-accent)' }}>View Details</Link>
                            </Box>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </Box>
                </Grid>
              )}

              <Grid item xs={12} lg={showMap ? 6 : 12}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
                    <CircularProgress color="primary" />
                  </Box>
                ) : (
                  <>
                    <Grid container spacing={3}>
                      {properties.length > 0 ? (
                        properties.map(property => renderPropertyCard(property))
                      ) : (
                        <Grid item xs={12}>
                          <Box sx={{ p: 10, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: '20px' }}>
                            <Typography variant="h5" color="#000">No properties found matching your criteria</Typography>
                            <Button sx={{ mt: 2 }} onClick={() => setSearchParams({})}>Reset Filters</Button>
                          </Box>
                        </Grid>
                      )}
                    </Grid>

                    {totalPages > 1 && (
                      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                          count={totalPages}
                          page={filters.page}
                          onChange={handlePageChange}
                          color="primary"
                          sx={{
                            '& .MuiPaginationItem-root': { color: '#000', borderColor: '#e2e8f0' },
                            '& .Mui-selected': { background: 'linear-gradient(90deg, #1a56db, #2563eb) !important', color: '#fff !important' }
                          }}
                        />
                      </Box>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {isMobile && (
        <Drawer
          anchor="left"
          open={false} // Would need state to open/close
          onClose={() => { }}
        >
          <Box sx={{ width: 280 }}>
            <FilterSidebar />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default PropertiesList;
