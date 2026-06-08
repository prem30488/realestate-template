const { MenuItem, sequelize } = require('./models');

async function addMenuItem() {
    try {
        // Find the 'Buy' menu item (parent)
        const buyMenu = await MenuItem.findOne({ where: { title: 'Buy', parentId: null } });
        if (!buyMenu) {
            console.log("Buy menu not found");
            return;
        }

        // Find the 'Buying Tools' section under 'Buy'
        const toolsSection = await MenuItem.findOne({
            where: {
                title: 'Buying Tools',
                parentId: buyMenu.id,
                itemType: 'section'
            }
        });

        if (!toolsSection) {
            console.log("Buying Tools section under Buy not found");
            return;
        }

        // Check if 'Compare Localities' already exists
        const existing = await MenuItem.findOne({
            where: {
                title: 'Compare Localities'
            }
        });

        if (existing) {
            console.log("Compare Localities already exists, updating parent to Buying Tools");
            await existing.update({ parentId: toolsSection.id, isDeleted: false });
        } else {
            // Get max order in that section
            const maxOrder = await MenuItem.max('order', { where: { parentId: toolsSection.id } });

            await MenuItem.create({
                title: 'Compare Localities',
                link: '/compare-localities',
                parentId: toolsSection.id,
                itemType: 'link',
                order: (maxOrder || 0) + 1,
                isDeleted: false
            });
            console.log("Successfully added 'Compare Localities' to Buying Tools");
        }

    } catch (error) {
        console.error("Error adding menu item:", error);
    } finally {
        await sequelize.close();
    }
}

addMenuItem();
