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

// GET projects grouped by locality for a given city (for the ProjectsList page)
router.get('/public/projects-by-city', async (req, res) => {
    try {
        const { city } = req.query;

        // Resolve city record
        let cityRecord = null;
        if (city) {
            cityRecord = await City.findOne({ where: { name: { [Op.iLike]: city } } });
            if (!cityRecord) return res.json({ success: true, data: [], cityName: city });
        }

        const whereProject = cityRecord ? { city_id: cityRecord.id } : {};

        const projects = await Project.findAll({
            where: whereProject,
            include: [
                { model: City, as: 'city', attributes: ['id', 'name'] },
                { model: Locality, as: 'locality', attributes: ['id', 'name'] }
            ],
            order: [
                [{ model: Locality, as: 'locality' }, 'name', 'ASC'],
                ['projectName', 'ASC']
            ]
        });

        // Group by locality
        const grouped = {};
        for (const p of projects) {
            const locKey = p.locality ? p.locality.id : 0;
            const locName = p.locality ? p.locality.name : 'Other';
            if (!grouped[locKey]) {
                grouped[locKey] = { localityId: locKey, localityName: locName, projects: [] };
            }
            grouped[locKey].projects.push({
                id: p.id,
                projectName: p.projectName,
                budget: p.budget,
                bhk: p.bhk,
                total_units: p.total_units,
                photo_url: p.photo_url,
                ratings: p.ratings,
                city: p.city ? p.city.name : city
            });
        }

        res.json({
            success: true,
            cityName: cityRecord ? cityRecord.name : city,
            data: Object.values(grouped)
        });
    } catch (error) {
        console.error('Error fetching projects by city:', error);
        res.status(500).json({ success: false, message: 'Error fetching projects by city', error: error.message });
    }
});

module.exports = router;
