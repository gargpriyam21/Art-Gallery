// The cutting mat's edge ruler doubles as the page index:
// one numbered mark per page, with the pencil marker on the open one.
export default function Ruler({ artworks, page, onPick }) {
  const stops = [{ page: 0, label: 'C', name: 'Cover' }, ...artworks.map((a) => ({ page: a.page, label: String(a.page), name: a.title }))];
  return (
    <nav className="ruler" aria-label="Pages">
      <ol>
        {stops.map((s) => (
          <li key={s.page}>
            <button
              type="button"
              onClick={() => onPick(s.page)}
              aria-current={s.page === page ? 'page' : undefined}
              aria-label={s.page === 0 ? 'Cover' : `Page ${s.page}: ${s.name}`}
              title={s.name}
            >
              <span className="tick" aria-hidden="true" />
              <span className="num">{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
