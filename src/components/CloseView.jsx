import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { MEDIUM_LABEL } from '../data/artworks.js';

// Full-screen look at one drawing, upright, with an optional actual-size zoom.
export default function CloseView({ index, artworks, onClose, onMove }) {
  const ref = useRef(null);
  const [zoom, setZoom] = useState(false);
  const art = index ? artworks[index - 1] : null;
  const n = artworks.length;

  useEffect(() => {
    const d = ref.current;
    if (art && !d.open) d.showModal();
    if (!art && d.open) d.close();
  }, [art]);

  useEffect(() => setZoom(false), [index]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight' && index < n) onMove(index + 1);
    else if (e.key === 'ArrowLeft' && index > 1) onMove(index - 1);
    else return;
    e.preventDefault();
  };

  return (
    <dialog ref={ref} className="closeview" onClose={onClose} onKeyDown={onKey} aria-label={art ? `${art.title}, close up` : 'Close up'}>
      {art && (
        <>
          <div className={`closeview__frame${zoom ? ' is-zoomed' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <img
              key={art.slug}
              src={art.src}
              alt={`${art.title}, ${MEDIUM_LABEL[art.medium].toLowerCase()} by Priyam Garg`}
              width={art.width}
              height={art.height}
              onClick={() => setZoom((z) => !z)}
            />
          </div>
          <div className="closeview__bar">
            <p>
              <b>{art.title}</b>
              <span>{art.series} · {MEDIUM_LABEL[art.medium]} · page {index} of {n}</span>
            </p>
            <div className="closeview__controls">
              <button type="button" className="btn btn--icon" onClick={() => onMove(index - 1)} disabled={index === 1} aria-label="Previous drawing">
                <ArrowLeft size={18} strokeWidth={2.25} aria-hidden="true" />
              </button>
              <button type="button" className="btn btn--icon" onClick={() => onMove(index + 1)} disabled={index === n} aria-label="Next drawing">
                <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </button>
              <button type="button" className="btn btn--icon" onClick={() => setZoom((z) => !z)} aria-pressed={zoom} aria-label={zoom ? 'Fit to screen' : 'Zoom in'}>
                {zoom ? <ZoomOut size={18} strokeWidth={2.25} aria-hidden="true" /> : <ZoomIn size={18} strokeWidth={2.25} aria-hidden="true" />}
              </button>
              <button type="button" className="btn btn--pencil" onClick={onClose} autoFocus>
                <X size={16} strokeWidth={2.5} aria-hidden="true" /> Close
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
