// Re-writes every piece of text on the page in binary / hex / morse / ...
//
// Nothing in React's tree is touched: for each text block (the nearest
// non-inline element around a run of text) an absolutely positioned overlay
// is appended on top of it, and the real text is made transparent. The real
// text therefore keeps the layout, the links and the screen-reader content,
// and the code can never push anything around. The overlay's font is sized so
// the whole code fits the block (cut with "…" below a legible minimum).
import { FORMATS, getChoice, getFormatIndex, subscribeFormat } from './encodings.js';

const MONO = "'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace";
const MIN_PX = 5.5;
const LINE_HEIGHT = 1.25;
const SWEEP_MS = 700;
const SAFETY = 1.03; // slack on the monospace advance so a line never wraps early
const SKIP = 'script, style, noscript, textarea, input, select, option, svg, canvas, .enc__over, [data-enc-skip]';
const ALPHABETS = {
  binary: '01',
  hex: '0123456789ABCDEF',
  octal: '01234567',
  morse: '.-',
  ascii: '0123456789',
  base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
};
const TEXT_NOISE = '01<>/{}#$%&*=+';

let advance = 0.6; // width of one monospace glyph, in em
function measureAdvance() {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return;
  ctx.font = `100px ${MONO}`;
  const w = ctx.measureText('0').width / 100;
  if (w > 0.3 && w < 1) advance = w;
}

const isInline = display => display === 'inline' || display === 'contents' || display.startsWith('ruby');
const isEncOverlay = n => n.nodeType === 1 && n.classList.contains('enc__over');

export function startTextEncoding(root = document.body) {
  measureAdvance();
  const active = new Map(); // host -> entry
  let raf = 0;
  let mutationTimer = 0;
  let resizeTimer = 0;
  let paused = false; // ignore our own DOM writes while we make them

  const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- scanning ----------------------------------------------------------
  function scanHosts() {
    // Automatic passes are for the home page; a chosen notation covers every page.
    if (document.body.dataset.encView === 'projects' && !getChoice()) return [];
    const styles = new Map();
    const cs = el => {
      let s = styles.get(el);
      if (!s) styles.set(el, (s = getComputedStyle(el)));
      return s;
    };
    const hostOf = el => {
      while (el && el !== root.parentElement) {
        if (!isInline(cs(el).display)) return el;
        el = el.parentElement;
      }
      return null;
    };
    const texts = new Map(); // host -> text nodes
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentElement;
        return !p || p.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const host = hostOf(n.parentElement);
      if (!host || cs(host).display === 'none' || cs(host).visibility === 'hidden' || !host.getClientRects().length) continue;
      (texts.get(host) || texts.set(host, []).get(host)).push(n);
    }
    // A block that has text of its own *and* other text blocks inside it
    // cannot be overlaid without covering them: leave that text as it is.
    const hosts = [...texts.keys()];
    const result = [];
    for (const host of hosts) {
      if (hosts.some(o => o !== host && host.contains(o))) continue;
      const style = cs(host);
      let real = texts.get(host).map(n => n.nodeValue).join('').replace(/\s+/g, ' ').trim();
      const raw = real;
      if (style.textTransform === 'uppercase') real = real.toUpperCase();
      else if (style.textTransform === 'lowercase') real = real.toLowerCase();
      result.push({ host, style, raw, real, nodes: texts.get(host) });
    }
    return result;
  }

  // ---- fitting -----------------------------------------------------------
  // Largest font size at which `text` fills the block without overflowing;
  // below MIN_PX the text is cut instead. Monospace + break-all makes the
  // capacity exact: chars-per-line * lines.
  function layout(text, width, height, base, single) {
    const capacity = px => {
      const perLine = Math.max(1, Math.floor(width / (px * advance * SAFETY)));
      const lines = single ? 1 : Math.max(1, Math.floor(height / (px * LINE_HEIGHT) + 0.02));
      return perLine * lines;
    };
    for (let px = Math.max(MIN_PX, base * 0.85); px >= MIN_PX; px -= 0.25) {
      if (capacity(px) >= text.length) return { px, text };
    }
    const keep = Math.max(1, capacity(MIN_PX) - 1);
    return { px: MIN_PX, text: text.slice(0, keep).trimEnd() + '…' };
  }

  // ---- overlays ----------------------------------------------------------
  // The box the text itself occupies inside the host (icons, badges and
  // padding excluded), in the host's own un-transformed pixels.
  function textBox(host, nodes) {
    const range = document.createRange();
    let l = Infinity;
    let t = Infinity;
    let r = -Infinity;
    let b = -Infinity;
    for (const n of nodes) {
      range.selectNodeContents(n);
      for (const q of range.getClientRects()) {
        if (!q.width || !q.height) continue;
        l = Math.min(l, q.left);
        t = Math.min(t, q.top);
        r = Math.max(r, q.right);
        b = Math.max(b, q.bottom);
      }
    }
    if (l === Infinity) return null;
    const h = host.getBoundingClientRect();
    const sx = host.offsetWidth ? h.width / host.offsetWidth : 1 || 1;
    const sy = host.offsetHeight ? h.height / host.offsetHeight : 1 || 1;
    return {
      left: (l - h.left) / sx - host.clientLeft,
      top: (t - h.top) / sy - host.clientTop,
      width: (r - l) / sx,
      height: (b - t) / sy
    };
  }

  function ensureOverlay(host, style, box) {
    let over = host.querySelector(':scope > .enc__over');
    if (!over) {
      over = document.createElement('span');
      over.className = 'enc__over';
      over.setAttribute('aria-hidden', 'true');
      over.append(document.createElement('span'));
      host.append(over);
    }
    if (style.position === 'static') host.setAttribute('data-enc-rel', '');
    host.setAttribute('data-enc-on', '');
    over.style.left = box.left + 'px';
    over.style.top = box.top + 'px';
    over.style.width = box.width + 'px';
    over.style.height = box.height + 'px';
    // Gradient / transparent text: give the code a visible colour.
    over.style.color = style.color === 'rgba(0, 0, 0, 0)' ? 'var(--text)' : '';
    return over;
  }

  function release(host) {
    host.querySelector(':scope > .enc__over')?.remove();
    host.removeAttribute('data-enc-on');
    host.removeAttribute('data-enc-rel');
  }

  function clearAll() {
    active.forEach((_, host) => release(host));
    active.clear();
  }

  // Build (or refresh) the overlay of every text block for one notation.
  function prepare(format) {
    const seen = new Set();
    const entries = [];
    // Two passes so the browser lays the page out once, not once per block:
    // first read every measurement (no writes), then write every overlay.
    const plans = [];
    for (const { host, style, raw, real, nodes } of scanHosts()) {
      const box = textBox(host, nodes);
      if (!box) continue;
      const base = parseFloat(style.fontSize) || 16;
      const single = /^(nowrap|pre)$/.test(style.whiteSpace);
      const fitted = layout(format.encode(real), Math.max(1, box.width), Math.max(1, box.height), base, single);
      plans.push({ host, style, raw, box, single, fitted, position: style.position, color: style.color });
    }
    for (const { host, raw, box, single, fitted, position, color } of plans) {
      const over = ensureOverlay(host, { position, color }, box);
      over.dataset.mode = 'code';
      over.toggleAttribute('data-single', single);
      over.style.fontSize = fitted.px + 'px';
      const entry = { host, over, inner: over.firstChild, raw, target: fitted.text, alphabet: ALPHABETS[format.label] };
      active.set(host, entry);
      seen.add(host);
      entries.push(entry);
    }
    active.forEach((_, host) => {
      if (!seen.has(host)) {
        release(host);
        active.delete(host);
      }
    });
    return entries;
  }

  // ---- animation ---------------------------------------------------------
  function sweep(entries, animate, done) {
    cancelAnimationFrame(raf);
    // Phones: rewriting every text block on each frame janks the page, so switch instantly.
    if (!animate || reduced() || window.matchMedia('(hover: none)').matches) {
      entries.forEach(e => (e.inner.textContent = e.target));
      done?.();
      return;
    }
    const runs = entries.map(e => {
      const kept = document.createTextNode('');
      const noise = document.createElement('span');
      noise.className = 'enc__noise';
      e.inner.textContent = '';
      e.inner.append(kept, noise);
      return { e, kept, noise };
    });
    const start = performance.now();
    let last = 0;
    const tick = now => {
      const p = Math.min(1, (now - start) / SWEEP_MS);
      // ~30 fps is enough for scrambling noise and halves the text rewrites.
      if (p < 1 && now - last < 30) {
        raf = requestAnimationFrame(tick);
        return;
      }
      last = now;
      for (const { e, kept, noise } of runs) {
        const t = e.target;
        const n = Math.floor(p * t.length);
        let junk = '';
        for (let i = n; i < t.length; i++) {
          junk += t[i] === ' ' ? ' ' : e.alphabet[(Math.random() * e.alphabet.length) | 0];
        }
        kept.data = t.slice(0, n);
        noise.textContent = junk;
      }
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        runs.forEach(({ e }) => (e.inner.textContent = e.target));
        done?.();
      }
    };
    raf = requestAnimationFrame(tick);
  }

  // ---- phases ------------------------------------------------------------
  function apply(idx, animate) {
    paused = true;
    const format = FORMATS[idx];
    if (format.encode) {
      sweep(prepare(format), animate);
    } else {
      // Back to the real text: decode into it, then drop every overlay.
      const entries = [...active.values()];
      entries.forEach(e => {
        e.over.dataset.mode = 'text';
        e.over.style.fontSize = '';
        e.target = e.raw;
        e.alphabet = TEXT_NOISE;
      });
      sweep(entries, animate, clearAll);
    }
    // Let the mutation records of our own writes flush before listening again.
    queueMicrotask(() => setTimeout(() => (paused = false), 0));
  }

  const unsubscribe = subscribeFormat(() => apply(getFormatIndex(), true));
  if (getFormatIndex() !== 0) apply(getFormatIndex(), true); // start-up / saved choice

  // Text that changes while a notation is on screen (counters, chat, page
  // switch, language switch) is re-encoded a moment after it settles.
  const observer = new MutationObserver(records => {
    if (paused || !FORMATS[getFormatIndex()].encode) return;
    const foreign = records.some(r => {
      if (r.type === 'characterData') return !r.target.parentElement?.closest('.enc__over');
      if (r.target.nodeType === 1 && r.target.closest('.enc__over')) return false;
      return [...r.addedNodes, ...r.removedNodes].some(n => !isEncOverlay(n));
    });
    if (!foreign) return;
    clearTimeout(mutationTimer);
    mutationTimer = setTimeout(() => apply(getFormatIndex(), false), 250);
  });
  observer.observe(root, { subtree: true, childList: true, characterData: true });

  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (FORMATS[getFormatIndex()].encode) apply(getFormatIndex(), false);
    }, 200);
  };
  window.addEventListener('resize', onResize);

  return () => {
    unsubscribe();
    observer.disconnect();
    window.removeEventListener('resize', onResize);
    cancelAnimationFrame(raf);
    clearTimeout(mutationTimer);
    clearTimeout(resizeTimer);
    clearAll();
  };
}
