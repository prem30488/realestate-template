'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class InteriorDesigner extends Model {
        static associate(models) { }
    }
    InteriorDesigner.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        coverImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specializations: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 4.0
        },
        reviewCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        yearsExperience: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        projectsCompleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        minBudget: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        maxBudget: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    }, {
        sequelize,
        modelName: 'InteriorDesigner',
        tableName: 'interior_designers'
    });
    return InteriorDesigner;
};
