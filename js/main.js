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
        title: 'Assistant Robot IoT',
        desc:  'Robot compagnon intelligent basé sur ESP32. Impression 3D sur mesure, connexion WiFi, affichage de l\'heure et météo locale. Yeux animés et simulation de température.',
        tags:  ['ESP32', 'C++', '3D Printing', 'IoT'],
        year: '2024', status: 'done', role: 'Conception & Dev',
      },
      {
        title: 'Bras Robot Gyroscopique',
        desc:  'Bras robotisé à 3 degrés de liberté contrôlé par gants de données (gyroscopes). Calculs de cinématique, impression 3D et interface de contrôle PC.',
        tags:  ['Arduino', 'Python', 'Kinematics', 'Robotics'],
        year: '2024', status: 'done', role: 'Robotics Engineer',
      },
      {
        title: 'Bio-Drone Papillon',
        desc:  'Prototype de drone biomimétique à battement d\'ailes. Conception aérodynamique optimisée et impression 3D. Objectif commercial RC.',
        tags:  ['Aerodynamics', 'Mechanical Design', 'RC', '3D Print'],
        year: '2025', status: 'ongoing', role: 'Innovation Lead',
      },
      {
        title: 'Site Atelier Réparation',
        desc:  'Site vitrine pour atelier d\'électronique avec suivi d\'appareil en temps réel. Intégration reCAPTCHA et visionneuse d\'état via API personnalisée.',
        tags:  ['TypeScript', 'React', 'Node.js', 'API'],
        year: '2024', status: 'done', role: 'Full-Stack Dev',
      },
      {
        title: 'Gestionnaire Candidatures',
        desc:  'Outil collaboratif de gestion de stages/masters utilisé par 15 personnes. Base de données centralisée, publication et optimisation UX.',
        tags:  ['Web App', 'Database', 'Optimization', 'UX'],
        year: '2024', status: 'done', role: 'Lead Developer',
      },
      {
        title: 'IA Tic-Tac-Toe Ultra LLM',
        desc:  'Mise en avant d\'un modèle d\'IA pour le Morpion utilisant Scikit-learn et intégration LLM. Expertise Python appliquée au Machine Learning.',
        tags:  ['Python', 'Scikit-learn', 'AI', 'LLM'],
        year: '2024', status: 'done', role: 'AI Researcher',
      },
      {
        title: 'Logiciel Gestion Boutique',
        desc:  'Application desktop pour magasins de réparation. Digitalisation complète : SQLite local, facturation PDF, relances mail auto et calendrier.',
        tags:  ['Python', 'Tkinter', 'SQLite', 'SMTP'],
        year: '2023', status: 'done', role: 'Software Engineer',
      },
      {
        title: 'Châssis Mobile Articulé',
        desc:  'Plateforme roulante robuste avec bras robotisé 3-DOF intégré. Contrôle de puissance via L298E et moteurs EMG.',
        tags:  ['Embedded', 'Motor Control', 'C++', 'L298E'],
        year: '2025', status: 'ongoing', role: 'Embedded Systems',
      },
      {
        title: 'Analyse Images Médicales',
        desc:  'Système de détection de lésions cutanées par Machine Learning. Traitement de 2000 images microscopiques avec Random Forest.',
        tags:  ['Python', 'Computer Vision', 'ML', 'Healthcare'],
        year: '2025', status: 'ongoing', role: 'Data Scientist',
      },
      {
        title: 'Voiture RC ESP32 v2',
        desc:  'Véhicule radiocommandé miniature sur breadboard. Utilisation d\'ESP-C3 Super, driver L298N et moteurs DC simples.',
        tags:  ['ESP32-C3', 'Electronics', 'RC', 'Hardware'],
        year: '2024', status: 'done', role: 'Electronics Hobbyist',
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
        title: 'IoT Assistant Robot',
        desc:  'Intelligent companion robot based on ESP32. Custom 3D printing, WiFi connection, time display, and local weather. Animated eyes and temperature simulation.',
        tags:  ['ESP32', 'C++', '3D Printing', 'IoT'],
        year: '2024', status: 'done', role: 'Design & Dev',
      },
      {
        title: 'Gyro Robotic Arm',
        desc:  '3-DOF robotic arm controlled by data gloves (gyroscopes). Kinematics calculations, 3D printing and PC control interface.',
        tags:  ['Arduino', 'Python', 'Kinematics', 'Robotics'],
        year: '2024', status: 'done', role: 'Robotics Engineer',
      },
      {
        title: 'Butterfly Bio-Drone',
        desc:  'Biomimetic wing-flapping drone prototype. Optimized aerodynamic design and 3D printing. Commercial RC objective.',
        tags:  ['Aerodynamics', 'Mechanical Design', 'RC', '3D Print'],
        year: '2025', status: 'ongoing', role: 'Innovation Lead',
      },
      {
        title: 'Repair Shop Website',
        desc:  'Showcase site for an electronics workshop with real-time device tracking. reCAPTCHA integration and status viewer via custom API.',
        tags:  ['TypeScript', 'React', 'Node.js', 'API'],
        year: '2024', status: 'done', role: 'Full-Stack Dev',
      },
      {
        title: 'Application Manager',
        desc:  'Collaborative tool for managing internships/masters used by 15 teammates. Centralized database, streamlined publishing and UX optimization.',
        tags:  ['Web App', 'Database', 'Optimization', 'UX'],
        year: '2024', status: 'done', role: 'Lead Developer',
      },
      {
        title: 'AI Tic-Tac-Toe Ultra LLM',
        desc:  'Featured AI model for Tic-Tac-Toe using Scikit-learn and LLM integration. Python expertise applied to Machine Learning.',
        tags:  ['Python', 'Scikit-learn', 'AI', 'LLM'],
        year: '2024', status: 'done', role: 'AI Researcher',
      },
      {
        title: 'Store Management Software',
        desc:  'Desktop application for repair shops. Full digitalization: local SQLite, PDF invoicing, automated email reminders, and calendar.',
        tags:  ['Python', 'Tkinter', 'SQLite', 'SMTP'],
        year: '2023', status: 'done', role: 'Software Engineer',
      },
      {
        title: 'Articulated Mobile Chassis',
        desc:  'Robust rolling platform with integrated 3-DOF robotic arm. Power control via L298E and EMG motors.',
        tags:  ['Embedded', 'Motor Control', 'C++', 'L298E'],
        year: '2025', status: 'ongoing', role: 'Embedded Systems',
      },
      {
        title: 'Medical Image Analysis',
        desc:  'Skin lesion detection system powered by Machine Learning. Processed 2,000 microscopic images using Random Forest.',
        tags:  ['Python', 'Computer Vision', 'ML', 'Healthcare'],
        year: '2025', status: 'ongoing', role: 'Data Scientist',
      },
      {
        title: 'RC Car ESP32 v2',
        desc:  'Miniature radio-controlled vehicle on breadboard. Built with ESP-C3 Super, L298N driver, and simple DC motors.',
        tags:  ['ESP32-C3', 'Electronics', 'RC', 'Hardware'],
        year: '2024', status: 'done', role: 'Electronics Hobbyist',
      },
    ],
  },
  es: {
    github: 'GitHub', demo: 'Demo', clickHint: 'Clic para explorar',
    mediaTitle: 'Medios', backHome: 'inicio', cursorHint: 'Explorar →',
    avail: 'Disponible — Prácticas · CDI',
    labels: { role: 'Rol', stat: 'Estado', stack: 'Stack' },
    status: { done: 'Completado', ongoing: 'En curso', concept: 'Concepto' },
    groups: { web: 'Web', iot: 'IoT', domotique: 'Domótica', science: 'Ciencia', logiciel: 'Software' },
    projects: [
      {
        title: 'Robot Asistente IoT',
        desc:  'Robot inteligente basado en ESP32. Impresión 3D personalizada, conexión WiFi, hora y clima local. Ojos animados y simulación térmica.',
        tags:  ['ESP32', 'C++', '3D Printing', 'IoT'],
        year: '2024', status: 'done', role: 'Diseño & Dev',
      },
      {
        title: 'Brazo Robot Gyro',
        desc:  'Brazo robótico de 3-DOF controlado por guantes de datos (giroscopios). Cinética, impresión 3D e interfaz PC.',
        tags:  ['Arduino', 'Python', 'Kinematics', 'Robotics'],
        year: '2024', status: 'done', role: 'Ingeniero Robótico',
      },
      {
        title: 'Bio-Drone Mariposa',
        desc:  'Prototipo de drone biomimético. Diseño aerodinámico optimizado e impresión 3D. Objetivo comercial RC.',
        tags:  ['Aerodynamics', 'Mechanical Design', 'RC', '3D Print'],
        year: '2025', status: 'ongoing', role: 'Innovation Lead',
      },
      {
        title: 'Web Taller Reparación',
        desc:  'Sitio para taller de electrónica con seguimiento en tiempo real. reCAPTCHA y visor de estado vía API.',
        tags:  ['TypeScript', 'React', 'Node.js', 'API'],
        year: '2024', status: 'done', role: 'Full-Stack Dev',
      },
      {
        title: 'Gestor de Candidaturas',
        desc:  'Herramienta colaborativa gestionando prácticas/másters para 15 usuarios. DB centralizada y optimización UX.',
        tags:  ['Web App', 'Database', 'Optimization', 'UX'],
        year: '2024', status: 'done', role: 'Lead Developer',
      },
      {
        title: 'IA Tic-Tac-Toe Ultra LLM',
        desc:  'Modelo de IA para Tres en Raya con Scikit-learn e integración LLM. Experto Python aplicado a Machine Learning.',
        tags:  ['Python', 'Scikit-learn', 'AI', 'LLM'],
        year: '2024', status: 'done', role: 'AI Researcher',
      },
      {
        title: 'Software Gestión Tienda',
        desc:  'App desktop para tiendas de reparación. Digitalización: SQLite local, facturas PDF, avisos email y calendrier.',
        tags:  ['Python', 'Tkinter', 'SQLite', 'SMTP'],
        year: '2023', status: 'done', role: 'Software Engineer',
      },
      {
        title: 'Chasis Móvil Articulado',
        desc:  'Plataforma rodante con brazo 3-DOF. Control de potencia con L298E y motores EMG.',
        tags:  ['Embedded', 'Motor Control', 'C++', 'L298E'],
        year: '2025', status: 'ongoing', role: 'Embedded Systems',
      },
      {
        title: 'Análisis Imagen Médica',
        desc:  'Detección de lesiones cutáneas por Machine Learning. 2000 imágenes procesadas con Random Forest.',
        tags:  ['Python', 'Computer Vision', 'ML', 'Healthcare'],
        year: '2025', status: 'ongoing', role: 'Data Scientist',
      },
      {
        title: 'Coche RC ESP32 v2',
        desc:  'Vehículo miniatura en breadboard. ESP-C3 Super, driver L298N y motores DC.',
        tags:  ['ESP32-C3', 'Electronics', 'RC', 'Hardware'],
        year: '2024', status: 'done', role: 'Electronics Hobbyist',
      },
    ],
  },
};

/* ═══════════════════════════════════════════════════
   META (language-independent, 10 projects)
═══════════════════════════════════════════════════ */
const isVid = src => /\.(mp4|webm|ogg)$/i.test(src);

function renderMedia(src, { classes = '', attrs = '' } = {}) {
  if (isVid(src)) {
    return `<video src="${src}" class="${classes}" ${attrs} autoplay muted loop playsinline></video>`;
  }
  return `<img src="${src}" class="${classes}" ${attrs} alt="Project media" loading="lazy">`;
}

const META = [
  { 
    category: 'ROBOTICS', group: 'iot', 
    media: [
      { src: 'assets/p1/preview.mp4', l: 'Preview Video' },
      { src: 'assets/p1/hero.jpg', l: 'Main View' },
      { src: 'assets/p1/img1.jpg', l: 'Gallery 1' },
      { src: 'assets/p1/img2.jpg', l: 'Technical' },
      { src: 'assets/p1/img3.jpg', l: 'Final' },
    ] 
  },
  { 
    category: 'ROBOTICS', group: 'logiciel', 
    media: [
      { src: 'assets/p2/preview.mp4', l: 'Preview Video' },
      { src: 'assets/p2/hero.jpg', l: 'Main View' },
      { src: 'assets/p2/img1.jpg', l: 'Gallery 1' },
      { src: 'assets/p2/img2.jpg', l: 'Technical' },
      { src: 'assets/p2/img3.jpg', l: 'Final' },
    ] 
  },
  { 
    category: 'DRONES', group: 'science', 
    media: [
      { src: 'assets/p3/preview.mp4', l: 'Preview Video' },
      { src: 'assets/p3/hero.jpg', l: 'Main View' },
      { src: 'assets/p3/img1.jpg', l: 'Gallery 1' },
      { src: 'assets/p3/img2.jpg', l: 'Technical' },
      { src: 'assets/p3/img3.jpg', l: 'Final' },
    ] 
  },
  { 
    category: 'WEB', group: 'web', 
    media: [
      { src: 'assets/p4/preview.mp4', l: 'Preview Video' },
      { src: 'assets/p4/hero.jpg', l: 'Main View' },
      { src: 'assets/p4/img1.jpg', l: 'Gallery 1' },
      { src: 'assets/p4/img2.jpg', l: 'Technical' },
      { src: 'assets/p4/img3.jpg', l: 'Final' },
    ] 
  },
  { 
    category: 'WEB', group: 'web', 
    media: [
      { src: 'assets/p5/preview.mp4', l: 'Preview Video' },
      { src: 'assets/p5/hero.jpg', l: 'Main View' },
      { src: 'assets/p5/img1.jpg', l: 'Gallery 1' },
      { src: 'assets/p5/img2.jpg', l: 'Technical' },
      { src: 'assets/p5/img3.jpg', l: 'Final' },
    ] 
  },
  { 
    category: 'AI', group: 'science', 
    media: [
      { src: 'assets/p6/preview.mp4', l: 'Preview Video' },
      { src: 'assets/p6/hero.jpg', l: 'Main View' },
      { src: 'assets/p6/img1.jpg', l: 'Gallery 1' },
      { src: 'assets/p6/img2.jpg', l: 'Technical' },
      { src: 'assets/p6/img3.jpg', l: 'Final' },
    ] 
  },
  { 
    category: 'SOFTWARE', group: 'logiciel', 
    media: [
      { src: 'assets/p7/preview.mp4', l: 'Preview Video' },
      { src: 'assets/p7/hero.jpg', l: 'Main View' },
      { src: 'assets/p7/img1.jpg', l: 'Gallery 1' },
      { src: 'assets/p7/img2.jpg', l: 'Technical' },
      { src: 'assets/p7/img3.jpg', l: 'Final' },
    ] 
  },
  { 
    category: 'ROBOTICS', group: 'iot', 
    media: [
      { src: 'assets/p8/preview.mp4', l: 'Preview Video' },
      { src: 'assets/p8/hero.jpg', l: 'Main View' },
      { src: 'assets/p8/img1.jpg', l: 'Gallery 1' },
      { src: 'assets/p8/img2.jpg', l: 'Technical' },
      { src: 'assets/p8/img3.jpg', l: 'Final' },
    ] 
  },
  { 
    category: 'AI', group: 'science', 
    media: [
      { src: 'assets/p9/preview.mp4', l: 'Preview Video' },
      { src: 'assets/p9/hero.jpg', l: 'Main View' },
      { src: 'assets/p9/img1.jpg', l: 'Gallery 1' },
      { src: 'assets/p9/img2.jpg', l: 'Technical' },
      { src: 'assets/p9/img3.jpg', l: 'Final' },
    ] 
  },
  { 
    category: 'ROBOTICS', group: 'iot', 
    media: [
      { src: 'assets/p10/preview.mp4', l: 'Preview Video' },
      { src: 'assets/p10/hero.jpg', l: 'Main View' },
      { src: 'assets/p10/img1.jpg', l: 'Gallery 1' },
      { src: 'assets/p10/img2.jpg', l: 'Technical' },
      { src: 'assets/p10/img3.jpg', l: 'Final' },
    ] 
  },
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
let curFollowEl = null;

const N      = META.length;   // 10
const ITEM_H = 80;
const REPS   = 30;
const pad    = n => String(n + 1).padStart(2, '0');

/* DOM refs */
let mediaViewEl, mvTrackEl, plScrollerEl, listItems;

/* Drawer state */
let drawerOpen = false;

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
      setTimeout(() => {
        loader.classList.add('is-gone');
        document.body.classList.add('is-ready');
      }, 350);
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

/* Directional scroll — always moves forward (+1) or backward (-1) in the drum */
function scrollToItemDir(idx, dir) {
  if (!plScrollerEl) return;
  const half = plScrollerEl.clientHeight / 2;
  let bestTarget = null, bestDist = Infinity;
  for (let rep = 0; rep < REPS; rep++) {
    const slotC  = (rep * N + idx) * ITEM_H + ITEM_H / 2;
    const target = slotC - half;
    const d = (target - plScrollerEl.scrollTop) * dir;
    if (d > ITEM_H * 0.3 && d < bestDist) { bestDist = d; bestTarget = target; }
  }
  if (bestTarget !== null) snapToTarget(bestTarget);
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
   BUILD MEDIA CARDS
═══════════════════════════════════════════════════ */
function buildMediaCards() {
  mvTrackEl.innerHTML = '';
  const h = mediaViewEl.clientHeight;
  META.forEach((m, i) => {
    const card = document.createElement('div');
    const d    = T[lang].projects[i];
    card.className = 'mv__card';
    card.style.top    = (i * h) + 'px';
    card.style.height = h + 'px';

    // Use the first image for the default background and the first video for hover
    const previewImg = m.media.find(item => !isVid(item.src)) || m.media[0];
    const hoverVid   = m.media.find(item => isVid(item.src));

    let mediaHtml = `<img src="${previewImg.src}" class="mv__vid-el mv__img-el" aria-hidden="true" alt="Preview" loading="lazy">`;
    if (hoverVid) {
      mediaHtml += `<video src="${hoverVid.src}" class="mv__vid-el mv__hover-vid" aria-hidden="true" muted loop playsinline></video>`;
    }

    const SVG_ARROW_RIGHT = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

    card.innerHTML = `
      <div class="mv__vid" aria-label="${d.title}"
           data-cursor="${T[lang].cursorHint}" role="button" tabindex="0">
        <div class="mv__media-wrap">
          ${mediaHtml}
          <div class="mv__overlay"></div>
        </div>
        <div class="mv__arrow" aria-hidden="true">${SVG_ARROW_RIGHT}</div>
        
        <div class="mv__content">
          <div class="dr__meta">
            <span class="dr__num">${pad(i)}</span>
            <span class="dr__cat">${m.category}</span>
            <span class="dr__year">${d.year}</span>
          </div>
          <h2 class="mv__vid-title">${d.title}</h2>
        </div>

        <div class="mv__status mv__status--${d.status}">
          <span class="mv__status-dot"></span>
          <span class="mv__status-label">${T[lang].status[d.status] || d.status}</span>
        </div>
      </div>`;

    const mvVid = card.querySelector('.mv__vid');
    const vEl   = card.querySelector('.mv__hover-vid');

    mvVid.addEventListener('mouseenter', () => { if (vEl) vEl.play().catch(() => {}); });
    mvVid.addEventListener('mouseleave', () => { if (vEl) { vEl.pause(); vEl.currentTime = 0; } });

    mvVid.addEventListener('click', () => {
      setActive(i);
      scrollToItem(i, true);
      setTimeout(() => openDrawer(i), 320);
    });

    mvTrackEl.appendChild(card);
  });
}

function initMediaNav() {
  const upBtn   = document.getElementById('mvUp');
  const downBtn = document.getElementById('mvDown');
  if (!upBtn || !downBtn) return;

  upBtn.addEventListener('click', () => {
    const nextIdx = (active - 1 + N) % N;
    setActive(nextIdx);
    scrollToItemDir(nextIdx, -1);
  });

  downBtn.addEventListener('click', () => {
    const nextIdx = (active + 1) % N;
    setActive(nextIdx);
    scrollToItemDir(nextIdx, +1);
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
   DRAWER
═══════════════════════════════════════════════════ */
function seededRng(seed) {
  let s = (seed + 1) * 1664525 + 1013904223;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function openDrawer(idx) {
  const drawer      = document.getElementById('drawer');
  const scrollEl    = document.getElementById('drawerScroll');
  const d           = T[lang].projects[idx];
  const m           = META[idx];
  const statusLabel = T[lang].status[d.status] || d.status;

  const tagsHtml = d.tags.map(t => `<span class="dr__tag">${t}</span>`).join('');

  const ctaUrl = m.github || m.demo || null;
  const ctaLabel = m.github ? 'GitHub' : (m.demo ? 'Démo' : '');
  const ctaHtml = ctaUrl ? `
    <div class="dr__cta-wrap">
      <a href="${ctaUrl}" target="_blank" rel="noopener" class="dr__cta-link" data-cursor="Ouvrir">
        <span>${ctaLabel}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>
      </a>
    </div>` : '';

  const galleryHtml = m.media.slice(1).map((item, i) => `
    <div class="dr__gal-item reveal" style="--i:${i}">
      ${renderMedia(item.src)}
      <div class="dr__gal-cap">
        <span class="dr__gal-num">${String(i + 1).padStart(2, '0')}</span>
        <span>${item.l}</span>
      </div>
    </div>`).join('');

  const gallerySection = m.media.length > 1 ? `
    <div class="dr__gallery reveal">
      <div class="dr__gallery-head">
        <span class="dr__gallery-label">Médias</span>
        <div class="dr__gallery-line" aria-hidden="true"></div>
      </div>
      <div class="dr__gal-grid">${galleryHtml}</div>
    </div>` : '';

  scrollEl.innerHTML = `
    <div class="dr__wrap">

      <div class="dr__bar">
        <div class="dr__bar-left">
          <span class="dr__num">${pad(idx)}</span>
          <span class="dr__cat">${m.category}</span>
        </div>
        <span class="dr__status dr__status--${d.status}">${statusLabel}</span>
      </div>

      <div class="dr__media">
        ${renderMedia(m.media[0].src)}
      </div>

      <div class="dr__body reveal">
        <div class="dr__head">
          <h2 class="dr__title">${d.title}</h2>
          <span class="dr__role">${d.role} · ${d.year}</span>
        </div>
        <p class="dr__desc">${d.desc}</p>
        <div class="dr__tags">${tagsHtml}</div>
        <div class="dr__meta-row">
          <div class="dr__meta-item">
            <span class="dr__meta-label">Catégorie</span>
            <span class="dr__meta-val">${m.category}</span>
          </div>
          <div class="dr__meta-item">
            <span class="dr__meta-label">Année</span>
            <span class="dr__meta-val">${d.year}</span>
          </div>
          <div class="dr__meta-item">
            <span class="dr__meta-label">Rôle</span>
            <span class="dr__meta-val">${d.role}</span>
          </div>
          <div class="dr__meta-item">
            <span class="dr__meta-label">Statut</span>
            <span class="dr__meta-val">${statusLabel}</span>
          </div>
        </div>
        ${ctaHtml}
      </div>

      ${gallerySection}

    </div>`;

  scrollEl.scrollTop = 0;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  drawerOpen = true;
  setActive(idx);

  requestAnimationFrame(() => {
    const reveals = scrollEl.querySelectorAll('.reveal');
    reveals.forEach((el, i) => {
      setTimeout(() => el.classList.add('is-revealed'), i * 80);
    });
  });
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
   SET ACTIVE PROJECT
═══════════════════════════════════════════════════ */
function setActive(idx) {
  if (idx < 0 || idx >= N) return;
  const prevIdx = active;
  active = idx;

  const cards = document.querySelectorAll('.mv__card');
  if (prevIdx !== idx) {
    cards.forEach(c => c.classList.add('is-transitioning'));
    setTimeout(() => {
      if (mediaViewEl && mvTrackEl) {
        mvTrackEl.style.transform = `translateY(${(-idx * mediaViewEl.clientHeight).toFixed(2)}px)`;
      }
      setTimeout(() => { cards.forEach(c => c.classList.remove('is-transitioning')); }, 220);
    }, 350);
  } else {
    if (mediaViewEl && mvTrackEl) {
      mvTrackEl.style.transform = `translateY(${(-idx * mediaViewEl.clientHeight).toFixed(2)}px)`;
    }
  }

  const plCount = document.getElementById('plCount');
  if (plCount) plCount.textContent = `${pad(idx)} / ${pad(N - 1)}`;
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
        if (e.key === 'Enter') { setActive(i); scrollToItem(i, true); setTimeout(() => openDrawer(i), 320); }
      });

      scroller.appendChild(item);
    }
  }
  listItems = Array.from(scroller.querySelectorAll('.pi'));
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

/* ═══════════════════════════════════════════════════
   CLOCK — European time (Paris / CET/CEST)
═══════════════════════════════════════════════════ */
function initClock() {
  const timeEl = document.getElementById('clockTime');
  const tzEl   = document.getElementById('clockTz');
  if (!timeEl) return;
  function tick() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('fr-FR', {
      timeZone: 'Europe/Paris',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
    if (tzEl) {
      /* Detect CET (UTC+1) vs CEST (UTC+2) */
      const parisMs  = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
      const utcMs    = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
      const offset   = Math.round((parisMs - utcMs) / 3600000);
      tzEl.textContent = offset === 2 ? 'CEST' : 'CET';
    }
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR — dot + CursorFollow pill
   Inspired by animate-ui CursorProvider/CursorFollow:
   side='bottom' sideOffset=15, align='end' alignOffset=5
═══════════════════════════════════════════════════ */
function initCursor() {
  const dot    = document.getElementById('curDot');
  curFollowEl  = document.getElementById('curFollow');
  if (!dot) return;

  /* Start off-screen so cursor never jumps from center/corner on load */
  let mx = -200, my = -200;
  let fx = -200, fy = -200;
  let isPressed = false;
  let currentText = '';

  function moveDot() {
    const s = isPressed ? ' scale(0.88)' : '';
    dot.style.transform = `translate(${mx - 1}px, ${my - 3}px)${s}`;
  }

  /* ── Dot: exact mouse position ── */
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    moveDot();
  });

  /* ── Follow pill: lerp trail, positioned bottom-right of tip ── */
  (function animFollow() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    if (curFollowEl) {
      curFollowEl.style.transform = `translate(${fx + 16}px, ${fy + 18}px)`;
    }
    requestAnimationFrame(animFollow);
  })();

  /* ── Contextual label from data-cursor ── */
  function getLabel(el) {
    const dc = el && el.closest('[data-cursor]');
    return dc ? dc.dataset.cursor : '';
  }

  function setLabel(text) {
    if (!curFollowEl || text === currentText) return;
    currentText = text;
    curFollowEl.textContent = text;
    curFollowEl.classList.toggle('is-visible', !!text);
  }

  document.addEventListener('mouseover', e => setLabel(getLabel(e.target)));
  document.addEventListener('mouseout',  e => {
    if (!getLabel(e.relatedTarget)) setLabel('');
  });

  /* ── Pressed state — handled fully in JS, no CSS transform conflict ── */
  document.addEventListener('mousedown', () => { isPressed = true;  moveDot(); });
  document.addEventListener('mouseup',   () => { isPressed = false; moveDot(); });
}

/* ═══════════════════════════════════════════════════
   LANGUAGE — 3-way dropdown (FR / EN / ES)
═══════════════════════════════════════════════════ */
function applyLang() {
  buildList();
  buildMediaCards();
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang.toUpperCase();
  /* Highlight active option */
  document.querySelectorAll('.sn__lang-opt').forEach(opt => {
    opt.classList.toggle('is-active', opt.dataset.lang === lang);
  });
  document.documentElement.lang = lang;
  const availEl = document.querySelector('.sn__avail-text');
  if (availEl) availEl.textContent = T[lang].avail;

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
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); const n = (active + 1) % N; setActive(n); scrollToItemDir(n, +1); }
    if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  { e.preventDefault(); const n = (active - 1 + N) % N; setActive(n); scrollToItemDir(n, -1); }
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

  calibrateScroller();
  scrollToItem(0, false);

  requestAnimationFrame(updateRoulette);
  setActive(0);
  initMediaNav();
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

  /* Landing → App */
  const folderWrap = document.getElementById('folderWrap');
  document.getElementById('landingBtn').addEventListener('click', () => {
    if (folderWrap) folderWrap.classList.add('is-open');
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

  /* Lang dropdown */
  const langBtn      = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  langBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = langDropdown.classList.toggle('is-open');
    langBtn.setAttribute('aria-expanded', open);
    langDropdown.setAttribute('aria-hidden', !open);
  });
  document.querySelectorAll('.sn__lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      lang = opt.dataset.lang;
      applyLang();
      langDropdown.classList.remove('is-open');
      langBtn.setAttribute('aria-expanded', 'false');
      langDropdown.setAttribute('aria-hidden', 'true');
    });
  });
  document.addEventListener('click', () => {
    langDropdown.classList.remove('is-open');
    langBtn.setAttribute('aria-expanded', 'false');
    langDropdown.setAttribute('aria-hidden', 'true');
  });

  /* Drawer close variants */
  const drawerEl = document.getElementById('drawer');
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  drawerEl.addEventListener('click', e => {
    if (e.target === drawerEl) closeDrawer();
  });
  /* Escape key closes modal (handled in initKeyboard) */

  initClock();
  initCursor();
});
