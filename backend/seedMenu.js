require('dotenv').config();
const { sequelize, PropertyType } = require('./models');
const { QueryInterface } = require('sequelize');
const defaultMenu = require('./seedMenu.default.js');

async function createItem(queryInterface, data, parentId = null) {
  const now = new Date();
  const [result] = await sequelize.query(
    `INSERT INTO "MenuItems" (title, link, "parentId", "itemType", "menuType", badge, "order", "isDeleted", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, $6, $7, false, $8, $9) RETURNING id`,
    {
      bind: [
        data.title,
        data.link || '#',
        parentId,
        data.itemType || 'link',
        data.menuType || null,
        data.badge || null,
        data.order || 0,
        now,
        now
      ]
    }
  );
  const id = result[0].id;
  for (const child of (data.children || [])) {
    await createItem(queryInterface, child, id);
  }
  return id;
}

async function seed() {
  try {
    // Ensure MenuItems table exists fresh
    await sequelize.query(`DROP TABLE IF EXISTS "MenuItems" CASCADE`);
    await sequelize.query(`
      CREATE TABLE "MenuItems" (
        id          SERIAL PRIMARY KEY,
        title       VARCHAR(255) NOT NULL,
        link        VARCHAR(255),
        "parentId"  INTEGER,
        "itemType"  VARCHAR(50) NOT NULL DEFAULT 'link',
        "menuType"  VARCHAR(50),
        badge       VARCHAR(50),
        "order"     INTEGER NOT NULL DEFAULT 0,
        "isDeleted" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
      )
    `);
    console.log('MenuItems table created.');

    // Fetch dynamic property types
    const propertyTypes = await PropertyType.findAll({ 
      where: { isDeleted: false },
      order: [['name', 'ASC']]
    });
    const buyTypes = propertyTypes.map((pt, index) => ({
      title: `${pt.name} in {city}`,
      link: `/properties?type=${pt.id}&city={city}`,
      order: index + 1
    }));
    const rentTypes = propertyTypes.map((pt, index) => ({
      title: `${pt.name} for rent in {city}`,
      link: `/properties?type=${pt.id}&status=Rent&city={city}`,
      order: index + 1
    }));

    // Inject into Buy menu (order 1)
    const buyMenu = defaultMenu.find(m => m.order === 1);
    if (buyMenu) {
      const ptSection = buyMenu.children.find(c => c.title === 'Property Types');
      if (ptSection) ptSection.children = buyTypes;
    }

    // Inject into Rent menu (order 2)
    const rentMenu = defaultMenu.find(m => m.order === 2);
    if (rentMenu) {
      const ptSection = rentMenu.children.find(c => c.title === 'Property Type');
      if (ptSection) ptSection.children = rentTypes;
    }

    for (const navItem of defaultMenu) {
      await createItem(null, navItem, null);
      console.log(`✓ Created nav: ${navItem.title}`);
    }

    console.log('\n✅ Menu seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
