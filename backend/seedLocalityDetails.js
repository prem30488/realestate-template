require('dotenv').config();
const { Locality, sequelize } = require('./models');

async function seedLocalityDetails() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const localities = await Locality.findAll({
            where: {
                name: ['Satellite', 'Prahlad Nagar', 'Bodakdev', 'Bopal', 'Kudasan', 'Sargasan']
            }
        });

        for (const loc of localities) {
            console.log(`Updating details for ${loc.name}...`);

            const connectivity = [
                { type: 'Metro/Train', label: 'Nearby Metro Station', value: '2.5 km', icon: 'Train' },
                { type: 'Airport', label: 'International Airport', value: '12 km', icon: 'AirportShuttle' },
                { type: 'Bus', label: 'Major Bus Terminus', value: '1.2 km', icon: 'DirectionsBus' },
                { type: 'Highway', label: 'Main Highway Access', value: '0.8 km', icon: 'TrendingUp' }
            ];

            const infrastructure = [
                { type: 'Schools', label: 'Top Rated Schools', value: '8+', icon: 'School' },
                { type: 'Hospitals', label: 'Premium Hospitals', value: '4+', icon: 'LocalHospital' },
                { type: 'Shopping', label: 'Malls & Markets', value: '5+', icon: 'ShoppingBag' },
                { type: 'Parks', label: 'Public Parks', value: '7+', icon: 'Park' }
            ];

            const lifestyle = [
                { type: 'Safety', label: 'Safety Rating', value: '4.8/5', icon: 'VerifiedUser' },
                { type: 'Cleanliness', label: 'Cleanliness', value: 'Excellent', icon: 'CheckCircle' },
                { type: 'Entertainment', label: 'Dining & Cafes', value: 'Elite', icon: 'Restaurant' },
                { type: 'Vibe', label: 'Ambiance', value: 'Cosmopolitan', icon: 'Home' }
            ];

            const trends = {
                avgPrice: '₹ 9,200/sqft',
                priceTrend: '+7.4% (Last 1 year)',
                rentalYield: '3.8% annually',
                demand: 'Very High'
            };

            const overview = `${loc.name} is a premier locality in the western part of Ahmedabad, known for its upscale residential developments and bustling commercial centers. It offers an exceptional standard of living with wide, clean roads and plenty of green spaces. The area has seen significant appreciation in property values over the last decade, making it a hotspot for both end-users and investors. With top-tier educational institutions and multi-specialty hospitals within a few kilometers, it provides unmatched convenience.`;

            await loc.update({
                overview,
                connectivity,
                infrastructure,
                lifestyle,
                real_estate_trends: trends,
                image_url: `https://picsum.photos/id/${loc.id + 10}/1200/600`
            });
        }

        console.log('✅ Locality details updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating locality details:', error);
        process.exit(1);
    }
}

seedLocalityDetails();
