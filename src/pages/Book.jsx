import { useState } from 'react'
import { Mail, Star } from 'lucide-react'
import PageHero from '../components/PageHero'
import { site } from '../data/site'
import { savingsLabel } from '../booking'

export default function Book() {
  const [form, setForm] = useState({ name: '', arrive: '', depart: '', guests: '2', message: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // No backend: compose the inquiry in the visitor's mail app.
  const submit = (e) => {
    e.preventDefault()
    const subject = `Gray Eagle inquiry: ${form.arrive || '?'} to ${form.depart || '?'}`
    const body = [
      `Name: ${form.name}`,
      `Dates: ${form.arrive} to ${form.depart}`,
      `Guests: ${form.guests}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageHero eyebrow="Book your stay" title="Reserve Gray Eagle.">
        <p className="hero__lede">
          <Star size={16} fill="currentColor" /> {site.rating} from {site.reviewCount} Airbnb reviews · local, responsive hosts
        </p>
      </PageHero>

      <section className="section container split split--top">
        <div>
          <span className="badge">{savingsLabel}</span>
          <h2>Save and book on Hostfully</h2>
          <p>
            Booking direct through our Hostfully page skips the Airbnb service fees, so you pay
            less for the exact same stay. See live availability and pricing, and book with us directly.
          </p>
          <div className="book-buttons">
            <a className="btn btn--primary" href={site.bookUrl} target="_blank" rel="noreferrer">Save & book on Hostfully</a>
          </div>
          <p className="muted">
            Prefer Airbnb? You can also <a href={site.airbnbUrl} target="_blank" rel="noreferrer">book there</a>, though Airbnb adds its own service fees.
          </p>
          <div className="panel panel--note">
            <h3>Before you book</h3>
            <ul>
              <li>Cancel more than 5 days before check-in for a full refund.</li>
              <li>No refunds due to weather. Keep an eye on mountain conditions.</li>
              <li>Hot tub access requires signing our rental conditions.</li>
              <li>Up to {site.guests} guests · check-in {site.checkIn} · checkout {site.checkOut}</li>
            </ul>
          </div>
        </div>

        <form className="panel form" onSubmit={submit}>
          <h3><Mail size={20} /> Send us a question</h3>
          <label>Name<input required value={form.name} onChange={set('name')} /></label>
          <div className="form__row">
            <label>Arrive<input type="date" value={form.arrive} onChange={set('arrive')} /></label>
            <label>Depart<input type="date" value={form.depart} min={form.arrive} onChange={set('depart')} /></label>
          </div>
          <label>Guests
            <select value={form.guests} onChange={set('guests')}>
              {Array.from({ length: site.guests }, (_, i) => <option key={i}>{i + 1}</option>)}
            </select>
          </label>
          <label>Message<textarea rows={4} value={form.message} onChange={set('message')} placeholder="Questions about gear storage, parking, the area…" /></label>
          <button className="btn btn--primary" type="submit">Email the hosts</button>
        </form>
      </section>
    </>
  )
}
