import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { UserIcon } from '../icons/index.js';
import { aboutMe } from '../../data/profile.js';
import CursorCard from '../ui/CursorCard/CursorCard.jsx';
import portrait from '../../assets/images/portrait-tesla.webp';
import saclayLogo from '../../assets/logos/schools/paris-saclay-dark.svg';
import upecLogo from '../../assets/logos/schools/upec-dark.svg';
import { PATHS } from '../../lib/routes.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './AboutMe.css';

// Keywords of the paragraph (`[[key|text]]` in about.para) that open a
// preview card (VengeanceUI Cursor Card): a project cover, or the school logo.
const go = to => () => window.dispatchEvent(new CustomEvent('app:navigate', { detail: to }));
const CARDS = {
  master: { image: saclayLogo, fit: 'contain', desc: 'about.card.master' },
  licence: { image: upecLogo, fit: 'contain', desc: 'about.card.licence' },
  embedded: { image: '/images/projects/gallery/p2/cover.webp', desc: 'about.card.embedded', to: 'eng' },
  software: { image: '/images/projects/gallery/p13/cover.webp', desc: 'about.card.software', to: 'dev' },
  web: { image: '/images/projects/gallery/p16/cover.webp', desc: 'about.card.web', to: 'web' }
};

const EASE = [0.22, 1, 0.36, 1];

// The paragraph as a list of words (plain text) and keywords (links), so it
// can appear word by word.
function pieces(text) {
  return text.split(/(\[\[\w+\|[^\]]+\]\])/).flatMap(chunk => {
    const m = chunk.match(/^\[\[(\w+)\|([^\]]+)\]\]$/);
    if (m) return [{ key: m[1], text: m[2] }];
    return chunk.split(/(\s+)/).filter(Boolean).map(w => ({ text: w }));
  });
}

// The introduction, staged: the greeting slides in, the name rises letter by
// letter in a large display face, the role follows, then the paragraph
// appears word by word. A soft halo behind the portrait follows the pointer
// across the card. With reduced motion everything is simply there.
export default function AboutMeCard() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const cardRef = useRef(null);

  // Halo position, written straight to CSS variables (no re-render per move).
  const onMove = e => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--hx', `${e.clientX - r.left}px`);
    el.style.setProperty('--hy', `${e.clientY - r.top}px`);
  };

  const rise = (delay, extra = {}) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: '0.6em', filter: 'blur(6px)', ...extra.from },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 0.7, ease: EASE, delay }
        };

  const words = pieces(t('about.para'));
  const PARA_START = 0.9;

  return (
    <section
      ref={cardRef}
      className="sidebar-section about-card about"
      aria-labelledby="about-title"
      onPointerMove={onMove}
    >
      <span className="about__halo" aria-hidden="true" />
      <div className="card-header">
        <span className="card-header__label">
          <UserIcon aria-hidden size="1em" /> {t('hdr.about')}
        </span>
        <span className="card-header__version">v4.50</span>
      </div>

      <div className="about__hero">
        <motion.div className="about__portrait" {...(reduce ? {} : { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, ease: EASE } })}>
          <span className="about__ring" aria-hidden="true" />
          <img src={portrait} alt={t('about.portrait')} title={t('about.portrait')} width="480" height="480" draggable={false} />
        </motion.div>

        <div className="about__titles">
          <motion.p className="about__hello" {...rise(0.15)}>
            {t('about.greeting')}
          </motion.p>
          <h1 id="about-title" className="about__name" aria-label={aboutMe.name}>
            {aboutMe.name.split('').map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: '0.9em', rotateX: -70 },
                      animate: { opacity: 1, y: 0, rotateX: 0 },
                      transition: { duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }
                    })}
              >
                {ch}
              </motion.span>
            ))}
          </h1>
          <motion.p className="about__role" {...rise(0.7)}>
            {t('about.role')}
          </motion.p>
        </div>
      </div>

      <p className="about__bio">
        {words.map((w, i) => {
          const delay = PARA_START + i * 0.025;
          const anim = reduce
            ? {}
            : { initial: { opacity: 0, filter: 'blur(4px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, transition: { duration: 0.45, delay } };
          if (!w.key) {
            return /^\s+$/.test(w.text) ? w.text : (
              <motion.span key={i} className="about__word" {...anim}>
                {w.text}
              </motion.span>
            );
          }
          const card = CARDS[w.key];
          return (
            <motion.span key={i} className="about__word" {...anim}>
              <CursorCard
                image={card.image}
                fit={card.fit}
                description={t(card.desc)}
                href={card.to && PATHS[card.to]}
                onNavigate={card.to && go(card.to)}
              >
                {w.text}
              </CursorCard>
            </motion.span>
          );
        })}
      </p>
    </section>
  );
}
