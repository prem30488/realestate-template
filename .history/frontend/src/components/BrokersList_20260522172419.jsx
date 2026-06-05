import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    CircularProgress,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Avatar,
    InputAdornment
} from '@mui/material';
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    LinkedIn as LinkedInIcon,
    Instagram as InstagramIcon,
    Search as SearchIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

const BrokersList = () => {
    const [searchParams] = useSearchParams();
    const cityParam = searchParams.get('city') || '';

    const [brokers, setBrokers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(cityParam);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBrokers, setFilteredBrokers] = useState([]);

    // Fetch cities
    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/cities`)
            .then(res => setCities(res.data))
            .catch(() => console.error('Error fetching cities'));
    }, []);

    // Fetch brokers
    useEffect(() => {
        const fetchBrokers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/api/brokers`, {
                    params: {
                        limit: 100
                    }
                });

                setBrokers(response.data);
            } catch (error) {
                console.error('Error fetching brokers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrokers();
    }, []);

    // Apply filters whenever brokers, selectedCity, or searchTerm change
    useEffect(() => {
        let filtered = brokers;

        // Filter by city
        if (selectedCity) {
            filtered = filtered.filter(broker => broker.city === selectedCity);
        }

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(broker =>
                broker.name.toLowerCase().includes(term) ||
                broker.designation?.toLowerCase().includes(term) ||
                broker.specialization?.toLowerCase().includes(term) ||
                broker.email?.toLowerCase().includes(term)
            );
        }

        setFilteredBrokers(filtered);
    }, [brokers, selectedCity, searchTerm]);

    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 8, px: 2, pt: '100px' }}>
            <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
                {/* Header */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 2 }}>
                        Find an Agent{selectedCity ? ` in ${selectedCity}` : ''}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                        Connect with our experienced real estate agents. Get expert advice for buying, selling, or renting property.
                    </Typography>
                </Box>

                {/* Filters */}
                <Paper sx={{ p: 3, mb: 4, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Select City</InputLabel>
                                <Select
                                    value={selectedCity}
                                    label="Select City"
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    sx={{ borderRadius: '10px' }}
                                >
                                    <MenuItem value="">All Cities</MenuItem>
                                    {cities.map(city => (
                                        <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search by name, designation, or specialization..."
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
                        </Grid>
                    </Grid>
                </Paper>

                {/* Loading State */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress size={50} />
                    </Box>
                ) : filteredBrokers.length === 0 ? (
                    <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" color="textSecondary">
                            {searchTerm || selectedCity ? 'No brokers found matching your criteria' : 'No brokers available'}
                        </Typography>
                    </Paper>
                ) : (
                    /* Brokers Grid */
                    <Grid container spacing={3}>
                        {filteredBrokers.map((broker) => (
                            <Grid item xs={12} sm={6} md={4} key={broker.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                                            transform: 'translateY(-5px)'
                                        }
                                    }}
                                >
                                    {/* Photo */}
                                    {broker.photo ? (
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={broker.photo}
                                            alt={broker.name}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                height: '240px',
                                                bgcolor: '#e0e0e0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Avatar sx={{ width: 80, height: 80, bgcolor: '#6a11cb', fontSize: '2rem' }}>
                                                {broker.name.charAt(0)}
                                            </Avatar>
                                        </Box>
                                    )}

                                    <CardContent sx={{ flexGrow: 1, pb: 2 }}>
                                        {/* Name and City */}
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 2 }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                                                    {broker.name}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                icon={<LocationIcon />}
                                                label={broker.city || 'Not specified'}
                                                size="small"
                                                variant="outlined"
                                                sx={{ fontWeight: 600, color: broker.city ? '#6a11cb' : '#999', borderColor: broker.city ? '#6a11cb' : '#ddd' }}
                                            />
                                        </Box>

                                        {/* Designation */}
                                        {broker.designation && (
                                            <Typography variant="body2" sx={{ color: '#666', mb: 1.5, fontWeight: 500 }}>
                                                {broker.designation}
                                            </Typography>
                                        )}

                                        {/* Experience and Specialization */}
                                        <Box sx={{ mb: 2 }}>
                                            {broker.experience && (
                                                <Chip
                                                    label={`${broker.experience} experience`}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ mr: 1, mb: 1 }}
                                                />
                                            )}
                                            {broker.specialization && (
                                                <Chip
                                                    label={broker.specialization}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ mb: 1 }}
                                                />
                                            )}
                                        </Box>

                                        {/* Contact Info */}
                                        <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                                            {broker.email && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <EmailIcon sx={{ fontSize: 16, color: '#666' }} />
                                                    <Typography
                                                        variant="caption"
                                                        sx={{ color: '#666', textDecoration: 'none' }}
                                                        component="a"
                                                        href={`mailto:${broker.email}`}
                                                    >
                                                        {broker.email}
                                                    </Typography>
                                                </Box>
                                            )}
                                            {broker.phoneNumber && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <PhoneIcon sx={{ fontSize: 16, color: '#666' }} />
                                                    <Typography
                                                        variant="caption"
                                                        sx={{ color: '#666' }}
                                                        component="a"
                                                        href={`tel:${broker.phoneNumber}`}
                                                    >
                                                        {broker.phoneNumber}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>

                                        {/* Social Links */}
                                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                            {broker.facebook && (
                                                <Button
                                                    href={broker.facebook}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    size="small"
                                                    sx={{ minWidth: 'auto', p: 0.5 }}
                                                >
                                                    <FacebookIcon sx={{ fontSize: 18, color: '#1877F2' }} />
                                                </Button>
                                            )}
                                            {broker.twitter && (
                                                <Button
                                                    href={broker.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    size="small"
                                                    sx={{ minWidth: 'auto', p: 0.5 }}
                                                >
                                                    <TwitterIcon sx={{ fontSize: 18, color: '#1DA1F2' }} />
                                                </Button>
                                            )}
                                            {broker.linkedin && (
                                                <Button
                                                    href={broker.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    size="small"
                                                    sx={{ minWidth: 'auto', p: 0.5 }}
                                                >
                                                    <LinkedInIcon sx={{ fontSize: 18, color: '#0A66C2' }} />
                                                </Button>
                                            )}
                                            {broker.instagram && (
                                                <Button
                                                    href={broker.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    size="small"
                                                    sx={{ minWidth: 'auto', p: 0.5 }}
                                                >
                                                    <InstagramIcon sx={{ fontSize: 18, color: '#E4405F' }} />
                                                </Button>
                                            )}
                                        </Box>
                                    </CardContent>

                                    {/* Contact Button */}
                                    <Box sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                bgcolor: '#6a11cb',
                                                borderRadius: '8px',
                                                py: 1,
                                                fontWeight: 600,
                                                '&:hover': { bgcolor: '#2575fc' }
                                            }}
                                            href={`tel:${broker.phoneNumber}`}
                                        >
                                            Call Now
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Results count */}
                {!loading && filteredBrokers.length > 0 && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Typography variant="body2" color="textSecondary">
                            Showing {filteredBrokers.length} broker{filteredBrokers.length !== 1 ? 's' : ''}
                            {selectedCity && ` in ${selectedCity}`}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default BrokersList;
