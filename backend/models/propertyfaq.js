'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PropertyFaq extends Model {
    static associate(models) {
      PropertyFaq.belongsTo(models.Property, { foreignKey: 'propertyId', as: 'property' });
    }
  }
  PropertyFaq.init({
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'PropertyFaq',
    tableName: 'property_faqs'
  });
  return PropertyFaq;
};
