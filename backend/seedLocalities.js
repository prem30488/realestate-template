require('dotenv').config();
const { City, Locality, sequelize } = require('./models');

const ahmedabadLocalities = [
  { name: 'Satellite', postal_code: '380015', latitude: 23.0225, longitude: 72.5074 },
  { name: 'Thaltej', postal_code: '380059', latitude: 23.0505, longitude: 72.5168 },
  { name: 'Vastrapur', postal_code: '380015', latitude: 23.0351, longitude: 72.5293 },
  { name: 'Ghatlodia', postal_code: '380061', latitude: 23.0615, longitude: 72.5412 },
  { name: 'Paldi', postal_code: '380007', latitude: 23.0102, longitude: 72.5614 },
  { name: 'Navrangpura', postal_code: '380009', latitude: 23.0364, longitude: 72.5611 },
  { name: 'Ambawadi', postal_code: '380015', latitude: 23.0215, longitude: 72.5414 },
  { name: 'Memnagar', postal_code: '380052', latitude: 23.0487, longitude: 72.5401 },
  { name: 'Bodakdev', postal_code: '380054', latitude: 23.0382, longitude: 72.5156 },
  { name: 'Prahlad Nagar', postal_code: '380015', latitude: 22.9982, longitude: 72.5071 },
  { name: 'Bopal', postal_code: '380058', latitude: 23.0301, longitude: 72.4712 },
  { name: 'South Bopal', postal_code: '380058', latitude: 23.0125, longitude: 72.4632 },
  { name: 'Gota', postal_code: '382481', latitude: 23.1042, longitude: 72.5358 },
  { name: 'Science City', postal_code: '380060', latitude: 23.0722, longitude: 72.5015 },
  { name: 'Chandkheda', postal_code: '382424', latitude: 23.1145, longitude: 72.5810 },
  { name: 'Motera', postal_code: '380005', latitude: 23.1022, longitude: 72.5941 },
  { name: 'Ranip', postal_code: '382480', latitude: 23.0712, longitude: 72.5612 },
  { name: 'Maninagar', postal_code: '380008', latitude: 22.9972, longitude: 72.6015 },
  { name: 'Naranpura', postal_code: '380013', latitude: 23.0542, longitude: 72.5510 },
  { name: 'Vejalpur', postal_code: '380051', latitude: 23.0075, longitude: 72.5204 },
  { name: 'Jodhpur', postal_code: '380015', latitude: 23.0202, longitude: 72.5285 },
  { name: 'Sabarmati', postal_code: '380005', latitude: 23.0811, longitude: 72.5855 },
  { name: 'Shahibaug', postal_code: '380004', latitude: 23.0562, longitude: 72.5982 },
  { name: 'Nikol', postal_code: '382350', latitude: 23.0452, longitude: 72.6710 }
];

const gandhinagarLocalities = [
  { name: 'Sector 1', postal_code: '382010', latitude: 23.2355, longitude: 72.6562 },
  { name: 'Sector 2', postal_code: '382010', latitude: 23.2301, longitude: 72.6581 },
  { name: 'Sector 3', postal_code: '382010', latitude: 23.2282, longitude: 72.6534 },
  { name: 'Sector 4', postal_code: '382010', latitude: 23.2251, longitude: 72.6482 },
  { name: 'Sector 5', postal_code: '382010', latitude: 23.2202, longitude: 72.6455 },
  { name: 'Sector 6', postal_code: '382010', latitude: 23.2181, longitude: 72.6402 },
  { name: 'Sector 7', postal_code: '382010', latitude: 23.2155, longitude: 72.6358 },
  { name: 'Sector 8', postal_code: '382010', latitude: 23.2102, longitude: 72.6301 },
  { name: 'Sector 11', postal_code: '382011', latitude: 23.2225, longitude: 72.6621 },
  { name: 'Sector 12', postal_code: '382012', latitude: 23.2258, longitude: 72.6682 },
  { name: 'Sector 16', postal_code: '382016', latitude: 23.2381, longitude: 72.6425 },
  { name: 'Sector 21', postal_code: '382021', latitude: 23.2452, longitude: 72.6381 },
  { name: 'Sector 24', postal_code: '382024', latitude: 23.2552, longitude: 72.6282 },
  { name: 'Sector 25', postal_code: '382025', latitude: 23.2605, longitude: 72.6201 },
  { name: 'Sector 26', postal_code: '382026', latitude: 23.2651, longitude: 72.6152 },
  { name: 'Sector 28', postal_code: '382028', latitude: 23.2702, longitude: 72.6081 },
  { name: 'Sector 30', postal_code: '382030', latitude: 23.2755, longitude: 72.6002 },
  { name: 'Kudasan', postal_code: '382421', latitude: 23.1852, longitude: 72.6288 },
  { name: 'Sargasan', postal_code: '382421', latitude: 23.1785, longitude: 72.6181 },
  { name: 'Raysan', postal_code: '382007', latitude: 23.1902, longitude: 72.6504 },
  { name: 'Randesan', postal_code: '382007', latitude: 23.1821, longitude: 72.6601 },
  { name: 'Koba', postal_code: '382421', latitude: 23.1552, longitude: 72.6455 },
  { name: 'Infocity', postal_code: '382009', latitude: 23.1955, longitude: 72.6282 },
  { name: 'Gift City', postal_code: '382355', latitude: 23.1601, longitude: 72.6852 },
  { name: 'Vavol', postal_code: '382016', latitude: 23.2302, longitude: 72.6122 }
];

async function seedLocalities() {
  try {
    // 1. Sync models
    await sequelize.sync();

    // 2. Fetch cities
    const ahmedabad = await City.findOne({ where: { name: 'Ahmedabad' } });
    const gandhinagar = await City.findOne({ where: { name: 'Gandhinagar' } });

    if (!ahmedabad || !gandhinagar) {
      console.error('❌ Ahmedabad or Gandhinagar city not found. Please seed cities first!');
      process.exit(1);
    }

    const ahmedabadId = ahmedabad.id;
    const gandhinagarId = gandhinagar.id;

    console.log(`Found cities: Ahmedabad (ID: ${ahmedabadId}), Gandhinagar (ID: ${gandhinagarId})`);

    // 3. Clear existing localities for these two cities to prevent duplicates
    console.log('Clearing existing localities for Ahmedabad and Gandhinagar...');
    await Locality.destroy({
      where: {
        city_id: [ahmedabadId, gandhinagarId]
      }
    });

    // 4. Build records
    const localitiesToInsert = [
      ...ahmedabadLocalities.map((loc, idx) => ({
        city_id: ahmedabadId,
        name: loc.name,
        postal_code: loc.postal_code,
        latitude: loc.latitude,
        longitude: loc.longitude,
        rating: parseFloat((3.8 + (idx % 13) * 0.1).toFixed(1))
      })),
      ...gandhinagarLocalities.map((loc, idx) => ({
        city_id: gandhinagarId,
        name: loc.name,
        postal_code: loc.postal_code,
        latitude: loc.latitude,
        longitude: loc.longitude,
        rating: parseFloat((3.8 + (idx % 13) * 0.1).toFixed(1))
      }))
    ];

    // 5. Bulk Create
    console.log(`Inserting ${localitiesToInsert.length} localities...`);
    await Locality.bulkCreate(localitiesToInsert);

    console.log('✅ Localities seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding localities:', error);
    process.exit(1);
  }
}

seedLocalities();
