import { UnorderedListIcon } from '../icons/index.js';
import { funFacts } from '../../data/profile.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './Sidebar.css';

export default function FunFactsCard() {
  const { t } = useI18n();
  return (
    <section className="sidebar-section">
      <div className="card-header">
        <span className="card-header__label">
          <UnorderedListIcon aria-hidden size="1em" /> {t('hdr.funFacts')}
        </span>
      </div>
      <ul className="fun-facts__list">
        {funFacts.map(key => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
    </section>
  );
}
