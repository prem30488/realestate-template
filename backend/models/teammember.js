'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  TeamMember.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'TeamMember',
  });
  return TeamMember;
};
