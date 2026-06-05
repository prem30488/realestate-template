const { RandomForestRegression } = require('ml-random-forest');
const { Property, Amenity, PropertyType, Locality, sequelize, Sequelize } = require('../models');

let model = null;

const trainModel = async () => {
    try {
        console.log('Fetching properties for training...');
        // Fetch properties with related data
        const properties = await Property.findAll({
            where: { isDeleted: false },
            include: [
                { model: Amenity, as: 'amenities', through: { attributes: [] } },
                { model: PropertyType, as: 'propertyType' },
                { model: Locality, as: 'locality' }
            ]
        });

        if (properties.length < 5) {
            console.log('Not enough data to train model accurately. Using heuristic-only approach until more data is available.');
            return;
        }

        // Fetch jantri rates for base calculation
        const jantriRates = await sequelize.query('SELECT * FROM jantri_rates', {
            type: Sequelize.QueryTypes.SELECT
        });

        // Mapping for jantri rates for quick lookup
        const jantriMap = {};
        jantriRates.forEach(rate => {
            const key = `${rate.district.toLowerCase()}_${rate.area.toLowerCase()}`;
            jantriMap[key] = rate;
        });

        const dataset = properties.map(p => {
            const prop = p.toJSON();
            const city = prop.city || '';
            const localityName = prop.locality?.name || '';
            const jantri = jantriMap[`${city.toLowerCase()}_${localityName.toLowerCase()}`] || {};

            // Features: Area, Bedrooms, Bathrooms, Garages, Floor, Amenities Count, Verified, Latitude, Longitude, Jantri Rates
            const features = [
                parseFloat(prop.area) || 0,
                prop.no_of_bedrooms || 0,
                prop.no_of_bathrooms || 0,
                prop.no_of_garage || 0,
                prop.floor || 0,
                prop.amenities?.length || 0,
                prop.verified ? 1 : 0,
                parseFloat(prop.latitude) || 0,
                parseFloat(prop.longitude) || 0,
                parseFloat(jantri.residential_rate) || 0,
                parseFloat(jantri.land_rate) || 0,
                parseFloat(jantri.commercial_rate) || 0,
                parseFloat(jantri.office_rate) || 0,
                parseFloat(jantri.industrial_rate) || 0
            ];

            return {
                features,
                label: parseFloat(prop.price)
            };
        });

        const X = dataset.map(d => d.features);
        const y = dataset.map(d => d.label);

        model = new RandomForestRegression({
            seed: 42,
            maxFeatures: 0.8,
            replacement: true,
            nEstimators: 50
        });

        model.train(X, y);
        console.log('Model trained successfully with', properties.length, 'properties.');

    } catch (error) {
        console.error('Error training property valuation model:', error);
    }
};

const predictValuation = async (data) => {
    try {
        if (!model) {
            await trainModel();
        }

        // Fetch jantri for the specific area to use as feature
        const jantriQuery = `
            SELECT * FROM jantri_rates 
            WHERE TRIM(UPPER(district)) = :city 
            AND TRIM(UPPER(area)) = :area
            LIMIT 1
        `;
        const jantriResult = await sequelize.query(jantriQuery, {
            replacements: {
                city: (data.cityName || data.city || '').toString().toUpperCase().trim(),
                area: (data.localityName || '').toUpperCase().trim()
            },
            type: Sequelize.QueryTypes.SELECT
        });

        const jantri = jantriResult[0] || {};

        const features = [
            parseFloat(data.area) || 0,
            parseInt(data.no_of_bedrooms) || 0,
            parseInt(data.no_of_bathrooms) || 0,
            parseInt(data.no_of_garage) || 0,
            parseInt(data.floor) || 0,
            parseInt(data.amenitiesCount) || 0,
            data.verified ? 1 : 0,
            parseFloat(data.latitude) || 0,
            parseFloat(data.longitude) || 0,
            parseFloat(jantri.residential_rate) || 0,
            parseFloat(jantri.land_rate) || 0,
            parseFloat(jantri.commercial_rate) || 0,
            parseFloat(jantri.office_rate) || 0,
            parseFloat(jantri.industrial_rate) || 0
        ];

        let predictedValue = 0;
        if (model) {
            const result = model.predict([features]);
            predictedValue = result[0];
        }

        // HEURISTIC FALLBACK / ENHANCEMENT
        // If we have jantri rates, we should use them to ensure the prediction is realistic
        const rateKey = `${data.rateType || 'residential'}_rate`;
        const ratePerSqM = parseFloat(jantri[rateKey]) || parseFloat(jantri.residential_rate) || 0;

        if (ratePerSqM > 0) {
            const jantriBaseValue = ratePerSqM * parseFloat(data.area);

            // Market value is usually 1.5x to 3x of Jantri value
            // We can also adjust based on other factors
            let heuristicValue = jantriBaseValue * 1.5;

            // Add value for amenities (+1% for each amenity)
            heuristicValue *= (1 + (data.amenitiesCount * 0.01));

            // Add value for furnishing
            if (data.furnishing_type === 'Fully Furnished') heuristicValue *= 1.2;
            else if (data.furnishing_type === 'Semi-Furnished') heuristicValue *= 1.1;

            // If model prediction is non-existent or too low (less than jantri), use heuristic
            if (predictedValue < jantriBaseValue) {
                predictedValue = heuristicValue;
            } else {
                // Blend model and heuristic if model exists
                predictedValue = (predictedValue * 0.7) + (heuristicValue * 0.3);
            }
        } else if (predictedValue === 0) {
            // Very basic fallback if no model and no jantri
            predictedValue = parseFloat(data.area) * 5000; // Arbitrary 5000 per sq.m.
        }

        return Math.round(predictedValue);
    } catch (error) {
        console.error('Prediction error:', error);
        return 0;
    }
};

module.exports = { predictValuation, trainModel };
