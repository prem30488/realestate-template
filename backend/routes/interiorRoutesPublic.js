const express = require('express');
const { InteriorDesigner, InteriorArticle, sequelize } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

console.log('✅ interiorRoutesPublic.js loaded - setting up routes...');

// ============ INTERIOR DESIGNERS ROUTES ============

// GET all interior designers with pagination and filters
router.get('/public/interior-designers', async (req, res) => {
    console.log('🔵 GET /public/interior-designers called');
    try {
        const { page = 1, limit = 20, city, search, sort = 'rating' } = req.query;
        const offset = (page - 1) * limit;

        const where = { isDeleted: false };

        // Filter by city
        if (city && city.toLowerCase() !== 'all') {
            where.city = { [Op.iLike]: `%${city}%` };
        }

        // Search by name, specializations, or tags
        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } },
                { specializations: { [Op.contains]: [search] } }
            ];
        }

        // Determine sort order
        let order = [['rating', 'DESC']];
        if (sort === 'name') order = [['name', 'ASC']];
        else if (sort === 'experience') order = [['yearsExperience', 'DESC']];
        else if (sort === 'projects') order = [['projectsCompleted', 'DESC']];
        else if (sort === 'featured') order = [['isFeatured', 'DESC'], ['rating', 'DESC']];

        const { count, rows } = await InteriorDesigner.findAndCountAll({
            where,
            order,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                pages: Math.ceil(count / limit),
                currentPage: parseInt(page),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching interior designers:', error);
        res.status(500).json({ success: false, message: 'Error fetching designers', error: error.message });
    }
});

// GET top featured interior designers for a city
router.get('/public/interior-designers/featured/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const { limit = 5 } = req.query;

        const designers = await InteriorDesigner.findAll({
            where: {
                city: { [Op.iLike]: `%${city}%` },
                isDeleted: false,
                isVerified: true
            },
            order: [
                ['isFeatured', 'DESC'],
                ['rating', 'DESC'],
                ['reviewCount', 'DESC']
            ],
            limit: parseInt(limit)
        });

        res.json({
            success: true,
            data: designers,
            count: designers.length
        });
    } catch (error) {
        console.error('Error fetching featured designers:', error);
        res.status(500).json({ success: false, message: 'Error fetching featured designers', error: error.message });
    }
});

// GET single interior designer by ID
router.get('/public/interior-designers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!/^\d+$/.test(id)) {
            return res.status(404).json({ success: false, message: 'Designer not found' });
        }

        const designer = await InteriorDesigner.findByPk(id);

        if (!designer || designer.isDeleted) {
            return res.status(404).json({ success: false, message: 'Designer not found' });
        }

        res.json({ success: true, data: designer });
    } catch (error) {
        console.error('Error fetching designer details:', error);
        res.status(500).json({ success: false, message: 'Error fetching designer details', error: error.message });
    }
});

// GET designers by specialization
router.get('/public/interior-designers/by-specialization/:specialization', async (req, res) => {
    try {
        const { specialization } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows } = await InteriorDesigner.findAndCountAll({
            where: {
                isDeleted: false,
                specializations: { [Op.contains]: [specialization] }
            },
            order: [['rating', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                pages: Math.ceil(count / limit),
                currentPage: parseInt(page),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching designers by specialization:', error);
        res.status(500).json({ success: false, message: 'Error fetching designers', error: error.message });
    }
});

// GET unique cities with designers
router.get('/public/interior-designers-cities', async (req, res) => {
    try {
        const cities = await InteriorDesigner.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('city')), 'city']],
            where: { isDeleted: false },
            raw: true,
            order: [['city', 'ASC']]
        });

        const cityList = cities.map(c => c.city).filter(Boolean);

        res.json({
            success: true,
            cities: cityList,
            count: cityList.length
        });
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ success: false, message: 'Error fetching cities', error: error.message });
    }
});

// ============ INTERIOR ARTICLES ROUTES ============

// GET all interior articles with pagination
router.get('/public/interior-articles', async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category } = req.query;
        const offset = (page - 1) * limit;

        const where = { isDeleted: false };

        if (category && category.toLowerCase() !== 'all') {
            where.category = { [Op.iLike]: category };
        }

        if (search) {
            where[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { excerpt: { [Op.iLike]: `%${search}%` } },
                { content: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const { count, rows } = await InteriorArticle.findAndCountAll({
            where,
            order: [['publishedAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                pages: Math.ceil(count / limit),
                currentPage: parseInt(page),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ success: false, message: 'Error fetching articles', error: error.message });
    }
});

// GET latest interior articles for carousel/slider
router.get('/public/interior-articles/latest', async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const articles = await InteriorArticle.findAll({
            where: { isDeleted: false },
            order: [['publishedAt', 'DESC']],
            limit: parseInt(limit)
        });

        res.json({
            success: true,
            data: articles,
            count: articles.length
        });
    } catch (error) {
        console.error('Error fetching latest articles:', error);
        res.status(500).json({ success: false, message: 'Error fetching articles', error: error.message });
    }
});

// GET single article by slug (must be before :id route)
router.get('/public/interior-articles/slug/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        const article = await InteriorArticle.findOne({
            where: {
                slug: slug,
                isDeleted: false
            }
        });

        if (!article) {
            return res.status(404).json({ success: false, message: 'Article not found' });
        }

        res.json({ success: true, data: article });
    } catch (error) {
        console.error('Error fetching article by slug:', error);
        res.status(500).json({ success: false, message: 'Error fetching article', error: error.message });
    }
});

// GET single article by ID
router.get('/public/interior-articles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!/^\d+$/.test(id)) {
            return res.status(404).json({ success: false, message: 'Article not found' });
        }

        const article = await InteriorArticle.findByPk(id);

        if (!article || article.isDeleted) {
            return res.status(404).json({ success: false, message: 'Article not found' });
        }

        res.json({ success: true, data: article });
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ success: false, message: 'Error fetching article', error: error.message });
    }
});

// GET article categories
router.get('/public/interior-articles-categories', async (req, res) => {
    try {
        const categories = await InteriorArticle.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']],
            where: { isDeleted: false },
            raw: true,
            order: [['category', 'ASC']]
        });

        const categoryList = categories.map(c => c.category).filter(Boolean);

        res.json({
            success: true,
            categories: categoryList,
            count: categoryList.length
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: 'Error fetching categories', error: error.message });
    }
});

module.exports = router;
