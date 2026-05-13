require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Property, PropertyImage, PropertyType, Article, HeroSlider, HomeComponent, MenuItem, Broker, Service, FunFact, InstaReel, Testimonial, Brand, Amenity, sequelize } = require('./models');
const { Op } = require('sequelize');
const initDb = require('./initDb');

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
        { model: PropertyType, as: 'propertyType' }
      ],
      limit: 10
    });

    const latestProperties = await Property.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: [
        { model: PropertyImage, as: 'images' },
        { model: PropertyType, as: 'propertyType' }
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

// Get properties by city with pagination and search
app.get('/api/properties', async (req, res) => {
  const { city, search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (city) {
      where.city = city;
    }
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } },
        { city: { [Op.iLike]: `%${search}%` } },
        { status: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Property.findAndCountAll({
      where,
      include: [
        { model: PropertyImage, as: 'images' },
        { model: PropertyType, as: 'propertyType' }
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
    console.error('Error fetching properties:', error);
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

// Admin Routes
app.patch('/api/admin/properties/:id/toggle-delete', async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    await Property.update({ isDeleted }, { where: { id } });
    res.json({ message: 'Property status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating property' });
  }
});

app.post('/api/admin/properties', authenticateToken, async (req, res) => {
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

app.put('/api/admin/properties/:id', authenticateToken, async (req, res) => {
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

app.delete('/api/admin/properties/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Property.destroy({ where: { id } });
    res.json({ message: 'Property deleted permanently' });
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
    { name: 'Header',                 displayName: 'Header / Navigation',  order: 1,  is_deleted: false },
    { name: 'HeroSlider',             displayName: 'Hero Slider',           order: 2,  is_deleted: false },
    { name: 'Search',                 displayName: 'Search Bar',            order: 3,  is_deleted: false },
    { name: 'CityMap',                displayName: 'City Map',              order: 4,  is_deleted: false },
    { name: 'Featured',               displayName: 'Featured Properties',   order: 5,  is_deleted: false },
    { name: 'Latest',                 displayName: 'Latest Properties',     order: 6,  is_deleted: false },
    { name: 'WhyUs',                  displayName: 'Why Us Section',        order: 7,  is_deleted: false },
    { name: 'OurServices',            displayName: 'Our Services',          order: 8,  is_deleted: false },
    { name: 'FunFact',                displayName: 'Fun Facts',             order: 9,  is_deleted: false },
    { name: 'OurBrokers',             displayName: 'Our Brokers',           order: 10, is_deleted: false },
    { name: 'InstagramVideoCarousel', displayName: 'Instagram Feed',        order: 11, is_deleted: false },
    { name: 'LatestNews',             displayName: 'Latest News',           order: 12, is_deleted: false },
    { name: 'Testimonials',           displayName: 'Testimonials',          order: 13, is_deleted: false },
    { name: 'OurBrands',              displayName: 'Our Brands',            order: 14, is_deleted: false },
    { name: 'Footer',                 displayName: 'Footer',                order: 15, is_deleted: false },
    { name: 'WhatsAppButton',         displayName: 'WhatsApp Float Button', order: 16, is_deleted: false }
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
        { email:    { [Op.iLike]: `%${search}%` } }
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
        { bind: [data.title, data.link||'#', parentId, data.itemType||'link', data.menuType||null, data.badge||null, data.order||0, now, now] }
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
