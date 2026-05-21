const express = require('express');
const { Locality, City } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const jwt = require('jsonwebtoken');

// Middleware for authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Authentication required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// Middleware for authorization (Superadmin or Admin with specific privilege)
const authorizeManager = (privilege) => {
    return async (req, res, next) => {
        try {
            const { User } = require('../models');
            const user = await User.findByPk(req.user.id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            if (user.role === 'superadmin') {
                return next();
            }

            if (user.role === 'admin' && user.privileges && user.privileges.includes(privilege)) {
                return next();
            }

            res.status(403).json({ message: 'Access denied: Insufficient privileges' });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    };
};

// GET public localities list by city name (or all if not specified)
router.get('/public/localities', async (req, res) => {
    try {
        const { city } = req.query;
        const where = {};
        
        if (city) {
            const cityRecord = await City.findOne({
                where: { name: { [Op.iLike]: city } }
            });
            if (cityRecord) {
                where.city_id = cityRecord.id;
            } else {
                return res.json({ success: true, data: [] });
            }
        }

        const localities = await Locality.findAll({
            where,
            include: [{ model: City, as: 'city', attributes: ['id', 'name'] }],
            order: [['name', 'ASC']]
        });

        res.json({ success: true, data: localities });
    } catch (error) {
        console.error('Error fetching public localities:', error);
        res.status(500).json({ success: false, message: 'Error fetching localities', error: error.message });
    }
});

// GET all localities with search and pagination
router.get('/localities', authenticateToken, authorizeManager('localities'), async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', city_id } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const where = {};

        // Add search filter
        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { postal_code: { [Op.iLike]: `%${search}%` } }
            ];
        }

        // Add city filter
        if (city_id) {
            where.city_id = parseInt(city_id);
        }

        const { count, rows } = await Locality.findAndCountAll({
            where,
            include: [{ model: City, as: 'city', attributes: ['id', 'name'] }],
            offset,
            limit: parseInt(limit),
            order: [['name', 'ASC']]
        });

        const totalPages = Math.ceil(count / parseInt(limit));

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages
            }
        });
    } catch (error) {
        console.error('Error fetching localities:', error);
        res.status(500).json({ success: false, message: 'Error fetching localities', error: error.message });
    }
});

// GET single locality by ID
router.get('/localities/:id', authenticateToken, authorizeManager('localities'), async (req, res) => {
    try {
        const locality = await Locality.findByPk(req.params.id, {
            include: [{ model: City, as: 'city', attributes: ['id', 'name'] }]
        });

        if (!locality) {
            return res.status(404).json({ success: false, message: 'Locality not found' });
        }

        res.json({ success: true, data: locality });
    } catch (error) {
        console.error('Error fetching locality:', error);
        res.status(500).json({ success: false, message: 'Error fetching locality', error: error.message });
    }
});

// CREATE new locality
router.post('/localities', authenticateToken, authorizeManager('localities'), async (req, res) => {
    try {
        const { city_id, name, postal_code, latitude, longitude } = req.body;

        if (!city_id || !name) {
            return res.status(400).json({ success: false, message: 'city_id and name are required' });
        }

        // Verify city exists
        const city = await City.findByPk(city_id);
        if (!city) {
            return res.status(404).json({ success: false, message: 'City not found' });
        }

        const locality = await Locality.create({
            city_id,
            name,
            postal_code,
            latitude,
            longitude
        });

        const localityWithCity = await Locality.findByPk(locality.id, {
            include: [{ model: City, as: 'city', attributes: ['id', 'name'] }]
        });

        res.status(201).json({ success: true, message: 'Locality created successfully', data: localityWithCity });
    } catch (error) {
        console.error('Error creating locality:', error);
        res.status(500).json({ success: false, message: 'Error creating locality', error: error.message });
    }
});

// UPDATE locality
router.put('/localities/:id', authenticateToken, authorizeManager('localities'), async (req, res) => {
    try {
        const { city_id, name, postal_code, latitude, longitude } = req.body;

        const locality = await Locality.findByPk(req.params.id);
        if (!locality) {
            return res.status(404).json({ success: false, message: 'Locality not found' });
        }

        // Verify city exists if city_id is being updated
        if (city_id && city_id !== locality.city_id) {
            const city = await City.findByPk(city_id);
            if (!city) {
                return res.status(404).json({ success: false, message: 'City not found' });
            }
        }

        const updateData = {};
        if (city_id) updateData.city_id = city_id;
        if (name) updateData.name = name;
        if (postal_code) updateData.postal_code = postal_code;
        if (latitude) updateData.latitude = latitude;
        if (longitude) updateData.longitude = longitude;

        await locality.update(updateData);

        const updatedLocality = await Locality.findByPk(req.params.id, {
            include: [{ model: City, as: 'city', attributes: ['id', 'name'] }]
        });

        res.json({ success: true, message: 'Locality updated successfully', data: updatedLocality });
    } catch (error) {
        console.error('Error updating locality:', error);
        res.status(500).json({ success: false, message: 'Error updating locality', error: error.message });
    }
});

// DELETE locality
router.delete('/localities/:id', authenticateToken, authorizeManager('localities'), async (req, res) => {
    try {
        const locality = await Locality.findByPk(req.params.id);

        if (!locality) {
            return res.status(404).json({ success: false, message: 'Locality not found' });
        }

        await locality.destroy();

        res.json({ success: true, message: 'Locality deleted successfully' });
    } catch (error) {
        console.error('Error deleting locality:', error);
        res.status(500).json({ success: false, message: 'Error deleting locality', error: error.message });
    }
});

module.exports = router;
