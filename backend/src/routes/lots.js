import { Router } from 'express';
import { query } from '../db.js';
import { str, phone10, posNum } from '../validate.js';

const router = Router();

// GET /api/lots?type=B2B|B2D&q=search
router.get('/', async (req, res) => {
  const params = [];
  const where = ['active'];
  const type = str(req.query.type, 3);
  if (type === 'B2B' || type === 'B2D') {
    params.push(type);
    where.push(`buyer_type = $${params.length}`);
  }
  const q = str(req.query.q, 60);
  if (q) {
    params.push(`%${q}%`);
    where.push(`(crop_en ILIKE $${params.length} OR crop_ta ILIKE $${params.length}
               OR district_en ILIKE $${params.length} OR district_ta ILIKE $${params.length})`);
  }
  const { rows } = await query(
    `SELECT id, crop_en, crop_ta, farmer_en, farmer_ta, district_en, district_ta,
            quantity_en, quantity_ta, quality_en, quality_ta, price, unit, buyer_type,
            available_en, available_ta
       FROM lots WHERE ${where.join(' AND ')} ORDER BY id`,
    params
  );
  res.json(rows);
});

// POST /api/lots/:id/bids  { name, phone, price }
router.post('/:id/bids', async (req, res) => {
  const lotId = Number(req.params.id);
  const name = str(req.body?.name, 100);
  const phone = phone10(req.body?.phone);
  const price = posNum(req.body?.price);
  if (!Number.isInteger(lotId) || !name || !phone || !price) {
    return res.status(400).json({ error: 'Name, a 10-digit mobile number and a price are required.' });
  }
  const lot = await query('SELECT id FROM lots WHERE id = $1 AND active', [lotId]);
  if (!lot.rowCount) return res.status(404).json({ error: 'Lot not found' });

  const { rows } = await query(
    'INSERT INTO bids (lot_id, name, phone, price) VALUES ($1, $2, $3, $4) RETURNING id, created_at',
    [lotId, name, phone, Math.round(price)]
  );
  res.status(201).json(rows[0]);
});

export default router;
