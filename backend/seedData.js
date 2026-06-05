const { Article, HeroSlider, Broker, Service, FunFact, InstaReel, Testimonial, Brand, Amenity, TeamMember, sequelize } = require('./models');

async function seedData() {
  try {
    await sequelize.sync({ alter: true });

    // Truncate tables to prevent duplicates
    await Article.destroy({ where: {}, truncate: true, cascade: true });
    await HeroSlider.destroy({ where: {}, truncate: true, cascade: true });
    await Broker.destroy({ where: {}, truncate: true, cascade: true });
    await Service.destroy({ where: {}, truncate: true, cascade: true });
    await FunFact.destroy({ where: {}, truncate: true, cascade: true });
    await InstaReel.destroy({ where: {}, truncate: true, cascade: true });
    await Testimonial.destroy({ where: {}, truncate: true, cascade: true });
    await Brand.destroy({ where: {}, truncate: true, cascade: true });
    await TeamMember.destroy({ where: {}, truncate: true, cascade: true });
    await Amenity.destroy({ where: {}, truncate: true, cascade: true });

    console.log('Tables truncated and synced.');

    // Seed Articles
    const articles = [
      {
        title: 'Luxury Villa in Beverly Hills Sold for $12M',
        category: 'Recently Sold',
        date: 'May 10, 2024',
        image: 'assets/images/property/property-1.jpg',
        excerpt: 'The stunning 5-bedroom villa features a private pool, state-of-the-art home theater, and panoramic city views.',
        content: 'Full details about the Beverly Hills villa sale... (Longer text here)',
        posted_by: 1
      },
      {
        title: 'Modern Penthouse in Manhattan Rented for $15k/mo',
        category: 'Recently Rented',
        date: 'May 08, 2024',
        image: 'assets/images/property/property-2.jpg',
        excerpt: 'Located in the heart of NYC, this penthouse offers 360-degree skyline views and exclusive rooftop access.',
        content: 'Full details about the Manhattan penthouse rental... (Longer text here)',
        posted_by: 1
      },
      {
        title: 'Sustainable Smart Home Sold in Silicon Valley',
        category: 'Recently Sold',
        date: 'May 05, 2024',
        image: 'assets/images/property/property-3.jpg',
        excerpt: 'Equipped with solar panels and AI-driven energy management, this home represents the future of living.',
        content: 'Full details about the Silicon Valley smart home... (Longer text here)',
        posted_by: 1
      }
    ];

    await Article.bulkCreate(articles);
    console.log('Articles seeded.');

    // Seed HeroSliders
    const sliders = [
      {
        title: 'Friuli-Venezia Giulia',
        location: '568 E 1st Ave, Miami',
        type: 'For Rent',
        price: '$550',
        priceUnit: 'Month',
        area: '550 SqFt',
        beds: 6,
        baths: 4,
        garage: 3,
        image: 'assets/images/hero/hero-1.jpg',
        link: '#'
      },
      {
        title: 'Modern Luxury Villa',
        location: '789 Sunset Blvd, Los Angeles',
        type: 'For Sale',
        price: '$1,200,000',
        priceUnit: '',
        area: '3500 SqFt',
        beds: 4,
        baths: 3,
        garage: 2,
        image: 'assets/images/hero/hero-3.jpg',
        link: '#'
      }
    ];

    await HeroSlider.bulkCreate(sliders);
    console.log('Hero sliders seeded.');

    // Seed Brokers
    const brokers = [
      {
        name: 'Donald S. Jenkins',
        designation: 'Senior Real Estate Agent',
        photo: 'assets/images/agent/agent-1.jpg',
        phoneNumber: '+91 98765 43210',
        email: 'donald@realestate.com',
        experience: '10+ Years',
        specialization: 'Luxury Villas',
        facebook: '#', twitter: '#', linkedin: '#', instagram: '#'
      },
      {
        name: 'Elizaeth J. Ohara',
        designation: 'Real Estate Agent',
        photo: 'assets/images/agent/agent-2.jpg',
        phoneNumber: '+91 98765 43211',
        email: 'elizaeth@realestate.com',
        experience: '5+ Years',
        specialization: 'Commercial Property',
        facebook: '#', twitter: '#', linkedin: '#', instagram: '#'
      },
      {
        name: 'Marilyn M. Gills',
        designation: 'Property Consultant',
        photo: 'assets/images/agent/agent-3.jpg',
        phoneNumber: '+91 98765 43212',
        email: 'marilyn@realestate.com',
        experience: '7+ Years',
        specialization: 'Residential Flats',
        facebook: '#', twitter: '#', linkedin: '#', instagram: '#'
      },
      {
        name: 'Robert C. Edwards',
        designation: 'Real Estate Agent',
        photo: 'assets/images/agent/agent-4.jpg',
        phoneNumber: '+91 98765 43213',
        email: 'robert@realestate.com',
        experience: '4+ Years',
        specialization: 'Industrial Plots',
        facebook: '#', twitter: '#', linkedin: '#', instagram: '#'
      }
    ];

    await Broker.bulkCreate(brokers);
    console.log('Brokers seeded.');

    // Seed Services
    const services = [
      { title: 'Buy Property', description: 'Expert guidance in finding and purchasing your dream property.', icon: 'pe-7s-home', image: 'assets/images/service/service-1.png' },
      { title: 'Sale Property', description: 'Maximize your returns with our strategic property selling services.', icon: 'pe-7s-graph1', image: 'assets/images/service/service-2.png' },
      { title: 'Rent Property', description: 'Seamless rental solutions for both landlords and tenants.', icon: 'pe-7s-key', image: 'assets/images/service/service-3.png' },
      { title: 'Mortgage Property', description: 'Helping you secure the best financing for your real estate investments.', icon: 'pe-7s-cash', image: 'assets/images/service/service-4.png' }
    ];

    await Service.bulkCreate(services);
    console.log('Services seeded.');

    // Seed FunFacts
    const funfacts = [
      { title: 'Complete Project', value: '56', icon: 'pe-7s-home' },
      { title: 'Property Sold', value: '35+', icon: 'pe-7s-graph3' },
      { title: 'Happy Clients', value: '25+', icon: 'pe-7s-users' },
      { title: 'Awards Win', value: '5+', icon: 'pe-7s-medal' }
    ];

    await FunFact.bulkCreate(funfacts);
    console.log('FunFacts seeded.');

    // Seed InstaReels
    const reels = [
      { title: 'Modern Interior Design', videoUrl: 'https://www.instagram.com/reels/DA8vDvxS_nS/', thumbnailUrl: 'https://picsum.photos/400/600?random=1' },
      { title: 'Luxury Villa Tour', videoUrl: 'https://www.instagram.com/reels/DA8vDvxS_nS/', thumbnailUrl: 'https://picsum.photos/400/600?random=2' },
      { title: 'Gandhinagar Real Estate Trends', videoUrl: 'https://www.instagram.com/reels/DA8vDvxS_nS/', thumbnailUrl: 'https://picsum.photos/400/600?random=3' }
    ];

    await InstaReel.bulkCreate(reels);
    console.log('InstaReels seeded.');

    // Seed Testimonials
    const testimonials = [
      {
        name: 'James Wilson',
        designation: 'Property Investor',
        content: "Working with this team has been a game-changer for my portfolio. Their attention to detail and market insights are second to none. I've never felt more confident in my real estate decisions.",
        photo: 'assets/images/testimonials/user1.png',
        rating: 5,
        posted_by: 1
      },
      {
        name: 'Sarah Thompson',
        designation: 'Home Owner',
        content: "They found us our dream home in record time! The process was smooth, transparent, and actually enjoyable. Their premium service really stands out from the rest of the market.",
        photo: 'assets/images/testimonials/user2.png',
        rating: 5,
        posted_by: 1
      },
      {
        name: 'Elena Rodriguez',
        designation: 'Business Executive',
        content: "The level of professionalism and the dashing UI of their platform made my search for a corporate headquarters incredibly efficient. Highly recommended for high-end properties.",
        photo: 'assets/images/testimonials/user3.png',
        rating: 5,
        posted_by: 1
      },
      {
        name: 'Michael Chen',
        designation: 'Tech Entrepreneur',
        content: "I was looking for a modern smart-home and they delivered exactly what I needed. Their tech-forward approach to property management and search is exactly what the industry needs.",
        photo: 'assets/images/testimonials/user4.png',
        rating: 5,
        posted_by: 1
      }
    ];

    await Testimonial.bulkCreate(testimonials);
    console.log('Testimonials seeded.');

    // Seed Brands
    const brands = [
      { name: 'Partner 1', image: 'assets/images/brands/brand-1.png' },
      { name: 'Partner 2', image: 'assets/images/brands/brand-2.png' },
      { name: 'Partner 3', image: 'assets/images/brands/brand-3.png' },
      { name: 'Partner 4', image: 'assets/images/brands/brand-4.png' },
      { name: 'Partner 5', image: 'assets/images/brands/brand-5.png' },
      { name: 'Partner 6', image: 'assets/images/brands/brand-6.png' }
    ];

    await Brand.bulkCreate(brands);
    console.log('Brands seeded.');

    // Seed Amenities
    const amenities = [
      // Indoor Amenities
      { title: 'Wi-Fi', type: 'Indoor' },
      { title: 'Air Conditioning', type: 'Indoor' },
      { title: 'Gym', type: 'Indoor' },
      { title: 'Home Theater', type: 'Indoor' },
      { title: 'Furnished', type: 'Indoor' },
      { title: 'Intercom', type: 'Indoor' },
      { title: 'Gas Pipeline', type: 'Indoor' },
      { title: 'Water Purifier', type: 'Indoor' },
      { title: 'Balcony', type: 'Indoor' },
      { title: 'Top floor', type: 'Indoor' },
      { title: 'Central air conditioning', type: 'Indoor' },

      // Outdoor Amenities
      { title: 'Swimming Pool', type: 'Outdoor' },
      { title: 'Garden', type: 'Outdoor' },
      { title: 'Jogging Track', type: 'Outdoor' },
      { title: 'Children Play Area', type: 'Outdoor' },
      { title: '24x7 Security', type: 'Outdoor' },
      { title: 'Power Backup', type: 'Outdoor' },
      { title: 'Parking', type: 'Outdoor' },
      { title: 'Club House', type: 'Outdoor' }
    ];

    await Amenity.bulkCreate(amenities);
    console.log('Amenities seeded.');

    // Seed Visionary Team Members
    const teamMembers = [
      {
        name: 'Alexander Sterling',
        designation: 'Founder & Chief Visionary Officer',
        photo: 'assets/images/agent/agent-1.jpg',
        bio: 'With over 20 years of luxury real estate development experience, Alexander is the guiding force behind our high-performance culture and state-of-the-art developments.',
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#',
        order: 1
      },
      {
        name: 'Victoria Vance',
        designation: 'Managing Director & Head of Residential',
        photo: 'assets/images/agent/agent-2.jpg',
        bio: 'Victoria is a master of market positioning and design coordination, having overseen more than $1.5B in residential sales across premium metros.',
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#',
        order: 2
      },
      {
        name: 'Marcus Thorne',
        designation: 'Director of Smart Tech & Sustainability',
        photo: 'assets/images/agent/agent-3.jpg',
        bio: 'Marcus leads our ecological and tech initiatives, ensuring every property integrates next-gen smart features and conforms to absolute sustainability standards.',
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#',
        order: 3
      },
      {
        name: 'Sophia Mercer',
        designation: 'Principal Architect',
        photo: 'assets/images/agent/agent-4.jpg',
        bio: "Sophia's design philosophy merges organic materials with bold modernist features, crafting spaces that speak to both form and functional brilliance.",
        facebook: '#',
        twitter: '#',
        linkedin: '#',
        instagram: '#',
        order: 4
      }
    ];

    await TeamMember.bulkCreate(teamMembers);
    console.log('Team members seeded.');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
