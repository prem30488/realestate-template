module.exports = (sequelize, DataTypes) => {
    const ChatMessage = sequelize.define('ChatMessage', {
        conversationId: { type: DataTypes.INTEGER, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: true },
        sender: { type: DataTypes.ENUM('user', 'assistant'), allowNull: false },
        message: { type: DataTypes.TEXT, allowNull: false },
        meta: { type: DataTypes.JSONB, allowNull: true }
    }, {
        tableName: 'ChatMessages'
    });

    ChatMessage.associate = function (models) {
        ChatMessage.belongsTo(models.ChatConversation, { as: 'conversation', foreignKey: 'conversationId' });
        ChatMessage.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    };

    return ChatMessage;
};
