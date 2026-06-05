require('dotenv').config();
const { Broker, sequelize } = require('../models');

const cities = ['Ahmedabad', 'Gandhinagar'];

async function updateBrokersWithCities() {
  try {
    const brokers = await Broker.findAll();
    console.log(`Found ${brokers.length} brokers`);

    if (brokers.length === 0) {
      console.log('No brokers found to update');
      return;
    }

    // Assign cities alternately
    for (let i = 0; i < brokers.length; i++) {
      const city = cities[i % cities.length]; // Alternate between Ahmedabad and Gandhinagar
      await brokers[i].update({ city });
      console.log(`✓ Updated broker ${brokers[i].name} → ${city}`);
    }

    console.log('\n✓ All brokers updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating brokers:', error);
    process.exit(1);
  }
}

updateBrokersWithCities();
