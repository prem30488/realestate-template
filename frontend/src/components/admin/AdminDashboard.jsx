import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Paper, Chip, Avatar,
  CircularProgress, Divider, LinearProgress, Skeleton
} from '@mui/material';
import {
  Business as PropertyIcon,
  People as PeopleIcon,
  Newspaper as NewsIcon,
  TrendingUp as TrendingIcon,
  Person as PersonIcon,
  SupervisorAccount as AdminIcon,
  CheckCircle as ActiveIcon,
  Store as BrandIcon,
  Build as ServiceIcon,
  Handshake as BrokerIcon,
  Star as TestimonialIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';

const ROLE_COLOR = { superadmin: '#c0392b', admin: '#f39c12', user: '#6a11cb' };

// ── Animated Stat Card ────────────────────────────────────────────────────────
const StatCard = ({ title, value, subtitle, icon, gradient, loading }) => (
  <Card sx={{
    height: '100%',
    borderRadius: '16px',
    background: gradient,
    color: '#fff',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 40px rgba(0,0,0,0.2)' }
  }}>
    {/* Decorative circle */}
    <Box sx={{
      position: 'absolute', top: -20, right: -20,
      width: 120, height: 120, borderRadius: '50%',
      bgcolor: 'rgba(255,255,255,0.1)'
    }} />
    <Box sx={{
      position: 'absolute', bottom: -30, right: 20,
      width: 80, height: 80, borderRadius: '50%',
      bgcolor: 'rgba(255,255,255,0.07)'
    }} />
    <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" sx={{ opacity: 0.85, fontWeight: 600, mb: 1, textTransform: 'uppercase', letterSpacing: 0.8, fontSize: '0.7rem' }}>
            {title}
          </Typography>
          {loading ? (
            <Skeleton variant="text" width={80} height={48} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
          ) : (
            <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1 }}>{value ?? '—'}</Typography>
          )}
          {subtitle && (
            <Typography variant="caption" sx={{ opacity: 0.75, mt: 0.5, display: 'block' }}>{subtitle}</Typography>
          )}
        </Box>
        <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 1.5, borderRadius: '12px', display: 'flex' }}>
          {React.cloneElement(icon, { sx: { fontSize: 32, color: '#fff' } })}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// ── Mini Progress Bar Row ─────────────────────────────────────────────────────
const ProgressRow = ({ label, value, total, color }) => {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{label}</Typography>
        <Typography variant="body2" color="textSecondary">{value} / {total}</Typography>
      </Box>
      <LinearProgress variant="determinate" value={pct}
        sx={{ height: 6, borderRadius: 3, bgcolor: '#f0f0f0', '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 } }}
      />
    </Box>
  );
};

// ── Main Dashboard ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/admin/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const s = data?.stats || {};

  const statCards = [
    { title: 'Total Properties', value: s.totalProperties, subtitle: `${s.activeProperties ?? '—'} active listings`, icon: <PropertyIcon />, gradient: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)' },
    { title: 'Total Users', value: s.totalUsers, subtitle: `${s.adminUsers ?? '—'} admins`, icon: <PeopleIcon />, gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
    { title: 'News Articles', value: s.activeArticles, subtitle: `${s.totalArticles ?? '—'} total`, icon: <NewsIcon />, gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
    { title: 'Active Brokers', value: s.totalBrokers, subtitle: 'Listed agents', icon: <BrokerIcon />, gradient: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)' },
    { title: 'Testimonials', value: s.totalTestimonials, subtitle: 'Client reviews', icon: <TestimonialIcon />, gradient: 'linear-gradient(135deg, #8e44ad 0%, #c0392b 100%)' },
    { title: 'Brand Partners', value: s.totalBrands, subtitle: 'Partner logos', icon: <BrandIcon />, gradient: 'linear-gradient(135deg, #2980b9 0%, #6dd5fa 100%)' },
    { title: 'Services', value: s.totalServices, subtitle: 'Active services', icon: <ServiceIcon />, gradient: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
    { title: 'Active Listings', value: s.activeProperties, subtitle: `of ${s.totalProperties ?? '—'} total`, icon: <TrendingIcon />, gradient: 'linear-gradient(135deg, #43c6ac 0%, #191654 100%)' },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#1a1a2e', mb: 0.5 }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Welcome back, <strong>{user.username}</strong> 👋 — Here's what's happening today.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', color: '#6a11cb' }}
          onClick={fetchStats}>
          <RefreshIcon sx={{ fontSize: 18 }} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>Refresh</Typography>
        </Box>
      </Box>

      {/* Stat Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <StatCard {...card} loading={loading} />
          </Grid>
        ))}
      </Grid>

      {/* Bottom Panels */}
      <Grid container spacing={3}>
        {/* Content Health */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1a1a2e' }}>
              📊 Content Health
            </Typography>
            {loading ? (
              [1, 2, 3, 4].map(i => <Skeleton key={i} height={40} sx={{ mb: 1 }} />)
            ) : (
              <>
                <ProgressRow label="Active Properties" value={s.activeProperties ?? 0} total={s.totalProperties || 1} color="#6a11cb" />
                <ProgressRow label="Published Articles" value={s.activeArticles ?? 0} total={s.totalArticles || 1} color="#f39c12" />
                <ProgressRow label="Visible Testimonials" value={s.totalTestimonials ?? 0} total={Math.max(s.totalTestimonials, 4) || 4} color="#11998e" />
                <ProgressRow label="Active Services" value={s.totalServices ?? 0} total={Math.max(s.totalServices, 4) || 4} color="#e74c3c" />
                <ProgressRow label="Brand Partners" value={s.totalBrands ?? 0} total={Math.max(s.totalBrands, 6) || 6} color="#2980b9" />
              </>
            )}
          </Paper>
        </Grid>

        {/* Recent Articles */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1a1a2e' }}>
              📰 Recent Articles
            </Typography>
            {loading ? (
              [1, 2, 3, 4, 5].map(i => <Skeleton key={i} height={52} sx={{ mb: 1 }} />)
            ) : data?.recentArticles?.length === 0 ? (
              <Typography color="textSecondary" variant="body2">No articles yet.</Typography>
            ) : data?.recentArticles?.map(article => (
              <Box key={article.id}>
                <Box sx={{ display: 'flex', gap: 2, py: 1.5, alignItems: 'center' }}>
                  <Avatar
                    src={article.image}
                    variant="rounded"
                    sx={{ width: 44, height: 44, flexShrink: 0 }}
                  >
                    <NewsIcon />
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" sx={{
                      fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {article.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.3 }}>
                      <Chip label={article.category} size="small" sx={{ fontSize: '0.6rem', height: 18 }} />
                      <Typography variant="caption" color="textSecondary">
                        by {article.author?.username || 'Unknown'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Recent Users */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1a1a2e' }}>
              👥 Recent Users
            </Typography>
            {loading ? (
              [1, 2, 3, 4, 5].map(i => <Skeleton key={i} height={52} sx={{ mb: 1 }} />)
            ) : data?.recentUsers?.length === 0 ? (
              <Typography color="textSecondary" variant="body2">No users yet.</Typography>
            ) : data?.recentUsers?.map(u => (
              <Box key={u.id}>
                <Box sx={{ display: 'flex', gap: 2, py: 1.5, alignItems: 'center' }}>
                  <Avatar sx={{
                    bgcolor: ROLE_COLOR[u.role] || '#6a11cb',
                    width: 40, height: 40, fontWeight: 700, fontSize: '0.95rem', flexShrink: 0
                  }}>
                    {u.username?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{u.username}</Typography>
                    <Typography variant="caption" color="textSecondary" sx={{
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block'
                    }}>
                      {u.email}
                    </Typography>
                  </Box>
                  <Chip
                    label={u.role}
                    size="small"
                    sx={{
                      bgcolor: ROLE_COLOR[u.role] + '20',
                      color: ROLE_COLOR[u.role],
                      fontWeight: 700, fontSize: '0.6rem', height: 20,
                      textTransform: 'capitalize', flexShrink: 0
                    }}
                  />
                </Box>
                <Divider />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
