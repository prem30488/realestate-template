'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Builders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      owner_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      logo_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone_primary: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_secondary: {
        type: Sequelize.STRING,
        allowNull: true
      },
      website_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      office_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      zip_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      license_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tax_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      established_year: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      company_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      insurance_details: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      primary_specialty: {
        type: Sequelize.STRING,
        allowNull: true
      },
      services_offered: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      operating_regions: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      total_projects_completed: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      active_projects: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      average_rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
      },
      total_reviews: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      portfolio_link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending Verification'
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Builders');
  }
};
