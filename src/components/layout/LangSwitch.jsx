import { Fragment } from 'react';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import { setChoice, useCodeChoice } from '../../lib/encodings.js';

// FR / EN, plus two notations the whole site can be read in. Picking one is
// permanent (saved) until FR or EN is picked again.
const CODES = [
  { label: 'morse', short: '.-', name: 'Morse' },
  { label: 'binary', short: '01', name: 'Binary' }
];

export default function LangSwitch() {
  const { lang, t, setLang } = useI18n();
  const choice = useCodeChoice();

  const pickLang = l => {
    setChoice(null);
    setLang(l);
  };

  return (
    <div className="bento-nav__lang" role="group" aria-label={t('nav.switch')} data-enc-skip>
      <button type="button" className={!choice && lang === 'fr' ? 'is-current' : ''} aria-pressed={!choice && lang === 'fr'} onClick={() => pickLang('fr')}>
        FR
      </button>
      <span className="bento-nav__lang-sep">/</span>
      <button type="button" className={!choice && lang === 'en' ? 'is-current' : ''} aria-pressed={!choice && lang === 'en'} onClick={() => pickLang('en')}>
        EN
      </button>
      {CODES.map(c => (
        <Fragment key={c.label}>
          <span className="bento-nav__lang-sep">/</span>
          <button
            type="button"
            className={'bento-nav__code' + (choice === c.label ? ' is-current' : '')}
            aria-pressed={choice === c.label}
            aria-label={c.name}
            title={c.name}
            onClick={() => setChoice(c.label)}
          >
            {c.short}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
