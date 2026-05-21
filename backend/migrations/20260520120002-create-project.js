'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      locality_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Localities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      property_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'property_types',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      builder_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Builders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      projectName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      budget: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'India'
      },
      total_units: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      project_size: {
        type: Sequelize.STRING,
        allowNull: true
      },
      launch_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      total_towers: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      bhk: {
        type: Sequelize.STRING,
        allowNull: true
      },
      technical_information: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ratings: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: 0.0
      },
      photo_url: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Projects');
  }
};
