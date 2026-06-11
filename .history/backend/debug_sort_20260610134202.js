const { InteriorDesigner, sequelize } = require('./models');

async function test() {
  await sequelize.authenticate();
  const where = { isDeleted: false };
  const orders = {
    rating: [['rating','DESC'], ['reviewCount','DESC']],
    name: [['name','ASC']],
    experience: [['yearsExperience','DESC']],
    projects: [['projectsCompleted','DESC']],
    featured: [['isFeatured','DESC'], ['rating','DESC']]
  };

  for (const key of Object.keys(orders)) {
    console.log('\n--- SORT:', key);
    const rows = await InteriorDesigner.findAll({ where, limit: 20, order: orders[key], logging: console.log });
    console.log(rows.map(r => r.name).slice(0,20).join('\n'));
  }
  process.exit(0);
}

test().catch(e => { console.error(e); process.exit(1); });
