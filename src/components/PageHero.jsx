import Particles from './Particles'
import Scene from './Scene'

// Illustrated banner used at the top of every page.
export default function PageHero({ eyebrow, title, children, tall = false }) {
  return (
    <section className={`hero ${tall ? 'hero--tall' : ''}`}>
      <Scene />
      <Particles />
      <div className="hero__content container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}
