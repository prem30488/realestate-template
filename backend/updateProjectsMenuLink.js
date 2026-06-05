const { MenuItem } = require('./models');

async function updateProjectsMenuLink() {
    try {
        const items = await MenuItem.findAll({ where: { title: 'Projects in {city}' } });
        if (items.length === 0) {
            console.log('No "Projects in {city}" menu items found.');
            process.exit(0);
        }
        for (const item of items) {
            console.log(`Updating item id=${item.id}, current link="${item.link}"`);
            item.link = '/projects/{city}';
            await item.save();
            console.log(`  -> Updated to "/projects/{city}"`);
        }
        console.log(`Done. Updated ${items.length} item(s).`);
        process.exit(0);
    } catch (error) {
        console.error('Error updating menu:', error);
        process.exit(1);
    }
}

updateProjectsMenuLink();
