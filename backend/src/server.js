import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import catalog from './routes/catalog.js';
import lots from './routes/lots.js';
import enquiries from './routes/enquiries.js';
import admin from './routes/admin.js';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || true }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ ok: true });
});
app.use('/api', catalog);
app.use('/api/lots', lots);
app.use('/api/enquiries', enquiries);
app.use('/api/admin', admin);

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// Express 5 forwards rejected promises from async handlers here.
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Vayal API on http://localhost:${port}`));
