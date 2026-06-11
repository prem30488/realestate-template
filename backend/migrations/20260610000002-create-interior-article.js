'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('interior_articles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: true
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'Interiors & Decor'
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            excerpt: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            author: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 'Editorial Team'
            },
            readTime: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: '5 min read'
            },
            publishedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            isDeleted: {
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
        await queryInterface.dropTable('interior_articles');
    }
};
