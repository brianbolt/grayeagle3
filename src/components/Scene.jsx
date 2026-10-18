import { useTheme } from '../theme'
import { Fisherman, XCSkier } from './SceneFolks'

const motion = typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const pine = (x, y, s) =>
  `M${x} ${y - 60 * s} L${x + 14 * s} ${y - 30 * s} L${x + 7 * s} ${y - 30 * s} L${x + 20 * s} ${y - 8 * s} L${x + 3 * s} ${y - 8 * s} L${x + 3 * s} ${y} L${x - 3 * s} ${y} L${x - 3 * s} ${y - 8 * s} L${x - 20 * s} ${y - 8 * s} L${x - 7 * s} ${y - 30 * s} L${x - 14 * s} ${y - 30 * s} Z`

const trees = [
  [40, 560, 1.6], [95, 575, 2.1], [150, 565, 1.4], [1250, 570, 2], [1320, 560, 1.5],
  [1380, 578, 2.3], [1180, 585, 1.2], [230, 590, 1.1], [1440, 590, 1.7],
]

// Illustrated Eastern Sierra skyline that repaints for winter and summer.
export default function Scene({ className = '' }) {
  const { season } = useTheme()
  const w = season === 'winter'

  const c = w
    ? { sky1: '#9fb9d3', sky2: '#dfe8f1', far: '#b7c7d8', mid: '#7f95ad', near: '#516882', cap: '#ffffff', ground: '#f4f7fb', tree: '#2c4158', treeSnow: '#ffffff', sun: '#ffffff' }
    : { sky1: '#5aa7d6', sky2: '#cfe9f2', far: '#8fa9bd', mid: '#6b7f8f', near: '#3f5a46', cap: '#eef3f6', ground: '#5d8a55', tree: '#24402c', treeSnow: null, sun: '#ffd77a' }

  return (
    <svg className={`scene ${className}`} viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.sky1} />
          <stop offset="1" stopColor={c.sky2} />
        </linearGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f8fb5" />
          <stop offset="1" stopColor="#1f5f7d" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor={c.sun} stopOpacity={w ? 0.9 : 1} />
          <stop offset="1" stopColor={c.sun} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="640" fill="url(#sky)" className="scene__fade" />
      <circle cx={w ? 1100 : 1150} cy={w ? 150 : 120} r="140" fill="url(#glow)" />
      <circle cx={w ? 1100 : 1150} cy={w ? 150 : 120} r={w ? 34 : 44} fill={c.sun} opacity={w ? 0.85 : 1} />

      {/* far range */}
      <path d="M0 380 L120 300 L210 340 L330 240 L430 320 L560 230 L700 310 L820 250 L960 330 L1080 260 L1200 320 L1330 250 L1440 300 L1440 640 L0 640 Z" fill={c.far} />
      {/* main range — a nod to the Minarets and Mammoth Mountain */}
      <path d="M0 450 L160 360 L260 400 L380 290 L450 330 L520 250 L560 280 L600 230 L650 290 L720 220 L790 320 L900 270 L1010 360 L1140 300 L1260 380 L1440 330 L1440 640 L0 640 Z" fill={c.mid} />
      <path d="M380 290 L415 312 L398 318 L372 305 Z M520 250 L545 268 L530 275 L505 266 Z M600 230 L625 256 L607 262 L588 252 Z M720 220 L755 268 L732 262 L712 270 L700 248 Z M900 270 L940 296 L915 300 L890 290 Z M1140 300 L1180 325 L1150 330 L1125 318 Z"
        fill={c.cap} opacity={w ? 1 : 0.75} />
      {w && (
        <path d="M160 360 L210 385 L170 392 L130 380 Z M1010 360 L1060 385 L1020 392 L985 378 Z M1260 380 L1300 398 L1270 404 L1240 395 Z" fill={c.cap} />
      )}
      {/* near ridge */}
      <path d="M0 520 L180 460 L330 500 L520 440 L700 495 L880 450 L1080 505 L1260 455 L1440 500 L1440 640 L0 640 Z" fill={c.near} />

      {/* foreground: lake in summer, snowfield in winter */}
      {w ? (
        <path d="M0 560 Q360 520 720 548 T1440 552 L1440 640 L0 640 Z" fill={c.ground} />
      ) : (
        <>
          <path d="M0 565 Q360 540 720 556 T1440 560 L1440 640 L0 640 Z" fill={c.ground} />
          <ellipse cx="720" cy="598" rx="430" ry="34" fill="url(#lake)" />
          <path d="M420 596 h90 M600 606 h130 M800 592 h110 M930 604 h80" stroke="#bfe3f2" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </>
      )}

      {w ? <XCSkier animate={motion} /> : <Fisherman animate={motion} />}

      {trees.map(([x, y, s], i) => (
        <g key={i}>
          <path d={pine(x, y, s)} fill={c.tree} />
          {c.treeSnow && (
            <path d={`M${x} ${y - 60 * s} L${x + 8 * s} ${y - 43 * s} L${x - 8 * s} ${y - 43 * s} Z M${x - 12 * s} ${y - 28 * s} L${x + 12 * s} ${y - 28 * s} L${x + 9 * s} ${y - 24 * s} L${x - 9 * s} ${y - 24 * s} Z`} fill={c.treeSnow} />
          )}
        </g>
      ))}
    </svg>
  )
}
