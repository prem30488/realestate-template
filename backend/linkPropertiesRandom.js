require('dotenv').config();
const { Property, Project, Locality, sequelize } = require('./models');

function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function linkPropertiesRandom() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected.');

        // Fetch all IDs
        const properties = await Property.findAll({ attributes: ['id'] });
        const projects = await Project.findAll({ attributes: ['id', 'locality_id'] });
        const localities = await Locality.findAll({ attributes: ['id'] });

        if (!projects.length) throw new Error('No projects found in DB. Please seed projects first.');
        if (!localities.length) throw new Error('No localities found in DB. Please seed localities first.');
        if (!properties.length) { console.log('⚠️  No properties found. Nothing to update.'); process.exit(0); }

        console.log(`📦 Found: ${properties.length} properties | ${projects.length} projects | ${localities.length} localities`);
        console.log('🔗 Randomly linking properties to projects and localities...\n');

        let updated = 0;
        for (const property of properties) {
            const project = randomPick(projects);
            // Use the project's own locality OR pick a random locality
            const localityId = randomPick(localities).id;

            await Property.update(
                { project_id: project.id, locality_id: localityId },
                { where: { id: property.id } }
            );

            console.log(`  Property #${property.id} → Project #${project.id}, Locality #${localityId}`);
            updated++;
        }

        console.log(`\n✅ Done! ${updated} properties updated successfully.`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

linkPropertiesRandom();
