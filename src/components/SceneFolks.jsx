// Tiny characters that live in the hero landscape: a fisherman and his dog
// on the summer lakeshore, and a cross-country skier with a dog crossing the
// winter valley. Drawn in scene units (the scene viewBox is 1440×640).

const INK = '#1f2d3d'
const SKIN = '#f1d3b5'

function Dog({ running = false, animate = true }) {
  // faces right, paws at y = 0
  return (
    <g>
      <path d="M-7 -6 Q-7 -9 -3 -9 L4 -9 Q7 -9 7 -6 Z" fill="#7a5233" />
      <circle cx="8" cy="-10.5" r="2.8" fill="#7a5233" />
      <path d="M9.5 -10 L12 -9.4 L9.6 -8.6 Z" fill="#7a5233" />
      <path d="M6.8 -12.5 L6.2 -9.6 L8.3 -11 Z" fill="#4e3420" />
      <path d="M-7 -8 Q-10.5 -11 -10 -14" stroke="#7a5233" strokeWidth="1.4" fill="none" strokeLinecap="round">
        {animate && (
          <animateTransform attributeName="transform" type="rotate" values="-12 -7 -8; 14 -7 -8; -12 -7 -8" dur={running ? '0.5s' : '0.7s'} repeatCount="indefinite" />
        )}
      </path>
      <g stroke="#7a5233" strokeWidth="1.4" strokeLinecap="round">
        {running ? (
          <>
            <path d="M-5 -6 L-7 0">
              {animate && <animate attributeName="d" values="M-5 -6 L-7 0; M-5 -6 L-2 0; M-5 -6 L-7 0" dur="0.36s" repeatCount="indefinite" />}
            </path>
            <path d="M5 -6 L7 0">
              {animate && <animate attributeName="d" values="M5 -6 L7 0; M5 -6 L2 0; M5 -6 L7 0" dur="0.36s" repeatCount="indefinite" />}
            </path>
          </>
        ) : (
          <>
            <path d="M-5 -6 L-6 0" />
            <path d="M5 -6 L5 0" />
          </>
        )}
      </g>
    </g>
  )
}

export function Fisherman({ animate }) {
  // Sits on the far shore at the top of the lake, line in the water.
  return (
    <g transform="translate(556 563) scale(1.15)">
      <g transform="translate(-18 0)">
        {/* dog sits facing the water, so draw it static and upright */}
        <Dog animate={animate} />
      </g>
      <ellipse cx="0" cy="-2" rx="6" ry="3" fill="#8b918c" />
      <path d="M0 -5 L7 -6 L8 0" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0 -5 L1 -14" stroke="#c0462f" strokeWidth="4" strokeLinecap="round" />
      <path d="M1 -13 L7 -10" stroke="#c0462f" strokeWidth="2" strokeLinecap="round" />
      <circle cx="2" cy="-18.5" r="3" fill={SKIN} />
      <path d="M-2 -19.2 L6 -19.2 L4.6 -21.6 Q2 -23.4 -0.6 -21.6 Z" fill="#c9b27c" />
      <path d="M6.5 -9.5 L30 -31" stroke={INK} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M30 -31 Q36 -12 38 11" stroke={INK} strokeWidth="0.45" fill="none" opacity="0.7" />
      <g>
        {animate && <animateTransform attributeName="transform" type="translate" values="0 0; 0 0.9; 0 0" dur="2.4s" repeatCount="indefinite" />}
        <circle cx="38" cy="11" r="1.5" fill="#e04b3a" />
        <path d="M36.5 11 a1.5 1.5 0 0 0 3 0 Z" fill="#fff" />
      </g>
      {animate && (
        <ellipse cx="38" cy="12.5" rx="2" ry="0.6" fill="none" stroke="#d7eef7" strokeWidth="0.5">
          <animate attributeName="rx" values="2; 8" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="ry" values="0.6; 2" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9; 0" dur="2.4s" repeatCount="indefinite" />
        </ellipse>
      )}
    </g>
  )
}

export function XCSkier({ animate }) {
  const stride = '1.1s'
  const figure = (
    <g transform="scale(1.2)">
      <path d="M-16 0 L15 0 Q19 0 20 -3" stroke={INK} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <g stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-6 0 L0 -13 L7 0">
          {animate && <animate attributeName="d" values="M-6 0 L0 -13 L7 0; M-1 0 L0 -13 L2 0; M-6 0 L0 -13 L7 0" dur={stride} repeatCount="indefinite" />}
        </path>
      </g>
      <path d="M0 -13 L5 -22" stroke="#2f6fa3" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M4.5 -20.5 L10 -16" stroke="#2f6fa3" strokeWidth="2" strokeLinecap="round">
        {animate && <animate attributeName="d" values="M4.5 -20.5 L10 -16; M4.5 -20.5 L0 -15; M4.5 -20.5 L10 -16" dur={stride} repeatCount="indefinite" />}
      </path>
      <path d="M10 -16 L4 0" stroke={INK} strokeWidth="0.8" strokeLinecap="round">
        {animate && <animate attributeName="d" values="M10 -16 L4 0; M0 -15 L-8 0; M10 -16 L4 0" dur={stride} repeatCount="indefinite" />}
      </path>
      <circle cx="7" cy="-25.5" r="3" fill={SKIN} />
      <path d="M3.8 -26 a3.2 3.2 0 0 1 6.4 0 Z" fill="#c0462f" />
      <circle cx="7" cy="-29.6" r="1.1" fill="#c0462f" />
    </g>
  )

  return (
    <g>
      {animate && (
        <animateTransform attributeName="transform" type="translate" values="-80 0; 1520 0" dur="75s" begin="-28s" repeatCount="indefinite" />
      )}
      <g transform={animate ? 'translate(0 602)' : 'translate(820 602)'}>
        {figure}
        <g transform="translate(34 0)">
          {animate && <animateTransform attributeName="transform" type="translate" values="34 0; 34 -1.5; 34 0" dur="0.36s" repeatCount="indefinite" />}
          <Dog running animate={animate} />
        </g>
      </g>
    </g>
  )
}
