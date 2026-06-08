require('dotenv').config();
const { Project, sequelize } = require('./models');

const projectImages = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', // Modern apartment
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', // Luxury house
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', // Glass office building
    'https://images.unsplash.com/photo-1460317442991-0ec239397148', // Residential neighborhood
    'https://images.unsplash.com/photo-1515263487990-61b07816b324', // Modern building
    'https://images.unsplash.com/photo-1448630360428-6e204282a944', // Coastal property
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', // Luxury villa
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be', // Contemporary home
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf', // Modern interior-outdoor
    'https://images.unsplash.com/photo-1531973576160-7125cd663d86'  // Futuristic architecture
];

async function seedProjectImages() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const projects = await Project.findAll();
        console.log(`Found ${projects.length} projects to update.`);

        let count = 0;
        for (const project of projects) {
            const baseImg = projectImages[project.id % projectImages.length];
            const imageUrl = `${baseImg}?auto=format&fit=crop&w=1200&q=80`;

            await project.update({ photo_url: imageUrl });
            count++;
            if (count % 5 === 0) console.log(`Updated ${count}/${projects.length} projects...`);
        }

        console.log(`✅ ${count} project images updated successfully!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating project images:', error);
        process.exit(1);
    }
}

seedProjectImages();
