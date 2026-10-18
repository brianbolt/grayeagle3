import { NavLink } from 'react-router-dom'

// Red "Live" pill linking to the mountain webcams page.
export default function LiveButton() {
  return (
    <NavLink to="/live" className="live-btn" aria-label="Live mountain webcams">
      <span className="live-btn__dot" aria-hidden="true" /> Live
    </NavLink>
  )
}
