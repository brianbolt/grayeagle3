import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The site used to use #/ routes; forward old links (e.g. /#/condo → /condo).
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1) || '/')
}

// Pages are pre-rendered for search engines; the app re-renders on load so
// the visitor's season and live data take over.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
