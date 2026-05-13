'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const outdoorAmenities = [
      "Landscaped gardens", "Swimming pool", "Jogging track", "Children's play area",
      "Sports facilities", "Outdoor seating areas", "Barbecue area", "Clubhouse",
      "Fitness Centre/gym", "Spa", "Billiards Table", "Package lockers",
      "Valet trash", "Surveillance cameras", "Building Wi-Fi", "Party room"
    ].map(title => ({
      type: 'Outdoor',
      title,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const indoorAmenities = [
      "Fitness facilities", "Recreation areas", "Indoor gaming room", "Spa/Sauna",
      "Heated pools", "EV charging station", "In-unit dishwasher", "Rooftop garden",
      "Central air conditioning and heating", "Balcony", "Smart home",
      "Security systems and intercom", "Large bathtubs", "Complimentary Wi-Fi",
      "Online rent options"
    ].map(title => ({
      type: 'Indoor',
      title,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('amenities', [...outdoorAmenities, ...indoorAmenities], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('amenities', null, {});
  }
};
