# Deploy (Vercel)

Iz ovog Cursor okruženja **ne mogu da završim deploy na tvoj nalog** — potrebna je prijava na Vercel (ili `VERCEL_TOKEN`) i obično Git repozitorijum na GitHubu. Ispod su tačni koraci koje pokreneš lokalno za ~5 minuta.

## 1. Git + GitHub (ako još nemaš)

```bash
cd /put/do/rentBoat
git init
git add .
git commit -m "Initial commit"
```

Na GitHubu napravi novi prazan repo, zatim:

```bash
git remote add origin https://github.com/TVOJ_USER/rentBoat.git
git branch -M main
git push -u origin main
```

## 2. Vercel projekat

1. Otvori [vercel.com](https://vercel.com) → **Add New** → **Project** → importuj repo.
2. **Root Directory**: podesi na **`app`** (Next aplikacija je u podfolderu).
3. **Environment Variables**: kopiraj sve iz `app/.env` / `app/.env.example` (npr. `DATABASE_URL`, `DIRECT_URL`, Supabase, Brevo, Telegram, itd.).
4. **Deploy**.

Build na Vercelu koristi `npm run build` → sada uključuje `prisma generate` pre `next build`.

## 3. Deploy iz terminala (alternativa)

Ako si već povezao projekat:

```bash
cd app
npx vercel login          # jednom
npx vercel link           # jednom po folderu
npm run deploy            # produkcija (--prod)
```

Ili sa tokenom (CI):

```bash
export VERCEL_TOKEN=...   # Vercel → Settings → Tokens
cd app && npx vercel --prod --token $VERCEL_TOKEN
```

## 4. Baza

Za produkciju koristi **Supabase** (ili drugi Postgres) i iste `DATABASE_URL` / `DIRECT_URL` kao u README. `prisma db push` / migracije uradi jednom prema svojoj praksi (lokalno ili iz CI).
