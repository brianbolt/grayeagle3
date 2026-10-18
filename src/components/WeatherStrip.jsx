import { Wind } from 'lucide-react'
import { describe, useMammothWeather } from '../weather'

// Compact one-row conditions bar that overlaps the bottom of the hero, so it
// adds almost no height above the webcams.
export default function WeatherStrip() {
  const data = useMammothWeather()
  if (!data) return null

  return (
    <div className="container wstrip-wrap">
      <div className="wstrip">
        {data.map((s) => {
          const [Icon, label] = describe(s.current.weather_code)
          const snow = s.daily.snowfall_sum[0]
          return (
            <div key={s.id} className="wstrip__spot">
              <Icon size={30} strokeWidth={1.4} className="wstrip__icon" aria-label={label} />
              <div>
                <p className="wstrip__name">{s.label} <span>{s.ft}</span></p>
                <p className="wstrip__temp">
                  {Math.round(s.current.temperature_2m)}°
                  <span className="wstrip__range">
                    {Math.round(s.daily.temperature_2m_max[0])}° / {Math.round(s.daily.temperature_2m_min[0])}°
                  </span>
                </p>
                <p className="wstrip__meta">
                  <Wind size={12} /> {Math.round(s.current.wind_speed_10m)} mph
                  {snow > 0.1 && <span className="wstrip__snow"> · {snow.toFixed(1)}″ today</span>}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
