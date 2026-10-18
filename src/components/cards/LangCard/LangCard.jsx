import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { GlobeIcon } from '../../icons/index.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { setChoice, useCodeChoice } from '../../../lib/encodings.js';
import './LangCard.css';

// Language of the site: French or English, plus two notations the whole page
// can be read in (Morse, binary). A notation stays until FR or EN is picked.
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
        <div className="lang-card__grid" role="group" aria-label={t('nav.switch')}>
          {OPTIONS.map(o => (
            <button
              key={o.id}
              type="button"
              className={current === o.id ? 'is-current' : undefined}
              aria-pressed={current === o.id}
              title={o.name}
              onClick={() => pick(o)}
            >
              <strong>{o.label}</strong>
              <span>{o.name}</span>
            </button>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
