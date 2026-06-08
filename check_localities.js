const db = require('./backend/models');

async function checkData() {
    try {
        const localities = await db.Locality.findAll({
            attributes: ['id', 'name'],
            include: [{ model: db.City, as: 'city', attributes: ['name'] }]
        });
        console.log('--- LOCALITIES IN DB ---');
        localities.forEach(l => {
            console.log(`ID: ${l.id}, Name: "${l.name}", City: ${l.city?.name}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkData();
