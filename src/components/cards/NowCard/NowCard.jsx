import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { ClockIcon } from '../../icons/index.js';
import { now } from '../../../data/now.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './NowCard.css';

// What Rayane is working on right now, with the date of the last edit.
export default function NowCard() {
  const { t, lang } = useI18n();
  const date = new Date(`${now.date}T12:00:00`).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return (
    <BentoCard className="cell-faq now-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <ClockIcon size={16} /> {t('hdr.now')}
          </span>
          <time className="now-card__date" dateTime={now.date}>
            {date}
          </time>
        </div>
        <ol className="now-card__list">
          {now.items.map((item, i) => (
            <li key={i}>{item[lang] ?? item.fr}</li>
          ))}
        </ol>
      </div>
    </BentoCard>
  );
}
