import BorderGlow from '../BorderGlow/BorderGlow.jsx';
import { borderGlowDefaults } from '../BorderGlow/borderGlowDefaults.js';
import './BentoCard.css';

export const BentoCard = ({ children, className = '', ...rest }) => (
  <BorderGlow {...borderGlowDefaults} className={`bento-grid-card ${className}`} {...rest}>
    {children}
  </BorderGlow>
);

export default BentoCard;
