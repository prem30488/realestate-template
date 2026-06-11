"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ChatMessages', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            conversationId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'ChatConversations', key: 'id' }, onDelete: 'CASCADE' },
            userId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'Users', key: 'id' }, onDelete: 'SET NULL' },
            sender: { type: Sequelize.ENUM('user', 'assistant'), allowNull: false },
            message: { type: Sequelize.TEXT, allowNull: false },
            meta: { type: Sequelize.JSONB, allowNull: true },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ChatMessages');
    }
};
