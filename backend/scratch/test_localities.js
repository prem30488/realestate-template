const { Locality, City } = require('../models');

async function testQuery() {
  try {
    const totalLocalities = await Locality.count();
    console.log(`Total localities in DB: ${totalLocalities}`);

    const ahmedabadLocalities = await Locality.findAll({
      include: [{
        model: City,
        as: 'city',
        where: { name: 'Ahmedabad' }
      }]
    });

    console.log(`\nAhmedabad Localities (${ahmedabadLocalities.length}):`);
    ahmedabadLocalities.forEach((l, i) => {
      console.log(`  ${i+1}. ${l.name} (${l.postal_code}) - Lat: ${l.latitude}, Lng: ${l.longitude}`);
    });

    const gandhinagarLocalities = await Locality.findAll({
      include: [{
        model: City,
        as: 'city',
        where: { name: 'Gandhinagar' }
      }]
    });

    console.log(`\nGandhinagar Localities (${gandhinagarLocalities.length}):`);
    gandhinagarLocalities.forEach((l, i) => {
      console.log(`  ${i+1}. ${l.name} (${l.postal_code}) - Lat: ${l.latitude}, Lng: ${l.longitude}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error during verification:', error);
    process.exit(1);
  }
}

testQuery();
