'use strict';

const { InteriorDesigner, InteriorArticle } = require('../models');

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

const LOGO_COLORS = [
    '8B5CF6', '2563EB', 'D97706', 'DC2626', '059669',
    '7C3AED', 'EA580C', '1E40AF', '0891B2', 'BE185D',
    '374151', 'B45309', '0F172A', '6D28D9', '065F46',
    '9333EA', 'B91C1C', '1D4ED8', '78350F', '047857',
    'DC2626', '374151', '92400E', '7C3AED', '881337',
];

const DB_IMAGES = [
    'assets/images/news/interior-1.jpg',
    'assets/images/news/interior-2.jpg',
    'assets/images/news/interior-3.jpg',
];

const designers = [
    { name: 'Archispace Interiors', city: 'Ahmedabad', rating: 4.8, reviewCount: 312, yearsExperience: 14, projectsCompleted: 450, minBudget: 500000, maxBudget: 5000000, specializations: ['Living Room', 'Bedroom', 'Kitchen'], description: 'Award-winning interior design firm blending traditional Indian aesthetics with modern minimalism.', address: 'SG Highway, Ahmedabad', phone: '+91 79 4000 1234', email: 'info@archispace.in', isFeatured: true, isVerified: true, tags: ['Luxury', 'Residential', 'Award Winning'], coverImage: INTERIOR_PHOTOS[0], logo: `https://ui-avatars.com/api/?name=Archispace&background=${LOGO_COLORS[0]}&color=fff&size=200&bold=true` },
    { name: 'Urban Canvas Designs', city: 'Ahmedabad', rating: 4.6, reviewCount: 198, yearsExperience: 9, projectsCompleted: 280, minBudget: 300000, maxBudget: 3000000, specializations: ['Modular Kitchen', 'Office', 'Commercial'], description: 'Contemporary design studio focused on functional spaces and premium workspace transformation.', address: 'Prahlad Nagar, Ahmedabad', phone: '+91 79 4000 5678', email: 'hello@urbancanvas.in', isFeatured: true, isVerified: true, tags: ['Contemporary', 'Modular', 'Commercial'], coverImage: INTERIOR_PHOTOS[1], logo: `https://ui-avatars.com/api/?name=Urban+Canvas&background=${LOGO_COLORS[1]}&color=fff&size=200&bold=true` },
    { name: 'Neelkanth Decor Studio', city: 'Ahmedabad', rating: 4.5, reviewCount: 143, yearsExperience: 11, projectsCompleted: 320, minBudget: 200000, maxBudget: 2000000, specializations: ['Bedroom', 'Bathroom', 'Wardrobe'], description: 'Trusted name in Ahmedabad interior design for over a decade.', address: 'Bopal, Ahmedabad', phone: '+91 79 4000 9012', email: 'info@neelkanthdecor.in', isFeatured: false, isVerified: true, tags: ['Budget Friendly', 'Residential'], coverImage: INTERIOR_PHOTOS[2], logo: `https://ui-avatars.com/api/?name=Neelkanth&background=${LOGO_COLORS[2]}&color=fff&size=200&bold=true` },
    { name: 'Luxe Living Concepts', city: 'Ahmedabad', rating: 4.9, reviewCount: 89, yearsExperience: 7, projectsCompleted: 175, minBudget: 1000000, maxBudget: 10000000, specializations: ['Living Room', 'Kitchen', 'Penthouse'], description: 'Ultra-premium interior design brand for Ahmedabad\'s elite clientele.', address: 'Satellite, Ahmedabad', phone: '+91 79 4001 2345', email: 'luxury@luxeliving.in', isFeatured: true, isVerified: true, tags: ['Ultra Luxury', 'Premium', 'Bespoke'], coverImage: INTERIOR_PHOTOS[3], logo: `https://ui-avatars.com/api/?name=Luxe+Living&background=${LOGO_COLORS[3]}&color=fff&size=200&bold=true` },
    { name: 'Greenscape Interiors', city: 'Ahmedabad', rating: 4.4, reviewCount: 267, yearsExperience: 6, projectsCompleted: 198, minBudget: 150000, maxBudget: 1500000, specializations: ['Bedroom', 'Living Room', 'Commercial'], description: 'Eco-conscious design firm integrating biophilic elements and sustainable materials.', address: 'Naranpura, Ahmedabad', phone: '+91 79 4001 6789', email: 'green@greenscape.in', isFeatured: false, isVerified: true, tags: ['Eco-Friendly', 'Sustainable', 'Biophilic'], coverImage: INTERIOR_PHOTOS[4], logo: `https://ui-avatars.com/api/?name=Greenscape&background=${LOGO_COLORS[4]}&color=fff&size=200&bold=true` },
    { name: 'Hues & Textures Studio', city: 'Ahmedabad', rating: 4.7, reviewCount: 223, yearsExperience: 13, projectsCompleted: 390, minBudget: 300000, maxBudget: 3000000, specializations: ['Bedroom', 'Living Room', 'Bathroom'], description: 'Masters of color theory and material science for harmonious interiors.', address: 'C.G. Road, Ahmedabad', phone: '+91 79 4002 7890', email: 'hues@huestextures.in', isFeatured: true, isVerified: true, tags: ['Color Expert', 'Textural', 'Artistic'], coverImage: INTERIOR_PHOTOS[9], logo: `https://ui-avatars.com/api/?name=Hues+Textures&background=${LOGO_COLORS[9]}&color=fff&size=200&bold=true` },
    { name: 'Zen Space Architects', city: 'Ahmedabad', rating: 4.5, reviewCount: 134, yearsExperience: 9, projectsCompleted: 210, minBudget: 500000, maxBudget: 5000000, specializations: ['Minimalist', 'Living Room', 'Bedroom'], description: 'Japanese-inspired minimalist design for the modern Indian home.', address: 'Thaltej, Ahmedabad', phone: '+91 79 4003 1234', email: 'zen@zenspace.in', isFeatured: false, isVerified: true, tags: ['Minimalist', 'Japanese', 'Zen'], coverImage: INTERIOR_PHOTOS[10], logo: `https://ui-avatars.com/api/?name=Zen+Space&background=${LOGO_COLORS[10]}&color=fff&size=200&bold=true` },
    { name: 'Prism Interior Studio', city: 'Ahmedabad', rating: 4.2, reviewCount: 76, yearsExperience: 4, projectsCompleted: 95, minBudget: 100000, maxBudget: 1000000, specializations: ['Office', 'Commercial', 'Cafes'], description: 'Fresh perspective on commercial interior design for cafes and co-working spaces.', address: 'Navrangpura, Ahmedabad', phone: '+91 79 4003 5678', email: 'prism@prisminteri.com', isFeatured: false, isVerified: false, tags: ['Cafes', 'Commercial', 'Co-working'], coverImage: INTERIOR_PHOTOS[15], logo: `https://ui-avatars.com/api/?name=Prism+Studio&background=${LOGO_COLORS[15]}&color=fff&size=200&bold=true` },
    { name: 'Marquee Interiors', city: 'Ahmedabad', rating: 4.8, reviewCount: 289, yearsExperience: 16, projectsCompleted: 520, minBudget: 800000, maxBudget: 8000000, specializations: ['Luxury', 'Villa', 'Penthouse'], description: 'Gujarat\'s premier luxury interior design firm for extraordinary spaces.', address: 'Bodakdev, Ahmedabad', phone: '+91 79 4004 5678', email: 'marquee@marqueeinteriors.in', isFeatured: true, isVerified: true, tags: ['Ultra Luxury', 'Villa', 'Penthouse'], coverImage: INTERIOR_PHOTOS[18], logo: `https://ui-avatars.com/api/?name=Marquee+Interiors&background=${LOGO_COLORS[18]}&color=fff&size=200&bold=true` },
    { name: 'Crafted Corners', city: 'Ahmedabad', rating: 4.6, reviewCount: 167, yearsExperience: 8, projectsCompleted: 245, minBudget: 250000, maxBudget: 2500000, specializations: ['Kitchen', 'Wardrobe', 'Bedroom'], description: 'Precision craftsmanship in modular furniture and bespoke interior solutions.', address: 'Vastrapur, Ahmedabad', phone: '+91 79 4005 6789', email: 'crafted@craftedcorners.in', isFeatured: false, isVerified: true, tags: ['Modular', 'Craftsmanship', 'Bespoke'], coverImage: INTERIOR_PHOTOS[20], logo: `https://ui-avatars.com/api/?name=Crafted+Corners&background=${LOGO_COLORS[20]}&color=fff&size=200&bold=true` },
    { name: 'Modulo Design Lab', city: 'Gandhinagar', rating: 4.7, reviewCount: 156, yearsExperience: 8, projectsCompleted: 230, minBudget: 400000, maxBudget: 4000000, specializations: ['Kitchen', 'Wardrobe', 'Bedroom'], description: 'Gandhinagar\'s premier modular furniture and interior design studio.', address: 'Sector 11, Gandhinagar', phone: '+91 79 2322 1234', email: 'info@modulodesign.in', isFeatured: true, isVerified: true, tags: ['Modular', 'Precision', 'Modern'], coverImage: INTERIOR_PHOTOS[5], logo: `https://ui-avatars.com/api/?name=Modulo+Design&background=${LOGO_COLORS[5]}&color=fff&size=200&bold=true` },
    { name: 'Luxury Interiors Studio', city: 'Gandhinagar', rating: 4.8, reviewCount: 110, yearsExperience: 13, projectsCompleted: 170, minBudget: 300000, maxBudget: 8000000, specializations: ['Luxury', 'Bespoke', 'Customized'], description: 'Creating bespoke luxury interiors tailored to your unique lifestyle.', address: 'Sector 25, Gandhinagar', phone: '+91 79 2330 1111', email: 'studio@luxuryint.in', isFeatured: true, isVerified: true, tags: ['Luxury', 'Bespoke', 'Customized'], coverImage: INTERIOR_PHOTOS[6], logo: `https://ui-avatars.com/api/?name=Luxury+Studio&background=${LOGO_COLORS[6]}&color=fff&size=200&bold=true` },
    { name: 'Vivid Design Works', city: 'Gandhinagar', rating: 4.5, reviewCount: 134, yearsExperience: 7, projectsCompleted: 178, minBudget: 300000, maxBudget: 3000000, specializations: ['Colorful', 'Kids Room', 'Living Room'], description: 'Vibrant and expressive interior design with bold colours and eclectic textures.', address: 'Sector 25, Gandhinagar', phone: '+91 79 2322 9012', email: 'vivid@vividdesign.in', isFeatured: false, isVerified: true, tags: ['Colorful', 'Vibrant', 'Eclectic'], coverImage: INTERIOR_PHOTOS[19], logo: `https://ui-avatars.com/api/?name=Vivid+Design&background=${LOGO_COLORS[19]}&color=fff&size=200&bold=true` },
    { name: 'Artisan & Craft Interiors', city: 'Gandhinagar', rating: 4.7, reviewCount: 82, yearsExperience: 12, projectsCompleted: 140, minBudget: 90000, maxBudget: 3200000, specializations: ['Artisan', 'Handcrafted', 'Ethnic'], description: 'Handcrafted and artisan elements celebrating local craftsmanship.', address: 'Sector 18, Gandhinagar', phone: '+91 79 2353 5555', email: 'artisan@artisancraft.in', isFeatured: false, isVerified: true, tags: ['Artisan', 'Handcrafted', 'Ethnic'], coverImage: INTERIOR_PHOTOS[12], logo: `https://ui-avatars.com/api/?name=Artisan+Craft&background=${LOGO_COLORS[12]}&color=fff&size=200&bold=true` },
    { name: 'Creative Nest Studios', city: 'Surat', rating: 4.5, reviewCount: 211, yearsExperience: 10, projectsCompleted: 310, minBudget: 250000, maxBudget: 2500000, specializations: ['Living Room', 'Bedroom', 'Commercial'], description: 'Surat-based boutique design firm for personalized interior solutions.', address: 'Adajan, Surat', phone: '+91 261 400 1234', email: 'nest@creativenest.in', isFeatured: true, isVerified: true, tags: ['Boutique', 'Creative', 'Personalized'], coverImage: INTERIOR_PHOTOS[6], logo: `https://ui-avatars.com/api/?name=Creative+Nest&background=${LOGO_COLORS[7]}&color=fff&size=200&bold=true` },
    { name: 'Royal Decor Hub', city: 'Surat', rating: 4.4, reviewCount: 187, yearsExperience: 11, projectsCompleted: 340, minBudget: 200000, maxBudget: 2000000, specializations: ['Traditional', 'Bedroom', 'Pooja Room'], description: 'Culturally rich interiors with a modern sensibility.', address: 'Vesu, Surat', phone: '+91 261 400 5678', email: 'royal@royaldecor.in', isFeatured: false, isVerified: true, tags: ['Traditional', 'Heritage', 'Cultural'], coverImage: INTERIOR_PHOTOS[11], logo: `https://ui-avatars.com/api/?name=Royal+Decor&background=${LOGO_COLORS[11]}&color=fff&size=200&bold=true` },
    { name: 'Blueprint Living', city: 'Surat', rating: 4.4, reviewCount: 142, yearsExperience: 6, projectsCompleted: 168, minBudget: 200000, maxBudget: 2000000, specializations: ['Bedroom', 'Kitchen', 'Bathroom'], description: 'Systematic approach to interior design — plan, design, execute on time.', address: 'Pal, Surat', phone: '+91 261 400 9012', email: 'blue@blueprintliving.in', isFeatured: false, isVerified: true, tags: ['Systematic', 'On-Time', 'Reliable'], coverImage: INTERIOR_PHOTOS[5], logo: `https://ui-avatars.com/api/?name=Blueprint+Living&background=${LOGO_COLORS[17]}&color=fff&size=200&bold=true` },
    { name: 'Imperial Interiors', city: 'Vadodara', rating: 4.6, reviewCount: 175, yearsExperience: 12, projectsCompleted: 280, minBudget: 350000, maxBudget: 3500000, specializations: ['Classic', 'Bedroom', 'Living Room'], description: 'Timeless interior design solutions for discerning homeowners.', address: 'Alkapuri, Vadodara', phone: '+91 265 400 5678', email: 'imperial@imperialinteriors.in', isFeatured: false, isVerified: true, tags: ['Classic', 'Contemporary', 'Timeless'], coverImage: INTERIOR_PHOTOS[7], logo: `https://ui-avatars.com/api/?name=Imperial+Interiors&background=${LOGO_COLORS[8]}&color=fff&size=200&bold=true` },
    { name: 'Ornate Abode', city: 'Vadodara', rating: 4.7, reviewCount: 128, yearsExperience: 15, projectsCompleted: 195, minBudget: 500000, maxBudget: 5000000, specializations: ['Classic', 'Baroque', 'Living Room'], description: 'European-inspired decor with intricate detailing and rich materials.', address: 'Fatehgunj, Vadodara', phone: '+91 265 400 3456', email: 'ornate@ornateabode.in', isFeatured: true, isVerified: true, tags: ['Classical', 'Baroque', 'Ornate'], coverImage: INTERIOR_PHOTOS[17], logo: `https://ui-avatars.com/api/?name=Ornate+Abode&background=${LOGO_COLORS[22]}&color=fff&size=200&bold=true` },
    { name: 'Arterra Spaces', city: 'Vadodara', rating: 4.3, reviewCount: 89, yearsExperience: 7, projectsCompleted: 145, minBudget: 200000, maxBudget: 2000000, specializations: ['Living Room', 'Kitchen', 'Balcony'], description: 'Transforming ordinary interiors into gallery-like experiences.', address: 'Gotri, Vadodara', phone: '+91 265 400 9012', email: 'art@arterra.in', isFeatured: false, isVerified: false, tags: ['Artistic', 'Gallery-like', 'Creative'], coverImage: INTERIOR_PHOTOS[2], logo: `https://ui-avatars.com/api/?name=Arterra+Spaces&background=${LOGO_COLORS[15]}&color=fff&size=200&bold=true` },
    { name: 'Serene Abode Interiors', city: 'Rajkot', rating: 4.6, reviewCount: 201, yearsExperience: 10, projectsCompleted: 255, minBudget: 150000, maxBudget: 1500000, specializations: ['Bedroom', 'Living Room', 'Kids Room'], description: 'Rajkot\'s most loved studio creating comfortable, serene family homes.', address: 'Kalawad Road, Rajkot', phone: '+91 281 400 1234', email: 'serene@sereneabode.in', isFeatured: true, isVerified: true, tags: ['Family', 'Comfortable', 'Warm'], coverImage: INTERIOR_PHOTOS[14], logo: `https://ui-avatars.com/api/?name=Serene+Abode&background=${LOGO_COLORS[14]}&color=fff&size=200&bold=true` },
    { name: 'Tranquil Touch Design', city: 'Rajkot', rating: 4.3, reviewCount: 98, yearsExperience: 5, projectsCompleted: 110, minBudget: 150000, maxBudget: 1500000, specializations: ['Spa', 'Bedroom', 'Bathroom'], description: 'Wellness-inspired interiors promoting relaxation and holistic living.', address: 'University Road, Rajkot', phone: '+91 281 400 5678', email: 'tranquil@tranquiltouch.in', isFeatured: false, isVerified: false, tags: ['Wellness', 'Spa', 'Relaxing'], coverImage: INTERIOR_PHOTOS[11], logo: `https://ui-avatars.com/api/?name=Tranquil+Touch&background=${LOGO_COLORS[19]}&color=fff&size=200&bold=true` },
    { name: 'Elite Interiors Ahmedabad', city: 'Ahmedabad', rating: 4.8, reviewCount: 127, yearsExperience: 12, projectsCompleted: 250, minBudget: 100000, maxBudget: 5000000, specializations: ['Residential', 'Modern', 'Luxury'], description: 'Award-winning studio specializing in modern and luxurious residential spaces.', address: 'S.G. Highway, Ahmedabad', phone: '+91-79-2600-1111', email: 'info@eliteinteriors.in', isFeatured: true, isVerified: true, tags: ['luxury', 'modern', 'residential'], coverImage: INTERIOR_PHOTOS[21], logo: `https://ui-avatars.com/api/?name=Elite+Interiors&background=${LOGO_COLORS[21]}&color=fff&size=200&bold=true` },
    { name: 'Designers Dream Studio', city: 'Ahmedabad', rating: 4.7, reviewCount: 98, yearsExperience: 10, projectsCompleted: 180, minBudget: 75000, maxBudget: 3000000, specializations: ['Contemporary', 'Minimalist', 'Eco-friendly'], description: 'Sustainable and eco-friendly contemporary interior design solutions.', address: 'CG Road, Ahmedabad', phone: '+91-79-2644-5555', email: 'hello@designersdream.com', isFeatured: true, isVerified: true, tags: ['contemporary', 'eco-friendly', 'minimalist'], coverImage: INTERIOR_PHOTOS[22], logo: `https://ui-avatars.com/api/?name=Designers+Dream&background=${LOGO_COLORS[23]}&color=fff&size=200&bold=true` },
    { name: 'Heritage Designs Co.', city: 'Ahmedabad', rating: 4.6, reviewCount: 85, yearsExperience: 15, projectsCompleted: 220, minBudget: 80000, maxBudget: 4000000, specializations: ['Traditional', 'Classic', 'Fusion'], description: 'Traditional and heritage-inspired design blending classic aesthetics with modern function.', address: 'Vastrapur, Ahmedabad', phone: '+91-79-2656-2222', email: 'contact@heritagedesigns.in', isFeatured: true, isVerified: true, tags: ['traditional', 'classic', 'fusion'], coverImage: INTERIOR_PHOTOS[23], logo: `https://ui-avatars.com/api/?name=Heritage+Designs&background=${LOGO_COLORS[24]}&color=fff&size=200&bold=true` },
];

const articles = [
    { title: '10 Trending Interior Design Styles for Indian Homes in 2025', slug: 'trending-interior-design-styles-2025', category: 'Luxury', image: DB_IMAGES[0], excerpt: 'From Japandi to maximalism, explore the design trends redefining Indian interiors this year.', content: 'The world of interior design is constantly evolving...', author: 'Priya Sharma', readTime: '6 min read', publishedAt: new Date('2025-12-10') },
    { title: 'How to Choose the Perfect Color Palette for Your Living Room', slug: 'perfect-color-palette-living-room', category: 'Living Room', image: DB_IMAGES[1], excerpt: 'Color theory meets practicality in this comprehensive guide to selecting the right tones for your living space.', content: 'Color is the most powerful tool...', author: 'Arjun Mehta', readTime: '5 min read', publishedAt: new Date('2025-12-05') },
    { title: 'Modular Kitchen Design: A Complete Buyer\'s Guide 2025', slug: 'modular-kitchen-buyers-guide-2025', category: 'Modular', image: DB_IMAGES[2], excerpt: 'Everything you need to know before investing in a modular kitchen — layouts, materials, costs and finishes.', content: 'A modular kitchen is more than just...', author: 'Chef Ravi Kumar', readTime: '8 min read', publishedAt: new Date('2025-11-28') },
    { title: 'Small Apartment? Big Style: Space-Saving Interior Ideas', slug: 'small-apartment-space-saving-ideas', category: 'Luxury', image: INTERIOR_PHOTOS[13], excerpt: 'Transform even the tiniest flat into a stylish, functional sanctuary with these clever design hacks.', content: 'Living in a small apartment...', author: 'Neha Patel', readTime: '4 min read', publishedAt: new Date('2025-11-20') },
    { title: 'Vastu Shastra Meets Modern Interior Design: A Perfect Balance', slug: 'vastu-meets-modern-interior-design', category: 'Living Room', image: INTERIOR_PHOTOS[16], excerpt: 'Discover how to honor ancient Vastu principles while maintaining a contemporary aesthetic in your home.', content: 'Vastu Shastra, the ancient Indian science...', author: 'Dr. Sunita Rao', readTime: '7 min read', publishedAt: new Date('2025-11-15') },
    { title: 'Sustainable Interior Design: Eco-Friendly Choices for Your Home', slug: 'sustainable-eco-friendly-interior-design', category: 'Office', image: INTERIOR_PHOTOS[3], excerpt: 'From recycled materials to energy-efficient lighting, create a beautiful home that is kind to the planet.', content: 'Sustainability has moved from a trend...', author: 'Green Living Team', readTime: '5 min read', publishedAt: new Date('2025-11-08') },
    { title: 'Bedroom Interior Design: Creating the Ultimate Sleep Sanctuary', slug: 'bedroom-interior-ultimate-sleep-sanctuary', category: 'Bedroom', image: INTERIOR_PHOTOS[19], excerpt: 'Sleep science meets interior design in this guide to crafting a bedroom that promotes deep, restorative rest.', content: 'Your bedroom is the most personal room...', author: 'Dr. Anita Verma', readTime: '6 min read', publishedAt: new Date('2025-11-01') },
    { title: 'Maximizing Functionality in a Modern Kitchen', slug: 'maximizing-kitchen-functionality', category: 'Kitchen', image: INTERIOR_PHOTOS[11], excerpt: 'Learn how to arrange your kitchen appliances and cabinets for maximum efficiency.', content: 'Functionality is key in a modern kitchen...', author: 'Karan Shah', readTime: '5 min read', publishedAt: new Date('2025-10-30') },
    { title: 'Luxury Bathroom Designs: Bringing the Spa Experience Home', slug: 'luxury-bathroom-spa-experience', category: 'Bathroom', image: INTERIOR_PHOTOS[17], excerpt: 'Discover how to transform your bathroom into a luxury spa retreat.', content: 'The bathroom is no longer just a utility space...', author: 'Sneha Rao', readTime: '6 min read', publishedAt: new Date('2025-10-25') },
    { title: 'Office Interior Design: Boosting Productivity with Layout', slug: 'office-layout-productivity', category: 'Office', image: INTERIOR_PHOTOS[8], excerpt: 'How your office environment affects your focus and work output.', content: 'A well-designed office can significantly increase productivity...', author: 'Vikram Joshi', readTime: '7 min read', publishedAt: new Date('2025-10-20') },
    { title: 'Modular Furniture: The Future of Urban Living', slug: 'modular-furniture-future', category: 'Modular', image: INTERIOR_PHOTOS[10], excerpt: 'Why modular furniture is the best solution for the evolving urban landscape.', content: 'As city apartments get smaller, furniture needs to get smarter...', author: 'Anjali Desai', readTime: '5 min read', publishedAt: new Date('2025-10-15') },
    { title: 'Creating the Perfect Kids Bedroom', slug: 'perfect-kids-bedroom', category: 'Bedroom', image: INTERIOR_PHOTOS[20], excerpt: 'A guide to designing a space that grows with your child.', content: 'Designing a kids bedroom requires a balance between playfulness and practicality...', author: 'Rahul Kapoor', readTime: '6 min read', publishedAt: new Date('2025-10-10') },
    { title: 'Minimalist Living Room Ideas for a Calmer Home', slug: 'minimalist-living-room-ideas', category: 'Living Room', image: INTERIOR_PHOTOS[12], excerpt: 'Embrace the "less is more" philosophy in your main living space.', content: 'Minimalism is not about having nothing...', author: 'Zoya Khan', readTime: '4 min read', publishedAt: new Date('2025-10-05') },
    { title: 'The Ultimate Guide to Kitchen Lighting', slug: 'kitchen-lighting-guide', category: 'Kitchen', image: INTERIOR_PHOTOS[18], excerpt: 'Layering lights for task work, ambiance, and style in your kitchen.', content: 'Lighting can make or break a kitchen design...', author: 'Amit Patel', readTime: '5 min read', publishedAt: new Date('2025-09-28') }
];

async function ensureInteriorData() {
    const { InteriorArticle, Article, User } = require('../models');

    const designerCount = await InteriorDesigner.count({ where: { isDeleted: false } });
    const articleCount = await InteriorArticle.count({ where: { isDeleted: false } });

    let seededDesigners = false;
    let seededArticles = false;

    if (designerCount < 20) {
        await InteriorDesigner.bulkCreate(designers);
        seededDesigners = true;
        console.log(`✅ Seeded ${designers.length} interior designers`);
    }

    if (articleCount === 0) {
        await InteriorArticle.bulkCreate(articles);
        seededArticles = true;
        console.log(`✅ Seeded ${articles.length} interior articles`);
    } else {
        // Update images for all articles to ensure they use DB links
        const existingArticles = await InteriorArticle.findAll();
        for (let i = 0; i < existingArticles.length; i++) {
            const seedArt = articles[i % articles.length];
            if (existingArticles[i].image.includes('placeholder')) {
                await existingArticles[i].update({ image: seedArt.image });
                seededArticles = true;
            }
        }

        // Also check for new ones
        for (const art of articles) {
            const [item, created] = await InteriorArticle.findOrCreate({
                where: { slug: art.slug },
                defaults: art
            });
            if (created) seededArticles = true;
        }
    }

    // Also seed the main Article table with a subset of these for site-wide visibility
    try {
        const mainArticleCount = await Article.count({ where: { category: { [require('sequelize').Op.iLike]: '%Interior%' } } });
        if (mainArticleCount < 5) {
            const adminUser = await User.findOne({ where: { role: 'superadmin' } });
            const mainArticles = articles.slice(0, 8).map(a => ({
                title: a.title,
                category: 'Interiors',
                date: a.publishedAt.toLocaleDateString(),
                image: a.image,
                excerpt: a.excerpt,
                content: a.content,
                posted_by: adminUser ? adminUser.id : 1,
                isDeleted: false
            }));
            await Article.bulkCreate(mainArticles);
            console.log(`✅ Seeded ${mainArticles.length} interior articles into main News table`);
        }
    } catch (e) {
        console.error('Failed to seed main articles:', e.message);
    }

    if (!seededDesigners && !seededArticles) {
        console.log(`ℹ️  Interior data ready (${designerCount} designers, ${articleCount} articles)`);
    }

    return { designerCount: designerCount || designers.length, articleCount: articleCount || articles.length, seededDesigners, seededArticles };
}

module.exports = { ensureInteriorData, designers, articles };


