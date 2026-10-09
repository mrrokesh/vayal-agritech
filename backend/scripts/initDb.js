// Creates the database (if missing), then applies schema.sql and seed.sql.
import { readFile } from 'node:fs/promises';
import pg from 'pg';

const url = new URL(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/vayal');
const dbName = url.pathname.slice(1);

// Connect to the default "postgres" database to create ours.
const adminUrl = new URL(url);
adminUrl.pathname = '/postgres';
const admin = new pg.Client({ connectionString: adminUrl.toString() });
await admin.connect();
const { rowCount } = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
if (!rowCount) {
  await admin.query(`CREATE DATABASE "${dbName.replace(/"/g, '""')}"`);
  console.log(`Created database ${dbName}`);
}
await admin.end();

const client = new pg.Client({ connectionString: url.toString() });
await client.connect();
for (const file of ['schema.sql', 'seed.sql']) {
  await client.query(await readFile(new URL(`../db/${file}`, import.meta.url), 'utf8'));
  console.log(`Applied ${file}`);
}
await client.end();
console.log('Database ready.');
