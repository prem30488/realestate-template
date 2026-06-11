try {
  const routes = require('./routes/interiorRoutesPublic');
  console.log('✅ Module loaded successfully');
  console.log('Router:', typeof routes);
  console.log('Keys:', Object.keys(routes || {}));
} catch (e) {
  console.error('❌ Error loading module:');
  console.error(e.message);
  console.error(e.stack);
}
