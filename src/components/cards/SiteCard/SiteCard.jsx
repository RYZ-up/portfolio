import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import StatsCounter from '../../ui/StatsCounter/StatsCounter.jsx';
import { EyeIcon, GlobeIcon } from '../../icons/index.js';
import useVisitCount from '../../../hooks/useVisitCount.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { setChoice, useCodeChoice } from '../../../lib/encodings.js';
import './SiteCard.css';

// One card: the language keys on top, the visit counter under them (Netlify
// function + Blobs, see useVisitCount; VengeanceUI Stats Counter). The keys
// are a radio group adapted from Uiverse.io by m1her (white glow, sunk into
// the card): French, English, or a notation the whole page can be read in.
const OPTIONS = [
  { id: 'fr', label: 'FR', name: 'Français' },
  { id: 'en', label: 'EN', name: 'English' },
  { id: 'morse', label: '.-', name: 'Morse', code: true },
  { id: 'binary', label: '01', name: 'Binary', code: true }
];

export default function SiteCard() {
  const { lang, t, setLang } = useI18n();
  const visits = useVisitCount();
  const choice = useCodeChoice();
  const current = choice ?? lang;

  const pick = o => {
    if (o.code) return setChoice(o.id);
    setChoice(null);
    setLang(o.id);
  };

  return (
    <BentoCard className="cell-site site-card">
      <div className="bento-card-inner site-card__inner">
        <div className="site-card__lang" data-enc-skip>
          <p className="site-card__label">
            <GlobeIcon size={13} /> {t('lang.title')}
          </p>
          <div className="radio-input" role="radiogroup" aria-label={t('nav.switch')}>
            {OPTIONS.map(o => (
              <label key={o.id} className="radio-input__key" title={o.name}>
                <span className="radio-input__back" aria-hidden="true" />
                <input type="radio" name="site-lang" value={o.id} checked={current === o.id} onChange={() => pick(o)} aria-label={o.name} />
                <span className="radio-input__text">{o.label}</span>
                <span className="radio-input__line" aria-hidden="true" />
              </label>
            ))}
          </div>
        </div>

        <div className="site-card__visits">
          <p className="site-card__count">
            {visits == null ? (
              // Loading, or offline with no known total: a dash, never a made-up number.
              '–'
            ) : (
              <StatsCounter value={visits} duration={1.6} locale={lang === 'fr' ? 'fr-FR' : 'en-GB'} />
            )}
          </p>
          <p className="site-card__since">
            <EyeIcon size={13} /> {t('visits.since')}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
