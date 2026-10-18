import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { GlobeIcon } from '../../icons/index.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { setChoice, useCodeChoice } from '../../../lib/encodings.js';
import './LangCard.css';

// Language of the site as push keys (radio group adapted from Uiverse.io by
// m1her, glow in white): French or English, plus two notations the whole
// page can be read in (Morse, binary). A notation stays until FR or EN.
const OPTIONS = [
  { id: 'fr', label: 'FR', name: 'Français' },
  { id: 'en', label: 'EN', name: 'English' },
  { id: 'morse', label: '.-', name: 'Morse', code: true },
  { id: 'binary', label: '01', name: 'Binary', code: true }
];

export default function LangCard() {
  const { lang, t, setLang } = useI18n();
  const choice = useCodeChoice();
  const current = choice ?? lang;

  const pick = o => {
    if (o.code) return setChoice(o.id);
    setChoice(null);
    setLang(o.id);
  };

  return (
    <BentoCard className="cell-lang lang-card">
      <div className="bento-card-inner" data-enc-skip>
        <div className="card-header">
          <span className="card-header__label">
            <GlobeIcon size={16} /> {t('lang.title')}
          </span>
        </div>
        <div className="radio-input" role="radiogroup" aria-label={t('nav.switch')}>
          {OPTIONS.map(o => (
            <label key={o.id} className="radio-input__key" title={o.name}>
              <span className="radio-input__back" aria-hidden="true" />
              <input type="radio" name="site-lang" value={o.id} checked={current === o.id} onChange={() => pick(o)} aria-label={o.name} />
              <span className="radio-input__text">{o.label}</span>
              <span className="radio-input__name">{o.name}</span>
              <span className="radio-input__line" aria-hidden="true" />
            </label>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
