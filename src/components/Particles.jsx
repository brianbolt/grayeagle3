import { useEffect, useRef } from 'react'
import { useTheme } from '../theme'

// Ambient layer for hero banners: falling snow in winter, drifting golden light
// motes in summer. Disabled for visitors who prefer reduced motion.
export default function Particles() {
  const { season } = useTheme()
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, raf
    const winter = season === 'winter'

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const box = canvas.parentElement.getBoundingClientRect()
      w = box.width
      h = box.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.round(Math.min(w, 1400) / (winter ? 14 : 40))
    const make = (top) => ({
      x: Math.random() * w,
      y: top ? -10 : Math.random() * h,
      r: winter ? 1 + Math.random() * 2.6 : 1 + Math.random() * 2,
      vy: winter ? 0.4 + Math.random() * 1.1 : -0.1 - Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      drift: 0.3 + Math.random() * 0.7,
    })
    const flakes = Array.from({ length: count }, () => make(false))

    const tick = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of flakes) {
        p.y += p.vy
        p.x += Math.sin(t / 1600 + p.phase) * p.drift * 0.4
        if (winter && p.y > h + 10) Object.assign(p, make(true))
        if (!winter && p.y < -10) Object.assign(p, make(false), { y: h + 10 })
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        if (winter) {
          ctx.fillStyle = `rgba(255,255,255,${0.35 + p.r / 6})`
        } else {
          const a = 0.25 + 0.25 * Math.sin(t / 700 + p.phase)
          ctx.fillStyle = `rgba(255,214,120,${a})`
        }
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [season])

  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
