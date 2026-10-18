// Runs after `vite build` + the SSR build: writes one fully rendered HTML file
// per page (index.html, condo.html, …) with its own title, description,
// canonical URL, and structured data, plus sitemap.xml and a 404 page.
import { readFile, writeFile, rm } from 'node:fs/promises'

const dist = new URL('../dist/', import.meta.url)
const ssr = new URL('../dist-ssr/entry-server.js', import.meta.url)
const { render, pages, canonical, structuredData, ORIGIN } = await import(ssr.href)

const template = await readFile(new URL('index.html', dist), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function page(html, { title, description, url, extraHead = '' }) {
  return template
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace('</head>', `    <link rel="canonical" href="${url}" />\n${extraHead}  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
}

for (const p of pages) {
  const ld = p.path === '/'
    ? structuredData().map((d) => `    <script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>\n`).join('')
    : ''
  const out = page(render(p.path), { title: p.title, description: p.description, url: canonical(p), extraHead: ld })
  await writeFile(new URL(p.file, dist), out)
  console.log(`prerendered ${p.path} -> ${p.file}`)
}

// GitHub Pages serves 404.html for unknown paths; keep it out of search results.
await writeFile(
  new URL('404.html', dist),
  page(render('/'), {
    title: 'Page not found | Gray Eagle Condo',
    description: pages[0].description,
    url: ORIGIN + '/',
    extraHead: '    <meta name="robots" content="noindex" />\n',
  }),
)

const today = new Date().toISOString().slice(0, 10)
await writeFile(
  new URL('sitemap.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map((p) => `  <url><loc>${canonical(p)}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
    '\n</urlset>\n',
)

await rm(new URL('../dist-ssr/', import.meta.url), { recursive: true, force: true })
console.log('wrote 404.html and sitemap.xml')
