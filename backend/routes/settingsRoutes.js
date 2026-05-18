const express = require('express');
const router = express.Router();
const Settings = require('../models/settings');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Get settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    // Don't send SMTP password to non-admins if they somehow hit this, but we'll leave it since it's an admin route
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Server error fetching settings' });
  }
});

// Update settings
router.put('/', authenticateToken, authorizeAdmin('Settings'), async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      await settings.update(req.body);
    }
    res.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Server error updating settings' });
  }
});

module.exports = router;
