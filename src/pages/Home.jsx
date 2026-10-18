import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'
import Weather from '../components/Weather'
import { highlights, photo, site, stats, thumb } from '../data/site'
import { useTheme } from '../theme'
import { savingsLabel } from '../booking'

const mosaic = [14, 2, 21, 12, 29, 8]

export default function Home() {
  const { content, season } = useTheme()

  return (
    <>
      <PageHero tall eyebrow={content.eyebrow} title={content.headline}>
        <p className="hero__lede">{content.intro}</p>
        <div className="hero__actions">
          <Link className="btn btn--primary" to="/book">Book direct · {savingsLabel}</Link>
          <Link className="btn btn--ghost" to="/condo">Tour the condo</Link>
        </div>
        <p className="hero__note">Same condo, same local hosts. Booking on Hostfully means no Airbnb service fees.</p>
        <p className="hero__rating">
          <Star size={16} fill="currentColor" /> {site.rating} · {site.reviewCount} reviews on Airbnb
        </p>
      </PageHero>

      <section className="stats">
        <div className="container stats__grid">
          {stats.map((s) => (
            <div key={s.label}>
              <span className="stats__value">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container split">
        <div>
          <p className="eyebrow">Welcome to Gray Eagle</p>
          <h2>Your basecamp in the heart of Mammoth Lakes.</h2>
          <p>
            One of the prides of Mammoth Lakes is its free shuttle, and it stops near this bright
            three-bedroom, three-bath condo. Ride it to the mountain, walk to dinner, then come home
            to a private hot tub, a gas fireplace, and an extra-large garage for all your gear.
          </p>
          <Link className="link-arrow" to="/condo">See the whole place <ArrowRight size={16} /></Link>
        </div>
        <img className="split__img" src={photo(content.heroPhoto)} alt="Living room with stone gas fireplace" />
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="cards cards--4">
            {highlights.map((h) => (
              <article key={h.title} className="card">
                <Icon name={h.icon} size={28} strokeWidth={1.5} className="card__icon" />
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <p className="eyebrow">{content.label} at Gray Eagle</p>
          <h2>{content.exploreTitle}</h2>
          <p>{content.exploreIntro}</p>
        </div>
        <div className="cards cards--3">
          {content.activities.slice(0, 3).map((a) => (
            <article key={a.title} className="card card--activity">
              <Icon name={a.icon} size={30} strokeWidth={1.4} className="card__icon" />
              <span className="tag">{a.tag}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
        <div className="center">
          <Link className="btn btn--outline" to="/explore">More {season} adventures <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="mosaic">
        {mosaic.map((id) => (
          <Link key={id} to="/condo" className="mosaic__item">
            <img src={thumb(id)} alt="" loading="lazy" />
          </Link>
        ))}
      </section>

      <section className="section container split split--reverse">
        <img className="split__img" src={photo(content.featurePhoto)} alt="Private hot tub on the deck" />
        <div>
          <p className="eyebrow">Mammoth conditions</p>
          <h2>{season === 'winter' ? 'Is it a powder day?' : 'Perfect weather for the lakes?'}</h2>
          <Weather />
          <ul className="tips">
            {content.tips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2>{season === 'winter' ? 'First chair is calling.' : 'The lakes are waiting.'}</h2>
          <p>We are local hosts, less than a mile away, and we aim for a 5-star stay every time.</p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/book">Book direct · {savingsLabel}</Link>
            <Link className="btn btn--ghost" to="/guide">Read the guest guide</Link>
          </div>
        </div>
      </section>
    </>
  )
}
