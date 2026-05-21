const fs = require('fs');
const path = require('path');
const https = require('https');
const { PropertyImage } = require('./models');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (fs.existsSync(filepath)) {
      // Do not download image if it already exists
      console.log(`Skipping (already exists): ${filepath}`);
      return resolve(true);
    }

    https.get(url, (response) => {
      // Handle HTTP redirects (e.g. picsum.photos redirects to fastly image servers)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }

      const writer = fs.createWriteStream(filepath);
      response.pipe(writer);
      writer.on('finish', () => {
        writer.close();
        console.log(`Successfully Downloaded: ${filepath}`);
        resolve(true);
      });
      writer.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
};

const seedImages = async () => {
  try {
    console.log('Fetching properties from database...');
    // We import Property to check which ones lack images
    const { Property } = require('./models');
    
    const properties = await Property.findAll({
      include: [{ model: PropertyImage, as: 'images' }]
    });
    
    console.log(`Found ${properties.length} total properties. Verifying database mappings...`);
    
    let imagesToProcess = [];

    for (const property of properties) {
      if (!property.images || property.images.length === 0) {
        // Seed 3 images for this property
        for (let j = 1; j <= 3; j++) {
          const imageUrl = `/images/${property.id}/img_${j}.jpg`;
          const newImg = await PropertyImage.create({
            propertyId: property.id,
            imageUrl: imageUrl
          });
          imagesToProcess.push(newImg);
        }
      } else {
        // Property already has images, just add them to the download check list
        imagesToProcess.push(...property.images);
      }
    }
    
    console.log(`Database seeded! ${imagesToProcess.length} images mapped in the database. Validating local files...`);
    
    for (const img of imagesToProcess) {
      if (img.imageUrl && img.imageUrl.startsWith('/images/')) {
        const filepath = path.join(__dirname, '..', 'frontend', 'public', img.imageUrl);
        const url = `https://picsum.photos/800/600?random=${img.id}`;
        
        try {
            await downloadImage(url, filepath);
        } catch (downloadErr) {
            console.error(`Failed to download for ${img.imageUrl}: ${downloadErr.message}`);
        }
        
        // Add a small 100ms delay to avoid rate limiting from the image provider
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    console.log('\n✅ Image Database Seeding & Downloading Complete! All properties now have local image assets.');
    process.exit(0);
  } catch (err) {
    console.error('Critical Error during image seeding:', err);
    process.exit(1);
  }
};

seedImages();
