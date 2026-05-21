require('dotenv').config();
const { City, Locality, Builder, PropertyType, Project, sequelize } = require('./models');

async function seedProjects() {
  try {
    // 1. Sync models
    await sequelize.sync();

    // 2. Fetch dependencies
    const city = await City.findOne({ where: { name: 'Ahmedabad' } });
    if (!city) {
      console.error('Ahmedabad city not found.');
      process.exit(1);
    }

    const locality = await Locality.findOne({ where: { city_id: city.id } });
    if (!locality) {
      console.error('No locality found for Ahmedabad.');
      process.exit(1);
    }

    let builder = await Builder.findOne();
    if (!builder) {
      console.log('No builder found. Creating a test builder...');
      builder = await Builder.create({
        company_name: 'Test Builder Corp',
        email: 'info@testbuilder.com',
        phone_primary: '9999999999',
        city: 'Ahmedabad',
        is_verified: true
      });
    }

    let propertyType = await PropertyType.findOne({ where: { name: 'Apartment' } });
    if (!propertyType) {
      console.log('Apartment property type not found. Creating one...');
      propertyType = await PropertyType.create({ name: 'Apartment' });
    }

    // 3. Clear existing projects
    console.log('Clearing existing projects...');
    await Project.destroy({ where: {} });

    // 4. Create dummy projects
    const projectsToInsert = [
      {
        locality_id: locality.id,
        property_type_id: propertyType.id,
        builder_id: builder.id,
        city_id: city.id,
        projectName: 'Skyline Heights',
        budget: '50 L - 75 L',
        state: 'Gujarat',
        country: 'India',
        total_units: 120,
        project_size: '2 Acres',
        launch_date: new Date('2024-01-01'),
        total_towers: 4,
        bhk: '2, 3 BHK',
        technical_information: 'Earthquake resistant RCC frame structure. Premium vitrified tiles.',
        ratings: 4.5,
        photo_url: '/test1.jpg'
      },
      {
        locality_id: locality.id,
        property_type_id: propertyType.id,
        builder_id: builder.id,
        city_id: city.id,
        projectName: 'Green Valley',
        budget: '80 L - 1.2 Cr',
        state: 'Gujarat',
        country: 'India',
        total_units: 200,
        project_size: '5 Acres',
        launch_date: new Date('2023-05-15'),
        total_towers: 8,
        bhk: '3, 4 BHK',
        technical_information: 'IGBC Gold rated green building. Smart home automation included.',
        ratings: 4.8,
        photo_url: '/test2.jpg'
      }
    ];

    console.log(`Inserting ${projectsToInsert.length} projects...`);
    await Project.bulkCreate(projectsToInsert);

    console.log('✅ Projects seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();
