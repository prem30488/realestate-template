'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amenity extends Model {
    static associate(models) {
      Amenity.belongsToMany(models.Property, {
        through: 'property_amenities',
        foreignKey: 'amenityId',
        otherKey: 'propertyId',
        as: 'properties'
      });
    }
  }
  Amenity.init({
    type: {
      type: DataTypes.ENUM('Indoor', 'Outdoor'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Amenity',
    tableName: 'amenities'
  });
  return Amenity;
};