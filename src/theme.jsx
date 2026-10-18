import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { seasonalDefault, seasons } from './data/seasons'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'grayeagle-season'

// The season follows the calendar (June–August = summer) unless the visitor
// flips it. The override lives in sessionStorage so a returning visitor
// gets the right season again.
function initialSeason() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved === 'winter' || saved === 'summer') return saved
  } catch {
    // storage unavailable (private mode); fall through
  }
  return seasonalDefault()
}

// Apply before first paint so the page doesn't flash the wrong palette.
if (typeof document !== 'undefined') document.documentElement.dataset.season = initialSeason()

export function ThemeProvider({ children }) {
  const [season, setSeason] = useState(initialSeason)

  useEffect(() => {
    document.documentElement.dataset.season = season
    try {
      sessionStorage.setItem(STORAGE_KEY, season)
    } catch {
      // ignore
    }
  }, [season])

  const toggle = useCallback(() => setSeason((s) => (s === 'winter' ? 'summer' : 'winter')), [])

  // Keyboard shortcut: press "S" anywhere (outside form fields) to switch.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() !== 's' || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target.closest('input, textarea, select, [contenteditable]')) return
      toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  return (
    <ThemeContext.Provider value={{ season, setSeason, toggle, content: seasons[season] }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
