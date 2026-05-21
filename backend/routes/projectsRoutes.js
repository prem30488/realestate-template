const express = require('express');
const { Project, City, Locality, Builder, PropertyType } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// GET public projects list (filterable by city and locality)
router.get('/public/projects', async (req, res) => {
    try {
        const { city, locality_id } = req.query;
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
        
        if (locality_id) {
            where.locality_id = locality_id;
        }

        const projects = await Project.findAll({
            where,
            include: [
                { model: City, as: 'city', attributes: ['id', 'name'] },
                { model: Locality, as: 'locality', attributes: ['id', 'name'] }
            ],
            order: [['projectName', 'ASC']]
        });

        res.json({ success: true, data: projects });
    } catch (error) {
        console.error('Error fetching public projects:', error);
        res.status(500).json({ success: false, message: 'Error fetching projects', error: error.message });
    }
});

module.exports = router;
