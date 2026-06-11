// delete_home_loans_menu.js
// Soft-deletes the "Home Loans" top-level menu item (and any children) from the live DB.
const { MenuItem, sequelize } = require('./models');

async function run() {
    try {
        // find the top-level Home Loans nav item
        const item = await MenuItem.findOne({
            where: { title: 'Home Loans', parentId: null, isDeleted: false }
        });

        if (!item) {
            console.log('No active "Home Loans" menu item found — nothing to do.');
            return;
        }

        console.log(`Found: ID=${item.id}  title="${item.title}"  order=${item.order}`);

        // soft-delete it and any children
        const [childCount] = await MenuItem.update(
            { isDeleted: true },
            { where: { parentId: item.id, isDeleted: false } }
        );
        await item.update({ isDeleted: true });

        console.log(`Done. Soft-deleted 1 parent + ${childCount} child(ren).`);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await sequelize.close();
    }
}

run();
