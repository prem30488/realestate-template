require('dotenv').config();
const { Client } = require('pg');
const { sequelize } = require('./models');

async function initDb() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL is not defined in .env file');
    process.exit(1);
  }

  const dbUrlObj = new URL(dbUrl);
  const dbName = dbUrlObj.pathname.split('/')[1];
  
  // Connection config for the server (connecting to 'postgres' default db first)
  const serverConfig = {
    user: dbUrlObj.username,
    password: dbUrlObj.password,
    host: dbUrlObj.hostname,
    port: dbUrlObj.port || 5432,
    database: 'postgres' // Connect to default postgres db to create the new one
  };

  const client = new Client(serverConfig);

  try {
    await client.connect();
    
    // Check if database exists
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    
    if (res.rowCount === 0) {
      console.log(`Database "${dbName}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.error('Error during database initialization:', err);
    throw err;
  } finally {
    await client.end();
  }

  try {
    console.log('Syncing models with the database...');
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (err) {
    console.error('Error syncing models:', err);
    throw err;
  }
}

module.exports = initDb;
