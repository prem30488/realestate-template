'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class InteriorArticle extends Model {
        static associate(models) { }
    }
    InteriorArticle.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Interiors & Decor'
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        excerpt: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Editorial Team'
        },
        readTime: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '5 min read'
        },
        publishedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'InteriorArticle',
        tableName: 'interior_articles'
    });
    return InteriorArticle;
};
