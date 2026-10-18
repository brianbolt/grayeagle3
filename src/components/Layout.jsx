import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import SeasonToggle from './SeasonToggle'
import { site } from '../data/site'
import { useTheme } from '../theme'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/condo', label: 'The Condo' },
  { to: '/explore', label: 'Explore' },
  { to: '/guide', label: 'Guest Guide' },
  { to: '/book', label: 'Book' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const { content } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="brand">
            <span className="brand__mark" aria-hidden="true">▲</span>
            <span>
              <strong>{site.shortName}</strong>
              <small>Mammoth Lakes</small>
            </span>
          </Link>
          <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <SeasonToggle />
          </nav>
          <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <SeasonToggle floating />

      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <p className="footer__brand">{site.name}</p>
            <p>{site.town}</p>
            <p className="muted">{content.eyebrow}</p>
          </div>
          <div>
            <p className="footer__label">Visit</p>
            {links.slice(1).map((l) => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>
          <div>
            <p className="footer__label">Book direct</p>
            <a href={site.airbnbUrl} target="_blank" rel="noreferrer">Airbnb</a>
            <a href={site.vrboUrl} target="_blank" rel="noreferrer">VRBO</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="container footer__fine">
          <span>Licensed with the Town of Mammoth Lakes · Permit #{site.permit}</span>
          <span>Photos © {site.photoCredit}</span>
        </div>
      </footer>
    </>
  )
}
