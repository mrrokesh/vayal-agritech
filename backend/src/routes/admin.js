import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

// Requires header:  Authorization: Bearer <ADMIN_TOKEN>
router.use((req, res, next) => {
  const token = process.env.ADMIN_TOKEN;
  if (!token || req.get('authorization') !== `Bearer ${token}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

router.get('/enquiries', async (_req, res) => {
  const { rows } = await query('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 500');
  res.json(rows);
});

router.get('/bids', async (_req, res) => {
  const { rows } = await query(
    `SELECT b.*, l.crop_en AS crop FROM bids b JOIN lots l ON l.id = b.lot_id
      ORDER BY b.created_at DESC LIMIT 500`
  );
  res.json(rows);
});

export default router;
