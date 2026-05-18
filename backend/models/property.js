'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      Property.belongsTo(models.PropertyType, {
        foreignKey: 'typeId',
        as: 'propertyType'
      });
      Property.belongsTo(models.User, {
        foreignKey: 'posted_by',
        as: 'owner'
      });
      Property.belongsToMany(models.Amenity, {
        through: 'property_amenities',
        foreignKey: 'propertyId',
        otherKey: 'amenityId',
        as: 'amenities'
      });
      Property.hasMany(models.PropertyImage, {
        foreignKey: 'propertyId',
        as: 'images'
      });
    }
  }
  Property.init({
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'property_types',
        key: 'id'
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'India'
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('For Sale', 'For Rent'),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Area in sqft'
    },
    no_of_bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    no_of_bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    posted_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    no_of_garage: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Property',
    tableName: 'properties'
  });
  return Property;
};