'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'property_types',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'India'
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('For Sale', 'For Rent'),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      area: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      no_of_bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      no_of_bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      posted_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      no_of_garage: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      furnishing_type: {
        type: Sequelize.STRING,
        defaultValue: 'none'
      },
      bachelor_friendly: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      availability: {
        type: Sequelize.STRING,
        defaultValue: 'Immediate'
      },
      family_friendly: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      live_in_friendly: {
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
    await queryInterface.dropTable('properties');
  }
};