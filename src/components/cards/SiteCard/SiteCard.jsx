import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import StatsCounter from '../../ui/StatsCounter/StatsCounter.jsx';
import { useEffect, useState } from 'react';
import { ClockIcon, EyeIcon, GaugeIcon, GithubIcon, GlobeIcon, LinkedinIcon, UserIcon, UsersIcon } from '../../icons/index.js';
import { socials } from '../../../data/socials.js';
import useVisitCount from '../../../hooks/useVisitCount.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { setChoice, useCodeChoice } from '../../../lib/encodings.js';
import './SiteCard.css';

// One card: the language keys, the social links as the same keys, then the
// visit counter (Netlify function + Blobs, see useVisitCount; VengeanceUI
// Stats Counter). The keys are adapted from Uiverse.io by m1her (white glow,
// sunk into the card): French, English, or a notation the whole page can be
// read in; GitHub and LinkedIn open in a new tab.
const SOCIAL_ICONS = { GitHub: GithubIcon, LinkedIn: LinkedinIcon };

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

  // Real page-load time of this visit (Navigation Timing), once it is known.
  const [loadMs, setLoadMs] = useState(null);
  useEffect(() => {
    const read = () => {
      const nav = performance.getEntriesByType?.('navigation')[0];
      if (nav?.loadEventEnd > 0) setLoadMs(nav.loadEventEnd);
    };
    if (document.readyState === 'complete') read();
    else window.addEventListener('load', () => setTimeout(read, 0), { once: true });
  }, []);
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  const built = new Date(__BUILD_DATE__).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });

  const pick = o => {
    if (o.code) return setChoice(o.id);
    setChoice(null);
    setLang(o.id);
  };

  return (
    <BentoCard className="cell-site site-card">
      <div className="bento-card-inner site-card__inner">
        <div className="site-card__lang" data-enc-skip>
          <div className="site-card__label">
            <GlobeIcon size={13} /> {t('lang.title')}
          </div>
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

        <div className="site-card__lang">
          <div className="site-card__label">
            <UsersIcon size={13} /> {t('hdr.socials')}
          </div>
          <div className="radio-input radio-input--links">
            {socials.map(({ label, href }) => {
              const Icon = SOCIAL_ICONS[label];
              return (
                <a key={label} className="radio-input__key" href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                  <span className="radio-input__text">
                    <Icon size={16} aria-hidden />
                  </span>
                  <span className="radio-input__line" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="site-card__visits">
          <div>
            <p className="site-card__count">
              {visits == null ? (
                // Loading, or offline with no known total: a dash, never a made-up number.
                '–'
              ) : (
                <StatsCounter value={visits} duration={1.6} locale={locale} />
              )}
            </p>
            <p className="site-card__since">
              <EyeIcon size={13} /> {t('visits.since')}
            </p>
          </div>
          {/* Facts about this very visit and build, all measured, none made up. */}
          <ul className="site-card__facts">
            {visits != null && (
              <li>
                <UserIcon size={12} /> {t('visits.you').replace('{n}', visits.toLocaleString(locale))}
              </li>
            )}
            {loadMs != null && (
              <li>
                <GaugeIcon size={12} /> {t('visits.load').replace('{s}', (loadMs / 1000).toLocaleString(locale, { maximumFractionDigits: 1 }))}
              </li>
            )}
            <li>
              <ClockIcon size={12} /> {t('visits.build').replace('{d}', built)}
            </li>
          </ul>
        </div>
      </div>
    </BentoCard>
  );
}
