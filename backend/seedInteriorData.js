require('dotenv').config();
const { sequelize } = require('./models');
const { DataTypes } = require('sequelize');

// Define models inline to avoid import issues
const InteriorDesigner = sequelize.define('InteriorDesigner', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    coverImage: DataTypes.STRING,
    city: DataTypes.STRING,
    specializations: DataTypes.ARRAY(DataTypes.STRING),
    rating: DataTypes.FLOAT,
    reviewCount: DataTypes.INTEGER,
    yearsExperience: DataTypes.INTEGER,
    projectsCompleted: DataTypes.INTEGER,
    minBudget: DataTypes.BIGINT,
    maxBudget: DataTypes.BIGINT,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    tags: DataTypes.ARRAY(DataTypes.STRING)
}, { tableName: 'interior_designers' });

const InteriorArticle = sequelize.define('InteriorArticle', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    category: { type: DataTypes.STRING, defaultValue: 'Interiors & Decor' },
    image: DataTypes.STRING,
    excerpt: DataTypes.TEXT,
    content: DataTypes.TEXT,
    author: DataTypes.STRING,
    readTime: DataTypes.STRING,
    publishedAt: DataTypes.DATE,
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'interior_articles' });

// Real Unsplash interior photos (800x600 crop)
const INTERIOR_PHOTOS = [
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
    'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=80',
    'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
    'https://images.unsplash.com/photo-1617104678098-de229db51175?w=800&q=80',
    'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80',
    'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
];

// Logo colors for ui-avatars
const LOGO_COLORS = [
    '8B5CF6', '2563EB', 'D97706', 'DC2626', '059669',
    '7C3AED', 'EA580C', '1E40AF', '0891B2', 'BE185D',
    '374151', 'B45309', '0F172A', '6D28D9', '065F46',
    '9333EA', 'B91C1C', '1D4ED8', '78350F', '047857',
    'DC2626', '374151', '92400E', '7C3AED', '881337',
];

const designers = [
    // AHMEDABAD (10 designers)
    {
        name: 'Archispace Interiors', city: 'Ahmedabad',
        rating: 4.8, reviewCount: 312, yearsExperience: 14, projectsCompleted: 450,
        minBudget: 500000, maxBudget: 5000000,
        specializations: ['Living Room', 'Bedroom', 'Kitchen'],
        description: 'Award-winning interior design firm blending traditional Indian aesthetics with modern minimalism. Trusted by 450+ families across Ahmedabad.',
        address: 'SG Highway, Ahmedabad', phone: '+91 79 4000 1234', email: 'info@archispace.in',
        isFeatured: true, isVerified: true, tags: ['Luxury', 'Residential', 'Award Winning'],
        coverImage: INTERIOR_PHOTOS[0], logo: `https://ui-avatars.com/api/?name=Archispace&background=${LOGO_COLORS[0]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Urban Canvas Designs', city: 'Ahmedabad',
        rating: 4.6, reviewCount: 198, yearsExperience: 9, projectsCompleted: 280,
        minBudget: 300000, maxBudget: 3000000,
        specializations: ['Modular Kitchen', 'Office', 'Commercial'],
        description: 'Contemporary design studio focused on functional spaces. Specialists in modular kitchens and premium workspace transformation.',
        address: 'Prahlad Nagar, Ahmedabad', phone: '+91 79 4000 5678', email: 'hello@urbancanvas.in',
        isFeatured: true, isVerified: true, tags: ['Contemporary', 'Modular', 'Commercial'],
        coverImage: INTERIOR_PHOTOS[1], logo: `https://ui-avatars.com/api/?name=Urban+Canvas&background=${LOGO_COLORS[1]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Neelkanth Decor Studio', city: 'Ahmedabad',
        rating: 4.5, reviewCount: 143, yearsExperience: 11, projectsCompleted: 320,
        minBudget: 200000, maxBudget: 2000000,
        specializations: ['Bedroom', 'Bathroom', 'Wardrobe'],
        description: 'Trusted name in Ahmedabad interior design for over a decade. Premium, budget-friendly solutions for the modern home.',
        address: 'Bopal, Ahmedabad', phone: '+91 79 4000 9012', email: 'info@neelkanthdecor.in',
        isFeatured: false, isVerified: true, tags: ['Budget Friendly', 'Residential'],
        coverImage: INTERIOR_PHOTOS[2], logo: `https://ui-avatars.com/api/?name=Neelkanth&background=${LOGO_COLORS[2]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Luxe Living Concepts', city: 'Ahmedabad',
        rating: 4.9, reviewCount: 89, yearsExperience: 7, projectsCompleted: 175,
        minBudget: 1000000, maxBudget: 10000000,
        specializations: ['Living Room', 'Kitchen', 'Penthouse'],
        description: 'Ultra-premium interior design brand for Ahmedabad\'s elite clientele. Every space is a mastercrafted experience.',
        address: 'Satellite, Ahmedabad', phone: '+91 79 4001 2345', email: 'luxury@luxeliving.in',
        isFeatured: true, isVerified: true, tags: ['Ultra Luxury', 'Premium', 'Bespoke'],
        coverImage: INTERIOR_PHOTOS[3], logo: `https://ui-avatars.com/api/?name=Luxe+Living&background=${LOGO_COLORS[3]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Greenscape Interiors', city: 'Ahmedabad',
        rating: 4.4, reviewCount: 267, yearsExperience: 6, projectsCompleted: 198,
        minBudget: 150000, maxBudget: 1500000,
        specializations: ['Bedroom', 'Living Room', 'Commercial'],
        description: 'Eco-conscious design firm integrating biophilic elements and sustainable materials into every living space.',
        address: 'Naranpura, Ahmedabad', phone: '+91 79 4001 6789', email: 'green@greenscape.in',
        isFeatured: false, isVerified: true, tags: ['Eco-Friendly', 'Sustainable', 'Biophilic'],
        coverImage: INTERIOR_PHOTOS[4], logo: `https://ui-avatars.com/api/?name=Greenscape&background=${LOGO_COLORS[4]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Hues & Textures Studio', city: 'Ahmedabad',
        rating: 4.7, reviewCount: 223, yearsExperience: 13, projectsCompleted: 390,
        minBudget: 300000, maxBudget: 3000000,
        specializations: ['Bedroom', 'Living Room', 'Bathroom'],
        description: 'Masters of color theory and material science. Spaces celebrated for perfect harmony of texture, color and light.',
        address: 'C.G. Road, Ahmedabad', phone: '+91 79 4002 7890', email: 'hues@huestextures.in',
        isFeatured: true, isVerified: true, tags: ['Color Expert', 'Textural', 'Artistic'],
        coverImage: INTERIOR_PHOTOS[9], logo: `https://ui-avatars.com/api/?name=Hues+Textures&background=${LOGO_COLORS[9]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Zen Space Architects', city: 'Ahmedabad',
        rating: 4.5, reviewCount: 134, yearsExperience: 9, projectsCompleted: 210,
        minBudget: 500000, maxBudget: 5000000,
        specializations: ['Minimalist', 'Living Room', 'Bedroom'],
        description: 'Japanese-inspired minimalist design for the modern Indian home. Less is more — but never less than perfect.',
        address: 'Thaltej, Ahmedabad', phone: '+91 79 4003 1234', email: 'zen@zenspace.in',
        isFeatured: false, isVerified: true, tags: ['Minimalist', 'Japanese', 'Zen'],
        coverImage: INTERIOR_PHOTOS[10], logo: `https://ui-avatars.com/api/?name=Zen+Space&background=${LOGO_COLORS[10]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Marquee Interiors', city: 'Ahmedabad',
        rating: 4.8, reviewCount: 289, yearsExperience: 16, projectsCompleted: 520,
        minBudget: 800000, maxBudget: 8000000,
        specializations: ['Luxury', 'Villa', 'Penthouse'],
        description: 'Gujarat\'s premier luxury interior design firm. Creating extraordinary experiences for extraordinary spaces.',
        address: 'Bodakdev, Ahmedabad', phone: '+91 79 4004 5678', email: 'marquee@marquee.in',
        isFeatured: true, isVerified: true, tags: ['Ultra Luxury', 'Villa', 'Penthouse'],
        coverImage: INTERIOR_PHOTOS[18], logo: `https://ui-avatars.com/api/?name=Marquee&background=${LOGO_COLORS[17]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Harmony Homes Design', city: 'Ahmedabad',
        rating: 4.5, reviewCount: 165, yearsExperience: 8, projectsCompleted: 195,
        minBudget: 250000, maxBudget: 2500000,
        specializations: ['Vastu', 'Traditional', 'Living Room'],
        description: 'Vastu-compliant design solutions that harmonize ancient Indian wisdom with modern aesthetics.',
        address: 'Maninagar, Ahmedabad', phone: '+91 79 4004 1234', email: 'harmony@harmonyhomes.in',
        isFeatured: false, isVerified: true, tags: ['Vastu', 'Traditional', 'Harmony'],
        coverImage: INTERIOR_PHOTOS[16], logo: `https://ui-avatars.com/api/?name=Harmony+Homes&background=${LOGO_COLORS[16]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Form & Function Studio', city: 'Ahmedabad',
        rating: 4.6, reviewCount: 178, yearsExperience: 10, projectsCompleted: 245,
        minBudget: 400000, maxBudget: 4000000,
        specializations: ['Scandinavian', 'Minimalist', 'Office'],
        description: 'Scandinavian design principles adapted for Indian homes. Maximum functionality through thoughtful, elegant design.',
        address: 'New Ranip, Ahmedabad', phone: '+91 79 4005 1234', email: 'form@formfunction.in',
        isFeatured: false, isVerified: true, tags: ['Scandinavian', 'Minimalist', 'Functional'],
        coverImage: INTERIOR_PHOTOS[13], logo: `https://ui-avatars.com/api/?name=Form+Function&background=${LOGO_COLORS[20]}&color=fff&size=200&bold=true`
    },

    // GANDHINAGAR (5 designers)
    {
        name: 'Modulo Design Lab', city: 'Gandhinagar',
        rating: 4.7, reviewCount: 156, yearsExperience: 8, projectsCompleted: 230,
        minBudget: 400000, maxBudget: 4000000,
        specializations: ['Kitchen', 'Wardrobe', 'Bedroom'],
        description: 'Gandhinagar\'s premier modular furniture and interior design studio. Precision engineering meets aesthetic brilliance.',
        address: 'Sector 11, Gandhinagar', phone: '+91 79 2322 1234', email: 'info@modulodesign.in',
        isFeatured: true, isVerified: true, tags: ['Modular', 'Precision', 'Modern'],
        coverImage: INTERIOR_PHOTOS[5], logo: `https://ui-avatars.com/api/?name=Modulo+Design&background=${LOGO_COLORS[5]}&color=fff&size=200&bold=true`
    },
    {
        name: 'FutureLiving Design Co.', city: 'Gandhinagar',
        rating: 4.8, reviewCount: 112, yearsExperience: 6, projectsCompleted: 160,
        minBudget: 600000, maxBudget: 6000000,
        specializations: ['Smart Home', 'Office', 'Modular'],
        description: 'Gujarat\'s most innovative studio integrating smart home technology, automation and cutting-edge materials.',
        address: 'Sector 28, Gandhinagar', phone: '+91 79 2322 5678', email: 'future@futureliving.in',
        isFeatured: true, isVerified: true, tags: ['Smart Home', 'Innovative', 'Tech'],
        coverImage: INTERIOR_PHOTOS[12], logo: `https://ui-avatars.com/api/?name=FutureLiving&background=${LOGO_COLORS[12]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Vivid Design Works', city: 'Gandhinagar',
        rating: 4.5, reviewCount: 134, yearsExperience: 7, projectsCompleted: 178,
        minBudget: 300000, maxBudget: 3000000,
        specializations: ['Colorful', 'Kids Room', 'Living Room'],
        description: 'Bold colours and eclectic textures to create truly memorable, vibrant spaces for families.',
        address: 'Sector 25, Gandhinagar', phone: '+91 79 2322 9012', email: 'vivid@vivid.in',
        isFeatured: false, isVerified: true, tags: ['Colorful', 'Vibrant', 'Eclectic'],
        coverImage: INTERIOR_PHOTOS[19], logo: `https://ui-avatars.com/api/?name=Vivid+Design&background=${LOGO_COLORS[19]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Apex Interior Solutions', city: 'Gandhinagar',
        rating: 4.4, reviewCount: 98, yearsExperience: 5, projectsCompleted: 135,
        minBudget: 200000, maxBudget: 2000000,
        specializations: ['Office', 'Commercial', 'Retail'],
        description: 'Specialized in government and commercial office interiors. Clean, professional and functional design with proven track record.',
        address: 'Sector 16, Gandhinagar', phone: '+91 79 2322 3456', email: 'apex@apexinteriors.in',
        isFeatured: false, isVerified: true, tags: ['Office', 'Government', 'Commercial'],
        coverImage: INTERIOR_PHOTOS[20], logo: `https://ui-avatars.com/api/?name=Apex+Interior&background=${LOGO_COLORS[21]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Heritage Craft Interiors', city: 'Gandhinagar',
        rating: 4.6, reviewCount: 87, yearsExperience: 11, projectsCompleted: 165,
        minBudget: 350000, maxBudget: 3500000,
        specializations: ['Traditional', 'Heritage', 'Bedroom'],
        description: 'Celebrating Gujarat\'s rich artistic heritage through handcrafted interior solutions that honor tradition and culture.',
        address: 'Sector 7, Gandhinagar', phone: '+91 79 2322 7890', email: 'heritage@hcraft.in',
        isFeatured: false, isVerified: true, tags: ['Heritage', 'Traditional', 'Handcrafted'],
        coverImage: INTERIOR_PHOTOS[21], logo: `https://ui-avatars.com/api/?name=Heritage+Craft&background=${LOGO_COLORS[22]}&color=fff&size=200&bold=true`
    },

    // SURAT (5 designers)
    {
        name: 'Creative Nest Studios', city: 'Surat',
        rating: 4.5, reviewCount: 211, yearsExperience: 10, projectsCompleted: 310,
        minBudget: 250000, maxBudget: 2500000,
        specializations: ['Living Room', 'Bedroom', 'Commercial'],
        description: 'Boutique design firm known for creative, personalized interior solutions for residential and commercial clients.',
        address: 'Adajan, Surat', phone: '+91 261 400 1234', email: 'nest@creativenest.in',
        isFeatured: true, isVerified: true, tags: ['Boutique', 'Creative', 'Personalized'],
        coverImage: INTERIOR_PHOTOS[6], logo: `https://ui-avatars.com/api/?name=Creative+Nest&background=${LOGO_COLORS[6]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Royal Decor Hub', city: 'Surat',
        rating: 4.4, reviewCount: 187, yearsExperience: 11, projectsCompleted: 340,
        minBudget: 200000, maxBudget: 2000000,
        specializations: ['Traditional', 'Bedroom', 'Pooja Room'],
        description: 'Celebrating Indian heritage through culturally rich interiors with a modern sensibility.',
        address: 'Vesu, Surat', phone: '+91 261 400 5678', email: 'royal@royaldecor.in',
        isFeatured: false, isVerified: true, tags: ['Traditional', 'Heritage', 'Cultural'],
        coverImage: INTERIOR_PHOTOS[11], logo: `https://ui-avatars.com/api/?name=Royal+Decor&background=${LOGO_COLORS[11]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Blueprint Living Surat', city: 'Surat',
        rating: 4.4, reviewCount: 142, yearsExperience: 6, projectsCompleted: 168,
        minBudget: 200000, maxBudget: 2000000,
        specializations: ['Bedroom', 'Kitchen', 'Bathroom'],
        description: 'Systematic approach to interior design: plan → design → execute. On time, every time.',
        address: 'Pal, Surat', phone: '+91 261 400 9012', email: 'blue@blueprintliving.in',
        isFeatured: false, isVerified: true, tags: ['Systematic', 'On-Time', 'Reliable'],
        coverImage: INTERIOR_PHOTOS[22], logo: `https://ui-avatars.com/api/?name=Blueprint+Surat&background=${LOGO_COLORS[23]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Elysian Interiors', city: 'Surat',
        rating: 4.9, reviewCount: 67, yearsExperience: 5, projectsCompleted: 98,
        minBudget: 700000, maxBudget: 7000000,
        specializations: ['Luxury', 'Penthouse', 'Villa'],
        description: 'Surat\'s most exclusive design firm creating paradise-like spaces that transcend ordinary living.',
        address: 'Dumas Road, Surat', phone: '+91 261 400 3456', email: 'elysian@elysianinteriors.in',
        isFeatured: true, isVerified: true, tags: ['Luxury', 'Exclusive', 'Paradise'],
        coverImage: INTERIOR_PHOTOS[14], logo: `https://ui-avatars.com/api/?name=Elysian&background=${LOGO_COLORS[24]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Thread & Stone Interiors', city: 'Surat',
        rating: 4.3, reviewCount: 104, yearsExperience: 7, projectsCompleted: 140,
        minBudget: 180000, maxBudget: 1800000,
        specializations: ['Textile', 'Bedroom', 'Living Room'],
        description: 'Inspired by Surat\'s textile heritage, Thread & Stone creates warmly textured, story-rich living spaces.',
        address: 'Ring Road, Surat', phone: '+91 261 400 7890', email: 'thread@threadstone.in',
        isFeatured: false, isVerified: false, tags: ['Textile', 'Artisan', 'Cultural'],
        coverImage: INTERIOR_PHOTOS[23], logo: `https://ui-avatars.com/api/?name=Thread+Stone&background=${LOGO_COLORS[8]}&color=fff&size=200&bold=true`
    },

    // VADODARA (3 designers)
    {
        name: 'Imperial Interiors', city: 'Vadodara',
        rating: 4.6, reviewCount: 175, yearsExperience: 12, projectsCompleted: 280,
        minBudget: 350000, maxBudget: 3500000,
        specializations: ['Classic', 'Bedroom', 'Living Room'],
        description: 'Timeless interior design solutions for discerning homeowners who appreciate classical elegance.',
        address: 'Alkapuri, Vadodara', phone: '+91 265 400 5678', email: 'imperial@imperial.in',
        isFeatured: false, isVerified: true, tags: ['Classic', 'Contemporary', 'Timeless'],
        coverImage: INTERIOR_PHOTOS[7], logo: `https://ui-avatars.com/api/?name=Imperial+Interiors&background=${LOGO_COLORS[7]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Ornate Abode', city: 'Vadodara',
        rating: 4.7, reviewCount: 156, yearsExperience: 12, projectsCompleted: 290,
        minBudget: 500000, maxBudget: 5000000,
        specializations: ['Classic', 'Baroque', 'Living Room'],
        description: 'European-inspired decor with intricate detailing and rich materials for lovers of ornate classical design.',
        address: 'Fatehgunj, Vadodara', phone: '+91 265 400 3456', email: 'ornate@ornateabode.in',
        isFeatured: true, isVerified: true, tags: ['Classical', 'Baroque', 'Ornate'],
        coverImage: INTERIOR_PHOTOS[17], logo: `https://ui-avatars.com/api/?name=Ornate+Abode&background=${LOGO_COLORS[22]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Arterra Spaces', city: 'Vadodara',
        rating: 4.3, reviewCount: 89, yearsExperience: 7, projectsCompleted: 145,
        minBudget: 200000, maxBudget: 2000000,
        specializations: ['Living Room', 'Kitchen', 'Balcony'],
        description: 'Transforming ordinary interiors into gallery-like experiences. Art meets architecture.',
        address: 'Gotri, Vadodara', phone: '+91 265 400 9012', email: 'art@arterra.in',
        isFeatured: false, isVerified: false, tags: ['Artistic', 'Gallery-like', 'Creative'],
        coverImage: INTERIOR_PHOTOS[2], logo: `https://ui-avatars.com/api/?name=Arterra+Spaces&background=${LOGO_COLORS[15]}&color=fff&size=200&bold=true`
    },

    // RAJKOT (2 designers)
    {
        name: 'Serene Abode Interiors', city: 'Rajkot',
        rating: 4.6, reviewCount: 201, yearsExperience: 10, projectsCompleted: 255,
        minBudget: 150000, maxBudget: 1500000,
        specializations: ['Bedroom', 'Living Room', 'Kids Room'],
        description: 'Rajkot\'s most loved interior design studio creating comfortable, serene environments for families.',
        address: 'Kalawad Road, Rajkot', phone: '+91 281 400 1234', email: 'serene@sereneabode.in',
        isFeatured: true, isVerified: true, tags: ['Family', 'Comfortable', 'Warm'],
        coverImage: INTERIOR_PHOTOS[14], logo: `https://ui-avatars.com/api/?name=Serene+Abode&background=${LOGO_COLORS[14]}&color=fff&size=200&bold=true`
    },
    {
        name: 'Tranquil Touch Design', city: 'Rajkot',
        rating: 4.3, reviewCount: 98, yearsExperience: 5, projectsCompleted: 110,
        minBudget: 150000, maxBudget: 1500000,
        specializations: ['Spa', 'Bedroom', 'Bathroom'],
        description: 'Wellness-inspired interiors that promote relaxation, mental health and holistic living.',
        address: 'University Road, Rajkot', phone: '+91 281 400 5678', email: 'tranquil@tranquiltouch.in',
        isFeatured: false, isVerified: false, tags: ['Wellness', 'Spa', 'Relaxing'],
        coverImage: INTERIOR_PHOTOS[11], logo: `https://ui-avatars.com/api/?name=Tranquil+Touch&background=${LOGO_COLORS[19]}&color=fff&size=200&bold=true`
    }
];

const articles = [
    {
        title: '10 Trending Interior Design Styles for Indian Homes in 2025',
        slug: 'trending-interior-design-styles-2025',
        category: 'Interiors & Decor',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
        excerpt: 'From Japandi to maximalism, explore the design trends redefining Indian interiors this year.',
        content: 'The world of interior design is constantly evolving. In 2025, Indian homeowners are embracing a fascinating blend of global styles adapted to local sensibilities...',
        author: 'Priya Sharma', readTime: '6 min read', publishedAt: new Date('2025-12-10')
    },
    {
        title: 'How to Choose the Perfect Color Palette for Your Living Room',
        slug: 'perfect-color-palette-living-room',
        category: 'Interiors & Decor',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        excerpt: 'Color theory meets practicality in this comprehensive guide to selecting the right tones for your living space.',
        content: 'Color is the most powerful tool in an interior designer\'s arsenal. The right palette can transform a cramped room into an expansive retreat...',
        author: 'Arjun Mehta', readTime: '5 min read', publishedAt: new Date('2025-12-05')
    },
    {
        title: 'Modular Kitchen Design: A Complete Buyer\'s Guide 2025',
        slug: 'modular-kitchen-buyers-guide-2025',
        category: 'Interiors & Decor',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
        excerpt: 'Everything you need to know before investing in a modular kitchen — layouts, materials, costs and finishes.',
        content: 'A modular kitchen is more than just cabinets and countertops. It\'s the heart of your home, a multi-functional space...',
        author: 'Chef Ravi Kumar', readTime: '8 min read', publishedAt: new Date('2025-11-28')
    },
    {
        title: 'Small Apartment? Big Style: Space-Saving Interior Ideas',
        slug: 'small-apartment-space-saving-ideas',
        category: 'Interiors & Decor',
        image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
        excerpt: 'Transform even the tiniest flat into a stylish, functional sanctuary with these clever design hacks.',
        content: 'Living in a small apartment doesn\'t mean sacrificing style or comfort. With the right design strategies...',
        author: 'Neha Patel', readTime: '4 min read', publishedAt: new Date('2025-11-20')
    },
    {
        title: 'Vastu Shastra Meets Modern Interior Design: A Perfect Balance',
        slug: 'vastu-meets-modern-interior-design',
        category: 'Interiors & Decor',
        image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80',
        excerpt: 'Discover how to honor ancient Vastu principles while maintaining a contemporary aesthetic in your home.',
        content: 'Vastu Shastra, the ancient Indian science of architecture and placement, is experiencing a modern revival...',
        author: 'Dr. Sunita Rao', readTime: '7 min read', publishedAt: new Date('2025-11-15')
    },
    {
        title: 'Sustainable Interior Design: Eco-Friendly Choices for Your Home',
        slug: 'sustainable-eco-friendly-interior-design',
        category: 'Interiors & Decor',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        excerpt: 'From recycled materials to energy-efficient lighting, create a beautiful home that is kind to the planet.',
        content: 'Sustainability has moved from a trend to an imperative in modern interior design...',
        author: 'Green Living Team', readTime: '5 min read', publishedAt: new Date('2025-11-08')
    },
    {
        title: 'Bedroom Interior Design: Creating the Ultimate Sleep Sanctuary',
        slug: 'bedroom-interior-ultimate-sleep-sanctuary',
        category: 'Interiors & Decor',
        image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
        excerpt: 'Sleep science meets interior design in this guide to crafting a bedroom that promotes deep, restorative rest.',
        content: 'Your bedroom is the most personal room in your home. It should be a sanctuary from the world...',
        author: 'Dr. Anita Verma', readTime: '6 min read', publishedAt: new Date('2025-11-01')
    },
    {
        title: 'The Rise of Biophilic Design: Bringing Nature Indoors',
        slug: 'biophilic-design-nature-indoors',
        category: 'Interiors & Decor',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        excerpt: 'Indoor plants, natural materials and organic forms are transforming homes into urban biodiversity hubs.',
        content: 'Biophilic design — the practice of connecting human interiors with the natural world — is reshaping how we live...',
        author: 'Rohan Gupta', readTime: '5 min read', publishedAt: new Date('2025-10-25')
    },
    {
        title: 'Smart Home Integration: Designing for the Future Today',
        slug: 'smart-home-integration-design',
        category: 'Interiors & Decor',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        excerpt: 'IoT, automation and smart technology are revolutionizing how we design and experience our homes.',
        content: 'The smart home revolution is here. As technology becomes seamlessly embedded in our environments...',
        author: 'Tech Editorial', readTime: '7 min read', publishedAt: new Date('2025-10-18')
    },
    {
        title: 'Interior Lighting Guide: How Light Can Transform Any Space',
        slug: 'interior-lighting-guide-transform-space',
        category: 'Interiors & Decor',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
        excerpt: 'The secret weapon of every great interior designer? Lighting. Learn how to layer light for maximum impact.',
        content: 'Of all the elements in interior design, lighting is perhaps the most transformative. Yet it is often treated as an afterthought...',
        author: 'Lighting Expert Team', readTime: '6 min read', publishedAt: new Date('2025-10-10')
    }
];

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('✅ DB connected');

        // Sync tables (create if not exists, no alter)
        await InteriorDesigner.sync({ force: false });
        await InteriorArticle.sync({ force: false });
        console.log('✅ Tables synced');

        // Clear existing data
        await InteriorDesigner.destroy({ where: {}, truncate: true });
        await InteriorArticle.destroy({ where: {}, truncate: true });
        console.log('🗑️  Cleared existing data');

        // Insert designers
        await InteriorDesigner.bulkCreate(designers);
        console.log(`✅ Inserted ${designers.length} interior designers`);

        // Insert articles
        await InteriorArticle.bulkCreate(articles);
        console.log(`✅ Inserted ${articles.length} interior articles`);

        console.log('\n🎉 Seeding complete!');
        console.log(`   Designers: ${designers.length}`);
        console.log(`   Ahmedabad: ${designers.filter(d => d.city === 'Ahmedabad').length}`);
        console.log(`   Gandhinagar: ${designers.filter(d => d.city === 'Gandhinagar').length}`);
        console.log(`   Surat: ${designers.filter(d => d.city === 'Surat').length}`);
        console.log(`   Vadodara: ${designers.filter(d => d.city === 'Vadodara').length}`);
        console.log(`   Rajkot: ${designers.filter(d => d.city === 'Rajkot').length}`);
        console.log(`   Articles: ${articles.length}`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error(err.stack);
        process.exit(1);
    }
}

seed();
