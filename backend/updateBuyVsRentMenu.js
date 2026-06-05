const { MenuItem } = require('./models');

async function updateMenu() {
    try {
        const items = await MenuItem.findAll({
            where: { title: ['Buy vs Rent', 'Buy Vs Rent'] }
        });

        console.log(`Found ${items.length} items to update.`);

        for (const item of items) {
            item.link = '/buy-vs-rent';
            await item.save();
            console.log(`Updated: ${item.title}`);
        }

        console.log('Menu items updated successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error updating menu:', err);
        process.exit(1);
    }
}

updateMenu();
