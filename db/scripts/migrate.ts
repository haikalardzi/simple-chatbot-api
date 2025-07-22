import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({ connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` });
const db = drizzle(client);

async function main() {
  await client.connect();
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations applied');
  await client.end();
}

main().catch((err) => {
  console.error('Migration failed', err);
});