const { MenuItem, sequelize } = require('./models');

async function addEMICalculator() {
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

        // Check if 'EMI Calculator' already exists
        const existing = await MenuItem.findOne({
            where: {
                title: 'EMI Calculator',
                parentId: toolsSection.id
            }
        });

        if (existing) {
            console.log("EMI Calculator already exists in Buying Tools");
            await existing.update({ isDeleted: false });
        } else {
            // Get order of 'Compare Localities' if it exists to place it below it
            const compareLocalities = await MenuItem.findOne({
                where: {
                    title: 'Compare Localities',
                    parentId: toolsSection.id
                }
            });

            let newOrder;
            if (compareLocalities) {
                newOrder = compareLocalities.order + 1;
                // Shift other items up if necessary
                await sequelize.query(`UPDATE "MenuItems" SET "order" = "order" + 1 WHERE "parentId" = ${toolsSection.id} AND "order" >= ${newOrder}`);
            } else {
                const maxOrder = await MenuItem.max('order', { where: { parentId: toolsSection.id } });
                newOrder = (maxOrder || 0) + 1;
            }

            await MenuItem.create({
                title: 'EMI Calculator',
                link: '/emi-calculator',
                parentId: toolsSection.id,
                itemType: 'link',
                order: newOrder,
                isDeleted: false
            });
            console.log("Successfully added 'EMI Calculator' to Buying Tools");
        }

    } catch (error) {
        console.error("Error adding EMI Calculator menu item:", error);
    } finally {
        await sequelize.close();
    }
}

addEMICalculator();
