import { useEffect, useState } from 'react'
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun } from 'lucide-react'
import { site } from './data/site'

// Spots we report on. Elevation is passed to Open-Meteo so the summit reads
// as cold as it really is rather than the valley grid cell's temperature.
export const spots = [
  { id: 'town', label: 'Town', sub: 'At the condo', ft: '7,880 ft', lat: site.coords.lat, lon: site.coords.lon, m: 2402 },
  { id: 'lodge', label: 'Main Lodge', sub: 'Mountain base', ft: '8,900 ft', lat: 37.6513, lon: -119.0372, m: 2713 },
  { id: 'summit', label: 'Summit', sub: 'Mammoth Mountain', ft: '11,053 ft', lat: 37.6311, lon: -119.0326, m: 3369 },
]

const url =
  'https://api.open-meteo.com/v1/forecast' +
  `?latitude=${spots.map((s) => s.lat).join(',')}` +
  `&longitude=${spots.map((s) => s.lon).join(',')}` +
  `&elevation=${spots.map((s) => s.m).join(',')}` +
  '&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,snowfall_sum' +
  '&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch' +
  '&timezone=America%2FLos_Angeles&forecast_days=5'

// WMO weather codes → icon + label (https://open-meteo.com/en/docs)
export function describe(code) {
  if (code === 0) return [Sun, 'Clear']
  if (code <= 2) return [CloudSun, 'Partly cloudy']
  if (code === 3) return [Cloud, 'Cloudy']
  if (code <= 48) return [CloudFog, 'Fog']
  if (code <= 67 || (code >= 80 && code <= 82)) return [CloudRain, 'Rain']
  if (code <= 77 || code === 85 || code === 86) return [CloudSnow, 'Snow']
  return [CloudLightning, 'Thunderstorms']
}

// One shared request per page load, used by every weather widget.
let request
const load = () =>
  (request ??= fetch(url)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((list) => spots.map((s, i) => ({ ...s, ...list[i] })))
    .catch((e) => {
      request = undefined
      throw e
    }))

// Returns undefined while loading, null on failure, else one entry per spot.
export function useMammothWeather() {
  const [data, setData] = useState()
  useEffect(() => {
    let alive = true
    load()
      .then((d) => alive && setData(d))
      .catch(() => alive && setData(null))
    return () => { alive = false }
  }, [])
  return data
}
