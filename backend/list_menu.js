const { MenuItem, sequelize } = require('./models');

async function listMenuItems() {
    try {
        const items = await MenuItem.findAll({
            where: { isDeleted: false },
            order: [['parentId', 'ASC'], ['order', 'ASC']]
        });

        console.log("Current Active Menu Items:");
        items.forEach(item => {
            console.log(`ID: ${item.id}, ParentID: ${item.parentId}, Title: ${item.title}, Link: ${item.link}`);
        });
    } catch (error) {
        console.error("Error listing menu items:", error);
    } finally {
        await sequelize.close();
    }
}

listMenuItems();
