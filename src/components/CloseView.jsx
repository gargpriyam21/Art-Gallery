import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { MEDIUM_LABEL } from '../data/artworks.js';

// "Look closer": the sheet is torn off the pad and laid on a dark light-table.
// The drawing is the brightest thing on screen; the controls fade away once
// you stop moving, and come back on any tap, move or key press.

const IDLE_MS = 2400;

// A ragged top edge, the same for a given drawing every time it is torn.
function tornEdge(slug) {
  let seed = [...slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const pts = [];
  for (let x = 0; x <= 100; x += 1.6 + rand() * 1.4) {
    // depth in pixels, so wide and tall sheets tear the same way
    pts.push(`${x.toFixed(2)}% ${(rand() * 6 + (rand() < 0.14 ? 5 : 0)).toFixed(1)}px`);
  }
  pts.push('100% 3px', '100% 100%', '0% 100%');
  return `polygon(${pts.join(', ')})`;
}

export default function CloseView({ index, artworks, onClose, onMove, getOrigin, reducedMotion }) {
  const dialogRef = useRef(null);
  const sheetRef = useRef(null);
  const idleTimer = useRef(0);
  const swipe = useRef(null);
  const closing = useRef(false);
  const [zoom, setZoom] = useState(false);
  const [chrome, setChrome] = useState(true);
  const art = index ? artworks[index - 1] : null;
  const n = artworks.length;
  const edge = useMemo(() => (art ? tornEdge(art.slug) : undefined), [art]);

  // ---- controls that fade when idle -------------------------------------
  const wake = useCallback(() => {
    setChrome(true);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setChrome(false), IDLE_MS);
  }, []);
  useEffect(() => () => clearTimeout(idleTimer.current), []);

  // ---- tearing the sheet off, and putting it back ------------------------
  const flight = useCallback(
    (reverse) => {
      const el = sheetRef.current;
      const from = getOrigin?.();
      if (!el || !from || reducedMotion || !el.animate) return null;
      const to = el.getBoundingClientRect();
      if (!to.width || !from.width) return null;
      const s = Math.min(from.width / to.width, from.height / to.height);
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      const onPad = `translate(${dx}px, ${dy}px) scale(${s})`;
      const frames = [
        { transform: onPad, offset: 0 },
        // the tug against the spiral before it rips free
        { transform: `translate(${dx}px, ${dy - from.height * 0.035}px) scale(${s}) rotate(-1.2deg)`, offset: 0.18 },
        { transform: 'translate(0, -1.5%) rotate(0.8deg) scale(1.015)', offset: 0.75 },
        { transform: 'none', offset: 1 },
      ];
      const keys = reverse ? [...frames].reverse().map((f) => ({ ...f, offset: 1 - f.offset })) : frames;
      try {
        return el.animate(keys, {
        duration: reverse ? 480 : 760,
        easing: reverse ? 'cubic-bezier(0.5, 0, 0.75, 0)' : 'cubic-bezier(0.22, 0.8, 0.26, 1)',
          fill: 'both',
        });
      } catch {
        return null;
      }
    },
    [getOrigin, reducedMotion],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (art && !d.open) {
      closing.current = false;
      d.showModal();
      requestAnimationFrame(() => flight(false));
      wake();
    }
    if (!art && d.open) d.close();
    // only when a close-up opens, not when moving between sheets
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Boolean(art)]);

  const close = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    setChrome(false);
    dialogRef.current?.classList.add('is-leaving');
    const anim = zoom ? null : flight(true);
    if (anim) await anim.finished.catch(() => {});
    anim?.cancel();
    dialogRef.current?.classList.remove('is-leaving');
    dialogRef.current?.close();
  }, [flight, zoom]);

  useEffect(() => setZoom(false), [index]);

  const move = (p) => {
    if (p < 1 || p > n) return;
    onMove(p);
    wake();
  };

  const onKey = (e) => {
    wake();
    if (e.key === 'ArrowRight') move(index + 1);
    else if (e.key === 'ArrowLeft') move(index - 1);
    else return;
    e.preventDefault();
  };

  // ---- touch: swipe between sheets, tap to show controls -----------------
  const onPointerDown = (e) => {
    swipe.current = zoom ? null : { x: e.clientX, y: e.clientY, t: performance.now() };
  };
  const onPointerUp = (e) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && performance.now() - s.t < 600) {
      move(dx < 0 ? index + 1 : index - 1);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={`lightbox${chrome ? '' : ' is-idle'}`}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onKeyDown={onKey}
      onPointerMove={(e) => e.pointerType === 'mouse' && wake()}
      aria-label={art ? `${art.title}, close up` : 'Close up'}
    >
      {art && (
        <>
          <div
            className={`lightbox__table${zoom ? ' is-zoomed' : ''}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
              else wake();
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <figure
              ref={sheetRef}
              className="torn"
              style={{ '--paper': art.paper, clipPath: edge }}
              onDoubleClick={() => setZoom((z) => !z)}
            >
              <img
                key={art.slug}
                src={art.src}
                alt={`${art.title}, ${MEDIUM_LABEL[art.medium].toLowerCase()} by Priyam Garg`}
                width={art.width}
                height={art.height}
                draggable="false"
              />
            </figure>
          </div>

          <button type="button" className="lightbox__close" onClick={close} aria-label="Put the sheet back">
            <X size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => move(index - 1)} disabled={index === 1} aria-label="Previous drawing">
            <ArrowLeft size={22} strokeWidth={2.25} aria-hidden="true" />
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => move(index + 1)} disabled={index === n} aria-label="Next drawing">
            <ArrowRight size={22} strokeWidth={2.25} aria-hidden="true" />
          </button>

          <div className="lightbox__label">
            <p>
              <b>{art.title}</b>
              <span>
                {art.series} · {MEDIUM_LABEL[art.medium]} · {index} of {n}
              </span>
            </p>
            <button type="button" className="lightbox__zoom" onClick={() => setZoom((z) => !z)} aria-pressed={zoom}>
              {zoom ? <ZoomOut size={16} strokeWidth={2.25} aria-hidden="true" /> : <ZoomIn size={16} strokeWidth={2.25} aria-hidden="true" />}
              {zoom ? 'Fit' : 'Zoom'}
            </button>
          </div>
          <p className="lightbox__hint" aria-hidden="true">
            Double-tap to zoom · swipe for the next sheet
          </p>
        </>
      )}
    </dialog>
  );
}
