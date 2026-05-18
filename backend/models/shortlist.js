'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shortlist extends Model {
    static associate(models) {
      Shortlist.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Shortlist.belongsTo(models.Property, { foreignKey: 'propertyId', as: 'property' });
    }
  }
  Shortlist.init({
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
    modelName: 'Shortlist',
    tableName: 'shortlists'
  });
  return Shortlist;
};
