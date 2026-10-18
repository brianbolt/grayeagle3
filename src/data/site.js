// Central place for listing details. Update the booking links and contact
// info below — everything else on the site reads from this file.
export const site = {
  name: 'Gray Eagle Condo',
  shortName: 'Gray Eagle',
  town: 'Mammoth Lakes, California',
  permit: 'TOML-CPAN-16072',
  // Direct booking (Hostfully) is the primary call to action across the site.
  bookUrl: 'https://book.hostfully.com/mammoth-bnb/property-details/18e2499b-2901-45f8-8b0d-d9f9c2d42e20/Gray%20Eagle%20Condo%20-%203bed3bath?guests=6',
  // TODO: replace the VRBO link and contact email with the real ones.
  airbnbUrl: 'https://www.airbnb.com/rooms/1330005146820683917',
  vrboUrl: 'https://www.vrbo.com/search?destination=Mammoth%20Lakes%2C%20California',
  email: 'hello@example.com',
  photoCredit: 'Nolan Nitschke',
  coords: { lat: 37.6482, lon: -118.9742 },
  guests: 7,
  // Snapshot from the Airbnb listing (not live); update by hand as reviews come in.
  rating: 4.84,
  reviewCount: 31,
  checkIn: '4:00 PM',
  checkOut: '10:00 AM',
}

export const sleeping = [
  { room: 'Bedroom 1', bed: 'King bed' },
  { room: 'Bedroom 2', bed: 'Queen bed' },
  { room: 'Bedroom 3', bed: 'Double bed' },
  { room: 'Living room', bed: 'Sofa bed' },
]

export const highlights = [
  {
    icon: 'Footprints',
    title: 'Walk to town',
    text: 'Restaurants, breweries, and shops are a stroll away, with a free shuttle stop nearby for the mountain.',
  },
  {
    icon: 'Bath',
    title: 'Private hot tub',
    text: 'Soak on your own deck after a day on the slopes or the trails.',
  },
  {
    icon: 'Car',
    title: '2-car garage',
    text: 'Extra-large garage with direct entry and room for skis, boards, and bikes. No brushing snow off the car.',
  },
  {
    icon: 'BedDouble',
    title: '3 true bedrooms',
    text: 'Three real bedrooms and three full baths, not a 2 + loft. Room for larger groups.',
  },
]

export const stats = [
  { value: '7', label: 'Guests' },
  { value: '3', label: 'Bedrooms' },
  { value: '3', label: 'Full baths' },
  { value: '2', label: 'Car garage' },
]

export const about = [
  'Welcome to this 3-bedroom, 3-bathroom condo with a private hot tub, in the heart of Mammoth Lakes. It is elegantly appointed with granite countertops in the kitchen and upgraded flooring throughout. Large south-facing windows fill it with light, creating a bright, welcoming atmosphere.',
  'The extra-large two-car garage has direct access to the condo and plenty of extra space to store gear, even with two cars parked. Drop off your skis, snowboards, hiking gear, or mountain bikes and walk straight inside, and skip brushing snow off your car on storm days.',
  'This condo has three true bedrooms. Many Mammoth listings say three bedrooms but are really two plus a loft. The fully stocked kitchen lets you cook your own meals, and the living room, with its gas fireplace, is perfect for relaxing after a day of adventure.',
  'With easy access to the shuttle and trolley stop, you are moments from everything Mammoth has to offer, from skiing and hiking to dining and entertainment. This small complex sits in the center of the action.',
]

export const amenities = [
  { group: 'Bathroom', icon: 'ShowerHead', items: ['Hair dryer', 'Shampoo & conditioner', 'Body soap & shower gel', 'Hot water'] },
  { group: 'Bedroom & laundry', icon: 'Shirt', items: ['Washer & dryer', 'Towels, sheets, soap, toilet paper', 'Hangers', 'Extra pillows & blankets', 'Clothing storage'] },
  { group: 'Kitchen & dining', icon: 'CookingPot', items: ['Fully stocked kitchen', 'Refrigerator & freezer', 'Stove & oven', 'Microwave', 'Dishwasher', 'Coffee maker & toaster', 'Pots, pans, baking sheet', 'Oil, salt & pepper', 'Dining table'] },
  { group: 'Living & entertainment', icon: 'Tv', items: ['TV', 'Board games', 'Gas fireplace', 'Heating', 'Wifi'] },
  { group: 'Outdoor & parking', icon: 'Mountain', items: ['Private hot tub', 'Deck', 'Free garage parking for 2', 'Gear storage closets'] },
  { group: 'Safety & check-in', icon: 'ShieldCheck', items: ['Self check-in', 'Smart lock', 'Smoke alarm', 'Carbon monoxide alarm', 'Fire extinguisher', 'Exterior security cameras'] },
]

export const notIncluded = ['Air conditioning']

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i)

export const photoGroups = [
  { id: 'living', label: 'Living room', ids: range(13, 20) },
  { id: 'kitchen', label: 'Kitchen & dining', ids: range(1, 9) },
  { id: 'hottub', label: 'Hot tub', ids: range(10, 12) },
  { id: 'bedrooms', label: 'Bedrooms', ids: [...range(21, 26), ...range(29, 31), ...range(34, 39)] },
  { id: 'baths', label: 'Bathrooms', ids: [27, 28, 32, 40] },
  { id: 'hallway', label: 'Hallway & laundry', ids: [33] },
  { id: 'garage', label: 'Garage & exterior', ids: range(41, 46) },
]

const base = import.meta.env.BASE_URL
export const photo = (id) => `${base}photos/full/${id}.webp`
export const thumb = (id) => `${base}photos/thumb/${id}.webp`

export const policies = [
  {
    title: 'Weather & cancellations',
    text: 'We cannot offer refunds due to weather. Please monitor conditions and cancel more than 5 days before check-in for a full refund.',
  },
  {
    title: 'Hot tub',
    text: 'Sign the rental conditions linked in your welcome email and we will send the hot tub unlock code. It takes about 4 hours to fully heat. No need to turn the temperature down when not in use.',
  },
  {
    title: 'Internet & cable',
    text: 'Outages are rare, but this is a remote mountain community and they do happen. Bring other entertainment just in case.',
  },
  {
    title: 'Mountain weather',
    text: 'Be prepared for extreme weather. Storms can affect access to amenities like the deck and hot tub.',
  },
  {
    title: 'Security',
    text: 'The outside of the townhome is monitored by security cameras.',
  },
  {
    title: 'Assumption of risk',
    text: "No lifeguard on duty. Persons using the hot tub do so at their own risk; no one should soak alone. Renters hold the owners harmless from bodily injury or property damage arising from renters' negligent acts or omissions.",
  },
]

export const faqs = [
  {
    q: 'Do I need a car?',
    a: 'Not necessarily. You can walk to restaurants and shops, and the free town shuttle and trolley stop nearby. In winter the shuttle takes you to the lifts. A car is handy for summer trips to the Lakes Basin, Convict Lake, or Yosemite.',
  },
  {
    q: 'Do I need chains or 4WD in winter?',
    a: 'Chain controls are common on US-395 and in town during storms. Carry chains or drive a 4WD/AWD vehicle with snow tires, and check Caltrans road conditions before you leave.',
  },
  {
    q: 'Is the hot tub available year-round?',
    a: 'Yes, though extreme weather can occasionally limit deck access. Sign the rental conditions from your welcome email to receive the unlock code, and give it about 4 hours to heat up.',
  },
  {
    q: 'Is there air conditioning?',
    a: 'No. Summer nights at 7,800 ft are cool, and most guests just open the windows.',
  },
  {
    q: 'Where do I store skis and bikes?',
    a: 'The extra-large garage has room for two cars plus storage closets for skis, boards, bikes, and fishing gear, with direct entry to the condo.',
  },
  {
    q: 'Are the hosts local?',
    a: 'Yes. We live less than a mile from the condo and aim for a 5-star stay. If anything comes up, let us know.',
  },
]

export const resources = {
  winter: [
    { label: 'Mammoth Mountain snow report', href: 'https://www.mammothmountain.com/mountain-information/mountain-report' },
    { label: 'Mammoth Mountain webcams', href: 'https://www.mammothmountain.com/mountain-information/webcams' },
    { label: 'Caltrans road conditions (US-395)', href: 'https://roads.dot.ca.gov/?roadnumber=395' },
    { label: 'Town shuttle & trolley (ESTA)', href: 'https://www.estransit.com/' },
  ],
  summer: [
    { label: 'Devils Postpile shuttle', href: 'https://www.nps.gov/depo/planyourvisit/shuttle.htm' },
    { label: 'Mammoth Bike Park', href: 'https://www.mammothmountain.com/summer' },
    { label: 'Yosemite & Tioga Pass status', href: 'https://www.nps.gov/yose/planyourvisit/conditions.htm' },
    { label: 'Town shuttle & trolley (ESTA)', href: 'https://www.estransit.com/' },
  ],
}

export const packing = {
  winter: ['Ski or snowboard gear (or reserve rentals in town)', 'Chains or a 4WD/AWD vehicle', 'Swimsuit for the hot tub', 'Warm layers, gloves, beanie', 'Sunscreen and goggles (high-altitude sun)', 'Board games or a movie list for storm days'],
  summer: ['Swimsuit for the hot tub and lakes', 'Hiking shoes and a daypack', 'Fishing license (CA, 16+) and tackle', 'Bike and helmet (or rent one in town)', 'Layers: mornings are cool at 7,800 ft', 'Bug spray, sunscreen, refillable water bottle'],
}
