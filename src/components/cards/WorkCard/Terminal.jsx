import { useEffect, useState } from 'react';
import useInView from '../../../hooks/useInView.js';
import './Terminal.css';

// A terminal that types the commands this very site is built and run with,
// with their (shortened) real output, in a loop. It only runs while on
// screen; with reduced motion it shows the whole session at once.
const SESSION = [
  { cmd: 'npm run build', out: ['vite v6 building for production…', '✓ 1 214 modules transformed.', '✓ built in 7.1s'] },
  { cmd: 'git log --oneline -3', out: ['d03e828 Project slider: no jump on drag', 'ec01881 Header links grouped again', '28d5350 Language card as push keys'] },
  { cmd: 'curl -s ryazid.fr/api/status | jq ".services[].label"', out: ['"AI"', '"Weather"', '"Time"', '"GitHub"'] },
  { cmd: 'git push', out: ['To github.com:RYZ-up/portfolio.git', '   ec01881..d03e828  main -> main', 'Netlify: deploy started ▸'] }
];

const TYPE_MS = 38;
const LINE_MS = 220;
const PAUSE_MS = 1800;

export default function Terminal() {
  const [ref, inView] = useInView();
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  // Position in the session: command index, characters typed, output lines shown.
  const [pos, setPos] = useState({ c: 0, chars: 0, lines: 0 });

  useEffect(() => {
    if (reduce || !inView) return undefined;
    const step = SESSION[pos.c];
    let next;
    let delay;
    if (pos.chars < step.cmd.length) {
      next = { ...pos, chars: pos.chars + 1 };
      delay = TYPE_MS + Math.random() * 40;
    } else if (pos.lines < step.out.length) {
      next = { ...pos, lines: pos.lines + 1 };
      delay = pos.lines === 0 ? 350 : LINE_MS;
    } else {
      next = { c: (pos.c + 1) % SESSION.length, chars: 0, lines: 0 };
      delay = PAUSE_MS;
    }
    const id = setTimeout(() => setPos(next), delay);
    return () => clearTimeout(id);
  }, [pos, inView, reduce]);

  // The finished commands stay on screen above the one being typed (only the
  // last two, so the card never overflows).
  const done = reduce ? SESSION : SESSION.slice(Math.max(0, pos.c - 1), pos.c);
  const live = reduce ? null : SESSION[pos.c];

  return (
    <div className="terminal-pane" ref={ref}>
      <div className="terminal-card__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>rayane@portfolio: ~</span>
      </div>
      <pre className="terminal-card__screen" aria-label="Terminal">
        {done.map(s => (
          <span key={s.cmd} className="terminal-card__block">
            <span className="terminal-card__cmd">{s.cmd}</span>
            {s.out.map(l => (
              <span key={l} className="terminal-card__out">{l}</span>
            ))}
          </span>
        ))}
        {live && (
          <span className="terminal-card__block">
            <span className="terminal-card__cmd">
              {live.cmd.slice(0, pos.chars)}
              {pos.lines === 0 && <b className="terminal-card__caret" aria-hidden="true" />}
            </span>
            {live.out.slice(0, pos.lines).map(l => (
              <span key={l} className="terminal-card__out">{l}</span>
            ))}
          </span>
        )}
      </pre>
  </div>
);
}
