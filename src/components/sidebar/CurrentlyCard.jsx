import { ClockIcon, CpuIcon, FileDescriptionIcon, SendIcon } from '../icons/index.js';
import { now } from '../../data/now.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './Sidebar.css';

// Under the carousel: what Rayane is doing right now (src/data/now.js).
const ICONS = { build: CpuIcon, study: FileDescriptionIcon, seek: SendIcon };

export default function CurrentlyCard() {
  const { t, lang } = useI18n();
  const date = new Date(`${now.date}T12:00:00`).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  return (
    <section className="sidebar-section currently" aria-labelledby="currently-title">
      <p className="currently__head">
        <span id="currently-title" className="currently__label">
          <span className="currently__dot" aria-hidden="true" /> {t('hdr.currently')}
        </span>
        <time className="currently__date" dateTime={now.date}>
          <ClockIcon size={12} /> {date}
        </time>
      </p>
      <ul className="currently__list">
        {now.items.map(item => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.icon}>
              <span className="currently__icon">
                <Icon size={15} aria-hidden />
              </span>
              {item[lang] ?? item.fr}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
