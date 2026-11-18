import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import DeskProps from './DeskProps.jsx';

// Page shape of the pad: landscape, close to A4 and to the scans themselves.
const RATIO = 1.4;
// How far the spiral wire rises above the top edge, as a share of page height.
const SPIRAL = 0.045;
const TURN_MS = 760;
const STAGGER_MS = 110;
const ROTATE_DELAY_MS = 380;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/**
 * A top-bound spiral sketchbook.
 * Sheet 0 is the cover, sheets 1..n are the drawings, and the inside of the
 * back cover sits underneath them all. `page` is the number of sheets turned
 * over: 0 shows the cover, n + 1 shows the inside back cover.
 */
function useNarrow() {
  const q = '(max-width: 560px)';
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

export default function Sketchbook({ artworks, page, onPageChange, reducedMotion, endSlot }) {
  const n = artworks.length;
  const sheetCount = n + 1;
  const stageRef = useRef(null);
  const sheetRefs = useRef([]);
  const angles = useRef(Array.from({ length: sheetCount }, (_, i) => (i < page ? 180 : 0)));
  const tokens = useRef(Array(sheetCount).fill(0));
  const drag = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [rotated, setRotated] = useState(() => Boolean(artworks[page - 1]?.portrait));
  const narrow = useNarrow();
  const bookRef = useRef(null);

  // ---- geometry --------------------------------------------------------
  useLayoutEffect(() => {
    const el = stageRef.current;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const H = Math.max(0, Math.min(box.w / RATIO, box.h / (1 + SPIRAL)));
  const W = H * RATIO;
  const footprintH = H * (1 + SPIRAL);
  const rotScale = H ? Math.min(box.w / footprintH, box.h / W) : 1;
  const scale = rotated ? rotScale : 1;
  // empty mat either side of the book, for the pencils
  const side = H ? (box.w - (rotated ? footprintH * rotScale : W)) / 2 : 0;
  // on a phone, the empty mat above and below the book holds the pencils instead
  const band = H ? (box.h - (rotated ? W * rotScale : footprintH)) / 2 : 0;

  // ---- drawing the sheets ---------------------------------------------
  // Only the sheets you can actually see are rendered: the top flat page and
  // any page in the middle of a turn. Everything else is display:none, so the
  // browser keeps two or three 3D layers instead of fourteen. Style writes
  // are diffed so a frame only touches what changed.
  const painted = useRef([]);
  const paint = useCallback(() => {
    let top = sheetCount;
    for (let i = 0; i < sheetCount; i++) {
      if (angles.current[i] <= 0.5) {
        top = i;
        break;
      }
    }
    for (let i = 0; i < sheetCount; i++) {
      const el = sheetRefs.current[i];
      if (!el) continue;
      const a = angles.current[i];
      const moving = a > 0.5 && a < 179.5;
      const show = moving || i === top;
      const st = painted.current[i] || (painted.current[i] = {});
      if (st.show !== show) {
        el.style.display = show ? '' : 'none';
        st.show = show;
      }
      if (st.moving !== moving) {
        el.style.willChange = moving ? 'transform' : 'auto';
        el.style.zIndex = String(moving ? 400 + (sheetCount - i) : sheetCount - i);
        st.moving = moving;
      }
      if (show && st.a !== a) {
        el.style.transform = a ? `rotateX(${a}deg)` : 'none';
        const lift = (Math.sin((a * Math.PI) / 180) * 0.9).toFixed(3);
        st.shades ||= el.querySelectorAll('.shade');
        st.shades.forEach((sh) => (sh.style.opacity = lift));
        st.a = a;
      }
    }
  }, [sheetCount]);

  useEffect(() => {
    painted.current = [];
    paint();
  }, [paint, W]);

  const animateSheet = useCallback(
    (i, to, delay) => {
      const from = angles.current[i];
      const token = ++tokens.current[i];
      const dur = reducedMotion ? 0 : (Math.abs(to - from) / 180) * TURN_MS;
      if (dur < 16) {
        angles.current[i] = to;
        paint();
        return;
      }
      let start = null;
      const step = (now) => {
        if (tokens.current[i] !== token) return;
        if (start === null) start = now + delay;
        const t = Math.min(1, Math.max(0, (now - start) / dur));
        angles.current[i] = from + (to - from) * easeOut(t);
        paint();
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    [paint, reducedMotion],
  );

  // Bring every sheet to where `page` says it should be, staggered in the
  // order a hand would turn them.
  const settle = useCallback(
    (target, fromPage) => {
      const forward = target >= fromPage;
      const order = [...Array(sheetCount).keys()];
      if (!forward) order.reverse();
      const want = (i) => (i < target ? 180 : 0);
      const todo = order.filter((i) => Math.abs(angles.current[i] - want(i)) > 0.5 || drag.current?.sheet === i);
      // A long jump (from the ruler or the gallery) flips straight to the last
      // two sheets instead of animating every page in between.
      const snap = todo.length > 3 ? todo.slice(0, -2) : [];
      for (const i of snap) {
        tokens.current[i]++;
        angles.current[i] = want(i);
      }
      if (snap.length) paint();
      todo.slice(snap.length).forEach((i, k) => animateSheet(i, want(i), reducedMotion ? 0 : k * STAGGER_MS));
      return todo.length - snap.length;
    },
    [animateSheet, sheetCount, reducedMotion, paint],
  );

  const lastPage = useRef(page);
  useEffect(() => {
    const turned = settle(page, lastPage.current);
    lastPage.current = page;
    const wantRotated = Boolean(artworks[page - 1]?.portrait);
    const delay = reducedMotion || !turned ? 0 : ROTATE_DELAY_MS + (turned - 1) * STAGGER_MS;
    if (reducedMotion && turned && bookRef.current?.animate) {
      // no turning or rotating: the new page fades in instead
      bookRef.current.animate([{ opacity: 0.15 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' });
    }
    const t = setTimeout(() => setRotated(wantRotated), delay);
    return () => clearTimeout(t);
  }, [page, settle, artworks, reducedMotion]);

  // ---- pointer: tap to turn, drag or swipe to turn by hand ---------------
  const dims = () => {
    const s = rotated ? rotScale : 1;
    return 0.55 * Math.min(W, H) * s;
  };

  const onPointerDown = (e) => {
    if (e.button !== 0 || e.target.closest('a,button')) return;
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId, mouse: e.pointerType === 'mouse', sheet: null, dir: 0, moved: false };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 8) return;
    if (!d.moved) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    // Toward the spiral turns forward. Upright, the spiral is above; turned
    // sideways it is on the left. Horizontal swipes work everywhere, since
    // vertical touch moves are left to page scrolling.
    const horiz = Math.abs(dx) >= Math.abs(dy);
    const amount = horiz ? -dx : d.mouse ? -dy : 0;
    if (!d.dir && Math.abs(amount) > 4) d.dir = amount > 0 ? 1 : -1;
    if (!d.dir) return;
    if (d.sheet === null) {
      d.sheet = d.dir > 0 ? page : page - 1;
      if (d.sheet < 0 || d.sheet >= sheetCount) {
        d.sheet = -1;
      } else {
        tokens.current[d.sheet]++;
      }
    }
    if (d.sheet < 0) return;
    const p = Math.min(1, Math.max(0, (d.dir * amount) / dims()));
    angles.current[d.sheet] = d.dir > 0 ? 180 * p : 180 * (1 - p);
    paint();
  };

  const onPointerUp = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) {
      if (page <= n) onPageChange(page + 1);
      return;
    }
    if (d.sheet === null || d.sheet < 0) return;
    const a = angles.current[d.sheet];
    const committed = d.dir > 0 ? a > 50 : a < 130;
    const target = committed ? page + d.dir : page;
    if (target === page) animateSheet(d.sheet, d.dir > 0 ? 0 : 180, 0);
    else onPageChange(target);
  };

  const onPointerCancel = () => {
    const d = drag.current;
    drag.current = null;
    if (d && d.sheet >= 0 && d.sheet !== null) animateSheet(d.sheet, d.sheet < page ? 180 : 0, 0);
  };

  // ---- render ----------------------------------------------------------
  // Load each drawing once it is next to the open page, and keep it.
  const seen = useRef(new Set());
  for (let i = page - 1; i <= page + 1; i++) seen.current.add(i);
  const near = (i) => seen.current.has(i);

  return (
    <div className="stage" ref={stageRef}>
      {!narrow && side >= 150 && <DeskProps side={side} scale={H / 600} />}
      {narrow && <DeskProps layout="bands" band={band} scale={box.w / 430} />}
      <div
        ref={bookRef}
        className="book"
        data-rotated={rotated}
        style={{
          width: W,
          height: H,
          marginTop: H * SPIRAL,
          transform: `rotate(${rotated ? -90 : 0}deg) scale(${scale})`,
          transitionDuration: reducedMotion ? '0ms' : undefined,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div className="back-board" inert={page !== n + 1} data-impeccable-ignore="hard-offset-shadow">
          {endSlot}
        </div>
        <div className="sheets" style={{ perspective: `${Math.round(W * 2.6)}px` }}>
          {Array.from({ length: sheetCount }, (_, i) => {
            const art = artworks[i - 1];
            return (
              <div className={`sheet${i === 0 ? ' sheet--cover' : ''}`} key={i} ref={(el) => (sheetRefs.current[i] = el)}>
                <div className="face face--front" style={art ? { background: art.paper } : undefined}>
                  {i === 0 ? (
                    <Cover pages={n} />
                  ) : (
                    <img
                      className={art.portrait ? 'art art--turned' : 'art'}
                      src={near(i) ? art.src : undefined}
                      srcSet={near(i) ? art.srcSet : undefined}
                      sizes={`${Math.max(320, Math.round(art.portrait ? H * rotScale : W))}px`}
                      width={art.width}
                      height={art.height}
                      alt={`${art.title}, ${art.medium === 'colour' ? 'a colour drawing' : 'a pencil sketch'} by Priyam Garg`}
                      draggable="false"
                      decoding="async"
                      style={art.portrait ? { width: H, height: W } : undefined}
                    />
                  )}
                  <span className="shade" aria-hidden="true" />
                </div>
                <div className="face face--back" aria-hidden="true">
                  {art && near(i) && (
                    <img
                      className={art.portrait ? 'ghost art--turned' : 'ghost'}
                      src={art.thumb}
                      alt=""
                      draggable="false"
                      style={art.portrait ? { width: H, height: W } : undefined}
                    />
                  )}
                  <span className="shade" />
                </div>
              </div>
            );
          })}
        </div>
        <Spiral width={W * 0.96} height={H * 0.075} top={-H * SPIRAL} />
      </div>
    </div>
  );
}

function Cover({ pages }) {
  return (
    <div className="cover">
      <div className="cover__head">
        <span className="cover__brand">PALS</span>
        <span className="cover__vol">Art Gallery · Vol. 01</span>
      </div>
      <div className="cover__label">
        <div className="label-row">
          <span className="label-key">Name</span>
          <span className="label-name">Priyam</span>
        </div>
        <div className="label-row">
          <span className="label-key">Subject</span>
          <span className="label-val">Anime sketches</span>
        </div>
      </div>
      <div className="cover__band">
        <span className="cover__title">Sketch Book</span>
        <span className="cover__spec">
          <span>A4 landscape</span>
          <span>120 gsm · {pages} drawings</span>
        </span>
      </div>
      <div className="cover__dim" aria-hidden="true">
        <span className="dim-line" />
        <span className="dim-text">297 mm</span>
        <span className="dim-line" />
      </div>
      <span className="cover__strap" aria-hidden="true" />
    </div>
  );
}

function Spiral({ width, height, top }) {
  // One loop of wire per punched hole, drawn in real pixels so the coils keep
  // their shape at every size of the book.
  if (!width) return null;
  const coils = Math.max(10, Math.round(width / 27));
  const step = width / coils;
  const holeY = height * 0.74;
  const apex = height * 0.06;
  const r = step * 0.15;
  const sw = Math.max(1.6, height * 0.075);
  return (
    <svg className="spiral" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ top, left: (width / 0.96) * 0.02 }} aria-hidden="true">
      <defs>
        <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7f868e" />
          <stop offset="0.35" stopColor="#f4f6f8" />
          <stop offset="0.6" stopColor="#b5bbc2" />
          <stop offset="1" stopColor="#6c737b" />
        </linearGradient>
      </defs>
      {Array.from({ length: coils }, (_, i) => {
        const x = step * (i + 0.5);
        const d = `M ${x - r * 0.7} ${holeY} C ${x - r * 0.9} ${apex}, ${x + r * 2.1} ${apex}, ${x + r * 1.5} ${holeY - height * 0.12}`;
        return (
          <g key={i}>
            <ellipse className="hole" cx={x} cy={holeY} rx={r} ry={height * 0.1} />
            <path className="wire-shadow" d={d} strokeWidth={sw * 1.5} transform={`translate(0 ${height * 0.04})`} />
            <path className="wire" d={d} strokeWidth={sw} />
          </g>
        );
      })}
    </svg>
  );
}
