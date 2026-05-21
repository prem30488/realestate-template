import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Switch, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Grid,
  CircularProgress, Avatar, TablePagination, Stepper, Step, StepLabel,
  MenuItem, FormControl, InputLabel, Select, FormControlLabel,
  InputAdornment, Autocomplete, Chip
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon,
  Phone as PhoneIcon, Email as EmailIcon, Business as BusinessIcon,
  LocationOn as LocationIcon, Star as StarIcon, Work as WorkIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const steps = [
  'Basic Identification',
  'Contact Information',
  'Business & Legal Details',
  'Specialization & Operations',
  'Performance & Portfolio',
  'System Metadata'
];

const companyTypeOptions = ['LLC', 'Corporation', 'Partnership', 'Sole Proprietorship', 'Private Limited', 'Public Limited', 'Other'];
const specialtyOptions = ['Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Mixed-Use'];
const statusOptions = ['Pending Verification', 'Active', 'Suspended', 'Inactive'];
const commonServices = ['New Construction', 'Remodeling', 'Renovation', 'Architecture', 'Interior Design', 'Landscaping', 'Roofing', 'Plumbing', 'Electrical', 'Civil Engineering'];

const BuilderManager = () => {
  const [builders, setBuilders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [activeStep, setActiveStep] = useState(0);
  const [citiesList, setCitiesList] = useState([]);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  
  const [formData, setFormData] = useState({
    company_name: '', owner_name: '', logo_url: '', description: '',
    email: '', phone_primary: '', phone_secondary: '', website_url: '',
    office_address: '', city: '', state: '', zip_code: '',
    license_number: '', tax_id: '', established_year: '', company_type: '', insurance_details: '',
    primary_specialty: '', services_offered: [], operating_regions: [],
    total_projects_completed: 0, active_projects: 0, average_rating: 0, total_reviews: 0, portfolio_link: '',
    status: 'Pending Verification', is_verified: false
  });

  const fetchBuilders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/builders`, {
        params: { search: searchTerm, page: page + 1, limit: rowsPerPage },
        headers: { Authorization: `Bearer ${token}` }
      });
      setBuilders(response.data.builders);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching builders:', error);
      toast.error(error.response?.data?.message || 'Error fetching builders');
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cities`);
      const data = await response.json();
      setCitiesList(data.map(c => c.name));
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBuilders();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this builder?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/admin/builders/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Builder deleted permanently');
        fetchBuilders();
      } catch (error) {
        toast.error('Error deleting builder');
      }
    }
  };

  const handleOpen = (builder = null) => {
    setActiveStep(0);
    if (builder) {
      setEditingId(builder.id);
      setFormData({
        company_name: builder.company_name || '', owner_name: builder.owner_name || '',
        logo_url: builder.logo_url || '', description: builder.description || '',
        email: builder.email || '', phone_primary: builder.phone_primary || '', phone_secondary: builder.phone_secondary || '',
        website_url: builder.website_url || '', office_address: builder.office_address || '',
        city: builder.city || '', state: builder.state || '', zip_code: builder.zip_code || '',
        license_number: builder.license_number || '', tax_id: builder.tax_id || '',
        established_year: builder.established_year || '', company_type: builder.company_type || '', insurance_details: builder.insurance_details || '',
        primary_specialty: builder.primary_specialty || '', 
        services_offered: Array.isArray(builder.services_offered) ? builder.services_offered : [], 
        operating_regions: Array.isArray(builder.operating_regions) ? builder.operating_regions : [],
        total_projects_completed: builder.total_projects_completed || 0, active_projects: builder.active_projects || 0, 
        average_rating: builder.average_rating || 0, total_reviews: builder.total_reviews || 0, portfolio_link: builder.portfolio_link || '',
        status: builder.status || 'Active', is_verified: builder.is_verified || false
      });
    } else {
      setEditingId(null);
      setFormData({
        company_name: '', owner_name: '', logo_url: '', description: '',
        email: '', phone_primary: '', phone_secondary: '', website_url: '',
        office_address: '', city: '', state: '', zip_code: '',
        license_number: '', tax_id: '', established_year: '', company_type: '', insurance_details: '',
        primary_specialty: '', services_offered: [], operating_regions: [],
        total_projects_completed: 0, active_projects: 0, average_rating: 0, total_reviews: 0, portfolio_link: '',
        status: 'Pending Verification', is_verified: false
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleNext = () => {
    // Basic validation before moving next
    if (activeStep === 0 && !formData.company_name) {
      toast.error('Company Name is required');
      return;
    }
    if (activeStep === 1 && (!formData.email || !formData.phone_primary || !formData.city)) {
      toast.error('Email, Primary Phone, and City are required');
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/builders/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Builder updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/builders`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Builder added successfully');
      }
      handleClose();
      fetchBuilders();
    } catch (error) {
      toast.error(error.response?.data?.message || `Error ${editingId ? 'updating' : 'adding'} builder`);
    }
  };

  const handleToggleVerified = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/admin/builders/${id}`, 
        { is_verified: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Builder verification updated`);
      fetchBuilders();
    } catch (error) {
      toast.error('Error updating verification');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Company Name" value={formData.company_name} onChange={(e) => setFormData({...formData, company_name: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Owner/CEO Name" value={formData.owner_name} onChange={(e) => setFormData({...formData, owner_name: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Logo URL" value={formData.logo_url} onChange={(e) => setFormData({...formData, logo_url: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={3} label="Company Description / Bio" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Primary Phone" value={formData.phone_primary} onChange={(e) => setFormData({...formData, phone_primary: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Secondary Phone" value={formData.phone_secondary} onChange={(e) => setFormData({...formData, phone_secondary: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Website URL" value={formData.website_url} onChange={(e) => setFormData({...formData, website_url: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Office Address" value={formData.office_address} onChange={(e) => setFormData({...formData, office_address: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={citiesList}
                value={formData.city || null}
                onChange={(event, newValue) => setFormData({...formData, city: newValue || ''})}
                renderInput={(params) => <TextField {...params} label="City" required fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="State/Province" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Zip/Postal Code" value={formData.zip_code} onChange={(e) => setFormData({...formData, zip_code: e.target.value})} />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="License Number" value={formData.license_number} onChange={(e) => setFormData({...formData, license_number: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Tax ID / GST Number" value={formData.tax_id} onChange={(e) => setFormData({...formData, tax_id: e.target.value})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth type="number" label="Established Year" value={formData.established_year} onChange={(e) => setFormData({...formData, established_year: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Company Type</InputLabel>
                <Select value={formData.company_type} label="Company Type" onChange={(e) => setFormData({...formData, company_type: e.target.value})}>
                  {companyTypeOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Insurance Details" value={formData.insurance_details} onChange={(e) => setFormData({...formData, insurance_details: e.target.value})} />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Primary Specialty</InputLabel>
                <Select value={formData.primary_specialty} label="Primary Specialty" onChange={(e) => setFormData({...formData, primary_specialty: e.target.value})}>
                  {specialtyOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={commonServices}
                value={formData.services_offered}
                onChange={(event, newValue) => setFormData({...formData, services_offered: newValue})}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Services Offered" placeholder="Add service and press Enter" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.operating_regions}
                onChange={(event, newValue) => setFormData({...formData, operating_regions: newValue})}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Operating Regions (Cities/Zip codes)" placeholder="Add region and press Enter" />
                )}
              />
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth type="number" label="Total Projects Completed" value={formData.total_projects_completed} onChange={(e) => setFormData({...formData, total_projects_completed: parseInt(e.target.value) || 0})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth type="number" label="Active Projects" value={formData.active_projects} onChange={(e) => setFormData({...formData, active_projects: parseInt(e.target.value) || 0})} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth type="number" label="Average Rating (0-5)" value={formData.average_rating} onChange={(e) => setFormData({...formData, average_rating: parseFloat(e.target.value) || 0})} inputProps={{ step: "0.1", min: "0", max: "5" }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth type="number" label="Total Reviews" value={formData.total_reviews} onChange={(e) => setFormData({...formData, total_reviews: parseInt(e.target.value) || 0})} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Portfolio Link (URL)" value={formData.portfolio_link} onChange={(e) => setFormData({...formData, portfolio_link: e.target.value})} />
            </Grid>
          </Grid>
        );
      case 5:
        return (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={formData.status} label="Status" onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={formData.is_verified} onChange={(e) => setFormData({...formData, is_verified: e.target.checked})} color="primary" />}
                label="Is Verified Builder?"
                sx={{ ml: 1, mt: 1 }}
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Builders Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage construction line builders and companies</Typography>
        </Box>
        <Button 
          variant="contained" startIcon={<AddIcon />} 
          sx={{ bgcolor: '#6a11cb', borderRadius: '10px', px: 3, py: 1, '&:hover': { bgcolor: '#2575fc' } }} 
          onClick={() => handleOpen()}
        >
          Add New Builder
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField fullWidth variant="outlined" placeholder="Search by company name, owner, email, or city..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} slotProps={{ input: { startAdornment: ( <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> ) } }} />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Builder</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Stats</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Verified</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && builders.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : builders.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center"><Typography sx={{ py: 4 }}>No builders found</Typography></TableCell></TableRow>
            ) : builders.map((builder) => (
              <TableRow key={builder.id} hover sx={{ transition: '0.2s' }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={builder.logo_url} alt={builder.company_name} sx={{ width: 45, height: 45, border: '2px solid #eee' }} variant="rounded">
                      <BusinessIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{builder.company_name}</Typography>
                      <Typography variant="caption" color="textSecondary">{builder.owner_name || 'No owner listed'}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 14, color: '#666' }} />
                      <Typography variant="caption">{builder.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 14, color: '#666' }} />
                      <Typography variant="caption">{builder.phone_primary}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon sx={{ fontSize: 14, color: '#666' }} />
                    <Typography variant="body2">{builder.city || 'N/A'}{builder.state ? `, ${builder.state}` : ''}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WorkIcon sx={{ fontSize: 14, color: '#666' }} />
                      <Typography variant="caption">{builder.total_projects_completed} completed</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ fontSize: 14, color: '#FFD700' }} />
                      <Typography variant="caption">{builder.average_rating} ({builder.total_reviews})</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch checked={builder.is_verified} onChange={() => handleToggleVerified(builder.id, builder.is_verified)} color="primary" size="small" />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: builder.is_verified ? 'primary.main' : 'text.disabled' }}>
                      {builder.is_verified ? 'Yes' : 'No'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(builder)} size="small"><EditIcon fontSize="small" /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(builder.id)} size="small"><DeleteIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={totalCount} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '15px', minHeight: '600px' } }}>
        <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3, pb: 1 }}>
          {editingId ? 'Edit Builder Information' : 'Add New Builder'}
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: '300px' }}>
            {renderStepContent(activeStep)}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Box>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px' }}>
                {editingId ? 'Update Builder' : 'Complete Registration'}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext} sx={{ px: 4, borderRadius: '8px' }}>
                Next Step
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BuilderManager;
