// Engineering sheet of each project on the projects page (`g.<id>`, same ids as
// gallery.json). Sources: the project descriptions, Rayane's own answers and the
// project folders on his PC (Playground, z - Vitrine, HelpApplys, work3, ia).
// Client URLs, credentials and other sensitive data are deliberately absent.
//
// stack : [name, domain, role]          -> component table + radar chart
// specs : [label, value]                -> specification table
// kpis  : [value, label]                -> extra figures next to the generic ones
// flow  : ordered steps                 -> block diagram ("architecture")
// feats : deliverables / functions      -> checklist
// Each text is { fr, en }.

const b = (fr, en = fr) => ({ fr, en });

export const DOMAINS = ['elec', 'soft', 'mech', 'ai', 'web'];

export const projectDetails = {
  p1: {
    stack: [
      ['ESP32', 'elec', b('Microcontrôleur principal, WiFi intégré', 'Main microcontroller, built-in WiFi')],
      ['Écran OLED SSD1306', 'elec', b('Affichage des yeux animés, de l’heure et de la météo (I²C)', 'Animated eyes, time and weather display (I²C)')],
      ['Arduino IDE + librairies OLED', 'soft', b('Firmware C++ et pilotage de l’écran', 'C++ firmware and display driver')],
      ['C++', 'soft', b('Machine à états des animations', 'Animation state machine')],
      ['API météo (Weather)', 'web', b('Même source que la carte Météo du portfolio, appelée en HTTP', 'Same source as the portfolio Weather card, called over HTTP')],
      ['WiFi (1er démarrage)', 'web', b('Configuration du réseau au premier lancement, puis mémorisation', 'Network setup on first boot, then remembered')],
      ['Impression 3D', 'mech', b('Boîtier conçu sur mesure', 'Custom-designed enclosure')]
    ],
    specs: [
      [b('Cible', 'Target'), b('Robot compagnon de bureau', 'Desk companion robot')],
      [b('Plateforme', 'Platform'), 'ESP32'],
      [b('Écran', 'Display'), b('OLED (yeux animés)', 'OLED (animated eyes)')],
      [b('Connectivité', 'Connectivity'), b('WiFi, configuré au premier démarrage', 'WiFi, set up on first boot')],
      [b('Architecture', 'Architecture'), b('Autonome : aucun serveur', 'Standalone: no server')],
      [b('Données externes', 'External data'), b('API météo (HTTP)', 'Weather API (HTTP)')],
      [b('Fabrication', 'Fabrication'), b('Impression 3D sur mesure', 'Custom 3D printing')]
    ],
    kpis: [['0', b('serveur', 'server')]],
    flow: [b('Premier démarrage : WiFi', 'First boot: WiFi setup'), b('ESP32', 'ESP32'), b('API météo', 'Weather API'), b('Écran OLED : yeux + infos', 'OLED: eyes + info')],
    feats: [
      b('Yeux animés sur écran OLED', 'Animated eyes on an OLED display'),
      b("Affichage de l'heure", 'Time display'),
      b('Météo locale via API', 'Local weather through an API'),
      b('Simulation de température', 'Temperature simulation'),
      b('Connexion WiFi configurée au premier démarrage', 'WiFi configured on first boot'),
      b('Fonctionne sans serveur', 'Runs without any server')
    ]
  },
  p2: {
    stack: [
      ['ESP32', 'elec', b('Carte de contrôle du bras', 'Arm control board')],
      ['MPU6050', 'elec', b('Gyroscope / accéléromètre des gants (I²C)', 'Glove gyroscope / accelerometer (I²C)')],
      ['4 servomoteurs + pince', 'elec', b('Articulations du bras et préhension', 'Arm joints and gripper')],
      ['Liaison filaire', 'elec', b('Gants → bras, latence de quelques ms', 'Gloves → arm, latency of a few ms')],
      ['C++', 'soft', b('Acquisition capteurs et commande servos', 'Sensor acquisition and servo control')],
      ['Interface PC', 'soft', b('Supervision et contrôle depuis un ordinateur', 'Supervision and control from a computer')],
      ['Cinématique directe', 'mech', b('Angles articulaires → position de la pince', 'Joint angles → gripper position')],
      ['Impression 3D', 'mech', b('Pièces de la structure', 'Structural parts')]
    ],
    specs: [
      [b('Articulations', 'Joints'), b('4 servos + pince', '4 servos + gripper')],
      [b('Commande', 'Control'), b('Gants de données (MPU6050)', 'Data gloves (MPU6050)')],
      [b('Modèle cinématique', 'Kinematic model'), b('Directe', 'Forward')],
      [b('Liaison', 'Link'), b('Filaire', 'Wired')],
      [b('Latence', 'Latency'), b('Quelques ms', 'A few ms')],
      [b('Plateforme', 'Platform'), 'ESP32'],
      [b('Interface', 'Interface'), b('Contrôle PC', 'PC control')]
    ],
    kpis: [['4 + 1', b('servos + pince', 'servos + gripper')], ['ms', b('latence', 'latency')]],
    flow: [b('Gants (MPU6050)', 'Gloves (MPU6050)'), b('ESP32', 'ESP32'), b('Cinématique directe', 'Forward kinematics'), b('4 servos + pince', '4 servos + gripper')],
    feats: [
      b('Pilotage par gants de données', 'Data-glove control'),
      b('Calculs de cinématique directe', 'Forward-kinematics calculations'),
      b('Réponse en quelques millisecondes (liaison filaire)', 'Response within a few milliseconds (wired link)'),
      b('Pince pilotée en plus des 4 articulations', 'Gripper driven on top of the 4 joints'),
      b('Pièces imprimées en 3D', '3D-printed parts'),
      b('Interface de contrôle PC', 'PC control interface')
    ]
  },
  p3: {
    stack: [
      ['ESP32', 'elec', b('Contrôle embarqué', 'Onboard control')],
      ['Servomoteur', 'elec', b('Actionneur du battement (mécanisme simple)', 'Flapping actuator (simple mechanism)')],
      ['Batterie de voiture RC', 'elec', b('Forte capacité de décharge, ≈ 12,7 V', 'High discharge capability, ≈ 12.7 V')],
      ['Buzzer', 'elec', b('Signalisation sonore', 'Audible signalling')],
      ['SolidWorks', 'mech', b('Conception et simulation', 'Design and simulation')],
      ['Aérodynamique', 'mech', b('Optimisation de la forme des ailes', 'Wing-shape optimisation')],
      ['Impression 3D', 'mech', b('Fabrication des pièces', 'Part fabrication')]
    ],
    specs: [
      [b('Principe', 'Principle'), b("Battement d'ailes (biomimétique)", 'Wing flapping (biomimetic)')],
      [b('Mécanisme', 'Mechanism'), b('Servomoteur (simple)', 'Servo motor (simple)')],
      [b('Fréquence de battement', 'Flapping frequency'), '2 Hz'],
      [b('Alimentation', 'Power'), b('Batterie de voiture RC, ≈ 12,7 V', 'RC-car battery, ≈ 12.7 V')],
      [b('Simulation', 'Simulation'), 'SolidWorks'],
      [b('Étape', 'Stage'), b('Prototype, pas encore de vol (budget)', 'Prototype, not flown yet (budget)')],
      [b('Objectif', 'Goal'), b('Produit RC commercial', 'Commercial RC product')]
    ],
    kpis: [['2 Hz', b('battement', 'flapping')], ['≈ 12,7 V', b('batterie', 'battery')]],
    flow: [b('Conception SolidWorks', 'SolidWorks design'), b('Simulation', 'Simulation'), b('Impression 3D', '3D printing'), b('Servo + ESP32', 'Servo + ESP32'), b('Essais (vol : budget)', 'Trials (flight: budget)')],
    feats: [
      b('Drone biomimétique à battement d’ailes', 'Biomimetic flapping-wing drone'),
      b('Simulation sous SolidWorks', 'SolidWorks simulation'),
      b('Batterie de voiture RC à forte décharge', 'High-discharge RC-car battery'),
      b('Buzzer intégré', 'Built-in buzzer'),
      b('Pas encore testé en vol par manque de budget', 'Not flight-tested yet due to budget')
    ]
  },
  p14: {
    stack: [
      ['HTML / CSS / JavaScript', 'web', b('Site statique en modules ES, sans framework', 'Static site in ES modules, no framework')],
      ['Firebase Firestore', 'web', b('Catalogue, catégories, avis et newsletter', 'Catalogue, categories, reviews and newsletter')],
      ['Firebase Authentication', 'web', b('Connexion au back-office administrateur', 'Admin back-office sign-in')],
      ['Schema.org (JSON-LD)', 'web', b('SEO local : Store, LocalBusiness, FAQ, fil d’Ariane', 'Local SEO: Store, LocalBusiness, FAQ, breadcrumbs')],
      ['Python', 'soft', b('Script qui régénère le sitemap depuis le catalogue', 'Script that rebuilds the sitemap from the catalogue')],
      ['PWA (manifest)', 'web', b('Icônes et installation sur l’écran d’accueil', 'Icons and home-screen install')]
    ],
    specs: [
      [b('Type', 'Type'), b('Site vitrine + catalogue + back-office', 'Showcase site + catalogue + back office')],
      [b('Client', 'Client'), b('Boutique lifestyle réelle (entreprise privée)', 'Real lifestyle store (private company)')],
      [b('Catalogue', 'Catalogue'), b('Plus de 100 produits, recherche, tri, filtre stock', '100+ products, search, sort, stock filter')],
      [b('Pages', 'Pages'), b('Accueil, Boutique, Produit, Favoris, Gestion, pages légales', 'Home, Shop, Product, Favourites, Admin, legal pages')],
      [b('Sécurité', 'Security'), b('Back-office protégé, accès restreint aux administrateurs', 'Protected back office, admin-only access')],
      [b('Conformité', 'Compliance'), b('Vérification d’âge, mentions légales, CGV, aucun cookie de suivi', 'Age check, legal notice, terms of sale, no tracking cookies')]
    ],
    kpis: [['100+', b('produits', 'products')], ['9', b('pages', 'pages')]],
    flow: [b('Le gérant édite le catalogue', 'Owner edits the catalogue'), b('Back-office', 'Back office'), b('Firebase', 'Firebase'), b('Site statique', 'Static site'), b('Visiteur : recherche, favoris', 'Visitor: search, favourites')],
    feats: [
      b('Catalogue avec recherche, tri, filtre stock et état dans l’URL', 'Catalogue with search, sort, stock filter and state in the URL'),
      b('Fiche produit, aperçu rapide, favoris et produits vus récemment', 'Product page, quick view, favourites and recently viewed'),
      b('Back-office : produits, stock, catégories, avis, newsletter, journal', 'Back office: products, stock, categories, reviews, newsletter, log'),
      b('Horaires d’ouverture en direct (ouvert / fermé)', 'Live opening hours (open / closed)'),
      b('Avis clients et inscription à la newsletter', 'Customer reviews and newsletter sign-up'),
      b('Thème clair / sombre, design responsive', 'Light / dark theme, responsive design'),
      b('SEO local complet et sitemap généré automatiquement', 'Full local SEO and auto-generated sitemap')
    ]
  },
  p15: {
    stack: [
      ['HTML / CSS / JavaScript', 'web', b('Interface client et back-office, sans framework', 'Customer site and back office, no framework')],
      ['Netlify Functions', 'web', b('API serverless : paiement, envoi, e-mails, PDF', 'Serverless API: payment, shipping, e-mails, PDFs')],
      ['Firebase Firestore + Storage', 'web', b('Commandes, catalogue, clients, photos des pièces', 'Orders, catalogue, customers, item photos')],
      ['Firebase Authentication', 'web', b('Connexion client Google ou e-mail', 'Customer sign-in with Google or e-mail')],
      ['Stripe Checkout', 'web', b('Paiement, webhook et vérification côté serveur', 'Payment, webhook and server-side verification')],
      ['API Chronopost', 'web', b('Tarifs selon le poids, points relais, suivi', 'Weight-based rates, relay points, tracking')],
      ['Resend + SMSMode', 'web', b('E-mails et SMS automatiques à chaque statut', 'Automatic e-mails and SMS on every status change')],
      ['PDFKit', 'soft', b('Factures et bordereaux générés côté serveur', 'Server-generated invoices and shipping labels')],
      ['Chart.js', 'web', b('Graphiques du tableau de bord (14 indicateurs)', 'Dashboard graphs (14 KPIs)')],
      ['GitHub Actions', 'soft', b('CI : tests unitaires et validation HTML', 'CI: unit tests and HTML validation')]
    ],
    specs: [
      [b('Type', 'Type'), b('Atelier en ligne + boutique + back-office', 'Online workshop + store + back office')],
      [b('Client', 'Client'), b('Atelier de restauration réel (entreprise privée)', 'Real restoration workshop (private company)')],
      [b('Parcours', 'Flow'), b('Devis avec photos → paiement → envoi → restauration → retour', 'Quote with photos → payment → shipping → restoration → return')],
      [b('Taille', 'Size'), b('≈ 50 000 lignes', '≈ 50,000 lines')],
      [b('Sécurité', 'Security'), b('Paiement vérifié côté serveur, back-office protégé', 'Server-verified payment, protected back office')],
      [b('Exploitation', 'Operations'), b('PWA, sauvegarde et nettoyage planifiés, CI', 'PWA, scheduled backup and clean-up, CI')]
    ],
    kpis: [['50k', b('lignes', 'lines')]],
    flow: [b('Devis + photos', 'Quote + photos'), b('Paiement Stripe', 'Stripe payment'), b('Envoi Chronopost', 'Chronopost shipping'), b('Restauration (borne atelier)', 'Restoration (workshop kiosk)'), b('E-mail + SMS + facture PDF', 'E-mail + SMS + PDF invoice')],
    feats: [
      b('Demande de devis en plusieurs étapes avec photos et brouillon sauvegardé', 'Multi-step quote request with photos and saved draft'),
      b('Paiement sécurisé, codes promo et facture PDF automatique', 'Secure payment, promo codes and automatic PDF invoice'),
      b('Envoi Chronopost : tarif, point relais, bordereau et suivi', 'Chronopost shipping: rate, relay point, label and tracking'),
      b('Espace client : commandes, suivi, profil, cookies et newsletter', 'Customer area: orders, tracking, profile, cookies and newsletter'),
      b('Boutique de pièces uniques avec stock en temps réel et favoris', 'Store of one-off pieces with live stock and wishlist'),
      b('Back-office 8 modules et borne tablette pour l’atelier', '8-module back office and tablet kiosk for the workshop'),
      b('Notifications e-mail et SMS à chaque changement de statut', 'E-mail and SMS notifications on every status change'),
      b('PWA, CI GitHub Actions, sauvegarde nocturne', 'PWA, GitHub Actions CI, nightly backup')
    ]
  },
  p16: {
    stack: [
      ['HTML / CSS / JavaScript', 'web', b('Interface du jeu, animations et thèmes', 'Game interface, animations and themes')],
      ['Netlify Functions', 'web', b('Parties, correction et scores calculés côté serveur', 'Games, grading and scores computed server-side')],
      ['Firebase Auth', 'web', b('Compte Google ou session invitée', 'Google account or guest session')],
      ['Firebase (Firestore + Realtime Database)', 'web', b('Scores, records, réglages et joueurs en ligne', 'Scores, records, settings and players online')],
      ['Chart.js', 'web', b('Courbes de progression du profil et statistiques de fin de partie', 'Profile progress charts and end-of-game stats')],
      ['Web Audio', 'web', b('Musique et effets sonores réglables', 'Adjustable music and sound effects')],
      ['Node test runner + navigateur', 'soft', b('Tests de sécurité, des règles Firebase et de l’affichage mobile', 'Security, Firebase rules and mobile layout tests')]
    ],
    specs: [
      [b('Type', 'Type'), b('Jeu web (projet personnel)', 'Web game (personal project)')],
      [b('En ligne', 'Live'), 'linguify.fr'],
      [b('Contenu', 'Content'), b('≈ 10 000 phrases, 5 niveaux, FR ⇄ EN', '≈ 10,000 sentences, 5 levels, FR ⇄ EN')],
      [b('Modes', 'Modes'), b('Nombre de phrases ou chrono, un sens ou les deux', 'Sentence count or timed, one direction or both')],
      [b('Compte', 'Account'), b('Invité ou Google, records et courbes de progression', 'Guest or Google, records and progress charts')],
      [b('Thèmes', 'Themes'), b('6 couleurs + thème Halloween', '6 colours + Halloween theme')]
    ],
    kpis: [['10k', b('phrases', 'sentences')], ['7', b('thèmes', 'themes')]],
    flow: [b('Réglages de la partie', 'Game settings'), b('Phrase envoyée par le serveur', 'Sentence sent by the server'), b('Traduction du joueur', 'Player translation'), b('Correction côté serveur', 'Server-side grading'), b('Score, record, courbes', 'Score, record, charts')],
    feats: [
      b('Deux sens de traduction, 5 niveaux, mode chrono ou nombre de phrases', 'Two translation directions, 5 levels, timed or sentence-count mode'),
      b('Correction souple et correction détaillée en fin de partie', 'Tolerant grading and a detailed correction at the end'),
      b('Multiplicateur de série et records', 'Streak multiplier and records'),
      b('Compte Google : scores enregistrés et courbes de progression', 'Google account: saved scores and progress charts'),
      b('Réglages complets : musique, sons, animations, passage automatique', 'Full settings: music, sounds, animations, auto-next'),
      b('6 thèmes de couleur et un thème Halloween', '6 colour themes and a Halloween theme'),
      b('Scores vérifiés côté serveur, impossibles à truquer', 'Server-verified scores that cannot be faked')
    ]
  },
  p4: {
    stack: [
      ['React 19 + Vite 7', 'web', b('Interface du site', 'Site interface')],
      ['TypeScript', 'soft', b('Typage statique', 'Static typing')],
      ['GSAP + Lenis', 'web', b('Animations avancées et défilement fluide', 'Advanced animations and smooth scrolling')],
      ['Firebase Firestore', 'web', b('Base cloud des réparations', 'Cloud repair database')],
      ['Fonction Netlify', 'web', b('API de suivi : vérifie le captcha puis lit Firestore', 'Tracking API: verifies the captcha then reads Firestore')],
      ['reCAPTCHA v2', 'web', b('Anti-bot, validé côté serveur', 'Anti-bot, verified server-side')],
      ['Netlify + Cloudflare', 'web', b('Hébergement et sécurité', 'Hosting and security')],
      ['Vitest', 'soft', b('Tests unitaires', 'Unit tests')]
    ],
    specs: [
      [b('Type', 'Type'), b('Site vitrine + suivi de réparation', 'Showcase site + repair tracking')],
      [b('Client', 'Client'), b("Atelier de réparation électronique réel (Créteil)", 'Real electronics repair workshop (Créteil)')],
      [b('Suivi', 'Tracking'), b('Par code, lien partageable, captcha requis', 'By code, shareable link, captcha required')],
      [b('Pages', 'Pages'), b('Accueil, À propos, Suivi, RGPD, CGV', 'Home, About, Tracking, GDPR, terms')],
      [b('Conformité', 'Compliance'), b('RGPD complet + CGV en PDF', 'Full GDPR + PDF terms of sale')],
      [b('Hébergement', 'Hosting'), 'Netlify + Cloudflare']
    ],
    kpis: [['5', b('pages', 'pages')]],
    flow: [b('Client saisit son code', 'Customer enters a code'), b('reCAPTCHA v2', 'reCAPTCHA v2'), b('Fonction Netlify', 'Netlify function'), b('Firestore (API REST)', 'Firestore (REST API)'), b('État de la réparation', 'Repair status')],
    feats: [
      b("Suivi d'appareil en temps réel", 'Real-time device tracking'),
      b('Captcha vérifié côté serveur (clé secrète jamais exposée)', 'Server-verified captcha (secret key never exposed)'),
      b('Design sombre animé, avis, FAQ, carte', 'Animated dark design, reviews, FAQ, map'),
      b('Politique RGPD et conditions de vente', 'GDPR policy and terms of sale'),
      b('Tests automatisés', 'Automated tests')
    ]
  },
  p6: {
    stack: [
      ['Python', 'soft', b('Langage principal', 'Main language')],
      ['Q-learning', 'ai', b('Agent par renforcement (tables q_table_x / q_table_o)', 'Reinforcement-learning agent (q_table_x / q_table_o tables)')],
      ['Auto-apprentissage', 'ai', b('Données d’entraînement propres, générées par l’IA elle-même', 'Own training data, generated by the AI itself')],
      ['Tkinter + Matplotlib', 'soft', b('Interface de jeu et courbes d’apprentissage', 'Game interface and learning curves')],
      ['Scikit-learn / LLM', 'ai', b('Pistes d’intégration explorées', 'Integration paths explored')]
    ],
    specs: [
      [b('Jeu', 'Game'), b('Morpion (Tic-Tac-Toe)', 'Tic-Tac-Toe')],
      [b('Approche', 'Approach'), b('Apprentissage par renforcement (Q-learning)', 'Reinforcement learning (Q-learning)')],
      [b('Données', 'Data'), b('Générées par l’IA (parties simulées)', 'Generated by the AI (simulated games)')],
      [b('Persistance', 'Persistence'), b('Tables Q en JSON', 'Q-tables in JSON')],
      [b('Langage', 'Language'), 'Python']
    ],
    kpis: [['Q', b('learning', 'learning')]],
    flow: [b('Parties simulées', 'Simulated games'), b('Mise à jour Q-table', 'Q-table update'), b('Tables JSON', 'JSON tables'), b('IA jouable', 'Playable AI')],
    feats: [
      b('IA entraînée sur ses propres parties', 'AI trained on its own games'),
      b('Tables X et O sauvegardées', 'X and O tables saved'),
      b('Même approche appliquée à un agent Snake', 'Same approach applied to a Snake agent')
    ]
  },
  p7: {
    stack: [
      ['Python', 'soft', b('Langage principal (≈ 2 500 lignes)', 'Main language (≈ 2,500 lines)')],
      ['CustomTkinter', 'soft', b('Interface desktop moderne', 'Modern desktop UI')],
      ['tkcalendar', 'soft', b('Calendrier des réparations', 'Repair calendar')],
      ['SQLite', 'soft', b('Base locale des réparations et clients', 'Local repairs and customers database')],
      ['ReportLab + PyPDF2', 'soft', b('Génération et fusion des factures PDF', 'PDF invoice generation and merging')],
      ['SMTP', 'web', b('Relances par e-mail automatiques', 'Automatic e-mail reminders')],
      ['Impression Windows', 'soft', b('Impression directe des documents', 'Direct document printing')],
      ['Threading', 'soft', b('Tâches en arrière-plan sans geler l’interface', 'Background tasks without freezing the UI')]
    ],
    specs: [
      [b('Type', 'Type'), b('Application desktop Windows', 'Windows desktop application')],
      [b('Cible', 'Target'), b('Atelier de réparation', 'Repair workshop')],
      [b('Stockage', 'Storage'), b('SQLite local', 'Local SQLite')],
      [b('Documents', 'Documents'), b('Factures PDF, CGV', 'PDF invoices, terms of sale')],
      [b('Communication', 'Communication'), b('E-mails automatiques (SMTP)', 'Automatic e-mails (SMTP)')]
    ],
    kpis: [['≈ 2 500', b('lignes', 'lines')]],
    flow: [b('Interface CustomTkinter', 'CustomTkinter UI'), b('SQLite', 'SQLite'), b('Facture PDF', 'PDF invoice'), b('Impression / e-mail', 'Print / e-mail')],
    feats: [
      b('Digitalisation complète de l’atelier', 'Full digitalisation of the workshop'),
      b('Facturation PDF', 'PDF invoicing'),
      b('Relances mail automatiques', 'Automated e-mail reminders'),
      b('Calendrier', 'Calendar'),
      b('Impression directe', 'Direct printing')
    ]
  },
  p8: {
    stack: [
      ['Arduino Uno', 'elec', b('Carte de contrôle', 'Control board')],
      ['Driver L298E', 'elec', b('Pont en H : PWM et sens de rotation des 2 moteurs', 'H-bridge: PWM and direction for the 2 motors')],
      ['2 moteurs EMG30', 'elec', b('Motorisation à encodeurs, roues de Ø 100 mm', 'Encoder drive, Ø 100 mm wheels')],
      ['4 servomoteurs (MD31231)', 'elec', b('3 articulations du bras + fermeture de la pince', '3 arm joints + gripper closing')],
      ['Batterie', 'elec', b('Alimentation de la puissance', 'Power supply')],
      ['C++ (Arduino IDE)', 'soft', b('Firmware et contrôle moteur', 'Firmware and motor control')],
      ['Scilab', 'soft', b('Réponse du système et réglage PID', 'System response and PID tuning')],
      ['CoppeliaSim (Python)', 'soft', b('Simulation dynamique du robot complet (export URDF)', 'Dynamic simulation of the whole robot (URDF export)')],
      ['SolidWorks', 'mech', b('CAO du châssis, du bras et de la pince ; étude RDM (SimulationXpress)', 'CAD of the chassis, arm and gripper; strength study (SimulationXpress)')],
      ['Bras 3-DOF + pince', 'mech', b('Étude cinématique inverse et statique, dimensionnement des servos', 'Inverse kinematics and statics, servo sizing')],
      ['Châssis 2 plaques', 'mech', b('Aluminium 6061, roulette pivotante à billes', 'Aluminium 6061, ball-type swivel caster')]
    ],
    specs: [
      [b('Contexte', 'Context'), b('Projet de synthèse L3 SPI (UPEC), groupe de 5', 'L3 SPI synthesis project (UPEC), team of 5')],
      [b('Plateforme', 'Platform'), 'Arduino Uno'],
      [b('Driver moteur', 'Motor driver'), 'L298E'],
      [b('Moteurs', 'Motors'), b('2 × EMG30 à encodeurs', '2 × EMG30 with encoders')],
      [b('Roues', 'Wheels'), b('Ø 100 mm, voie 222,5 mm, roulette pivotante à l’avant', 'Ø 100 mm, 222.5 mm track, front swivel caster')],
      [b('Bras', 'Arm'), b('3 rotations (segments 90 / 180 / 160 mm, pince comprise)', '3 rotations (90 / 180 / 160 mm segments, gripper included)')],
      [b('Pince', 'Gripper'), b('Cube de 50 mm, 100 g max, mors dentés, engrenages', '50 mm cube, 100 g max, toothed jaws, gears')],
      [b('Masse totale', 'Total mass'), b('≈ 1,46 kg (modèle SolidWorks)', '≈ 1.46 kg (SolidWorks model)')],
      [b('Matériaux', 'Materials'), b('Aluminium 6061, PLA, acier, TPE (pneus)', 'Aluminium 6061, PLA, steel, TPE (tyres)')],
      [b('Servomoteurs', 'Servos'), b('Coefficient de sécurité ≈ 2 sur les couples calculés', 'Safety factor ≈ 2 on the computed torques')],
      [b('Tenue mécanique', 'Strength'), b('Von Mises < limite élastique ; coeff. 9,4 (pince), ≥ 100 (bras)', 'Von Mises < yield stress; factor 9.4 (gripper), ≥ 100 (arm)')],
      [b('Alimentation', 'Power'), b('Batterie', 'Battery')]
    ],
    kpis: [['2', b('moteurs EMG30', 'EMG30 motors')], ['3', b('DDL', 'DOF')], ['1,46 kg', b('masse totale', 'total mass')], ['≥ 100', b('coeff. de sécurité (bras)', 'safety factor (arm)')]],
    flow: [b('Cahier des charges', 'Requirements'), b('CAO SolidWorks', 'SolidWorks CAD'), b('Cinématique + statique + RDM', 'Kinematics + statics + strength'), b('Simulation CoppeliaSim', 'CoppeliaSim simulation'), b('Arduino Uno + L298E', 'Arduino Uno + L298E'), b('2 × EMG30 + bras 3-DOF', '2 × EMG30 + 3-DOF arm')],
    feats: [
      b('Plateforme roulante robuste', 'Robust rolling platform'),
      b('Bras robotisé 3-DOF intégré avec pince (cube de 50 mm, 100 g)', 'Integrated 3-DOF arm with gripper (50 mm cube, 100 g)'),
      b('Contrôle de puissance des moteurs (PWM, sens de rotation)', 'Motor power control (PWM, direction)'),
      b('CAO complète : châssis, roues, roulette pivotante, bras, pince, assemblage', 'Full CAD: chassis, wheels, swivel caster, arm, gripper, assembly'),
      b('Cinématique inverse : angles articulaires pour atteindre l’objet', 'Inverse kinematics: joint angles to reach the object'),
      b('Statique : formule généralisée des couples pour dimensionner les servos', 'Statics: generalised torque formula to size the servos'),
      b('Étude RDM (contrainte de Von Mises) sur la pince et les 3 bras', 'Strength study (Von Mises stress) on the gripper and the 3 arms'),
      b('Simulation CoppeliaSim : déplacement, rotation, manipulation d’un cube', 'CoppeliaSim simulation: driving, turning, cube handling'),
      b('Gestion de projet : diagramme de Gantt et diagramme des ressources', 'Project management: Gantt chart and resource chart')
    ]
  },
  p9: {
    stack: [
      ['Python', 'soft', b('Traitement des images', 'Image processing')],
      ['Random Forest', 'ai', b('Classifieur de lésions', 'Lesion classifier')],
      ['Vision par ordinateur', 'ai', b('Extraction de caractéristiques des images', 'Feature extraction from images')],
      ['Jeu de données public', 'ai', b('Images dermatologiques d’un site spécialisé de datasets', 'Dermatology images from a specialised dataset site')]
    ],
    specs: [
      [b('Domaine', 'Field'), b('Santé, lésions cutanées', 'Health, skin lesions')],
      [b('Jeu de données', 'Dataset'), b('2 000 images microscopiques', '2,000 microscopic images')],
      [b('Modèle', 'Model'), 'Random Forest'],
      [b('Contrainte', 'Constraint'), b('Dimensionné pour les ressources de mon PC', 'Sized for my PC’s resources')]
    ],
    kpis: [['2 000', b('images', 'images')]],
    flow: [b('Dataset public', 'Public dataset'), b('Extraction de caractéristiques', 'Feature extraction'), b('Random Forest', 'Random Forest'), b('Détection de lésions', 'Lesion detection')],
    feats: [b('Détection de lésions cutanées', 'Skin-lesion detection'), b('Traitement de 2 000 images', 'Processing of 2,000 images'), b('Précision limitée volontairement par les ressources du PC', 'Accuracy bounded by the PC’s resources')]
  },
  p10: {
    stack: [
      ['ESP32-C3 Super', 'elec', b('Microcontrôleur', 'Microcontroller')],
      ['Driver L298N', 'elec', b('Pilotage des moteurs', 'Motor driver')],
      ['Moteurs DC', 'elec', b('Traction', 'Traction')],
      ['Buzzer', 'elec', b('Avertisseur (ajouté en v2)', 'Horn (added in v2)')],
      ['Interface de pilotage', 'soft', b('Refaite en v2 (la v1 était instable)', 'Rebuilt in v2 (v1 was buggy)')],
      ['Câblage organisé', 'elec', b('Cable management lisible en v2', 'Readable cable management in v2')],
      ['Impression 3D', 'mech', b('Pièces du véhicule', 'Vehicle parts')]
    ],
    specs: [
      [b('Microcontrôleur', 'Microcontroller'), 'ESP32-C3 Super'],
      [b('Driver moteur', 'Motor driver'), 'L298N'],
      [b('Moteurs', 'Motors'), b('DC simples', 'Simple DC')],
      [b('Montage', 'Assembly'), 'Breadboard'],
      [b('Évolution', 'Evolution'), b('v1 : sans buzzer, interface instable, câblage illisible', 'v1: no buzzer, buggy interface, unreadable wiring')],
      [b('Apport v2', 'v2 gains'), b('Buzzer, interface fiable, câblage clair, meilleure organisation', 'Buzzer, reliable interface, clean wiring, better organisation')]
    ],
    kpis: [['v2', b('itération', 'iteration')]],
    flow: [b('Radiocommande', 'Radio control'), b('ESP32-C3', 'ESP32-C3'), b('Driver L298N', 'L298N driver'), b('Moteurs DC', 'DC motors')],
    feats: [
      b('Véhicule radiocommandé miniature', 'Miniature RC vehicle'),
      b('Buzzer ajouté', 'Buzzer added'),
      b('Interface corrigée', 'Interface fixed'),
      b('Câblage clair et lisible', 'Clear, readable wiring'),
      b('Grosse montée en compréhension et en organisation', 'Big step up in understanding and organisation')
    ]
  },
  p11: {
    stack: [
      ['Blender', 'mech', b('Logiciel 3D', '3D software')],
      ['Modélisation', 'mech', b('Création des objets et scènes', 'Object and scene creation')],
      ['Rigging', 'mech', b('Squelettes et animation', 'Skeletons and animation')],
      ['Cycles', 'mech', b('Moteur de rendu (plusieurs heures par rendu)', 'Render engine (several hours per render)')],
      ['Assets commerciaux', 'mech', b('Éléments réutilisés pour de la publicité', 'Elements reused for advertising')]
    ],
    specs: [
      [b('Type', 'Type'), b('Projet personnel', 'Personal project')],
      [b('Logiciel', 'Software'), 'Blender'],
      [b('Rendu', 'Render'), b('Cycles, plusieurs heures', 'Cycles, several hours')],
      [b('Usage', 'Use'), b('Assets et éléments commercialisés pour la pub', 'Assets and elements sold for advertising')]
    ],
    kpis: [['h', b('temps de rendu', 'render time')]],
    flow: [b('Modélisation', 'Modeling'), b('Rigging', 'Rigging'), b('Animation', 'Animation'), b('Rendu Cycles', 'Cycles render')],
    feats: [b('Animations et scènes 3D', '3D animations and scenes'), b('Effets visuels', 'Visual effects'), b('Assets commercialisés pour la publicité', 'Assets sold for advertising')]
  },
  p12: {
    stack: [
      ['TypeScript', 'soft', b('Langage', 'Language')],
      ['Firebase', 'web', b('Base cloud, authentification, sécurité', 'Cloud database, authentication, security')],
      ['Cloudflare', 'web', b('Sécurité et réseau', 'Security and networking')],
      ['Stripe', 'web', b('Abonnement annuel', 'Annual subscription')],
      ['GoDaddy', 'web', b('Noms de domaine', 'Domain names')],
      ['SaaS', 'web', b('Espace sur mesure lié au compte client', 'Custom space linked to the client account')]
    ],
    specs: [
      [b('Modèle', 'Model'), b('SaaS, abonnement annuel (Stripe)', 'SaaS, annual subscription (Stripe)')],
      [b('Clients', 'Clients'), b('3 SAS sur mesure (dont une location de véhicules)', '3 custom SAS (including a vehicle rental)')],
      [b('Livrable', 'Deliverable'), b('SAS lié au compte, accessible depuis la plateforme', 'SAS linked to the account, accessible from the platform')],
      [b('Sécurité', 'Security'), 'Firebase + Cloudflare'],
      [b('Domaines', 'Domains'), 'GoDaddy']
    ],
    kpis: [['3', b('clients', 'clients')]],
    flow: [b('Client', 'Client'), b('Abonnement Stripe', 'Stripe subscription'), b('SAS sur mesure', 'Custom SAS'), b('Compte client', 'Client account')],
    feats: [
      b('Souscription en ligne avec paiement annuel', 'Online subscription with annual payment'),
      b('SAS sur mesure lié au compte', 'Custom SAS linked to the account'),
      b('Sécurité Firebase & Cloudflare', 'Firebase & Cloudflare security'),
      b('Noms de domaine gérés', 'Managed domain names')
    ]
  },
  p13: {
    stack: [
      ['ESP32 (DiagBoard)', 'elec', b('Carte de mesure, envoie les données en WiFi', 'Measurement board, sends data over WiFi')],
      ['ADS1115', 'elec', b('ADC 16 bits I²C, 3 voies de tension (±6,144 V)', '16-bit I²C ADC, 3 voltage channels (±6.144 V)')],
      ['ACS712 5 A', 'elec', b('Capteur de courant à effet Hall, 185 mV/A', 'Hall-effect current sensor, 185 mV/A')],
      ['OLED SSD1306 128×64', 'elec', b('Valeurs live et état de session', 'Live values and session status')],
      ['Python 3.13', 'soft', b('Langage principal', 'Main language')],
      ['FastAPI + WebSocket', 'web', b('Serveur, streaming des réponses en direct', 'Server, live response streaming')],
      ['llama-cpp-python', 'ai', b('Exécution du modèle GGUF en local (CUDA)', 'Local GGUF model runtime (CUDA)')],
      ['Gemma 4 E4B Q4_K_M', 'ai', b('LLM local quantifié 4 bits', 'Local 4-bit quantised LLM')],
      ['sentence-transformers', 'ai', b('Recherche sémantique dans la mémoire', 'Semantic search in memory')],
      ['Classifieurs Scikit-learn', 'ai', b('Complexité et triage des requêtes', 'Request complexity and triage')],
      ['QLoRA (Unsloth + TRL)', 'ai', b('Fine-tuning sur la mémoire de Bee (≈ 494 exemples)', 'Fine-tuning on Bee’s memory (≈ 494 samples)')],
      ['DuckDuckGo + BeautifulSoup', 'web', b('Recherche web quand la question l’exige', 'Web search when a question needs it')],
      ['fpdf2 + PyMuPDF', 'soft', b('Rapports PDF techniques et lecture de PDF', 'Technical PDF reports and PDF reading')]
    ],
    specs: [
      [b('Modèle', 'Model'), 'gemma-4-E4B-it-Q4_K_M.gguf'],
      [b('Quantification', 'Quantisation'), b('4 bits (Q4_K_M)', '4-bit (Q4_K_M)')],
      [b('Matériel de test', 'Test hardware'), 'RTX 4060 Ti 8 GB · 32 GB RAM'],
      [b('Contexte', 'Context'), b('20 000 tokens', '20,000 tokens')],
      [b('Exécution', 'Runtime'), b('100 % locale, sans clé API', '100% local, no API key')],
      [b('Mémoires', 'Memories'), b('4 persistantes', '4 persistent')],
      [b('Mesures', 'Measurements'), b('3 tensions + 1 courant', '3 voltages + 1 current')],
      [b('Compétences (skills)', 'Skills'), b('11 domaines auto-détectés', '11 auto-detected domains')]
    ],
    kpis: [['4', b('mémoires', 'memories')], ['4 bit', b('quantif.', 'quant.')], ['11', b('skills', 'skills')]],
    flow: [
      b('Capteurs ADS1115 / ACS712', 'ADS1115 / ACS712 sensors'),
      b('ESP32 → WiFi', 'ESP32 → WiFi'),
      b('Serveur FastAPI', 'FastAPI server'),
      b('Gemma 4B Q4_K_M + mémoires', 'Gemma 4B Q4_K_M + memories'),
      b('Rapport de diagnostic', 'Diagnostic report')
    ],
    feats: [
      b('Base de connaissances avec recherche sémantique', 'Knowledge base with semantic search'),
      b('Historique (jusqu’à 600 messages)', 'History (up to 600 messages)'),
      b('Mémoire permanente', 'Permanent memory'),
      b('Notes de session', 'Session notes'),
      b('Mesure de tension et de courant en temps réel', 'Real-time voltage and current measurement'),
      b('Sessions de diagnostic avec statistiques (moyenne, écart-type, tendance)', 'Diagnostic sessions with statistics (mean, std-dev, trend)'),
      b('Génération de rapports de diagnostic PDF', 'PDF diagnostic-report generation'),
      b('Pipeline de fine-tuning QLoRA sur sa propre mémoire', 'QLoRA fine-tuning pipeline on its own memory')
    ]
  }
};
