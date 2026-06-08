'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LocalityReview extends Model {
        static associate(models) {
            LocalityReview.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            LocalityReview.belongsTo(models.Locality, { foreignKey: 'localityId', as: 'locality' });
        }
    }
    LocalityReview.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        localityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'LocalityReview',
        tableName: 'locality_reviews'
    });
    return LocalityReview;
};
