# AGENTS.md

Guidance for AI coding agents working on this repo: the marketing and booking site for **Gray Eagle Condo**, a 3 bed / 3 bath vacation rental in Mammoth Lakes, CA. Live at https://grayeagle3.com.

## Stack

- React 19 + Vite, React Router (`BrowserRouter`, real paths), plain CSS (`src/index.css`), `lucide-react` icons.
- No backend. Hosted on GitHub Pages; DNS on Cloudflare (records are **DNS only**, not proxied, so GitHub can renew the HTTPS cert).
- Every page is pre-rendered to static HTML at build time for SEO.

## Commands

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run lint       # oxlint (one known warning in theme.jsx is fine)
npm run build      # client build + SSR build + scripts/prerender.mjs -> dist/
npx serve dist     # preview the build with GitHub Pages-style clean URLs (/condo -> condo.html)
```

`vite preview` does not mimic GitHub Pages' `/condo` → `condo.html` mapping; use `npx serve dist` to check routing.

## Layout

| Path | What |
| --- | --- |
| `src/data/site.js` | Listing facts: booking URLs, guests, beds, amenities, policies, FAQ, photo groups. **Edit content here, not in components.** |
| `src/data/seasons.js` | Winter/summer copy and activities; `seasonalDefault()` (Jun–Aug = summer). |
| `src/data/seo.js` | Per-page titles/descriptions, sitemap entries, schema.org `VacationRental` JSON-LD. |
| `src/data/rating.json` | Airbnb rating + review count; rewritten weekly by a GitHub Action. |
| `src/theme.jsx` | Season context, `S` keyboard shortcut, sessionStorage override. |
| `src/weather.js` | Shared Open-Meteo fetch for Town / Main Lodge / Summit. |
| `src/components/Scene.jsx`, `SceneFolks.jsx` | Illustrated SVG hero landscape and its animated characters. |
| `src/components/Rider.jsx` | Skier/biker animation that plays when the season is switched. |
| `src/entry-server.jsx`, `scripts/prerender.mjs` | Build-time pre-rendering, 404 page, sitemap. |
| `scripts/update-rating.mjs` | Reads the Airbnb listing's `starRating`/`reviewCount`. |
| `public/photos/{full,thumb}/N.webp` | Property photos (1800px / 640px), numbered 1–46. |

## Deploy & automation

- `.github/workflows/deploy.yml`: builds and deploys on every push to `main`, plus Jun 1 / Sep 1 so pre-rendered pages match the season.
- `.github/workflows/update-rating.yml`: Mondays; commits `rating.json` only if it changed, then triggers a deploy (pushes made with `GITHUB_TOKEN` don't trigger workflows on their own). Fails without touching the file if the numbers can't be read.
- Pushing to `main` publishes to the live site immediately.

## Rules and gotchas

- **SSR safety:** components are rendered in Node at build time. Don't touch `window`, `document`, `sessionStorage`, or `matchMedia` at module scope or during render; use effects or `typeof window` guards.
- **Adding a page:** add the route in `src/App.jsx` **and** an entry in `src/data/seo.js` (path, file, title, description) so it's pre-rendered and in the sitemap.
- **Asset paths:** Vite `base` is `/`. Use `photo(id)` / `thumb(id)` from `site.js` for images.
- **Old links:** `/#/condo`-style URLs are forwarded in `src/main.jsx`; keep that.
- **Reduced motion:** all animation (snow, rider, scene characters) must respect `prefers-reduced-motion`.
- **Style:** match the existing flat illustration style and the per-season CSS variables at the top of `index.css`. Keep animations subtle.

## Content preferences from the owners

- **Booking:** Hostfully (`site.bookUrl`, embedded on `/book`) is the preferred path. Primary buttons say "Book direct and save"; don't call out Airbnb in that label. Airbnb gets a smaller secondary button in Airbnb coral (`#ff385c`). There is **no VRBO listing** and **no contact email**: guests communicate through Hostfully or Airbnb.
- **Savings %:** `site.directSavings` is `null` until the owners supply a real number. Don't invent one.
- **Free shuttle:** describe it as "one of the prides of Mammoth Lakes" (once per page, not repeated).
- **Camera:** "1 camera facing out from the garage only." Don't describe it as security cameras.
- **Address:** don't publish the street address (privacy and security). Town, ZIP, and approximate coordinates only.
- **Ratings:** keep the Airbnb rating visible on the page, but **not** in the JSON-LD (Google prohibits self-serving or third-party-aggregated ratings there).
- **Credits:** keep "Photos © Nolan Nitschke" and the SkiCamsLive.com credit on the Live page and footer.
- **Don't invent facts** (bed sizes, distances, prices, policies). Ask the owners.

## Working with the owners

- For visible design or animation changes, run it locally and let the owners review before pushing. Small content fixes can go straight to `main`.
- Verify UI changes in a real browser (desktop and ~390px mobile) before calling them done.
