const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/realestate_db?sslmode=disable';

async function updateCoordinates() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    
    const res = await client.query("SELECT id, city FROM properties WHERE LOWER(city) IN ('gandhinagar', 'ahmedabad')");
    console.log(`Found ${res.rows.length} properties to update.`);

    for (const row of res.rows) {
      let lat, lng;
      // Add a small jitter (approx +/- 2km)
      const jitterLat = (Math.random() - 0.5) * 0.04;
      const jitterLng = (Math.random() - 0.5) * 0.04;

      if (row.city.toLowerCase() === 'gandhinagar') {
        lat = 23.2156 + jitterLat;
        lng = 72.6369 + jitterLng;
      } else {
        lat = 23.0225 + jitterLat;
        lng = 72.5714 + jitterLng;
      }

      await client.query(
        'UPDATE properties SET latitude = $1, longitude = $2 WHERE id = $3',
        [lat, lng, row.id]
      );
    }
    
    console.log('Update complete.');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

updateCoordinates();
