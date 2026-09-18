import { useEffect, useRef, useState } from 'react';
import './Folder.css';

const lightenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color.slice(0, 6), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r + (255 - r) * percent)));
  g = Math.max(0, Math.min(255, Math.floor(g + (255 - g) * percent)));
  b = Math.max(0, Math.min(255, Math.floor(b + (255 - b) * percent)));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color.slice(0, 6), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({ color = '#5227FF', size = 1, backWidthScale = 1, items = [], className = '' }) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => cancelClose, []);

  const folderBackColor = darkenColor(color, 0.08);
  const folderColorLight = lightenColor(color, 0.25);
  const paper1 = 'linear-gradient(135deg, #22d3ee, #f0f9ff)';
  const paper2 = 'linear-gradient(135deg, #f472b6, #fdf2f8)';
  const paper3 = '#ffffff';

  const handleToggle = () => {
    cancelClose();
    setOpen(prev => !prev);
  };

  // Touch has no hover: a tap on the folder opens/closes it. (A mouse keeps the
  // hover behaviour, so a click there must not toggle it back shut.)
  const handlePointerUp = e => {
    if (e.pointerType === 'touch') handleToggle();
  };

  const folderStyle = {
    '--folder-color': color,
    '--folder-color-light': folderColorLight,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3,
    '--back-width-scale': backWidthScale
  };

  const folderClassName = `folder ${open ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div
      style={scaleStyle}
      className={`folder-hover-zone ${className}`.trim()}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <div
        className={folderClassName}
        style={folderStyle}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();

            handleToggle();
          }
        }}
        onPointerUp={handlePointerUp}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? 'Close folder' : 'Open folder'}
      >
        <div className="folder__back">
          {papers.map((item, i) => (
            <div key={i} className={`paper paper-${i + 1}`}>
              {item}
            </div>
          ))}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
