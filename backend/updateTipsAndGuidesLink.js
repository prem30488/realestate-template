require('dotenv').config();
const { MenuItemRows } = require('./models');
// Wait, check model names in models/index.js
const models = require('./models');
const MenuItem = models.MenuItem;

async function updateLink() {
    try {
        const [updatedCount] = await MenuItem.update(
            { link: '/tips-and-guides' },
            { where: { title: 'Tips and Guides' } }
        );
        console.log(`Updated ${updatedCount} menu items.`);
        process.exit(0);
    } catch (error) {
        console.error('Error updating menu item:', error);
        process.exit(1);
    }
}

updateLink();
