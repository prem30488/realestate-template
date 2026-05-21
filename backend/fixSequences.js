require('dotenv').config();
const { sequelize } = require('./models');

async function fixSequences() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        const tables = ['properties', 'Projects', 'Localities', 'Cities', 'Users', 'Builders', 'property_types'];

        for (const table of tables) {
            try {
                const [[row]] = await sequelize.query(
                    `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE((SELECT MAX(id) FROM "${table}"), 1));`
                );
                console.log(`✅ Reset sequence for "${table}" → ${JSON.stringify(row)}`);
            } catch (e) {
                console.warn(`⚠️  Skipped "${table}": ${e.message}`);
            }
        }

        console.log('\nAll sequences fixed.');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

fixSequences();
