# Vayal Agri-Tech website

React (Vite) frontend + Node.js (Express) API + PostgreSQL, in separate folders.

```
Agri/
├── frontend/   React 19 + Vite — the website (EN / தமிழ்)
│   ├── public/img/        product photos
│   └── src/components/    one component per page section
└── backend/    Node.js + Express + pg — REST API
    ├── db/schema.sql      tables
    ├── db/seed.sql        products, drone rates, Uzhvan lots
    └── src/routes/        API routes
```

## 1. Database

Edit `backend/.env` and put your Postgres password in `DATABASE_URL`:

```
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/vayal
```

Then create the `vayal` database, tables and seed data (re-running resets it):

```bash
cd backend
npm install
npm run db:init
```

## 2. Run

Two terminals:

```bash
cd backend && npm run dev      # API on http://localhost:5000
```

```bash
cd frontend && npm install && npm run dev   # site on http://localhost:5173
```

Vite proxies `/api` to the backend in development.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/health` | DB connectivity check |
| GET | `/api/products` | Kit / Hub / Node / Tag / Plus prices |
| GET | `/api/drone-rates` | Per-crop drone spraying rates |
| GET | `/api/lots?type=B2B\|B2D&q=` | Uzhvan marketplace lots (filter + search) |
| POST | `/api/lots/:id/bids` | Place a bid `{ name, phone, price }` |
| POST | `/api/enquiries` | Farm-visit / callback form |
| GET | `/api/admin/enquiries` | List enquiries — needs `Authorization: Bearer <ADMIN_TOKEN>` |
| GET | `/api/admin/bids` | List bids — same auth |

## Production

- `cd frontend && npm run build` → static files in `frontend/dist/`. Set `VITE_API_URL` (see `frontend/.env.example`) if the API is on another origin.
- Backend: set `DATABASE_URL`, `CORS_ORIGIN` and a strong `ADMIN_TOKEN`, then `npm start`.
