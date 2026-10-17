import { useState } from 'react';
import { DownChevron, MessageCircleIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { faq } from '../../../data/faq.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './FaqCard.css';

// A few questions, as a plain accordion: one answer open at a time.
export default function FaqCard() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(0);
  const at = v => v[lang] ?? v.fr;

  return (
    <BentoCard className="cell-faq faq-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <MessageCircleIcon size={16} /> {t('hdr.faq')}
          </span>
        </div>
        <ul className="faq-list">
          {faq.map((item, i) => {
            const isOpen = i === open;
            return (
              <li key={i} className={isOpen ? 'is-open' : undefined}>
                <button
                  type="button"
                  className="faq-list__q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{at(item.q)}</span>
                  <DownChevron size={16} aria-hidden="true" />
                </button>
                <div className="faq-list__a" id={`faq-a-${i}`} role="region" inert={!isOpen}>
                  <p>{at(item.a)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </BentoCard>
  );
}
