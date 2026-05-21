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

        // Clear existing localities for these two cities to prevent duplicate keys if re-run
        await queryInterface.bulkDelete('Localities', {
            city_id: [ahmedabadId, gandhinagarId]
        }, {});

        const localities = [
            // Ahmedabad Localities (24 entries)
            {
                city_id: ahmedabadId,
                name: 'Satellite',
                postal_code: '380015',
                latitude: 23.0225,
                longitude: 72.5074,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Thaltej',
                postal_code: '380059',
                latitude: 23.0505,
                longitude: 72.5168,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Vastrapur',
                postal_code: '380015',
                latitude: 23.0351,
                longitude: 72.5293,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Ghatlodia',
                postal_code: '380061',
                latitude: 23.0615,
                longitude: 72.5412,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Paldi',
                postal_code: '380007',
                latitude: 23.0102,
                longitude: 72.5614,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Navrangpura',
                postal_code: '380009',
                latitude: 23.0364,
                longitude: 72.5611,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Ambawadi',
                postal_code: '380015',
                latitude: 23.0215,
                longitude: 72.5414,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Memnagar',
                postal_code: '380052',
                latitude: 23.0487,
                longitude: 72.5401,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Bodakdev',
                postal_code: '380054',
                latitude: 23.0382,
                longitude: 72.5156,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Prahlad Nagar',
                postal_code: '380015',
                latitude: 22.9982,
                longitude: 72.5071,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Bopal',
                postal_code: '380058',
                latitude: 23.0301,
                longitude: 72.4712,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'South Bopal',
                postal_code: '380058',
                latitude: 23.0125,
                longitude: 72.4632,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Gota',
                postal_code: '382481',
                latitude: 23.1042,
                longitude: 72.5358,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Science City',
                postal_code: '380060',
                latitude: 23.0722,
                longitude: 72.5015,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Chandkheda',
                postal_code: '382424',
                latitude: 23.1145,
                longitude: 72.5810,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Motera',
                postal_code: '380005',
                latitude: 23.1022,
                longitude: 72.5941,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Ranip',
                postal_code: '382480',
                latitude: 23.0712,
                longitude: 72.5612,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Maninagar',
                postal_code: '380008',
                latitude: 22.9972,
                longitude: 72.6015,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Naranpura',
                postal_code: '380013',
                latitude: 23.0542,
                longitude: 72.5510,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Vejalpur',
                postal_code: '380051',
                latitude: 23.0075,
                longitude: 72.5204,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Jodhpur',
                postal_code: '380015',
                latitude: 23.0202,
                longitude: 72.5285,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Sabarmati',
                postal_code: '380005',
                latitude: 23.0811,
                longitude: 72.5855,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Shahibaug',
                postal_code: '380004',
                latitude: 23.0562,
                longitude: 72.5982,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: ahmedabadId,
                name: 'Nikol',
                postal_code: '382350',
                latitude: 23.0452,
                longitude: 72.6710,
                createdAt: new Date(),
                updatedAt: new Date()
            },

            // Gandhinagar Localities (25 entries)
            {
                city_id: gandhinagarId,
                name: 'Sector 1',
                postal_code: '382010',
                latitude: 23.2355,
                longitude: 72.6562,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 2',
                postal_code: '382010',
                latitude: 23.2301,
                longitude: 72.6581,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 3',
                postal_code: '382010',
                latitude: 23.2282,
                longitude: 72.6534,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 4',
                postal_code: '382010',
                latitude: 23.2251,
                longitude: 72.6482,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 5',
                postal_code: '382010',
                latitude: 23.2202,
                longitude: 72.6455,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 6',
                postal_code: '382010',
                latitude: 23.2181,
                longitude: 72.6402,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 7',
                postal_code: '382010',
                latitude: 23.2155,
                longitude: 72.6358,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 8',
                postal_code: '382010',
                latitude: 23.2102,
                longitude: 72.6301,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 11',
                postal_code: '382011',
                latitude: 23.2225,
                longitude: 72.6621,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 12',
                postal_code: '382012',
                latitude: 23.2258,
                longitude: 72.6682,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 16',
                postal_code: '382016',
                latitude: 23.2381,
                longitude: 72.6425,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 21',
                postal_code: '382021',
                latitude: 23.2452,
                longitude: 72.6381,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 24',
                postal_code: '382024',
                latitude: 23.2552,
                longitude: 72.6282,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 25',
                postal_code: '382025',
                latitude: 23.2605,
                longitude: 72.6201,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 26',
                postal_code: '382026',
                latitude: 23.2651,
                longitude: 72.6152,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 28',
                postal_code: '382028',
                latitude: 23.2702,
                longitude: 72.6081,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sector 30',
                postal_code: '382030',
                latitude: 23.2755,
                longitude: 72.6002,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Kudasan',
                postal_code: '382421',
                latitude: 23.1852,
                longitude: 72.6288,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Sargasan',
                postal_code: '382421',
                latitude: 23.1785,
                longitude: 72.6181,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Raysan',
                postal_code: '382007',
                latitude: 23.1902,
                longitude: 72.6504,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Randesan',
                postal_code: '382007',
                latitude: 23.1821,
                longitude: 72.6601,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Koba',
                postal_code: '382421',
                latitude: 23.1552,
                longitude: 72.6455,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Infocity',
                postal_code: '382009',
                latitude: 23.1955,
                longitude: 72.6282,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Gift City',
                postal_code: '382355',
                latitude: 23.1601,
                longitude: 72.6852,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                city_id: gandhinagarId,
                name: 'Vavol',
                postal_code: '382016',
                latitude: 23.2302,
                longitude: 72.6122,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        const localitiesWithRatings = localities.map((loc, idx) => ({
            ...loc,
            rating: parseFloat((3.8 + (idx % 13) * 0.1).toFixed(1))
        }));

        await queryInterface.bulkInsert('Localities', localitiesWithRatings, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Localities', null, {});
    }
};

