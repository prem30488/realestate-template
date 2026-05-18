'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    static associate(models) {
      // define association here
    }
  }
  Settings.init({
    siteName: { type: DataTypes.STRING, defaultValue: 'Real Estate Platform' },
    siteDescription: { type: DataTypes.TEXT, defaultValue: 'Find your dream home with us.' },
    contactEmail: { type: DataTypes.STRING, defaultValue: 'contact@realestate.com' },
    contactPhone: { type: DataTypes.STRING, defaultValue: '+1 234 567 8900' },
    address: { type: DataTypes.TEXT, defaultValue: '123 Real Estate Blvd, City, Country' },
    facebook: { type: DataTypes.STRING, defaultValue: 'https://facebook.com' },
    twitter: { type: DataTypes.STRING, defaultValue: 'https://twitter.com' },
    instagram: { type: DataTypes.STRING, defaultValue: 'https://instagram.com' },
    linkedin: { type: DataTypes.STRING, defaultValue: 'https://linkedin.com' },
    maintenanceMode: { type: DataTypes.BOOLEAN, defaultValue: false },
    userRegistration: { type: DataTypes.BOOLEAN, defaultValue: true },
    smtpHost: { type: DataTypes.STRING, defaultValue: 'smtp.example.com' },
    smtpPort: { type: DataTypes.STRING, defaultValue: '587' },
    smtpUser: { type: DataTypes.STRING, defaultValue: 'apikey' },
    smtpPassword: { type: DataTypes.STRING, defaultValue: 'password123' },
    googleAnalyticsId: { type: DataTypes.STRING, defaultValue: 'G-XXXXXXX' },
    currency: { type: DataTypes.STRING, defaultValue: 'USD' },
    app_theme: { type: DataTypes.STRING, defaultValue: 'Default' }
  }, {
    sequelize,
    modelName: 'Settings',
  });
  return Settings;
};
