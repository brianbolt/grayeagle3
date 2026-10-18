import { useEffect, useState } from 'react'
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun } from 'lucide-react'
import { site } from '../data/site'

// WMO weather codes → icon + label (https://open-meteo.com/en/docs)
function describe(code) {
  if (code === 0) return [Sun, 'Clear']
  if (code <= 2) return [CloudSun, 'Partly cloudy']
  if (code === 3) return [Cloud, 'Cloudy']
  if (code <= 48) return [CloudFog, 'Fog']
  if (code <= 67 || (code >= 80 && code <= 82)) return [CloudRain, 'Rain']
  if (code <= 77 || code === 85 || code === 86) return [CloudSnow, 'Snow']
  return [CloudLightning, 'Thunderstorms']
}

const url =
  `https://api.open-meteo.com/v1/forecast?latitude=${site.coords.lat}&longitude=${site.coords.lon}` +
  '&current=temperature_2m,weather_code,wind_speed_10m' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,snowfall_sum' +
  '&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch' +
  '&timezone=America%2FLos_Angeles&forecast_days=5'

// Live conditions in Mammoth Lakes from the free Open-Meteo API.
export default function Weather() {
  const [data, setData] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => alive && setData(d))
      .catch(() => alive && setFailed(true))
    return () => { alive = false }
  }, [])

  if (failed) return null
  if (!data) return <div className="weather weather--loading">Checking the sky over Mammoth…</div>

  const [NowIcon, nowLabel] = describe(data.current.weather_code)
  return (
    <div className="weather">
      <div className="weather__now">
        <NowIcon size={44} strokeWidth={1.4} />
        <div>
          <p className="weather__temp">{Math.round(data.current.temperature_2m)}°F</p>
          <p className="muted">{nowLabel} · wind {Math.round(data.current.wind_speed_10m)} mph</p>
          <p className="weather__where">Right now in Mammoth Lakes</p>
        </div>
      </div>
      <div className="weather__days">
        {data.daily.time.map((day, i) => {
          const [DayIcon] = describe(data.daily.weather_code[i])
          const snow = data.daily.snowfall_sum[i]
          return (
            <div key={day} className="weather__day">
              <span>{i === 0 ? 'Today' : new Date(`${day}T12:00`).toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <DayIcon size={22} strokeWidth={1.5} />
              <span>{Math.round(data.daily.temperature_2m_max[i])}° / <span className="muted">{Math.round(data.daily.temperature_2m_min[i])}°</span></span>
              {snow > 0.1 && <span className="weather__snow">{snow.toFixed(1)}″ snow</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
