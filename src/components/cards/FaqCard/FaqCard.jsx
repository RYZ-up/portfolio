import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MessageCircleIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import Logo from '../../layout/Logo.jsx';
import { faq } from '../../../data/faq.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './FaqCard.css';

// A few questions Rayane answers himself: pick a question, the answer
// appears in a chat bubble.
export default function FaqCard() {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const at = v => v[lang] ?? v.fr;

  return (
    <BentoCard className="cell-faq faq-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <MessageCircleIcon size={16} /> {t('hdr.faq')}
          </span>
        </div>
        <div className="faq-card__questions" role="tablist" aria-label={t('hdr.faq')}>
          {faq.map((item, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="faq-answer"
              className={i === active ? 'is-active' : undefined}
              onClick={() => setActive(i)}
            >
              {at(item.q)}
            </button>
          ))}
        </div>
        <div className="faq-card__answer" id="faq-answer" role="tabpanel" aria-live="polite">
          <span className="faq-card__avatar" aria-hidden="true">
            <Logo />
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`${lang}-${active}`}
              className="faq-card__bubble"
              initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {at(faq[active].a)}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </BentoCard>
  );
}
