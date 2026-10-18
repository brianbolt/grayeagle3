import { useState } from 'react'
import { ChevronDown, Square } from 'lucide-react'
import PageHero from '../components/PageHero'
import { faqs, packing, policies, site } from '../data/site'
import { useTheme } from '../theme'

export default function Guide() {
  const { season } = useTheme()
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageHero eyebrow="Guest Guide" title="Everything you need for a smooth stay.">
        <p className="hero__lede">Check-in after {site.checkIn} · Checkout before {site.checkOut} · Self check-in with a smart lock</p>
      </PageHero>

      <section className="section container split split--top">
        <div>
          <p className="eyebrow">Questions</p>
          <h2>Frequently asked</h2>
          <div className="faq">
            {faqs.map((f, i) => (
              <div key={f.q} className={`faq__item ${open === i ? 'is-open' : ''}`}>
                <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q} <ChevronDown size={18} />
                </button>
                {open === i && <p>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
        <aside className="panel">
          <h3>{season === 'winter' ? 'Winter' : 'Summer'} packing list</h3>
          <ul className="checklist">
            {packing[season].map((p) => <li key={p}><Square size={16} /> {p}</li>)}
          </ul>
        </aside>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">House rules & notes</p>
            <h2>Good to know</h2>
          </div>
          <div className="cards cards--3">
            {policies.map((p) => (
              <article key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
