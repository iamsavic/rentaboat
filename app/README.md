# Rent-a-Boat Budva

Speedboat tour booking platform built with Next.js 15, Tailwind CSS, Supabase, and Prisma.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Supabase or local) |
| ORM | Prisma v6 |
| i18n | next-intl (EN + SR) |
| Email | Brevo (300 free emails/day) |
| Notifications | Telegram Bot API |
| Hosting | Vercel (free tier) |

## Getting Started

### Option A: Run with Docker (recommended for local dev)

From the project root:

```bash
docker compose up --build
```

Then open [http://localhost:3000](http://localhost:3000). The app will:
- Start PostgreSQL 16 in a container
- Run `prisma db push` and seed the database
- Start Next.js in dev mode

PostgreSQL is exposed on port **5433** (host) to avoid conflict with a local Postgres on 5432.

For email (Brevo) and Telegram notifications, add the corresponding env vars to the `app` service in `docker-compose.yml` or use an `.env` file in `app/`.

To stop: `docker compose down`

### Option B: Run without Docker

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` — Supabase PostgreSQL connection string (pgbouncer)
- `DIRECT_URL` — Supabase direct connection string  
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `BREVO_API_KEY` — Brevo API key for email
- `BREVO_SENDER_EMAIL` — Verified sender email
- `ADMIN_EMAIL` — Email to receive booking notifications
- `TELEGRAM_BOT_TOKEN` — Telegram bot token (from @BotFather)
- `TELEGRAM_ADMIN_CHAT_ID` — Your Telegram chat ID

### 3. Set up the database

```bash
# Push schema to Supabase
npm run db:push

# Seed with tours and test data
npm run db:seed
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it will redirect to `/en`.

## Routes

| Path | Description |
|---|---|
| `/en` or `/sr` | Homepage |
| `/en/tours` | Tours listing |
| `/en/tours/[slug]` | Tour detail with calendar |
| `/en/booking?tour=...` | Booking flow (4 steps) |
| `/en/destinations` | Destinations guide |
| `/en/faq` | FAQ accordion |
| `/en/contact` | Contact form + info |
| `/en/about` | About page |
| `/en/legal/terms` | Terms of Service |
| `/en/legal/privacy` | Privacy Policy |
| `/admin` | Admin dashboard |
| `/admin/reservations` | Manage reservations |
| `/admin/calendar` | Block dates/times |
| `/admin/tours` | View tours |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/availability` | Get available time slots |
| POST | `/api/bookings` | Create a booking |
| PATCH | `/api/admin/reservations/[id]` | Update booking status |
| POST | `/api/admin/availability` | Block date/time |
| DELETE | `/api/admin/availability/[id]` | Remove block |

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy — automatic on every push to main

## Notifications

### Brevo Email
- Guest receives booking confirmation after submitting
- Admin receives full booking details

### Telegram Bot Setup
1. Message @BotFather on Telegram → `/newbot`
2. Copy the token → `TELEGRAM_BOT_TOKEN`
3. Message your bot, then visit:
   `https://api.telegram.org/bot[TOKEN]/getUpdates`
4. Copy your chat ID → `TELEGRAM_ADMIN_CHAT_ID`

## Adding Hero Image

Place `hero-speedboat.jpg` in `/public/images/` — recommended size: 1920×1080px, max 500KB.

## Database Schema

Key entities:
- **Location** — Marina info (address, contact, hours)
- **Owner** — Vessel owner (own or partner)
- **Vessel** — The speedboat (type, capacity)
- **Tour** — 4 fixed packages with SR/EN names
- **Booking** — Reservation with all guest data
- **Availability** — Admin-blocked dates/times
