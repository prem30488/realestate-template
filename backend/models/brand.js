'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      // associations can be defined here
    }
  }
  Brand.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tagline: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalProjects: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ongoingProjects: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    completedProjects: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    operatingCities: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    },
    reviewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    websiteUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};
