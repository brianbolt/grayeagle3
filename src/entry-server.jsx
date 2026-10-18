import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'
import { ThemeProvider } from './theme'

export { pages, canonical, structuredData, ORIGIN } from './data/seo'

// Renders one route to HTML at build time (see scripts/prerender.mjs).
export function render(url) {
  return renderToString(
    <ThemeProvider>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </ThemeProvider>,
  )
}
