# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

JOLIES FLEURS is a Moscow flower shop with three components:

- **`web/`** — Next.js 16 storefront + admin panel, deployed on Vercel
- **`bot.py`** — Telegram bot for bulk-importing product photos
- **`apps-script/code.gs`** — Google Apps Script that receives contact form POSTs and writes them to Google Sheets

## Web app commands

All commands run from `web/`:

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

Deploy by running `./push.sh "commit message"` from the repo root — it commits everything and pushes to `main`; Vercel redeploys automatically.

## Next.js 16 warning

This project uses **Next.js 16.2.7** with React 19. APIs and conventions may differ from training data. Before writing any Next.js-specific code, check `node_modules/next/dist/docs/` for the authoritative reference.

## Architecture: data layer

All site content lives in three JSON files under `web/data/`:
- `products.json` — product catalog
- `settings.json` — all editable text (shop name, tagline, about section, etc.)
- `submissions.json` — contact form submissions (max 200, newest first)

**Read path**: always from local filesystem via `web/lib/data.ts`.

**Write path** (controlled by `isProduction()` in `web/lib/github.ts`):
- **Dev** (no `GITHUB_TOKEN`): writes directly to the local JSON files
- **Prod** (`GITHUB_TOKEN` is set): commits changes via the GitHub API to `SupremeGoogle/JOLIES-FLEURS`, which triggers an automatic Vercel redeploy (~1 min for changes to go live)

This means in production, admin saves and contact form submissions trigger a GitHub commit and a full Vercel redeploy.

## Architecture: admin panel

`/admin` is password-protected (cookie-based session, password from `ADMIN_PASSWORD` env var).

The admin panel (`web/app/admin/AdminClient.tsx`) has four tabs:
- **Products** — CRUD for the catalog; images upload to `public/uploads/` locally or via GitHub API in prod
- **Content** — edits `settings.json` fields
- **Settings** — same settings fields in a different view
- **Submissions** — displays contact form entries

## Architecture: contact form flow

1. `ContactForm` → POST `/api/contact`
2. Saved to `submissions.json` (via local write or GitHub commit)
3. Also forwarded to `APPS_SCRIPT_URL` (Google Apps Script), which appends the row to a Google Sheet
4. Apps Script failure is silently ignored; the local save is authoritative

## Architecture: Telegram bot

`bot.py` collects photos sent to the bot and packages them as a ZIP with price-based filenames.
- "Start" button begins a collection session, "Stop" triggers ZIP creation and download
- Media groups (album sends) are assembled with a 1.5s debounce timer per `group_id`
- Caption lines containing 3+ consecutive digits are treated as price labels
- Photos in `цветы/` are the product images for the catalog

## Environment variables

```
ADMIN_PASSWORD=         # admin panel login password
APPS_SCRIPT_URL=        # Google Apps Script web app URL
GITHUB_TOKEN=           # GitHub PAT (repo scope) — presence triggers production write mode
```

Set locally in `web/.env.local`; set in Vercel dashboard for production.
