'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.addColumn('Brokers', 'city', {
                type: Sequelize.STRING,
                allowNull: true,
                after: 'instagram'
            });
        } catch (error) {
            // Column already exists, skip
            if (error.message && error.message.includes('already exists')) {
                console.log('Column "city" already exists in Brokers table, skipping...');
            } else {
                throw error;
            }
        }
    },
    async down(queryInterface) {
        try {
            await queryInterface.removeColumn('Brokers', 'city');
        } catch (error) {
            // Column doesn't exist, skip
            console.log('Column "city" does not exist in Brokers table, skipping...');
        }
    }
};
