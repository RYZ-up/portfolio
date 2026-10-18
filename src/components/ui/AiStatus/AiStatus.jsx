import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './AiStatus.css';

// AI status pill (hand-made after RareUI "AI Status", whose source page is
// not reachable): while the assistant works, a spinning ring and a step label
// with a moving shine (thinking, searching, writing); once answered, a small
// check with the time it took.
const STEPS = ['ai.think', 'ai.search', 'ai.write'];
const STEP_MS = 1400;

export default function AiStatus({ done = false, ms = 0 }) {
  const { t, lang } = useI18n();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (done) return undefined;
    const id = setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), STEP_MS);
    return () => clearInterval(id);
  }, [done]);

  if (done) {
    const s = (ms / 1000).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 1 });
    return (
      <span className="ai-status ai-status--done">
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t('ai.done').replace('{s}', s)}
      </span>
    );
  }

  return (
    <span className="ai-status" role="status">
      <span className="ai-status__orb" aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={step}
          className="ai-status__text"
          initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
          transition={{ duration: 0.25 }}
        >
          {t(STEPS[step])}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
