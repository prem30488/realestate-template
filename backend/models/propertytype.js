'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PropertyType extends Model {
    static associate(models) {
      PropertyType.hasMany(models.Property, {
        foreignKey: 'typeId',
        as: 'properties'
      });
    }
  }
  PropertyType.init({
    name: {
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
    modelName: 'PropertyType',
    tableName: 'property_types'
  });
  return PropertyType;
};