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
  TextField,
  CircularProgress,
  InputAdornment,
  TablePagination,
  Avatar,
  Chip,
  MenuItem as MuiMenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  Tooltip,
  Rating,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Image as ImageIcon,
  Label as LabelIcon,
  Business as BusinessIcon,
  Star as StarIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

/* ── Category options ──────────────────────────────────── */
const CATEGORIES = [
  'Commercial',
  'Mixed-Use Development',
  'Luxury Residential',
  'Ultra Luxury',
  'Premium Residential',
  'Quality Excellence',
];

/* ── Empty form state ──────────────────────────────────── */
const EMPTY_FORM = {
  name: '',
  image: '',
  category: '',
  tagline: '',
  description: '',
  experienceYears: '',
  totalProjects: '',
  ongoingProjects: '',
  completedProjects: '',
  rating: '',
  reviewsCount: '',
  websiteUrl: '',
  operatingCities: '',
};

/* ── Category chip colour map ──────────────────────────── */
const CAT_COLORS = {
  'Commercial': '#1976d2',
  'Mixed-Use Development': '#7b1fa2',
  'Luxury Residential': '#388e3c',
  'Ultra Luxury': '#f57c00',
  'Premium Residential': '#c62828',
  'Quality Excellence': '#00838f',
};

const BrandManager = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  /* ── Fetch brands ──────────────────────────────────────── */
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/brands`, {
        params: { search: searchTerm, page: page + 1, limit: rowsPerPage },
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(response.data.brands);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching brands');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(fetchBrands, 400);
    return () => clearTimeout(delay);
  }, [searchTerm, page, rowsPerPage]);

  /* ── Pagination ────────────────────────────────────────── */
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRows = (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); };

  /* ── Toggle active/hidden ──────────────────────────────── */
  const handleToggleDelete = async (id, current) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_BASE_URL}/api/admin/brands/${id}/toggle-delete`,
        { isDeleted: !current },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Brand ${!current ? 'hidden' : 'activated'}`);
      fetchBrands();
    } catch {
      toast.error('Error updating status');
    }
  };

  /* ── Permanent delete ──────────────────────────────────── */
  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this brand?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/admin/brands/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Brand deleted');
      fetchBrands();
    } catch {
      toast.error('Error deleting brand');
    }
  };

  /* ── Open dialog ───────────────────────────────────────── */
  const handleOpen = (brand = null) => {
    if (brand) {
      setEditingId(brand.id);
      setFormData({
        name: brand.name || '',
        image: brand.image || '',
        category: brand.category || '',
        tagline: brand.tagline || '',
        description: brand.description || '',
        experienceYears: brand.experienceYears ?? '',
        totalProjects: brand.totalProjects ?? '',
        ongoingProjects: brand.ongoingProjects ?? '',
        completedProjects: brand.completedProjects ?? '',
        rating: brand.rating ?? '',
        reviewsCount: brand.reviewsCount ?? '',
        websiteUrl: brand.websiteUrl || '',
        operatingCities: brand.operatingCities || '',
      });
    } else {
      setEditingId(null);
      setFormData(EMPTY_FORM);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  /* ── Field change helper ───────────────────────────────── */
  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  /* ── Submit (create / update) ──────────────────────────── */
  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.image.trim()) {
      toast.error('Brand name and logo URL are required');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        experienceYears: formData.experienceYears !== '' ? Number(formData.experienceYears) : null,
        totalProjects: formData.totalProjects !== '' ? Number(formData.totalProjects) : null,
        ongoingProjects: formData.ongoingProjects !== '' ? Number(formData.ongoingProjects) : null,
        completedProjects: formData.completedProjects !== '' ? Number(formData.completedProjects) : null,
        rating: formData.rating !== '' ? Number(formData.rating) : null,
        reviewsCount: formData.reviewsCount !== '' ? Number(formData.reviewsCount) : null,
      };

      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/brands/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Brand updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/brands`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Brand added successfully');
      }
      handleClose();
      fetchBrands();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error saving brand');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── UI ────────────────────────────────────────────────── */
  return (
    <Box sx={{ p: 1 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Brand Manager</Typography>
          <Typography variant="body2" color="textSecondary">
            Manage developer brands shown on the Developer Lounge page
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: '#6a11cb', borderRadius: '10px', px: 3, py: 1, '&:hover': { bgcolor: '#2575fc' } }}
          onClick={() => handleOpen()}
        >
          Add New Brand
        </Button>
      </Box>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by brand name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, width: 80 }}>Logo</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Brand Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Experience</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Projects</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && brands.length === 0 ? (
              <TableRow><TableCell colSpan={8} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : brands.length === 0 ? (
              <TableRow><TableCell colSpan={8} align="center"><Typography sx={{ py: 4 }}>No brands found</Typography></TableCell></TableRow>
            ) : brands.map((item) => (
              <TableRow key={item.id} hover sx={{ opacity: item.isDeleted ? 0.5 : 1, transition: '0.2s' }}>

                {/* Logo */}
                <TableCell>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    variant="square"
                    sx={{ width: 80, height: 44, objectFit: 'contain', bgcolor: '#f5f5f5', borderRadius: 1 }}
                  >
                    <ImageIcon />
                  </Avatar>
                </TableCell>

                {/* Name + tagline */}
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{item.name}</Typography>
                  {item.tagline && (
                    <Typography variant="caption" color="text.secondary" fontStyle="italic">
                      {item.tagline}
                    </Typography>
                  )}
                </TableCell>

                {/* Category */}
                <TableCell>
                  {item.category && (
                    <Chip
                      label={item.category}
                      size="small"
                      sx={{
                        bgcolor: CAT_COLORS[item.category] || '#555',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.68rem',
                      }}
                    />
                  )}
                </TableCell>

                {/* Experience */}
                <TableCell>
                  <Typography variant="body2" fontWeight={700}>
                    {item.experienceYears != null ? `${item.experienceYears} yrs` : '—'}
                  </Typography>
                </TableCell>

                {/* Projects */}
                <TableCell>
                  <Typography variant="caption" display="block">
                    Total: <strong>{item.totalProjects ?? '—'}</strong>
                  </Typography>
                  <Typography variant="caption" display="block">
                    Active: <strong>{item.ongoingProjects ?? '—'}</strong>
                  </Typography>
                </TableCell>

                {/* Rating */}
                <TableCell>
                  {item.rating != null ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Rating value={Number(item.rating)} precision={0.1} readOnly size="small" />
                      <Typography variant="caption" color="text.secondary">
                        ({item.rating})
                      </Typography>
                    </Box>
                  ) : '—'}
                </TableCell>

                {/* Status toggle */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch
                      checked={!item.isDeleted}
                      onChange={() => handleToggleDelete(item.id, item.isDeleted)}
                      color="success"
                      size="small"
                    />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: !item.isDeleted ? 'success.main' : 'text.disabled' }}>
                      {!item.isDeleted ? 'Active' : 'Hidden'}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Actions */}
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleOpen(item)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete permanently">
                    <IconButton color="error" onClick={() => handleDelete(item.id)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
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
        onRowsPerPageChange={handleChangeRows}
      />

      {/* ── Add / Edit Dialog ─────────────────────────────── */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3, pb: 1 }}>
          {editingId ? '✏️ Edit Brand' : '➕ Add New Brand'}
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={2.5} sx={{ mt: 0.5 }}>

            {/* ── Section: Identity ── */}
            <Grid size={12}>
              <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1}>
                Brand Identity
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Brand Name *"
                value={formData.name}
                onChange={set('name')}
                InputProps={{ startAdornment: <InputAdornment position="start"><LabelIcon fontSize="small" /></InputAdornment> }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Category *</InputLabel>
                <Select value={formData.category} label="Category *" onChange={set('category')}>
                  {CATEGORIES.map(c => (
                    <MuiMenuItem key={c} value={c}>
                      <Chip label={c} size="small" sx={{ bgcolor: CAT_COLORS[c] || '#555', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }} />
                    </MuiMenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Tagline / Mission Statement"
                value={formData.tagline}
                onChange={set('tagline')}
                placeholder='e.g. "Building a Better Life"'
                InputProps={{ startAdornment: <InputAdornment position="start"><BusinessIcon fontSize="small" /></InputAdornment> }}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={formData.description}
                onChange={set('description')}
                placeholder="A short description of the brand and its values..."
                InputProps={{ startAdornment: <InputAdornment position="start"><DescriptionIcon fontSize="small" /></InputAdornment> }}
              />
            </Grid>

            {/* ── Section: Logo ── */}
            <Grid size={12}>
              <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1}>
                Logo &amp; Web Presence
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
            </Grid>

            <Grid size={{ xs: 12, sm: 8 }}>
              <TextField
                fullWidth
                label="Logo URL *"
                value={formData.image}
                onChange={set('image')}
                placeholder="https://... or /images/brands/brand.png"
                InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon fontSize="small" /></InputAdornment> }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              {formData.image && (
                <Box sx={{ p: 1.5, border: '1px dashed #ccc', borderRadius: 2, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>Preview</Typography>
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ maxHeight: 48, maxWidth: '100%' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </Box>
              )}
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Microsite / Website URL"
                value={formData.websiteUrl}
                onChange={set('websiteUrl')}
                placeholder="https://www.brandwebsite.com"
                InputProps={{ startAdornment: <InputAdornment position="start"><LinkIcon fontSize="small" /></InputAdornment> }}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Operating Cities"
                value={formData.operatingCities}
                onChange={set('operatingCities')}
                placeholder="Mumbai, Pune, Bangalore, NCR"
                InputProps={{ startAdornment: <InputAdornment position="start"><CategoryIcon fontSize="small" /></InputAdornment> }}
              />
            </Grid>

            {/* ── Section: Stats ── */}
            <Grid size={12}>
              <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1}>
                Statistics &amp; Metrics
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
            </Grid>

            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField
                fullWidth
                type="number"
                label="Experience (Years)"
                value={formData.experienceYears}
                onChange={set('experienceYears')}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField
                fullWidth
                type="number"
                label="Total Projects"
                value={formData.totalProjects}
                onChange={set('totalProjects')}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField
                fullWidth
                type="number"
                label="Active / Ongoing Projects"
                value={formData.ongoingProjects}
                onChange={set('ongoingProjects')}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField
                fullWidth
                type="number"
                label="Completed Projects"
                value={formData.completedProjects}
                onChange={set('completedProjects')}
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* ── Section: Ratings ── */}
            <Grid size={12}>
              <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1}>
                Rating
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Rating (0.0 – 5.0)"
                value={formData.rating}
                onChange={set('rating')}
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                helperText={
                  formData.rating !== '' ? (
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                      <Rating value={Number(formData.rating)} precision={0.1} readOnly size="small" />
                    </Box>
                  ) : null
                }
                InputProps={{ startAdornment: <InputAdornment position="start"><StarIcon fontSize="small" sx={{ color: '#f7c94b' }} /></InputAdornment> }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Reviews Count"
                value={formData.reviewsCount}
                onChange={set('reviewsCount')}
                inputProps={{ min: 0 }}
              />
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
            sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px', '&:hover': { bgcolor: '#2575fc' } }}
          >
            {submitting ? <CircularProgress size={20} color="inherit" /> : (editingId ? 'Update Brand' : 'Add Brand')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrandManager;
