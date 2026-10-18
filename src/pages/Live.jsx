import { ExternalLink, Snowflake } from 'lucide-react'
import PageHero from '../components/PageHero'
import WeatherStrip from '../components/WeatherStrip'
import { site } from '../data/site'

export default function Live() {
  return (
    <>
      <PageHero eyebrow="Live from Mammoth Mountain" title="Mountain cams & snow forecast.">
        <p className="hero__lede">See the conditions on the mountain right now, then check the Snowman for the next storm.</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={site.snowmanUrl} target="_blank" rel="noreferrer">
            <Snowflake size={18} /> Mammoth Snowman forecast
          </a>
          <a className="btn btn--ghost" href={site.skiCamsUrl} target="_blank" rel="noreferrer">
            Open cams full screen <ExternalLink size={16} />
          </a>
        </div>
      </PageHero>
      <WeatherStrip />

      <section className="section section--snug container">
        <div className="live-frame">
          <iframe title="Mammoth Mountain live webcams" src={site.skiCamsUrl} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        </div>
        <div className="panel live-credit">
          <h3>With thanks to SkiCamsLive</h3>
          <p>
            These live cams come courtesy of{' '}
            <a href={site.skiCamsHome} target="_blank" rel="noreferrer">SkiCamsLive.com</a>, an
            awesome site that gathers live webcams from ski resorts all over. Check it out before
            your next trip anywhere there is snow.
          </p>
          <p className="muted">
            Powder forecasts by <a href={site.snowmanUrl} target="_blank" rel="noreferrer">Mammoth Snowman</a>.
          </p>
        </div>
      </section>
    </>
  )
}
