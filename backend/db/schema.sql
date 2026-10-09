-- Vayal Agri-Tech schema. Safe to re-run: drops and recreates all tables.
DROP TABLE IF EXISTS bids, enquiries, lots, drone_rates, products CASCADE;

CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name_en     TEXT NOT NULL,
  name_ta     TEXT NOT NULL,
  price       INTEGER NOT NULL,          -- rupees
  mrp         INTEGER,                   -- struck-through price, if discounted
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE drone_rates (
  crop           TEXT PRIMARY KEY,
  name_en        TEXT NOT NULL,
  name_ta        TEXT NOT NULL,
  litres_per_acre INTEGER NOT NULL,
  cost_per_acre   INTEGER NOT NULL,
  minutes_per_acre INTEGER NOT NULL DEFAULT 8
);

CREATE TABLE lots (
  id            SERIAL PRIMARY KEY,
  crop_en       TEXT NOT NULL,
  crop_ta       TEXT NOT NULL,
  farmer_en     TEXT NOT NULL,
  farmer_ta     TEXT NOT NULL,
  district_en   TEXT NOT NULL,
  district_ta   TEXT NOT NULL,
  quantity_en   TEXT NOT NULL,
  quantity_ta   TEXT NOT NULL,
  quality_en    TEXT NOT NULL,
  quality_ta    TEXT NOT NULL,
  price         INTEGER NOT NULL,
  unit          TEXT NOT NULL CHECK (unit IN ('quintal','kg','nut','tonne')),
  buyer_type    TEXT NOT NULL CHECK (buyer_type IN ('B2B','B2D')),
  available_en  TEXT NOT NULL,
  available_ta  TEXT NOT NULL,
  active        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE bids (
  id          SERIAL PRIMARY KEY,
  lot_id      INTEGER NOT NULL REFERENCES lots(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  phone       CHAR(10) NOT NULL,
  price       INTEGER NOT NULL CHECK (price > 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE enquiries (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       CHAR(10) NOT NULL,
  role        TEXT NOT NULL,
  district    TEXT,
  product     TEXT NOT NULL,
  acres       NUMERIC(8,2),
  message     TEXT,
  lang        TEXT NOT NULL DEFAULT 'en',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX lots_buyer_type_idx ON lots (buyer_type) WHERE active;
CREATE INDEX bids_lot_idx ON bids (lot_id);
