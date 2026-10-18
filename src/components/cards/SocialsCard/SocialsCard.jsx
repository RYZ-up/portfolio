import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { socials } from '../../../data/socials.js';
import { contact } from '../../../data/profile.js';
import { GithubIcon, LinkedinIcon, MailFilledIcon, UsersIcon } from '../../icons/index.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './SocialsCard.css';

// All icons sourced from https://www.itshover.com/icons
const ICONS = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: MailFilledIcon
};

// GitHub and LinkedIn open in a new tab; the e-mail button opens the mail app.
function SocialButton({ label, href, Icon }) {
  const external = href.startsWith('http');
  return (
    <div className="socials-glass">
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="socials-glass__btn" aria-label={label}>
        <span className="socials-glass__icon">
          <Icon aria-hidden size="1em" />
        </span>
      </a>
      <div className="socials-glass__shadow" />
    </div>
  );
}

export default function SocialsCard() {
  const { t } = useI18n();
  return (
    <BentoCard className="cell-socials">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <UsersIcon aria-hidden size="1em" /> {t('hdr.socials')}
          </span>
        </div>
        <div className="socials-card__grid">
          {[...socials, { label: 'Email', href: `mailto:${contact.email}` }].map(({ label, href }) => (
            <SocialButton key={label} label={label} href={href} Icon={ICONS[label]} />
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
