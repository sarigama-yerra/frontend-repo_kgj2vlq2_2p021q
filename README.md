BoomiisUK – Fast API + React (Vite) MVP

Overview
- Mobile-first ordering and reservations site with admin basics, built for this environment.
- Frontend: React + Vite + Tailwind. Backend: FastAPI + MongoDB helper. Payments: Stripe (optional env key).

Environment Variables
Backend
- DATABASE_URL: MongoDB connection string
- DATABASE_NAME: MongoDB database name
- ADMIN_EMAIL: Admin login email (default admin@boomiis.uk)
- ADMIN_PASSWORD: Bootstrap admin password (hash generated on first login if ADMIN_PASSWORD_HASH not set)
- ADMIN_PASSWORD_HASH: SHA256 hash of the admin password (preferred)
- ADMIN_SESSION_SECRET: Random secret for session cookie HMAC
- STRIPE_SECRET: Stripe secret key (for GBP payments)

Frontend
- VITE_BACKEND_URL: Backend base URL

Seed Data
- Use the Admin page to add categories and items. You can also insert documents directly into MongoDB collections named in schemas.py.

Admin Login (default)
- Email: admin@boomiis.uk
- Password: admin12345 (override via envs above)

Key Endpoints
- GET /api/menu – categories + items with tag and category filters
- POST /api/orders – create order and Stripe PaymentIntent when STRIPE_SECRET is set
- POST /api/orders/confirm – mark order paid (MVP)
- POST /api/reservations – availability-checked reservation request
- POST /api/events/inquiry – events & catering inquiry
- POST /api/subscribe – newsletter signup
- Admin: /api/admin/login, /api/admin/logout, /api/admin/menu, /api/admin/menu/category, /api/admin/menu/item

Notes
- This MVP focuses on core flows with clean UX. Performance: Tailwind, light assets, mobile-first. Accessibility: labels/contrast structures used; extend as needed.
- For Vercel + PostgreSQL + Prisma, request Option 2 and we’ll scaffold the Next.js codebase ready for deployment.
