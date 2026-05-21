'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Locality, {
        foreignKey: 'locality_id',
        as: 'locality',
        onDelete: 'CASCADE'
      });
      Project.belongsTo(models.PropertyType, {
        foreignKey: 'property_type_id',
        as: 'propertyType',
        onDelete: 'CASCADE'
      });
      Project.belongsTo(models.Builder, {
        foreignKey: 'builder_id',
        as: 'builder',
        onDelete: 'CASCADE'
      });
      Project.belongsTo(models.City, {
        foreignKey: 'city_id',
        as: 'city',
        onDelete: 'CASCADE'
      });
      Project.hasMany(models.Property, {
        foreignKey: 'project_id',
        as: 'properties'
      });
    }
  }

  Project.init({
    locality_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    property_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    builder_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    budget: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'India'
    },
    total_units: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    project_size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    launch_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_towers: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bhk: {
      type: DataTypes.STRING,
      allowNull: true
    },
    technical_information: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ratings: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
      defaultValue: 0.0
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'Projects'
  });

  return Project;
};
