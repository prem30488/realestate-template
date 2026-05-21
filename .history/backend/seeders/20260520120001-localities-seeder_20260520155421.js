'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get city IDs for Ahmedabad and Gandhinagar
    const ahmedabadCity = await queryInterface.sequelize.query(
      "SELECT id FROM \"Cities\" WHERE name = 'Ahmedabad' LIMIT 1"
    );
    
    const gandhinagarCity = await queryInterface.sequelize.query(
      "SELECT id FROM \"Cities\" WHERE name = 'Gandhinagar' LIMIT 1"
    );

    const ahmedabadId = ahmedabadCity[0][0]?.id;
    const gandhinagarId = gandhinagarCity[0][0]?.id;

    if (!ahmedabadId || !gandhinagarId) {
      throw new Error('Ahmedabad or Gandhinagar city not found. Please seed cities first.');
    }

    const localities = [
      // Ahmedabad Localities
      {
        city_id: ahmedabadId,
        name: 'Satellite',
        postal_code: '380015',
        latitude: 23.0225,
        longitude: 72.5714,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: ahmedabadId,
        name: 'Thaltej',
        postal_code: '380054',
        latitude: 23.0314,
        longitude: 72.5625,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: ahmedabadId,
        name: 'Vastrapur',
        postal_code: '380015',
        latitude: 23.0198,
        longitude: 72.5407,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: ahmedabadId,
        name: 'Ghatlodia',
        postal_code: '380061',
        latitude: 23.0315,
        longitude: 72.5493,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: ahmedabadId,
        name: 'Paldi',
        postal_code: '380007',
        latitude: 23.1815,
        longitude: 72.6109,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: ahmedabadId,
        name: 'Navrangpura',
        postal_code: '380009',
        latitude: 23.1920,
        longitude: 72.5825,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: ahmedabadId,
        name: 'Ambawadi',
        postal_code: '380006',
        latitude: 23.1895,
        longitude: 72.5715,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: ahmedabadId,
        name: 'Memnagar',
        postal_code: '380006',
        latitude: 23.1827,
        longitude: 72.5608,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Gandhinagar Localities
      {
        city_id: gandhinagarId,
        name: 'Sector 1',
        postal_code: '382001',
        latitude: 23.1815,
        longitude: 72.6365,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: gandhinagarId,
        name: 'Sector 7',
        postal_code: '382007',
        latitude: 23.1695,
        longitude: 72.6460,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: gandhinagarId,
        name: 'Sector 12',
        postal_code: '382012',
        latitude: 23.1520,
        longitude: 72.6585,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: gandhinagarId,
        name: 'Sector 18',
        postal_code: '382018',
        latitude: 23.1342,
        longitude: 72.6720,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: gandhinagarId,
        name: 'Sector 20',
        postal_code: '382020',
        latitude: 23.1265,
        longitude: 72.6810,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: gandhinagarId,
        name: 'Sector 25',
        postal_code: '382025',
        latitude: 23.1058,
        longitude: 72.7015,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Localities', localities, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Localities', null, {});
  }
};
