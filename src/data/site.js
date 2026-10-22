// Texts of the one-page site that are not project data. Each text is { fr, en }.
const b = (fr, en = fr) => ({ fr, en });

export const CONTACT_EMAIL = '';

export const toc = {
  title: b('Sur cette page', 'On this page'),
  top: b('Accueil', 'Intro'),
  lab: b('Labo', 'Lab')
};

export const nav = [
  { id: 'projets', label: b('Projets', 'Work') },
  { id: 'competences', label: b('Compétences', 'Skills') },
  { id: 'activite', label: b('Activité', 'Activity') },
  { id: 'ia', label: b('IA', 'AI') },
  { id: 'faq', label: b('FAQ', 'FAQ') },
  { id: 'contact', label: b('Contact', 'Contact') }
];

// Hero (athrix-style): strings are words, objects are inline tokens.
const L = (logo, label) => ({ logo, label });
export const intro = {
  fr: {
    hello: 'Salut, moi c’est Rayane',
    tagline: 'physique • embarqué • ia',
    bio: [
      'Je suis ',
      { underline: true, label: 'ingénieur en devenir' },
      ', étudiant en Master Physique à Paris-Saclay. Je conçois des systèmes complets : des robots sur ',
      L('espressif', 'ESP32'), ' et ', L('stmicroelectronics', 'STM32'), ' programmés en ', L('cplusplus', 'C++'),
      ', de la logique sur ', { strong: true, label: 'FPGA' },
      ', des assistants IA locaux en ', L('python', 'Python'),
      ', et des sites en production avec ', L('react', 'React'), ' et ', L('firebase', 'Firebase'), '.'
    ],
    points: [
      [{ label: '15 projets' }, ' construits, du circuit au déploiement'],
      ['Master Physique (Électronique, Énergie électrique, Automatique), ', { label: 'Université Paris-Saclay', school: true }]
    ],
    open: 'Ouvert aux stages & alternances',
    socialsLead: 'Me retrouver',
    socialsWord: 'ailleurs'
  },
  en: {
    hello: 'Hi, I’m Rayane',
    tagline: 'physics • embedded • ai',
    bio: [
      'I’m an ',
      { underline: true, label: 'engineer in the making' },
      ', Physics Master’s student at Paris-Saclay. I build complete systems: robots on ',
      L('espressif', 'ESP32'), ' and ', L('stmicroelectronics', 'STM32'), ' written in ', L('cplusplus', 'C++'),
      ', logic on ', { strong: true, label: 'FPGA' },
      ', local AI assistants in ', L('python', 'Python'),
      ', and production websites with ', L('react', 'React'), ' and ', L('firebase', 'Firebase'), '.'
    ],
    points: [
      [{ label: '15 projects' }, ' built, from circuit to deployment'],
      ['Physics Master’s (Electronics, Electrical Energy, Control), ', { label: 'Université Paris-Saclay', school: true }]
    ],
    open: 'Open to internships & work-study',
    socialsLead: 'Find me',
    socialsWord: 'elsewhere'
  }
};

export const stackTitle = b('Construit avec des outils ', 'Built with tools ');
export const stackEm = b('éprouvés', 'that last');

export const projects = {
  kicker: b('Projets', 'Work'),
  title: b('Ce que j’ai construit', 'What I’ve built'),
  sub: b(
    'Des sites en production pour de vrais clients, des robots et des outils IA. Glissez la carte ou cliquez pour voir le détail.',
    'Websites in production for real clients, robots and AI tools. Drag the card or click it for the details.'
  ),
  more: b('Robotique, logiciels & IA', 'Robotics, software & AI'),
  count: b('projets', 'projects'),
  open: b('Voir le projet', 'View project'),
  next: b('Suivant', 'Next'),
  close: b('Fermer', 'Close')
};

export const lab = {
  title: b('Ce qui me fait avancer', 'What drives me'),
  sub: b(
    'La physique expérimentale, l’électronique et tout ce qui se mesure.',
    'Experimental physics, electronics and anything that can be measured.'
  )
};

export const background = {
  title: b('Un parcours d’ingénieur', 'An engineering path'),
  sub: b(
    'Une formation scientifique solide, mise en pratique sur des projets réels : capteurs, moteurs, serveurs et interfaces.',
    'A solid scientific education, put into practice on real projects: sensors, motors, servers and interfaces.'
  ),
  steps: [
    { year: b('Aujourd’hui', 'Now'), title: b('Master Physique', 'Physics Master’s'), place: 'Université Paris-Saclay' },
    { year: b('Avant', 'Before'), title: b('Licence Sciences pour l’Ingénieur', 'Engineering Sciences Bachelor’s'), place: 'UPEC' }
  ]
};

export const skills = {
  kicker: b('Compétences', 'Skills'),
  title: b('Mon terrain de jeu', 'My playground'),
  subDesktop: b(
    'Appuyez sur une touche en surbrillance, sur votre clavier ou sur celui-ci : la fiche de la techno s’affiche, avec les projets où je l’ai utilisée.',
    'Press a highlighted key, on your keyboard or this one: the tool’s card shows up, with the projects where I used it.'
  ),
  sub: b('Touchez un outil pour voir ce que j’en fais et dans quels projets.', 'Tap a tool to see what I do with it and in which projects.'),
  hintTitle: b('Tapez une lettre.', 'Type a letter.'),
  hint: b('Chaque touche allumée correspond à un outil que j’utilise.', 'Every lit key maps to a tool I use.'),
  key: b('touche', 'key'),
  usedIn: b('projets', 'projects'),
  ghLabel: b('Contributions récentes :', 'Top contributions in:')
};

export const activity = {
  kicker: b('GitHub', 'GitHub'),
  title: b('L’IA comme outil de travail', 'AI as a working tool'),
  sub: b(
    'Je développe avec l’IA au quotidien, Claude Code et des LLM locaux : je conçois l’architecture, je pilote, je relis et je teste. Voici mes contributions publiques de l’année.',
    'I build with AI every day, Claude Code and local LLMs: I design the architecture, steer, review and test. Here are my public contributions this year.'
  )
};

// Keyboard letter -> tool. `match` finds the projects tagged with it.
export const skillKeys = {
  P: { logo: 'python', name: 'Python', match: /^Python$/, text: b('IA locale, vision par ordinateur, apprentissage par renforcement et outils de bureau.', 'Local AI, computer vision, reinforcement learning and desktop tools.') },
  C: { logo: 'cplusplus', name: 'C++', match: /C\+\+/, text: b('Firmware temps réel : cinématique, machines à états, pilotage de moteurs et d’écrans.', 'Real-time firmware: kinematics, state machines, motor and display drivers.') },
  E: { logo: 'espressif', name: 'ESP32', match: /ESP32/, text: b('Le cerveau de mes robots : WiFi, capteurs I²C, servos et télémétrie.', 'The brain of my robots: WiFi, I²C sensors, servos and telemetry.') },
  A: { logo: 'arduino', name: 'Arduino', match: /Arduino/, text: b('Prototypage rapide et contrôle moteur sur Arduino Uno.', 'Fast prototyping and motor control on Arduino Uno.') },
  J: { logo: 'javascript', name: 'JavaScript', match: /^JavaScript$/, text: b('Sites clients complets : catalogue, back-office, paiement et SEO local.', 'Full client websites: catalogue, back office, payments and local SEO.') },
  T: { logo: 'typescript', name: 'TypeScript', match: /^TypeScript$/, text: b('Applications plus grandes et typées, comme ma plateforme SaaS.', 'Larger, typed applications, like my SaaS platform.') },
  R: { logo: 'react', name: 'React', match: /^React$/, text: b('Interfaces animées, dont ce portfolio, avec Vite, Tailwind et motion.', 'Animated interfaces, this portfolio included, with Vite, Tailwind and motion.') },
  F: { logo: 'firebase', name: 'Firebase', match: /^Firebase$/, text: b('Comptes, base de données et règles de sécurité pour tous mes sites en production.', 'Accounts, database and security rules for all my production websites.') },
  N: { logo: 'netlify', name: 'Netlify', match: /Netlify/, text: b('Hébergement et fonctions serveur : correction de jeu, paiements, compteur de visites.', 'Hosting and server functions: game scoring, payments, visit counter.') },
  S: { logo: 'stripe', name: 'Stripe', match: /^Stripe$/, text: b('Paiement en ligne et abonnements, webhooks compris.', 'Online payments and subscriptions, webhooks included.') },
  V: { logo: 'vite', name: 'Vite', match: /^Vite$/, text: b('Le socle de build de mes projets front-end.', 'The build tool behind my front-end projects.') },
  B: { logo: 'blender', name: 'Blender', match: /^Blender$/, text: b('Modélisation, animation et rendu 3D.', '3D modelling, animation and rendering.') },
  I: { logo: 'claude', name: 'Claude Code', match: /^$/, text: b('Mon binôme IA au quotidien : je conçois et je pilote, il accélère l’écriture, je relis et je teste.', 'My everyday AI pair: I design and steer, it speeds up the writing, I review and test.') },
  L: { icon: 'brain', name: 'LLM', match: /^LLM$/, text: b('Modèles de langage locaux, quantifiés et branchés sur de vrais capteurs.', 'Local language models, quantised and wired to real sensors.') },
  M: { logo: 'stmicroelectronics', name: 'STM32', match: /STM32/, text: b('Microcontrôleurs ARM pour l’embarqué temps réel.', 'ARM microcontrollers for real-time embedded work.') },
  X: { icon: 'cpu', name: 'FPGA', match: /FPGA/, text: b('Logique numérique sur circuits programmables.', 'Digital logic on programmable hardware.') },
  O: { logo: 'fastapi', name: 'FastAPI', match: /^FastAPI$/, text: b('API Python rapides, comme le serveur de mon assistant IA local.', 'Fast Python APIs, like the server behind my local AI assistant.') },
  K: { logo: 'scikit-learn', name: 'Scikit-learn', match: /Scikit/, text: b('Apprentissage automatique classique : classification, forêts aléatoires.', 'Classic machine learning: classification, random forests.') },
  Q: { logo: 'sqlite', name: 'SQLite', match: /^SQLite$/, text: b('Base de données embarquée pour les logiciels de bureau.', 'Embedded database for desktop software.') },
  D: { logo: 'cloudflare', name: 'Cloudflare', match: /^Cloudflare$/, text: b('DNS, CDN et protection des sites en production.', 'DNS, CDN and protection for production websites.') },
  H: { logo: 'html5', name: 'HTML & CSS', match: /^$/, text: b('Les fondations de tous mes sites, mises en page responsives comprises.', 'The foundation of all my websites, responsive layouts included.') },
  G: { logo: 'github', name: 'GitHub', match: /^$/, text: b('Versionnage, revues et déploiement continu de tous mes projets.', 'Version control, reviews and continuous deployment for all my projects.') }
};

export const chat = {
  kicker: b('Assistant', 'Assistant'),
  title: b('Posez-lui vos questions', 'Ask it anything'),
  sub: b(
    'Mon assistant connaît mon parcours, chacun de mes projets en détail et ce site. Il répond en français ou en anglais.',
    'My assistant knows my background, every project in detail and this website. It answers in French or English.'
  ),
  hello: b('Salut ! 👋 Pose-moi tes questions sur Rayane.', 'Hi! 👋 Ask me anything about Rayane.'),
  placeholder: b('Pose une question…', 'Ask a question…'),
  send: b('Envoyer le message', 'Send message'),
  error: b('Je n’arrive pas à répondre pour le moment, réessaie dans un instant.', 'I can’t answer right now, please try again in a moment.'),
  limit: b('Trop de messages pour le moment, réessaie un peu plus tard.', 'Too many messages right now, please try again a bit later.'),
  think: b('Réflexion…', 'Thinking…'),
  search: b('Recherche dans les projets…', 'Searching the projects…'),
  write: b('Rédaction…', 'Writing…'),
  done: b('Répondu en {s} s', 'Answered in {s} s'),
  idle: b('En attente', 'Idle'),
  listening: b('À l’écoute', 'Listening'),
  suggestions: {
    fr: ['Quel est son parcours ?', 'Parle-moi de Bee', 'Quels projets en robotique ?', 'Comment le contacter ?'],
    en: ['What is his background?', 'Tell me about Bee', 'Which robotics projects?', 'How can I reach him?']
  }
};

export const faq = {
  title: b('Questions fréquentes', 'Frequently asked'),
  sub: b('Ce qu’on me demande le plus souvent.', 'What people ask me most.'),
  items: [
    {
      q: b('Quel type de poste recherchez-vous ?', 'What kind of position are you looking for?'),
      a: b(
        'Un stage ou une alternance en systèmes embarqués, robotique ou développement logiciel. Je suis à l’aise sur toute la chaîne : électronique, firmware, back-end et interface.',
        'An internship or work-study role in embedded systems, robotics or software. I’m comfortable across the whole chain: electronics, firmware, back-end and UI.'
      )
    },
    {
      q: b('Plutôt matériel ou logiciel ?', 'Hardware or software?'),
      a: b(
        'Les deux. Mes robots tournent sur ESP32 en C++, mes sites sur Firebase et des fonctions Netlify, et mon assistant IA relie un LLM local à de vrais capteurs.',
        'Both. My robots run on ESP32 in C++, my websites on Firebase and Netlify functions, and my AI assistant ties a local LLM to real sensors.'
      )
    },
    {
      q: b('Ces projets sont-ils réels ?', 'Are these projects real?'),
      a: b(
        'Oui. Chaque projet a été construit, testé et photographié par moi. Plusieurs sites sont en production pour de vrais clients.',
        'Yes. Every project was built, tested and photographed by me. Several websites are in production for real clients.'
      )
    },
    {
      q: b('Quel est votre parcours ?', 'What is your background?'),
      a: b(
        'Une Licence Sciences pour l’Ingénieur à l’UPEC, puis le Master Physique à l’Université Paris-Saclay.',
        'An Engineering Sciences Bachelor’s at UPEC, then the Physics Master’s at Université Paris-Saclay.'
      )
    },
    {
      q: b('Où êtes-vous basé ?', 'Where are you based?'),
      a: b(
        'En Île-de-France, près de l’Université Paris-Saclay. Ouvert au présentiel, à l’hybride et au télétravail.',
        'In the Paris area, near Université Paris-Saclay. Open to on-site, hybrid and remote.'
      )
    },
    {
      q: b('Comment vous contacter le plus vite ?', 'Fastest way to reach you?'),
      a: b('Par LinkedIn : je réponds dans la journée.', 'On LinkedIn: I reply within the day.')
    }
  ]
};

export const cta = {
  title: b('Un stage, une alternance, un projet ?', 'An internship, a work-study, a project?'),
  sub: b('Parlons-en. Je réponds dans la journée.', 'Let’s talk. I reply within the day.'),
  linkedin: b('Écrire sur LinkedIn', 'Message me on LinkedIn')
};

export const footer = {
  pitch: b(
    'Systèmes embarqués, robotique, IA et web, du circuit imprimé à la mise en ligne.',
    'Embedded systems, robotics, AI and web, from the circuit board to production.'
  ),
  sections: b('Sections', 'Sections'),
  elsewhere: b('Ailleurs', 'Elsewhere'),
  available: b('Disponible maintenant', 'Available now'),
  featured: b('Projets récents', 'Recent work'),
  now: b('En ce moment', 'Right now'),
  updated: b('Mis à jour le', 'Updated'),
  menu: b('Menu', 'Menu'),
  closeMenu: b('Fermer', 'Close'),
  top: b('Haut', 'Top'),
  role: b('Embarqué · Web · IA', 'Embedded · Web · AI'),
  visits: b('Visiteurs', 'Visitors')
};

// thesvg.org logos in public/logos.
export const stack = [
  ['python', 'Python'],
  ['cplusplus', 'C++'],
  ['arduino', 'Arduino'],
  ['espressif', 'ESP32'],
  ['javascript', 'JavaScript'],
  ['typescript', 'TypeScript'],
  ['react', 'React'],
  ['vite', 'Vite'],
  ['firebase', 'Firebase'],
  ['netlify', 'Netlify'],
  ['cloudflare', 'Cloudflare'],
  ['fastapi', 'FastAPI'],
  ['stripe', 'Stripe'],
  ['blender', 'Blender']
];
