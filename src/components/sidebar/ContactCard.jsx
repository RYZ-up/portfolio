import { GithubIcon, LinkedinIcon, MailFilledIcon, TelephoneIcon } from '../icons/index.js';
import { contact } from '../../data/profile.js';
import { socials } from '../../data/socials.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './Sidebar.css';

const github = socials.find(s => s.label === 'GitHub');
const linkedin = socials.find(s => s.label === 'LinkedIn');

// Efferd contact-1: a strip of cells joined by hairlines, each an icon tile,
// a title and the value.
export default function ContactCard() {
  const { t } = useI18n();
  const items = [
    { Icon: MailFilledIcon, title: t('contact.email'), value: contact.email, href: `mailto:${contact.email}` },
    { Icon: LinkedinIcon, title: 'LinkedIn', value: 'in/rayane-yazid', href: linkedin.href, external: true },
    { Icon: GithubIcon, title: 'GitHub', value: '@RYZ-up', href: github.href, external: true }
  ];
  return (
    <section className="sidebar-section">
      <div className="card-header">
        <span className="card-header__label">
          <TelephoneIcon aria-hidden size="1em" /> {t('hdr.contact')}
        </span>
      </div>
      <ul className="contact-strip">
        {items.map(({ Icon, title, value, href, external }) => (
          <li key={title}>
            <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <span className="contact-strip__icon" aria-hidden="true">
                <Icon size={16} />
              </span>
              <span className="contact-strip__text">
                <strong>{title}</strong>
                <span>{value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
