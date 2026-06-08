import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Box, Container, Grid, Typography, Card, CardContent,
    Button, Divider, Chip, CircularProgress,
    List, ListItem, ListItemIcon, ListItemText, Avatar,
    Rating, Paper, Breadcrumbs, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField
} from '@mui/material';
import {
    LocationOn, Map as MapIcon, Star, CheckCircle,
    DirectionsBus, School, LocalHospital, ShoppingBag,
    Restaurant, Park, Train, AirportShuttle, Business,
    TrendingUp, Home, ArrowForward, VerifiedUser,
    TrendingDown, ShowChart, BarChart as BarChartIcon, Info, Apartment, Speed, Compare
} from '@mui/icons-material';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, AreaChart, Area, ComposedChart
} from 'recharts';

const iconMap = {
    Train: <Train />,
    AirportShuttle: <AirportShuttle />,
    DirectionsBus: <DirectionsBus />,
    TrendingUp: <TrendingUp />,
    School: <School />,
    LocalHospital: <LocalHospital />,
    ShoppingBag: <ShoppingBag />,
    Park: <Park />,
    VerifiedUser: <VerifiedUser />,
    CheckCircle: <CheckCircle />,
    Restaurant: <Restaurant />,
    Home: <Home />
};

const getIcon = (iconName, props = {}) => {
    const icon = iconMap[iconName] || <Home />;
    return React.cloneElement(icon, props);
};
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { API_BASE_URL } from '../constants';

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

const LocalityDetails = ({ onLoginRequired }) => {
    const { name } = useParams();
    const [locality, setLocality] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const [cityRates, setCityRates] = useState([]);
    const [zoneRates, setZoneRates] = useState([]);
    const [localityProjects, setLocalityProjects] = useState([]);
    const [loadingRates, setLoadingRates] = useState(false);

    const handleOpenReviewDialog = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            if (onLoginRequired) onLoginRequired();
            return;
        }
        setReviewDialogOpen(true);
    };

    const handleReviewSubmit = async () => {
        if (!newComment.trim()) return;
        setSubmittingReview(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to write a review');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/public/localities/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    localityId: locality.id,
                    rating: newRating,
                    comment: newComment
                })
            });

            const result = await response.json();
            if (result.success) {
                setLocality(prev => ({
                    ...prev,
                    reviews: [result.data, ...(prev.reviews || [])]
                }));
                setReviewDialogOpen(false);
                setNewComment('');
                setNewRating(5);
            } else {
                alert(result.message || 'Error submitting review');
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Error submitting review');
        } finally {
            setSubmittingReview(false);
        }
    };

    useEffect(() => {
        const fetchLocalityDetails = async () => {
            try {
                const fetchUrl = `${API_BASE_URL}/api/public/localities/${encodeURIComponent(name)}`;
                console.log('Fetching locality from:', fetchUrl);
                const res = await fetch(fetchUrl);
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Locality not found');
                }
                const result = await res.json();
                if (result.success) {
                    setLocality(result.data);
                } else {
                    throw new Error(result.message || 'Error fetching locality');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocalityDetails();
        window.scrollTo(0, 0);
    }, [name]);

    useEffect(() => {
        const fetchCityRates = async () => {
            if (!locality?.city?.name) return;
            setLoadingRates(true);
            try {
                // Fetch city-wide comparison (existing)
                const resCity = await fetch(`${API_BASE_URL}/api/jantri-rates?city=${encodeURIComponent(locality.city.name)}`);
                if (resCity.ok) {
                    const data = await resCity.json();
                    setCityRates(data);
                }

                // Fetch zone-wise rates for THIS locality
                const resZone = await fetch(`${API_BASE_URL}/api/jantri-rates/by-area?area=${encodeURIComponent(locality.name)}`);
                if (resZone.ok) {
                    const data = await resZone.json();
                    setZoneRates(data);
                }

                // Fetch projects for THIS locality
                const resProjects = await fetch(`${API_BASE_URL}/api/public/projects?locality_id=${locality.id}`);
                if (resProjects.ok) {
                    const result = await resProjects.json();
                    if (result.success) {
                        setLocalityProjects(result.data);
                    }
                }
            } catch (err) {
                console.error('Error fetching rates:', err);
            } finally {
                setLoadingRates(false);
            }
        };

        fetchCityRates();
    }, [locality?.city?.name, locality?.name]);

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8fafc' }}>
            <CircularProgress sx={{ color: '#4f46e5' }} />
        </Box>
    );

    if (error || !locality) return (
        <Box sx={{ p: 10, textAlign: 'center', bgcolor: '#f8fafc', minHeight: '100vh', pt: '150px' }}>
            <Typography variant="h4" color="textPrimary" sx={{ fontWeight: 800 }}>{error || 'Locality not found'}</Typography>
            <Button component={Link} to="/localities/all" sx={{ mt: 3, borderRadius: '12px', px: 4, py: 1.5, bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' } }} variant="contained">
                Browse All Localities
            </Button>
        </Box>
    );

    // Mock data for missing fields to showcase "MagicBricks" look
    const mockOverview = locality.overview || `${locality.name} is one of the most prominent residential and commercial hubs in ${locality.city?.name}. Known for its excellent connectivity and well-developed infrastructure, it offers a perfect mix of modern amenities and a serene environment. The locality is highly preferred by families and professionals alike due to its proximity to major employment hubs, educational institutions, and healthcare facilities.`;

    const connectivity = locality.connectivity || [
        { type: 'Metro/Train', label: 'Nearby Metro Station', value: '2.5 km', icon: <Train /> },
        { type: 'Airport', label: 'International Airport', value: '12 km', icon: <AirportShuttle /> },
        { type: 'Bus', label: 'Major Bus Terminus', value: '1.2 km', icon: <DirectionsBus /> },
        { type: 'Highway', label: 'Main Highway Access', value: '0.8 km', icon: <TrendingUp /> }
    ];

    const infrastructure = locality.infrastructure || [
        { type: 'Schools', label: 'Top Rated Schools', value: '5+', icon: <School /> },
        { type: 'Hospitals', label: 'Premium Hospitals', value: '3+', icon: <LocalHospital /> },
        { type: 'Shopping', label: 'Malls & Markets', value: '4+', icon: <ShoppingBag /> },
        { type: 'Parks', label: 'Public Parks', value: '6+', icon: <Park /> }
    ];

    const lifestyle = locality.lifestyle || [
        { type: 'Safety', label: 'Safety Rating', value: '4.5/5', icon: <VerifiedUser /> },
        { type: 'Cleanliness', label: 'Cleanliness', value: 'High', icon: <CheckCircle /> },
        { type: 'Entertainment', label: 'Dining & Cafes', value: 'Premium', icon: <Restaurant /> },
        { type: 'Vibe', label: 'Ambiance', value: 'Modern', icon: <Home /> }
    ];

    const realEstateTrends = locality.real_estate_trends || {
        avgPrice: '₹ 8,500/sqft',
        priceTrend: '+5.2% (Last 1 year)',
        rentalYield: '3.4% annually',
        demand: 'High'
    };

    // Prepare trend data for graph
    const trendMonths = ['Dec\'25', 'Jan\'26', 'Feb\'26', 'Mar\'26', 'Apr\'26', 'May\'26'];
    const currentLocalityRate = cityRates.find(r => r.area.toLowerCase() === locality.name.toLowerCase())?.residential_rate || 8500;

    // Top 3 other localities in same city for comparison
    const otherLocalities = cityRates
        .filter(r => r.area.toLowerCase() !== locality.name.toLowerCase())
        .sort((a, b) => b.residential_rate - a.residential_rate)
        .slice(0, 2);

    const localitiesForGraph = [
        { name: locality.name, rate: currentLocalityRate, color: '#4f46e5' },
        ...otherLocalities.map((r, idx) => ({
            name: r.area,
            rate: r.residential_rate,
            color: idx === 0 ? '#10b981' : '#f59e0b'
        }))
    ];

    // Prepare zone-wise data for graph
    const chartData = zoneRates.length > 0 ? zoneRates.map(z => ({
        name: `${z.zone_code}`,
        residential: parseFloat(z.residential_rate) || 0,
        commercial: parseFloat(z.commercial_rate) || 0,
        office: parseFloat(z.office_rate) || 0,
        industrial: parseFloat(z.industrial_rate) || 0,
        land: parseFloat(z.land_rate) || 0
    })) : [
        { name: '1', residential: 8500, commercial: 12000, office: 11000, industrial: 7000, land: 5000 },
        { name: '2', residential: 9200, commercial: 13500, office: 12500, industrial: 7500, land: 5500 },
        { name: '3', residential: 8800, commercial: 12500, office: 11800, industrial: 7200, land: 5200 },
        { name: '4', residential: 9500, commercial: 14000, office: 13000, industrial: 8000, land: 6000 }
    ];

    // Extract unique builders from projects
    const localityBuilders = Array.from(new Set(localityProjects.map(p => p.builder?.id)))
        .map(id => localityProjects.find(p => p.builder?.id === id)?.builder)
        .filter(b => b);

    const marketIndices = [
        { label: 'Growth in Price', value: '+1.42%', icon: <TrendingUp />, color: '#10b981', trend: 'up' },
        { label: 'Rental Yield', value: '-2.2%', icon: <TrendingDown />, color: '#ef4444', trend: 'down' },
        { label: 'Demand', value: '+4.0%', icon: <TrendingUp />, color: '#10b981', trend: 'up' },
        { label: 'Supply', value: '-0.6%', icon: <TrendingDown />, color: '#94a3b8', trend: 'down' }
    ];

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
            {/* Hero Banner Section */}
            <Box
                sx={{
                    height: '400px',
                    position: 'relative',
                    background: locality.image_url ? `url(${locality.image_url})` : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)'
                    }
                }}
            >
                <Container sx={{ position: 'relative', pb: 6, zIndex: 1 }}>
                    <Breadcrumbs sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.5)' } }}>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                        <Link to={`/localities/${locality.city?.name}`} style={{ color: 'inherit', textDecoration: 'none' }}>{locality.city?.name}</Link>
                        <Typography sx={{ color: 'white' }}>{locality.name}</Typography>
                    </Breadcrumbs>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 3 }}>
                        <Box>
                            <Typography variant="h1" sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '2.5rem', md: '4rem' }, mb: 1, letterSpacing: '-1px' }}>
                                {locality.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center' }}>
                                    <LocationOn sx={{ mr: 0.5 }} /> {locality.city?.name}, India
                                </Typography>
                                <Chip
                                    icon={<Star sx={{ color: '#fbbf24 !important' }} />}
                                    label={`${locality.rating || '4.5'} Locality Rating`}
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)', fontWeight: 700 }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Link to={`/properties?city=${locality.city?.name}&locality_id=${locality.id}`} style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<Home />}
                                    sx={{
                                        bgcolor: 'white',
                                        color: '#4f46e5',
                                        fontWeight: 800,
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: '16px',
                                        mr: 2,
                                        '&:hover': { bgcolor: '#f1f5f9', transform: 'translateY(-2px)' },
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    View All Properties in {locality.name}
                                </Button>
                            </Link>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<Star />}
                                onClick={handleOpenReviewDialog}
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    fontWeight: 800,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '16px',
                                    mr: 2,
                                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-2px)' },
                                    transition: 'all 0.3s'
                                }}
                            >
                                Write a Review
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<Compare />}
                                component={Link}
                                to="/compare-localities"
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    fontWeight: 800,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '16px',
                                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-2px)' },
                                    transition: 'all 0.3s'
                                }}
                            >
                                Compare
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container sx={{ mt: -4, position: 'relative', zIndex: 2 }}>
                <Grid container spacing={4}>
                    {/* Main Content */}
                    <Grid xs={12} lg={8}>
                        {/* Overview Card */}
                        <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: '#1e293b' }}>Locality Overview</Typography>
                            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, fontSize: '1.1rem' }}>
                                {mockOverview}
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Grid container spacing={3}>
                                <Grid xs={12} md={6}>
                                    <Box sx={{ p: 3, bgcolor: '#f1f5f9', borderRadius: '20px', height: '100%' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <TrendingUp sx={{ color: '#4f46e5' }} /> Real Estate Trends
                                        </Typography>
                                        <List sx={{ p: 0 }}>
                                            <ListItem sx={{ px: 0 }}>
                                                <ListItemText
                                                    primary="Average Buy Price"
                                                    secondary={realEstateTrends.avgPrice}
                                                    slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                                                />
                                            </ListItem>
                                            <ListItem sx={{ px: 0 }}>
                                                <ListItemText
                                                    primary="Price Trend"
                                                    secondary={realEstateTrends.priceTrend}
                                                    slotProps={{
                                                        primary: { sx: { fontWeight: 600 } },
                                                        secondary: { sx: { color: '#059669', fontWeight: 700 } }
                                                    }}
                                                />
                                            </ListItem>
                                            <ListItem sx={{ px: 0 }}>
                                                <ListItemText
                                                    primary="Demand"
                                                    secondary={realEstateTrends.demand}
                                                    slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                                                />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <Box sx={{ p: 3, bgcolor: '#f1f5f9', borderRadius: '20px', height: '100%' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <TrendingUp sx={{ color: '#4f46e5' }} /> Demographic Info
                                        </Typography>
                                        <List sx={{ p: 0 }}>
                                            <ListItem sx={{ px: 0 }}>
                                                <ListItemText
                                                    primary="Preferred By"
                                                    secondary="Families & Working Professionals"
                                                    slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                                                />
                                            </ListItem>
                                            <ListItem sx={{ px: 0 }}>
                                                <ListItemText
                                                    primary="Housing Type"
                                                    secondary="Apartments, Villas & Office Spaces"
                                                    slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                                                />
                                            </ListItem>
                                            <ListItem sx={{ px: 0 }}>
                                                <ListItemText
                                                    primary="Postal Code"
                                                    secondary={locality.postal_code || '380001'}
                                                    slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                                                />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Connectivity Section */}
                        <Typography variant="h4" sx={{ fontWeight: 800, mt: 6, mb: 3, color: '#1e293b' }}>Connectivity</Typography>
                        <Grid container spacing={2} sx={{ mb: 6 }}>
                            {connectivity.map((item, idx) => (
                                <Grid xs={12} sm={6} md={3} key={idx}>
                                    <Card sx={{ borderRadius: '20px', textAlign: 'center', p: 3, height: '100%', border: '1px solid #e2e8f0', boxShadow: 'none', '&:hover': { boxShadow: '0 10px 20px rgba(0,0,0,0.05)', borderColor: '#4f46e5' }, transition: 'all 0.3s' }}>
                                        <Box sx={{ color: '#4f46e5', mb: 2 }}>
                                            {typeof item.icon === 'string'
                                                ? getIcon(item.icon, { sx: { fontSize: 40 } })
                                                : React.isValidElement(item.icon)
                                                    ? React.cloneElement(item.icon, { sx: { fontSize: 40 } })
                                                    : <Home sx={{ fontSize: 40 }} />
                                            }
                                        </Box>
                                        <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>{item.type}</Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 800, color: '#1e293b' }}>{item.value}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>{item.label}</Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Infrastructure Section */}
                        <Typography variant="h4" sx={{ fontWeight: 800, mt: 6, mb: 3, color: '#1e293b' }}>Social Infrastructure</Typography>
                        <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', mb: 6 }}>
                            <Grid container spacing={4}>
                                {infrastructure.map((item, idx) => (
                                    <Grid xs={12} sm={6} key={idx}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ width: 60, height: 60, borderRadius: '16px', bgcolor: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {typeof item.icon === 'string'
                                                    ? getIcon(item.icon, { sx: { fontSize: 30 } })
                                                    : React.isValidElement(item.icon)
                                                        ? React.cloneElement(item.icon, { sx: { fontSize: 30 } })
                                                        : <Home sx={{ fontSize: 30 }} />
                                                }
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>{item.label}</Typography>
                                                <Typography variant="body2" sx={{ color: '#64748b' }}>Around {item.value} institutions in vicinity</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>

                        {/* Rates & Trends Section */}
                        <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>Rates & Trends for {locality.city?.name}</Typography>
                            <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 500 }}>Area-wise Jantri Rates Analysis</Typography>
                        </Box>
                        <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', mb: 3 }}>
                            <Grid container spacing={4}>
                                {/* Top: Indices */}
                                <Grid xs={12}>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1e293b' }}>Change in Key Indices <Typography component="span" variant="caption" sx={{ color: '#94a3b8' }}>(in 3 months)</Typography></Typography>

                                        <Grid container spacing={3}>
                                            {marketIndices.map((index, idx) => (
                                                <Grid xs={6} sm={3} key={idx}>
                                                    <Box sx={{ textAlign: 'center', p: 3, borderRadius: '20px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                                        <Box sx={{ color: index.color, mb: 1, display: 'flex', justifyContent: 'center' }}>
                                                            {index.icon}
                                                        </Box>
                                                        <Typography variant="h5" sx={{ fontWeight: 900, color: index.color }}>{index.value}</Typography>
                                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>{index.label}</Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Grid>

                                {/* Bottom: Chart */}
                                <Grid xs={12}>
                                    <Box sx={{ p: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>Zone-wise Rates in {locality.name}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', mb: 3, display: 'block' }}>Comparison of Residential and Commercial rates across all available zones (₹/sqft)</Typography>

                                        <Box sx={{ height: 450, width: '100%', mt: 4 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                    <XAxis
                                                        dataKey="name"
                                                        axisLine={false}
                                                        tickLine={false}
                                                        interval={0}
                                                        angle={-45}
                                                        textAnchor="end"
                                                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                                                    />
                                                    <YAxis
                                                        axisLine={false}
                                                        tickLine={false}
                                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                        tickFormatter={(value) => `${value > 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
                                                    />
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                                    />
                                                    <Legend
                                                        verticalAlign="top"
                                                        align="right"
                                                        iconType="circle"
                                                        wrapperStyle={{ paddingTop: '0', paddingBottom: '30px' }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="land"
                                                        name="Land"
                                                        fill="rgba(245, 158, 11, 0.1)"
                                                        stroke="#f59e0b"
                                                        strokeWidth={2}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="residential"
                                                        name="Residential"
                                                        fill="rgba(79, 70, 229, 0.1)"
                                                        stroke="#4f46e5"
                                                        strokeWidth={4}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="commercial"
                                                        name="Commercial"
                                                        stroke="#10b981"
                                                        strokeWidth={3}
                                                        dot={{ r: 3 }}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="office"
                                                        name="Office"
                                                        stroke="#0ea5e9"
                                                        strokeWidth={3}
                                                        strokeDasharray="5 5"
                                                        dot={{ r: 3 }}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="industrial"
                                                        name="Industrial"
                                                        stroke="#ef4444"
                                                        strokeWidth={3}
                                                        dot={{ r: 3 }}
                                                    />
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
                            <Button
                                component={Link}
                                to="/rates-and-trends"
                                variant="contained"
                                sx={{
                                    bgcolor: '#c2410c',
                                    color: 'white',
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: '12px',
                                    fontWeight: 800,
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    '&:hover': { bgcolor: '#9a3412' }
                                }}
                            >
                                Explore More Trends
                            </Button>
                        </Box>

                        {/* Detailed Projects Section */}
                        <Box sx={{ mt: 8, mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>Top Projects in {locality.name}</Typography>
                            <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 500 }}>Discover premium residential developments</Typography>
                        </Box>

                        <Grid container spacing={4}>
                            {localityProjects && localityProjects.length > 0 ? (
                                localityProjects.map((project) => (
                                    <Grid xs={12} key={project.id}>
                                        <Paper sx={{
                                            borderRadius: '24px',
                                            overflow: 'hidden',
                                            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }
                                        }}>
                                            <Grid container>
                                                <Grid xs={12} md={4}>
                                                    <Box sx={{ height: { xs: '200px', md: '100%' }, position: 'relative' }}>
                                                        <img
                                                            src={project.photo_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000'}
                                                            alt={project.projectName}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                        <Box sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', px: 2, py: 0.5, borderRadius: '8px' }}>
                                                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#4f46e5' }}>RERA REGISTERED</Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                                <Grid xs={12} md={8}>
                                                    <Box sx={{ p: 4 }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                            <Box>
                                                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>{project.projectName}</Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <Rating value={parseFloat(project.ratings) || 0} readOnly size="small" precision={0.5} />
                                                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#4f46e5' }}>{project.ratings} / 5.0</Typography>
                                                                </Box>
                                                            </Box>
                                                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#c2410c' }}>{project.budget}</Typography>
                                                        </Box>

                                                        <Grid container spacing={2} sx={{ mb: 3 }}>
                                                            <Grid xs={6} sm={4} md={2}>
                                                                <Typography variant="caption" color="text.secondary">Configurations</Typography>
                                                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>{project.bhk}</Typography>
                                                            </Grid>
                                                            <Grid xs={6} sm={4} md={2}>
                                                                <Typography variant="caption" color="text.secondary">Project Size</Typography>
                                                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>{project.project_size || '15+ Acres'}</Typography>
                                                            </Grid>
                                                            <Grid xs={6} sm={4} md={2}>
                                                                <Typography variant="caption" color="text.secondary">Total Units</Typography>
                                                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>{project.total_units} Units</Typography>
                                                            </Grid>
                                                            <Grid xs={6} sm={4} md={2}>
                                                                <Typography variant="caption" color="text.secondary">Towers</Typography>
                                                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>{project.total_towers || '8'} Towers</Typography>
                                                            </Grid>
                                                            <Grid xs={6} sm={4} md={2}>
                                                                <Typography variant="caption" color="text.secondary">Launch Date</Typography>
                                                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>{project.launch_date ? new Date(project.launch_date).toLocaleDateString() : 'Dec 2024'}</Typography>
                                                            </Grid>
                                                            <Grid xs={6} sm={4} md={2}>
                                                                <Typography variant="caption" color="text.secondary">Status</Typography>
                                                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#10b981' }}>New Launch</Typography>
                                                            </Grid>
                                                        </Grid>

                                                        <Divider sx={{ mb: 3 }} />

                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                <Info sx={{ fontSize: 16 }} /> Project by leading developers
                                                            </Typography>
                                                            <Button
                                                                variant="contained"
                                                                sx={{
                                                                    bgcolor: '#4f46e5',
                                                                    borderRadius: '12px',
                                                                    px: 4,
                                                                    fontWeight: 700,
                                                                    textTransform: 'none'
                                                                }}
                                                            >
                                                                View Details
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                ))
                            ) : (
                                <Grid xs={12}>
                                    <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '24px', bgcolor: '#f8fafc', border: '1px dashed #cbd5e1' }}>
                                        <Typography color="text.secondary">No detailed projects found for this locality.</Typography>
                                    </Paper>
                                </Grid>
                            )}
                        </Grid>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                component={Link}
                                to={`/projects/${locality.city?.name || 'Ahmedabad'}`}
                                variant="outlined"
                                endIcon={<ArrowForward />}
                                sx={{
                                    borderRadius: '16px',
                                    px: 6,
                                    py: 1.5,
                                    fontWeight: 800,
                                    color: '#4f46e5',
                                    borderColor: '#4f46e5',
                                    '&:hover': { bgcolor: '#f5f3ff', borderColor: '#4338ca' }
                                }}
                            >
                                View More Projects in {locality.city?.name || 'the City'}
                            </Button>
                        </Box>

                        {/* Leading Builders Section */}
                        {localityBuilders.length > 0 && (
                            <>
                                <Box sx={{ mt: 8, mb: 4 }}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>Leading Builders in {locality.name}</Typography>
                                    <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 500 }}>Trustworthy developers active in this area</Typography>
                                </Box>
                                <Grid container spacing={3} sx={{ mb: 6 }}>
                                    {localityBuilders.map((builder) => (
                                        <Grid xs={12} sm={6} md={4} key={builder.id}>
                                            <Paper sx={{
                                                p: 3,
                                                borderRadius: '24px',
                                                boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 3,
                                                transition: 'all 0.3s',
                                                '&:hover': { transform: 'scale(1.02)', borderColor: '#4f46e5', border: '1px solid #4f46e5' }
                                            }}>
                                                <Avatar
                                                    src={builder.logo_url}
                                                    sx={{ width: 64, height: 64, borderRadius: '16px', bgcolor: '#f1f5f9' }}
                                                >
                                                    {builder.company_name?.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography sx={{ fontWeight: 800, color: '#1e293b' }}>{builder.company_name}</Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                                        <Star sx={{ color: '#f59e0b', fontSize: 16 }} />
                                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{builder.average_rating || '4.5'}</Typography>
                                                        <Typography variant="caption" color="text.secondary">- {Math.floor(Math.random() * 20) + 5} Projects</Typography>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}

                        {/* Map Section */}
                        <Typography variant="h4" sx={{ fontWeight: 800, mt: 6, mb: 3, color: '#1e293b' }}>Locality Map</Typography>
                        <Paper sx={{ height: '500px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', mb: 6 }}>
                            {locality.latitude && locality.longitude ? (
                                <MapContainer
                                    center={[parseFloat(locality.latitude), parseFloat(locality.longitude)]}
                                    zoom={14}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <ChangeView center={[parseFloat(locality.latitude), parseFloat(locality.longitude)]} zoom={14} />
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[parseFloat(locality.latitude), parseFloat(locality.longitude)]}>
                                        <Popup>{locality.name}</Popup>
                                    </Marker>
                                </MapContainer>
                            ) : (
                                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f1f5f9' }}>
                                    <MapIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />
                                    <Typography color="text.secondary">Map coordinates not available</Typography>
                                </Box>
                            )}
                        </Paper>

                        {/* Reviews Section */}
                        <Box sx={{ mt: 8, mb: 6 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                    Reviews ({locality.reviews?.length || 0})
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenReviewDialog}
                                    sx={{ borderRadius: '12px', bgcolor: '#4f46e5' }}
                                >
                                    Write a Review
                                </Button>
                            </Box>

                            {locality.reviews && locality.reviews.length > 0 ? (
                                <Grid container spacing={3}>
                                    {locality.reviews.map((review) => (
                                        <Grid xs={12} key={review.id}>
                                            <Paper sx={{ p: 3, borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Avatar sx={{ bgcolor: '#4f46e5' }}>{review.user?.username?.charAt(0) || 'U'}</Avatar>
                                                        <Box>
                                                            <Typography sx={{ fontWeight: 700 }}>{review.user?.username}</Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {new Date(review.createdAt).toLocaleDateString()}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Rating value={review.rating} readOnly size="small" />
                                                </Box>
                                                <Typography sx={{ color: '#475569', lineHeight: 1.6 }}>
                                                    {review.comment}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Box sx={{ p: 6, textAlign: 'center', bgcolor: 'white', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                                    <Typography color="text.secondary">No reviews yet. Be the first to share your experience!</Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    {/* Sidebar */}
                    <Grid xs={12} lg={4}>
                        <Box sx={{ position: 'sticky', top: '100px' }}>
                            {/* Quality of Life Card */}
                            <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1e293b' }}>Quality of Life</Typography>
                                <List sx={{ p: 0 }}>
                                    {lifestyle.map((item, idx) => (
                                        <ListItem key={idx} sx={{ px: 0, py: 2 }}>
                                            <ListItemIcon sx={{ minWidth: 40, color: '#4f46e5' }}>
                                                {typeof item.icon === 'string' ? getIcon(item.icon) : item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.type}
                                                secondary={item.value}
                                                slotProps={{ primary: { sx: { fontWeight: 700 } } }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>

                            {/* Related Projects Card */}
                            <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1e293b' }}>Popular Projects in {locality.name}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {localityProjects && localityProjects.length > 0 ? (
                                        localityProjects.slice(0, 5).map((project) => (
                                            <Box
                                                key={project.id}
                                                sx={{
                                                    p: 2,
                                                    borderRadius: '16px',
                                                    border: '1px solid #e2e8f0',
                                                    '&:hover': { borderColor: '#4f46e5', bgcolor: '#f8fafc' },
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <Typography sx={{ fontWeight: 800, fontSize: '0.95rem' }}>{project.projectName}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 0.5 }}>
                                                    <Rating value={parseFloat(project.ratings) || 0} readOnly size="small" precision={0.5} />
                                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#4f46e5' }}>{project.ratings}</Typography>
                                                </Box>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                    {project.budget} | {project.bhk}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {project.total_units} units available
                                                </Typography>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">No projects listed in this locality yet.</Typography>
                                    )}

                                    <Button
                                        component={Link}
                                        to={`/projects/${locality.city?.name || 'Ahmedabad'}`}
                                        variant="text"
                                        endIcon={<ArrowForward />}
                                        sx={{ alignSelf: 'flex-start', fontWeight: 700, color: '#4f46e5', mt: 1 }}
                                    >
                                        View All Projects
                                    </Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Review Dialog Popup */}
            <Dialog
                open={reviewDialogOpen}
                onClose={() => setReviewDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                slotProps={{
                    paper: { sx: { borderRadius: '24px', p: 1 } }
                }}
            >
                <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem' }}>Write a Review for {locality.name}</DialogTitle>
                <DialogContent>
                    <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography sx={{ fontWeight: 700, mb: 1 }}>How was your experience?</Typography>
                            <Rating
                                value={newRating}
                                onChange={(e, val) => setNewRating(val)}
                                size="large"
                            />
                        </Box>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Share your thoughts about this locality..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            variant="outlined"
                            slotProps={{
                                input: { sx: { borderRadius: '16px' } }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setReviewDialogOpen(false)} color="inherit" sx={{ fontWeight: 700 }}>Cancel</Button>
                    <Button
                        onClick={handleReviewSubmit}
                        variant="contained"
                        disabled={submittingReview || !newComment.trim()}
                        sx={{
                            borderRadius: '12px',
                            px: 4,
                            bgcolor: '#4f46e5',
                            fontWeight: 700
                        }}
                    >
                        {submittingReview ? <CircularProgress size={24} color="inherit" /> : 'Submit Review'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LocalityDetails;
