import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, CircularProgress, InputAdornment,
  TablePagination, Avatar, Chip, Select, MenuItem, FormControl, InputLabel,
  Switch, FormGroup, FormControlLabel, Checkbox, Tabs, Tab, Divider, Tooltip,
  Alert
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  Search as SearchIcon, Lock as LockIcon, LockOpen as LockOpenIcon,
  Key as KeyIcon, Shield as ShieldIcon, Person as PersonIcon,
  Email as EmailIcon, Phone as PhoneIcon, VpnKey as VpnKeyIcon,
  AdminPanelSettings as AdminIcon, CheckCircle as CheckIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const ALL_PRIVILEGES = [
  { key: 'Properties',   label: 'Properties Manager',  icon: '🏠' },
  { key: 'Home',         label: 'Home Manager',         icon: '🖥️' },
  { key: 'Menu',         label: 'Menu Manager',         icon: '📋' },
  { key: 'Slider',       label: 'Slider Manager',       icon: '🖼️' },
  { key: 'Search',       label: 'Search Manager',       icon: '🔍' },
  { key: 'Service',      label: 'Service Manager',      icon: '⚙️' },
  { key: 'FunFact',      label: 'Fun Facts Manager',    icon: '📊' },
  { key: 'Broker',       label: 'Broker Manager',       icon: '👔' },
  { key: 'Insta Video',  label: 'Insta Video Manager',  icon: '📱' },
  { key: 'News',         label: 'News Manager',         icon: '📰' },
  { key: 'Testimonials', label: 'Testimonials Manager', icon: '💬' },
  { key: 'Brand',        label: 'Brand Manager',        icon: '🏷️' },
  { key: 'Newsletter',   label: 'Newsletter Manager',   icon: '📧' },
  { key: 'FAQ',          label: 'FAQ Manager',          icon: '❓' },
  { key: 'Settings',     label: 'Settings Manager',     icon: '🔧' },
];

const ROLE_COLORS = {
  superadmin: 'error',
  admin: 'warning',
  user: 'default'
};

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
}

const UserManager = () => {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTab, setDialogTab] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [privilegeDialogOpen, setPrivilegeDialogOpen] = useState(false);
  const [privilegeUser, setPrivilegeUser] = useState(null);
  const [resetPasswordDialog, setResetPasswordDialog] = useState(false);
  const [resetPasswordUser, setResetPasswordUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const [formData, setFormData] = useState({
    username: '', email: '', password: '', role: 'user', phoneNumber: '', privileges: []
  });
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);

  // ─── Fetch ───────────────────────────────────────────────────────────────────
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/admin/users`, {
        params: { search: searchTerm, page: page + 1, limit: rowsPerPage },
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.users);
      setTotalCount(res.data.totalCount);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchUsers, 400);
    return () => clearTimeout(t);
  }, [searchTerm, page, rowsPerPage]);

  // ─── User CRUD ───────────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditingUser(null);
    setFormData({ username: '', email: '', password: '', role: 'user', phoneNumber: '', privileges: [] });
    setDialogTab(0);
    setDialogOpen(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username || '',
      email: user.email || '',
      password: '',
      role: user.role || 'user',
      phoneNumber: user.phoneNumber || '',
      privileges: user.privileges || []
    });
    setDialogTab(0);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email) {
      toast.error('Username and email are required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const payload = { ...formData };
      if (editingUser && !payload.password) delete payload.password;

      if (editingUser) {
        await axios.put(`${API_BASE_URL}/api/admin/users/${editingUser.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('User updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/users`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('User created successfully');
      }
      setDialogOpen(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error saving user');
    }
  };

  const handleDelete = async (user) => {
    if (user.id === currentUser.id) { toast.error('Cannot delete yourself'); return; }
    if (!window.confirm(`Permanently delete "${user.username}"?`)) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/admin/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User deleted');
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error deleting user');
    }
  };

  const handleToggleBlock = async (user) => {
    if (user.id === currentUser.id) { toast.error('Cannot block yourself'); return; }
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/api/admin/users/${user.id}/toggle-block`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`User ${user.isBlocked ? 'unblocked' : 'blocked'}`);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error updating block status');
    }
  };

  // ─── Privilege Management ────────────────────────────────────────────────────
  const openPrivilegeDialog = (user) => {
    setPrivilegeUser(user);
    setSelectedPrivileges(user.privileges || []);
    setPrivilegeDialogOpen(true);
  };

  const togglePrivilege = (key) => {
    setSelectedPrivileges(prev =>
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    );
  };

  const savePrivileges = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/api/admin/users/${privilegeUser.id}/privileges`,
        { privileges: selectedPrivileges },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Privileges updated successfully');
      setPrivilegeDialogOpen(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error updating privileges');
    }
  };

  // ─── Password Reset ──────────────────────────────────────────────────────────
  const openResetPassword = (user) => {
    setResetPasswordUser(user);
    setNewPassword('');
    setResetPasswordDialog(true);
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/api/admin/users/${resetPasswordUser.id}/reset-password`,
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Password reset successfully');
      setResetPasswordDialog(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error resetting password');
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ p: 1 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>User Manager</Typography>
          <Typography variant="body2" color="textSecondary">Manage users, roles and access privileges</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}
          sx={{ bgcolor: '#6a11cb', borderRadius: '10px', px: 3, py: 1, '&:hover': { bgcolor: '#2575fc' } }}
          onClick={openCreate}
        >
          Add New User
        </Button>
      </Box>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TextField fullWidth variant="outlined" placeholder="Search by username or email..."
          value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> } }}
        />
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Privileges</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && users.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={30} sx={{ my: 4 }} /></TableCell></TableRow>
            ) : users.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center"><Typography sx={{ py: 4 }}>No users found</Typography></TableCell></TableRow>
            ) : users.map((user) => (
              <TableRow key={user.id} hover sx={{ opacity: user.isBlocked ? 0.6 : 1 }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{
                      bgcolor: user.role === 'superadmin' ? '#c0392b' : user.role === 'admin' ? '#f39c12' : '#6a11cb',
                      width: 40, height: 40, fontWeight: 700
                    }}>
                      {user.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{user.username}</Typography>
                      <Typography variant="caption" color="textSecondary">{user.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={user.role} color={ROLE_COLORS[user.role]} size="small" sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
                </TableCell>
                <TableCell>
                  {user.role === 'superadmin' ? (
                    <Chip icon={<ShieldIcon />} label="Full Access" color="error" size="small" variant="outlined" />
                  ) : user.role === 'admin' && user.privileges?.length > 0 ? (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', maxWidth: 280 }}>
                      {user.privileges.slice(0, 3).map(p => (
                        <Chip key={p} label={p} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />
                      ))}
                      {user.privileges.length > 3 && (
                        <Chip label={`+${user.privileges.length - 3}`} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />
                      )}
                    </Box>
                  ) : (
                    <Typography variant="caption" color="textSecondary">—</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {user.isBlocked
                    ? <Chip label="Blocked" color="error" size="small" variant="outlined" />
                    : <Chip label="Active" color="success" size="small" variant="outlined" />
                  }
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit User">
                    <IconButton size="small" color="primary" onClick={() => openEdit(user)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {user.role === 'admin' && (
                    <Tooltip title="Manage Privileges">
                      <IconButton size="small" sx={{ color: '#f39c12' }} onClick={() => openPrivilegeDialog(user)}>
                        <KeyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Reset Password">
                    <IconButton size="small" sx={{ color: '#8e44ad' }} onClick={() => openResetPassword(user)}>
                      <VpnKeyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={user.isBlocked ? 'Unblock User' : 'Block User'}>
                    <IconButton size="small" color={user.isBlocked ? 'success' : 'warning'}
                      onClick={() => handleToggleBlock(user)}
                      disabled={user.id === currentUser.id}
                    >
                      {user.isBlocked ? <LockOpenIcon fontSize="small" /> : <LockIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <IconButton size="small" color="error" onClick={() => handleDelete(user)}
                      disabled={user.id === currentUser.id}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div"
        count={totalCount} rowsPerPage={rowsPerPage} page={page}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
      />

      {/* ─── Create/Edit User Dialog ─────────────────────────────────────── */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: '15px' } }}>
        <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AdminIcon sx={{ color: '#6a11cb' }} />
          {editingUser ? `Edit: ${editingUser.username}` : 'Create New User'}
        </DialogTitle>
        <Tabs value={dialogTab} onChange={(_, v) => setDialogTab(v)} sx={{ px: 3, borderBottom: '1px solid #eee' }}>
          <Tab label="Profile" />
          {editingUser && editingUser.role === 'admin' && <Tab label="Privileges" />}
        </Tabs>
        <DialogContent sx={{ px: 3 }}>
          <TabPanel value={dialogTab} index={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
              <TextField fullWidth label="Username" required value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment> } }}
              />
              <TextField fullWidth label="Email" required type="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment> } }}
              />
              {!editingUser && (
                <TextField fullWidth label="Password" type="password" value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  helperText="Leave blank to use default: Password@123"
                  slotProps={{ input: { startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment> } }}
                />
              )}
              <TextField fullWidth label="Phone Number" value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment> } }}
              />
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select value={formData.role} label="Role"
                  onChange={(e) => setFormData({ ...formData, role: e.target.value, privileges: [] })}>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="superadmin">Superadmin</MenuItem>
                </Select>
              </FormControl>
              {formData.role === 'admin' && (
                <Alert severity="info" icon={<ShieldIcon />}>
                  This user will be an Admin. Use the <strong>Privileges</strong> tab to configure their module access.
                </Alert>
              )}
            </Box>
          </TabPanel>
          {editingUser && editingUser.role === 'admin' && (
            <TabPanel value={dialogTab} index={1}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Select which modules this admin can access and manage:
              </Typography>
              <FormGroup>
                {ALL_PRIVILEGES.map((priv) => (
                  <FormControlLabel key={priv.key}
                    control={
                      <Checkbox
                        checked={formData.privileges?.includes(priv.key) || false}
                        onChange={() => {
                          const current = formData.privileges || [];
                          setFormData({
                            ...formData,
                            privileges: current.includes(priv.key)
                              ? current.filter(p => p !== priv.key)
                              : [...current, priv.key]
                          });
                        }}
                        sx={{ color: '#6a11cb', '&.Mui-checked': { color: '#6a11cb' } }}
                      />
                    }
                    label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{priv.icon}</span>
                      <Typography variant="body2">{priv.label}</Typography>
                    </Box>}
                  />
                ))}
              </FormGroup>
            </TabPanel>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}
            sx={{ bgcolor: '#6a11cb', px: 4, borderRadius: '8px', '&:hover': { bgcolor: '#2575fc' } }}>
            {editingUser ? 'Save Changes' : 'Create User'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ─── Privilege Management Dialog ─────────────────────────────────── */}
      <Dialog open={privilegeDialogOpen} onClose={() => setPrivilegeDialogOpen(false)}
        maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '15px' } }}>
        <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <KeyIcon sx={{ color: '#f39c12' }} />
          Privileges — {privilegeUser?.username}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Toggle module access for this admin:
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1, gap: 1 }}>
            <Button size="small" onClick={() => setSelectedPrivileges(ALL_PRIVILEGES.map(p => p.key))}>
              Select All
            </Button>
            <Button size="small" color="inherit" onClick={() => setSelectedPrivileges([])}>
              Clear All
            </Button>
          </Box>
          <FormGroup>
            {ALL_PRIVILEGES.map((priv) => (
              <FormControlLabel key={priv.key}
                control={
                  <Switch
                    checked={selectedPrivileges.includes(priv.key)}
                    onChange={() => togglePrivilege(priv.key)}
                    size="small"
                    sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6a11cb' } }}
                  />
                }
                label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{priv.icon}</span>
                  <Typography variant="body2">{priv.label}</Typography>
                  {selectedPrivileges.includes(priv.key) && <CheckIcon sx={{ fontSize: 14, color: 'success.main' }} />}
                </Box>}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setPrivilegeDialogOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={savePrivileges}
            sx={{ bgcolor: '#f39c12', px: 4, borderRadius: '8px', '&:hover': { bgcolor: '#e67e22' } }}>
            Save Privileges
          </Button>
        </DialogActions>
      </Dialog>

      {/* ─── Reset Password Dialog ───────────────────────────────────────── */}
      <Dialog open={resetPasswordDialog} onClose={() => setResetPasswordDialog(false)}
        maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '15px' } }}>
        <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <VpnKeyIcon sx={{ color: '#8e44ad' }} />
          Reset Password — {resetPasswordUser?.username}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <TextField fullWidth label="New Password" type="password" value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mt: 1 }}
            helperText="Minimum 6 characters"
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment> } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setResetPasswordDialog(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleResetPassword}
            sx={{ bgcolor: '#8e44ad', px: 4, borderRadius: '8px', '&:hover': { bgcolor: '#7d3c98' } }}>
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManager;
