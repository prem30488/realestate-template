import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  MenuOpen as MenuOpenIcon,
  ViewCarousel as SliderIcon,
  Search as SearchIcon,
  Business as PropertyIcon,
  DesignServices as ServiceIcon,
  Assessment as FunFactIcon,
  People as BrokerIcon,
  Instagram as InstaIcon,
  Newspaper as NewsIcon,
  Comment as TestimonialIcon,
  BrandingWatermark as BrandIcon,
  AdminPanelSettings as AdminIcon,
  Email as NewsletterIcon,
  QuestionAnswer as FaqIcon,
  ExitToApp as LogoutIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const drawerWidth = 260;

const AdminLayout = ({ user, onLogout }) => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    onLogout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Home Manager', icon: <HomeIcon />, path: '/admin/home' },
    { text: 'Menu Manager', icon: <MenuOpenIcon />, path: '/admin/menu' },
    { text: 'Slider Manager', icon: <SliderIcon />, path: '/admin/slider' },
    { text: 'Search Manager', icon: <SearchIcon />, path: '/admin/search' },
    { text: 'Properties Manager', icon: <PropertyIcon />, path: '/admin/properties' },
    { text: 'Service Manager', icon: <ServiceIcon />, path: '/admin/services' },
    { text: 'FunFact Manager', icon: <FunFactIcon />, path: '/admin/funfacts' },
    { text: 'Broker Manager', icon: <BrokerIcon />, path: '/admin/brokers' },
    { text: 'Insta Video Manager', icon: <InstaIcon />, path: '/admin/insta' },
    { text: 'News Manager', icon: <NewsIcon />, path: '/admin/news-manager' },
    { text: 'Testimonials Manager', icon: <TestimonialIcon />, path: '/admin/testimonials' },
    { text: 'Brand Manager', icon: <BrandIcon />, path: '/admin/brands' },
    { text: 'Newsletter Manager', icon: <NewsletterIcon />, path: '/admin/newsletter' },
    { text: 'FAQ Manager', icon: <FaqIcon />, path: '/admin/faqs' },
    { text: 'Privilege/User Manager', icon: <AdminIcon />, path: '/admin/users' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
  ];

  // Filter menu items based on privileges if not superadmin
  const allowedMenuItems = user?.role === 'superadmin' 
    ? menuItems 
    : menuItems.filter(item => {
        if (item.path === '/admin') return true;
        // Privilege/User Manager is superadmin only — never show to plain admins
        if (item.path === '/admin/users') return false;
        const privilegeKey = item.text.replace(' Manager', '').trim();
        return user?.privileges?.includes(privilegeKey);
      });

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f5f7', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme) => theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
          bgcolor: 'white',
          color: '#333',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ marginRight: 5 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Admin Control Panel
          </Typography>
          
          <Tooltip title="Account settings">
            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: '#6a11cb' }}>{user?.username?.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem disabled>
              <Typography variant="body2">{user?.email}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate('/profile')}>
              <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              transition: (theme) => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
              bgcolor: '#1a1a2e',
              color: 'white'
            },
          }),
          ...(!open && {
            '& .MuiDrawer-paper': {
              transition: (theme) => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              overflowX: 'hidden',
              width: (theme) => theme.spacing(7),
              bgcolor: '#1a1a2e',
              color: 'white'
            },
          }),
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {allowedMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: location.pathname === item.path ? '#a29bfe' : 'rgba(255,255,255,0.7)'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{ 
                      opacity: open ? 1 : 0,
                      '& .MuiTypography-root': {
                        fontWeight: location.pathname === item.path ? 700 : 400,
                        fontSize: '0.9rem'
                      }
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
