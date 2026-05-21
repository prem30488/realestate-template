'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { PropertyType, Amenity, User, Locality, City } = require('../models');

    const types = await PropertyType.findAll();
    const amenities = await Amenity.findAll();
    const users = await User.findAll();
    
    // Fetch cities to get their IDs
    const cityGandhinagar = await City.findOne({ where: { name: 'Gandhinagar' } });
    const cityAhmedabad = await City.findOne({ where: { name: 'Ahmedabad' } });
    
    // Fetch localities for both cities
    const localitiesG = cityGandhinagar ? await Locality.findAll({ where: { city_id: cityGandhinagar.id } }) : [];
    const localitiesA = cityAhmedabad ? await Locality.findAll({ where: { city_id: cityAhmedabad.id } }) : [];

    const cityLocalities = {
      'Gandhinagar': localitiesG,
      'Ahmedabad': localitiesA
    };

    if (types.length === 0 || users.length === 0) {
      console.log('No types or users found. Please run seeders for those first.');
      return;
    }

    const cities = ['Gandhinagar', 'Ahmedabad'];
    const propertiesData = [];
    const propertyAmenitiesData = [];
    const propertyImagesData = [];

    let propertyCounter = 1;

    for (const type of types) {
      for (const city of cities) {
        for (let i = 1; i <= 5; i++) {
          const propertyId = propertyCounter++;
          const price = Math.floor(Math.random() * (10000000 - 1000000) + 1000000);
          const area = Math.floor(Math.random() * (5000 - 500) + 500);
          const status = Math.random() > 0.5 ? 'For Sale' : 'For Rent';

          const furnishingOptions = ['semi-furnished', 'full-furnished', 'none'];
          const availabilityOptions = ['Immediate', '1 month', '2 months', '3 months', '6 months', '1 year'];

          const locs = cityLocalities[city] || [];
          const randomLoc = locs.length > 0 ? locs[Math.floor(Math.random() * locs.length)] : null;

          propertiesData.push({
            id: propertyId,
            typeId: type.id,
            city: city,
            state: 'Gujarat',
            country: 'India',
            title: `${type.name} in ${city} #${i}`,
            status: status,
            price: price,
            locality_id: randomLoc ? randomLoc.id : null,
            area: area,
            no_of_bedrooms: Math.floor(Math.random() * 5 + 1),
            no_of_bathrooms: Math.floor(Math.random() * 4 + 1),
            posted_by: users[Math.floor(Math.random() * users.length)].id,
            featured: Math.random() > 0.8,
            no_of_garage: Math.floor(Math.random() * 3),
            verified: Math.random() > 0.4,
            furnishing_type: furnishingOptions[Math.floor(Math.random() * furnishingOptions.length)],
            bachelor_friendly: Math.random() > 0.5,
            availability: availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)],
            family_friendly: Math.random() > 0.5,
            live_in_friendly: Math.random() > 0.6,
            createdAt: new Date(),
            updatedAt: new Date()
          });

          // Randomly assign 5-10 amenities
          const shuffledAmenities = [...amenities].sort(() => 0.5 - Math.random());
          const selectedAmenities = shuffledAmenities.slice(0, Math.floor(Math.random() * 6 + 5));

          selectedAmenities.forEach(amenity => {
            propertyAmenitiesData.push({
              propertyId: propertyId,
              amenityId: amenity.id,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          });

          // Add 3 images per property
          for (let j = 1; j <= 3; j++) {
            propertyImagesData.push({
              propertyId: propertyId,
              imageUrl: `/images/${propertyId}/img_${j}.jpg`,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        }
      }
    }

    await queryInterface.bulkInsert('properties', propertiesData, {});
    await queryInterface.bulkInsert('property_amenities', propertyAmenitiesData, {});
    await queryInterface.bulkInsert('property_images', propertyImagesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('property_images', null, {});
    await queryInterface.bulkDelete('property_amenities', null, {});
    await queryInterface.bulkDelete('properties', null, {});
  }
};
