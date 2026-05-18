import React, { useState } from 'react';
import {
  Box, Typography, Paper, List, ListItem, ListItemAvatar,
  ListItemText, Avatar, IconButton, Divider, Button, Chip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  LocalOffer as OfferIcon,
  Delete as DeleteIcon,
  DoneAll as DoneAllIcon
} from '@mui/icons-material';

const initialNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Property Approved',
    message: 'Your property "Luxury Villa in Gandhinagar" has been approved and is now live.',
    time: '2 hours ago',
    read: false,
    icon: <CheckCircleIcon />
  },
  {
    id: 2,
    type: 'info',
    title: 'New Message',
    message: 'You have received a new message from a potential buyer regarding your apartment.',
    time: '5 hours ago',
    read: false,
    icon: <InfoIcon />
  },
  {
    id: 3,
    type: 'offer',
    title: 'Special Offer',
    message: 'Upgrade to a premium account today and get 50% off on your first month!',
    time: '1 day ago',
    read: true,
    icon: <OfferIcon />
  },
  {
    id: 4,
    type: 'warning',
    title: 'Profile Incomplete',
    message: 'Please complete your profile by adding a phone number to increase trust with buyers.',
    time: '2 days ago',
    read: true,
    icon: <WarningIcon />
  }
];

const getIconColor = (type) => {
  switch (type) {
    case 'success': return '#4caf50';
    case 'info': return '#2196f3';
    case 'warning': return '#ff9800';
    case 'offer': return '#9c27b0';
    default: return '#757575';
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto', pb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e' }}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Chip
              label={`${unreadCount} New`}
              color="error"
              size="small"
              sx={{ fontWeight: 700 }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {unreadCount > 0 && (
            <Button
              startIcon={<DoneAllIcon />}
              onClick={handleMarkAllRead}
              sx={{ color: '#6a11cb', fontWeight: 600 }}
            >
              Mark all as read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              color="error"
              onClick={handleClearAll}
              sx={{ fontWeight: 600 }}
            >
              Clear all
            </Button>
          )}
        </Box>
      </Box>

      <Paper sx={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        {notifications.length === 0 ? (
          <Box sx={{ p: 6, textAlign: 'center', color: 'text.secondary' }}>
            <NotificationsIcon sx={{ fontSize: 60, opacity: 0.2, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>No notifications yet</Typography>
            <Typography variant="body2">When you get notifications, they'll show up here.</Typography>
          </Box>
        ) : (
          <List disablePadding>
            {notifications.map((notif, index) => (
              <React.Fragment key={notif.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    p: 3,
                    bgcolor: notif.read ? 'transparent' : '#f8f9fe',
                    transition: 'background-color 0.3s',
                    '&:hover': { bgcolor: '#f1f3f9' }
                  }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(notif.id)} size="small" sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar sx={{ mt: 0.5 }}>
                    <Avatar sx={{ bgcolor: `${getIconColor(notif.type)}15`, color: getIconColor(notif.type) }}>
                      {notif.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5, pr: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: notif.read ? 600 : 700, color: '#1a1a2e' }}>
                          {notif.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                          {notif.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: notif.read ? 'text.secondary' : '#334155', pr: 4 }}>
                        {notif.message}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default Notifications;
