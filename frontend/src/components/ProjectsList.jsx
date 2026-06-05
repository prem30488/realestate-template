import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    TextField,
    InputAdornment,
    CircularProgress,
    Button,
    Chip,
    Divider
} from '@mui/material';
import {
    Search as SearchIcon,
    Apartment as ApartmentIcon,
    LocationOn as LocationIcon,
    AttachMoney as BudgetIcon,
    HomeWork as HomeWorkIcon,
    Explore as ExploreIcon,
    Star as StarIcon,
    OpenInNew as OpenInNewIcon,
    MapsHomeWork as ProjectIcon
} from '@mui/icons-material';

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80';

const StarRating = ({ value }) => {
    const rating = parseFloat(value) || 0;
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <StarIcon
                    key={i}
                    sx={{ fontSize: 14, color: i <= Math.round(rating) ? '#f59e0b' : '#e2e8f0' }}
                />
            ))}
            {rating > 0 && (
                <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 700, color: '#64748b' }}>
                    {rating.toFixed(1)}
                </Typography>
            )}
        </Box>
    );
};

const ProjectCard = ({ project, city }) => (
    <Card
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 20px 40px rgba(255,94,20,0.12)',
                borderColor: 'rgba(255,94,20,0.3)',
            }
        }}
    >
        {/* Project Image */}
        <Box sx={{ position: 'relative', overflow: 'hidden', height: 180 }}>
            <CardMedia
                component="img"
                image={project.photo_url || DEFAULT_IMG}
                alt={project.projectName}
                sx={{
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                    '&:hover': { transform: 'scale(1.06)' }
                }}
                onError={e => { e.target.src = DEFAULT_IMG; }}
            />
            {project.bhk && (
                <Chip
                    label={project.bhk}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: 'rgba(255,94,20,0.9)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: 11,
                        height: 24,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}
            {project.ratings > 0 && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.95)',
                        borderRadius: '10px',
                        px: 1,
                        py: 0.4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    <StarIcon sx={{ fontSize: 13, color: '#f59e0b' }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#1e293b', fontSize: 11 }}>
                        {parseFloat(project.ratings).toFixed(1)}
                    </Typography>
                </Box>
            )}
        </Box>

        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: '#1e293b', fontSize: 16, mb: 1, lineHeight: 1.3 }}
            >
                {project.projectName}
            </Typography>

            {project.budget && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                    <BudgetIcon sx={{ fontSize: 15, color: '#ff5e14' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#ff5e14' }}>
                        {project.budget}
                    </Typography>
                </Box>
            )}

            {project.total_units && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
                    <ApartmentIcon sx={{ fontSize: 15, color: '#64748b' }} />
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                        {project.total_units} Units
                    </Typography>
                </Box>
            )}

            <Box sx={{ mt: 'auto' }}>
                <Link
                    to={`/properties?status=Sell&city=${encodeURIComponent(project.city || city)}&project_id=${project.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Button
                        fullWidth
                        variant="outlined"
                        endIcon={<OpenInNewIcon sx={{ fontSize: 15 }} />}
                        sx={{
                            borderRadius: '12px',
                            py: 1.2,
                            fontWeight: 700,
                            fontSize: 13,
                            textTransform: 'none',
                            color: '#ff5e14',
                            borderColor: 'rgba(255,94,20,0.35)',
                            transition: 'all 0.2s',
                            '&:hover': {
                                bgcolor: '#ff5e14',
                                color: 'white',
                                borderColor: '#ff5e14',
                                boxShadow: '0 4px 14px rgba(255,94,20,0.3)'
                            }
                        }}
                    >
                        View Properties
                    </Button>
                </Link>
            </Box>
        </CardContent>
    </Card>
);

const ProjectsList = () => {
    const { city } = useParams();
    const [localityGroups, setLocalityGroups] = useState([]);
    const [cityName, setCityName] = useState(city);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const resp = await axios.get(`${API_BASE_URL}/api/public/projects-by-city`, {
                    params: { city: city !== 'all' ? city : undefined }
                });
                if (resp.data?.success) {
                    setLocalityGroups(resp.data.data || []);
                    setCityName(resp.data.cityName || city);
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [city]);

    // Filter by search across project names and locality names
    const filtered = localityGroups
        .map(group => ({
            ...group,
            projects: group.projects.filter(p =>
                p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                group.localityName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }))
        .filter(group => group.projects.length > 0);

    const totalProjects = filtered.reduce((sum, g) => sum + g.projects.length, 0);

    return (
        <Box sx={{ pt: 14, pb: 10, bgcolor: '#f8fafc', minHeight: '85vh' }}>

            {/* Hero gradient banner */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '290px',
                    background: 'linear-gradient(135deg, #ff5e14 0%, #ff8c42 55%, #ffc080 100%)',
                    zIndex: 0,
                    opacity: 0.95
                }}
            />

            <Container sx={{ position: 'relative', zIndex: 1 }}>

                {/* Page header */}
                <Box sx={{ mb: 5, textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Box
                            sx={{
                                width: 60, height: 60, borderRadius: '18px',
                                bgcolor: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(8px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <ProjectIcon sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                    </Box>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900, color: 'white',
                            textShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            letterSpacing: '-1px', mb: 1
                        }}
                    >
                        Projects in {cityName}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 400, maxWidth: 560, mx: 'auto', mb: 4 }}
                    >
                        Explore residential &amp; commercial projects across all localities in {cityName}.
                    </Typography>

                    {/* Search bar */}
                    <Card
                        sx={{
                            maxWidth: 600, mx: 'auto',
                            borderRadius: '24px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                            p: 1.5,
                            bgcolor: 'rgba(255,255,255,0.97)'
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder={`Search projects or localities in ${cityName}...`}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#ff5e14', fontSize: 24 }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: '16px',
                                    '& fieldset': { border: 'none' },
                                    bgcolor: '#f8fafc',
                                    fontWeight: 600,
                                    color: '#1e293b'
                                }
                            }}
                        />
                    </Card>
                </Box>

                {/* Content */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300, mt: 4 }}>
                        <CircularProgress size={60} sx={{ color: '#ff5e14' }} />
                    </Box>
                ) : filtered.length === 0 ? (
                    <Box
                        sx={{
                            textAlign: 'center', mt: 6, p: 6,
                            bgcolor: 'white', borderRadius: '24px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                            border: '1px solid #e2e8f0'
                        }}
                    >
                        <ExploreIcon sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
                        <Typography variant="h4" sx={{ color: '#334155', fontWeight: 800, mb: 1 }}>
                            No Projects Found
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#64748b', mb: 3 }}>
                            {searchTerm
                                ? `No projects match "${searchTerm}" in ${cityName}.`
                                : `No projects are available in ${cityName} yet.`}
                        </Typography>
                        {searchTerm && (
                            <Button
                                variant="contained"
                                onClick={() => setSearchTerm('')}
                                sx={{
                                    bgcolor: '#ff5e14', borderRadius: '12px',
                                    px: 4, py: 1.5, fontWeight: 700,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 14px rgba(255,94,20,0.3)',
                                    '&:hover': { bgcolor: '#e04d0a' }
                                }}
                            >
                                Clear Search
                            </Button>
                        )}
                    </Box>
                ) : (
                    <>
                        {/* Summary bar */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, mt: 2 }}>
                            <Typography variant="body1" sx={{ color: '#475569', fontWeight: 600 }}>
                                Showing{' '}
                                <Box component="span" sx={{ color: '#ff5e14', fontWeight: 800 }}>{totalProjects}</Box>
                                {' '}project{totalProjects !== 1 ? 's' : ''} across{' '}
                                <Box component="span" sx={{ color: '#ff5e14', fontWeight: 800 }}>{filtered.length}</Box>
                                {' '}localit{filtered.length !== 1 ? 'ies' : 'y'} in {cityName}
                            </Typography>
                        </Box>

                        {/* Locality groups */}
                        {filtered.map(group => (
                            <Box key={group.localityId} sx={{ mb: 6 }}>
                                {/* Locality header */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                    <Box
                                        sx={{
                                            width: 40, height: 40, borderRadius: '12px',
                                            bgcolor: 'rgba(255,94,20,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                        }}
                                    >
                                        <LocationIcon sx={{ fontSize: 22, color: '#ff5e14' }} />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>
                                            {group.localityName}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                                            {group.projects.length} project{group.projects.length !== 1 ? 's' : ''}
                                        </Typography>
                                    </Box>
                                    <Link
                                        to={`/properties?city=${encodeURIComponent(cityName)}&locality_id=${group.localityId}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Button
                                            size="small"
                                            variant="text"
                                            endIcon={<HomeWorkIcon sx={{ fontSize: 15 }} />}
                                            sx={{
                                                color: '#ff5e14', fontWeight: 700,
                                                fontSize: 13, textTransform: 'none',
                                                '&:hover': { bgcolor: 'rgba(255,94,20,0.06)' }
                                            }}
                                        >
                                            All Properties
                                        </Button>
                                    </Link>
                                </Box>
                                <Divider sx={{ mb: 3, borderColor: '#f1f5f9' }} />

                                <Grid container spacing={3}>
                                    {group.projects.map(project => (
                                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                                            <ProjectCard project={project} city={cityName} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ))}
                    </>
                )}
            </Container>
        </Box>
    );
};

export default ProjectsList;
