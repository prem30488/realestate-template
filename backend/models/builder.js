'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Builder extends Model {
    static associate(models) {
      Builder.hasMany(models.Project, {
        foreignKey: 'builder_id',
        as: 'projects'
      });
    }
  }
  
  Builder.init({
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logo_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone_primary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_secondary: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    office_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    license_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tax_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    established_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    company_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    insurance_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    primary_specialty: {
      type: DataTypes.STRING,
      allowNull: true
    },
    services_offered: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    operating_regions: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    total_projects_completed: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    active_projects: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    average_rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    },
    total_reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    portfolio_link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending Verification'
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Builder',
  });
  
  return Builder;
};
