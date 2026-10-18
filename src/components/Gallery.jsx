import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { photo, thumb } from '../data/site'

export function Lightbox({ ids, index, onClose, onChange }) {
  const go = useCallback((d) => onChange((index + d + ids.length) % ids.length), [index, ids.length, onChange])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [go, onClose])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close"><X /></button>
      <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous"><ChevronLeft size={32} /></button>
      <img src={photo(ids[index])} alt="" onClick={(e) => e.stopPropagation()} />
      <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next"><ChevronRight size={32} /></button>
      <span className="lightbox__count">{index + 1} / {ids.length}</span>
    </div>
  )
}

export default function Gallery({ ids, label }) {
  const [open, setOpen] = useState(null)
  return (
    <>
      <div className="gallery">
        {ids.map((id, i) => (
          <button key={id} className="gallery__item" onClick={() => setOpen(i)} aria-label={`Open ${label} photo ${i + 1}`}>
            <img src={thumb(id)} alt={`${label} photo ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      {open !== null && <Lightbox ids={ids} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
    </>
  )
}
