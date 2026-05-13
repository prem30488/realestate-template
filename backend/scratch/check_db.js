const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/realestate_db?sslmode=disable';

async function checkProperties() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const res = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'properties'");
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

checkProperties();
