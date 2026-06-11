try {
    const { InteriorDesigner, InteriorArticle } = require('./models');
    console.log('✅ InteriorDesigner model:', typeof InteriorDesigner);
    console.log('✅ InteriorArticle model:', typeof InteriorArticle);
} catch (e) {
    console.error('❌ Error loading models:');
    console.error(e.message);
    console.error(e.stack);
}
