'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('interior_articles', [
            {
                title: 'Top 10 Interior Design Trends for 2024',
                slug: 'top-10-interior-design-trends-2024',
                category: 'Interiors & Decor',
                image: 'https://via.placeholder.com/600x400?text=Design+Trends+2024',
                excerpt: 'Discover the latest interior design trends that are dominating the design world in 2024. From bold colors to sustainable materials, learn what\'s in.',
                content: 'The interior design industry is constantly evolving. In 2024, we\'re seeing a shift towards sustainable materials, bold color palettes, and personalized spaces. Designers are breaking away from cookie-cutter trends and creating unique environments that reflect individual personalities. Key trends include: biophilic design, maximalism, artisan craftsmanship, and technology integration.',
                author: 'Design Expert Team',
                readTime: '8 min read',
                publishedAt: new Date('2026-06-01'),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'How to Choose the Right Color Palette for Your Home',
                slug: 'choosing-right-color-palette-home',
                category: 'Interiors & Decor',
                image: 'https://via.placeholder.com/600x400?text=Color+Palette',
                excerpt: 'Learn the art and science behind selecting the perfect color scheme for your interior. Expert tips on color psychology and application.',
                content: 'Colors have a profound impact on the feel of a room. This guide walks you through the color wheel, complementary colors, and how to use them effectively. We discuss warm vs. cool tones, color psychology, and practical tips for small and large spaces. Discover how the right color palette can transform your home and create the ambiance you desire.',
                author: 'Interior Design Specialist',
                readTime: '6 min read',
                publishedAt: new Date('2026-06-02'),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Sustainable Interior Design: Eco-Friendly Choices',
                slug: 'sustainable-interior-design-eco-friendly',
                category: 'Interiors & Decor',
                image: 'https://via.placeholder.com/600x400?text=Eco+Friendly',
                excerpt: 'Make your home beautiful while saving the planet. Explore sustainable materials and eco-friendly interior design practices.',
                content: 'Sustainability is no longer just a trend; it\'s a necessity. Learn about eco-friendly materials like bamboo, reclaimed wood, and recycled fabrics. We discuss how to source sustainable furniture, reduce waste, and create beautiful spaces that are kind to the environment. Includes case studies of eco-friendly interior projects and their impact.',
                author: 'Sustainability Advocate',
                readTime: '7 min read',
                publishedAt: new Date('2026-06-03'),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Maximizing Small Spaces: Smart Design Solutions',
                slug: 'maximizing-small-spaces-design-solutions',
                category: 'Interiors & Decor',
                image: 'https://via.placeholder.com/600x400?text=Small+Spaces',
                excerpt: 'Practical tips and tricks to make your small apartment feel spacious. Learn design strategies that work for compact living.',
                content: 'Living in a small space doesn\'t mean sacrificing style or comfort. This comprehensive guide covers multi-functional furniture, vertical storage, lighting tricks, and color strategies. We share real-life examples of small apartments transformed into beautiful, functional homes. Learn how to use mirrors, colors, and clever layouts to create the illusion of space.',
                author: 'Space Design Specialist',
                readTime: '9 min read',
                publishedAt: new Date('2026-06-04'),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'The Psychology of Interior Design',
                slug: 'psychology-interior-design',
                category: 'Interiors & Decor',
                image: 'https://via.placeholder.com/600x400?text=Design+Psychology',
                excerpt: 'Understand how interior design affects mood, productivity, and well-being. The science behind creating balanced spaces.',
                content: 'Your environment has a profound effect on your mental health and well-being. This article explores color psychology, spatial arrangements, lighting effects, and their impact on mood and productivity. Learn how designers use psychological principles to create spaces that promote relaxation, creativity, or focus. Includes research-backed recommendations.',
                author: 'Design Psychologist',
                readTime: '10 min read',
                publishedAt: new Date('2026-06-05'),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Luxury Interior Design: What Makes a Space Premium',
                slug: 'luxury-interior-design-premium-spaces',
                category: 'Interiors & Decor',
                image: 'https://via.placeholder.com/600x400?text=Luxury+Design',
                excerpt: 'Explore the elements that define luxury interior design. Learn what elevates a space from ordinary to extraordinary.',
                content: 'Luxury is more than just expensive materials. It\'s about craftsmanship, attention to detail, and creating an experience. This guide discusses high-end materials, bespoke designs, and the craftsmanship that defines premium interiors. We explore how luxury designers create timeless spaces and the key elements that make luxury design stand out.',
                author: 'Luxury Design Expert',
                readTime: '8 min read',
                publishedAt: new Date('2026-06-06'),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Home Office Design: Creating the Perfect Workspace',
                slug: 'home-office-design-perfect-workspace',
                category: 'Interiors & Decor',
                image: 'https://via.placeholder.com/600x400?text=Home+Office',
                excerpt: 'Design a home office that boosts productivity and creativity. Essential elements for the perfect work-from-home setup.',
                content: 'With remote work becoming mainstream, a well-designed home office is essential. Learn about ergonomic furniture, lighting, acoustics, and layout principles. We discuss how to create separate work zones, manage distractions, and design spaces that promote focus and productivity. Includes inspiration from successful home offices.',
                author: 'Workspace Designer',
                readTime: '7 min read',
                publishedAt: new Date('2026-06-07'),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Vintage vs. Modern: Creating a Balanced Interior',
                slug: 'vintage-modern-balanced-interior',
                category: 'Interiors & Decor',
                image: 'https://via.placeholder.com/600x400?text=Vintage+Modern',
                excerpt: 'Master the art of blending vintage and modern elements. Create eclectic interiors with timeless appeal.',
                content: 'Mixing vintage and modern styles can create unique, interesting spaces with character. This guide teaches you how to balance old and new, traditional and contemporary. Learn about focal points, color coordination, and proportions when combining styles. Includes examples of successfully mixed-style interiors.',
                author: 'Interior Stylist',
                readTime: '6 min read',
                publishedAt: new Date('2026-06-08'),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Lighting Design: Illuminate Your Space Beautifully',
                slug: 'lighting-design-illuminate-space',
                category: 'Interiors & Decor',
                image: 'https://via.placeholder.com/600x400?text=Lighting+Design',
                excerpt: 'Master the art of interior lighting. Learn how proper lighting can transform any space.',
                content: 'Lighting is crucial in interior design. This comprehensive guide covers different types of lighting (ambient, task, accent), color temperature, and fixture selection. Learn how to layer lighting for different moods, use natural light effectively, and select energy-efficient solutions. Includes practical tips for every room in your home.',
                author: 'Lighting Specialist',
                readTime: '7 min read',
                publishedAt: new Date('2026-06-09'),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Creating Harmony with Feng Shui Interior Design',
                slug: 'feng-shui-interior-design-harmony',
                category: 'Interiors & Decor',
                image: 'https://via.placeholder.com/600x400?text=Feng+Shui',
                excerpt: 'Apply ancient feng shui principles to create harmonious, balanced interiors. Discover the benefits of energy flow in design.',
                content: 'Feng Shui is an ancient Chinese practice that can bring harmony to your living spaces. This guide explains key principles like yin and yang balance, the five elements, and chi flow. Learn how to apply these concepts in your home through furniture placement, colors, and decorative elements. Create spaces that promote peace, prosperity, and well-being.',
                author: 'Feng Shui Master',
                readTime: '8 min read',
                publishedAt: new Date('2026-06-10'),
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('interior_articles', null, {});
    }
};
