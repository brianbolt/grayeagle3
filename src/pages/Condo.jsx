import { useState } from 'react'
import { BedDouble, Check, X } from 'lucide-react'
import PageHero from '../components/PageHero'
import Gallery from '../components/Gallery'
import Icon from '../components/Icon'
import { about, amenities, notIncluded, photoGroups, site, sleeping } from '../data/site'

export default function Condo() {
  const [group, setGroup] = useState('all')
  const visible = group === 'all' ? photoGroups : photoGroups.filter((g) => g.id === group)

  return (
    <>
      <PageHero eyebrow="The Condo" title="Three true bedrooms. Room for everyone.">
        <p className="hero__lede">
          {site.guests} guests · 3 bedrooms · 3 full baths · private hot tub · 2-car garage
        </p>
      </PageHero>

      <section className="section container prose-grid">
        <div className="prose">
          <h2>About this space</h2>
          {about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          <p className="muted">Fully licensed with the Town of Mammoth Lakes · Permit #{site.permit}</p>
        </div>
        <aside className="panel">
          <h3>Where you’ll sleep</h3>
          <ul className="sleep">
            {sleeping.map((s) => (
              <li key={s.room}>
                <BedDouble size={22} strokeWidth={1.5} />
                <span><strong>{s.room}</strong>{s.bed}</span>
              </li>
            ))}
          </ul>
          <h3>Stay details</h3>
          <dl className="details">
            <dt>Check-in</dt><dd>After {site.checkIn}</dd>
            <dt>Checkout</dt><dd>Before {site.checkOut}</dd>
            <dt>Guests</dt><dd>Up to {site.guests}</dd>
            <dt>Access</dt><dd>Entire condo, self check-in</dd>
          </dl>
        </aside>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Photo tour</p>
            <h2>Take a look around</h2>
          </div>
          <div className="chips" role="tablist">
            <button className={group === 'all' ? 'is-active' : ''} onClick={() => setGroup('all')}>All</button>
            {photoGroups.map((g) => (
              <button key={g.id} className={group === g.id ? 'is-active' : ''} onClick={() => setGroup(g.id)}>{g.label}</button>
            ))}
          </div>
          {visible.map((g) => (
            <div key={g.id} className="gallery-group">
              <h3>{g.label}</h3>
              <Gallery ids={g.ids} label={g.label} />
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section__head">
          <p className="eyebrow">Amenities</p>
          <h2>What this place offers</h2>
        </div>
        <div className="amenities">
          {amenities.map((a) => (
            <div key={a.group} className="amenity">
              <h3><Icon name={a.icon} size={22} strokeWidth={1.5} /> {a.group}</h3>
              <ul>
                {a.items.map((i) => <li key={i}><Check size={16} /> {i}</li>)}
              </ul>
            </div>
          ))}
          <div className="amenity amenity--muted">
            <h3>Not included</h3>
            <ul>
              {notIncluded.map((i) => <li key={i}><X size={16} /> {i}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
