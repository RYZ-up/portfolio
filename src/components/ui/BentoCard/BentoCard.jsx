import BorderGlow from '../BorderGlow/BorderGlow.jsx';
import { borderGlowDefaults } from '../BorderGlow/borderGlowDefaults.js';
import './BentoCard.css';

export const BentoCard = ({ children, className = '', ...rest }) => (
  <BorderGlow {...borderGlowDefaults} className={`bento-grid-card ${className}`} {...rest}>
    {/* Pushpin holding the card to the cork wall (BentoCard.css). */}
    <span className="pin" aria-hidden="true" />
    {children}
  </BorderGlow>
);

export default BentoCard;
