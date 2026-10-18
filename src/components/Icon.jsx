import {
  Bath, BedDouble, Beer, Bike, Car, Circle, CookingPot, Droplets, Fish, Footprints, Gauge,
  Mountain, MountainSnow, ShieldCheck, Shirt, ShowerHead, Snowflake, Sparkles, Trees, Tv, Waves,
} from 'lucide-react'

// Data files reference icons by name; only the icons listed here get bundled.
const icons = {
  Bath, BedDouble, Beer, Bike, Car, CookingPot, Droplets, Fish, Footprints, Gauge,
  Mountain, MountainSnow, ShieldCheck, Shirt, ShowerHead, Snowflake, Sparkles, Trees, Tv, Waves,
}

export default function Icon({ name, ...props }) {
  const Cmp = icons[name] || Circle
  return <Cmp aria-hidden="true" {...props} />
}
