import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, CircularProgress,
  TablePagination, Tabs, Tab, Checkbox, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  Email as EmailIcon, Send as SendIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
}

const NewsletterManager = () => {
  const [tab, setTab] = useState(0);

  // Subscribers state
  const [subscribers, setSubscribers] = useState([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);

  // Templates state
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templateForm, setTemplateForm] = useState({ name: '', subject: '', body: '' });

  // Send Email state
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [customBody, setCustomBody] = useState('');

  // Pagination for subscribers
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchSubscribers = async () => {
    setLoadingSubscribers(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/admin/newsletter/subscribers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscribers(res.data);
    } catch (err) {
      toast.error('Error fetching subscribers');
    } finally {
      setLoadingSubscribers(false);
    }
  };

  const fetchTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/admin/newsletter/templates`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTemplates(res.data);
    } catch (err) {
      toast.error('Error fetching templates');
    } finally {
      setLoadingTemplates(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
    fetchTemplates();
  }, []);

  // Subscribers logic
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedSubscribers(subscribers.map((s) => s.id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleSelectOne = (event, id) => {
    if (event.target.checked) {
      setSelectedSubscribers((prev) => [...prev, id]);
    } else {
      setSelectedSubscribers((prev) => prev.filter((item) => item !== id));
    }
  };

  // Templates logic
  const openCreateTemplate = () => {
    setEditingTemplate(null);
    setTemplateForm({ name: '', subject: '', body: '' });
    setTemplateDialogOpen(true);
  };

  const openEditTemplate = (template) => {
    setEditingTemplate(template);
    setTemplateForm({ name: template.name, subject: template.subject, body: template.body });
    setTemplateDialogOpen(true);
  };

  const handleSaveTemplate = async () => {
    if (!templateForm.name || !templateForm.subject || !templateForm.body) {
      toast.error('All fields are required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (editingTemplate) {
        await axios.put(`${API_BASE_URL}/api/admin/newsletter/templates/${editingTemplate.id}`, templateForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Template updated');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/newsletter/templates`, templateForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Template created');
      }
      setTemplateDialogOpen(false);
      fetchTemplates();
    } catch (err) {
      toast.error('Error saving template');
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/admin/newsletter/templates/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Template deleted');
      fetchTemplates();
    } catch (err) {
      toast.error('Error deleting template');
    }
  };

  // Send Email logic
  const openSendEmail = () => {
    if (selectedSubscribers.length === 0) {
      toast.error('Please select at least one subscriber');
      return;
    }
    setSelectedTemplateId('');
    setCustomSubject('');
    setCustomBody('');
    setSendDialogOpen(true);
  };

  const handleSendEmail = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/api/admin/newsletter/send`, {
        subscriberIds: selectedSubscribers,
        templateId: selectedTemplateId,
        customSubject,
        customBody
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Emails sent successfully (simulated)');
      setSendDialogOpen(false);
      setSelectedSubscribers([]);
    } catch (err) {
      toast.error('Error sending emails');
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>Newsletter Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage subscribers and send newsletters</Typography>
        </Box>
        <Box>
          <Button variant="contained" startIcon={<SendIcon />}
            sx={{ bgcolor: '#6a11cb', borderRadius: '10px', px: 3, py: 1, '&:hover': { bgcolor: '#2575fc' }, mr: 2 }}
            onClick={openSendEmail}
            disabled={selectedSubscribers.length === 0}
          >
            Send Email ({selectedSubscribers.length})
          </Button>
          {tab === 1 && (
            <Button variant="contained" startIcon={<AddIcon />}
              sx={{ bgcolor: '#27ae60', borderRadius: '10px', px: 3, py: 1, '&:hover': { bgcolor: '#2ecc71' } }}
              onClick={openCreateTemplate}
            >
              Add Template
            </Button>
          )}
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: '1px solid #eee', px: 2 }}>
          <Tab label="Subscribers" icon={<EmailIcon />} iconPosition="start" />
          <Tab label="Email Templates" />
        </Tabs>

        {/* Subscribers Tab */}
        <TabPanel value={tab} index={0}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selectedSubscribers.length > 0 && selectedSubscribers.length < subscribers.length}
                      checked={subscribers.length > 0 && selectedSubscribers.length === subscribers.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Email Address</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Subscribed On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingSubscribers ? (
                  <TableRow><TableCell colSpan={4} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
                ) : subscribers.length === 0 ? (
                  <TableRow><TableCell colSpan={4} align="center"><Typography sx={{ py: 4 }}>No subscribers yet</Typography></TableCell></TableRow>
                ) : (
                  subscribers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sub) => (
                    <TableRow key={sub.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={selectedSubscribers.includes(sub.id)}
                          onChange={(e) => handleSelectOne(e, sub.id)}
                        />
                      </TableCell>
                      <TableCell>{sub.email}</TableCell>
                      <TableCell>{sub.isActive ? 'Active' : 'Unsubscribed'}</TableCell>
                      <TableCell>{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination rowsPerPageOptions={[10, 25, 50]} component="div"
            count={subscribers.length} rowsPerPage={rowsPerPage} page={page}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          />
        </TabPanel>

        {/* Templates Tab */}
        <TabPanel value={tab} index={1}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Subject</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingTemplates ? (
                  <TableRow><TableCell colSpan={3} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
                ) : templates.length === 0 ? (
                  <TableRow><TableCell colSpan={3} align="center"><Typography sx={{ py: 4 }}>No templates found</Typography></TableCell></TableRow>
                ) : (
                  templates.map((tpl) => (
                    <TableRow key={tpl.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{tpl.name}</TableCell>
                      <TableCell>{tpl.subject}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="primary" onClick={() => openEditTemplate(tpl)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDeleteTemplate(tpl.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      {/* Template Dialog */}
      <Dialog open={templateDialogOpen} onClose={() => setTemplateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingTemplate ? 'Edit Template' : 'Create Template'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Template Name" required fullWidth value={templateForm.name}
            onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })} />
          <TextField label="Email Subject" required fullWidth value={templateForm.subject}
            onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })} />
          <TextField label="Email Body (HTML allowed)" required fullWidth multiline rows={8} value={templateForm.body}
            onChange={(e) => setTemplateForm({ ...templateForm, body: e.target.value })} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setTemplateDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveTemplate}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Send Email Dialog */}
      <Dialog open={sendDialogOpen} onClose={() => setSendDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Sending to {selectedSubscribers.length} selected subscriber(s).
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Select Template (Optional)</InputLabel>
            <Select value={selectedTemplateId} label="Select Template (Optional)"
              onChange={(e) => {
                const val = e.target.value;
                setSelectedTemplateId(val);
                if (val) {
                  const tpl = templates.find(t => t.id === val);
                  if (tpl) {
                    setCustomSubject(tpl.subject);
                    setCustomBody(tpl.body);
                  }
                }
              }}>
              <MenuItem value=""><em>None (Custom Email)</em></MenuItem>
              {templates.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Subject" required fullWidth value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)} />
          <TextField label="Body (HTML allowed)" required fullWidth multiline rows={6} value={customBody}
            onChange={(e) => setCustomBody(e.target.value)} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setSendDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSendEmail}>Send Now</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewsletterManager;
