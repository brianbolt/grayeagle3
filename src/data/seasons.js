// Seasonal copy and activities. "summer" covers June–August; everything else
// defaults to "winter" (Mammoth's ski season often runs well into spring).
export const SUMMER_MONTHS = [5, 6, 7] // Jun, Jul, Aug (0-indexed)

export const seasonalDefault = (date = new Date()) =>
  SUMMER_MONTHS.includes(date.getMonth()) ? 'summer' : 'winter'

export const seasons = {
  winter: {
    label: 'Winter',
    eyebrow: 'Ski season in Mammoth Lakes',
    headline: 'Powder days, fireside nights.',
    intro:
      'Catch the free shuttle to the lifts, ski until your legs give out, then drop your gear in the garage and sink into a private hot tub under the stars.',
    heroPhoto: 13,
    featurePhoto: 11,
    exploreTitle: 'Winter in Mammoth',
    exploreIntro:
      'Mammoth Mountain gets some of the deepest snow in North America and one of the longest seasons in California. Here are our favorite ways to spend it.',
    activities: [
      {
        icon: 'MountainSnow',
        title: 'Mammoth Mountain',
        text: 'Over 3,500 acres, 150+ trails, and an 11,053 ft summit. The free town shuttle connects to the lifts, so you can leave the car in the garage.',
        tag: 'Free shuttle nearby',
      },
      {
        icon: 'Snowflake',
        title: 'June Mountain',
        text: 'A quieter, family-friendly hill about 30 minutes north with views over June Lake. Often included on Mammoth passes.',
        tag: '~30 min drive',
      },
      {
        icon: 'Trees',
        title: 'Cross-country & snowshoe',
        text: 'Groomed Nordic trails around Twin Lakes in the Lakes Basin, plus miles of quiet snowshoe routes through the Inyo National Forest.',
        tag: 'Lakes Basin',
      },
      {
        icon: 'Sparkles',
        title: 'Tubing & sledding',
        text: 'Woolly’s Tube Park has lifts that tow you back up, so nobody trudges uphill. Perfect for kids and non-skiers.',
        tag: 'Great for families',
      },
      {
        icon: 'Gauge',
        title: 'Snowmobile & dog sled tours',
        text: 'Guided snowmobile rides through the backcountry or a dog sled run across snowy meadows. Book ahead on holiday weekends.',
        tag: 'Book ahead',
      },
      {
        icon: 'Beer',
        title: 'Après in town',
        text: 'Walk to breweries, restaurants, and shops, then walk home. The Village is a short shuttle ride away for more après.',
        tag: 'Walkable',
      },
    ],
    tips: [
      'Storm day? Watch it snow from the fireplace, then hit the fresh tracks.',
      'Load skis straight from the garage. No icy car roofs or frozen fingers.',
      'Start the hot tub heating about 4 hours before you want to soak.',
    ],
  },
  summer: {
    label: 'Summer',
    eyebrow: 'Summer in the Eastern Sierra',
    headline: 'Alpine lakes, long days.',
    intro:
      'Paddle glassy alpine lakes, cast for trout, ride the bike park, or hike to waterfalls. Come home to a sunlit condo and a soak on the deck.',
    heroPhoto: 15,
    featurePhoto: 10,
    exploreTitle: 'Summer in Mammoth',
    exploreIntro:
      'When the snow melts, Mammoth turns into a playground of granite peaks, wildflowers, and dozens of alpine lakes. Here is how we like to spend summer.',
    activities: [
      {
        icon: 'Waves',
        title: 'Lakes Basin',
        text: 'Lake Mary, Twin Lakes, Lake Mamie, Lake George, and Horseshoe Lake are minutes above town. Rent a kayak or paddleboard, or just picnic on the shore.',
        tag: 'Minutes from town',
      },
      {
        icon: 'Fish',
        title: 'Fishing',
        text: 'Trout season opens in late April. Try the Lakes Basin, Convict Lake, Crowley Lake, or fly fish catch-and-release on Hot Creek.',
        tag: 'CA license required',
      },
      {
        icon: 'Bike',
        title: 'Cycling & bike park',
        text: 'Ride the lift-served Mammoth Bike Park, spin the paved Lakes Basin Path and Town Loop, or explore singletrack all around town.',
        tag: 'Garage bike storage',
      },
      {
        icon: 'Footprints',
        title: 'Hiking',
        text: 'Duck Pass, Crystal Lake, TJ Lake, and the Mammoth Crest all start in the Lakes Basin, with trails for every fitness level.',
        tag: 'Trailheads nearby',
      },
      {
        icon: 'Droplets',
        title: 'Devils Postpile & Rainbow Falls',
        text: 'Basalt columns and a 100 ft waterfall in Reds Meadow. A shuttle from the Adventure Center is required on most summer days.',
        tag: 'Shuttle required',
      },
      {
        icon: 'MountainSnow',
        title: 'Gondola, Yosemite & Mono Lake',
        text: 'Ride the Panorama Gondola to the 11,053 ft summit. Drive Tioga Pass into Yosemite’s high country, or see the tufa towers at Mono Lake.',
        tag: 'Day trips',
      },
    ],
    tips: [
      'Bikes, rods, and paddleboards fit in the garage with both cars parked.',
      'Afternoon thunderstorms are common in July. Start big hikes early.',
      'The large south-facing windows keep the condo bright, with cool nights for sleeping.',
    ],
  },
}
