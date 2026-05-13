import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Button, Paper, Chip, IconButton,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Select, MenuItem as MuiMenuItem, FormControl, InputLabel,
  Tooltip, Collapse, Divider, Stack, CircularProgress, Alert, InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  RestartAlt as ResetIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  DragIndicator as DragIcon,
  Visibility as VisibleIcon,
  VisibilityOff as HiddenIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API = 'http://localhost:3000/api/admin/menu';

const BADGE_COLORS = { NEW: 'success', FREE: 'warning', ADMIN: 'error', null: 'default' };
const TYPE_COLORS  = { nav: 'primary', section: 'secondary', link: 'default' };

// ─── Add/Edit Dialog ────────────────────────────────────────────────────────
function ItemDialog({ open, onClose, onSave, initial, parentOptions }) {
  const [form, setForm] = useState({ title: '', link: '#', itemType: 'link', menuType: '', badge: '', parentId: '' });

  useEffect(() => {
    if (initial) {
      setForm({
        title:    initial.title    || '',
        link:     initial.link     || '#',
        itemType: initial.itemType || 'link',
        menuType: initial.menuType || '',
        badge:    initial.badge    || '',
        parentId: initial.parentId != null ? String(initial.parentId) : ''
      });
    } else {
      setForm({ title: '', link: '#', itemType: 'link', menuType: '', badge: '', parentId: '' });
    }
  }, [initial, open]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    onSave({
      ...form,
      parentId: form.parentId ? Number(form.parentId) : null,
      menuType: form.menuType || null,
      badge:    form.badge || null
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {initial?.id ? 'Edit Menu Item' : 'Add Menu Item'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title" fullWidth value={form.title}
            onChange={e => set('title', e.target.value)}
            helperText="Use {city} as placeholder for dynamic city name"
          />
          <TextField
            label="Link / URL" fullWidth value={form.link}
            onChange={e => set('link', e.target.value)}
            InputProps={{ 
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              )
            }}
          />
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Item Type</InputLabel>
              <Select value={form.itemType} label="Item Type" onChange={e => set('itemType', e.target.value)}>
                <MuiMenuItem value="nav">Nav (top-level)</MuiMenuItem>
                <MuiMenuItem value="section">Section heading</MuiMenuItem>
                <MuiMenuItem value="link">Link</MuiMenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Menu Type</InputLabel>
              <Select value={form.menuType} label="Menu Type" onChange={e => set('menuType', e.target.value)}>
                <MuiMenuItem value="">None</MuiMenuItem>
                <MuiMenuItem value="mega">Mega menu</MuiMenuItem>
                <MuiMenuItem value="sub">Sub menu</MuiMenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Badge</InputLabel>
              <Select value={form.badge} label="Badge" onChange={e => set('badge', e.target.value)}>
                <MuiMenuItem value="">None</MuiMenuItem>
                <MuiMenuItem value="NEW">NEW</MuiMenuItem>
                <MuiMenuItem value="FREE">FREE</MuiMenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Parent</InputLabel>
              <Select value={form.parentId} label="Parent" onChange={e => set('parentId', e.target.value)}>
                <MuiMenuItem value="">None (top-level)</MuiMenuItem>
                {parentOptions.map(p => (
                  <MuiMenuItem key={p.id} value={String(p.id)}>{p.label}</MuiMenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Single Item Row (recursive) ────────────────────────────────────────────
function MenuItemRow({ item, index, depth, allItems, onEdit, onDelete, onToggle, onAddChild, onDragEnd }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = item.children && item.children.length > 0;
  const indent = depth * 24;

  const bgColor = item.isDeleted
    ? 'rgba(0,0,0,0.03)'
    : depth === 0 ? '#f0f4ff'
    : depth === 1 ? '#f8faff'
    : 'white';

  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{ mb: 0.5 }}
        >
          {/* Row */}
          <Paper
            elevation={snapshot.isDragging ? 4 : 0}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              px: 1.5, py: 0.75,
              ml: `${indent}px`,
              bgcolor: bgColor,
              opacity: item.isDeleted ? 0.55 : 1,
              border: '1px solid',
              borderColor: snapshot.isDragging ? 'primary.main' : 'divider',
              borderRadius: 1.5,
              transition: 'all 0.15s',
            }}
          >
            {/* Drag handle */}
            <Box {...provided.dragHandleProps} sx={{ color: 'text.disabled', cursor: 'grab', display: 'flex' }}>
              <DragIcon fontSize="small" />
            </Box>

            {/* Expand toggle */}
            {hasChildren ? (
              <IconButton size="small" onClick={() => setExpanded(e => !e)} sx={{ p: 0.25 }}>
                {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
              </IconButton>
            ) : (
              <Box sx={{ width: 24 }} />
            )}

            {/* Title */}
            <Typography
              variant="body2"
              sx={{
                flexGrow: 1, fontWeight: depth === 0 ? 700 : depth === 1 ? 600 : 400,
                textDecoration: item.isDeleted ? 'line-through' : 'none',
                color: item.isDeleted ? 'text.disabled' : 'text.primary'
              }}
            >
              {item.title}
            </Typography>

            {/* Link */}
            {item.link && item.link !== '#' && (
              <Typography variant="caption" color="text.disabled" sx={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.link}
              </Typography>
            )}

            {/* Chips */}
            <Chip label={item.itemType} size="small" color={TYPE_COLORS[item.itemType] || 'default'} variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
            {item.menuType && <Chip label={item.menuType} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />}
            {item.badge && <Chip label={item.badge} size="small" color={BADGE_COLORS[item.badge] || 'default'} sx={{ fontSize: '0.65rem', height: 20 }} />}

            {/* Actions */}
            <Tooltip title="Add child item">
              <IconButton size="small" onClick={() => onAddChild(item)} color="primary"><AddIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit(item)}><EditIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title={item.isDeleted ? 'Restore' : 'Hide'}>
              <IconButton size="small" onClick={() => onToggle(item)} color={item.isDeleted ? 'success' : 'default'}>
                {item.isDeleted ? <VisibleIcon fontSize="small" /> : <HiddenIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete permanently">
              <IconButton size="small" onClick={() => onDelete(item)} color="error"><DeleteIcon fontSize="small" /></IconButton>
            </Tooltip>
          </Paper>

          {/* Children */}
          {hasChildren && expanded && (
            <Collapse in={expanded}>
              <Droppable droppableId={`children-${item.id}`} type={`level-${depth + 1}`}>
                {(childProvided) => (
                  <Box ref={childProvided.innerRef} {...childProvided.droppableProps} sx={{ mt: 0.5 }}>
                    {item.children.map((child, cidx) => (
                      <MenuItemRow
                        key={child.id}
                        item={child}
                        index={cidx}
                        depth={depth + 1}
                        allItems={allItems}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        onAddChild={onAddChild}
                        onDragEnd={onDragEnd}
                      />
                    ))}
                    {childProvided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Collapse>
          )}
        </Box>
      )}
    </Draggable>
  );
}

// ─── Main MenuManager ────────────────────────────────────────────────────────
export default function MenuManager() {
  const [tree, setTree]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem]   = useState(null);       // null = add new
  const [addParent, setAddParent] = useState(null);       // pre-filled parent

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API);
      setTree(data);
    } catch {
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMenu(); }, [fetchMenu]);

  // Flatten tree for parent selector dropdown
  const flattenForSelect = (items, depth = 0) => {
    const result = [];
    for (const item of items) {
      result.push({ id: item.id, label: '  '.repeat(depth) + item.title });
      if (item.children?.length) result.push(...flattenForSelect(item.children, depth + 1));
    }
    return result;
  };
  const parentOptions = flattenForSelect(tree);

  const handleSave = async (formData) => {
    try {
      if (editItem?.id) {
        await axios.put(`${API}/${editItem.id}`, formData);
        toast.success('Item updated');
      } else {
        await axios.post(API, { ...formData, parentId: addParent?.id || formData.parentId || null });
        toast.success('Item added');
      }
      setDialogOpen(false);
      setEditItem(null);
      setAddParent(null);
      fetchMenu();
    } catch {
      toast.error('Save failed');
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setAddParent(null);
    setDialogOpen(true);
  };

  const handleAddChild = (parent) => {
    setEditItem(null);
    setAddParent(parent);
    setDialogOpen(true);
  };

  const handleAddTop = () => {
    setEditItem(null);
    setAddParent(null);
    setDialogOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Permanently delete "${item.title}" and all its children?`)) return;
    try {
      await axios.delete(`${API}/${item.id}`);
      toast.success('Deleted');
      fetchMenu();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleToggle = async (item) => {
    try {
      await axios.patch(`${API}/${item.id}/toggle-delete`);
      toast.success(item.isDeleted ? 'Restored' : 'Hidden');
      fetchMenu();
    } catch {
      toast.error('Toggle failed');
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset the entire menu to default? This cannot be undone.')) return;
    try {
      await axios.post(`${API}/reset`);
      toast.success('Menu reset to default');
      fetchMenu();
    } catch {
      toast.error('Reset failed');
    }
  };

  // Drag and drop reorder within a Droppable list
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Helper to find and update list in tree
    const updateOrder = (items, droppableId, sourceIdx, destIdx) => {
      const isRoot = droppableId === 'root-menu';
      if (isRoot) {
        const updated = [...items];
        const [moved] = updated.splice(sourceIdx, 1);
        updated.splice(destIdx, 0, moved);
        return updated.map((it, i) => ({ ...it, order: i + 1 }));
      }
      // Find parent by droppableId = 'children-{parentId}'
      const parentId = Number(droppableId.replace('children-', ''));
      return items.map(item => {
        if (item.id === parentId && item.children) {
          const updated = [...item.children];
          const [moved] = updated.splice(sourceIdx, 1);
          updated.splice(destIdx, 0, moved);
          return { ...item, children: updated.map((c, i) => ({ ...c, order: i + 1 })) };
        }
        if (item.children?.length) {
          return { ...item, children: updateOrder(item.children, droppableId, sourceIdx, destIdx) };
        }
        return item;
      });
    };

    // Optimistic update
    const newTree = updateOrder(tree, source.droppableId, source.index, destination.index);
    setTree(newTree);

    // Persist reorder
    const getUpdatedItems = (items, droppableId) => {
      if (droppableId === 'root-menu') return items.map((it, i) => ({ id: it.id, order: i + 1 }));
      const parentId = Number(droppableId.replace('children-', ''));
      for (const item of items) {
        if (item.id === parentId) return (item.children || []).map((c, i) => ({ id: c.id, order: i + 1 }));
        if (item.children?.length) {
          const r = getUpdatedItems(item.children, droppableId);
          if (r) return r;
        }
      }
      return null;
    };

    const reorderPayload = getUpdatedItems(newTree, source.droppableId);
    if (reorderPayload) {
      try {
        await axios.put(`${API}/reorder`, { items: reorderPayload });
      } catch {
        toast.error('Reorder save failed');
        fetchMenu();
      }
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Menu Manager</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Drag to reorder · Click ✎ to edit title/link · Toggle visibility · Add children
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddTop} sx={{ bgcolor: '#6a11cb' }}>
            Add Nav Item
          </Button>
          <Button variant="outlined" color="warning" startIcon={<ResetIcon />} onClick={handleReset}>
            Reset Default
          </Button>
        </Stack>
      </Box>

      {/* Legend */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip label="nav" size="small" color="primary" variant="outlined" />
        <Chip label="section" size="small" color="secondary" variant="outlined" />
        <Chip label="link" size="small" variant="outlined" />
        <Chip label="mega / sub" size="small" variant="outlined" />
        <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
          — Drag rows to reorder. Grey = hidden from live site.
        </Typography>
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
      ) : tree.length === 0 ? (
        <Alert severity="info" action={<Button onClick={handleReset}>Initialize Default Menu</Button>}>
          No menu items found.
        </Alert>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="root-menu" type="level-0">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {tree.map((item, index) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    index={index}
                    depth={0}
                    allItems={tree}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                    onAddChild={handleAddChild}
                    onDragEnd={handleDragEnd}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Add/Edit Dialog */}
      <ItemDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditItem(null); setAddParent(null); }}
        onSave={handleSave}
        initial={editItem ?? (addParent ? { parentId: addParent.id, itemType: 'link' } : null)}
        parentOptions={parentOptions}
      />
    </Box>
  );
}
