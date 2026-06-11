const { MenuItem } = require('./models');

async function removeSellItems() {
    try {
        const deletedCount = await MenuItem.destroy({
            where: {
                title: ['Ad Packages', 'iAdvantage']
            }
        });
        console.log(`Successfully deleted ${deletedCount} menu items.`);
    } catch (error) {
        console.error("Error deleting menu items:", error);
    } finally {
        process.exit();
    }
}

removeSellItems();
