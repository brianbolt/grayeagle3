import { ExternalLink, MessageCircle, Star } from 'lucide-react'
import PageHero from '../components/PageHero'
import { site } from '../data/site'
import { savingsLabel } from '../booking'

export default function Book() {
  return (
    <>
      <PageHero eyebrow="Book your stay" title="Reserve Gray Eagle.">
        <p className="hero__lede">
          <Star size={16} fill="currentColor" /> {site.rating} from {site.reviewCount} Airbnb reviews · local, responsive hosts
        </p>
      </PageHero>

      <section className="section container">
        <div className="split split--top book-intro">
          <div>
            <span className="badge">{savingsLabel}</span>
            <h2>Save and book on Hostfully</h2>
            <p>
              Booking direct through Hostfully skips the Airbnb service fees, so you pay less for the
              exact same stay. Pick your dates below to see live pricing and availability.
            </p>
            <p className="muted">
              Prefer Airbnb? You can also <a href={site.airbnbUrl} target="_blank" rel="noreferrer">book there</a>, though Airbnb adds its own service fees.
            </p>
          </div>
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

        <div className="booking-frame">
          <iframe title="Book Gray Eagle Condo on Hostfully" src={site.bookUrl} allow="payment" />
        </div>
        <div className="booking-foot">
          <p className="muted">
            <MessageCircle size={16} /> Have a question? Add a booking note above, or message us through Hostfully or Airbnb once you book.
          </p>
          <a className="link-arrow" href={site.bookUrl} target="_blank" rel="noreferrer">
            Open booking in a new tab <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </>
  )
}
