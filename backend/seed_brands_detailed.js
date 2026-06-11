const { Brand, sequelize } = require('./models');

const brandsData = [
    {
        name: 'Bhutani Group',
        image: '/images/brands/bhutani.png',
        tagline: 'The Future of Real Estate is here',
        description: 'Bhutani Group is a leading developer in the commercial space, known for iconic projects like Alphathum and Cyberthum.',
        experienceYears: 28,
        totalProjects: 15,
        ongoingProjects: 4,
        completedProjects: 11,
        operatingCities: 'Noida, Delhi, Greater Noida',
        rating: 4.8,
        reviewsCount: 1250,
        category: 'Commercial',
        websiteUrl: 'https://www.bhutanigroup.com'
    },
    {
        name: 'Godrej Properties',
        image: '/images/brands/godrej.png',
        tagline: 'Trust, Transparency & Technology',
        description: 'Godrej Properties brings the Godrej Group philosophy of innovation, sustainability, and excellence to the real estate industry.',
        experienceYears: 33,
        totalProjects: 120,
        ongoingProjects: 45,
        completedProjects: 75,
        operatingCities: 'Mumbai, Pune, Bangalore, NCR',
        rating: 4.7,
        reviewsCount: 5600,
        category: 'Luxury Residential',
        websiteUrl: 'https://www.godrejproperties.com'
    },
    {
        name: 'Prestige Group',
        image: '/images/brands/prestige.png',
        tagline: 'Adds Prestige to your life',
        description: 'Over the last decade, the Prestige Group has firmly established itself as one of the leading and most successful developers in India.',
        experienceYears: 36,
        totalProjects: 250,
        ongoingProjects: 60,
        completedProjects: 190,
        operatingCities: 'Bangalore, Chennai, Hyderabad, Kochi',
        rating: 4.6,
        reviewsCount: 4200,
        category: 'Premium Residential',
        websiteUrl: 'https://www.prestigeconstructions.com'
    },
    {
        name: 'DLF Ltd.',
        image: '/images/brands/dlf.png',
        tagline: 'Building India',
        description: 'DLF has over 70 years of track record of sustained growth, customer satisfaction, and innovation.',
        experienceYears: 75,
        totalProjects: 150,
        ongoingProjects: 20,
        completedProjects: 130,
        operatingCities: 'Gurgaon, Delhi, Chandigarh, Lucknow',
        rating: 4.5,
        reviewsCount: 3800,
        category: 'Mixed-Use Development',
        websiteUrl: 'https://www.dlf.in'
    },
    {
        name: 'Lodha Group',
        image: '/images/brands/lodha.png',
        tagline: 'Building a Better Life',
        description: 'Lodha Group is among the largest real estate developers in India with presence in the UK as well.',
        experienceYears: 42,
        totalProjects: 85,
        ongoingProjects: 30,
        completedProjects: 55,
        operatingCities: 'Mumbai, Hyderabad, Pune, London',
        rating: 4.4,
        reviewsCount: 3100,
        category: 'Ultra Luxury',
        websiteUrl: 'https://www.lodhagroup.in'
    },
    {
        name: 'Sobha Limited',
        image: '/images/brands/sobha.png',
        tagline: 'Passion at Work',
        description: 'The only backward integrated real estate company in the country, ensuring quality from start to finish.',
        experienceYears: 27,
        totalProjects: 160,
        ongoingProjects: 35,
        completedProjects: 125,
        operatingCities: 'Bangalore, Gurgaon, Chennai, Thrissur',
        rating: 4.9,
        reviewsCount: 2900,
        category: 'Quality Excellence',
        websiteUrl: 'https://www.sobha.com'
    }
];

async function seedBrands() {
    try {
        await sequelize.sync({ alter: true }); // Update schema
        console.log("Database synced and Brand model updated.");

        // Clear existing brands if any
        await Brand.destroy({ where: {}, truncate: true, cascade: true });

        // Create new brands
        await Brand.bulkCreate(brandsData);
        console.log("Successfully seeded Brands database with random data.");
    } catch (error) {
        console.error("Error seeding Brands:", error);
    } finally {
        await sequelize.close();
    }
}

seedBrands();
