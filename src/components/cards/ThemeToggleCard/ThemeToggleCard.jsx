import { useEffect, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { applyTheme, storeTheme } from '../../../lib/theme.js';
import './ThemeToggleCard.css';

export default function ThemeToggleCard() {
  const { t } = useI18n();
  const [isLight, setIsLight] = useState(false);
  const [powerAnim, setPowerAnim] = useState('');

  // Purely decorative now: the switch flips and its lights blink, but the
  // site no longer changes theme (the "light" theme was only a slightly
  // lighter grey). Visitors who had picked it earlier are put back on the
  // dark theme, and that choice is forgotten.
  useEffect(() => {
    applyTheme(false);
    storeTheme(false);
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    setPowerAnim(next ? 'is-turning-on' : 'is-turning-off');
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
