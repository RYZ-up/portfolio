import { useEffect, useRef, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { applyTheme, readStoredTheme, storeTheme } from '../../../lib/theme.js';
import './ThemeToggleCard.css';

export default function ThemeToggleCard() {
  const { t } = useI18n();
  const [isLight, setIsLight] = useState(false);
  const [powerAnim, setPowerAnim] = useState('');

  const timer = useRef(null);

  useEffect(() => {
    const stored = readStoredTheme();
    setIsLight(stored);
    applyTheme(stored);
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    setPowerAnim(next ? 'is-turning-on' : 'is-turning-off');
    // Wait for the switch's own blink animation (1s) to finish before the
    // rest of the page's colors start fading to the new theme, so the two
    // read as one clear sequence instead of everything shifting at once.
    // (Kept out of the state updater: those must stay pure.)
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      applyTheme(next);
      storeTheme(next);
    }, 1000);
  };

  return (
    <BentoCard className="cell-theme toggle-card">
      <label className="power-switch" htmlFor="power-switch">
        <div className="power-switch__outer">
          <input
            id="power-switch"
            type="checkbox"
            checked={isLight}
            onChange={toggleTheme}
            aria-label={t('toggle.light')}
          />
          <span
            className={`power-switch__light power-switch__light--red${isLight ? ' is-lit' : ''}${
              powerAnim === 'is-turning-on' ? ' is-blinking' : ''
            }`}
            onAnimationEnd={() => setPowerAnim('')}
          />
          <div className="power-switch__button">
            <span className="power-switch__toggle" />
          </div>
          <span
            className={`power-switch__light power-switch__light--green${!isLight ? ' is-lit' : ''}${
              powerAnim === 'is-turning-off' ? ' is-blinking' : ''
            }`}
            onAnimationEnd={() => setPowerAnim('')}
          />
        </div>
      </label>
    </BentoCard>
  );
}
