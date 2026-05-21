'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Localities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            postal_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            latitude: {
                type: Sequelize.DECIMAL(10, 8),
                allowNull: true
            },
            longitude: {
                type: Sequelize.DECIMAL(11, 8),
                allowNull: true
            },
            rating: {
                type: Sequelize.DECIMAL(3, 2),
                allowNull: true,
                defaultValue: 4.0
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
        await queryInterface.dropTable('Localities');
    }
};
