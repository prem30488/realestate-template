require('dotenv').config();
const { Builder, sequelize } = require('./models');

const builderLogos = [
    'https://logo.clearbit.com/godrejcp.com',
    'https://logo.clearbit.com/adani.com',
    'https://logo.clearbit.com/shapurji.com',
    'https://logo.clearbit.com/dlf.in',
    'https://logo.clearbit.com/prestigeconstructions.com',
    'https://logo.clearbit.com/lodhagroup.in',
    'https://logo.clearbit.com/sobha.com',
    'https://logo.clearbit.com/brigadegroup.com'
];

async function seedBuilderLogos() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const builders = await Builder.findAll();
        console.log(`Found ${builders.length} builders to update.`);

        let count = 0;
        for (const builder of builders) {
            const logoUrl = builderLogos[builder.id % builderLogos.length];
            await builder.update({ logo_url: logoUrl });
            count++;
        }

        console.log(`✅ ${count} builder logos updated successfully!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating builder logos:', error);
        process.exit(1);
    }
}

seedBuilderLogos();
