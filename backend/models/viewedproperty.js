'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ViewedProperty extends Model {
    static associate(models) {
      ViewedProperty.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      ViewedProperty.belongsTo(models.Property, { foreignKey: 'propertyId', as: 'property' });
    }
  }
  ViewedProperty.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ViewedProperty',
    tableName: 'viewed_properties'
  });
  return ViewedProperty;
};
