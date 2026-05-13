'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    static associate(models) {
      Testimonial.belongsTo(models.User, { as: 'author', foreignKey: 'posted_by' });
    }
  }
  Testimonial.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING
    },
    photo: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    posted_by: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Testimonial',
  });
  return Testimonial;
};
