'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Brokers', 'city', {
            type: Sequelize.STRING,
            allowNull: true,
            after: 'instagram'
        });
    },
    async down(queryInterface) {
        await queryInterface.removeColumn('Brokers', 'city');
    }
};
