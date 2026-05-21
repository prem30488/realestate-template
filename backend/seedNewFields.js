require('dotenv').config();
const { Property, sequelize } = require('./models');

async function seedNewFields() {
  try {
    console.log('Fetching all properties from database...');
    const properties = await Property.findAll();
    console.log(`Found ${properties.length} properties. Randomizing new fields...`);

    const furnishingOptions = ['semi-furnished', 'full-furnished', 'none'];
    const availabilityOptions = ['Immediate', '1 month', '2 months', '3 months', '6 months', '1 year'];

    for (const property of properties) {
      await property.update({
        verified: Math.random() > 0.4,
        furnishing_type: furnishingOptions[Math.floor(Math.random() * furnishingOptions.length)],
        bachelor_friendly: Math.random() > 0.5,
        availability: availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)],
        family_friendly: Math.random() > 0.5,
        live_in_friendly: Math.random() > 0.6,
      });
    }

    console.log('✅ Successfully seeded random data for all existing properties!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding random data:', error);
    process.exit(1);
  }
}

seedNewFields();
