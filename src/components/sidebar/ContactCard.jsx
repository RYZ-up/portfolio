import { TelephoneIcon } from '../icons/index.js';
import { contact } from '../../data/profile.js';
import { socials } from '../../data/socials.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './Sidebar.css';

const github = socials.find(s => s.label === 'GitHub');
const linkedin = socials.find(s => s.label === 'LinkedIn');

export default function ContactCard() {
  const { t } = useI18n();
  return (
    <section className="sidebar-section">
      <div className="card-header">
        <span className="card-header__label">
          <TelephoneIcon aria-hidden size="1em" /> {t('hdr.contact')}
        </span>
      </div>
      <p className="contact-card__text">
        {t('contact.before')}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        {t('contact.middle')}
        <a href={linkedin.href} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        {t('contact.after')}
        <a href={github.href} target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>
    </section>
  );
}
