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
  { id: 'signal', label: b('Signal', 'Signal') },
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
    tagline: '21 ans • physique • embarqué • ia',
    bio: [
      'Je suis ',
      { underline: true, label: 'ingénieur en devenir' },
      ', étudiant en Master Physique à Paris-Saclay. Je conçois des systèmes complets : des robots sur ',
      L('espressif', 'ESP32'), ' et ', L('stmicroelectronics', 'STM32'), ' programmés en ', L('cplusplus', 'C++'),
      ', de la logique sur ', { strong: true, label: 'FPGA' },
      ', des assistants IA locaux en ', L('python', 'Python'),
      ', et des sites en production avec ', L('react', 'React'), ' et ', L('firebase', 'Firebase'), '.'
    ],
    facts: { projects: 'Projets', school: 'Formation', open: 'Disponible' },
    projects: 'du circuit au déploiement',
    school: 'Électronique, énergie, automatique',
    open: 'Stages & alternances',
    reply: 'Je réponds dans la journée',
    write: 'M’écrire'
  },
  en: {
    hello: 'Hi, I’m Rayane',
    tagline: '21 y/o • physics • embedded • ai',
    bio: [
      'I’m an ',
      { underline: true, label: 'engineer in the making' },
      ', Physics Master’s student at Paris-Saclay. I build complete systems: robots on ',
      L('espressif', 'ESP32'), ' and ', L('stmicroelectronics', 'STM32'), ' written in ', L('cplusplus', 'C++'),
      ', logic on ', { strong: true, label: 'FPGA' },
      ', local AI assistants in ', L('python', 'Python'),
      ', and production websites with ', L('react', 'React'), ' and ', L('firebase', 'Firebase'), '.'
    ],
    facts: { projects: 'Projects', school: 'Education', open: 'Available' },
    projects: 'from circuit to deployment',
    school: 'Electronics, energy, control',
    open: 'Internships & work-study',
    reply: 'I reply within the day',
    write: 'Get in touch'
  }
};

export const stackTitle = b('Construit avec des outils ', 'Built with tools ');
export const stackEm = b('éprouvés', 'that last');

export const projects = {
  kicker: b('Projets', 'Work'),
  title: b('Ce que j’ai construit', 'What I’ve built'),
  sub: b(
    'Des sites en production pour de vrais clients, et des robots construits de A à Z. Glissez la carte ou cliquez pour voir le détail.',
    'Websites in production for real clients, and robots built from scratch. Drag the card or click it for the details.'
  ),
  more: b('Robotique, logiciels & IA', 'Robotics, software & AI'),
  count: b('projets', 'projects'),
  open: b('Voir le projet', 'View project'),
  visit: b('Voir le site', 'Visit the site'),
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

export const postcard = {
  label: b('Carte postale', 'Postcard'),
  airmail: b('Par avion', 'Air mail'),
  hello: b('Bonjour Rayane,', 'Hello Rayane,'),
  iam: b('je m’appelle', 'my name is'),
  writing: b('et je vous écris pour', 'and I’m writing about'),
  motives: {
    stage: b('un stage', 'an internship'),
    alternance: b('une alternance', 'a work-study'),
    projet: b('un projet web', 'a web project'),
    autre: b('autre chose', 'something else')
  },
  motiveLegend: b('Motif', 'Reason'),
  name: b('votre nom', 'your name'),
  message: b('Votre message…', 'Your message…'),
  email: b('votre@email.fr', 'you@email.com'),
  to: b('À l’attention de', 'To'),
  reply: b('Répondre à', 'Reply to'),
  send: b('Poster la carte', 'Post the card'),
  sending: b('Envoi…', 'Sending…'),
  sentTitle: b('Carte reçue.', 'Card received.'),
  sentText: b('Merci ! Je réponds dans la journée.', 'Thank you! I reply within the day.'),
  again: b('Écrire une autre carte', 'Write another card'),
  or: b('Plutôt', 'Rather use'),
  orJoin: b('ou', 'or'),
  errors: {
    name: b('Indiquez votre nom.', 'Please add your name.'),
    email: b('Cette adresse e-mail ne semble pas valide.', 'This e-mail address does not look valid.'),
    message: b('Votre message est un peu court (10 caractères minimum).', 'Your message is a bit short (10 characters minimum).'),
    motive: b('Choisissez un motif.', 'Pick a reason.'),
    rate: b('Trop d’envois d’un coup. Réessayez un peu plus tard.', 'Too many cards at once. Please try again a little later.'),
    unavailable: b('L’envoi n’a pas marché. Réessayez, ou écrivez-moi sur LinkedIn.', 'Sending failed. Try again, or message me on LinkedIn.')
  }
};

export const signal = {
  kicker: b('Signal', 'Signal'),
  title: b('Fourier, en direct', 'Fourier, live'),
  sub: b(
    'Un signal carré n’est qu’une somme de sinus. Chaque cercle tourne à sa fréquence ; ajoutez des harmoniques et regardez l’onde se construire.',
    'A square wave is only a sum of sines. Each circle spins at its own frequency; add harmonics and watch the wave build itself.'
  ),
  waves: { square: b('Carré', 'Square'), saw: b('Dents de scie', 'Sawtooth'), triangle: b('Triangle', 'Triangle') },
  harmonics: b('Harmoniques', 'Harmonics'),
  target: b('signal visé', 'target signal'),
  device: { data: b('DONNÉES', 'DATA'), shape: b('FORME', 'WAVE'), mode: b('MODE', 'MODE'), live: b('LIVE', 'LIVE'), off: b('PAUSE', 'PAUSE'), unit: b('harm.', 'harm.') },
  short: { square: b('CARRÉ', 'SQUARE'), saw: b('SCIE', 'SAW'), triangle: b('TRI', 'TRI'), custom: b('PERSO', 'CUSTOM') },
  table: {
    type: b('TYPE', 'TYPE'),
    amplitude: b('AMPL. A', 'AMPL. A'),
    frequency: b('FRÉQ. ×ω', 'FREQ. ×ω'),
    phase: b('PHASE φ°', 'PHASE φ°'),
    add: b('+ AJOUTER UN SIGNAL', '+ ADD A SIGNAL'),
    remove: b('Retirer ce signal', 'Remove this signal'),
    max: b('4 signaux maximum', '4 signals maximum'),
    unit: b('sig.', 'sig.'),
    edit: b('MODIFIER CES TERMES →', 'EDIT THESE TERMS →'),
    more: b('autres termes non affichés', 'more terms not shown'),
    add2: b('+ AJOUTER', '+ ADD')
  },
  customHint: b('Modifiez les signaux dans le tableau ci-dessous.', 'Edit the signals in the table below.'),
  explain: {
    square: b(
      'Une onde carrée s’obtient en additionnant des sinus de fréquences impaires (1, 3, 5…), chacun divisé par son rang. Plus on en ajoute, plus les bords deviennent droits.',
      'A square wave is a sum of sines at odd frequencies (1, 3, 5…), each divided by its rank. The more you add, the straighter the edges.'
    ),
    saw: b(
      'Une dent de scie additionne tous les sinus (1, 2, 3…), avec un signe qui alterne, chacun divisé par son rang.',
      'A sawtooth adds every sine (1, 2, 3…), with alternating signs, each divided by its rank.'
    ),
    custom: b(
      'Construisez votre propre signal : jusqu’à 4 sinus ou cosinus, chacun avec son amplitude, sa fréquence (un multiple de ω) et sa phase, dans le tableau en bas.',
      'Build your own signal: up to 4 sines or cosines, each with its amplitude, frequency (a multiple of ω) and phase, in the table below.'
    ),
    triangle: b(
      'Un triangle n’utilise que les sinus impairs, signe alterné, divisés par le carré de leur rang : ils rapetissent si vite que la forme est presque parfaite dès 3 termes.',
      'A triangle uses only odd sines, alternating signs, divided by the square of their rank: they shrink so fast the shape is almost perfect from 3 terms.'
    )
  },
  legend: b('Chaque cercle est un terme de la somme, le point bleu est leur total.', 'Each circle is one term of the sum, the blue dot is their total.'),
  knobHint: b('Tournez la molette pour ajouter des termes.', 'Turn the knob to add terms.'),
  with: b('Avec', 'With'),
  term: b('terme', 'term'),
  terms: b('termes', 'terms')
};

export const skills = {
  kicker: b('Compétences', 'Skills'),
  title: b('Mon terrain de jeu', 'My playground'),
  subDesktop: b(
    'Chaque touche allumée est un outil : plus elle brille, plus je m’en sers dans mes projets. Tapez une lettre ou un raccourci, sur votre clavier ou sur celui-ci.',
    'Every lit key is a tool: the brighter it glows, the more my projects use it. Type a letter or a shortcut, on your keyboard or this one.'
  ),
  sub: b('Chaque touche est un outil : plus elle brille, plus je m’en sers. Touchez-en une pour voir les projets.', 'Every key is a tool: the brighter, the more I use it. Tap one to see the projects.'),
  hintTitle: b('Tapez une lettre.', 'Type a letter.'),
  hint: b('Chaque touche allumée correspond à un outil que j’utilise.', 'Every lit key maps to a tool I use.'),
  live: b('Appuyez sur une touche ou un raccourci', 'Press a key or a shortcut'),
  shortcuts: {
    KeyC: b('Copier', 'Copy'),
    KeyV: b('Coller', 'Paste'),
    KeyX: b('Couper', 'Cut'),
    KeyZ: b('Annuler', 'Undo'),
    KeyY: b('Rétablir', 'Redo'),
    KeyA: b('Tout sélectionner', 'Select all'),
    KeyS: b('Enregistrer', 'Save'),
    KeyF: b('Rechercher', 'Find'),
    KeyP: b('Imprimer', 'Print'),
    KeyK: b('Palette de commandes', 'Command palette'),
    KeyT: b('Nouvel onglet', 'New tab'),
    KeyR: b('Recharger', 'Reload'),
    KeyD: b('Favori', 'Bookmark'),
    KeyL: b('Barre d’adresse', 'Address bar'),
    Slash: b('Commenter la ligne', 'Toggle comment')
  },
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
  F: { logo: 'firebase', name: 'Firebase', match: /^Firebase$/, text: b('Comptes, base de données temps réel et règles de sécurité.', 'Accounts, real-time database and security rules.') },
  N: { logo: 'netlify', name: 'Netlify', match: /Netlify/, text: b('Hébergement et fonctions serveur.', 'Hosting and server functions.') },
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
  D: { logo: 'cloudflare', name: 'Cloudflare', match: /^Cloudflare$/, text: b('DNS, CDN et protection contre les attaques.', 'DNS, CDN and attack protection.') },
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
  name: b('Assistant de Rayane', 'Rayane’s assistant'),
  online: b('En ligne · répond en quelques secondes', 'Online · replies in seconds'),
  typing: b('En train d’écrire…', 'Typing…'),
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
        'Les deux. Mes robots tournent sur ESP32 en C++, mes sites sont en production pour de vrais clients, du front-end au serveur, et mon assistant IA relie un LLM local à de vrais capteurs.',
        'Both. My robots run on ESP32 in C++, my websites are in production for real clients, from front end to server, and my AI assistant ties a local LLM to real sensors.'
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
