import { amenities, photo, site, sleeping } from './site'

export const ORIGIN = 'https://grayeagle3.com'

// One entry per page: used for the pre-rendered <head>, the sitemap, and
// document.title when navigating client-side.
export const pages = [
  {
    path: '/',
    file: 'index.html',
    title: 'Gray Eagle Condo | Mammoth Lakes Rental with Private Hot Tub',
    description:
      '3 bedroom, 3 bath Mammoth Lakes condo with a private hot tub and 2-car garage. Walk to town, ride the free shuttle to Mammoth Mountain, and book direct to save.',
  },
  {
    path: '/condo',
    file: 'condo.html',
    title: 'The Condo: 3 Bedrooms, 3 Baths & Hot Tub | Gray Eagle Mammoth',
    description:
      'Photo tour, sleeping arrangements, and amenities for Gray Eagle: three true bedrooms, three full baths, a private hot tub, gas fireplace, and an extra-large 2-car garage.',
  },
  {
    path: '/explore',
    file: 'explore.html',
    title: 'Things to Do in Mammoth Lakes, Winter & Summer | Gray Eagle',
    description:
      'Ski Mammoth Mountain and June, cross-country ski, and go tubing in winter. In summer, fish and paddle the Lakes Basin, ride the bike park, hike, and visit Devils Postpile.',
  },
  {
    path: '/guide',
    file: 'guide.html',
    title: 'Guest Guide & FAQ | Gray Eagle Condo, Mammoth Lakes',
    description:
      'Check-in times, hot tub instructions, winter driving and chains, packing lists, and house rules for your stay at Gray Eagle in Mammoth Lakes.',
  },
  {
    path: '/book',
    file: 'book.html',
    title: 'Book Direct and Save | Gray Eagle Condo, Mammoth Lakes',
    description:
      'Check live availability and book Gray Eagle directly for the best price. 3 bedrooms, 3 baths, private hot tub, sleeps 7, in the heart of Mammoth Lakes.',
  },
  {
    path: '/live',
    file: 'live.html',
    title: 'Mammoth Mountain Live Cams & Weather | Gray Eagle Condo',
    description:
      'Live Mammoth Mountain webcams plus current temperatures for town, Main Lodge, and the summit, with a link to the Mammoth Snowman forecast.',
  },
]

export const pageFor = (pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/'
  return pages.find((p) => p.path === clean) || pages[0]
}

export const canonical = (page) => ORIGIN + page.path

// schema.org description of the rental for search engines (home page only).
export function structuredData() {
  const abs = (src) => ORIGIN + src
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'VacationRental',
      name: site.name,
      url: ORIGIN + '/',
      description: pages[0].description,
      image: [abs('/og-image.jpg'), ...[15, 11, 1, 21].map((id) => abs(photo(id)))],
      identifier: `Town of Mammoth Lakes permit ${site.permit}`,
      checkinTime: '16:00',
      checkoutTime: '10:00',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mammoth Lakes',
        addressRegion: 'CA',
        postalCode: '93546',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: site.coords.lat, longitude: site.coords.lon },
      containsPlace: {
        '@type': 'Accommodation',
        additionalType: 'EntirePlace',
        numberOfBedrooms: 3,
        numberOfBathroomsTotal: 3,
        occupancy: { '@type': 'QuantitativeValue', maxValue: site.guests },
        bed: sleeping.map((s) => ({ '@type': 'BedDetails', typeOfBed: s.bed, name: s.room })),
        amenityFeature: amenities.flatMap((g) =>
          g.items.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
        ),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: ORIGIN + '/',
    },
  ]
}
