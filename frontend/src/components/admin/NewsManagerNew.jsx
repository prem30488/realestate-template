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
  Grid,
  CircularProgress,
  Chip,
  InputAdornment,
  TablePagination,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Title as TitleIcon,
  Category as CategoryIcon,
  Description as DescIcon,
  Person as PersonIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    excerpt: '',
    content: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/admin/news`, {
        params: { 
          search: searchTerm,
          page: page + 1,
          limit: rowsPerPage
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setNews(response.data.news);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error(error.response?.data?.message || 'Error fetching news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchNews();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleDelete = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/api/admin/news/${id}/toggle-delete`, 
        { isDeleted: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`News ${!currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchNews();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this article?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/admin/news/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Article deleted permanently');
        fetchNews();
      } catch (error) {
        toast.error(error.response?.data?.error || 'Error deleting article');
      }
    }
  };

  const handleOpen = (article = null) => {
    console.log('Opening dialog...', article);
    if (article) {
      setEditingId(article.id);
      setFormData({
        title: article.title || '',
        category: article.category || '',
        image: article.image || '',
        excerpt: article.excerpt || '',
        content: article.content || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        category: '',
        image: '',
        excerpt: '',
        content: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.content) {
      toast.error('Required fields are missing');
      return;
    }

    const cleanData = {
      title: formData.title,
      category: formData.category,
      image: formData.image,
      excerpt: formData.excerpt,
      content: formData.content
    };

    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/admin/news/${editingId}`, cleanData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('News updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/news`, cleanData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('News added successfully');
      }
      handleClose();
      fetchNews();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.response?.data?.error || error.response?.data?.message || `Error ${editingId ? 'updating' : 'adding'} news`);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>News Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage blog posts and market insights</Typography>
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
          onClick={() => {
            handleOpen();
          }}
        >
          Add New Article
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            )
          }}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Article</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && news.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : news.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><Typography sx={{ py: 4 }}>No articles found</Typography></TableCell></TableRow>
            ) : news.map((article) => (
              <TableRow key={article.id} hover sx={{ transition: '0.2s', opacity: article.isDeleted ? 0.6 : 1 }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      src={article.image} 
                      alt={article.title}
                      variant="rounded"
                      sx={{ width: 50, height: 50, border: '1px solid #eee' }}
                    >
                      <ImageIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{article.title}</Typography>
                      <Typography variant="caption" color="textSecondary">{article.date}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={article.category} size="small" sx={{ fontWeight: 600 }} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="body2">{article.author?.username || 'Unknown'}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch 
                      checked={!article.isDeleted} 
                      onChange={() => handleToggleDelete(article.id, article.isDeleted)} 
                      color="success"
                      size="small"
                    />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: !article.isDeleted ? 'success.main' : 'text.disabled' }}>
                      {!article.isDeleted ? 'Active' : 'Hidden'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={(e) => { 
                    e.stopPropagation(); 
                    handleOpen(article); 
                  }} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={(e) => { e.stopPropagation(); console.log('Delete clicked', article.id); handleDelete(article.id); }} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
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
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '15px' } }}>
        <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3 }}>
          {editingId ? 'Edit Article' : 'Create New Article'}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid  xs={12} md={8}>
              <TextField 
                fullWidth 
                label="Article Title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><TitleIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid  xs={12} md={4}>
              <TextField 
                fullWidth 
                label="Category" 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})} 
                required
                placeholder="e.g. Recently Sold"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><CategoryIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid  xs={12}>
              <TextField 
                fullWidth 
                label="Image URL" 
                value={formData.image} 
                onChange={(e) => setFormData({...formData, image: e.target.value})} 
                placeholder="https://example.com/image.jpg"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><ImageIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid  xs={12}>
              <TextField 
                fullWidth 
                label="Excerpt" 
                multiline
                rows={2}
                value={formData.excerpt} 
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
                placeholder="A brief summary for the preview..."
                InputProps={{
                  startAdornment: <InputAdornment position="start"><DescIcon fontSize="small" /></InputAdornment>
                }}
              />
            </Grid>
            <Grid  xs={12}>
              <TextField 
                fullWidth 
                label="Content" 
                multiline
                rows={6}
                value={formData.content} 
                onChange={(e) => setFormData({...formData, content: e.target.value})} 
                required
                placeholder="Write your article here..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px' }}>
            {editingId ? 'Update Article' : 'Publish Article'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewsManager;
