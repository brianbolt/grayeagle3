import { useState } from 'react'
import { describe, useMammothWeather } from '../weather'

const day = (iso, i) => (i === 0 ? 'Today' : new Date(`${iso}T12:00`).toLocaleDateString('en-US', { weekday: 'short' }))

// Town vs. mountain conditions side by side, with a 5-day forecast for
// whichever spot is selected.
export default function Weather() {
  const data = useMammothWeather()
  const [sel, setSel] = useState(0)

  if (data === null) return null
  if (!data) return <div className="weather weather--loading">Checking the sky over Mammoth…</div>

  const spot = data[sel]
  return (
    <div className="weather">
      <div className="weather__spots" role="tablist" aria-label="Location">
        {data.map((s, i) => {
          const [Icon, label] = describe(s.current.weather_code)
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={sel === i}
              className={`weather__spot ${sel === i ? 'is-active' : ''}`}
              onClick={() => setSel(i)}
            >
              <span className="weather__spot-name">{s.label}</span>
              <span className="weather__spot-ft">{s.ft}</span>
              <span className="weather__spot-now">
                <Icon size={22} strokeWidth={1.5} aria-label={label} />
                <span className="weather__temp">{Math.round(s.current.temperature_2m)}°</span>
              </span>
            </button>
          )
        })}
      </div>

      <p className="weather__detail muted">
        {spot.sub} · {describe(spot.current.weather_code)[1]} · feels like {Math.round(spot.current.apparent_temperature)}° · wind{' '}
        {Math.round(spot.current.wind_speed_10m)} mph, gusts {Math.round(spot.current.wind_gusts_10m)}
      </p>

      <div className="weather__days">
        {spot.daily.time.map((iso, i) => {
          const [DayIcon] = describe(spot.daily.weather_code[i])
          const snow = spot.daily.snowfall_sum[i]
          return (
            <div key={iso} className="weather__day">
              <span>{day(iso, i)}</span>
              <DayIcon size={22} strokeWidth={1.5} />
              <span>{Math.round(spot.daily.temperature_2m_max[i])}° / <span className="muted">{Math.round(spot.daily.temperature_2m_min[i])}°</span></span>
              {snow > 0.1 && <span className="weather__snow">{snow.toFixed(1)}″ snow</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
