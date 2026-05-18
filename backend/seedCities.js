require('dotenv').config();
const { City, sequelize } = require('./models');

const cities = [
  // Nearby (around Gujarat)
  { name: 'Ahmedabad', latitude: 23.0225, longitude: 72.5714, isPopular: true, isNearby: true, order: 1 },
  { name: 'Gandhinagar', latitude: 23.2156, longitude: 72.6369, isPopular: false, isNearby: true, order: 2 },
  { name: 'Vadodara', latitude: 22.3072, longitude: 73.1812, isPopular: false, isNearby: true, order: 3 },
  { name: 'Surat', latitude: 21.1702, longitude: 72.8311, isPopular: false, isNearby: true, order: 4 },
  { name: 'Rajkot', latitude: 22.3039, longitude: 70.8022, isPopular: false, isNearby: true, order: 5 },
  { name: 'Anand', latitude: 22.5645, longitude: 72.9289, isPopular: false, isNearby: true, order: 6 },
  { name: 'Nadiad', latitude: 22.6916, longitude: 72.8634, isPopular: false, isNearby: true, order: 7 },
  { name: 'Mehsana', latitude: 23.5880, longitude: 72.3693, isPopular: false, isNearby: true, order: 8 },

  // Popular
  { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777, isPopular: true, isNearby: false, order: 9 },
  { name: 'Delhi', latitude: 28.6139, longitude: 77.2090, isPopular: true, isNearby: false, order: 10 },
  { name: 'Bangalore', latitude: 12.9716, longitude: 77.5946, isPopular: true, isNearby: false, order: 11 },
  { name: 'Hyderabad', latitude: 17.3850, longitude: 78.4867, isPopular: true, isNearby: false, order: 12 },
  { name: 'Chennai', latitude: 13.0827, longitude: 80.2707, isPopular: true, isNearby: false, order: 13 },
  { name: 'Kolkata', latitude: 22.5726, longitude: 88.3639, isPopular: true, isNearby: false, order: 14 },
  { name: 'Pune', latitude: 18.5204, longitude: 73.8567, isPopular: true, isNearby: false, order: 15 },
  { name: 'Jaipur', latitude: 26.9124, longitude: 75.7873, isPopular: true, isNearby: false, order: 16 },
  { name: 'Lucknow', latitude: 26.8467, longitude: 80.9462, isPopular: true, isNearby: false, order: 17 },
  { name: 'Noida', latitude: 28.5355, longitude: 77.3910, isPopular: true, isNearby: false, order: 18 },
  { name: 'Gurgaon', latitude: 28.4595, longitude: 77.0266, isPopular: true, isNearby: false, order: 19 },
  { name: 'Thane', latitude: 19.2183, longitude: 72.9781, isPopular: true, isNearby: false, order: 20 },
  { name: 'Indore', latitude: 22.7196, longitude: 75.8577, isPopular: true, isNearby: false, order: 21 },
  { name: 'Bhopal', latitude: 23.2599, longitude: 77.4126, isPopular: true, isNearby: false, order: 22 },

  // Others
  { name: 'Agra', latitude: 27.1767, longitude: 78.0081, isPopular: false, isNearby: false, order: 23 },
  { name: 'Amritsar', latitude: 31.6340, longitude: 74.8723, isPopular: false, isNearby: false, order: 24 },
  { name: 'Chandigarh', latitude: 30.7333, longitude: 76.7794, isPopular: false, isNearby: false, order: 25 },
  { name: 'Coimbatore', latitude: 11.0168, longitude: 76.9558, isPopular: false, isNearby: false, order: 26 },
  { name: 'Dehradun', latitude: 30.3165, longitude: 78.0322, isPopular: false, isNearby: false, order: 27 },
  { name: 'Gwalior', latitude: 26.2124, longitude: 78.1772, isPopular: false, isNearby: false, order: 28 },
  { name: 'Jabalpur', latitude: 23.1815, longitude: 79.9864, isPopular: false, isNearby: false, order: 29 },
  { name: 'Jodhpur', latitude: 26.2389, longitude: 73.0243, isPopular: false, isNearby: false, order: 30 },
  { name: 'Kanpur', latitude: 26.4499, longitude: 80.3319, isPopular: false, isNearby: false, order: 31 },
  { name: 'Kochi', latitude: 9.9312, longitude: 76.2673, isPopular: false, isNearby: false, order: 32 },
  { name: 'Madurai', latitude: 9.9252, longitude: 78.1198, isPopular: false, isNearby: false, order: 33 },
  { name: 'Mysore', latitude: 12.2958, longitude: 76.6394, isPopular: false, isNearby: false, order: 34 },
  { name: 'Nagpur', latitude: 21.1458, longitude: 79.0882, isPopular: false, isNearby: false, order: 35 },
  { name: 'Nashik', latitude: 19.9975, longitude: 73.7898, isPopular: false, isNearby: false, order: 36 },
  { name: 'Patna', latitude: 25.5941, longitude: 85.1376, isPopular: false, isNearby: false, order: 37 },
  { name: 'Raipur', latitude: 21.2514, longitude: 81.6296, isPopular: false, isNearby: false, order: 38 },
  { name: 'Ranchi', latitude: 23.3441, longitude: 85.3096, isPopular: false, isNearby: false, order: 39 },
  { name: 'Solapur', latitude: 17.6599, longitude: 75.9064, isPopular: false, isNearby: false, order: 40 },
  { name: 'Udaipur', latitude: 24.5854, longitude: 73.7125, isPopular: false, isNearby: false, order: 41 },
  { name: 'Varanasi', latitude: 25.3176, longitude: 82.9739, isPopular: false, isNearby: false, order: 42 },
  { name: 'Visakhapatnam', latitude: 17.6868, longitude: 83.2185, isPopular: false, isNearby: false, order: 43 },
  { name: 'Vijayawada', latitude: 16.5062, longitude: 80.6480, isPopular: false, isNearby: false, order: 44 }
];

async function seedCities() {
  try {
    // Drop and recreate table if needed or just sync
    await sequelize.sync();
    
    // Clear existing cities to avoid duplicates if re-running
    await City.destroy({ where: {}, truncate: true, cascade: true });
    
    await City.bulkCreate(cities);
    console.log('✅ Cities seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding cities:', error);
    process.exit(1);
  }
}

seedCities();
