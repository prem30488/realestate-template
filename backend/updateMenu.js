const { MenuItem } = require('./models');

async function updateMenu() {
  try {
    const items = await MenuItem.findAll({ where: { title: 'Builders in {city}' }});
    for (let item of items) {
      item.link = '/builders/{city}';
      await item.save();
      console.log('Updated item:', item.id, 'to', item.link);
    }
    console.log('Done updating Builders menu link in DB');
    process.exit(0);
  } catch (error) {
    console.error('Error updating menu:', error);
    process.exit(1);
  }
}

updateMenu();
