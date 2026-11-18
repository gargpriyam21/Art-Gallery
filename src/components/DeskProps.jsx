// Drawing supplies scattered on the mat beside the book, just for fun.
// They're authored SVG, sit in the empty space either side of the pad,
// and nudge a little when you hover them.

function Pencil({ body, dark, light, tip, eraser = false, label }) {
  // drawn lying along x, 220 long
  const start = eraser ? 26 : 0;
  return (
    <svg viewBox="0 0 220 18" width="220" height="18" className="prop-svg">
      {eraser && (
        <>
          <rect x="0" y="1.5" width="15" height="15" rx="2.5" fill="#ea9aa0" />
          <rect x="13" y="1" width="13" height="16" fill="#c3c8cf" />
          <path d="M16 1v16M19.5 1v16M23 1v16" stroke="#8d939b" strokeWidth="1" />
        </>
      )}
      {!eraser && <rect x="0" y="1" width="6" height="16" rx="1.5" fill={dark} />}
      <rect x={start} y="1" width={178 - start} height="5.4" fill={light} />
      <rect x={start} y="6.3" width={178 - start} height="5.4" fill={body} />
      <rect x={start} y="11.6" width={178 - start} height="5.4" fill={dark} />
      {label && (
        <text x={start + 18} y="11.4" fontSize="7" fontFamily="Big Shoulders Display, sans-serif" fontWeight="800" letterSpacing="1" fill={dark}>
          {label}
        </text>
      )}
      <path d="M178 1 L206 7 L206 11 L178 17 Z" fill="#e8c99a" />
      <path d="M178 1 L184 2.3 L184 15.7 L178 17 Z" fill="#d9b47c" />
      <path d="M200 5.7 L220 9 L200 12.3 Z" fill={tip} />
    </svg>
  );
}

function Marker({ cap, label }) {
  return (
    <svg viewBox="0 0 180 26" width="180" height="26" className="prop-svg">
      <rect x="0" y="2" width="128" height="22" rx="7" fill="#f3f4f6" />
      <rect x="0" y="2" width="128" height="7" rx="4" fill="#ffffff" />
      <rect x="0" y="17" width="128" height="7" rx="4" fill="#d6d9de" />
      <rect x="16" y="2" width="22" height="22" fill={cap} />
      <text x="48" y="17.5" fontSize="10" fontFamily="Big Shoulders Display, sans-serif" fontWeight="800" letterSpacing="1.2" fill="#2b2d31">
        {label}
      </text>
      <rect x="124" y="0" width="50" height="26" rx="8" fill={cap} />
      <rect x="124" y="0" width="50" height="8" rx="5" fill="rgba(255,255,255,0.28)" />
      <rect x="132" y="-3" width="30" height="5" rx="2" fill={cap} />
    </svg>
  );
}

function Eraser() {
  return (
    <svg viewBox="0 0 64 30" width="64" height="30" className="prop-svg">
      <rect x="0" y="1" width="62" height="28" rx="4" fill="#f2b8bc" />
      <rect x="20" y="0" width="44" height="30" rx="2" fill="#2f5fb3" />
      <rect x="20" y="10" width="44" height="10" fill="#ffffff" />
      <text x="42" y="18" textAnchor="middle" fontSize="7.5" fontFamily="Big Shoulders Display, sans-serif" fontWeight="800" fill="#2f5fb3">
        PALS
      </text>
    </svg>
  );
}

const COLOURS = {
  red: { body: '#d8443c', dark: '#a92e28', light: '#ec6c63', tip: '#c9362f' },
  blue: { body: '#2e6fd0', dark: '#1f4f9c', light: '#5390e6', tip: '#2763bd' },
  green: { body: '#2f9a5a', dark: '#1f7343', light: '#4fbb78', tip: '#2a8a50' },
  purple: { body: '#7b4fc4', dark: '#5a3696', light: '#9a72dc', tip: '#6c43b2' },
};

export default function DeskProps({ side, scale }) {
  // `side` is the width of the empty mat beside the book; `scale` sizes the props to the book.
  const s = Math.max(0.7, Math.min(1.25, scale));
  return (
    <div className="desk-props" aria-hidden="true" style={{ '--side': `${side}px`, '--s': s }}>
      <div className="props-zone props-zone--left">
        <span className="prop" style={{ '--x': '18%', '--y': '14%', '--r': '-64deg' }}>
          <Pencil body="#f6c33b" dark="#c79515" light="#ffd965" tip="#2b2d31" eraser label="PALS · HB" />
        </span>
        <span className="prop" style={{ '--x': '40%', '--y': '46%', '--r': '-81deg' }}>
          <Pencil {...COLOURS.red} />
        </span>
        <span className="prop" style={{ '--x': '30%', '--y': '72%', '--r': '-24deg' }}>
          <Pencil {...COLOURS.blue} />
        </span>
      </div>
      <div className="props-zone props-zone--right">
        <span className="prop" style={{ '--x': '22%', '--y': '20%', '--r': '72deg' }}>
          <Marker cap="#1f1f22" label="FINE LINER" />
        </span>
        <span className="prop" style={{ '--x': '50%', '--y': '55%', '--r': '101deg' }}>
          <Pencil {...COLOURS.green} />
        </span>
        <span className="prop" style={{ '--x': '18%', '--y': '64%', '--r': '84deg' }}>
          <Pencil {...COLOURS.purple} />
        </span>
        <span className="prop prop--small" style={{ '--x': '58%', '--y': '8%', '--r': '-14deg' }}>
          <Eraser />
        </span>
      </div>
    </div>
  );
}
