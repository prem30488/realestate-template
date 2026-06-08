require('dotenv').config();
const { Locality, sequelize } = require('./models');

const localityImages = [
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000', // City street
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b', // Skyscrapers
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', // Green neighborhood
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df', // Urban evening
    'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8', // Modern district
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', // Architecture
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', // Residential
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233', // Houses
    'https://images.unsplash.com/photo-1434056886845-dac89ffa9b50', // Suburb
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'  // Nature/Green area
];

async function seedAllLocalityImages() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const localities = await Locality.findAll();
        console.log(`Found ${localities.length} localities to update.`);

        let count = 0;
        for (const loc of localities) {
            const baseImg = localityImages[loc.id % localityImages.length];
            const imageUrl = `${baseImg}?auto=format&fit=crop&w=1200&q=80`;

            await loc.update({ image_url: imageUrl });
            count++;
            if (count % 10 === 0) console.log(`Updated ${count}/${localities.length} localities...`);
        }

        console.log(`✅ ${count} locality images updated successfully!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating locality images:', error);
        process.exit(1);
    }
}

seedAllLocalityImages();
