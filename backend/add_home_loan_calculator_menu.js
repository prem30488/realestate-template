const { MenuItem, sequelize } = require('./models');

async function addHomeLoanCalculator() {
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

        // Check if 'Home Loan Calculator' already exists
        const existing = await MenuItem.findOne({
            where: {
                title: 'Home Loan Calculator',
                parentId: toolsSection.id
            }
        });

        if (existing) {
            console.log("Home Loan Calculator already exists in Buying Tools");
            await existing.update({ isDeleted: false });
        } else {
            // Get order of 'ROI Calculator' if it exists to place it below it
            const roiCalculator = await MenuItem.findOne({
                where: {
                    title: 'ROI Calculator',
                    parentId: toolsSection.id
                }
            });

            let newOrder;
            if (roiCalculator) {
                newOrder = roiCalculator.order + 1;
                // Shift other items up if necessary
                await sequelize.query(`UPDATE "MenuItems" SET "order" = "order" + 1 WHERE "parentId" = ${toolsSection.id} AND "order" >= ${newOrder}`);
            } else {
                const maxOrder = await MenuItem.max('order', { where: { parentId: toolsSection.id } });
                newOrder = (maxOrder || 0) + 1;
            }

            await MenuItem.create({
                title: 'Home Loan Calculator',
                link: '/home-loan-calculator',
                parentId: toolsSection.id,
                itemType: 'link',
                order: newOrder,
                isDeleted: false
            });
            console.log("Successfully added 'Home Loan Calculator' to Buying Tools");
        }

    } catch (error) {
        console.error("Error adding Home Loan Calculator menu item:", error);
    } finally {
        await sequelize.close();
    }
}

addHomeLoanCalculator();
