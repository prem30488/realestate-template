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
  CircularProgress,
  Chip
} from '@mui/material';
import {
  KeyboardArrowUp as UpIcon,
  KeyboardArrowDown as DownIcon,
  RestartAlt as ResetIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

// Components that are layout shell (not inner page sections)
const SHELL_COMPONENTS = new Set(['Header', 'Footer', 'WhatsAppButton']);

const HomeManager = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComponents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/home-components`);
      setComponents(response.data);
    } catch (error) {
      toast.error('Error fetching components');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const handleToggleDeleted = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/admin/home-components/${id}/toggle-deleted`, {
        is_deleted: !currentStatus
      });
      toast.success('Status updated');
      fetchComponents();
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  const handleReorder = async (index, direction) => {
    const newComponents = [...components];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newComponents.length) return;

    [newComponents[index], newComponents[targetIndex]] = [newComponents[targetIndex], newComponents[index]];

    const updatedWithOrder = newComponents.map((comp, idx) => ({
      ...comp,
      order: idx + 1
    }));

    setComponents(updatedWithOrder);

    try {
      await axios.put(`${API_BASE_URL}/api/admin/home-components/reorder`, {
        components: updatedWithOrder.map(c => ({ id: c.id, order: c.order }))
      });
      toast.success('Order updated');
    } catch (error) {
      toast.error('Error updating order');
      fetchComponents();
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all components to default order and visibility?')) {
      try {
        await axios.post(`${API_BASE_URL}/api/admin/home-components/reset`);
        toast.success('Components reset to defaults');
        fetchComponents();
      } catch (error) {
        toast.error('Error resetting components');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Home Page Manager</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Control the order and visibility of all {components.length} page components.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="warning"
          startIcon={<ResetIcon />}
          onClick={handleReset}
          sx={{ borderRadius: 2 }}
        >
          Reset Components
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ width: 60, fontWeight: 700 }}>#</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Display Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Component</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Move</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Visible</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} sx={{ my: 2 }} />
                </TableCell>
              </TableRow>
            ) : components.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box sx={{ py: 3 }}>
                    <Typography gutterBottom>No components found.</Typography>
                    <Button variant="contained" onClick={handleReset}>Initialize Components</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ) : components.map((comp, index) => {
              const isShell = SHELL_COMPONENTS.has(comp.name);
              return (
                <TableRow
                  key={comp.id}
                  sx={{
                    opacity: comp.is_deleted ? 0.5 : 1,
                    bgcolor: isShell ? 'rgba(106,17,203,0.04)' : 'inherit',
                    transition: 'opacity 0.2s'
                  }}
                >
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>{index + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{comp.displayName}</TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: 'monospace', bgcolor: '#f0f0f0', px: 1, py: 0.4, borderRadius: 1 }}
                    >
                      {comp.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={isShell ? 'Shell' : 'Section'}
                      size="small"
                      color={isShell ? 'secondary' : 'default'}
                      variant={isShell ? 'filled' : 'outlined'}
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      disabled={index === 0}
                      onClick={() => handleReorder(index, -1)}
                      color="primary"
                    >
                      <UpIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      disabled={index === components.length - 1}
                      onClick={() => handleReorder(index, 1)}
                      color="primary"
                    >
                      <DownIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={!comp.is_deleted}
                      onChange={() => handleToggleDeleted(comp.id, comp.is_deleted)}
                      color="success"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HomeManager;
