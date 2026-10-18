import { ExternalLink } from 'lucide-react'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import SeasonToggle from '../components/SeasonToggle'
import Weather from '../components/Weather'
import { resources } from '../data/site'
import { useTheme } from '../theme'

export default function Explore() {
  const { content, season } = useTheme()
  const other = season === 'winter' ? 'summer' : 'winter'

  return (
    <>
      <PageHero eyebrow={content.eyebrow} title={content.exploreTitle}>
        <p className="hero__lede">{content.exploreIntro}</p>
      </PageHero>

      <section className="section container">
        <div className="cards cards--3">
          {content.activities.map((a) => (
            <article key={a.title} className="card card--activity">
              <Icon name={a.icon} size={30} strokeWidth={1.4} className="card__icon" />
              <span className="tag">{a.tag}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
        <div className="switch-note">
          <p>Planning a {other} trip instead?</p>
          <SeasonToggle />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">Before you go</p>
            <h2>Conditions & handy links</h2>
            <ul className="link-list">
              {resources[season].map((r) => (
                <li key={r.href}>
                  <a href={r.href} target="_blank" rel="noreferrer">{r.label} <ExternalLink size={14} /></a>
                </li>
              ))}
            </ul>
          </div>
          <Weather />
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <p className="eyebrow">Getting here</p>
          <h2>Find us in Mammoth Lakes</h2>
          <p>
            Mammoth Lakes sits on US-395 in the Eastern Sierra, about 5 hours from Los Angeles and
            3 hours from Reno. In summer, Tioga Pass (CA-120) connects to Yosemite. The
            exact address is shared after booking.
          </p>
        </div>
        <div className="map">
          <iframe
            title="Map of Mammoth Lakes"
            src="https://www.google.com/maps?q=Mammoth+Lakes,+CA&z=12&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  )
}
