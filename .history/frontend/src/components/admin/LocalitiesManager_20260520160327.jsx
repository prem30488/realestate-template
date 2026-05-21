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
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    CircularProgress,
    InputAdornment,
    TablePagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Map as MapIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';
import MapPicker from './MapPicker';
import { Map as MapIcon } from '@mui/icons-material';

const LocalitiesManager = () => {
    const [localities, setLocalities] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [showMapPicker, setShowMapPicker] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    const [formData, setFormData] = useState({
        city_id: '',
        name: '',
        postal_code: '',
        latitude: '',
        longitude: ''
    });

    // Fetch cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/cities`);
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);

    const fetchLocalities = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const params = {
                page: page + 1,
                limit: rowsPerPage
            };
            if (searchTerm) params.search = searchTerm;
            if (selectedCity) params.city_id = selectedCity;

            const response = await axios.get(`${API_BASE_URL}/api/localities`, {
                params,
                headers: { Authorization: `Bearer ${token}` }
            });

            setLocalities(response.data.data);
            setTotalCount(response.data.pagination.total);
        } catch (error) {
            console.error('Error fetching localities:', error);
            toast.error(error.response?.data?.message || 'Error fetching localities');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setPage(0);
            fetchLocalities();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, selectedCity]);

    useEffect(() => {
        fetchLocalities();
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this locality?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_BASE_URL}/api/localities/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Locality deleted successfully');
                fetchLocalities();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error deleting locality');
            }
        }
    };

    const handleOpen = (locality = null) => {
        if (locality) {
            setEditingId(locality.id);
            setFormData({
                city_id: locality.city_id,
                name: locality.name || '',
                postal_code: locality.postal_code || '',
                latitude: locality.latitude || '',
                longitude: locality.longitude || ''
            });
        } else {
            setEditingId(null);
            setFormData({
                city_id: '',
                name: '',
                postal_code: '',
                latitude: '',
                longitude: ''
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setShowMapPicker(false);
    };

    const handleSubmit = async () => {
        if (!formData.city_id || !formData.name) {
            toast.error('City and Name are required');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            if (editingId) {
                await axios.put(`${API_BASE_URL}/api/localities/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Locality updated successfully');
            } else {
                await axios.post(`${API_BASE_URL}/api/localities`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Locality added successfully');
            }
            handleClose();
            fetchLocalities();
        } catch (error) {
            toast.error(error.response?.data?.message || `Error ${editingId ? 'updating' : 'adding'} locality`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMapCoordinateSelect = (lat, lng) => {
        setFormData(prev => ({
            ...prev,
            latitude: lat,
            longitude: lng
        }));
        setShowMapPicker(false);
        toast.success('Coordinates updated from map');
    };

    return (
        <Box sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Localities Manager</Typography>
                    <Typography variant="body2" color="textSecondary">Manage localities, neighborhoods, and areas</Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        bgcolor: '#6a11cb',
                        borderRadius: '10px',
                        px: 3,
                        py: 1,
                        '&:hover': { bgcolor: '#2575fc' }
                    }}
                    onClick={() => handleOpen()}
                >
                    Add New Locality
                </Button>
            </Box>

            {/* Search and Filter */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by locality name or postal code..."
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
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Filter by City</InputLabel>
                            <Select
                                value={selectedCity}
                                label="Filter by City"
                                onChange={(e) => setSelectedCity(e.target.value)}
                                sx={{ borderRadius: '10px' }}
                            >
                                <MenuItem value="">All Cities</MenuItem>
                                {cities.map(city => (
                                    <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Table */}
            <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Locality</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Postal Code</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Coordinates</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && localities.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <CircularProgress size={30} sx={{ my: 4 }} />
                                </TableCell>
                            </TableRow>
                        ) : localities.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography sx={{ py: 4 }}>No localities found</Typography>
                                </TableCell>
                            </TableRow>
                        ) : localities.map((locality) => (
                            <TableRow key={locality.id} hover sx={{ transition: '0.2s' }}>
                                <TableCell>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{locality.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{locality.city?.name || 'N/A'}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{locality.postal_code || 'N/A'}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                        {locality.latitude && locality.longitude
                                            ? `${locality.latitude}, ${locality.longitude}`
                                            : 'N/A'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpen(locality)}
                                        sx={{ color: '#2575fc' }}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(locality.id)}
                                        sx={{ color: '#f44336' }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Add/Edit Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, bgcolor: '#f8f9fa' }}>
                    {editingId ? 'Edit Locality' : 'Add New Locality'}
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>City</InputLabel>
                                <Select
                                    value={formData.city_id}
                                    label="City"
                                    name="city_id"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="">Select a city</MenuItem>
                                    {cities.map(city => (
                                        <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Locality Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Postal Code"
                                name="postal_code"
                                value={formData.postal_code}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant={showMapPicker ? 'contained' : 'outlined'}
                                startIcon={<MapIcon />}
                                onClick={() => setShowMapPicker(!showMapPicker)}
                                sx={{
                                    bgcolor: showMapPicker ? '#6a11cb' : 'transparent',
                                    color: showMapPicker ? 'white' : '#6a11cb',
                                    borderColor: '#6a11cb',
                                    '&:hover': {
                                        bgcolor: showMapPicker ? '#2575fc' : 'rgba(106, 17, 203, 0.08)'
                                    }
                                }}
                            >
                                {showMapPicker ? 'Hide Map Picker' : 'Pick Location from Map'}
                            </Button>
                        </Grid>
                        {showMapPicker && (
                            <Grid item xs={12}>
                                <MapPicker
                                    latitude={parseFloat(formData.latitude) || null}
                                    longitude={parseFloat(formData.longitude) || null}
                                    onCoordinateSelect={handleMapCoordinateSelect}
                                    defaultCity={cities.find(c => c.id === formData.city_id)?.name || 'India'}
                                />
                            </Grid>
                        )}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Latitude"
                                name="latitude"
                                type="number"
                                inputProps={{ step: '0.00000001' }}
                                value={formData.latitude}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Longitude"
                                name="longitude"
                                type="number"
                                inputProps={{ step: '0.00000001' }}
                                value={formData.longitude}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                    <Button onClick={handleClose} color="inherit">Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ bgcolor: '#6a11cb', '&:hover': { bgcolor: '#2575fc' } }}
                    >
                        {editingId ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LocalitiesManager;
