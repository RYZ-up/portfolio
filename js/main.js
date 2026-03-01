'use strict';

/* ═══════════════════════════════════════════════════
   PARALLAX STARS — equivalent of Sass multiple-box-shadow()
═══════════════════════════════════════════════════ */
function initStars() {
  const rand = () => Math.floor(Math.random() * 2000);

  function shadows(n) {
    const parts = [];
    for (let i = 0; i < n; i++) parts.push(`${rand()}px ${rand()}px #FFF`);
    return parts.join(', ');
  }

  const s1 = shadows(700);
  const s2 = shadows(200);
  const s3 = shadows(100);

  const style = document.createElement('style');
  style.textContent = [
    `#stars        { box-shadow: ${s1}; }`,
    `#stars::after  { box-shadow: ${s1}; }`,
    `#stars2        { box-shadow: ${s2}; }`,
    `#stars2::after { box-shadow: ${s2}; }`,
    `#stars3        { box-shadow: ${s3}; }`,
    `#stars3::after { box-shadow: ${s3}; }`,
  ].join('\n');
  document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════
   DEMO VIDEOS
═══════════════════════════════════════════════════ */
const DEMO_VIDS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
];
const V = DEMO_VIDS;

/* ═══════════════════════════════════════════════════
   TRANSLATIONS (10 projects)
═══════════════════════════════════════════════════ */
const T = {
  fr: {
    github: 'GitHub', demo: 'Démo', clickHint: 'Cliquer pour explorer',
    mediaTitle: 'Médias', backHome: 'accueil', cursorHint: 'Explorer →',
    avail: 'Disponible — Stage · CDI',
    labels: { role: 'Rôle', stat: 'Statut', stack: 'Stack' },
    status: { done: 'Terminé', ongoing: 'En cours', concept: 'Concept' },
    groups: { web: 'Web', iot: 'IoT', domotique: 'Domotique', science: 'Science', logiciel: 'Logiciel' },
    projects: [
      {
        title: 'Portfolio Personnel',
        desc:  'Site vitrine professionnel présentant mes projets, compétences et parcours. Design monochrome ultra-sombre, entièrement responsive et bilingue FR/EN.',
        tags:  ['HTML', 'CSS', 'JavaScript'],
        year: '2025', status: 'done', role: 'Design & Dev',
      },
      {
        title: 'Station Météo IoT',
        desc:  'Station météo connectée basée sur ESP32. Acquisition temps réel de température, humidité et pression avec dashboard Node-RED et alertes MQTT.',
        tags:  ['C++', 'ESP32', 'MQTT', 'Node-RED'],
        year: '2024', status: 'done', role: 'Hardware & Firmware',
      },
      {
        title: 'Contrôleur PID STM32',
        desc:  'Régulateur PID embarqué sur STM32 pour asservissement de vitesse d\'un moteur DC. Implémentation bare-metal en C avec bibliothèque HAL.',
        tags:  ['C', 'STM32', 'PID', 'HAL'],
        year: '2024', status: 'done', role: 'Firmware',
      },
      {
        title: 'App Web Full-Stack',
        desc:  'Application web avec authentification Firebase, base de données temps réel, gestion d\'état React et interface entièrement responsive.',
        tags:  ['React', 'Firebase', 'Tailwind'],
        year: '2025', status: 'ongoing', role: 'Full-Stack Dev',
      },
      {
        title: 'Classificateur ML',
        desc:  'Modèle de classification d\'images entraîné sur dataset personnalisé. Interface web de prédiction temps réel via Flask et OpenCV.',
        tags:  ['Python', 'TensorFlow', 'Flask', 'OpenCV'],
        year: '2024', status: 'done', role: 'ML & Backend',
      },
      {
        title: 'Domotique Arduino',
        desc:  'Système de domotique DIY pour le contrôle d\'éclairage et de volets roulants via application mobile. Protocole RF 433 MHz, RTOS Arduino.',
        tags:  ['Arduino', 'RF 433', 'Kotlin', 'RTOS'],
        year: '2023', status: 'done', role: 'Embedded & Mobile',
      },
      {
        title: 'Bras Robotique 6-DOF',
        desc:  'Bras robotique à 6 degrés de liberté piloté par servomoteurs. Cinématique inverse résolue analytiquement, trajectoires lissées par interpolation cubique.',
        tags:  ['C++', 'ROS', 'Python', 'SolidWorks'],
        year: '2024', status: 'done', role: 'Mécatronique',
      },
      {
        title: 'Synthèse & Analyse Audio',
        desc:  'Synthétiseur logiciel FM et analyseur de spectre en temps réel. FFT optimisée, visualisation WebGL, interface MIDI via Web Audio API.',
        tags:  ['JavaScript', 'Web Audio', 'WebGL', 'MIDI'],
        year: '2023', status: 'done', role: 'DSP & Dev',
      },
      {
        title: 'Dashboard Analytics',
        desc:  'Tableau de bord analytique avec graphiques interactifs D3.js, filtres dynamiques, exports CSV/PDF et authentification multi-rôles.',
        tags:  ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
        year: '2025', status: 'ongoing', role: 'Full-Stack Dev',
      },
      {
        title: 'Réseau de Capteurs LoRa',
        desc:  'Réseau maillé de nœuds capteurs communicant via LoRaWAN. Passerelle Raspberry Pi, stockage InfluxDB, visualisation Grafana.',
        tags:  ['LoRaWAN', 'Raspberry Pi', 'InfluxDB', 'Grafana'],
        year: '2024', status: 'done', role: 'IoT & DevOps',
      },
    ],
  },
  en: {
    github: 'GitHub', demo: 'Demo', clickHint: 'Click to explore',
    mediaTitle: 'Media', backHome: 'home', cursorHint: 'Explore →',
    avail: 'Available — Internship · CDI',
    labels: { role: 'Role', stat: 'Status', stack: 'Stack' },
    status: { done: 'Completed', ongoing: 'Ongoing', concept: 'Concept' },
    groups: { web: 'Web', iot: 'IoT', domotique: 'Smart Home', science: 'Science', logiciel: 'Software' },
    projects: [
      {
        title: 'Personal Portfolio',
        desc:  'Professional showcase website presenting my projects, skills and academic background. Ultra-dark monochrome design, fully responsive and bilingual FR/EN.',
        tags:  ['HTML', 'CSS', 'JavaScript'],
        year: '2025', status: 'done', role: 'Design & Dev',
      },
      {
        title: 'IoT Weather Station',
        desc:  'Connected weather station based on ESP32. Real-time data acquisition of temperature, humidity and pressure with Node-RED dashboard and MQTT alerts.',
        tags:  ['C++', 'ESP32', 'MQTT', 'Node-RED'],
        year: '2024', status: 'done', role: 'Hardware & Firmware',
      },
      {
        title: 'STM32 PID Controller',
        desc:  'PID controller embedded on STM32 for DC motor speed control. Bare-metal C implementation using the HAL library.',
        tags:  ['C', 'STM32', 'PID', 'HAL'],
        year: '2024', status: 'done', role: 'Firmware',
      },
      {
        title: 'Full-Stack Web App',
        desc:  'Web application featuring Firebase auth, real-time database, React state management and a fully responsive interface.',
        tags:  ['React', 'Firebase', 'Tailwind'],
        year: '2025', status: 'ongoing', role: 'Full-Stack Dev',
      },
      {
        title: 'ML Image Classifier',
        desc:  'Image classification model trained on a custom dataset with real-time prediction via a Flask web interface and OpenCV.',
        tags:  ['Python', 'TensorFlow', 'Flask', 'OpenCV'],
        year: '2024', status: 'done', role: 'ML & Backend',
      },
      {
        title: 'Arduino Home Automation',
        desc:  'DIY home automation system for lighting and roller blind control via mobile app. 433 MHz RF protocol with Arduino RTOS.',
        tags:  ['Arduino', 'RF 433', 'Kotlin', 'RTOS'],
        year: '2023', status: 'done', role: 'Embedded & Mobile',
      },
      {
        title: '6-DOF Robotic Arm',
        desc:  '6-degree-of-freedom robotic arm driven by servomotors. Inverse kinematics solved analytically, trajectories smoothed by cubic interpolation.',
        tags:  ['C++', 'ROS', 'Python', 'SolidWorks'],
        year: '2024', status: 'done', role: 'Mechatronics',
      },
      {
        title: 'Audio Synthesis & Analysis',
        desc:  'FM software synthesizer and real-time spectrum analyzer. Optimized FFT, WebGL visualization, MIDI interface via Web Audio API.',
        tags:  ['JavaScript', 'Web Audio', 'WebGL', 'MIDI'],
        year: '2023', status: 'done', role: 'DSP & Dev',
      },
      {
        title: 'Analytics Dashboard',
        desc:  'Analytics dashboard with interactive D3.js charts, dynamic filters, CSV/PDF exports and multi-role authentication.',
        tags:  ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
        year: '2025', status: 'ongoing', role: 'Full-Stack Dev',
      },
      {
        title: 'LoRa Sensor Network',
        desc:  'Mesh network of sensor nodes communicating via LoRaWAN. Raspberry Pi gateway, InfluxDB storage, Grafana visualization.',
        tags:  ['LoRaWAN', 'Raspberry Pi', 'InfluxDB', 'Grafana'],
        year: '2024', status: 'done', role: 'IoT & DevOps',
      },
    ],
  },
};

/* ═══════════════════════════════════════════════════
   META (language-independent, 10 projects)
═══════════════════════════════════════════════════ */
const META = [
  { category: 'WEB',      group: 'web',       github: '#', demo: '#',
    media: [{ l:'Accueil',src:V[0]},{l:'Projets',src:V[1]},{l:'Compétences',src:V[2]},{l:'Démo',src:V[3]},{l:'Mobile',src:V[4]}] },
  { category: 'IOT',      group: 'iot',       github: '#', demo: null,
    media: [{ l:'Capteurs',src:V[1]},{l:'Dashboard',src:V[2]},{l:'Live data',src:V[3]},{l:'Montage',src:V[4]},{l:'Schéma',src:V[0]}] },
  { category: 'EMBEDDED', group: 'logiciel',  github: '#', demo: null,
    media: [{ l:'STM32',src:V[2]},{l:'Oscilloscope',src:V[3]},{l:'Motor test',src:V[4]},{l:'Code HAL',src:V[0]},{l:'Courbe PID',src:V[1]}] },
  { category: 'WEB',      group: 'web',       github: '#', demo: '#',
    media: [{ l:'Dashboard',src:V[3]},{l:'Auth',src:V[4]},{l:'Mobile',src:V[0]},{l:'Démo app',src:V[1]},{l:'Database',src:V[2]}] },
  { category: 'AI',       group: 'science',   github: '#', demo: null,
    media: [{ l:'Dataset',src:V[4]},{l:'Training',src:V[0]},{l:'Prédiction',src:V[1]},{l:'Metrics',src:V[2]},{l:'Interface',src:V[3]}] },
  { category: 'IOT',      group: 'domotique', github: '#', demo: null,
    media: [{ l:'Schéma RF',src:V[0]},{l:'Arduino',src:V[1]},{l:'App Mobile',src:V[2]},{l:'Démo live',src:V[3]},{l:'Volets',src:V[4]}] },
  { category: 'ROBOTICS', group: 'logiciel',  github: '#', demo: null,
    media: [{ l:'Bras 3D',src:V[1]},{l:'Kinématique',src:V[2]},{l:'Trajectoire',src:V[3]},{l:'Code ROS',src:V[4]},{l:'Démo',src:V[0]}] },
  { category: 'DSP',      group: 'science',   github: '#', demo: '#',
    media: [{ l:'Spectre',src:V[2]},{l:'Synthèse FM',src:V[3]},{l:'Interface',src:V[4]},{l:'MIDI',src:V[0]},{l:'WebGL',src:V[1]}] },
  { category: 'WEB',      group: 'web',       github: '#', demo: '#',
    media: [{ l:'Charts',src:V[3]},{l:'Filtres',src:V[4]},{l:'Auth',src:V[0]},{l:'Export',src:V[1]},{l:'Mobile',src:V[2]}] },
  { category: 'IOT',      group: 'iot',       github: '#', demo: null,
    media: [{ l:'Nœuds',src:V[4]},{l:'Passerelle',src:V[0]},{l:'InfluxDB',src:V[1]},{l:'Grafana',src:V[2]},{l:'Terrain',src:V[3]}] },
];

/* SVG icons */
const SVG_GH  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;
const SVG_EXT = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>`;

/* Category preview backgrounds & icon colors */
const PREV_BG = {
  'WEB':      'radial-gradient(ellipse at 60% 40%, #0d1a2e 0%, #030508 80%)',
  'IOT':      'radial-gradient(ellipse at 60% 40%, #091e1a 0%, #020806 80%)',
  'EMBEDDED': 'radial-gradient(ellipse at 60% 40%, #1e1208 0%, #080403 80%)',
  'AI':       'radial-gradient(ellipse at 60% 40%, #12091e 0%, #050208 80%)',
  'ROBOTICS': 'radial-gradient(ellipse at 60% 40%, #0e0e14 0%, #040407 80%)',
  'DSP':      'radial-gradient(ellipse at 60% 40%, #07180e 0%, #030604 80%)',
};
const PREV_ICON_COLOR = {
  'WEB':      'rgba(100, 160, 255, 0.55)',
  'IOT':      'rgba(60,  210, 170, 0.55)',
  'EMBEDDED': 'rgba(255, 160, 80,  0.55)',
  'AI':       'rgba(180, 100, 255, 0.55)',
  'ROBOTICS': 'rgba(180, 185, 200, 0.55)',
  'DSP':      'rgba(80,  220, 130, 0.55)',
};

/* Category icons mapped to META categories */
const CATEGORY_ICONS = {
  'WEB':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  'IOT':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>`,
  'EMBEDDED': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>`,
  'AI':       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>`,
  'ROBOTICS': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`,
  'DSP':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h2M6 6l1.5 6L9 7l1.5 10L12 8l1.5 8 1.5-9 1.5 8L18 6l1.5 6H22"/></svg>`,
};

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
let lang  = 'fr';
let active = 0;
let drawerOpen = false;
let cursorTipEl = null;

const N      = META.length;   // 10
const ITEM_H = 80;
const REPS   = 30;
const pad    = n => String(n + 1).padStart(2, '0');

/* DOM refs */
let mediaViewEl, mvTrackEl, plScrollerEl, listItems;

/* Momentum scroll */
let scrollVel = 0;
let scrollRAF = null;
let snapRAF   = null;
const FRICTION = 0.96;
const MIN_VEL  = 0.3;


/* ═══════════════════════════════════════════════════
   BOARD / FLARE background — mouse tracking
═══════════════════════════════════════════════════ */
function initBoardFlare() {
  const flareSpan = document.querySelector('.board-wrap .flare span');
  if (!flareSpan) return;
  let pointerX, pointerY;

  function updatePointerPosition(event) {
    const x = event.pageX || (event.touches && event.touches[0].clientX) || 0;
    const y = event.pageY || (event.touches && event.touches[0].clientY) || 0;
    pointerX = (x / (document.body.offsetWidth  || window.innerWidth))  * 100;
    pointerY = (y / (document.body.offsetHeight || window.innerHeight)) * 100;
  }

  function updateFlareProperties() {
    if (pointerX == null || pointerY == null) return;
    flareSpan.style.setProperty('--pointer-x', `${pointerX}%`);
    flareSpan.style.setProperty('--pointer-y', `${pointerY}%`);
  }

  document.addEventListener('pointermove', updatePointerPosition);
  document.addEventListener('wheel', updatePointerPosition, { passive: true });
  flareSpan.addEventListener('animationiteration', updateFlareProperties);
}

/* ═══════════════════════════════════════════════════
   LOADER
═══════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  const bar    = document.getElementById('loaderBar');
  const pctEl  = document.getElementById('loaderPct');
  let p = 0;
  function tick() {
    p += Math.random() * 13 + 5;
    if (p >= 100) {
      p = 100;
      if (bar)   bar.style.width = '100%';
      if (pctEl) pctEl.textContent = '100%';
      setTimeout(() => loader.classList.add('is-gone'), 350);
      return;
    }
    if (bar)   bar.style.width = p + '%';
    if (pctEl) pctEl.textContent = Math.round(p) + '%';
    setTimeout(tick, 55 + Math.random() * 65);
  }
  setTimeout(tick, 180);
}

/* ═══════════════════════════════════════════════════
   ROULETTE — wrap, calibrate, snap, visual update
═══════════════════════════════════════════════════ */
function wrapRoulette() {
  if (!plScrollerEl) return;
  const cycleH = N * ITEM_H;
  const totalH = REPS * cycleH;
  const margin = cycleH * 4;
  if (plScrollerEl.scrollTop < margin) {
    const j = Math.ceil((margin - plScrollerEl.scrollTop) / cycleH);
    plScrollerEl.scrollTop += j * cycleH;
  } else if (plScrollerEl.scrollTop > totalH - margin) {
    const j = Math.ceil((plScrollerEl.scrollTop - (totalH - margin)) / cycleH);
    plScrollerEl.scrollTop -= j * cycleH;
  }
}

function calibrateScroller() {
  if (!plScrollerEl) return;
  plScrollerEl.scrollTop = Math.floor(REPS / 2) * N * ITEM_H;
}

/* Find nearest copy of idx and lerp-animate there */
function scrollToItem(idx, smooth) {
  if (!plScrollerEl) return;
  const half    = plScrollerEl.clientHeight / 2;
  const scrollC = plScrollerEl.scrollTop + half;
  let bestTarget = 0, bestDist = Infinity;
  for (let rep = 0; rep < REPS; rep++) {
    const slotC  = (rep * N + idx) * ITEM_H + ITEM_H / 2;
    const target = slotC - half;
    const d = Math.abs(target - plScrollerEl.scrollTop);
    if (d < bestDist) { bestDist = d; bestTarget = target; }
  }
  if (smooth) {
    snapToTarget(bestTarget);
  } else {
    if (snapRAF) { cancelAnimationFrame(snapRAF); snapRAF = null; }
    plScrollerEl.scrollTop = bestTarget;
    updateRoulette();
  }
}

/* Lerp snap animation */
function snapToTarget(target) {
  if (snapRAF) cancelAnimationFrame(snapRAF);
  function step() {
    const diff = target - plScrollerEl.scrollTop;
    if (Math.abs(diff) < 0.4) {
      plScrollerEl.scrollTop = target;
      updateRoulette();
      updateActiveFromScroll();
      snapRAF = null;
      return;
    }
    plScrollerEl.scrollTop += diff * 0.14;
    wrapRoulette();
    updateRoulette();
    updateActiveFromScroll();
    snapRAF = requestAnimationFrame(step);
  }
  step();
}

/* Update which item is center — CSS handles all styling */
function updateRoulette() {
  if (!plScrollerEl || !listItems) return;
  const scrollC = plScrollerEl.scrollTop + plScrollerEl.clientHeight / 2;
  listItems.forEach((el, i) => {
    const dist    = (i * ITEM_H + ITEM_H / 2 - scrollC) / ITEM_H;
    const abs     = Math.abs(dist);
    el.classList.toggle('is-center', abs < 0.5);
    el.classList.toggle('is-near',   abs >= 0.5 && abs < 1.5);
  });
}

/* ═══════════════════════════════════════════════════
   MOMENTUM SCROLL
═══════════════════════════════════════════════════ */
function addVelocity(delta) {
  /* Cancel any ongoing snap */
  if (snapRAF) { cancelAnimationFrame(snapRAF); snapRAF = null; }
  scrollVel += delta;
  if (!scrollRAF) scrollRAF = requestAnimationFrame(momentumTick);
}

function momentumTick() {
  scrollVel *= FRICTION;
  if (Math.abs(scrollVel) < MIN_VEL) {
    scrollVel = 0;
    scrollRAF = null;
    snapToNearest();
    return;
  }
  plScrollerEl.scrollTop += scrollVel;
  wrapRoulette();
  updateRoulette();
  updateActiveFromScroll();
  scrollRAF = requestAnimationFrame(momentumTick);
}

function updateActiveFromScroll() {
  if (!plScrollerEl) return;
  const scrollC = plScrollerEl.scrollTop + plScrollerEl.clientHeight / 2;
  const slotIdx = Math.round((scrollC - ITEM_H / 2) / ITEM_H);
  const newIdx  = ((slotIdx % N) + N) % N;
  if (newIdx !== active) setActive(newIdx);
}

function snapToNearest() {
  const scrollC = plScrollerEl.scrollTop + plScrollerEl.clientHeight / 2;
  const slotIdx = Math.round((scrollC - ITEM_H / 2) / ITEM_H);
  const idx     = ((slotIdx % N) + N) % N;
  scrollToItem(idx, true);
}

/* ═══════════════════════════════════════════════════
   SET ACTIVE PROJECT
═══════════════════════════════════════════════════ */
function setActive(idx) {
  if (idx < 0 || idx >= N) return;
  const prevIdx = active;
  active = idx;

  /* Blur transition on video change */
  const cards = document.querySelectorAll('.mv__card');
  if (prevIdx !== idx) {
    cards.forEach(c => c.classList.add('is-transitioning'));
    setTimeout(() => {
      if (mediaViewEl && mvTrackEl) {
        mvTrackEl.style.transform = `translateY(${(-idx * mediaViewEl.clientHeight).toFixed(2)}px)`;
      }
      setTimeout(() => {
        cards.forEach(c => c.classList.remove('is-transitioning'));
      }, 220);
    }, 350);
  } else {
    if (mediaViewEl && mvTrackEl) {
      mvTrackEl.style.transform = `translateY(${(-idx * mediaViewEl.clientHeight).toFixed(2)}px)`;
    }
  }

  /* Update counter */
  const plCount = document.getElementById('plCount');
  if (plCount) plCount.textContent = `${pad(idx)} / ${pad(N - 1)}`;

  updateOverlay(idx);
}

function updateOverlay(idx) {
  const d     = T[lang].projects[idx];
  const m     = META[idx];
  const numEl   = document.getElementById('mvNum');
  const catEl   = document.getElementById('mvCat');
  const titleEl = document.getElementById('mvTitle');
  function fade(el, val) {
    if (!el) return;
    el.classList.add('is-fading');
    setTimeout(() => { el.textContent = val; el.classList.remove('is-fading'); }, 180);
  }
  fade(numEl,   pad(idx));
  fade(catEl,   m.category);
  fade(titleEl, d.title);
}

/* ═══════════════════════════════════════════════════
   BUILD PROJECT LIST — roulette drum (titles only)
═══════════════════════════════════════════════════ */
function buildList() {
  const scroller = document.getElementById('plScroller');
  scroller.innerHTML = '';

  for (let rep = 0; rep < REPS; rep++) {
    for (let i = 0; i < N; i++) {
      const d    = T[lang].projects[i];
      const m    = META[i];
      const icon = CATEGORY_ICONS[m.category] || CATEGORY_ICONS['WEB'];
      const item = document.createElement('div');
      item.className = 'pi';
      item.dataset.idx = i;
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.innerHTML = `
        <span class="pi__icon" aria-hidden="true">${icon}</span>
        <span class="pi__name">${d.title}</span>`;

      /* Click: scroll to item then open drawer */
      item.addEventListener('click', () => {
        setActive(i);
        scrollToItem(i, true);
        setTimeout(() => openDrawer(i), 320);
      });
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          setActive(i);
          scrollToItem(i, true);
          setTimeout(() => openDrawer(i), 320);
        }
      });

      scroller.appendChild(item);
    }
  }
  listItems = Array.from(scroller.querySelectorAll('.pi'));
}

/* ═══════════════════════════════════════════════════
   BUILD MEDIA CARDS
═══════════════════════════════════════════════════ */
function buildMediaCards() {
  mvTrackEl.innerHTML = '';
  const h = mediaViewEl.clientHeight;
  META.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'mv__card';
    card.style.top    = (i * h) + 'px';
    card.style.height = h + 'px';

    const bg        = PREV_BG[m.category]         || 'radial-gradient(ellipse at 60% 40%, #0d0d1a 0%, #030305 80%)';
    const iconColor = PREV_ICON_COLOR[m.category] || 'rgba(180,185,200,0.55)';
    const bigIcon   = (CATEGORY_ICONS[m.category] || CATEGORY_ICONS['WEB'])
      .replace(/width="\d+"/, 'width="88"').replace(/height="\d+"/, 'height="88"');

    card.innerHTML = `
      <div class="mv__vid" style="background:${bg};" aria-label="${T[lang].projects[i].title}">
        <div class="mv__vid-icon" style="color:${iconColor};">${bigIcon}</div>
        <span class="mv__vid-cat">${m.category}</span>
      </div>`;

    const preview = card.querySelector('.mv__vid');

    /* Click: open drawer */
    preview.addEventListener('click', () => {
      setActive(i);
      scrollToItem(i, true);
      setTimeout(() => openDrawer(i), 320);
    });

    /* Cursor follower tip */
    preview.addEventListener('mousemove', e => {
      if (cursorTipEl) {
        cursorTipEl.style.left = e.clientX + 'px';
        cursorTipEl.style.top  = e.clientY + 'px';
      }
    });
    preview.addEventListener('mouseenter', () => {
      if (cursorTipEl) cursorTipEl.classList.add('is-visible');
    });
    preview.addEventListener('mouseleave', () => {
      if (cursorTipEl) cursorTipEl.classList.remove('is-visible');
    });

    mvTrackEl.appendChild(card);
  });
}

function resizeCards() {
  const h = mediaViewEl.clientHeight;
  document.querySelectorAll('.mv__card').forEach((card, i) => {
    card.style.top    = (i * h) + 'px';
    card.style.height = h + 'px';
  });
}

/* ═══════════════════════════════════════════════════
   DRAWER — random media layout
═══════════════════════════════════════════════════ */
/* Simple seeded pseudo-random for deterministic random layout */
function seededRng(seed) {
  let s = (seed + 1) * 1664525 + 1013904223;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function openDrawer(idx) {
  const drawer   = document.getElementById('drawer');
  const scrollEl = document.getElementById('drawerScroll');
  const d        = T[lang].projects[idx];
  const m        = META[idx];
  const statusLabel = T[lang].status[d.status] || d.status;

  const tagsHtml = d.tags.map(t => `<span class="dr__tag">${t}</span>`).join('');
  const ghBtn    = m.github
    ? `<a href="${m.github}" class="dr__btn" target="_blank" rel="noopener">${SVG_GH} ${T[lang].github}</a>` : '';
  const demoBtn  = m.demo
    ? `<a href="${m.demo}" class="dr__btn" target="_blank" rel="noopener">${T[lang].demo} ${SVG_EXT}</a>` : '';

  /* Hero */
  const heroHtml = `
    <div class="dr__hero">
      <video src="${m.media[0].src}" autoplay muted loop playsinline controls></video>
    </div>`;

  /* Uniform layout for remaining media — all full-width 16/9 */
  const otherMedia = m.media.slice(1);
  const gridItems = otherMedia.map(med => `
      <div class="dr__media-item">
        <video src="${med.src}" muted loop playsinline preload="metadata"
               onmouseenter="this.play()" onmouseleave="this.pause()"></video>
        <span class="dr__media-label">${med.l}</span>
      </div>`).join('');

  const gridHtml = otherMedia.length ? `
    <p class="dr__media-heading">${T[lang].mediaTitle}</p>
    <div class="dr__media-grid">${gridItems}</div>` : '';

  scrollEl.innerHTML = `
    ${heroHtml}
    <div class="dr__meta">
      <span class="dr__num">${pad(idx)}</span>
      <span class="dr__cat">${m.category}</span>
      <span class="dr__year">${d.year}</span>
    </div>
    <h2 class="dr__title">${d.title}</h2>
    <p class="dr__role">${d.role} · ${statusLabel}</p>
    <div class="dr__sep"></div>
    <p class="dr__desc">${d.desc}</p>
    <div class="dr__tags">${tagsHtml}</div>
    ${(ghBtn || demoBtn) ? `<div class="dr__links">${ghBtn}${demoBtn}</div>` : ''}
    ${gridHtml}`;

  scrollEl.scrollTop = 0;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  drawerOpen = true;
  setActive(idx);
}

function closeDrawer() {
  const drawer   = document.getElementById('drawer');
  const scrollEl = document.getElementById('drawerScroll');
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  drawerOpen = false;
  const heroVid = scrollEl.querySelector('video');
  if (heroVid) heroVid.pause();
  setTimeout(() => { scrollEl.innerHTML = ''; }, 700);
}

/* ═══════════════════════════════════════════════════
   BREADCRUMB
═══════════════════════════════════════════════════ */
function showBreadcrumb() {
  /* Hide site-nav, show floating back button */
  const nav = document.getElementById('siteNav');
  if (nav) nav.classList.add('is-hidden');
  const back = document.getElementById('appBack');
  if (back) { back.classList.add('is-visible'); back.removeAttribute('aria-hidden'); }
}
function hideBreadcrumb() {
  /* Show site-nav, hide floating back button */
  const nav = document.getElementById('siteNav');
  if (nav) nav.classList.remove('is-hidden');
  const back = document.getElementById('appBack');
  if (back) { back.classList.remove('is-visible'); back.setAttribute('aria-hidden', 'true'); }
}

/* Custom cursor removed — system default cursor is used */

/* ═══════════════════════════════════════════════════
   LANGUAGE TOGGLE
═══════════════════════════════════════════════════ */
function applyLang() {
  buildList();
  buildMediaCards();
  updateOverlay(active);
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';
  document.documentElement.lang = lang;
  /* Update availability text */
  const availEl = document.querySelector('.sn__avail-text');
  if (availEl) availEl.textContent = T[lang].avail;
  /* Update cursor tip text */
  if (cursorTipEl) cursorTipEl.textContent = T[lang].cursorHint;

  calibrateScroller();
  requestAnimationFrame(() => {
    scrollToItem(active, false);
    updateRoulette();
  });
  setActive(active);
}

/* ═══════════════════════════════════════════════════
   KEYBOARD
═══════════════════════════════════════════════════ */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (drawerOpen) { e.preventDefault(); closeDrawer(); } return; }
    if (drawerOpen) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); addVelocity(ITEM_H * 0.08); }
    if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  { e.preventDefault(); addVelocity(-ITEM_H * 0.08); }
  });
}

/* ═══════════════════════════════════════════════════
   WHEEL — momentum-based, works on both panels
═══════════════════════════════════════════════════ */
function initWheel() {
  function onWheel(e) {
    if (drawerOpen) return;
    addVelocity(e.deltaY * 0.02);
  }
  document.getElementById('mediaView').addEventListener('wheel', onWheel, { passive: true });
  document.getElementById('projList').addEventListener('wheel', e => {
    if (drawerOpen) return;
    e.stopPropagation();
    addVelocity(e.deltaY * 0.02);
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════
   TOUCH SWIPE
═══════════════════════════════════════════════════ */
function initSwipe() {
  const mv = document.getElementById('mediaView');
  let sy = 0, sliding = false;
  mv.addEventListener('touchstart', e => { sy = e.touches[0].clientY; sliding = false; }, { passive: true });
  mv.addEventListener('touchmove',  e => { if (Math.abs(e.touches[0].clientY - sy) > 8) sliding = true; }, { passive: true });
  mv.addEventListener('touchend', e => {
    if (!sliding || drawerOpen) return;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dy) > 30) addVelocity(-dy * 0.22);
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════
   RESIZE
═══════════════════════════════════════════════════ */
function initResize() {
  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      resizeCards();
      scrollToItem(active, false);
      updateRoulette();
      setActive(active);
    }, 150);
  });
}

/* ═══════════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════════ */
function initMobileMenu() {
  const menuBtn  = document.getElementById('appMenu');
  const projList = document.getElementById('projList');
  if (!menuBtn || !projList) return;
  menuBtn.addEventListener('click', () => {
    const isOpen = projList.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
  document.getElementById('mediaView').addEventListener('click', () => {
    if (projList.classList.contains('is-open')) {
      projList.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ═══════════════════════════════════════════════════
   START APP
═══════════════════════════════════════════════════ */
function startApp() {
  mediaViewEl  = document.getElementById('mediaView');
  mvTrackEl    = document.getElementById('mvTrack');
  plScrollerEl = document.getElementById('plScroller');

  buildList();
  buildMediaCards();
  updateOverlay(0);

  calibrateScroller();
  scrollToItem(0, false);

  requestAnimationFrame(updateRoulette);
  setActive(0);
}

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initBoardFlare();
  initLoader();
  initKeyboard();
  initMobileMenu();

  /* Init cursor tip */
  cursorTipEl = document.getElementById('cursorTip');
  if (cursorTipEl) cursorTipEl.textContent = T[lang].cursorHint;

  /* Landing → App */
  document.getElementById('landingBtn').addEventListener('click', () => {
    document.getElementById('landing').classList.add('is-gone');
    const app = document.getElementById('app');
    app.classList.add('is-active');
    app.removeAttribute('aria-hidden');
    /* Show board/flare background once */
    const board = document.getElementById('boardWrap');
    if (board) { board.classList.add('is-active'); board.removeAttribute('aria-hidden'); }
    showBreadcrumb();
    startApp();
    initWheel();
    initSwipe();
    initResize();
  });

  /* App back button → landing */
  document.getElementById('appBack').addEventListener('click', () => {
    if (drawerOpen) closeDrawer();
    hideBreadcrumb();
    const app = document.getElementById('app');
    app.classList.remove('is-active');
    app.setAttribute('aria-hidden', 'true');
    const board = document.getElementById('boardWrap');
    if (board) { board.classList.remove('is-active'); board.setAttribute('aria-hidden', 'true'); }
    document.getElementById('landing').classList.remove('is-gone');
  });

  /* Social popup toggle */
  const socBtn = document.getElementById('socBtn');
  const socPopup = document.getElementById('socPopup');
  if (socBtn && socPopup) {
    socBtn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = socPopup.classList.toggle('is-open');
      socBtn.classList.toggle('is-active', isOpen);
      socBtn.setAttribute('aria-expanded', String(isOpen));
      socPopup.setAttribute('aria-hidden', String(!isOpen));
    });
    /* Close on outside click */
    document.addEventListener('click', () => {
      if (socPopup.classList.contains('is-open')) {
        socPopup.classList.remove('is-open');
        socBtn.classList.remove('is-active');
        socBtn.setAttribute('aria-expanded', 'false');
        socPopup.setAttribute('aria-hidden', 'true');
      }
    });
    socPopup.addEventListener('click', e => e.stopPropagation());
  }

  /* Drawer close */
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  document.getElementById('drawerBd').addEventListener('click', closeDrawer);

  /* Lang toggle */
  document.getElementById('langBtn').addEventListener('click', () => {
    lang = lang === 'fr' ? 'en' : 'fr';
    applyLang();
  });
});
