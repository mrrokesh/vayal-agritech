import { Router } from 'express';
import { query } from '../db.js';
import { str, phone10, posNum } from '../validate.js';

const router = Router();

const ROLES = ['farmer', 'fpo', 'carbon', 'buyer', 'dealer', 'business'];

// POST /api/enquiries — the "Book a free farm visit" form
router.post('/', async (req, res) => {
  const b = req.body ?? {};
  const name = str(b.name, 100);
  const phone = phone10(b.phone);
  const product = str(b.product, 80);
  if (!name || !phone || !product) {
    return res.status(400).json({ error: 'Name, a 10-digit mobile number and a product are required.' });
  }
  const role = ROLES.includes(b.role) ? b.role : 'farmer';
  const { rows } = await query(
    `INSERT INTO enquiries (name, phone, role, district, product, acres, message, lang)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, created_at`,
    [name, phone, role, str(b.district, 80) || null, product, posNum(b.acres),
     str(b.message, 2000) || null, b.lang === 'ta' ? 'ta' : 'en']
  );
  res.status(201).json(rows[0]);
});

export default router;
