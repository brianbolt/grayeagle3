// Reads the Airbnb listing's star rating and review count and writes them to
// src/data/rating.json. Exits non-zero (leaving the file untouched) if the
// page can't be read or the numbers look wrong, so a bad fetch never
// overwrites good data.
import { readFile, writeFile } from 'node:fs/promises'

const LISTING = 'https://www.airbnb.com/rooms/1330005146820683917'
const FILE = new URL('../src/data/rating.json', import.meta.url)

const res = await fetch(LISTING, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
  },
})
if (!res.ok) throw new Error(`Airbnb returned HTTP ${res.status}`)
const html = await res.text()

const num = (re) => {
  const m = html.match(re)
  return m ? Number(m[1]) : NaN
}
const rating = num(/"starRating":([0-9.]+)/)
const reviewCount = num(/"reviewCount":([0-9]+)/)

if (!(rating >= 1 && rating <= 5) || !(Number.isInteger(reviewCount) && reviewCount > 0)) {
  throw new Error(`Could not find a valid rating on the listing page (rating=${rating}, reviewCount=${reviewCount})`)
}

const current = JSON.parse(await readFile(FILE, 'utf8'))
if (current.rating === rating && current.reviewCount === reviewCount) {
  console.log(`No change: ${rating} from ${reviewCount} reviews`)
} else {
  const updated = new Date().toISOString().slice(0, 10)
  await writeFile(FILE, JSON.stringify({ rating, reviewCount, updated }, null, 2) + '\n')
  console.log(`Updated: ${current.rating}/${current.reviewCount} -> ${rating}/${reviewCount}`)
}
