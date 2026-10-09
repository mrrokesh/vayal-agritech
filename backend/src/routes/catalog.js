import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/products', async (_req, res) => {
  const { rows } = await query(
    'SELECT slug, name_en, name_ta, price, mrp FROM products ORDER BY sort_order'
  );
  res.json(rows);
});

router.get('/drone-rates', async (_req, res) => {
  const { rows } = await query(
    'SELECT crop, name_en, name_ta, litres_per_acre, cost_per_acre, minutes_per_acre FROM drone_rates ORDER BY cost_per_acre'
  );
  res.json(rows);
});

export default router;
