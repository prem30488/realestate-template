require('dotenv').config();
const { MenuItem, sequelize } = require('../models');

async function removePropworth() {
    try {
        console.log('Searching for Propworth menu items...');

        const propworthItems = await MenuItem.findAll({
            where: { title: 'Propworth' }
        });

        console.log(`Found ${propworthItems.length} Propworth item(s)`);

        if (propworthItems.length > 0) {
            for (const item of propworthItems) {
                await item.destroy();
                console.log(`✓ Deleted: ${item.title} (ID: ${item.id})`);
            }
            console.log('\n✓ All Propworth items removed successfully!');
        } else {
            console.log('No Propworth items found in database');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error removing Propworth:', error);
        process.exit(1);
    }
}

removePropworth();
