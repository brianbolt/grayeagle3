import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import LiveButton from './LiveButton'
import SeasonToggle from './SeasonToggle'
import { site } from '../data/site'
import { savingsLabel } from '../booking'
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
          <div className="nav__end">
            <LiveButton />
            <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
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
            <p className="footer__label">Book</p>
            <a href={site.bookUrl} target="_blank" rel="noreferrer">Book direct on Hostfully ({savingsLabel.toLowerCase()})</a>
            <a href={site.airbnbUrl} target="_blank" rel="noreferrer">Airbnb</a>
            <Link to="/live">Live mountain cams</Link>
            <a href={site.snowmanUrl} target="_blank" rel="noreferrer">Mammoth Snowman</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="container footer__fine">
          <span>Licensed with the Town of Mammoth Lakes · Permit #{site.permit}</span>
          <span>
            Photos © {site.photoCredit} · Live cams courtesy of{' '}
            <a href={site.skiCamsHome} target="_blank" rel="noreferrer">SkiCamsLive.com</a>
          </span>
        </div>
      </footer>
    </>
  )
}
