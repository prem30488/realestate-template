import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Rating,
    Button,
    Skeleton,
} from '@mui/material';
import { API_BASE_URL } from '../constants';
import './DeveloperLounge.css';

const WHY_ITEMS = [
    {
        icon: 'pe-7s-shield',
        title: 'Guaranteed Quality',
        body: 'Structural integrity and premium finishes verified by industry experts and independent auditors.',
        number: '01',
    },
    {
        icon: 'pe-7s-clock',
        title: 'On-time Delivery',
        body: 'Trusted brands have a proven track record of delivering projects within scheduled timelines.',
        number: '02',
    },
    {
        icon: 'pe-7s-medal',
        title: 'Value Appreciation',
        body: 'Properties from reputable builders command higher resale value and superior rental yields.',
        number: '03',
    },
];

const DeveloperLounge = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/public/brands`);
                setBrands(response.data);
            } catch (error) {
                console.error('Error fetching brands:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    const categories = ['All', ...new Set(brands.map(b => b.category))];

    const filteredBrands = filter === 'All'
        ? brands
        : brands.filter(b => b.category === filter);

    /* Aggregate stats for the header bar */
    const totalProjects = brands.reduce((s, b) => s + (b.totalProjects || 0), 0);
    const totalOngoing = brands.reduce((s, b) => s + (b.ongoingProjects || 0), 0);
    const totalExp = brands.length
        ? Math.max(...brands.map(b => b.experienceYears || 0))
        : 0;

    return (
        <div className="developer-lounge-page">

            {/* ── HERO HEADER ─────────────────────────────────── */}
            <div className="lounge-header">
                <Container maxWidth="xl">

                    {/* Eyebrow */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
                        <span className="lounge-eyebrow">
                            <span className="dot" />
                            India's Premium Real Estate Brands
                        </span>
                    </div>

                    <Typography variant="h3" className="title">
                        Developer&nbsp;<span>Lounge</span>
                    </Typography>

                    <Typography variant="h6" className="subtitle">
                        Discover &amp; Connect with India's Most Trusted Real Estate Brands
                    </Typography>

                    {/* Stats bar */}
                    {!loading && brands.length > 0 && (
                        <div className="lounge-stats-bar">
                            <div className="lounge-stat">
                                <span className="lstat-val">{brands.length}+</span>
                                <span className="lstat-lbl">Verified Brands</span>
                            </div>
                            <div className="lounge-stat">
                                <span className="lstat-val">{totalProjects}+</span>
                                <span className="lstat-lbl">Total Projects</span>
                            </div>
                            <div className="lounge-stat">
                                <span className="lstat-val">{totalOngoing}+</span>
                                <span className="lstat-lbl">Active Projects</span>
                            </div>
                            <div className="lounge-stat">
                                <span className="lstat-val">{totalExp}+</span>
                                <span className="lstat-lbl">Yrs of Excellence</span>
                            </div>
                        </div>
                    )}

                    {/* Category filters */}
                    <Box className="category-filters">
                        {categories.map(cat => (
                            <Chip
                                key={cat}
                                label={cat}
                                onClick={() => setFilter(cat)}
                                color={filter === cat ? 'primary' : 'default'}
                                variant={filter === cat ? 'filled' : 'outlined'}
                                className="filter-chip"
                            />
                        ))}
                    </Box>
                </Container>
            </div>

            {/* ── BRAND CARDS ──────────────────────────────────── */}
            <Container maxWidth="xl" className="brands-container">
                <Grid container spacing={4}>
                    {loading ? (
                        [1, 2, 3, 4, 5, 6].map(i => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Skeleton variant="rectangular" height={420} sx={{ borderRadius: 4 }} />
                            </Grid>
                        ))
                    ) : (
                        filteredBrands.map((brand) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={brand.id}>
                                <Card className="brand-card">

                                    {/* Cover banner */}
                                    <div className="brand-cover">
                                        <div className="overlay" />
                                        <Chip
                                            label={brand.category}
                                            className="category-badge"
                                            size="small"
                                        />
                                    </div>

                                    <CardContent className="brand-content">

                                        {/* Logo */}
                                        <div className="logo-box">
                                            <img src={brand.image} alt={brand.name} />
                                        </div>

                                        <Typography variant="h5" className="brand-name">
                                            {brand.name}
                                        </Typography>
                                        <Typography variant="subtitle2" className="tagline">
                                            {brand.tagline}
                                        </Typography>

                                        {/* Stats */}
                                        <Box className="stats-row">
                                            <div className="stat-item">
                                                <span className="val">{brand.experienceYears}+</span>
                                                <span className="lbl">Exp (Yrs)</span>
                                            </div>
                                            <div className="stat-item">
                                                <span className="val">{brand.totalProjects}</span>
                                                <span className="lbl">Projects</span>
                                            </div>
                                            <div className="stat-item">
                                                <span className="val">{brand.ongoingProjects}</span>
                                                <span className="lbl">Active</span>
                                            </div>
                                        </Box>

                                        <Typography variant="body2" className="description">
                                            {brand.description}
                                        </Typography>

                                        {/* Footer row */}
                                        <div className="footer-row">
                                            <Box className="rating-box">
                                                <Rating
                                                    value={brand.rating}
                                                    precision={0.1}
                                                    readOnly
                                                    size="small"
                                                />
                                                <Typography variant="caption">
                                                    ({brand.reviewsCount})
                                                </Typography>
                                            </Box>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                className="view-btn"
                                                onClick={() => window.open(brand.websiteUrl, '_blank')}
                                            >
                                                Visit Microsite
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>

            {/* ── WHY BRAND HOME ───────────────────────────────── */}
            <Box className="lounge-footer">
                <Container maxWidth="lg">
                    <Typography variant="h5">Why choose a Brand Home?</Typography>
                    <p className="lounge-footer-subtitle">
                        Backed by decades of trust — building homes, not just structures.
                    </p>
                    <Grid container spacing={4}>
                        {WHY_ITEMS.map((item) => (
                            <Grid size={{ xs: 12, md: 4 }} key={item.title}>
                                <div className="info-point">
                                    <span className="info-point-number">{item.number}</span>
                                    <i className={item.icon} />
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography variant="body2">{item.body}</Typography>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

        </div>
    );
};

export default DeveloperLounge;
