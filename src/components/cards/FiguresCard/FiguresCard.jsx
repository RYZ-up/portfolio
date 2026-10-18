import { useEffect, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import Counter from '../../ui/Counter/Counter.jsx';
import { GaugeIcon } from '../../icons/index.js';
import { gallery, categoryOf } from '../../../data/projects.js';
import useInView from '../../../hooks/useInView.js';
import useIsMobile from '../../../hooks/useIsMobile.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './FiguresCard.css';

// Key figures, from the site's own data, as rolling odometers (React Bits
// Counter). The digits roll up from 0 the first time the card is on screen.
const count = test => gallery.filter(test).length;
const FIGURES = [
  { key: 'projects', value: gallery.length },
  { key: 'clients', value: count(g => g.private && categoryOf(g.id) === 'web') },
  { key: 'robots', value: count(g => categoryOf(g.id) === 'eng') },
  { key: 'software', value: count(g => categoryOf(g.id) === 'dev') },
  { key: 'tech', value: new Set(gallery.flatMap(g => g.tags ?? [])).size }
];

export default function FiguresCard() {
  const { t, lang } = useI18n();
  const [ref, inView] = useInView();
  const [shown, setShown] = useState(false);
  const [commits, setCommits] = useState(null);
  // A number, not a CSS length: the Counter sizes its rolling window from it.
  const phone = useIsMobile(700);
  const tablet = useIsMobile(1199);
  const size = phone ? 42 : tablet ? 48 : 64;

  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);

  // Contributions of the last year, from the same source as the GitHub card.
  useEffect(() => {
    let off = false;
    fetch('/api/github')
      .then(r => (r.ok ? r.json() : null))
      .then(d => !off && d?.total?.lastYear && setCommits(d.total.lastYear))
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);

  const items = commits ? [...FIGURES, { key: 'commits', value: commits }] : FIGURES;
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  return (
    <BentoCard className="cell-figures figures-card">
      <div ref={ref} className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <GaugeIcon size={16} /> {t('hdr.figures')}
          </span>
        </div>
        <dl className="figures-card__grid">
          {items.map(f => (
            <div key={f.key}>
              <dd>
                <Counter value={shown ? f.value : 0} locale={locale} fontSize={size} fontWeight={700} duration={phone ? 0.7 : 1.1} stagger={phone ? 0.03 : 0.06} fade={0.12} motionBlur={false} />
              </dd>
              <dt>{t(`fig.${f.key}`)}</dt>
            </div>
          ))}
        </dl>
      </div>
    </BentoCard>
  );
}
