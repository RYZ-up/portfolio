import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import { setChoice, useCodeChoice } from '../../lib/encodings.js';

// Besides FR / EN, the whole site can be read in a notation. Picking one is
// permanent (saved) until FR or EN is picked again.
const CODES = [
  { label: 'binary', short: 'BIN', hint: '0b' },
  { label: 'hex', short: 'HEX', hint: '0x' },
  { label: 'morse', short: 'MORSE', hint: '.-' },
  { label: 'octal', short: 'OCT', hint: '0o' },
  { label: 'ascii', short: 'ASCII', hint: '82 97' },
  { label: 'base64', short: 'B64', hint: 'b64:' }
];

export default function LangSwitch() {
  const { lang, t, setLang } = useI18n();
  const choice = useCodeChoice();
  const [open, setOpen] = useState(false);
  const root = useRef(null);

  useEffect(() => {
    if (!open) return;
    const away = e => !root.current?.contains(e.target) && setOpen(false);
    const esc = e => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const pickLang = l => {
    setChoice(null);
    setLang(l);
    setOpen(false);
  };
  const current = CODES.find(c => c.label === choice);

  return (
    <div ref={root} className="bento-nav__lang" role="group" aria-label={t('nav.switch')} data-enc-skip>
      <button type="button" className={!choice && lang === 'fr' ? 'is-current' : ''} onClick={() => pickLang('fr')}>
        FR
      </button>
      <span className="bento-nav__lang-sep">/</span>
      <button type="button" className={!choice && lang === 'en' ? 'is-current' : ''} onClick={() => pickLang('en')}>
        EN
      </button>
      <span className="bento-nav__lang-sep">/</span>
      <button
        type="button"
        className={'bento-nav__code' + (choice ? ' is-current' : '')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {current ? current.short : '01'}
      </button>
      {open && (
        <ul className="bento-nav__code-menu" role="listbox">
          {CODES.map(c => (
            <li key={c.label} role="option" aria-selected={c.label === choice}>
              <button
                type="button"
                className={c.label === choice ? 'is-current' : ''}
                onClick={() => {
                  setChoice(c.label);
                  setOpen(false);
                }}
              >
                <span>{c.short}</span>
                <span className="bento-nav__code-hint">{c.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
