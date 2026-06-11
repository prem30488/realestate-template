require('dotenv').config();
const { MenuItem, sequelize } = require('./models');

async function updateInteriorMenuLink() {
    try {
        await sequelize.authenticate();
        console.log('DB connected...');

        // Find and update "Home Interior Design Services" menu item
        const item = await MenuItem.findOne({
            where: { title: 'Home Interior Design Services' }
        });

        if (item) {
            await item.update({ link: '/home-interiors' });
            console.log('✅ Updated "Home Interior Design Services" link to /home-interiors (id:', item.id, ')');
        } else {
            console.log('⚠️  Menu item "Home Interior Design Services" not found. Will be available after menu reset.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

updateInteriorMenuLink();
