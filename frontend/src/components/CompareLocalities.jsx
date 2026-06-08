import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, Container, Grid, Typography, Card, CardContent,
    Button, Divider, Chip, CircularProgress,
    Autocomplete, TextField, Paper, Rating,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    useTheme, useMediaQuery
} from '@mui/material';
import {
    Compare, LocationOn, Star, DirectionsBus, School,
    LocalHospital, ShoppingBag, Restaurant, TrendingUp,
    CheckCircle, VerifiedUser, Home, Info, Delete, Search
} from '@mui/icons-material';
import { useCity } from '../context/CityContext';
import { API_BASE_URL } from '../constants';
import './CompareLocalities.css';

const CompareLocalities = () => {
    const { selectedCity } = useCity();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [localities, setLocalities] = useState([]);
    const [selection1, setSelection1] = useState(null);
    const [selection2, setSelection2] = useState(null);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingList, setLoadingList] = useState(true);

    useEffect(() => {
        fetchLocalities();
    }, [selectedCity]);

    const fetchLocalities = async () => {
        setLoadingList(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/public/localities?city=${selectedCity}`);
            if (response.data.success) {
                setLocalities(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching localities:', error);
        } finally {
            setLoadingList(false);
        }
    };

    const fetchLocalityDetails = async (name, setter) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/public/localities/${encodeURIComponent(name)}`);
            if (response.data.success) {
                setter(response.data.data);
            }
        } catch (error) {
            console.error(`Error fetching details for ${name}:`, error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selection1) {
            fetchLocalityDetails(selection1.name, setData1);
        } else {
            setData1(null);
        }
    }, [selection1]);

    useEffect(() => {
        if (selection2) {
            fetchLocalityDetails(selection2.name, setData2);
        } else {
            setData2(null);
        }
    }, [selection2]);

    const renderComparisonRow = (label, field1, field2, icon) => {
        return (
            <TableRow key={label}>
                <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc', width: '20%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {icon} {label}
                    </Box>
                </TableCell>
                <TableCell sx={{ width: '40%', verticalAlign: 'top' }}>
                    {field1 || <Typography color="text.secondary" variant="body2">No data available</Typography>}
                </TableCell>
                <TableCell sx={{ width: '40%', verticalAlign: 'top' }}>
                    {field2 || <Typography color="text.secondary" variant="body2">No data available</Typography>}
                </TableCell>
            </TableRow>
        );
    };

    const renderListComparison = (label, list1, list2, icon) => {
        const renderList = (list) => {
            if (!list || list.length === 0) return <Typography color="text.secondary" variant="body2">No data available</Typography>;
            return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {list.map((item, idx) => (
                        <Chip
                            key={idx}
                            label={`${item.label}: ${item.value}`}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: '8px' }}
                        />
                    ))}
                </Box>
            );
        };

        return renderComparisonRow(label, renderList(list1), renderList(list2), icon);
    };

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10, pt: '100px' }}>
            <Box
                className="compare-hero"
                sx={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                    py: 8,
                    color: 'white',
                    mb: 4
                }}
            >
                <Container>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
                            Compare Localities
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.8, maxWidth: '700px', mx: 'auto' }}>
                            Make an informed decision by comparing two localities side-by-side.
                            Analyze connectivity, infrastructure, lifestyle, and real estate trends.
                        </Typography>
                    </Box>

                    <Grid container spacing={4} sx={{ justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Autocomplete
                                options={localities}
                                getOptionLabel={(option) => option.name}
                                value={selection1}
                                onChange={(e, val) => setSelection1(val)}
                                loading={loadingList}
                                popupIcon={<LocationOn sx={{ color: '#4f46e5' }} />}
                                PaperComponent={({ children }) => (
                                    <Paper sx={{
                                        borderRadius: '16px',
                                        mt: 1,
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        overflow: 'hidden'
                                    }}>
                                        {children}
                                    </Paper>
                                )}
                                renderOption={(props, option) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                        <Box key={key} component="li" {...optionProps} sx={{ p: '12px !important', borderBottom: '1px solid #f1f5f9' }}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                width: '100%'
                                            }}>
                                                <Box sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: '10px',
                                                    bgcolor: 'rgba(79, 70, 229, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}>
                                                    <LocationOn sx={{ color: '#4f46e5', fontSize: 20 }} />
                                                </Box>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                                        {option.name}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                        Rating: {option.rating || '4.0'} | Popular Locality
                                                    </Typography>
                                                </Box>
                                                <Rating size="small" value={option.rating || 4} readOnly sx={{ fontSize: '0.8rem' }} />
                                            </Box>
                                        </Box>
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select First Locality"
                                        placeholder="Search by name..."
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                                                    <Search sx={{ color: '#64748b' }} />
                                                </Box>
                                            ),
                                            sx: {
                                                bgcolor: 'white',
                                                borderRadius: '16px',
                                                height: '64px',
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                                '& fieldset': { border: 'none' },
                                                '&:hover fieldset': { border: 'none' },
                                                '&.Mui-focused fieldset': { border: 'none' },
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }
                                            }
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                fontWeight: 600,
                                                color: '#64748b',
                                                '&.Mui-focused': { color: '#4f46e5' }
                                            }
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 1 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                <Compare sx={{ fontSize: 28, color: 'white' }} />
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 5 }}>
                            <Autocomplete
                                options={localities}
                                getOptionLabel={(option) => option.name}
                                value={selection2}
                                onChange={(e, val) => setSelection2(val)}
                                loading={loadingList}
                                popupIcon={<LocationOn sx={{ color: '#10b981' }} />}
                                PaperComponent={({ children }) => (
                                    <Paper sx={{
                                        borderRadius: '16px',
                                        mt: 1,
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        overflow: 'hidden'
                                    }}>
                                        {children}
                                    </Paper>
                                )}
                                renderOption={(props, option) => {
                                    const { key, ...optionProps } = props;
                                    return (
                                        <Box key={key} component="li" {...optionProps} sx={{ p: '12px !important', borderBottom: '1px solid #f1f5f9' }}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                width: '100%'
                                            }}>
                                                <Box sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: '10px',
                                                    bgcolor: 'rgba(16, 185, 129, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}>
                                                    <LocationOn sx={{ color: '#10b981', fontSize: 20 }} />
                                                </Box>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                                        {option.name}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                        Rating: {option.rating || '4.0'} | High Growth
                                                    </Typography>
                                                </Box>
                                                <Rating size="small" value={option.rating || 4} readOnly sx={{ fontSize: '0.8rem' }} />
                                            </Box>
                                        </Box>
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Second Locality"
                                        placeholder="Search by name..."
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                                                    <Search sx={{ color: '#64748b' }} />
                                                </Box>
                                            ),
                                            sx: {
                                                bgcolor: 'white',
                                                borderRadius: '16px',
                                                height: '64px',
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                                '& fieldset': { border: 'none' },
                                                '&:hover fieldset': { border: 'none' },
                                                '&.Mui-focused fieldset': { border: 'none' },
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }
                                            }
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                fontWeight: 600,
                                                color: '#64748b',
                                                '&.Mui-focused': { color: '#10b981' }
                                            }
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container>
                {(!data1 && !data2) ? (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Compare sx={{ fontSize: 100, color: '#e2e8f0', mb: 2 }} />
                        <Typography variant="h5" color="text.secondary">
                            Select localities to start comparison
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        {/* Summary Cards */}
                        <Grid container spacing={4} sx={{ mb: 6 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                {data1 && (
                                    <Card sx={{ borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', height: '100%' }}>
                                        <Box sx={{
                                            height: '150px',
                                            background: data1.image_url ? `url(${data1.image_url})` : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }} />
                                        <CardContent sx={{ p: 4 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Typography variant="h4" sx={{ fontWeight: 800 }}>{data1.name}</Typography>
                                                <Chip
                                                    icon={<Star sx={{ color: '#fbbf24 !important' }} />}
                                                    label={data1.rating || '4.0'}
                                                    sx={{ fontWeight: 700, bgcolor: '#fef3c7', color: '#92400e' }}
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                                {data1.overview?.substring(0, 150)}...
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                component="a"
                                                href={`/locality/${encodeURIComponent(data1.name)}`}
                                                sx={{ borderRadius: '12px' }}
                                            >
                                                View Full Details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )}
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                {data2 && (
                                    <Card sx={{ borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', height: '100%' }}>
                                        <Box sx={{
                                            height: '150px',
                                            background: data2.image_url ? `url(${data2.image_url})` : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }} />
                                        <CardContent sx={{ p: 4 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Typography variant="h4" sx={{ fontWeight: 800 }}>{data2.name}</Typography>
                                                <Chip
                                                    icon={<Star sx={{ color: '#fbbf24 !important' }} />}
                                                    label={data2.rating || '4.0'}
                                                    sx={{ fontWeight: 700, bgcolor: '#fef3c7', color: '#92400e' }}
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                                {data2.overview?.substring(0, 150)}...
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                component="a"
                                                href={`/locality/${encodeURIComponent(data2.name)}`}
                                                sx={{ borderRadius: '12px' }}
                                            >
                                                View Full Details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )}
                            </Grid>
                        </Grid>

                        {/* Detailed Comparison Table */}
                        <TableContainer component={Paper} sx={{ borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#1e293b' }}>
                                        <TableCell sx={{ color: 'white', fontWeight: 800 }}>Feature</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 800 }}>{data1?.name || 'Locality 1'}</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 800 }}>{data2?.name || 'Locality 2'}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderComparisonRow('Rating',
                                        data1 && <Rating value={data1.rating || 4} readOnly precision={0.5} />,
                                        data2 && <Rating value={data2.rating || 4} readOnly precision={0.5} />,
                                        <Star sx={{ color: '#fbbf24' }} />
                                    )}

                                    {renderComparisonRow('Average Price',
                                        data1?.real_estate_trends?.avgPrice || 'N/A',
                                        data2?.real_estate_trends?.avgPrice || 'N/A',
                                        <TrendingUp sx={{ color: '#4f46e5' }} />
                                    )}

                                    {renderComparisonRow('Price Trend',
                                        data1?.real_estate_trends?.priceTrend || 'N/A',
                                        data2?.real_estate_trends?.priceTrend || 'N/A',
                                        <TrendingUp sx={{ color: '#10b981' }} />
                                    )}

                                    {renderListComparison('Connectivity',
                                        data1?.connectivity,
                                        data2?.connectivity,
                                        <DirectionsBus sx={{ color: '#4f46e5' }} />
                                    )}

                                    {renderListComparison('Infrastructure',
                                        data1?.infrastructure,
                                        data2?.infrastructure,
                                        <School sx={{ color: '#f59e0b' }} />
                                    )}

                                    {renderListComparison('Lifestyle',
                                        data1?.lifestyle,
                                        data2?.lifestyle,
                                        <ShoppingBag sx={{ color: '#ec4899' }} />
                                    )}

                                    {renderComparisonRow('Rental Yield',
                                        data1?.real_estate_trends?.rentalYield || 'N/A',
                                        data2?.real_estate_trends?.rentalYield || 'N/A',
                                        <Home sx={{ color: '#06b6d4' }} />
                                    )}

                                    {renderComparisonRow('Demand',
                                        data1?.real_estate_trends?.demand || 'N/A',
                                        data2?.real_estate_trends?.demand || 'N/A',
                                        <VerifiedUser sx={{ color: '#10b981' }} />
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Tips Card */}
                        <Box sx={{ mt: 6 }}>
                            <Card sx={{ bgcolor: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '24px' }}>
                                <CardContent sx={{ p: 4, display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                                    <Info sx={{ color: '#d97706', fontSize: 32 }} />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#92400e', mb: 1 }}>Comparison Tip</Typography>
                                        <Typography variant="body2" color="#92400e">
                                            While price in one locality might be lower, consider the connectivity and future growth potential.
                                            Localities with upcoming infrastructure projects usually offer better long-term appreciation.
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default CompareLocalities;
