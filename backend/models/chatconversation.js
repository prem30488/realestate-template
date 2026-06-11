module.exports = (sequelize, DataTypes) => {
    const ChatConversation = sequelize.define('ChatConversation', {
        title: { type: DataTypes.STRING, allowNull: true },
        userId: { type: DataTypes.INTEGER, allowNull: true }
    }, {
        tableName: 'ChatConversations'
    });

    ChatConversation.associate = function (models) {
        ChatConversation.hasMany(models.ChatMessage, { as: 'messages', foreignKey: 'conversationId' });
    };

    return ChatConversation;
};
