import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Maximize2, Moon, RotateCcw, Sun } from 'lucide-react';
import Sketchbook from './components/Sketchbook.jsx';
import CloseView from './components/CloseView.jsx';
import Ruler from './components/Ruler.jsx';
import { artworks, ARTIST, MEDIUM_LABEL } from './data/artworks.js';

const n = artworks.length;
const pad = (v) => String(v).padStart(2, '0');

// Pages are shareable: #/goku-ssj3 opens the book at that drawing.
function pageFromHash() {
  const m = window.location.hash.match(/^#\/([\w-]+)/);
  if (!m) return 0;
  if (m[1] === 'end') return n + 1;
  const art = artworks.find((a) => a.slug === m[1]);
  return art ? art.page : 0;
}

// Light or dark: follows the system until the visitor picks one, then remembers it.
function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#dde8f5' : '#1c4c8a';
  }, [theme]);
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem('pals-theme', next);
    } catch {
      /* storage blocked: the choice lasts for this visit only */
    }
  };
  return [theme, toggle];
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export default function App() {
  const [page, setPageState] = useState(pageFromHash);
  const [closeUp, setCloseUp] = useState(null);
  const reducedMotion = useReducedMotion();
  const [theme, toggleTheme] = useTheme();
  const deskRef = useRef(null);

  const setPage = useCallback((p) => {
    const next = Math.max(0, Math.min(n + 1, p));
    setPageState(next);
    const hash = next === 0 ? '' : next === n + 1 ? '#/end' : `#/${artworks[next - 1].slug}`;
    history.replaceState(null, '', hash || window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const onHash = () => setPageState(pageFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Arrow keys turn pages while the book is on screen.
  useEffect(() => {
    const onKey = (e) => {
      if (closeUp !== null || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target.closest?.('input,textarea,select')) return;
      const rect = deskRef.current?.getBoundingClientRect();
      if (!rect || rect.bottom < window.innerHeight * 0.4) return;
      if (e.key === 'ArrowRight') setPage(page + 1);
      else if (e.key === 'ArrowLeft') setPage(page - 1);
      else if (e.key === 'Home') setPage(0);
      else if (e.key === 'End') setPage(n + 1);
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page, setPage, closeUp]);

  const art = artworks[page - 1];
  const openAt = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      <a className="skip" href="#pages">Skip to the list of drawings</a>
      <header className="masthead">
        <a className="stamp" href="#top" onClick={(e) => { e.preventDefault(); openAt(0); }}>
          <span className="stamp__name">PALS</span>
          <span className="stamp__rule" aria-hidden="true" />
          <span className="stamp__what">Art Gallery</span>
        </a>
        <nav className="masthead__nav" aria-label="Site">
          <a href="#pages">Gallery</a>
          <a href="#about">About</a>
          <a href={ARTIST.portfolio} className="ext">
            Portfolio <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {theme === 'light' ? <Moon size={18} strokeWidth={2.25} aria-hidden="true" /> : <Sun size={18} strokeWidth={2.25} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="desk" ref={deskRef} aria-label="Sketchbook">
          <h1 className="sr-only">PALS Art Gallery: Priyam Garg’s sketchbook</h1>
          <Sketchbook
            artworks={artworks}
            page={page}
            onPageChange={setPage}
            reducedMotion={reducedMotion}
            endSlot={<EndPage onRestart={() => setPage(0)} />}
          />

          <div className="caption" aria-live="polite">
            <p className="caption__where">
              {page === 0 && <><b>Cover</b><span>{n} drawings inside. Tap the book or swipe to open it.</span></>}
              {art && (
                <>
                  <b>{art.title}</b>
                  <span>
                    {art.series} · {MEDIUM_LABEL[art.medium]} · page {pad(page)} of {pad(n)}
                  </span>
                </>
              )}
              {page === n + 1 && <><b>Inside back cover</b><span>That’s every page.</span></>}
            </p>
            <div className="caption__controls">
              <button type="button" className="btn btn--icon" onClick={() => setPage(page - 1)} disabled={page === 0} aria-label="Previous page">
                <ArrowLeft size={18} strokeWidth={2.25} aria-hidden="true" />
              </button>
              <button type="button" className="btn btn--icon" onClick={() => setPage(page + 1)} disabled={page === n + 1} aria-label={page === 0 ? 'Open the sketchbook' : 'Next page'}>
                <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </button>
              {art ? (
                <button type="button" className="btn btn--pencil" onClick={() => setCloseUp(page)}>
                  <Maximize2 size={16} strokeWidth={2.25} aria-hidden="true" /> Look closer
                </button>
              ) : (
                <button type="button" className="btn btn--pencil" onClick={() => setPage(page === 0 ? 1 : 0)}>
                  {page === 0 ? <BookOpen size={16} strokeWidth={2.25} aria-hidden="true" /> : <RotateCcw size={16} strokeWidth={2.25} aria-hidden="true" />}
                  {page === 0 ? 'Open the book' : 'Start again'}
                </button>
              )}
            </div>
          </div>

          <Ruler artworks={artworks} page={page} onPick={setPage} />
        </section>

        <section className="pages" id="pages" aria-labelledby="pages-title">
          <div className="section-head">
            <h2 id="pages-title">The Gallery</h2>
            <p>All thirteen drawings, hung in the order they sit in the sketchbook. Pick one to turn straight to its page.</p>
          </div>
          <ol className="contact-sheet">
            {artworks.map((a) => (
              <li key={a.slug} style={{ '--ar': a.width / a.height }}>
                <button type="button" className="loose-sheet" onClick={() => openAt(a.page)} aria-label={`Turn to page ${a.page}: ${a.title}`}>
                  <GalleryImage art={a} />
                </button>
                <p className="wall-label">
                  <b>{a.title}</b>
                  <span>{a.series} · {MEDIUM_LABEL[a.medium]}</span>
                  <span className="pno">Page {pad(a.page)}</span>
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="about__inner">
            <h2 id="about-title">Drawn by a software engineer</h2>
            <p>
              I’m Priyam Garg, a software engineer in Seattle who builds AI agents. This is my sketchbook: {n} drawings,
              mostly Dragon Ball Z, with detours into Death Note, Code Geass, Tokyo Ghoul, Fullmetal Alchemist and Demon
              Slayer. Each one is my own work in pencil or colour, signed in the corner.
            </p>
            <p>The engineering side lives on my portfolio.</p>
            <ul className="about__links">
              <li>
                <a className="btn btn--pencil" href={ARTIST.portfolio}>
                  See my portfolio <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
                </a>
              </li>
              <li><a className="textlink" href={ARTIST.github}>GitHub</a></li>
              <li><a className="textlink" href={ARTIST.linkedin}>LinkedIn</a></li>
            </ul>
            <p className="about__name" aria-hidden="true">Priyam</p>
          </div>
        </section>
      </main>

      <footer className="foot">
        <p>© {new Date().getFullYear()} Priyam Garg. These are fan drawings; the characters belong to their creators.</p>
      </footer>

      <CloseView index={closeUp} artworks={artworks} onClose={() => setCloseUp(null)} onMove={(p) => { setCloseUp(p); setPage(p); }} />
    </>
  );
}

// Gallery thumbnails load only when they come near the screen. The browser's
// own lazy loading starts far too early here, pulling every frame at startup.
function GalleryImage({ art }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!('IntersectionObserver' in window)) return setShow(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <img
      ref={ref}
      src={show ? art.thumb : undefined}
      srcSet={show ? `${art.thumb} 640w, ${art.srcSet.split(', ')[1]}` : undefined}
      sizes="(max-width: 560px) calc(100vw - 32px), 440px"
      alt=""
      width={art.width}
      height={art.height}
      decoding="async"
    />
  );
}

function EndPage({ onRestart }) {
  return (
    <div className="end">
      <p className="end__big">That’s the last page, for now.</p>
      <div className="end__actions">
        {/* a sticky note stuck to the inside cover */}
        <button type="button" className="note" onClick={onRestart}>
          <svg className="note__arrow" viewBox="0 0 60 44" aria-hidden="true">
            <path d="M48 36 C 60 20, 44 4, 26 6 C 12 7, 6 16, 8 26" />
            <path d="M2 19 L8 27 L15 20" />
          </svg>
          <span className="note__text">Back to the cover</span>
          <span className="note__sub">start again from page one</span>
        </button>
        {/* an engineering drawing card, title block and all */}
        <a className="blueprint" href={ARTIST.portfolio}>
          <svg className="blueprint__gear" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="7" />
            <path d="M24 4v7M24 37v7M4 24h7M37 24h7M9.9 9.9l5 5M33.1 33.1l5 5M9.9 38.1l5-5M33.1 14.9l5-5" />
            <circle cx="24" cy="24" r="14" />
          </svg>
          <span className="blueprint__text">
            The engineering side <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span className="blueprint__block" aria-hidden="true">
            <span>Dwg: Portfolio</span>
            <span>Sheet 2 of 2</span>
          </span>
        </a>
      </div>
    </div>
  );
}
