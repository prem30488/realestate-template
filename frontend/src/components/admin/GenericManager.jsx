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
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../constants';

const GenericManager = ({ title, apiEndpoint, columns }) => {
  console.log('GenericManager rendered with title:', title);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/${apiEndpoint}`);
      setData(response.data);
    } catch (error) {
      toast.error(`Error fetching ${title}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiEndpoint]);

  const handleToggleDelete = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/admin/${apiEndpoint}/${id}/toggle-delete`, {
        isDeleted: !currentStatus
      });
      toast.success(`${title} ${!currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchData();
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>{title}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#6a11cb' }}>
          Add New
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8f9fa' }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.label}</TableCell>
              ))}
              <TableCell>Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={columns.length + 2} align="center"><CircularProgress size={24} sx={{ my: 2 }} /></TableCell></TableRow>
            ) : data.map((item) => (
              <TableRow key={item.id} sx={{ opacity: item.isDeleted ? 0.6 : 1 }}>
                {columns.map((col) => (
                  <TableCell key={col.field}>{item[col.field]}</TableCell>
                ))}
                <TableCell>
                  <Switch 
                    checked={!item.isDeleted} 
                    onChange={() => handleToggleDelete(item.id, item.isDeleted)} 
                    color="success"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" size="small"><EditIcon /></IconButton>
                  <IconButton color="error" size="small"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GenericManager;
