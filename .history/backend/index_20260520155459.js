require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Builder, User, Property, PropertyImage, PropertyType, Article, HeroSlider, HomeComponent, MenuItem, Broker, Service, FunFact, InstaReel, Testimonial, Brand, Amenity, City, Locality, Shortlist, ViewedProperty, Review, PropertyFaq, Subscriber, EmailTemplate, Settings, TeamMember, sequelize } = require('./models');
const { Op } = require('sequelize');
const initDb = require('./initDb');
const localitiesRoutes = require('./routes/localitiesRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Real Estate API is running...');
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account is blocked' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '100d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        privileges: user.privileges
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register Route
app.post('/api/register', async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      role: 'user' // Default role
    });

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get home page data
app.get('/api/home/data', async (req, res) => {
  const { city } = req.query;

  try {
    const where = { isDeleted: false };
    if (city) {
      where.city = city;
    }

    const featuredProperties = await Property.findAll({
      where: { ...where, featured: true },
      order: [['updatedAt', 'DESC']],
      include: [
        { model: PropertyImage, as: 'images' },
        { model: PropertyType, as: 'propertyType' },
        {
          model: User,
          as: 'owner',
          attributes: [],
          where: { role: 'user' }
        }
      ],
      limit: 10
    });

    const latestProperties = await Property.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: [
        { model: PropertyImage, as: 'images' },
        { model: PropertyType, as: 'propertyType' },
        {
          model: User,
          as: 'owner',
          attributes: [],
          where: { role: 'user' }
        }
      ],
      limit: 6
    });

    const articles = await Article.findAll({
      where: { isDeleted: false },
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    const sliders = await HeroSlider.findAll();

    res.json({
      featured: featuredProperties,
      latest: latestProperties,
      news: articles,
      heroSliders: sliders
    });
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Public News Details Route
app.get('/api/news/:id', async (req, res) => {
  try {
    const news = await Article.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['username', 'email', 'phoneNumber']
      }]
    });
    if (!news) return res.status(404).json({ error: 'News not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news details' });
  }
});

// Public News List Route
app.get('/api/news', async (req, res) => {
  try {
    const news = await Article.findAll({
      where: { isDeleted: false },
      order: [['id', 'DESC']],
      include: [{ model: User, as: 'author', attributes: ['username'] }]
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' });
  }
});

// Get public settings (including theme)
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    const settingsJSON = settings.toJSON();
    delete settingsJSON.smtpPassword;
    res.json(settingsJSON);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Server error fetching settings' });
  }
});

// Get properties with pagination and filters (type, status, city)
app.get('/api/properties', async (req, res) => {
  const { city, search, type, status, postedBy, minPrice, maxPrice, orderBy, order = 'DESC', page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = { isDeleted: false };
    
    if (city) {
      where.city = { [Op.iLike]: `%${city}%` };
    }

    if (type) {
      where.typeId = type;
    }

    if (status) {
      // Map status from URL (Rent, Sell, Buy) to DB ENUM ('For Rent', 'For Sale')
      let dbStatus = status;
      if (status.toLowerCase() === 'rent') dbStatus = 'For Rent';
      if (status.toLowerCase() === 'sell' || status.toLowerCase() === 'buy') dbStatus = 'For Sale';
      where.status = dbStatus;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price[Op.gte] = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.price[Op.lte] = parseFloat(maxPrice);
      }
    }

    if (req.query.verified === 'true') {
      where.verified = true;
    }
    if (req.query.furnishing_type && req.query.furnishing_type !== '') {
      where.furnishing_type = req.query.furnishing_type;
    }
    if (req.query.bachelor_friendly === 'true') {
      where.bachelor_friendly = true;
    }
    if (req.query.availability && req.query.availability !== '') {
      where.availability = req.query.availability;
    }
    if (req.query.family_friendly === 'true') {
      where.family_friendly = true;
    }
    if (req.query.live_in_friendly === 'true') {
      where.live_in_friendly = true;
    }

    if (search) {
      where[Op.and] = [
        { isDeleted: false },
        {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { location: { [Op.iLike]: `%${search}%` } },
            { city: { [Op.iLike]: `%${search}%` } }
          ]
        }
      ];
    }

    const ownerInclude = {
      model: User,
      as: 'owner',
      attributes: ['username', 'id', 'role']
    };

    if (postedBy === 'owner') {
      ownerInclude.where = {
        role: {
          [Op.notIn]: ['admin', 'superadmin']
        }
      };
    }

    let queryOrder = [['createdAt', 'DESC']];
    const allowedSortFields = ['createdAt', 'updatedAt', 'price', 'id', 'title'];
    if (orderBy && allowedSortFields.includes(orderBy)) {
      const orderDir = ['ASC', 'DESC'].includes(order.toUpperCase()) ? order.toUpperCase() : 'DESC';
      queryOrder = [[orderBy, orderDir]];
    }

    const { count, rows } = await Property.findAndCountAll({
      distinct: true,
      where,
      include: [
        { model: PropertyImage, as: 'images' },
        { model: PropertyType, as: 'propertyType' },
        ownerInclude
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: queryOrder
    });

    res.json({
      properties: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single property details with amenities
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id, {
      include: [
        { model: PropertyImage, as: 'images' },
        { model: PropertyType, as: 'propertyType' },
        { model: User, as: 'owner', attributes: ['username', 'email', 'phoneNumber'] },
        { 
          model: Amenity, 
          as: 'amenities',
          through: { attributes: [] }
        }
      ]
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('Error fetching property details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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

// Public Broker Routes
app.get('/api/brokers', async (req, res) => {
  try {
    const brokers = await Broker.findAll({ where: { isDeleted: false } });
    res.json(brokers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching brokers' });
  }
});

// Get property types
app.get('/api/property-types', async (req, res) => {
  try {
    const types = await PropertyType.findAll();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching property types' });
  }
});

// Get cities
app.get('/api/cities', async (req, res) => {
  try {
    const cities = await City.findAll({
      order: [['order', 'ASC'], ['name', 'ASC']]
    });
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Error fetching cities' });
  }
});

// Get single city by name
app.get('/api/cities/:name', async (req, res) => {
  try {
    const city = await City.findOne({
      where: { name: { [Op.iLike]: req.params.name } }
    });
    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json(city);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching city details' });
  }
});

// --- USER PROPERTY MANAGEMENT ---

// Get current user's properties
app.get('/api/my-properties', authenticateToken, async (req, res) => {
  const { search } = req.query;

  try {
    // Basic filter: must be the owner and not deleted
    let where = {
      posted_by: req.user.id,
      isDeleted: false
    };

    // If there's a search term, add it as an AND condition
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } },
        { city: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const properties = await Property.findAll({
      where,
      include: [
        { model: PropertyImage, as: 'images' },
        { model: PropertyType, as: 'propertyType' },
        { model: User, as: 'owner', attributes: ['username', 'id'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Final security check: double verify in memory if needed (though Sequelize should handle it)
    const filteredProperties = properties.filter(p => p.posted_by === req.user.id);

    res.json(filteredProperties);
  } catch (error) {
    console.error('Error fetching my properties:', error);
    res.status(500).json({ error: 'Error fetching your properties' });
  }
});

// Post a new property (any logged in user)
app.post('/api/my-properties', authenticateToken, async (req, res) => {
  try {
    const { images, ...propertyData } = req.body;
    propertyData.posted_by = req.user.id;
    propertyData.isDeleted = false;

    const cleanData = {
      ...propertyData,
      price: propertyData.price ? parseFloat(propertyData.price) : 0,
      area: propertyData.area ? parseFloat(propertyData.area) : 0,
      no_of_bedrooms: propertyData.no_of_bedrooms ? parseInt(propertyData.no_of_bedrooms) : 0,
      no_of_bathrooms: propertyData.no_of_bathrooms ? parseInt(propertyData.no_of_bathrooms) : 0,
      no_of_garage: propertyData.no_of_garage ? parseInt(propertyData.no_of_garage) : 0,
      latitude: propertyData.latitude ? parseFloat(propertyData.latitude) : 23.2156,
      longitude: propertyData.longitude ? parseFloat(propertyData.longitude) : 72.6369,
    };

    const property = await Property.create(cleanData);

    if (images && images.length > 0) {
      const imageData = images.map(img => ({
        propertyId: property.id,
        imageUrl: typeof img === 'string' ? img : img.imageUrl
      })).filter(img => img.imageUrl && img.imageUrl.trim() !== '');

      if (imageData.length > 0) {
        await PropertyImage.bulkCreate(imageData);
      }
    }

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: 'Error posting property', details: error.message });
  }
});

// Update own property
app.put('/api/my-properties/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { images, propertyType, ...propertyData } = req.body;

    const property = await Property.findOne({ where: { id, posted_by: req.user.id } });
    if (!property) return res.status(403).json({ message: 'Access denied: You can only update your own properties' });

    delete propertyData.id;
    delete propertyData.posted_by; // Prevent changing ownership

    const cleanData = {
      ...propertyData,
      price: propertyData.price ? parseFloat(propertyData.price) : 0,
      area: propertyData.area ? parseFloat(propertyData.area) : 0,
      no_of_bedrooms: propertyData.no_of_bedrooms ? parseInt(propertyData.no_of_bedrooms) : 0,
      no_of_bathrooms: propertyData.no_of_bathrooms ? parseInt(propertyData.no_of_bathrooms) : 0,
      no_of_garage: propertyData.no_of_garage ? parseInt(propertyData.no_of_garage) : 0,
      latitude: propertyData.latitude ? parseFloat(propertyData.latitude) : 23.2156,
      longitude: propertyData.longitude ? parseFloat(propertyData.longitude) : 72.6369,
    };

    await Property.update(cleanData, { where: { id } });

    if (images) {
      await PropertyImage.destroy({ where: { propertyId: id } });
      const imageData = images.map(img => ({
        propertyId: id,
        imageUrl: typeof img === 'string' ? img : img.imageUrl
      })).filter(img => img.imageUrl && img.imageUrl.trim() !== '');

      if (imageData.length > 0) {
        await PropertyImage.bulkCreate(imageData);
      }
    }

    res.json({ message: 'Property updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating property' });
  }
});

// Toggle visibility/delete for own property
app.patch('/api/my-properties/:id/toggle-delete', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;

    const property = await Property.findOne({ where: { id, posted_by: req.user.id } });
    if (!property) return res.status(403).json({ message: 'Access denied' });

    await Property.update({ isDeleted }, { where: { id } });
    res.json({ message: 'Property status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating property status' });
  }
});

// Permanent delete own property
app.delete('/api/my-properties/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findOne({ where: { id, posted_by: req.user.id } });
    if (!property) return res.status(403).json({ message: 'Access denied' });

    await Property.destroy({ where: { id } });
    res.json({ message: 'Property deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting property' });
  }
});

// --- SHORTLIST MANAGEMENT ---

// Get current user's shortlist
app.get('/api/shortlist', authenticateToken, async (req, res) => {
  try {
    const shortlisted = await Shortlist.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Property,
          as: 'property',
          include: [
            { model: PropertyImage, as: 'images' },
            { model: PropertyType, as: 'propertyType' }
          ]
        }
      ]
    });
    res.json(shortlisted.map(s => s.property));
  } catch (error) {
    console.error('Shortlist fetch error:', error);
    res.status(500).json({ error: 'Error fetching shortlist' });
  }
});

// Add to shortlist
app.post('/api/shortlist/:propertyId', authenticateToken, async (req, res) => {
  try {
    const { propertyId } = req.params;
    const [shortlist, created] = await Shortlist.findOrCreate({
      where: { userId: req.user.id, propertyId }
    });
    res.json({ message: created ? 'Added to shortlist' : 'Already in shortlist', shortlist });
  } catch (error) {
    res.status(500).json({ error: 'Error adding to shortlist' });
  }
});

// Remove from shortlist
app.delete('/api/shortlist/:propertyId', authenticateToken, async (req, res) => {
  try {
    const { propertyId } = req.params;
    await Shortlist.destroy({
      where: { userId: req.user.id, propertyId }
    });
    res.json({ message: 'Removed from shortlist' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing from shortlist' });
  }
});

// Check if property is in shortlist
app.get('/api/shortlist/check/:propertyId', authenticateToken, async (req, res) => {
  try {
    const { propertyId } = req.params;
    const existing = await Shortlist.findOne({
      where: { userId: req.user.id, propertyId }
    });
    res.json({ isShortlisted: !!existing });
  } catch (error) {
    res.status(500).json({ error: 'Error checking shortlist status' });
  }
});

// --- VIEWED PROPERTIES MANAGEMENT ---

// Get current user's viewed properties
app.get('/api/viewed-properties', authenticateToken, async (req, res) => {
  try {
    const viewed = await ViewedProperty.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Property,
          as: 'property',
          include: [
            { model: PropertyImage, as: 'images' },
            { model: PropertyType, as: 'propertyType' }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(viewed.map(v => ({ ...v.property.toJSON(), viewedAt: v.createdAt })));
  } catch (error) {
    console.error('Viewed properties fetch error:', error);
    res.status(500).json({ error: 'Error fetching viewed properties' });
  }
});

// Mark property as viewed
app.post('/api/viewed-properties/:propertyId', authenticateToken, async (req, res) => {
  try {
    const { propertyId } = req.params;
    const [viewed, created] = await ViewedProperty.findOrCreate({
      where: { userId: req.user.id, propertyId }
    });
    if (!created) {
      // Update updatedAt timestamp to reflect most recent view
      viewed.changed('updatedAt', true);
      await viewed.save();
    }
    res.json({ message: 'Property recorded as viewed', viewed });
  } catch (error) {
    res.status(500).json({ error: 'Error recording viewed property' });
  }
});

// Check if property is viewed
app.get('/api/viewed-properties/check/:propertyId', authenticateToken, async (req, res) => {
  try {
    const { propertyId } = req.params;
    const existing = await ViewedProperty.findOne({
      where: { userId: req.user.id, propertyId }
    });
    res.json({ isViewed: !!existing });
  } catch (error) {
    res.status(500).json({ error: 'Error checking viewed status' });
  }
});

// --- REVIEWS & FAQ MANAGEMENT ---

// Get reviews for a property
app.get('/api/properties/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.findAll({
      where: { propertyId: id },
      include: [{ model: User, as: 'user', attributes: ['id', 'username'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// Add review for a property
app.post('/api/properties/:id/reviews', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ error: 'Rating and comment are required' });
    }
    const review = await Review.create({
      propertyId: id,
      userId: req.user.id,
      rating: parseInt(rating),
      comment
    });
    const reviewWithUser = await Review.findByPk(review.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'username'] }]
    });
    res.json({ message: 'Review added successfully', review: reviewWithUser });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Error adding review' });
  }
});

// Get FAQs for a property
app.get('/api/properties/:id/faqs', async (req, res) => {
  try {
    const { id } = req.params;
    const faqs = await PropertyFaq.findAll({
      where: { propertyId: id, isDeleted: false },
      order: [['createdAt', 'ASC']]
    });
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Error fetching FAQs' });
  }
});

// Add FAQ for a property
app.post('/api/properties/:id/faqs', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }
    const faq = await PropertyFaq.create({
      propertyId: id,
      question,
      answer
    });
    res.json({ message: 'FAQ added successfully', faq });
  } catch (error) {
    console.error('Error adding FAQ:', error);
    res.status(500).json({ error: 'Error adding FAQ' });
  }
});

// Admin Routes
// Get all properties for admin (paginated)
app.get('/api/admin/properties', authenticateToken, authorizeManager('Properties'), async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } },
        { city: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Property.findAndCountAll({
      distinct: true,
      where,
      include: [
        { model: PropertyImage, as: 'images' },
        { model: PropertyType, as: 'propertyType' },
        { model: User, as: 'owner', attributes: ['username', 'id'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      properties: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching admin properties' });
  }
});

app.patch('/api/admin/properties/:id/toggle-delete', authenticateToken, authorizeManager('Properties'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    await Property.update({ isDeleted }, { where: { id } });
    res.json({ message: 'Property status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating property' });
  }
});

app.post('/api/admin/properties', authenticateToken, authorizeManager('Properties'), async (req, res) => {
  try {
    const { images, ...propertyData } = req.body;

    // Ensure posted_by is set
    if (!propertyData.posted_by) {
      propertyData.posted_by = req.user.id;
    }

    // Coerce types and handle empty strings for numeric fields
    const cleanData = {
      ...propertyData,
      price: propertyData.price ? parseFloat(propertyData.price) : 0,
      area: propertyData.area ? parseFloat(propertyData.area) : 0,
      no_of_bedrooms: propertyData.no_of_bedrooms ? parseInt(propertyData.no_of_bedrooms) : 0,
      no_of_bathrooms: propertyData.no_of_bathrooms ? parseInt(propertyData.no_of_bathrooms) : 0,
      no_of_garage: propertyData.no_of_garage ? parseInt(propertyData.no_of_garage) : 0,
      latitude: propertyData.latitude ? parseFloat(propertyData.latitude) : 23.2156,
      longitude: propertyData.longitude ? parseFloat(propertyData.longitude) : 72.6369,
    };

    const property = await Property.create(cleanData);

    if (images && images.length > 0) {
      const imageData = images.map(img => ({
        propertyId: property.id,
        imageUrl: typeof img === 'string' ? img : img.imageUrl
      })).filter(img => img.imageUrl && img.imageUrl.trim() !== '');

      if (imageData.length > 0) {
        await PropertyImage.bulkCreate(imageData);
      }
    }

    res.status(201).json(property);
  } catch (error) {
    console.error('Detailed Error creating property:', error);
    res.status(500).json({ error: 'Error creating property', details: error.message });
  }
});

app.put('/api/admin/properties/:id', authenticateToken, authorizeManager('Properties'), async (req, res) => {
  try {
    const { id } = req.params;
    const { images, propertyType, ...propertyData } = req.body;

    // Clean up propertyData
    delete propertyData.id;
    delete propertyData.createdAt;
    delete propertyData.updatedAt;

    // Coerce types and handle empty strings for numeric fields
    const cleanData = {
      ...propertyData,
      price: propertyData.price ? parseFloat(propertyData.price) : 0,
      area: propertyData.area ? parseFloat(propertyData.area) : 0,
      no_of_bedrooms: propertyData.no_of_bedrooms ? parseInt(propertyData.no_of_bedrooms) : 0,
      no_of_bathrooms: propertyData.no_of_bathrooms ? parseInt(propertyData.no_of_bathrooms) : 0,
      no_of_garage: propertyData.no_of_garage ? parseInt(propertyData.no_of_garage) : 0,
      latitude: propertyData.latitude ? parseFloat(propertyData.latitude) : 23.2156,
      longitude: propertyData.longitude ? parseFloat(propertyData.longitude) : 72.6369,
    };

    await Property.update(cleanData, { where: { id } });

    if (images) {
      await PropertyImage.destroy({ where: { propertyId: id } });
      const imageData = images.map(img => ({
        propertyId: id,
        imageUrl: typeof img === 'string' ? img : img.imageUrl
      })).filter(img => img.imageUrl && img.imageUrl.trim() !== '');

      if (imageData.length > 0) {
        await PropertyImage.bulkCreate(imageData);
      }
    }

    res.json({ message: 'Property updated successfully' });
  } catch (error) {
    console.error('Detailed Error updating property:', error);
    res.status(500).json({ error: 'Error updating property', details: error.message });
  }
});

app.delete('/api/admin/properties/:id', authenticateToken, authorizeManager('Properties'), async (req, res) => {
  try {
    const { id } = req.params;
    await Property.destroy({ where: { id } });
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting property' });
  }
});

// Amenity Routes
app.get('/api/amenities', async (req, res) => {
  try {
    const amenities = await Amenity.findAll({
      where: { isDeleted: false },
      order: [['type', 'ASC'], ['title', 'ASC']]
    });
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching amenities' });
  }
});

app.get('/api/admin/properties/:id/amenities', authenticateToken, async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id, {
      include: [{
        model: Amenity,
        as: 'amenities',
        through: { attributes: [] }
      }]
    });
    if (!property) return res.status(404).json({ error: 'Property not found' });

    // Access check: Owner OR Superadmin OR Admin with Properties privilege
    const user = await User.findByPk(req.user.id);
    const isAdmin = user.role === 'superadmin' || (user.role === 'admin' && user.privileges?.includes('Properties'));
    const isOwner = property.posted_by === user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Access denied: You do not own this property' });
    }

    res.json(property.amenities);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching property amenities' });
  }
});

app.post('/api/admin/properties/:id/amenities', authenticateToken, async (req, res) => {
  try {
    const { amenityIds } = req.body;
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    // Access check: Owner OR Superadmin OR Admin with Properties privilege
    const user = await User.findByPk(req.user.id);
    const isAdmin = user.role === 'superadmin' || (user.role === 'admin' && user.privileges?.includes('Properties'));
    const isOwner = property.posted_by === user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Access denied: You do not own this property' });
    }

    await property.setAmenities(amenityIds);
    res.json({ message: 'Amenities updated successfully' });
  } catch (error) {
    console.error('Error updating amenities:', error);
    res.status(500).json({ error: 'Error updating amenities' });
  }
});

// News (Article) Management Routes (Role-based & Ownership-based)
app.get('/api/admin/news', authenticateToken, async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};

    // Check if user is superadmin or has 'News' privilege
    const user = await User.findByPk(req.user.id);
    const hasFullAccess = user.role === 'superadmin' ||
      (user.role === 'admin' && user.privileges && user.privileges.includes('News'));

    if (!hasFullAccess) {
      // Regular users or admins without privilege see only their own data
      where.posted_by = req.user.id;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { category: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Article.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']],
      include: [{ model: User, as: 'author', attributes: ['username', 'email'] }]
    });

    res.json({
      news: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.post('/api/admin/news', authenticateToken, async (req, res) => {
  try {
    const newsData = { ...req.body, posted_by: req.user.id };
    if (!newsData.date) newsData.date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const news = await Article.create(newsData);
    res.status(201).json(news);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Error creating news' });
  }
});

app.put('/api/admin/news/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    // Check ownership unless superadmin or privileged admin
    const user = await User.findByPk(req.user.id);
    const hasFullAccess = user.role === 'superadmin' ||
      (user.role === 'admin' && user.privileges && user.privileges.includes('News'));

    if (!hasFullAccess && article.posted_by !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own news' });
    }

    await Article.update(req.body, { where: { id } });
    res.json({ message: 'News updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating news' });
  }
});

app.patch('/api/admin/news/:id/toggle-delete', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    const article = await Article.findByPk(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const user = await User.findByPk(req.user.id);
    const hasFullAccess = user.role === 'superadmin' ||
      (user.role === 'admin' && user.privileges && user.privileges.includes('News'));

    if (!hasFullAccess && article.posted_by !== req.user.id) {
      return res.status(403).json({ error: 'You can only modify your own news' });
    }

    await Article.update({ isDeleted }, { where: { id } });
    res.json({ message: 'News status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating news status' });
  }
});

app.delete('/api/admin/news/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const user = await User.findByPk(req.user.id);
    const hasFullAccess = user.role === 'superadmin' ||
      (user.role === 'admin' && user.privileges && user.privileges.includes('News'));

    if (!hasFullAccess && article.posted_by !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own news' });
    }

    await Article.destroy({ where: { id } });
    res.json({ message: 'News deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting news' });
  }
});

// Generic Toggle Delete for other models
app.patch('/api/admin/:model/:id/toggle-delete', async (req, res) => {
  const { model, id } = req.params;
  const { isDeleted } = req.body;
  const modelsMap = {
    'news': Article,
    'sliders': HeroSlider,
    'users': User,
    'services': Service,
    'funfacts': FunFact,
    'instareels': InstaReel,
    'testimonials': Testimonial,
    'brands': Brand
  };

  try {
    const ModelClass = modelsMap[model];
    if (!ModelClass) return res.status(404).json({ error: 'Model not found' });
    await ModelClass.update({ isDeleted }, { where: { id } });
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating status' });
  }
});

// Slider Management Routes
app.get('/api/admin/sliders', async (req, res) => {
  try {
    const sliders = await HeroSlider.findAll({ order: [['id', 'DESC']] });
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sliders' });
  }
});

app.post('/api/admin/sliders', async (req, res) => {
  try {
    const slider = await HeroSlider.create(req.body);
    res.status(201).json(slider);
  } catch (error) {
    res.status(500).json({ error: 'Error creating slider' });
  }
});

app.put('/api/admin/sliders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await HeroSlider.update(req.body, { where: { id } });
    res.json({ message: 'Slider updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating slider' });
  }
});

app.delete('/api/admin/sliders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await HeroSlider.destroy({ where: { id } });
    res.json({ message: 'Slider deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting slider' });
  }
});

// Broker Management Routes (Admin Only) with Pagination
app.get('/api/admin/brokers', authenticateToken, authorizeManager('Broker'), async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { designation: { [Op.iLike]: `%${search}%` } },
        { specialization: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    const { count, rows } = await Broker.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });
    res.json({
      brokers: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching brokers:', error);
    res.status(500).json({ error: 'Error fetching brokers' });
  }
});

app.post('/api/admin/brokers', authenticateToken, authorizeManager('Broker'), async (req, res) => {
  try {
    const broker = await Broker.create(req.body);
    res.status(201).json(broker);
  } catch (error) {
    res.status(500).json({ error: 'Error creating broker' });
  }
});

app.put('/api/admin/brokers/:id', authenticateToken, authorizeManager('Broker'), async (req, res) => {
  try {
    const { id } = req.params;
    await Broker.update(req.body, { where: { id } });
    res.json({ message: 'Broker updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating broker' });
  }
});

app.patch('/api/admin/brokers/:id/toggle-delete', authenticateToken, authorizeManager('Broker'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    await Broker.update({ isDeleted }, { where: { id } });
    res.json({ message: 'Broker status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating broker status' });
  }
});

app.delete('/api/admin/brokers/:id', authenticateToken, authorizeManager('Broker'), async (req, res) => {
  try {
    const { id } = req.params;
    await Broker.destroy({ where: { id } });
    res.json({ message: 'Broker deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting broker' });
  }
});

// --- TEAM MEMBER MANAGEMENT ROUTES ---

// Public Team Members Route
app.get('/api/team-members', async (req, res) => {
  try {
    const team = await TeamMember.findAll({
      where: { isDeleted: false },
      order: [['order', 'ASC'], ['id', 'ASC']]
    });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching team members' });
  }
});

// Team Member Management Routes (Admin Only) with Pagination & Search
app.get('/api/admin/team', authenticateToken, authorizeManager('Team'), async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { designation: { [Op.iLike]: `%${search}%` } },
        { bio: { [Op.iLike]: `%${search}%` } }
      ];
    }
    const { count, rows } = await TeamMember.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['order', 'ASC'], ['id', 'DESC']]
    });
    res.json({
      teamMembers: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Error fetching team members' });
  }
});

app.post('/api/admin/team', authenticateToken, authorizeManager('Team'), async (req, res) => {
  try {
    const teamMember = await TeamMember.create(req.body);
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ error: 'Error creating team member' });
  }
});

app.put('/api/admin/team/:id', authenticateToken, authorizeManager('Team'), async (req, res) => {
  try {
    const { id } = req.params;
    await TeamMember.update(req.body, { where: { id } });
    res.json({ message: 'Team member updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating team member' });
  }
});

app.patch('/api/admin/team/:id/toggle-delete', authenticateToken, authorizeManager('Team'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    await TeamMember.update({ isDeleted }, { where: { id } });
    res.json({ message: 'Team member status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating team member status' });
  }
});

app.delete('/api/admin/team/:id', authenticateToken, authorizeManager('Team'), async (req, res) => {
  try {
    const { id } = req.params;
    await TeamMember.destroy({ where: { id } });
    res.json({ message: 'Team member deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting team member' });
  }
});


// Service Management Routes (Admin Only) with Pagination
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.findAll({ where: { isDeleted: false }, order: [['id', 'DESC']] });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching services' });
  }
});

app.get('/api/admin/services', authenticateToken, authorizeManager('Service'), async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    const { count, rows } = await Service.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });
    res.json({
      services: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Error fetching services' });
  }
});

app.post('/api/admin/services', authenticateToken, authorizeManager('Service'), async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Error creating service' });
  }
});

app.put('/api/admin/services/:id', authenticateToken, authorizeManager('Service'), async (req, res) => {
  try {
    const { id } = req.params;
    await Service.update(req.body, { where: { id } });
    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating service' });
  }
});

app.patch('/api/admin/services/:id/toggle-delete', authenticateToken, authorizeManager('Service'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    await Service.update({ isDeleted }, { where: { id } });
    res.json({ message: 'Service status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating service status' });
  }
});

app.delete('/api/admin/services/:id', authenticateToken, authorizeManager('Service'), async (req, res) => {
  try {
    const { id } = req.params;
    await Service.destroy({ where: { id } });
    res.json({ message: 'Service deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting service' });
  }
});

// FunFact Management Routes (Admin Only) with Pagination
app.get('/api/funfacts', async (req, res) => {
  try {
    const funfacts = await FunFact.findAll({ where: { isDeleted: false }, order: [['id', 'DESC']] });
    res.json(funfacts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching funfacts' });
  }
});

app.get('/api/admin/funfacts', authenticateToken, authorizeManager('FunFact'), async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { value: { [Op.iLike]: `%${search}%` } }
      ];
    }
    const { count, rows } = await FunFact.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });
    res.json({
      funfacts: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching funfacts:', error);
    res.status(500).json({ error: 'Error fetching funfacts' });
  }
});

app.post('/api/admin/funfacts', authenticateToken, authorizeManager('FunFact'), async (req, res) => {
  try {
    const funfact = await FunFact.create(req.body);
    res.status(201).json(funfact);
  } catch (error) {
    res.status(500).json({ error: 'Error creating funfact' });
  }
});

app.put('/api/admin/funfacts/:id', authenticateToken, authorizeManager('FunFact'), async (req, res) => {
  try {
    const { id } = req.params;
    await FunFact.update(req.body, { where: { id } });
    res.json({ message: 'FunFact updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating funfact' });
  }
});

app.patch('/api/admin/funfacts/:id/toggle-delete', authenticateToken, authorizeManager('FunFact'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    await FunFact.update({ isDeleted }, { where: { id } });
    res.json({ message: 'FunFact status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating funfact status' });
  }
});

app.delete('/api/admin/funfacts/:id', authenticateToken, authorizeManager('FunFact'), async (req, res) => {
  try {
    const { id } = req.params;
    await FunFact.destroy({ where: { id } });
    res.json({ message: 'FunFact deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting funfact' });
  }
});

// Testimonial Management Routes (Admin Only) with Pagination
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { isDeleted: false },
      order: [['id', 'DESC']],
      limit: 10
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching testimonials' });
  }
});

app.get('/api/admin/testimonials', authenticateToken, authorizeManager('Testimonials'), async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { designation: { [Op.iLike]: `%${search}%` } }
      ];
    }
    const { count, rows } = await Testimonial.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });
    res.json({
      testimonials: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Error fetching testimonials' });
  }
});

app.post('/api/admin/testimonials', authenticateToken, authorizeManager('Testimonials'), async (req, res) => {
  try {
    const testimonial = await Testimonial.create({ ...req.body, posted_by: req.user.id });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Error creating testimonial' });
  }
});

app.put('/api/admin/testimonials/:id', authenticateToken, authorizeManager('Testimonials'), async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.update(req.body, { where: { id } });
    res.json({ message: 'Testimonial updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating testimonial' });
  }
});

app.delete('/api/admin/testimonials/:id', authenticateToken, authorizeManager('Testimonials'), async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.destroy({ where: { id } });
    res.json({ message: 'Testimonial deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting testimonial' });
  }
});

// Brand Management Routes (Admin Only) with Pagination
app.get('/api/brands', async (req, res) => {
  try {
    const brands = await Brand.findAll({ where: { isDeleted: false }, order: [['id', 'DESC']] });
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching brands' });
  }
});

app.get('/api/admin/brands', authenticateToken, authorizeManager('Brand'), async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }
    const { count, rows } = await Brand.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });
    res.json({
      brands: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ error: 'Error fetching brands' });
  }
});

app.post('/api/admin/brands', authenticateToken, authorizeManager('Brand'), async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Error creating brand' });
  }
});

app.put('/api/admin/brands/:id', authenticateToken, authorizeManager('Brand'), async (req, res) => {
  try {
    const { id } = req.params;
    await Brand.update(req.body, { where: { id } });
    res.json({ message: 'Brand updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating brand' });
  }
});

app.delete('/api/admin/brands/:id', authenticateToken, authorizeManager('Brand'), async (req, res) => {
  try {
    const { id } = req.params;
    await Brand.destroy({ where: { id } });
    res.json({ message: 'Brand deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting brand' });
  }
});

// InstaReel Management Routes (Admin Only) with Pagination
app.get('/api/instareels', async (req, res) => {
  try {
    const reels = await InstaReel.findAll({ where: { isDeleted: false }, order: [['id', 'DESC']] });
    res.json(reels);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reels' });
  }
});

app.get('/api/admin/instareels', authenticateToken, authorizeManager('Insta Video'), async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } }
      ];
    }
    const { count, rows } = await InstaReel.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });
    res.json({
      reels: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching reels:', error);
    res.status(500).json({ error: 'Error fetching reels' });
  }
});

app.post('/api/admin/instareels', authenticateToken, authorizeManager('Insta Video'), async (req, res) => {
  try {
    const reel = await InstaReel.create(req.body);
    res.status(201).json(reel);
  } catch (error) {
    res.status(500).json({ error: 'Error creating reel' });
  }
});

app.put('/api/admin/instareels/:id', authenticateToken, authorizeManager('Insta Video'), async (req, res) => {
  try {
    const { id } = req.params;
    await InstaReel.update(req.body, { where: { id } });
    res.json({ message: 'InstaReel updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating reel' });
  }
});

app.patch('/api/admin/instareels/:id/toggle-delete', authenticateToken, authorizeManager('Insta Video'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    await InstaReel.update({ isDeleted }, { where: { id } });
    res.json({ message: 'InstaReel status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating reel status' });
  }
});

app.delete('/api/admin/instareels/:id', authenticateToken, authorizeManager('Insta Video'), async (req, res) => {
  try {
    const { id } = req.params;
    await InstaReel.destroy({ where: { id } });
    res.json({ message: 'InstaReel deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting reel' });
  }
});

// Home Management Routes
app.get('/api/admin/home-components', async (req, res) => {
  try {
    const components = await HomeComponent.findAll({ order: [['order', 'ASC']] });
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching home components' });
  }
});

app.put('/api/admin/home-components/reorder', async (req, res) => {
  const { components } = req.body; // Array of { id, order }
  try {
    for (const comp of components) {
      await HomeComponent.update({ order: comp.order }, { where: { id: comp.id } });
    }
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
});

app.patch('/api/admin/home-components/:id/toggle-deleted', async (req, res) => {
  const { id } = req.params;
  const { is_deleted } = req.body;
  try {
    await HomeComponent.update({ is_deleted }, { where: { id } });
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating status' });
  }
});

app.post('/api/admin/home-components/reset', async (req, res) => {
  const defaultComponents = [
    { name: 'Header', displayName: 'Header / Navigation', order: 1, is_deleted: false },
    { name: 'HeroSlider', displayName: 'Hero Slider', order: 2, is_deleted: false },
    { name: 'Search', displayName: 'Search Bar', order: 3, is_deleted: false },
    { name: 'CityMap', displayName: 'City Map', order: 4, is_deleted: false },
    { name: 'Featured', displayName: 'Featured Properties', order: 5, is_deleted: false },
    { name: 'Latest', displayName: 'Latest Properties', order: 6, is_deleted: false },
    { name: 'WhyUs', displayName: 'Why Us Section', order: 7, is_deleted: false },
    { name: 'OurServices', displayName: 'Our Services', order: 8, is_deleted: false },
    { name: 'FunFact', displayName: 'Fun Facts', order: 9, is_deleted: false },
    { name: 'OurBrokers', displayName: 'Our Brokers', order: 10, is_deleted: false },
    { name: 'InstagramVideoCarousel', displayName: 'Instagram Feed', order: 11, is_deleted: false },
    { name: 'LatestNews', displayName: 'Latest News', order: 12, is_deleted: false },
    { name: 'Testimonials', displayName: 'Testimonials', order: 13, is_deleted: false },
    { name: 'OurBrands', displayName: 'Our Brands', order: 14, is_deleted: false },
    { name: 'Footer', displayName: 'Footer', order: 15, is_deleted: false },
    { name: 'WhatsAppButton', displayName: 'WhatsApp Float Button', order: 16, is_deleted: false }
  ];

  try {
    for (const comp of defaultComponents) {
      const existing = await HomeComponent.findOne({ where: { name: comp.name } });
      if (existing) {
        await existing.update({ order: comp.order, is_deleted: comp.is_deleted });
      } else {
        await HomeComponent.create(comp);
      }
    }
    res.json({ message: 'Components reset to default' });
  } catch (error) {
    console.error('Error resetting components:', error);
    res.status(500).json({ error: 'Error resetting components' });
  }
});

// Public Home Components Route
app.get('/api/home-components', async (req, res) => {
  try {
    const components = await HomeComponent.findAll({
      where: { is_deleted: false },
      order: [['order', 'ASC']]
    });
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching home components' });
  }
});

// ── User Management Routes (Superadmin Only) ─────────────────────────────────

const authorizeSuperAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Access denied: Superadmin only' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// List all users with search + pagination
app.get('/api/admin/users', authenticateToken, authorizeSuperAdmin, async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const where = {};
    if (search) {
      where[Op.or] = [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    const { count, rows } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });
    res.json({ users: rows, totalCount: count, totalPages: Math.ceil(count / limit), currentPage: parseInt(page) });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Get single user
app.get('/api/admin/users/:id', authenticateToken, authorizeSuperAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Create new user
app.post('/api/admin/users', authenticateToken, authorizeSuperAdmin, async (req, res) => {
  try {
    const { username, email, password, role, phoneNumber, privileges } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password || 'Password@123', salt);
    const user = await User.create({
      username, email, password: hashedPassword,
      role: role || 'user', phoneNumber: phoneNumber || null,
      privileges: privileges || null
    });
    const { password: _, ...userOut } = user.toJSON();
    res.status(201).json(userOut);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
});

// Update user (role, privileges, block status)
app.put('/api/admin/users/:id', authenticateToken, authorizeSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, phoneNumber, privileges, isBlocked } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Prevent demoting the only superadmin
    if (user.role === 'superadmin' && role && role !== 'superadmin') {
      const superAdminCount = await User.count({ where: { role: 'superadmin' } });
      if (superAdminCount <= 1) return res.status(400).json({ error: 'Cannot demote the only superadmin' });
    }
    await user.update({ username, email, role, phoneNumber, privileges, isBlocked });
    const { password: _, ...userOut } = user.toJSON();
    res.json(userOut);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Update privileges only
app.patch('/api/admin/users/:id/privileges', authenticateToken, authorizeSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { privileges } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update({ privileges });
    res.json({ message: 'Privileges updated', privileges });
  } catch (error) {
    res.status(500).json({ error: 'Error updating privileges' });
  }
});

// Toggle block status
app.patch('/api/admin/users/:id/toggle-block', authenticateToken, authorizeSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.id === req.user.id) return res.status(400).json({ error: 'Cannot block yourself' });
    await user.update({ isBlocked: !user.isBlocked });
    res.json({ message: 'User block status updated', isBlocked: !user.isBlocked });
  } catch (error) {
    res.status(500).json({ error: 'Error toggling block status' });
  }
});

// Permanently delete user
app.delete('/api/admin/users/:id', authenticateToken, authorizeSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (parseInt(id) === req.user.id) return res.status(400).json({ error: 'Cannot delete yourself' });
    await User.destroy({ where: { id } });
    res.json({ message: 'User deleted permanently' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Reset user password
app.patch('/api/admin/users/:id/reset-password', authenticateToken, authorizeSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.update({ password: hashedPassword }, { where: { id } });
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error resetting password' });
  }
});

// ── Menu API Routes ───────────────────────────────────────────────────────────


// Get full menu tree (all items nested)
app.get('/api/menu', async (req, res) => {
  try {
    // Fetch all non-deleted top-level nav items with nested children
    const buildTree = async (parentId = null) => {
      const items = await MenuItem.findAll({
        where: { parentId: parentId === null ? null : parentId, isDeleted: false },
        order: [['order', 'ASC']]
      });
      const result = [];
      for (const item of items) {
        const children = await buildTree(item.id);
        result.push({ ...item.toJSON(), children });
      }
      return result;
    };
    const tree = await buildTree(null);
    res.json(tree);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching menu' });
  }
});

// Get ALL items flat (for admin manager - includes deleted)
app.get('/api/admin/menu', async (req, res) => {
  try {
    const buildTree = async (parentId = null) => {
      const items = await MenuItem.findAll({
        where: { parentId: parentId === null ? null : parentId },
        order: [['order', 'ASC']]
      });
      const result = [];
      for (const item of items) {
        const children = await buildTree(item.id);
        result.push({ ...item.toJSON(), children });
      }
      return result;
    };
    const tree = await buildTree(null);
    res.json(tree);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu' });
  }
});

// Add a new menu item
app.post('/api/admin/menu', async (req, res) => {
  try {
    const { title, link, parentId, itemType, menuType, badge } = req.body;
    const siblings = await MenuItem.findAll({ where: { parentId: parentId || null } });
    const order = siblings.length + 1;
    const item = await MenuItem.create({
      title, link: link || '#', parentId: parentId || null,
      itemType: itemType || 'link', menuType: menuType || null,
      badge: badge || null, order, isDeleted: false
    });
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating menu item' });
  }
});

// Reset menu to defaults — MUST be before /:id routes
app.post('/api/admin/menu/reset', async (req, res) => {
  const defaultMenu = require('./seedMenu.default.js');
  try {
    await sequelize.query(`DELETE FROM "MenuItems"`);
    await sequelize.query(`ALTER SEQUENCE "MenuItems_id_seq" RESTART WITH 1`);
    const createItem = async (data, parentId = null) => {
      const now = new Date();
      const [[{ id }]] = await sequelize.query(
        `INSERT INTO "MenuItems" (title, link, "parentId", "itemType", "menuType", badge, "order", "isDeleted", "createdAt", "updatedAt")
         VALUES ($1,$2,$3,$4,$5,$6,$7,false,$8,$9) RETURNING id`,
        { bind: [data.title, data.link || '#', parentId, data.itemType || 'link', data.menuType || null, data.badge || null, data.order || 0, now, now] }
      );
      for (const child of (data.children || [])) await createItem(child, id);
    };
    for (const nav of defaultMenu) await createItem(nav, null);
    res.json({ message: 'Menu reset to default' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error resetting menu' });
  }
});

// Reorder siblings — MUST be before /:id routes
app.put('/api/admin/menu/reorder', async (req, res) => {
  try {
    const { items } = req.body;
    for (const item of items) {
      await MenuItem.update({ order: item.order }, { where: { id: item.id } });
    }
    res.json({ message: 'Reordered' });
  } catch (error) {
    res.status(500).json({ error: 'Error reordering' });
  }
});

// Update a menu item
app.put('/api/admin/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link, badge, menuType, itemType } = req.body;
    await MenuItem.update({ title, link, badge, menuType, itemType }, { where: { id } });
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating menu item' });
  }
});

// Toggle isDeleted (soft delete/restore)
app.patch('/api/admin/menu/:id/toggle-delete', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update({ isDeleted: !item.isDeleted });
    res.json({ message: 'Toggled', isDeleted: !item.isDeleted });
  } catch (error) {
    res.status(500).json({ error: 'Error toggling menu item' });
  }
});

// Permanently delete item and all descendants
app.delete('/api/admin/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDescendants = async (parentId) => {
      const children = await MenuItem.findAll({ where: { parentId } });
      for (const child of children) {
        await deleteDescendants(child.id);
        await child.destroy();
      }
    };
    await deleteDescendants(id);
    await MenuItem.destroy({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting menu item' });
  }
});

// ── Admin Dashboard Stats ─────────────────────────────────────────────────────
app.get('/api/admin/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const [
      totalProperties, activeProperties,
      totalUsers, adminUsers,
      totalArticles, activeArticles,
      totalBrokers,
      totalTestimonials,
      totalBrands,
      totalServices,
      recentArticles,
      recentUsers
    ] = await Promise.all([
      Property.count(),
      Property.count({ where: { isDeleted: false } }),
      User.count(),
      User.count({ where: { role: { [Op.in]: ['admin', 'superadmin'] } } }),
      Article.count(),
      Article.count({ where: { isDeleted: false } }),
      Broker.count({ where: { isDeleted: false } }),
      Testimonial.count({ where: { isDeleted: false } }),
      Brand.count({ where: { isDeleted: false } }),
      Service.count({ where: { isDeleted: false } }),
      Article.findAll({
        where: { isDeleted: false },
        order: [['createdAt', 'DESC']],
        limit: 5,
        include: [{ model: User, as: 'author', attributes: ['username'] }],
        attributes: ['id', 'title', 'category', 'createdAt', 'image']
      }),
      User.findAll({
        order: [['createdAt', 'DESC']],
        limit: 5,
        attributes: ['id', 'username', 'email', 'role', 'createdAt']
      })
    ]);

    res.json({
      stats: {
        totalProperties, activeProperties,
        totalUsers, adminUsers,
        totalArticles, activeArticles,
        totalBrokers, totalTestimonials,
        totalBrands, totalServices
      },
      recentArticles,
      recentUsers
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Error fetching dashboard stats' });
  }
});

// ── Newsletter ───────────────────────────────────────────────────────────────

app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    
    const [subscriber, created] = await Subscriber.findOrCreate({
      where: { email },
      defaults: { isActive: true }
    });
    
    if (!created && !subscriber.isActive) {
      subscriber.isActive = true;
      await subscriber.save();
    }
    
    res.json({ message: 'Thank you for subscribing to our newsletter!' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Error subscribing to newsletter' });
  }
});

app.get('/api/admin/newsletter/subscribers', authenticateToken, authorizeManager('Newsletter'), async (req, res) => {
  try {
    const subscribers = await Subscriber.findAll({ order: [['createdAt', 'DESC']] });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subscribers' });
  }
});

app.get('/api/admin/newsletter/templates', authenticateToken, authorizeManager('Newsletter'), async (req, res) => {
  try {
    const templates = await EmailTemplate.findAll({ order: [['createdAt', 'DESC']] });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching templates' });
  }
});

app.post('/api/admin/newsletter/templates', authenticateToken, authorizeManager('Newsletter'), async (req, res) => {
  try {
    const { name, subject, body } = req.body;
    const template = await EmailTemplate.create({ name, subject, body });
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ error: 'Error creating template' });
  }
});

app.put('/api/admin/newsletter/templates/:id', authenticateToken, authorizeManager('Newsletter'), async (req, res) => {
  try {
    const { name, subject, body } = req.body;
    await EmailTemplate.update({ name, subject, body }, { where: { id: req.params.id } });
    res.json({ message: 'Template updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating template' });
  }
});

app.delete('/api/admin/newsletter/templates/:id', authenticateToken, authorizeManager('Newsletter'), async (req, res) => {
  try {
    await EmailTemplate.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Template deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting template' });
  }
});

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.post('/api/admin/newsletter/send', authenticateToken, authorizeManager('Newsletter'), async (req, res) => {
  try {
    const { subscriberIds, templateId, customSubject, customBody } = req.body;
    
    if (!subscriberIds || subscriberIds.length === 0) {
      return res.status(400).json({ error: 'No subscribers selected' });
    }

    const subscribers = await Subscriber.findAll({
      where: {
        id: subscriberIds,
        isActive: true
      }
    });

    if (subscribers.length === 0) {
      return res.status(400).json({ error: 'No active subscribers found for the selected IDs' });
    }

    const emailPromises = subscribers.map(sub => {
      return transporter.sendMail({
        from: `"NJ Real Estate" <${process.env.GMAIL_USER}>`,
        to: sub.email,
        subject: customSubject,
        html: customBody,
      });
    });

    // Run in background so the UI doesn't hang
    Promise.allSettled(emailPromises).then(results => {
      const failed = results.filter(r => r.status === 'rejected');
      if (failed.length > 0) {
        console.error(`${failed.length} emails failed to send:`, failed.map(f => f.reason));
      } else {
        console.log('All emails sent successfully.');
      }
    });

    res.json({ message: 'Email sending process started successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Error sending emails' });
  }
});

// FAQ Management Routes (Admin Only)
app.get('/api/admin/faqs', authenticateToken, authorizeManager('FAQ'), async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (search) {
      where[Op.or] = [
        { question: { [Op.iLike]: `%${search}%` } },
        { answer: { [Op.iLike]: `%${search}%` } }
      ];
    }
    const { count, rows } = await PropertyFaq.findAndCountAll({
      where,
      include: [{ model: Property, as: 'property', attributes: ['id', 'title', 'location', 'city'] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    res.json({
      faqs: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching admin FAQs:', error);
    res.status(500).json({ error: 'Error fetching FAQs' });
  }
});

app.post('/api/admin/faqs', authenticateToken, authorizeManager('FAQ'), async (req, res) => {
  try {
    const { propertyId, question, answer } = req.body;
    if (!propertyId || !question || !answer) {
      return res.status(400).json({ error: 'Property ID, question, and answer are required' });
    }
    const faq = await PropertyFaq.create(req.body);
    const faqWithProp = await PropertyFaq.findByPk(faq.id, {
      include: [{ model: Property, as: 'property', attributes: ['id', 'title', 'location', 'city'] }]
    });
    res.status(201).json(faqWithProp);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ error: 'Error creating FAQ' });
  }
});

app.put('/api/admin/faqs/:id', authenticateToken, authorizeManager('FAQ'), async (req, res) => {
  try {
    const { id } = req.params;
    await PropertyFaq.update(req.body, { where: { id } });
    const updated = await PropertyFaq.findByPk(id, {
      include: [{ model: Property, as: 'property', attributes: ['id', 'title', 'location', 'city'] }]
    });
    res.json({ message: 'FAQ updated successfully', faq: updated });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ error: 'Error updating FAQ' });
  }
});

app.patch('/api/admin/faqs/:id/toggle-delete', authenticateToken, authorizeManager('FAQ'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    await PropertyFaq.update({ isDeleted }, { where: { id } });
    res.json({ message: 'FAQ status updated successfully' });
  } catch (error) {
    console.error('Error updating FAQ status:', error);
    res.status(500).json({ error: 'Error updating FAQ status' });
  }
});

app.delete('/api/admin/faqs/:id', authenticateToken, authorizeManager('FAQ'), async (req, res) => {
  try {
    const { id } = req.params;
    await PropertyFaq.destroy({ where: { id } });
    res.json({ message: 'FAQ deleted permanently' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ error: 'Error deleting FAQ' });
  }
});

// Admin Settings Routes
app.get('/api/admin/settings', authenticateToken, authorizeManager('Settings'), async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Server error fetching settings' });
  }
});

app.put('/api/admin/settings', authenticateToken, authorizeManager('Settings'), async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      await settings.update(req.body);
    }
    res.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Server error updating settings' });
  }
});

// Public Contact Submission Route
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, comment, toEmail } = req.body;

  if (!name || !email || !comment) {
    return res.status(400).json({ error: 'Name, email and comment are required fields.' });
  }

  // Fallback defaults pulling from companyInfo.js static specifications
  let targetEmail = toEmail || 'prem30488@gmail.com';
  let siteName = 'N. J. Properties';
  let siteAddress = 'Gandhinagar - Kudasan Rd, Kudasan, Gandhinagar, Gujarat 382419';
  let sitePhone = '+91 9624259046';

  // Load dynamic settings from database Settings table
  try {
    const dbSettings = await Settings.findOne();
    if (dbSettings) {
      if (!toEmail && dbSettings.contactEmail && dbSettings.contactEmail !== 'contact@realestate.com') {
        targetEmail = dbSettings.contactEmail;
      }
      if (dbSettings.siteName && dbSettings.siteName !== 'Real Estate Platform') {
        siteName = dbSettings.siteName;
      }
      if (dbSettings.address && dbSettings.address !== '123 Real Estate Blvd, City, Country') {
        siteAddress = dbSettings.address;
      }
      if (dbSettings.contactPhone && dbSettings.contactPhone !== '+1 234 567 8900') {
        sitePhone = dbSettings.contactPhone;
      }
    }
  } catch (err) {
    console.error('Error fetching dynamic settings in /api/contact:', err);
  }

  console.log('--- RECEIVED DYNAMIC CONTACT MESSAGE ---');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone || 'N/A'}`);
  console.log(`Comment: ${comment}`);
  console.log(`Recipient: ${targetEmail}`);
  console.log('----------------------------------------');

  try {
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      await transporter.sendMail({
        from: `"${siteName} Inbound Desk" <${process.env.GMAIL_USER}>`,
        to: targetEmail,
        subject: `New Customer Inquiry: ${name} via ${siteName}`,
        html: `
          <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 50px 20px; color: #334155; margin: 0; -webkit-font-smoothing: antialiased;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.03); border: 1px solid #e2e8f0;">
              <!-- Professional Header -->
              <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding: 35px 40px; border-bottom: 4px solid #a855f7;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #a855f7; font-weight: 700; display: block; margin-bottom: 6px;">Customer Inbound Gateway</span>
                <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">${siteName} Inbound Inquiry</h2>
              </div>
              
              <!-- Content Body -->
              <div style="padding: 40px;">
                <p style="margin: 0 0 25px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                  Hello Team,<br/><br/>
                  A prospective customer has initiated an inquiry through the digital gateway of <strong>${siteName}</strong>. 
                  Below are the verified client credentials and request details:
                </p>
                
                <!-- Lead Table Grid -->
                <div style="background: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background: #fafafa;">
                      <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b; width: 140px;">Client Name</td>
                      <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Email Address</td>
                      <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #4f46e5;">
                        <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a>
                      </td>
                    </tr>
                    <tr style="background: #fafafa;">
                      <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 13px; font-weight: 600; color: #64748b;">Phone Number</td>
                      <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">${phone || 'Not Provided'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 14px 20px; font-size: 13px; font-weight: 600; color: #64748b;">Submission Time</td>
                      <td style="padding: 14px 20px; font-size: 13px; font-weight: 500; color: #475569;">${new Date().toLocaleString()}</td>
                    </tr>
                  </table>
                </div>
                
                <!-- Client Inquiry Remarks Section -->
                <div style="background-color: #faf5ff; border-left: 4px solid #a855f7; padding: 25px; border-radius: 4px 12px 12px 4px; margin-bottom: 35px;">
                  <h4 style="margin: 0 0 10px 0; font-size: 12px; font-weight: 800; color: #6b21a8; text-transform: uppercase; letter-spacing: 1px;">Customer Message</h4>
                  <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #4b1a7a; font-style: italic;">
                    "${comment.replace(/\n/g, '<br/>')}"
                  </p>
                </div>
                
                <!-- Reply Instant Action CTA -->
                <div style="text-align: center;">
                  <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%); color: #ffffff; text-decoration: none; padding: 14px 35px; font-size: 13px; font-weight: 700; border-radius: 8px; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2); letter-spacing: 0.5px; transition: all 0.2s;">
                    Reply to ${name} Instantly
                  </a>
                </div>
              </div>
              
              <!-- Professional Signature Footer -->
              <div style="background-color: #f8fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #1e293b;">${siteName}</p>
                <p style="margin: 0 0 12px 0; font-size: 12px; color: #64748b; line-height: 1.4;">${siteAddress} | Helpline: ${sitePhone}</p>
                <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                  This transaction correspondence has been dispatched automatically in response to your platform settings. <br/>
                  &copy; 2026 ${siteName}. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        `,
      });
      return res.status(200).json({ message: 'Message sent successfully! Our team will get back to you shortly.' });
    } else {
      return res.status(200).json({ 
        message: 'Message received successfully! (Simulation Mode: Node Mailer not configured in environment)' 
      });
    }
  } catch (error) {
    console.error('Nodemailer error in /api/contact:', error);
    return res.status(200).json({ 
      message: 'Message received successfully! (Notice: Email dispatch server was offline, logged in terminal)' 
    });
  }
});

// --- PUBLIC BUILDERS ---
app.get('/api/builders', async (req, res) => {
  const { city } = req.query;
  try {
    const where = { is_verified: true, status: 'Active' };
    if (city) {
      where.city = { [Op.iLike]: `%${city}%` };
    }
    const builders = await Builder.findAll({
      where,
      order: [['average_rating', 'DESC'], ['total_projects_completed', 'DESC']]
    });
    res.json(builders);
  } catch (error) {
    console.error('Error fetching public builders:', error);
    res.status(500).json({ error: 'Error fetching builders' });
  }
});

// --- BUILDER MANAGEMENT (ADMIN) ---

// Get all builders (paginated, with search)
app.get('/api/admin/builders', authenticateToken, authorizeManager('Builders'), async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    let where = {};
    if (search) {
      where = {
        [Op.or]: [
          { company_name: { [Op.iLike]: `%${search}%` } },
          { owner_name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { city: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    const { count, rows } = await Builder.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      builders: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching builders:', error);
    res.status(500).json({ error: 'Error fetching builders' });
  }
});

// Get single builder
app.get('/api/admin/builders/:id', authenticateToken, authorizeManager('Builders'), async (req, res) => {
  try {
    const builder = await Builder.findByPk(req.params.id);
    if (!builder) return res.status(404).json({ error: 'Builder not found' });
    res.json(builder);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching builder' });
  }
});

// Create builder
app.post('/api/admin/builders', authenticateToken, authorizeManager('Builders'), async (req, res) => {
  try {
    const builder = await Builder.create(req.body);
    res.status(201).json(builder);
  } catch (error) {
    console.error('Error creating builder:', error);
    res.status(500).json({ error: 'Error creating builder', details: error.message });
  }
});

// Update builder
app.put('/api/admin/builders/:id', authenticateToken, authorizeManager('Builders'), async (req, res) => {
  try {
    const { id } = req.params;
    const builder = await Builder.findByPk(id);
    if (!builder) return res.status(404).json({ error: 'Builder not found' });

    await Builder.update(req.body, { where: { id } });
    const updatedBuilder = await Builder.findByPk(id);
    res.json(updatedBuilder);
  } catch (error) {
    console.error('Error updating builder:', error);
    res.status(500).json({ error: 'Error updating builder' });
  }
});

// Delete builder
app.delete('/api/admin/builders/:id', authenticateToken, authorizeManager('Builders'), async (req, res) => {
  try {
    const { id } = req.params;
    const builder = await Builder.findByPk(id);
    if (!builder) return res.status(404).json({ error: 'Builder not found' });

    await Builder.destroy({ where: { id } });
    res.json({ message: 'Builder deleted successfully' });
  } catch (error) {
    console.error('Error deleting builder:', error);
    res.status(500).json({ error: 'Error deleting builder' });
  }
});

// Initialize database and start server
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
