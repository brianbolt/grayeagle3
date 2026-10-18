import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../theme'

// A tiny skier (winter) or mountain biker (summer) pops out of the season
// toggle, hits a kicker, and rides off whenever the theme changes.

const W = 440
const H = 150
const RAMP_LEN = 36
const RAMP_H = 15
const AIR_LEN = 118
const PEAK = 34
const DURATION = 2200

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a, b, t) => a + (b - a) * t
const easeIn = (t) => t * t
const easeOut = (t) => 1 - (1 - t) * (1 - t)
const phase = (ms, start, end) => clamp((ms - start) / (end - start))

// Rider figures face right with the contact point at (0, 0).
function Skier() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M-15 0 L12 0 Q16 0 17 -3.5" stroke="var(--hero-ink)" strokeWidth="1.8" />
      <path d="M-7 -14 L-12 -1" stroke="var(--hero-ink)" strokeWidth="1" opacity="0.7" />
      <path d="M0 -1 L5 -8 L-1 -14" stroke="var(--hero-ink)" strokeWidth="2.6" />
      <path d="M-1 -14 L4 -22" stroke="var(--accent)" strokeWidth="3.6" />
      <path d="M3 -20 L9 -15" stroke="var(--accent)" strokeWidth="2.2" />
      <path d="M9 -15 L1 -1" stroke="var(--hero-ink)" strokeWidth="1" opacity="0.7" />
      <circle cx="6.5" cy="-26" r="3.2" fill="#f1d3b5" stroke="none" />
      <path d="M3.3 -26.5 a3.3 3.3 0 0 1 6.5 0 Z" fill="var(--accent)" stroke="none" />
      <circle cx="6.5" cy="-30" r="1.2" fill="var(--accent)" stroke="none" />
    </g>
  )
}

function Biker() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx="-9" cy="-5.5" r="5.5" stroke="var(--hero-ink)" strokeWidth="1.6" />
      <circle cx="9" cy="-5.5" r="5.5" stroke="var(--hero-ink)" strokeWidth="1.6" />
      <path d="M-9 -5.5 L-1 -6 L-3 -13.5 Z M-3 -13.5 L6 -13.5 L-1 -6 M6 -13.5 L9 -5.5 M6 -13.5 L6.5 -17 L8.5 -17.5" stroke="var(--accent)" strokeWidth="1.6" />
      <path d="M-5 -14 L-1.5 -14" stroke="var(--hero-ink)" strokeWidth="2" />
      <path d="M-3 -15 L3 -11 L0 -6" stroke="var(--hero-ink)" strokeWidth="2.4" />
      <path d="M-3 -15 L3 -23" stroke="var(--accent)" strokeWidth="3.6" />
      <path d="M2.5 -21.5 L8 -17.5" stroke="var(--accent)" strokeWidth="2.2" />
      <circle cx="6" cy="-26.5" r="3.2" fill="#f1d3b5" stroke="none" />
      <path d="M2.4 -26.8 a3.6 3.6 0 0 1 7.2 0 L10.6 -26.2 Z" fill="var(--hero-ink)" stroke="none" />
    </g>
  )
}

// Where the rider should appear: the active option of the nav toggle, or the
// floating toggle when the nav one is hidden (collapsed mobile menu).
function findOrigin(season) {
  const idx = season === 'winter' ? 0 : 1
  const nav = document.querySelector('.nav .season-toggle')
  if (nav && nav.getBoundingClientRect().width > 0) {
    const r = nav.querySelectorAll('.season-toggle__opt')[idx].getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, below: true }
  }
  const fab = document.querySelector('.season-toggle--floating')
  if (!fab) return null
  const r = fab.querySelectorAll('.season-toggle__opt')[idx].getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, below: false }
}

export default function Rider() {
  const { season } = useTheme()
  const [run, setRun] = useState(null)
  const prev = useRef(season)
  const refs = useRef({})

  useEffect(() => {
    if (prev.current === season) return
    prev.current = season
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const origin = findOrigin(season)
    if (origin) setRun({ id: Date.now(), season, ...origin })
  }, [season])

  useEffect(() => {
    if (!run) return
    const { rider, ramp, track1, track2, puffs, spray, root } = refs.current
    const sx = W - 20
    const sy = run.below ? 36 : 104
    const g = run.below ? sy + 80 : sy - 34 // ground line
    const ex = sx - 26 // where the rider touches down after emerging
    const r0 = sx - 150 // ramp base
    const r1 = r0 - RAMP_LEN // ramp lip
    const land = r1 - AIR_LEN
    const end = land - 70

    const puffSeeds = Array.from({ length: 7 }, () => ({
      vx: (Math.random() - 0.3) * 30,
      vy: -10 - Math.random() * 16,
      r: 1.2 + Math.random() * 1.6,
    }))

    let raf
    const t0 = performance.now()
    const frame = (now) => {
      const ms = now - t0
      let x, y, angle = 0, scale = 1, opacity = 1

      if (ms < 380) {
        // emerge from the toggle and drop to the ground line
        const t = phase(ms, 0, 380)
        x = lerp(sx, ex, easeOut(t))
        y = lerp(sy, g, run.below ? easeIn(t) : easeOut(t))
        scale = lerp(0.25, 1, easeOut(t))
        opacity = clamp(t * 2.5)
      } else if (ms < 920) {
        // pick up speed toward the ramp
        const t = phase(ms, 380, 920)
        x = lerp(ex, r0, easeIn(t) * 0.7 + t * 0.3)
        y = g
      } else if (ms < 1060) {
        // up the kicker
        const t = phase(ms, 920, 1060)
        x = lerp(r0, r1, t)
        y = g - RAMP_H * t * t
        angle = 8 + 22 * t
      } else if (ms < 1580) {
        // airborne
        const t = phase(ms, 1060, 1580)
        x = lerp(r1, land, t)
        y = lerp(g - RAMP_H, g, t) - PEAK * 4 * t * (1 - t)
        angle = lerp(30, -10, easeIn(t))
      } else {
        // land and roll out
        const t = phase(ms, 1580, DURATION)
        x = lerp(land, end, easeOut(t))
        y = g
        angle = lerp(-10, 0, clamp(t * 4))
        opacity = 1 - clamp((t - 0.55) / 0.45)
      }

      rider.setAttribute('transform', `translate(${x} ${y}) rotate(${angle}) scale(${-scale * 1.3} ${scale * 1.3})`)
      rider.style.opacity = opacity

      // ramp grows in, then everything fades together at the end
      const grow = easeOut(phase(ms, 120, 520))
      ramp.setAttribute('transform', `translate(0 ${g}) scale(1 ${grow}) translate(0 ${-g})`)
      root.style.opacity = 1 - phase(ms, DURATION - 350, DURATION)

      // tracks trail behind the rider on the ground
      track1.setAttribute('x2', ms < 380 ? ex : Math.max(r0, x))
      track2.setAttribute('x2', ms < 1580 ? land : x)

      // spray off the lip, puff on landing
      const s = phase(ms, 1040, 1300)
      spray.style.opacity = s > 0 && s < 1 ? 1 - s : 0
      spray.setAttribute('transform', `translate(${r1 - s * 14} ${g - RAMP_H - s * 8})`)
      const p = phase(ms, 1580, 2100)
      puffs.forEach((el, i) => {
        const seed = puffSeeds[i]
        el.setAttribute('cx', land + seed.vx * p)
        el.setAttribute('cy', g + seed.vy * p + 22 * p * p)
        el.style.opacity = p > 0 && p < 1 ? 1 - p : 0
      })

      if (ms < DURATION) raf = requestAnimationFrame(frame)
      else setRun(null)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [run])

  if (!run) return null

  const winter = run.season === 'winter'
  const sx = W - 20
  const sy = run.below ? 36 : 104
  const g = run.below ? sy + 80 : sy - 34
  const r0 = sx - 150
  const r1 = r0 - RAMP_LEN
  const land = r1 - AIR_LEN
  const fit = Math.min(1, (run.x - 8) / sx)
  const style = {
    left: run.x - sx * fit,
    top: run.y - sy * fit,
    width: W * fit,
    height: H * fit,
  }

  const rampFill = winter ? '#ffffff' : '#b0835a'
  const rampStroke = winter ? '#8fb0cc' : '#7d5a3a'
  const puffColor = winter ? '#a9c4dc' : '#c9a57f'

  return (
    <svg
      ref={(el) => (refs.current.root = el)}
      className="rider"
      style={style}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
    >
      <line ref={(el) => (refs.current.track1 = el)} x1={sx - 26} y1={g + 1.5} x2={sx - 26} y2={g + 1.5} stroke={rampStroke} strokeWidth="1" strokeDasharray={winter ? '0' : '3 3'} opacity="0.5" />
      <line ref={(el) => (refs.current.track2 = el)} x1={land} y1={g + 1.5} x2={land} y2={g + 1.5} stroke={rampStroke} strokeWidth="1" strokeDasharray={winter ? '0' : '3 3'} opacity="0.5" />
      <path
        ref={(el) => (refs.current.ramp = el)}
        d={`M${r0 + 6} ${g} Q${r0 - RAMP_LEN * 0.55} ${g} ${r1} ${g - RAMP_H} L${r1 - 3} ${g} Z`}
        fill={rampFill}
        stroke={rampStroke}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <g ref={(el) => (refs.current.spray = el)} fill={puffColor} opacity="0">
        <circle cx="0" cy="0" r="1.6" />
        <circle cx="5" cy="-4" r="1.2" />
        <circle cx="9" cy="1" r="1" />
      </g>
      {Array.from({ length: 7 }, (_, i) => (
        <circle
          key={i}
          ref={(el) => {
            refs.current.puffs = refs.current.puffs || []
            refs.current.puffs[i] = el
          }}
          r={1.4 + (i % 3) * 0.6}
          fill={puffColor}
          opacity="0"
        />
      ))}
      <g ref={(el) => (refs.current.rider = el)} style={{ opacity: 0 }}>
        {winter ? <Skier /> : <Biker />}
      </g>
    </svg>
  )
}
