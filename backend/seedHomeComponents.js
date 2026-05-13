require('dotenv').config();
const { HomeComponent, sequelize } = require('./models');

const defaultComponents = [
  { name: 'Header',                 displayName: 'Header / Navigation',  order: 1,  is_deleted: false },
  { name: 'HeroSlider',             displayName: 'Hero Slider',           order: 2,  is_deleted: false },
  { name: 'Search',                 displayName: 'Search Bar',            order: 3,  is_deleted: false },
  { name: 'CityMap',                displayName: 'City Map',              order: 4,  is_deleted: false },
  { name: 'Featured',               displayName: 'Featured Properties',   order: 5,  is_deleted: false },
  { name: 'Latest',                 displayName: 'Latest Properties',     order: 6,  is_deleted: false },
  { name: 'WhyUs',                  displayName: 'Why Us Section',        order: 7,  is_deleted: false },
  { name: 'OurServices',            displayName: 'Our Services',          order: 8,  is_deleted: false },
  { name: 'FunFact',                displayName: 'Fun Facts',             order: 9,  is_deleted: false },
  { name: 'OurBrokers',             displayName: 'Our Brokers',           order: 10, is_deleted: false },
  { name: 'InstagramVideoCarousel', displayName: 'Instagram Feed',        order: 11, is_deleted: false },
  { name: 'LatestNews',             displayName: 'Latest News',           order: 12, is_deleted: false },
  { name: 'Testimonials',           displayName: 'Testimonials',          order: 13, is_deleted: false },
  { name: 'OurBrands',              displayName: 'Our Brands',            order: 14, is_deleted: false },
  { name: 'Footer',                 displayName: 'Footer',                order: 15, is_deleted: false },
  { name: 'WhatsAppButton',         displayName: 'WhatsApp Float Button', order: 16, is_deleted: false }
];

async function seed() {
  try {
    await sequelize.sync({ alter: true });
    console.log('DB synced.');

    for (const comp of defaultComponents) {
      const [record, created] = await HomeComponent.findOrCreate({
        where: { name: comp.name },
        defaults: comp
      });
      if (!created) {
        await record.update({ order: comp.order, is_deleted: comp.is_deleted, displayName: comp.displayName });
        console.log(`Updated: ${comp.name}`);
      } else {
        console.log(`Created: ${comp.name}`);
      }
    }

    console.log('\n✅ All home components seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
