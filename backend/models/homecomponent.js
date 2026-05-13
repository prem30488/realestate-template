'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HomeComponent extends Model {
    static associate(models) {
      // define association here
    }
  }
  HomeComponent.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'HomeComponent',
  });
  return HomeComponent;
};
