'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const propertyTypes = [
      'Apartment', 'House', 'Commercial', 'Garage', 'Villa', 'Penthouse',
      'Townhouse', 'Duplex', 'Studio', 'Restaurent', 'Office', 'Shop',
      'Showroom', 'Hotel', 'Building', 'Agriculture', 'Industry',
      'Farm House', 'Factory', 'Godown', 'Warehouse', 'Shop-cum-Office'
    ].map(name => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('property_types', propertyTypes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('property_types', null, {});
  }
};
