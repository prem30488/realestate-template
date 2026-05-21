'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Locality extends Model {
        static associate(models) {
            Locality.belongsTo(models.City, {
                foreignKey: 'city_id',
                as: 'city'
            });
        }
    }
    Locality.init({
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Cities',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: true
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Locality',
    });
    return Locality;
};
