import { Client } from 'pg';

const dbName = process.env.DB_NAME || 'postgres';

async function createDbIfNotExists() {
  const client = new Client({
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_POSTGRES_NAME}`, // points to postgres DB
  });

  await client.connect();
  const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database "${dbName}" created`);
  } else {
    console.log(`Database "${dbName}" already exists`);
  }
  await client.end();
}

createDbIfNotExists().catch(console.error);