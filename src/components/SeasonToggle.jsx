import { Snowflake, Sun } from 'lucide-react'
import { useTheme } from '../theme'

// Pill switch used in the nav and as the floating button on every page.
export default function SeasonToggle({ floating = false }) {
  const { season, toggle } = useTheme()
  const next = season === 'winter' ? 'summer' : 'winter'

  return (
    <button
      type="button"
      className={`season-toggle ${floating ? 'season-toggle--floating' : ''}`}
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} (or press S)`}
    >
      <span className={`season-toggle__opt ${season === 'winter' ? 'is-active' : ''}`}>
        <Snowflake size={16} /> {floating ? null : 'Winter'}
      </span>
      <span className={`season-toggle__opt ${season === 'summer' ? 'is-active' : ''}`}>
        <Sun size={16} /> {floating ? null : 'Summer'}
      </span>
      <span className="season-toggle__thumb" aria-hidden="true" />
    </button>
  )
}
