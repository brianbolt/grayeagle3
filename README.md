# Gray Eagle Condo · Mammoth Lakes

Website for the Gray Eagle Condo, a 3 bedroom / 3 bath vacation rental in Mammoth Lakes, CA.

Built with React + Vite. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Seasonal themes

The site has a **winter** (ski) theme and a **summer** (lakes, fishing, cycling, hiking) theme.

- June–August defaults to summer; every other month defaults to winter (`src/data/seasons.js`).
- Visitors can flip themes anytime with the floating button (bottom-right), the toggle in the nav, or by pressing **S**.

## Editing content

| What | Where |
| --- | --- |
| Booking links (Hostfully is the main Book button), savings %, guest count, rating, check-in times | `src/data/site.js` → `site` |
| Amenities, policies, FAQ, packing lists | `src/data/site.js` |
| Seasonal headlines and activities | `src/data/seasons.js` |
| Colors for each season | `src/index.css` (top of file) |
| Photos | `public/photos/full` (1800px) and `public/photos/thumb` (640px) |

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

Photos © Nolan Nitschke. Town of Mammoth Lakes permit #TOML-CPAN-16072.
