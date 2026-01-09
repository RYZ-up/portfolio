import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import './App.css';
import { incrementVisitCount } from './firebase';
import { sendContactEmail } from './resend';

// Lazy load du composant Silk (Three.js) - chargé uniquement sur la page home
const Silk = lazy(() => import('./Silk'));

// Animation timing constant - MUST match CSS --exit-duration
const EXIT_DURATION = 500;

// Translations object for internationalization (FR/EN)
const translations = {
  FR: {
    home: {
      welcomeTitle: "Bienvenue sur le site de Rayane YAZID",
      welcomeSubtitle: "Futur concepteur de solutions",
      subtitle: "Futur concepteur de solutions",
      welcomeMessage: "Découvrez mon parcours professionnel et mes compétences.",
      discoverButton: "Découvrir",
      visits: "visites"
    },
    navigation: {
      back: "Retour"
    },
    cards: {
      parcours: { title: "Parcours", description: "Mon cheminement professionnel", label: "Explorer mon parcours" },
      projets: { title: "Projets", description: "Découvrez mes réalisations", label: "Voir mes projets" },
      competences: { title: "Compétences", description: "Mes domaines d'expertise", label: "Découvrir mes compétences" },
      apropos: { title: "À propos", description: "En savoir plus sur moi", label: "Me découvrir" }
    },
    parcours: {
      badge: "Expérience",
      title: "Mon Parcours",
      future_label: "Objectif",
      items: [
        {
          title: "Lycée Léon Blum",
          period: "2021 - 2023",
          description: "Baccalauréat général, spécialité Mathématiques, Physique-Chimie et SVT. Passionné par les sciences exactes."
        },
        {
          title: "Licence SPI - UPEC",
          period: "2023 - 2026",
          description: "Sciences Pour l'Ingénieur, option Génie Électronique et Informatique. L1 (14/20), L2 (13/20), actuellement en L3 (14/20). Validation solide du cursus."
        },
        {
          title: "Stage de fin de licence",
          period: "Avril 2026 (À venir)",
          description: "Recherche de stage en génie électrique, mécanique ou informatique embarquée pour valider la licence."
        },
        {
          title: "Master",
          period: "2026 - 2028",
          description: "Poursuite d'études en Master Sciences pour l'Ingénieur (Université d'excellence), spécialisation Systèmes Embarqués."
        }
      ]
    },
    competences: {
      pageTitle: "Mes Compétences",
      selectCategory: "Sélectionnez une catégorie",
      globalMastery: "Maîtrise globale",
      categories: {
        soft: { title: "Outils & Logiciels", description: "Maîtrise des outils de design, de versioning et des environnements DevOps.", label: "Découvrir mes outils" },
        dev: { title: "Développement", description: "Technologies et frameworks de développement web, IoT et applications mobiles.", label: "Explorer le Dev" },
        certif: { title: "Sciences & Certifications", description: "Compétences scientifiques théoriques approfondies et certifications professionnelles.", label: "Découvrir" }
      },
      skillPopup: {
        mastery: "Maîtrise",
        experience: "Expérience",
        details: "Détails"
      }
    },
    projets: {
      pageTitle: "Mes Projets",
      openProject: "Ouvrir le projet",
      soundOn: "Son activé",
      soundOff: "Son désactivé",
      previous: "Précédent",
      next: "Suivant"
    },
    apropos: {
      pageTitle: "À Propos",
      title: "Sans limites",
      paragraphs: [
        "Passionné par la technologie et l'innovation, je m'efforce de créer des solutions qui repoussent les limites du possible.",
        "Mon approche combine créativité technique et rigueur méthodologique pour transformer des idées en réalité concrète.",
        "Toujours à la recherche de nouveaux défis, je crois en l'apprentissage continu et en l'amélioration constante.",
        "Nota Bene : Les pourcentages affichés dans la section Compétences sont relatifs aux attentes académiques d'un élève ingénieur de mon niveau (L3), et ne prétendent pas rivaliser avec l'expertise senior de l'industrie."
      ],
      form: {
        step1Title: "Votre email",
        step2Title: "Votre téléphone",
        step3Title: "Votre message",
        emailPlaceholder: "exemple@email.com",
        phonePlaceholder: "+33 6 12 34 56 78",
        messagePlaceholder: "Bonjour, je souhaite...",
        previous: "Précédent",
        next: "Suivant",
        send: "Envoyer",
        sending: "Envoi en cours..."
      }
    },
    popups: {
      messageSent: {
        title: "Message envoyé !",
        message: "Votre message a bien été envoyé. Je vous répondrai dans les plus brefs délais.",
        button: "Fermer"
      }
    },
    profiles: {
      cv: {
        preview: "Aperçu du CV",
        download: "Télécharger CV"
      },
      github: {
        visit: "Visiter mon GitHub",
        repos: "Repos",
        commits: "Commits",
        stars: "Stars",
        followers: "Followers"
      },
      linkedin: {
        viewProfile: "Voir mon profil LinkedIn",
        connections: "Connexions",
        recommendations: "Recommandations"
      },
      tryhackme: {
        viewProfile: "Voir mon profil TryHackMe",
        rooms: "Rooms",
        streak: "Streak"
      }
    },
    availability: {
      available: "Disponible"
    },
    footer: {
      copyright: "© 2026 Rayane YAZID - Tous droits réservés"
    }
  },
  EN: {
    home: {
      welcomeTitle: "Welcome to Rayane YAZID's Website",
      welcomeSubtitle: "Future Solutions Designer",
      subtitle: "Future Solutions Designer",
      welcomeMessage: "Discover my professional journey and skills.",
      discoverButton: "Discover",
      visits: "visits"
    },
    navigation: {
      back: "Back"
    },
    cards: {
      parcours: { title: "Journey", description: "My professional path", label: "Explore my journey" },
      projets: { title: "Projects", description: "Discover my achievements", label: "View my projects" },
      competences: { title: "Skills", description: "My areas of expertise", label: "Discover my skills" },
      apropos: { title: "About", description: "Learn more about me", label: "Discover me" }
    },
    parcours: {
      badge: "Experience",
      title: "My Journey",
      future_label: "Goal",
      items: [
        {
          title: "Lycée Léon Blum",
          period: "2021 - 2023",
          description: "General Baccalaureate, specialized in Mathematics, Physics-Chemistry and Earth Sciences. Passionate about exact sciences."
        },
        {
          title: "Bachelor SPI - UPEC",
          period: "2023 - 2026",
          description: "Engineering Sciences, option Electronics and Computer Engineering. Excellent academic record."
        },
        {
          title: "Bachelor Internship",
          period: "April 2026 (Upcoming)",
          description: "Seeking internship in electrical engineering, mechanics or embedded systems to validate the degree."
        },
        {
          title: "Master",
          period: "2026 - 2028",
          description: "Pursuing studies in Master of Engineering Sciences (Excellence University), specialization in Embedded Systems."
        }
      ]
    },
    competences: {
      pageTitle: "My Skills",
      selectCategory: "Select a category",
      globalMastery: "Overall Mastery",
      categories: {
        soft: { title: "Tools & Software", description: "Mastery of design tools, versioning, and DevOps environments.", label: "Discover my tools" },
        dev: { title: "Development", description: "Web, IoT, and mobile development technologies and frameworks.", label: "Explore Dev" },
        certif: { title: "Sciences & Certifications", description: "In-depth theoretical scientific skills and professional certifications.", label: "Discover" }
      },
      skillPopup: {
        mastery: "Mastery",
        experience: "Experience",
        details: "Details"
      }
    },
    projets: {
      pageTitle: "My Projects",
      openProject: "Open project",
      soundOn: "Sound on",
      soundOff: "Sound off",
      previous: "Previous",
      next: "Next"
    },
    apropos: {
      pageTitle: "About",
      title: "Without limits",
      paragraphs: [
        "Passionate about technology and innovation, I strive to create solutions that push the boundaries of what's possible.",
        "My approach combines technical creativity and methodological rigor to transform ideas into concrete reality.",
        "Always seeking new challenges, I believe in continuous learning and constant improvement."
      ],
      form: {
        step1Title: "Your email",
        step2Title: "Your phone",
        step3Title: "Your message",
        emailPlaceholder: "example@email.com",
        phonePlaceholder: "+1 234 567 8900",
        messagePlaceholder: "Hello, I would like to...",
        previous: "Previous",
        next: "Next",
        send: "Send",
        sending: "Sending..."
      }
    },
    popups: {
      messageSent: {
        title: "Message sent!",
        message: "Your message has been successfully sent. I will reply as soon as possible.",
        button: "Close"
      }
    },
    profiles: {
      cv: {
        preview: "CV Preview",
        download: "Download resume"
      },
      github: {
        visit: "Visit my GitHub",
        repos: "Repos",
        commits: "Commits",
        stars: "Stars",
        followers: "Followers"
      },
      linkedin: {
        viewProfile: "View my LinkedIn profile",
        connections: "Connections",
        recommendations: "Recommendations"
      },
      tryhackme: {
        viewProfile: "View my TryHackMe profile",
        rooms: "Rooms",
        streak: "Streak"
      }
    },
    availability: {
      available: "Available"
    },
    footer: {
      copyright: "© 2026 Rayane YAZID - All rights reserved"
    }
  }
};

// Translation helper function
const t = (path, lang = 'FR') => {
  const keys = path.split('.');
  let value = translations[lang];
  for (const key of keys) {
    if (value === undefined) return path;
    value = value[key];
  }
  return value || path;
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isHighRes, setIsHighRes] = useState(false); // Toggle Low/High Res
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isProjectExiting, setIsProjectExiting] = useState(false);
  const [visitCount, setVisitCount] = useState(626);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showMessageSentPopup, setShowMessageSentPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('FR');
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const [selectedCompetenceCategory, setSelectedCompetenceCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isWelcomePopupClosing, setIsWelcomePopupClosing] = useState(false);
  const [isMessagePopupClosing, setIsMessagePopupClosing] = useState(false);
  const [isSkillPopupClosing, setIsSkillPopupClosing] = useState(false);
  const [showCvPopup, setShowCvPopup] = useState(false);
  const [isCvPopupClosing, setIsCvPopupClosing] = useState(false);
  // État pour stocker les données du formulaire multi-étapes (persistance entre les étapes)
  const [formState, setFormState] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({ // État pour les erreurs de validation
    email: '',
    phone: '',
    message: ''
  });
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const rafRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [socialMenuOpen, setSocialMenuOpen] = useState(false);
  const [isSocialMenuClosing, setIsSocialMenuClosing] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [visibleParcoursItems, setVisibleParcoursItems] = useState(new Set());
  const parcoursRefs = useRef([]);
  // Refs pour le slide to close social menu
  const touchStartRef = useRef(0);
  const socialContentRef = useRef(null);

  // Détection du mode mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset video loading state when project changes
  useEffect(() => {
    setIsVideoLoading(true);
  }, [currentProject]);

  // Intersection Observer pour les animations au scroll du parcours
  useEffect(() => {
    if (currentPage !== 'parcours') return;

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.15
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const itemId = entry.target?.dataset?.parcoursId;
        if (entry.isIntersecting && itemId) {
          setVisibleParcoursItems(prev => new Set([...prev, itemId]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const currentRefs = parcoursRefs.current;
    const validRefs = currentRefs.filter(ref => ref !== null && ref !== undefined);
    validRefs.forEach((ref) => {
      observer.observe(ref);
    });

    return () => {
      validRefs.forEach((ref) => {
        if (ref) {
          try {
            observer.unobserve(ref);
          } catch (e) {
            // Ignore
          }
        }
      });
      observer.disconnect();
    };
  }, [currentPage]);

  // Fonction pour fermer le menu social avec animation
  const handleCloseSocialMenu = () => {
    setIsSocialMenuClosing(true);
    setTimeout(() => {
      setSocialMenuOpen(false);
      setIsSocialMenuClosing(false);
    }, 300); // Durée de l'animation
  };

  // Fonction optimisée pour gérer le mouvement de souris avec requestAnimationFrame
  const handleOptimizedMouseMove = (e) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const target = e.currentTarget;
    if (!target) return;

    rafRef.current = requestAnimationFrame(() => {
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.style.setProperty('--mouse-x', `${x}px`);
      target.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  // Fonction pour positionner intelligemment les previews (éviter débordement)
  const handlePreviewPosition = (e, previewHeight = 400) => {
    const preview = e.currentTarget.querySelector('.btn-preview');
    if (preview) {
      let left = e.clientX + 15;
      let top = e.clientY - previewHeight / 2;

      // Empêcher débordement droit
      if (left + 350 > window.innerWidth) {
        left = e.clientX - 365;
      }

      // Empêcher débordement haut/bas
      if (top < 10) top = 10;
      if (top + previewHeight > window.innerHeight - 10) {
        top = window.innerHeight - previewHeight - 10;
      }

      preview.style.left = `${left}px`;
      preview.style.top = `${top}px`;
    }
  };

  // Handlers pour le slide-to-close du menu social
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!socialContentRef.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartRef.current;

    // Si on tire vers le bas, on applique la translation
    if (deltaY > 0) {
      socialContentRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (!socialContentRef.current) return;
    const currentY = e.changedTouches[0].clientY;
    const deltaY = currentY - touchStartRef.current;

    // Seuil de fermeture (100px)
    if (deltaY > 100) {
      handleCloseSocialMenu();
    } else {
      // Rebond : retour à la position initiale
      socialContentRef.current.style.transform = '';
      socialContentRef.current.style.transition = 'transform 0.3s ease-out';
      setTimeout(() => {
        if (socialContentRef.current) {
          socialContentRef.current.style.transition = '';
        }
      }, 300);
    }
  };

  // Liste des vidéos qui ont une version compressée disponible
  const videosWithCompressedVersion = [
    '/videos/parcours.mp4',
    '/videos/competences.mp4',
    '/videos/contact.mp4',
    '/videos/projets/1.mp4',
    '/videos/projets/bras.mp4',
    '/videos/projets/portfolio.mp4',
    '/videos/projets/vitrine.mp4',
    '/videos/projets/chironv2.mp4',
    '/videos/projets/agentsia.mp4',
    '/videos/projets/logicielpython.mp4'
  ];

  // Helper pour choisir la source vidéo (High/Low Res)
  const getVideoSrc = (path) => {
    if (!path || !path.endsWith('.mp4')) return path;
    // En mode haute qualité, toujours utiliser la vidéo originale
    if (isHighRes) return path;
    // En mode basse qualité, utiliser la version compressée si elle existe
    if (videosWithCompressedVersion.includes(path)) {
      return path.replace('.mp4', '_compressed.mp4');
    }
    // Sinon utiliser la vidéo originale
    return path;
  };

  // Données en dur pour le parcours
  const parcours = [
    {
      id: 1,
      title: 'Lycée Léon Blum',
      period: '2021 - 2023',
      description: 'Baccalauréat général, spécialité Mathématiques, Physique-Chimie et SVT. Passionné par les sciences exactes.',
      order: 1
    },
    {
      id: 2,
      title: 'Licence SPI - UPEC',
      period: '2023 - 2026',
      description: 'Sciences Pour l\'Ingénieur, option Génie Électronique et Informatique. L1 (14/20), L2 (13/20), actuellement en L3 (14/20). Validation solide du cursus.',
      order: 2
    },
    {
      id: 3,
      title: 'Stage de fin de licence',
      period: 'Avril 2026 (À venir)',
      description: 'Recherche de stage en génie électrique, mécanique ou informatique embarquée pour valider la licence.',
      order: 3,
      future: true
    },
    {
      id: 4,
      title: 'Master',
      period: '2026 - 2028',
      description: 'Poursuite d\'études en Master Sciences pour l\'Ingénieur (Université d\'excellence), spécialisation Systèmes Embarqués.',
      order: 4,
      future: true
    }
  ];

  // Catégories de compétences pour la page intermédiaire (3 catégories)
  const competenceCategories = [
    {
      id: 'soft',
      title: 'Outils & Logiciels',
      description: 'Maîtrise des outils de design, de versioning et des environnements DevOps.',
      video: getVideoSrc('/videos/soft.mp4'),
      gradient: 'linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(15,15,15,0.98) 100%)',
      label: 'Découvrir mes outils'
    },
    {
      id: 'dev',
      title: 'Développement',
      description: 'Technologies et frameworks de développement web, IoT et applications mobiles.',
      video: getVideoSrc('/videos/dev.mp4'),
      gradient: 'linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(15,15,15,0.98) 100%)',
      label: 'Explorer le Dev'
    },
    {
      id: 'certif',
      title: 'Sciences & Certifications',
      description: 'Compétences scientifiques théoriques approfondies et certifications professionnelles.',
      video: getVideoSrc('/videos/certi.mp4'),
      gradient: 'linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(15,15,15,0.98) 100%)',
      label: 'Découvrir'
    }
  ];

  // Données détaillées des compétences organisées par "bacs"
  const competencesData = [
    {
      title: 'Langages de programmation',
      categoryId: 'dev',
      skills: [
        { id: 1, name: 'Python', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', description: 'Langage polyvalent pour automation, data science et backend.', details: 'Scripts, Django/Flask, Traitement de données.', experience: '4 ans' },
        { id: 2, name: 'C', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg', description: 'Programmation bas niveau et systèmes embarqués.', details: 'Gestion mémoire, drivers, microcontrôleurs.', experience: '2 ans' },
        { id: 3, name: 'C++', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', description: 'Langage performant pour systèmes complexes.', details: 'POO, templates, STL.', experience: '2 ans' },
        { id: 4, name: 'VHDL', level: 75, icon: 'https://cdn.prod.website-files.com/6047a9e35e5dc54ac86ddd90/638a61921edcd6b61220a23a_XrbJ07KiqWOBrxBtkJGoAUdyjwynYp-eC0MPmL1RoQU.png', description: 'Langage de description matérielle pour FPGA.', details: 'Conception logique, bancs de test.', experience: '1 an' },
        { id: 5, name: 'SQL', level: 65, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg', description: 'Langage de requête pour bases de données relationnelles.', details: 'Requêtes complexes, optimisation d\'index.', experience: '1 an' },
        { id: 6, name: 'PowerShell', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg', description: 'Automatisation et scripting sous Windows.', details: 'Administration système, scripts de déploiement.', experience: '2 ans' },
        { id: 7, name: 'MATLAB', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg', description: 'Calcul numérique et simulation scientifique.', details: 'Traitement de signal, modélisation physique.', experience: '2 ans' },
        { id: 47, name: 'Scilab', level: 55, icon: 'https://www.scilab.org/themes/bs43ds/img/scilab-logo.png?v20201103', description: 'Calcul numérique open source.', details: 'Analyse de données, Simulation, Algèbre linéaire.', experience: '6 mois' },
        { id: 8, name: 'Assembleur', level: 70, icon: 'https://img.icons8.com/?size=100&id=gVK745a4Vaur&format=png&color=000000', description: 'Programmation au plus proche du processeur.', details: 'Optimisation critique, architecture x86/ARM.', experience: '1 an' }
      ]
    },
    {
      title: 'Développement Web & Mobile',
      categoryId: 'dev',
      skills: [
        { id: 9, name: 'HTML', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', description: 'Structure sémantique du web.', details: 'HTML5, SEO, Accessibilité.', experience: '3 ans' },
        { id: 10, name: 'CSS', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', description: 'Stylisation et mise en page moderne.', details: 'Flexbox, Grid, Animations, Responsive.', experience: '3 ans' },
        { id: 11, name: 'JavaScript', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', description: 'Langage dynamique du web.', details: 'ES6+, Asynchrone, DOM Manipulation.', experience: '2 ans' },
        { id: 12, name: 'React', level: 65, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', description: 'Bibliothèque UI moderne.', details: 'Hooks, Context, Redux, Performance.', experience: '1 an' },
        { id: 13, name: 'Swift', level: 60, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg', description: 'Développement iOS natif.', details: 'SwiftUI, UIKit, CoreData.', experience: '1 an' }
      ]
    },
    {
      title: 'Outils de développement / IDE / Simulation / OS',
      categoryId: 'soft',
      skills: [
        { id: 14, name: 'VS Code', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', description: 'Éditeur principal.', details: 'Extensions, Git integration, Workflow.', experience: '3 ans' },
        { id: 15, name: 'Arduino', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg', description: 'Prototypage rapide IoT.', details: 'Bibliothèques, ESP32/ESP8266.', experience: '3 ans' },
        { id: 16, name: 'MPLAB X', level: 75, icon: 'https://imgs.search.brave.com/CPDpCoMOPGBLyVSWRUy9WevZa5cR9pJp9-MJosGzWRw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5wbmdhYWEuY29t/LzU2My81Njg1NTYz/LW1pZGRsZS5wbmc', description: 'IDE pour microcontrôleurs Microchip.', details: 'Débogage matériel, programmation PIC.', experience: '1 an' },
        { id: 17, name: 'Vivado', level: 80, icon: 'https://imgs.search.brave.com/Txc-B-IYwrxbf9pcJ_wdyGEQKxfpnsTPKAV9uTUUnP0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/eGlsaW54LmNvbS9j/b250ZW50L2RhbS94/aWxpbngvaW1ncy9w/cm9kdWN0cy92aXZh/ZG8vdml2YWRvLW1s/L3ZpdmFkby1oZXJv/LWxvZ28td2ViLnBu/Zw', description: 'Conception logicielle pour FPGA Xilinx.', details: 'Synthèse, Implémentation, Simulation.', experience: '1 an' },
        { id: 18, name: 'Proteus', level: 85, icon: 'https://upload.wikimedia.org/wikipedia/en/5/5a/Proteus_Design_Suite_Atom_Logo.png', description: 'Simulation de circuits électroniques.', details: 'Schématique, PCB Design, Simulation temps réel.', experience: '2 ans' },
        { id: 45, name: 'KiCad', level: 80, icon: 'https://upload.wikimedia.org/wikipedia/commons/5/59/KiCad-Logo.svg', description: 'Conception de circuits imprimés open source.', details: 'Schématique, Routage PCB, Bibliothèques 3D.', experience: '1 an' },
        { id: 46, name: 'Logisim', level: 90, icon: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Logisim-icon.svg', description: 'Simulation de circuits logiques numériques.', details: 'Portes logiques, Circuits combinatoires/séquentiels, Automates.', experience: '2 ans' },
        { id: 19, name: 'Windows', level: 100, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg', description: 'OS principal pour outils CAO.', details: 'Powershell, Administration, WSL.', experience: 'Quotidien' },
        { id: 20, name: 'Linux', level: 65, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', description: 'Serveurs et développement embarqué.', details: 'Bash, SSH, Debian/Ubuntu.', experience: '2 ans' },
        { id: 21, name: 'MacOS', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg', description: 'Environnement de développement mobile.', details: 'Unix, Brew, Zsh.', experience: 'Au besoin' },
        { id: 42, name: 'Jupyter Notebook', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg', description: 'Environnement interactif pour data science et ML.', details: 'Python, R, visualisations.', experience: '2 ans' },
        { id: 43, name: 'Anaconda', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg', description: 'Distribution Python pour data science.', details: 'Gestion d\'environnements.', experience: '2 ans' }
      ]
    },
    {
      title: 'DevOps / Systèmes / Bases de données',
      categoryId: 'dev',
      skills: [
        { id: 22, name: 'Docker', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', description: 'Conteneurisation d\'applications.', details: 'Compose, Swarm, Image optimization.', experience: '1 an' },
        { id: 23, name: 'Cloudflare', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg', description: 'Sécurité et performance web.', details: 'DNS, CDN, Workers, WAF.', experience: '1 an' },
        { id: 24, name: 'GitLab', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg', description: 'Forge logicielle et CI/CD.', details: 'Pipelines, Artifacts, Runner.', experience: '1 an' },
        { id: 25, name: 'n8n', level: 65, icon: 'https://n8n.io/brandguidelines/logo-white.svg', description: 'Automatisation de workflows low-code.', details: 'Noeuds personnalisés, Webhooks.', experience: '1 an' },
        { id: 26, name: 'VirtualBox', level: 85, icon: 'https://imgs.search.brave.com/nk6zxX12kkA3g7CU2uCdu64afli66vnVh15g08w4rxs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pY29u/bG9nb3ZlY3Rvci5j/b20vdXBsb2Fkcy9p/bWFnZXMvMjAyNS8w/Ni9sZy02ODRiNDVl/NGEzZDAzLVZpcnR1/YWxCb3gud2VicA', description: 'Virtualisation de systèmes d\'exploitation.', details: 'Snapshots, Réseaux virtuels.', experience: '3 ans' },
        { id: 27, name: 'Firebase', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', description: 'Base de données NoSQL temps réel.', details: 'Indexation, Rules, Realtime updates.', experience: '1 an' },
        { id: 28, name: 'DB Browser (SQLite)', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg', description: 'Outil visuel pour bases de données SQLite.', details: 'Audit de données, requêtes SQL, import/export.', experience: '2 ans' },
        { id: 29, name: 'Supabase', level: 60, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', description: 'Plateforme BaaS alternative open source.', details: 'PostgreSQL, Edge Functions.', experience: '6 mois' },
        { id: 30, name: 'Synology', level: 75, icon: 'https://imgs.search.brave.com/giLsfVkKQ6Y7BI9nbyrsccD4kzhYAR5UWLOtlW4y4b4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzM0LzIvc3lub2xv/Z3ktbG9nby1wbmdf/c2Vla2xvZ28tMzQ4/MjU2LnBuZw', description: 'Gestion de serveurs de stockage réseau.', details: 'Docker, RAID, Cloud privé.', experience: '2 ans' }
      ]
    },
    {
      title: 'Conception / Data / Bureautique',
      categoryId: 'soft',
      skills: [
        { id: 31, name: 'SolidWorks', level: 70, icon: 'https://imgs.search.brave.com/f4CtN5r7WD3HW-807h6MJ0gAPIvyGoiKfWa0SipcYoc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzEyLzIvc29saWR3/b3Jrcy1sb2dvLXBu/Z19zZWVrbG9nby0x/MjkxMjUucG5n', description: 'Conception mécanique assistée par ordinateur.', details: 'Modélisation 3D, Mise en plan, Assemblage.', experience: '2 ans' },
        { id: 32, name: 'Power BI', level: 65, icon: 'https://powerbi.microsoft.com/pictures/application-logos/svg/powerbi.svg', description: 'Business Intelligence et analyse de données.', details: 'DAX, Visualisations interactives.', experience: '1 an' },
        { id: 33, name: 'Office 365', level: 100, icon: 'https://imgs.search.brave.com/YZvF6a4F_uGc4UMSKWjEYPnR0Zyf4Uq3C6VDsMtkKLE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDIvTWljcm9zb2Z0/LU9mZmljZS0zNjUt/RW1ibGVtLTcwMHgz/OTQucG5n', description: 'Suite bureautique professionnelle.', details: 'Excel avancé, PowerPoint, Word.', experience: '10 ans' },
        { id: 34, name: 'Blender', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg', description: 'Création et rendu 3D.', details: 'Modélisation, Texturing, Animation.', experience: '3 ans' },
        { id: 44, name: 'Fusion 360', level: 60, icon: 'https://imgs.search.brave.com/TZ_ehou2OdkZlsjQpcbW33PJjXgGhBfSnUSyU-luo4w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQ4LzIvYXV0b2Rl/c2stZnVzaW9uLTM2/MC1sb2dvLXBuZ19z/ZWVrbG9nby00ODI0/MDAucG5n', description: 'CAD/CAM cloud pour conception 3D.', details: 'Modélisation paramétrique, simulation, FAO.', experience: '1 an' }
      ]
    },
    {
      title: "Matières d'ingénierie & Certifications (BAC+3)",
      categoryId: 'certif',
      skills: [
        { id: 35, name: 'Mathématiques', level: 95, icon: '/images/math.png', description: "Fondamentaux pour l'ingénierie.", details: 'Algèbre, Analyse, Statistiques.', experience: 'Bac+3' },
        { id: 36, name: 'Analyse fréquentielle', level: 90, icon: '/images/analyse-frequentielle.png', description: 'Étude des signaux dans le domaine fréquentiel.', details: 'Fourier, Laplace, Filtrage.', experience: 'Bac+3' },
        { id: 37, name: 'Mécanique', level: 85, icon: '/images/mecanique.png', description: 'Étude des forces et des mouvements.', details: 'Statique, Dynamique, Bernoulli.', experience: 'Bac+3' },
        { id: 38, name: 'Microcontrôleurs', level: 100, icon: '/images/microcontroleur.png', description: 'Programmation et architecture puce.', details: 'Timers, Interrupts, I/O.', experience: 'Bac+3' },
        { id: 39, name: 'Capteurs', level: 95, icon: '/images/capteur.png', description: 'Acquisition de données physiques.', details: 'Analogique, Numérique, Conditionnement.', experience: 'Bac+3' },
        { id: 40, name: 'Instrumentation', level: 90, icon: '/images/instrumentation.png', description: 'Maillon complet de mesure.', details: 'Amplification, CAN, Traitement.', experience: 'Bac+3' },
        { id: 41, name: 'Ondes', level: 85, icon: '/images/onde.png', description: 'Étude des phénomènes vibratoires.', details: 'Résonance, Propagation.', experience: 'Bac+3' }
      ]
    },
    {
      title: "Certifications Visées / En cours",
      categoryId: 'certif',
      skills: [
        { id: 100, name: 'TOEIC', level: 100, icon: 'https://imgs.search.brave.com/gZQNNQ1uuz27dDTjBVuT73x6MihimFUW8--iCBb_agU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pY29u/bG9nb3ZlY3Rvci5j/b20vdXBsb2Fkcy9p/bWFnZXMvMjAyNS8x/MC9sZy02OGZmZGUz/NzAxMWY3LVRPRUlD/LndlYnA', description: 'Anglais Professionnel.', details: 'Niveau B2 solide / Visé C1.', experience: 'En cours' },
        { id: 101, name: 'Certificat Voltaire', level: 85, icon: 'https://www.certificat-voltaire.fr/wp-content/uploads/2022/09/logo-cv.svg', description: 'Maîtrise de l\'orthographe française.', details: 'Certification reconnue en entreprise.', experience: 'En cours' },
        { id: 102, name: 'Google IT Automation', level: 55, icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png', description: 'Automatisation avec Python.', details: 'Scripts, Git, Gestion de config.', experience: 'Visé' },
        { id: 103, name: 'Google Cloud', level: 45, icon: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg', description: 'Fondamentaux Cloud Computing.', details: 'Infrastructure, Services.', experience: 'Visé' },
        { id: 104, name: 'TOSA', level: 65, icon: 'https://static.tosa.org/tosaorg_1/images/logos/tosa.png', description: 'Compétences bureautiques & digitales.', details: 'Excel, Code.', experience: 'Visé' },
        { id: 105, name: 'LinkedIn Learning', level: 25, icon: 'https://imgs.search.brave.com/vLUdu_A82FxPp6su2OwFmtRkdaUPrxVZ8foNfpNCMFQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pY29u/bG9nb3ZlY3Rvci5j/b20vdXBsb2Fkcy9p/bWFnZXMvMjAyNS8w/Ni9sZy02ODVlNDA0/ZWQyMDE5LUxpbmtl/ZEluLUxlYXJuaW5n/LndlYnA', description: 'Formation continue diverse.', details: 'Soft skills, Tech trends.', experience: 'À venir' }
      ]
    }
  ];

  // Mapping des technologies vers leurs icônes
  const techIcons = {
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'Arduino IDE': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
    'ESP32': 'https://www.espressif.com/sites/all/themes/espressif/logo-black.svg',
    'Cloudflare': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
    'WiFi': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <line x1="12" y1="20" x2="12.01" y2="20"></line>
      </svg>
    ),
    'USB-C': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 12V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3"></path>
        <rect x="9" y="1" width="6" height="4" rx="1"></rect>
      </svg>
    ),
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Three.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
  };

  // Données en dur pour les projets
  const projets = [
    {
      id: 1,
      title: 'Assistant Robot IoT',
      description: 'Assistant personnel intelligent conçu avec ESP32, écran OLED et connexion WiFi. Affiche la météo, l\'heure, et réagit de manière aléatoire selon le contexte. Point d\'accès WiFi pour configuration initiale. Fait main avec soudures personnalisées et mis en vente sur Etsy.',
      technologies: 'C++, Arduino IDE, ESP32, Cloudflare, WiFi, USB-C',
      imageUrl: getVideoSrc('/videos/projets/1.mp4'),
      type: 'video',
      link: 'https://etsy.com',
      date: '2024',
      duration: '2 mois',
      category: 'IoT & Hardware',
      role: 'Créateur & Développeur',
      client: 'Personnel - Vente Etsy',
      challenge: 'Créer un assistant connecté autonome avec interface graphique sur écran OLED miniature, gestion WiFi, et réactions contextuelles intelligentes',
      result: 'Produit fonctionnel mis en vente, connexion WiFi stable, affichage météo en temps réel, système de réactions aléatoires basées sur l\'heure et la date',
      features: [
        'Affichage météo en temps réel via API',
        'Horloge avec réactions contextuelles',
        'Point d\'accès WiFi pour configuration',
        'Alimentation USB-C',
        'Écran OLED haute résolution',
        'Soudures et câblage fait main',
        'Boîtier custom design'
      ],
      specs: {
        microcontroleur: 'ESP32 (WiFi + Bluetooth intégré)',
        ecran: 'OLED SSD1306 0.96"',
        alimentation: 'USB-C 5V',
        software: 'C++ avec Arduino IDE',
        cloud: 'Cloudflare Workers pour APIs'
      },
      status: 'terminé',
      order: 1,
      github: 'https://github.com/RYZ-up/assistant-robot-iot'
    },
    {
      id: 2,
      title: 'Bras Robotique Articulé',
      description: 'Bras robotique à 6 degrés de liberté avec servomoteurs haute précision, pièces imprimées en PLA et compartiments interchangeables. Contrôle WiFi via interface web développée sur VS Code, permettant des mouvements fluides et précis pour diverses applications.',
      technologies: 'C++, Arduino IDE, ESP32, WiFi, VS Code, PLA (impression 3D), Servos MG996R',
      imageUrl: getVideoSrc('/videos/projets/bras.mp4'),
      type: 'video',
      link: '',
      date: '2024',
      duration: '3 mois',
      category: 'Robotique & IoT',
      role: 'Concepteur & Développeur',
      client: 'Personnel',
      challenge: 'Créer un bras robotique articulé à 6 axes avec contrôle WiFi précis et compartiments modulaires pour différentes applications (manipulation, dessin, assemblage).',
      result: 'Système fonctionnel avec contrôle précis des 6 servomoteurs, interface web responsive, compartiments interchangeables imprimés en 3D, mouvements fluides et reproductibles.',
      features: [
        '6 servomoteurs MG996R haute précision',
        'Structure modulaire en PLA imprimé 3D',
        'Compartiments interchangeables (pince, stylo, ventouse)',
        'Contrôle WiFi en temps réel',
        'Interface web responsive (mobile/desktop)',
        'Programmation via VS Code et Arduino IDE',
        'Mouvements fluides avec interpolation',
        'Sauvegarde de séquences de mouvements'
      ],
      specs: {
        servomoteurs: '6x Servo MG996R (couple 11kg.cm)',
        materiau: 'PLA (impression 3D FDM)',
        controleur: 'ESP32 (WiFi + Bluetooth intégré)',
        alimentation: 'Adaptateur 6V/5A + régulateur',
        software: 'C++ avec Arduino IDE',
        interface: 'Web (HTML/CSS/JS)',
        portee: '6 axes de rotation, portée ~30cm'
      },
      status: 'en cours',
      order: 2,
      github: 'https://github.com/RYZ-up/bras-robotique'
    },
    {
      id: 3,
      title: 'Site Web Portfolio Personnel',
      description: 'Site portfolio moderne et interactif développé avec React et Vite pour retracer mon parcours professionnel, mes compétences et projets. Interface responsive avec animations 3D, formulaire de contact via Resend, base de données Firestore pour les visites, et hébergement optimisé sur Cloudflare.',
      technologies: 'React, Vite, Resend, Cloudflare, Firestore, Three.js, CSS3',
      imageUrl: getVideoSrc('/videos/projets/portfolio.mp4'),
      type: 'video',
      link: '',
      date: '2024',
      duration: '2 mois',
      category: 'Web Development',
      role: 'Développeur Full Stack',
      client: 'Personnel',
      challenge: 'Créer une expérience utilisateur moderne et fluide avec animations 3D, design responsive, gestion de formulaire de contact sécurisé, et tracking des visites en temps réel.',
      result: 'Site portfolio professionnel 100% responsive, animations 3D fluides avec Three.js, formulaire de contact fonctionnel avec Resend, compteur de visites avec Firestore, déployé sur Cloudflare avec temps de chargement optimisé.',
      status: 'en cours',
      order: 3,
      github: 'https://github.com/RYZ-up/portfolio'
    },
    {
      id: 4,
      title: 'Site Vitrine - Atelier de Réparation Mobile',
      description: 'Site vitrine professionnel pour un atelier de réparation de téléphones avec système de prise de rendez-vous en ligne, catalogue de services, et gestion des interventions via Firestore. Interface moderne et responsive, optimisée pour la conversion client.',
      technologies: 'React, Firestore, Cloudflare, Tailwind CSS',
      imageUrl: getVideoSrc('/videos/projets/vitrine.mp4'),
      type: 'video',
      link: '',
      date: '2024',
      duration: '1 mois',
      category: 'Web Development',
      role: 'Développeur Full Stack',
      client: 'Atelier Mobile Plus',
      challenge: 'Créer un site vitrine attractif avec système de réservation en ligne, base de données temps réel pour les rendez-vous, et interface d\'administration pour gérer les interventions.',
      result: 'Site publié et mis en vente, système de réservation fonctionnel avec Firestore, interface admin complète, design responsive optimisé pour mobile, +40% de prises de contact client.',
      status: 'terminé',
      order: 4,
      github: 'https://github.com/RYZ-up/atelier-mobile-plus'
    },
    {
      id: 5,
      title: 'Chiron V2 - Plateforme de Gestion Personnelle',
      description: 'Application web complète de gestion du temps et des tâches avec système de flashcards pour l\'apprentissage, calendrier intelligent, gestion de projets, suivi d\'activités, et notifications push. PWA avec mode hors-ligne, synthèse vocale, et système d\'apprentissage de langues avec révisions espacées.',
      technologies: 'React, TypeScript, Firestore, PWA, Tailwind CSS, Firebase Cloud Messaging',
      imageUrl: getVideoSrc('/videos/projets/chironv2.mp4'),
      type: 'video',
      link: '',
      date: '2024',
      duration: '4 mois',
      category: 'Web App & Productivité',
      role: 'Développeur Full Stack',
      client: 'Personnel',
      challenge: 'Développer une plateforme tout-en-un pour la productivité personnelle avec calendrier, flashcards, gestion de projets, notes, heures de prière, apprentissage de langues, et notifications intelligentes. Application PWA installable avec mode hors-ligne.',
      result: 'Application PWA complète et installable, système de flashcards avec révisions espacées, calendrier avec événements récurrents, gestion de projets avec tâches et deadlines, notifications push web, mode vocal hold-to-talk, import/export de données, support multi-langues (anglais, arabe), mode compact pour écriture, raccourcis clavier (Shift+Enter), thème sombre/clair.',
      status: 'commencé',
      order: 5,
      github: 'https://github.com/RYZ-up/chiron-v2'
    },
    {
      id: 6,
      title: 'Avion Miniature RC Autonome',
      description: 'Drone avion miniature contrôlé par ESP32 avec batterie LiPo, circuit imprimé custom PCB, structure imprimée en 3D ultra-légère, et système de vol stabilisé. Contrôle WiFi via application mobile, télémétrie en temps réel (altitude, vitesse, batterie), et mode de vol automatique.',
      technologies: 'C++, ESP32, PCB Design, PLA (impression 3D), LiPo, Gyroscope MPU6050',
      imageUrl: 'images/avion.png',
      type: 'image',
      link: '',
      date: '2024',
      duration: '3 mois',
      category: 'Aéronautique & IoT',
      role: 'Concepteur & Développeur',
      client: 'Personnel',
      challenge: 'Concevoir et fabriquer un avion RC miniature fonctionnel avec structure 3D légère, PCB custom pour l\'électronique embarquée, système de stabilisation gyroscopique, et autonomie de vol suffisante avec batterie LiPo optimisée.',
      result: 'Avion RC fonctionnel avec envergure 40cm, poids total 150g, structure PLA imprimée 3D, PCB custom avec ESP32 et capteurs embarqués, autonomie 15min de vol, contrôle WiFi via app mobile, télémétrie temps réel, système de stabilisation gyroscopique, vol stable sans bugs, décollage et atterrissage assistés.',
      status: 'en attente de pièce',
      order: 6,
      github: 'https://github.com/RYZ-up/avion-rc-autonome'
    },
    {
      id: 7,
      title: 'IA & Jeux Classiques (Snake/TicTacToe)',
      description: 'Réimplémentation des jeux classiques Snake et TicTacToe avec une intelligence artificielle personnalisée et intégration de mes premiers modèles de langage (LLM) en Python. Exploration des algorithmes de jeu et du machine learning.',
      technologies: 'Python, Pygame, AI, LLM',
      imageUrl: getVideoSrc('/videos/projets/agentsia.mp4'),
      type: 'video',
      link: '',
      date: '2024',
      duration: '1 mois',
      category: 'AI & Python',
      role: 'Développeur',
      client: 'Personnel',
      challenge: 'Intégrer une IA capable de jouer de manière autonome et performante.',
      result: 'Jeux fonctionnels avec adversaires IA compétitifs.',
      status: 'terminé',
      order: 7,
      github: 'https://github.com/RYZ-up'
    },
    {
      id: 8,
      title: 'Générateur de Devis Python',
      description: 'Logiciel complet de génération de devis développé en Python. Fonctionnalités incluses : génération PDF, envoi automatique par SMTP, génération de QR codes pour paiement/suivi, et gestion de base de données locale avec SQLite (DB Browser).',
      technologies: 'Python, SQLite, SMTP, QRCode, PDFLib',
      imageUrl: getVideoSrc('/videos/projets/logicielpython.mp4'),
      type: 'video',
      link: '',
      date: '2024',
      duration: '2 mois',
      category: 'Software Development',
      role: 'Développeur',
      client: 'Projet Personnel',
      challenge: 'Créer une solution autonome pour la gestion commerciale basique.',
      result: 'Application desktop fonctionnelle exportant des PDF professionnels.',
      status: 'terminé',
      order: 8,
      github: 'https://github.com/RYZ-up'
    }
  ];

  const cards = [
    {
      id: 1,
      title: 'Parcours',
      description: 'Mon cheminement professionnel',
      label: 'Explorer mon parcours',
      link: '/projets.html',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      video: getVideoSrc('/videos/parcours.mp4')
    },
    {
      id: 2,
      title: 'Projets',
      description: 'Découvrez mes réalisations',
      label: 'Voir mes projets',
      link: '/services.html',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      video: getVideoSrc('/videos/projets.mp4')
    },
    {
      id: 3,
      title: 'Compétences',
      description: 'Mes domaines d\'expertise',
      label: 'Découvrir mes compétences',
      link: '/apropos.html',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      video: getVideoSrc('/videos/competences.mp4')
    },
    {
      id: 4,
      title: 'À propos',
      description: 'En savoir plus sur moi',
      label: 'Me découvrir',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      video: getVideoSrc('/videos/contact.mp4')
    }
  ];

  // Système de routing avec hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Enlève le #

      if (hash) {
        // Gestion des sous-pages de compétences
        if (hash.startsWith('competences/')) {
          const category = hash.split('/')[1];
          setCurrentPage('competences');
          setSelectedCompetenceCategory(category);
        } else {
          setCurrentPage(hash);
          if (hash !== 'competences') {
            setSelectedCompetenceCategory(null);
          }
        }
      } else {
        setCurrentPage('home');
        setSelectedCompetenceCategory(null);
      }

      // Réinitialiser les états de transition
      setTimeout(() => {
        setIsTransitioning(false);
        setIsExiting(false);
      }, 50);
    };

    // Initialisation au chargement
    handleHashChange();

    // Écoute les changements de hash
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Gestion du chargement avec préchargement des médias
  useEffect(() => {
    const isMobileDevice = window.innerWidth <= 768;

    const preloadMedia = async () => {
      // Sur mobile, utiliser une simulation de progression fluide
      if (isMobileDevice) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15 + 10; // Incréments de 10-25%
          if (progress >= 100) {
            progress = 100;
            setLoadingProgress(100);
            clearInterval(interval);
            setTimeout(() => {
              setIsLoading(false);
            }, 300);
          } else {
            setLoadingProgress(progress);
          }
        }, 200); // Mise à jour toutes les 200ms
        return;
      }

      // Sur desktop, préchargement réel des médias
      // Safety timeout: force loading completion if stuck
      const safetyTimeout = setTimeout(() => {
        if (loadingProgress < 100) {
          console.warn("Loading slow/stuck, forcing entry...");
          setLoadingProgress(100);
          setIsLoading(false);
        }
      }, 10000); // 10 seconds safety

      // Collecter toutes les URLs des médias (vidéos et images)
      const mediaUrls = [];

      // Vidéos/images des cards d'accueil
      cards.forEach(card => {
        if (card.video) mediaUrls.push({ url: card.video, type: 'video' });
      });

      // Vidéos des catégories de compétences
      competenceCategories.forEach(category => {
        if (category.video) mediaUrls.push({ url: category.video, type: 'video' });
      });

      // Images/vidéos des projets
      projets.forEach(projet => {
        if (projet.imageUrl) {
          mediaUrls.push({
            url: projet.imageUrl,
            type: projet.type === 'video' ? 'video' : 'image'
          });
        }
      });

      // Précharger les médias
      let loadedCount = 0;
      const totalMedia = mediaUrls.length;

      const loadPromises = mediaUrls.map(({ url, type }) => {
        return new Promise((resolve) => {
          // Timeout individuel pour chaque média
          const mediaTimeout = setTimeout(() => {
            loadedCount++;
            setLoadingProgress((loadedCount / totalMedia) * 100);
            resolve();
          }, 3000); // 3 secondes max par média

          if (type === 'video') {
            const video = document.createElement('video');
            video.preload = 'metadata'; // Utiliser 'metadata' au lieu de 'auto'
            video.muted = true;
            video.playsInline = true;
            video.onloadedmetadata = () => {
              clearTimeout(mediaTimeout);
              loadedCount++;
              setLoadingProgress((loadedCount / totalMedia) * 100);
              resolve();
            };
            video.onerror = (e) => {
              clearTimeout(mediaTimeout);
              loadedCount++;
              setLoadingProgress((loadedCount / totalMedia) * 100);
              resolve();
            };
            video.src = url;
          } else {
            const img = new Image();
            img.onload = () => {
              clearTimeout(mediaTimeout);
              loadedCount++;
              setLoadingProgress((loadedCount / totalMedia) * 100);
              resolve();
            };
            img.onerror = () => {
              clearTimeout(mediaTimeout);
              loadedCount++;
              setLoadingProgress((loadedCount / totalMedia) * 100);
              resolve();
            };
            img.src = url;
          }
        });
      });

      // Attendre que tous les médias soient chargés
      await Promise.all(loadPromises);

      clearTimeout(safetyTimeout);

      // Attendre un peu avant de terminer le chargement
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    preloadMedia();
  }, []);

  // Incrémenter le compteur de visites au chargement
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    const updateVisitCount = async () => {
      const count = await incrementVisitCount();
      if (count !== null) {
        setVisitCount(count);
      }
    };
    updateVisitCount();
  }, []);

  // Afficher le popup de bienvenue après le chargement
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowWelcomePopup(true);
      }, 800);
    }
  }, [isLoading]);

  // Forcer le démarrage des vidéos après le chargement (fix pour mobile)
  useEffect(() => {
    if (!isLoading) {
      const playAllVideos = () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          if (video.paused) {
            video.play().catch(err => {
              // L'autoplay peut être bloqué, on réessaie lors de la première interaction
              const playOnInteraction = () => {
                video.play().catch(() => { });
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
                document.removeEventListener('scroll', playOnInteraction);
              };
              document.addEventListener('click', playOnInteraction, { once: true });
              document.addEventListener('touchstart', playOnInteraction, { once: true });
              document.addEventListener('scroll', playOnInteraction, { once: true });
            });
          }
        });
      };

      // Lancer les vidéos immédiatement
      setTimeout(playAllVideos, 500);

      // Relancer périodiquement pour les vidéos chargées dynamiquement
      const interval = setInterval(playAllVideos, 2000);

      return () => clearInterval(interval);
    }
  }, [isLoading, currentPage]);

  const handleCardClick = (card) => {
    // Lancer la transition de sortie
    setIsTransitioning(true);

    // Après l'animation de sortie, changer de page
    setTimeout(() => {
      if (card.id === 1) {
        window.location.hash = 'parcours';
      } else if (card.id === 2) {
        window.location.hash = 'projets';
      } else if (card.id === 3) {
        window.location.hash = 'competences';
      } else if (card.id === 4) {
        window.location.hash = 'apropos';
      }
      // Les états seront réinitialisés par handleHashChange
    }, EXIT_DURATION);
  };

  const handleBackClick = () => {
    // Retourner toujours à la page précédente appropriée
    if (selectedCompetenceCategory) {
      // Si on est dans le détail d'une catégorie, revenir à la liste des catégories
      setIsExiting(true);
      setTimeout(() => {
        setSelectedCompetenceCategory(null);
        window.location.hash = 'competences';
        setTimeout(() => {
          setIsExiting(false);
        }, 100);
      }, EXIT_DURATION);
    } else {
      // Sinon, retourner à l'accueil
      setIsExiting(true);
      setTimeout(() => {
        window.location.hash = '';
        setCurrentStep(0);
        setIsExiting(false);
        setSelectedCompetenceCategory(null);
      }, EXIT_DURATION);
    }
  };

  // Animation duration for popup exit (match CSS animation duration)
  const POPUP_EXIT_DURATION = 400; // 0.4s to match popupSlideIn duration

  const handleCloseWelcomePopup = () => {
    setIsWelcomePopupClosing(true);
    setTimeout(() => {
      setShowWelcomePopup(false);
      setIsWelcomePopupClosing(false);
    }, POPUP_EXIT_DURATION);
  };

  const handleCloseMessagePopup = () => {
    setIsMessagePopupClosing(true);
    setTimeout(() => {
      setShowMessageSentPopup(false);
      setIsMessagePopupClosing(false);
    }, POPUP_EXIT_DURATION);
  };

  const handleCloseSkillPopup = () => {
    setIsSkillPopupClosing(true);
    setTimeout(() => {
      setSelectedSkill(null);
      setIsSkillPopupClosing(false);
    }, POPUP_EXIT_DURATION);
  };

  const handleCloseCvPopup = () => {
    setIsCvPopupClosing(true);
    setTimeout(() => {
      setShowCvPopup(false);
      setIsCvPopupClosing(false);
    }, POPUP_EXIT_DURATION);
  };

  const handleCvDownload = () => {
    const link = document.createElement('a');
    link.href = 'cv.pdf';
    link.download = 'CV-Rayane-Yazid.pdf';
    link.click();
    handleCloseCvPopup();
  };

  const handleCvOpen = () => {
    window.open('cv.pdf', '_blank');
    handleCloseCvPopup();
  };

  /* Regex pour validation */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+?\d{1,4}[\s.-]?)?(\(?\d{1,4}\)?[\s.-]?)?[\d\s.-]{6,14}$/;

  const handleNextStep = () => {
    // Reset erreurs
    setFormErrors({ ...formErrors, email: '', phone: '' });

    // Validation Étape 0 : Email
    if (currentStep === 0) {
      if (!formState.email || !emailRegex.test(formState.email)) {
        setFormErrors(prev => ({ ...prev, email: 'Veuillez entrer une adresse email valide' }));
        if (emailInputRef.current) {
          emailInputRef.current.focus();
          // Force re-render shake
          emailInputRef.current.classList.remove('error');
          void emailInputRef.current.offsetWidth;
          emailInputRef.current.classList.add('error');
        }
        return;
      }
    }

    // Validation Étape 1 : Téléphone (si rempli)
    if (currentStep === 1) {
      if (formState.phone && formState.phone.trim() !== '' && !phoneRegex.test(formState.phone)) {
        setFormErrors(prev => ({ ...prev, phone: 'Numéro invalide (ex: +33 6...)' }));
        if (phoneInputRef.current) {
          phoneInputRef.current.focus();
          // Force re-render shake
          phoneInputRef.current.classList.remove('error');
          void phoneInputRef.current.offsetWidth;
          phoneInputRef.current.classList.add('error');
        }
        return;
      }
    }

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return; // Empêche le spam

    setIsSending(true);

    const { email, phone, message } = formState;

    // Validate message
    if (!message || message.trim() === '') {
      setFormErrors(prev => ({ ...prev, message: 'Le message ne peut pas être vide' }));
      if (messageInputRef.current) {
        messageInputRef.current.focus();
        messageInputRef.current.classList.remove('error');
        void messageInputRef.current.offsetWidth;
        messageInputRef.current.classList.add('error');
      }
      setIsSending(false);
      return;
    }

    try {
      const result = await sendContactEmail({ email, phone, message });

      if (result.success) {
        setShowMessageSentPopup(true);
        setCurrentStep(0);
        // Reset form state
        setFormState({ email: '', phone: '', message: '' });
      } else {
        alert('Erreur lors de l\'envoi du message. Réessayez plus tard.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'envoi.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (currentStep < 2) {
        e.preventDefault();
        handleNextStep();
      }
      // Au dernier step, ne pas empêcher le comportement par défaut
      // Le formulaire sera soumis normalement
    }
  };

  const handleCompetenceCategoryClick = (category) => {
    // Étape 1: Lancer l'animation de sortie
    setIsExiting(true);

    // Étape 2: Après l'animation, changer de page
    setTimeout(() => {
      setSelectedCompetenceCategory(category.id);
      window.location.hash = `competences/${category.id}`;
      setIsExiting(false);
    }, EXIT_DURATION);
  };

  const handleBackFromCompetenceDetail = () => {
    setIsExiting(true);
    setTimeout(() => {
      window.location.hash = 'competences';
      setTimeout(() => {
        setSelectedCompetenceCategory(null);
        setIsExiting(false);
      }, 100);
    }, EXIT_DURATION);
  };

  useEffect(() => {
    if (currentPage === 'apropos' && !isMobile) {
      setTimeout(() => {
        if (currentStep === 0 && emailInputRef.current) {
          emailInputRef.current.focus();
        } else if (currentStep === 1 && phoneInputRef.current) {
          phoneInputRef.current.focus();
        } else if (currentStep === 2 && messageInputRef.current) {
          messageInputRef.current.focus();
        }
      }, 100);
    }
  }, [currentPage, currentStep, isMobile]);

  // Scroll handler for fullscreen projects - IMPROVED
  useEffect(() => {
    if (currentPage !== 'projets') return;

    let scrollTimeout = null;
    let isAnimating = false;

    const handleWheel = (e) => {
      e.preventDefault();

      // Ignore if already animating
      if (isAnimating) return;

      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Debounce scroll events
      scrollTimeout = setTimeout(() => {
        let nextProject = currentProject;

        if (e.deltaY > 50) {
          // Scroll down - next project (with threshold)
          nextProject = currentProject === projets.length - 1 ? currentProject : currentProject + 1;
        } else if (e.deltaY < -50) {
          // Scroll up - previous project (with threshold)
          nextProject = currentProject === 0 ? currentProject : currentProject - 1;
        }

        // Only animate if project is actually changing
        if (nextProject !== currentProject) {
          isAnimating = true;
          setIsScrolling(true);

          // Trigger exit animation
          setIsProjectExiting(true);

          // Change project after brief delay for smooth transition
          setTimeout(() => {
            setCurrentProject(nextProject);
            setIsProjectExiting(false);
          }, 300);

          // Reset animation state
          setTimeout(() => {
            isAnimating = false;
            setIsScrolling(false);
          }, 800);
        }
      }, 50); // 50ms debounce
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [currentPage, currentProject, projets.length]);

  // Animation d'apparition au scroll pour les compétences
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.05,
      rootMargin: '100px'
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('skill-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observer tous les boutons de compétences
    const skillButtons = document.querySelectorAll('.detail-skill-btn');
    skillButtons.forEach((btn, index) => {
      btn.style.transitionDelay = `${index * 0.03}s`;
      observer.observe(btn);
    });

    return () => {
      skillButtons.forEach((btn) => observer.unobserve(btn));
    };
  }, [selectedCompetenceCategory]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-grid"></div>
        <div className="loading-content">
          <ul className="loading-cards">
            {[...Array(12)].map((_, i) => (
              <li key={i} className="loading-card" style={{ animationDelay: `${i * 0.05}s` }}></li>
            ))}
          </ul>
          <div className="loading-progress-container">
            <div className="loading-progress-bar" style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <div className="loading-percentage">{Math.round(loadingProgress)}%</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${isLoading ? 'loading-active' : 'loaded'} ${!isHighRes ? 'low-performance' : ''} page-${currentPage} ${selectedCompetenceCategory ? 'in-detail' : ''}`}>
      {/* Fond animé Silk */}
      <div className="silk-background">
        <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#1a1a1a' }} />}>
          <Silk
            speed={8}
            scale={1.5}
            color="#1a1a1a"
            noiseIntensity={2}
            rotation={0}
          />
        </Suspense>
      </div>

      {/* Overlay gradient */}
      <div className="gradient-overlay"></div>

      {/* Bouton retour en haut à gauche */}
      {currentPage !== 'home' && (
        <button className="btn-back-header" onClick={handleBackClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className="btn-back-text">{t('navigation.back', selectedLanguage)}</span>
        </button>
      )}

      {/* Contact en haut à gauche */}
      {currentPage === 'home' && (
        <div className="header-contact">
          <button className="contact-button">rayane.yazid.pro@gmail.com</button>
          <div className="visit-counter">
            <span className="visit-count">{visitCount.toLocaleString()}</span>
            <span className="visit-label">{t('home.visits', selectedLanguage)}</span>
          </div>
        </div>
      )}

      {/* Boutons à gauche du logo */}
      {currentPage === 'home' && (
        <div className="header-buttons-group">
          <button
            className="floating-social-btn"
            aria-label="Réseaux sociaux"
            onClick={() => setSocialMenuOpen(!socialMenuOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <circle cx="12" cy="12" r="2"></circle>
              <circle cx="12" cy="5" r="2"></circle>
              <circle cx="12" cy="19" r="2"></circle>
            </svg>
          </button>

          <button className="header-btn-top" title="CV" onMouseMove={(e) => handlePreviewPosition(e, 700)} onClick={() => setShowCvPopup(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <div className="btn-preview cv-preview" onClick={(e) => {
              e.stopPropagation();
              setShowCvPopup(true);
            }}>
              <div className="cv-preview-container">
                <div className="cv-document-preview">
                  <img
                    src="images/cv-preview.png"
                    alt="CV Preview"
                    className="cv-image-preview"
                  />
                </div>
                <div className="cv-preview-label">{t('profiles.cv.preview', selectedLanguage)}</div>
              </div>
            </div>
          </button>
          <button className="header-btn-top" title="GitHub" onMouseMove={(e) => handlePreviewPosition(e, 840)} onClick={() => window.open('https://github.com/RYZ-up', '_blank')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <div className="btn-preview github-preview" onClick={(e) => e.stopPropagation()}>
              <div className="github-header">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="github-username">@RYZ-up</span>
              </div>
              <div className="github-stats-grid">
                <div className="github-stat">
                  <span className="stat-number">13</span>
                  <span className="stat-label">{t('profiles.github.repos', selectedLanguage)}</span>
                </div>
                <div className="github-stat">
                  <span className="stat-number">162</span>
                  <span className="stat-label">{t('profiles.github.commits', selectedLanguage)}</span>
                </div>
                <div className="github-stat">
                  <span className="stat-number">1</span>
                  <span className="stat-label">{t('profiles.github.followers', selectedLanguage)}</span>
                </div>
              </div>
              <div className="github-languages">
                <span className="lang-tag" style={{ background: '#3178c6' }}>TypeScript</span>
                <span className="lang-tag" style={{ background: '#f1e05a' }}>JavaScript</span>
                <span className="lang-tag" style={{ background: '#3572A5' }}>Python</span>
              </div>
              <a href="https://github.com/RYZ-up" target="_blank" rel="noopener noreferrer" className="preview-action-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                {t('profiles.github.visit', selectedLanguage)}
              </a>
            </div>
          </button>
          <button className="header-btn-top" title="LinkedIn" onMouseMove={(e) => handlePreviewPosition(e, 900)} onClick={() => window.open('https://www.linkedin.com/in/rayane-yazid/', '_blank')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <div className="btn-preview linkedin-preview" onClick={(e) => e.stopPropagation()}>
              <div className="linkedin-banner">
                <svg className="linkedin-logo" width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div className="linkedin-profile">
                <img src="images/pp.jpg" alt="Profile" className="linkedin-avatar" />
                <h3 className="linkedin-name">Rayane Y.</h3>
                <p className="linkedin-title">{selectedLanguage === 'FR' ? 'Étudiant en sciences de l\'ingénieur' : 'Engineering Sciences Student'}</p>
                <p className="linkedin-company">Université Paris-Est Créteil</p>
                <p className="linkedin-location">Créteil, Île-de-France</p>
              </div>
              <div className="linkedin-stats">
                <div className="linkedin-stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">{t('profiles.linkedin.connections', selectedLanguage)}</span>
                </div>
                <div className="linkedin-stat">
                  <span className="stat-number">106</span>
                  <span className="stat-label">{selectedLanguage === 'FR' ? 'vues' : 'views'}</span>
                </div>
              </div>
              <div className="linkedin-skills">
                <span className="skill-badge">Python</span>
                <span className="skill-badge">C++</span>
                <span className="skill-badge">Électronique</span>
              </div>
              <a href="https://www.linkedin.com/in/rayane-yazid/" target="_blank" rel="noopener noreferrer" className="preview-action-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                {t('profiles.linkedin.viewProfile', selectedLanguage)}
              </a>
            </div>
          </button>
          <button className="header-btn-top" title="TryHackMe" onMouseMove={(e) => handlePreviewPosition(e, 960)} onClick={() => window.open('https://tryhackme.com/p/rayane.yazid.pro', '_blank')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761V24l11.063-10.709H18.07a4.53 4.53 0 0 0 4.516-4.5 4.526 4.526 0 0 0-4.107-4.5C17.927 2.285 15.29 0 12.122 0h-1.418zm1.41 2.494c2.41 0 4.393 1.983 4.393 4.393 0 .26-.024.52-.07.773a4.526 4.526 0 0 0-3.035-1.15H9.356a4.525 4.525 0 0 0-3.035 1.15 6.487 6.487 0 0 1-.07-.773c0-2.41 1.983-4.393 4.393-4.393h1.471z" />
            </svg>
            <div className="btn-preview thm-preview" onClick={(e) => e.stopPropagation()}>
              <div className="thm-header">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#00d9ff">
                  <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761V24l11.063-10.709H18.07a4.53 4.53 0 0 0 4.516-4.5 4.526 4.526 0 0 0-4.107-4.5C17.927 2.285 15.29 0 12.122 0h-1.418zm1.41 2.494c2.41 0 4.393 1.983 4.393 4.393 0 .26-.024.52-.07.773a4.526 4.526 0 0 0-3.035-1.15H9.356a4.525 4.525 0 0 0-3.035 1.15 6.487 6.487 0 0 1-.07-.773c0-2.41 1.983-4.393 4.393-4.393h1.471z" />
                </svg>
                <div className="thm-user">
                  <span className="thm-username">@rayane.yazid.pro</span>
                  <span className="thm-rank">Level 1</span>
                </div>
              </div>
              <div className="thm-stats-container">
                <div className="thm-stat">
                  <span className="stat-number">2</span>
                  <span className="stat-label">{t('profiles.tryhackme.rooms', selectedLanguage)}</span>
                </div>
                <div className="thm-stat">
                  <span className="stat-number">0</span>
                  <span className="stat-label">{t('profiles.tryhackme.streak', selectedLanguage)}</span>
                </div>
                <div className="thm-stat">
                  <span className="stat-number">1,980,881</span>
                  <span className="stat-label">{selectedLanguage === 'FR' ? 'Rang' : 'Rank'}</span>
                </div>
              </div>
              <div className="thm-badges">
                <span className="thm-badge">🎯 Offensive Security</span>
                <span className="thm-badge">🛡️ Defensive Security</span>
              </div>
              <a href="https://tryhackme.com/p/rayane.yazid.pro" target="_blank" rel="noopener noreferrer" className="preview-action-btn thm-action-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                {t('profiles.tryhackme.viewProfile', selectedLanguage)}
              </a>
            </div>
          </button>
        </div>
      )}

      {/* Logo centré */}
      <div className="logo">
        <img src="images/dark.png" alt="Logo" className="logo-icon-img" />
      </div>

      {/* Infos personnelles en haut à droite */}
      <div className="personal-info">
        <div className="info-name">Rayane YAZID</div>
        <div className="info-school">Université Paris Est Créteil</div>
        <div className="info-availability">
          <span className="status-dot"></span>
          <span>{t('availability.available', selectedLanguage)}</span>
        </div>
      </div>

      {/* Bouton flottant mobile pour les réseaux sociaux */}
      {isMobile && (
        <>
          <button
            className="floating-social-btn"
            onClick={() => setSocialMenuOpen(!socialMenuOpen)}
            aria-label="Réseaux sociaux"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {socialMenuOpen && (
            <div className="mobile-social-menu">
              <div className={`mobile-social-overlay ${isSocialMenuClosing ? 'closing' : ''}`} onClick={handleCloseSocialMenu} />
              <div
                ref={socialContentRef}
                className={`mobile-social-content ${isSocialMenuClosing ? 'closing' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'none' }}
              >
                <h3>Mes réseaux</h3>
                <div className="mobile-social-links">
                  <a href="#" className="mobile-social-link" onClick={(e) => { e.preventDefault(); handleCloseSocialMenu(); setShowCvPopup(true); }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    <span>{t('profiles.cv.download', selectedLanguage)}</span>
                  </a>
                  <a href="https://github.com/RYZ-up" target="_blank" rel="noopener noreferrer" className="mobile-social-link" onClick={handleCloseSocialMenu}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/rayane-yazid/" target="_blank" rel="noopener noreferrer" className="mobile-social-link" onClick={handleCloseSocialMenu}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://tryhackme.com/p/rayane.yazid.pro" target="_blank" rel="noopener noreferrer" className="mobile-social-link" onClick={handleCloseSocialMenu}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761V24l11.063-10.709H18.07a4.53 4.53 0 0 0 4.516-4.5 4.526 4.526 0 0 0-4.107-4.5C17.927 2.285 15.29 0 12.122 0h-1.418zm1.41 2.494c2.41 0 4.393 1.983 4.393 4.393 0 .26-.024.52-.07.773a4.526 4.526 0 0 0-3.035-1.15H9.356a4.525 4.525 0 0 0-3.035 1.15 6.487 6.487 0 0 1-.07-.773c0-2.41 1.983-4.393 4.393-4.393h1.471z" />
                    </svg>
                    <span>TryHackMe</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Contenu principal */}
      {currentPage === 'home' ? (
        <div className="content">
          <div className={`cards-container ${isTransitioning ? 'cards-exit' : ''}`}>
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`card ${isTransitioning ? 'card-exit' : ''}`}
                style={{
                  animationDelay: isTransitioning
                    ? `${(cards.length - 1 - index) * 0.05}s`
                    : `${0.3 + index * 0.15}s`
                }}
                onClick={() => handleCardClick(card)}
                onMouseMove={handleOptimizedMouseMove}
              >
                {card.video && (
                  <video
                    className="card-video"
                    src={card.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                )}
                <div className="card-glow"></div>
                <div
                  className="card-gradient"
                  style={{ background: card.gradient }}
                ></div>
                <div className="card-content">
                  <div className="card-text-container">
                    <h2 className="card-title">{t(`cards.${['parcours', 'projets', 'competences', 'apropos'][card.id - 1]}.title`, selectedLanguage)}</h2>
                    <p className="card-description">{t(`cards.${['parcours', 'projets', 'competences', 'apropos'][card.id - 1]}.description`, selectedLanguage)}</p>
                    <span className="card-label">{t(`cards.${['parcours', 'projets', 'competences', 'apropos'][card.id - 1]}.label`, selectedLanguage)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : currentPage === 'parcours' ? (
        <div className={`journey-section ${isExiting ? 'section-exit' : ''}`}>

          {/* Header */}
          <header className="journey-header">
            <span className="journey-badge">{t('parcours.badge', selectedLanguage)}</span>
            <h1 className="journey-title">{t('parcours.title', selectedLanguage)}</h1>
          </header>

          {/* Timeline */}
          <div className="journey-timeline">
            <div className="timeline-line">
              <div className="timeline-line-glow"></div>
            </div>

            {parcours.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (parcoursRefs.current[index] = el)}
                data-parcours-id={item.id}
                className={`journey-item ${visibleParcoursItems.has(String(item.id)) ? 'visible' : ''} ${item.future ? 'future' : ''} ${isExiting ? 'item-exit' : ''}`}
                data-side={index % 2 === 0 ? 'left' : 'right'}
                style={{
                  '--index': index,
                  animationDelay: isExiting ? `${(parcours.length - 1 - index) * 0.08}s` : `${index * 0.2}s`
                }}
              >
                {/* Connector */}
                <div className="journey-connector">
                  <div className="connector-dot">
                    <div className="connector-pulse"></div>
                  </div>
                  <div className="connector-line"></div>
                </div>

                {/* Card */}
                <div className="journey-card" onMouseMove={handleOptimizedMouseMove}>
                  <div className="journey-card-shimmer"></div>
                  <div className="journey-card-content">
                    <div className="journey-card-period">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{t(`parcours.items.${index}.period`, selectedLanguage)}</span>
                    </div>
                    <h2 className="journey-card-title">{t(`parcours.items.${index}.title`, selectedLanguage)}</h2>
                    <p className="journey-card-desc">{t(`parcours.items.${index}.description`, selectedLanguage)}</p>

                    {item.future && (
                      <div className="journey-future-badge">
                        <span className="future-dot"></span>
                        <span>{t('parcours.future_label', selectedLanguage)}</span>
                      </div>
                    )}
                  </div>
                  <div className="journey-card-glow" style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.15), transparent 40%)`
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : currentPage === 'competences' ? (
        <div className={`competences-fullscreen-section ${isExiting ? 'section-exit' : ''} ${selectedCompetenceCategory ? 'detail-mode' : 'selection-mode'}`}>
          {!selectedCompetenceCategory ? (
            /* Vue de sélection des catégories */
            <div className={`competences-categories-view ${isExiting ? 'view-exit' : ''}`}>
              <div className="competence-categories-grid">
                {competenceCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className="competence-category-card"
                    style={{
                      animationDelay: isExiting
                        ? `${(competenceCategories.length - 1 - index) * 0.1}s`
                        : `${index * 0.1}s`
                    }}
                    onClick={() => handleCompetenceCategoryClick(category)}
                    onMouseMove={handleOptimizedMouseMove}
                  >
                    <div className="category-card-video-container">
                      <video
                        src={category.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="category-card-video"
                      />
                      <div className="category-card-glow"></div>
                      <div className="category-card-overlay" style={{ background: category.gradient }}></div>
                    </div>
                    <div className="category-card-content">
                      <h3 className="category-card-title">{t(`competences.categories.${category.id}.title`, selectedLanguage)}</h3>
                      <p className="category-card-description">{t(`competences.categories.${category.id}.description`, selectedLanguage)}</p>
                      <button className="category-card-btn">
                        <span>{t(`competences.categories.${category.id}.label`, selectedLanguage)}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Vue détaillée de la catégorie sélectionnée - REFONTE COMPLÈTE BENTO GRID */
            <div className={`competences-nexus ${isExiting ? 'nexus-exit' : ''}`}>
              <div className="nexus-grid">
                {/* Slot 1 : En-tête / Stats Globales */}
                <div className="nexus-slot slot-header">
                  {(() => {
                    const filteredBins = competencesData.filter(bin => bin.categoryId === selectedCompetenceCategory);
                    const allSkills = filteredBins.flatMap(bin => bin.skills);
                    const globalAvg = Math.round(allSkills.reduce((acc, s) => acc + s.level, 0) / allSkills.length);
                    return (
                      <div className="nexus-header-content">
                        <div className="nexus-title-group">
                          <h2 className="nexus-page-title">
                            {t(`competences.categories.${selectedCompetenceCategory}.title`, selectedLanguage)}
                          </h2>
                          <p className="nexus-subtitle">
                            {t(`competences.categories.${selectedCompetenceCategory}.description`, selectedLanguage)}
                          </p>
                        </div>
                        <div className="nexus-global-stats">
                          <div className="global-stat-circle">
                            <span className="stat-value">{globalAvg}%</span>
                          </div>
                          <span className="stat-label">{t('competences.globalMastery', selectedLanguage)}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Slot 2 : Radar Chart (Central large) */}
                <div className="nexus-slot slot-radar">
                  <div className="radar-wrapper">
                    {(() => {
                      const filteredBins = competencesData.filter(bin => bin.categoryId === selectedCompetenceCategory);
                      const allSkills = filteredBins.flatMap(bin => bin.skills);

                      return (
                        <svg viewBox="0 0 650 650" className="nexus-radar-svg">
                          {/* Grille */}
                          {[0.2, 0.4, 0.6, 0.8, 1].map((lvl, i) => (
                            <circle key={i} cx="325" cy="325" r={255 * lvl} className="radar-grid-circle" />
                          ))}

                          {/* Axes */}
                          {allSkills.map((_, i) => {
                            const angle = (i * 2 * Math.PI) / allSkills.length - Math.PI / 2;
                            return (
                              <line
                                key={i}
                                x1="325"
                                y1="325"
                                x2={325 + 255 * Math.cos(angle)}
                                y2={325 + 255 * Math.sin(angle)}
                                className="radar-axis-line"
                              />
                            );
                          })}

                          {/* Polygone */}
                          <polygon
                            className="radar-polygon-nexus"
                            points={allSkills.map((skill, i) => {
                              const angle = (i * 2 * Math.PI) / allSkills.length - Math.PI / 2;
                              const r = (skill.level / 100) * 255;
                              return `${325 + r * Math.cos(angle)},${325 + r * Math.sin(angle)}`;
                            }).join(' ')}
                          />

                          {/* Labels (Optimisés pour mobile/PC) */}
                          {allSkills.map((skill, i) => {
                            const angle = (i * 2 * Math.PI) / allSkills.length - Math.PI / 2;
                            const lx = 325 + 285 * Math.cos(angle);
                            const ly = 325 + 285 * Math.sin(angle);
                            return (
                              <text
                                key={i}
                                x={lx}
                                y={ly}
                                className="radar-label-nexus"
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                {skill.name}
                              </text>
                            );
                          })}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                {/* Slots Dynamiques : Groupes de compétences */}
                {competencesData
                  .filter(bin => bin.categoryId === selectedCompetenceCategory)
                  .map((bin, binIdx) => (
                    <div key={binIdx} className={`nexus-slot slot-skills group-${binIdx}`}>
                      <h3 className="nexus-group-title">{bin.title}</h3>
                      <div className="nexus-skills-container">
                        {bin.skills.map((skill, sIdx) => (
                          <div
                            key={skill.id}
                            className="nexus-skill-card"
                            onClick={() => setSelectedSkill(skill)}
                            style={{ animationDelay: `${(binIdx * 0.1) + (sIdx * 0.05)}s` }}
                          >
                            <div className="skill-card-top">
                              <div className="skill-icon-box">
                                {(skill.icon.toString().startsWith('http') || skill.icon.toString().startsWith('/')) ? (
                                  <img src={skill.icon} alt={skill.name} className="skill-icon" />
                                ) : (
                                  <span className="skill-emoji">{skill.icon}</span>
                                )}
                              </div>
                              <span className="skill-name">{skill.name}</span>
                              <span className="skill-percent-badge">{skill.level}%</span>
                            </div>
                            <div className="skill-progress-track">
                              <div
                                className="skill-progress-fill"
                                style={{
                                  '--target-width': `${skill.level}%`,
                                  animationDelay: `${0.4 + (binIdx * 0.1) + (sIdx * 0.05)}s`
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      ) : currentPage === 'projets' ? (
        <div className={`projets-section-fullscreen ${isExiting ? 'section-exit' : ''}`}>
          {projets.length > 0 ? (
            <>
              <div className={`project-fullscreen-wrapper ${isProjectExiting ? 'project-exiting' : ''}`} key={currentProject}>
                {/* Index géant en arrière-plan */}
                <div className="project-index-huge">{currentProject + 1}</div>
                {/* Vidéo/Image en plein écran */}
                {projets[currentProject].imageUrl && (
                  projets[currentProject].type === 'video' ? (
                    <>
                      {/* Loader Vidéo */}
                      {isVideoLoading && <div className="video-loader"></div>}

                      <video
                        key={projets[currentProject].imageUrl}
                        ref={videoRef}
                        className="project-bg-video"
                        src={projets[currentProject].imageUrl}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        preload="auto"
                        onLoadStart={() => setIsVideoLoading(true)}
                        onWaiting={() => setIsVideoLoading(true)}
                        onLoadedData={(e) => {
                          // setIsMuted(e.target.muted); 
                          if (!isMuted) {
                            e.target.muted = false;
                            e.target.volume = 0.4; // Son à 40%
                          }
                          e.target.play().catch(err => console.log('Autoplay prevented:', err));
                        }}
                        onCanPlay={(e) => {
                          setIsVideoLoading(false);
                          if (!isMuted && e.target.volume !== 0.4) e.target.volume = 0.4;
                          e.target.play().catch(err => console.log('Autoplay prevented:', err));
                        }}
                      />
                    </>
                  ) : (
                    <img
                      className="project-bg-image"
                      src={projets[currentProject].imageUrl}
                      alt={projets[currentProject].title}
                      loading="eager"
                    />
                  )
                )}

                {/* Overlay gradient */}
                <div className="project-overlay-gradient"></div>

                {/* Infos du projet en bas */}
                <div className="project-info-bottom">
                  <div className="project-info-container">
                    <div className="project-header-inline">
                      <span className="project-category">{projets[currentProject].category}</span>
                    </div>

                    <h1 className="project-title-large">{projets[currentProject].title}</h1>

                    <p className="project-description-text">{projets[currentProject].description}</p>

                    <div className="project-tech-tags">
                      {projets[currentProject].technologies.split(',').map((tech, idx) => {
                        const techName = tech.trim();
                        const iconUrl = techIcons[techName];
                        return (
                          <span key={idx} className="tech-badge">
                            {iconUrl && typeof iconUrl === 'string' && iconUrl.startsWith('http') ? (
                              <img src={iconUrl} alt={techName} className="tech-badge-icon" />
                            ) : (
                              <span className="tech-badge-emoji">{iconUrl}</span>
                            )}
                            {techName}
                          </span>
                        );
                      })}
                    </div>

                  </div>
                </div>
              </div>

              {/* Barre de contrôles - Conteneur pour desktop, boutons directs sur mobile */}
              <div className="project-controls-bar">
                {/* Indicateur de statut du projet */}
                {projets[currentProject]?.status && (
                  <div className="project-status-indicator">
                    <div className={`status-dot status-${projets[currentProject].status.replace(/\s+/g, '-')}`}></div>
                    <span className="status-label">{projets[currentProject].status}</span>
                  </div>
                )}

                {/* Boutons de navigation */}
                <div className="project-nav-controls">
                  <button
                    className={`nav-btn prev-btn ${currentProject === 0 ? 'disabled' : ''}`}
                    onClick={() => {
                      if (currentProject > 0) {
                        setIsProjectExiting(true);
                        setTimeout(() => {
                          setCurrentProject(currentProject - 1);
                          setIsProjectExiting(false);
                        }, 300);
                      }
                    }}
                    disabled={currentProject === 0}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button
                    className={`nav-btn next-btn ${currentProject === projets.length - 1 ? 'disabled' : ''}`}
                    onClick={() => {
                      if (currentProject < projets.length - 1) {
                        setIsProjectExiting(true);
                        setTimeout(() => {
                          setCurrentProject(currentProject + 1);
                          setIsProjectExiting(false);
                        }, 300);
                      }
                    }}
                    disabled={currentProject === projets.length - 1}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Indicateur de progression */}
                <div className="project-count-badge">
                  <span className="count-current">{currentProject + 1}</span>
                  <span className="count-separator">/</span>
                  <span className="count-total">{projets.length}</span>
                </div>

                {/* Bouton mute */}
                {projets[currentProject].type === 'video' && (
                  <button
                    className="project-sound-toggle"
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = !videoRef.current.muted;
                        setIsMuted(videoRef.current.muted);
                      }
                    }}
                  >
                    {isMuted ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                    )}
                  </button>
                )}

                {/* Bouton Visiter le projet - Desktop uniquement */}
                {!isMobile && projets[currentProject]?.github && (
                  <a
                    href={projets[currentProject].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-visit-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>Voir le projet</span>
                  </a>
                )}
              </div>
            </>
          ) : (
            <div className="no-projects">
              <h2>Aucun projet disponible</h2>
              <p>Les projets seront bientôt ajoutés</p>
            </div>
          )}
        </div>
      ) : (
        <div className={`about-section ${isExiting ? 'section-exit' : ''}`}>
          <div className={`about-content ${isExiting ? 'content-exit' : ''}`}>
            <h2 className="about-title">{t('apropos.title', selectedLanguage)}</h2>
            {t('apropos.paragraphs', selectedLanguage).map((paragraph, index) => (
              <p key={index} className="about-text">{paragraph}</p>
            ))}
          </div>

          <div className={`contact-stepper ${isExiting ? 'content-exit' : ''}`}>
            {isMobile && (
              <div className="stepper-mobile-logo">
                <img src="images/dark.png" alt="Logo" className="stepper-logo-img" />
              </div>
            )}
            <div className="stepper-header">
              <div className={`step ${currentStep >= 0 ? 'active' : ''} ${currentStep > 0 ? 'completed' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">{t('apropos.form.step1Title', selectedLanguage)}</div>
              </div>
              <div className={`step-line ${currentStep >= 1 ? 'active' : ''}`}>
                <div className="step-line-progress"></div>
              </div>
              <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">{t('apropos.form.step2Title', selectedLanguage)}</div>
              </div>
              <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="step-line-progress"></div>
              </div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">{t('apropos.form.step3Title', selectedLanguage)}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="stepper-form">
              {currentStep === 0 && (
                <div className="form-step">
                  <label htmlFor="email">{t('apropos.form.step1Title', selectedLanguage)}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    ref={emailInputRef}
                    className={formErrors.email ? 'error' : ''}
                    placeholder={t('apropos.form.emailPlaceholder', selectedLanguage)}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Veuillez entrer une adresse email valide (ex: exemple@domaine.com)"
                    required
                    onKeyDown={handleKeyDown}
                    value={formState.email}
                    onChange={(e) => {
                      setFormState({ ...formState, email: e.target.value });
                      if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                    }}
                  />
                  {formErrors.email && (
                    <div className="error-message">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12" y2="16"></line>
                      </svg>
                      {formErrors.email}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 1 && (
                <div className="form-step">
                  <label htmlFor="phone">{t('apropos.form.step2Title', selectedLanguage)}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    ref={phoneInputRef}
                    className={formErrors.phone ? 'error' : ''}
                    placeholder={t('apropos.form.phonePlaceholder', selectedLanguage)}
                    pattern="[0-9+\s()-]{10,20}"
                    title="Veuillez entrer un numéro de téléphone valide (10-20 chiffres)"
                    required
                    onKeyDown={handleKeyDown}
                    value={formState.phone}
                    onChange={(e) => {
                      setFormState({ ...formState, phone: e.target.value });
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                    }}
                  />
                  {formErrors.phone && (
                    <div className="error-message">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12" y2="16"></line>
                      </svg>
                      {formErrors.phone}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-step">
                  <label htmlFor="message">{t('apropos.form.step3Title', selectedLanguage)}</label>
                  <textarea
                    id="message"
                    name="message"
                    ref={messageInputRef}
                    className={formErrors.message ? 'error' : ''}
                    placeholder={t('apropos.form.messagePlaceholder', selectedLanguage)}
                    rows="5"
                    required
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({ ...formState, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                    }}
                  ></textarea>
                  {formErrors.message && (
                    <div className="error-message">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12" y2="16"></line>
                      </svg>
                      {formErrors.message}
                    </div>
                  )}
                </div>
              )}

              <div className="stepper-buttons">
                {currentStep > 0 && (
                  <button type="button" onClick={handlePrevStep} className="btn-prev">
                    {t('apropos.form.previous', selectedLanguage)}
                  </button>
                )}
                {currentStep < 2 ? (
                  <button type="button" onClick={handleNextStep} className="btn-next">
                    {t('apropos.form.next', selectedLanguage)}
                  </button>
                ) : (
                  <button type="submit" className="btn-submit" disabled={isSending}>
                    {isSending ? (
                      <>
                        <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
                          <path d="M12 2 A10 10 0 0 1 22 12" opacity="0.75"></path>
                        </svg>
                        {t('apropos.form.sending', selectedLanguage)}
                      </>
                    ) : (
                      t('apropos.form.send', selectedLanguage)
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )
      }

      {/* Popup de bienvenue */}
      {
        showWelcomePopup && (
          <div className={`popup-overlay ${isWelcomePopupClosing ? 'popup-overlay-exit' : ''}`} onClick={handleCloseWelcomePopup}>
            <div className={`popup-content ${isWelcomePopupClosing ? 'popup-content-exit' : ''}`} onClick={(e) => e.stopPropagation()}>
              <div className="popup-icon waving-hand">
                <img src="https://em-content.zobj.net/source/apple/391/waving-hand_1f44b.png" alt="Waving hand" />
              </div>
              <div className={`popup-text-content ${isLanguageChanging ? 'language-fade-out' : 'language-fade-in'}`}>
                <h2 className="popup-title">
                  {t('home.welcomeTitle', selectedLanguage)}
                </h2>
                <p className="popup-subtitle">
                  {t('home.welcomeSubtitle', selectedLanguage)}
                </p>
                <p className="popup-message">
                  {t('home.welcomeMessage', selectedLanguage)}
                </p>
              </div>
              <div className="language-selector">
                <button
                  className={`lang-btn ${selectedLanguage === 'FR' ? 'active' : ''}`}
                  onClick={() => {
                    if (selectedLanguage !== 'FR') {
                      setIsLanguageChanging(true);
                      setTimeout(() => {
                        setSelectedLanguage('FR');
                        setIsLanguageChanging(false);
                      }, 300);
                    }
                  }}
                >
                  <img src="https://flagcdn.com/w40/fr.png" alt="FR" className="flag-icon" />
                  FR
                </button>
                <button
                  className={`lang-btn ${selectedLanguage === 'EN' ? 'active' : ''}`}
                  onClick={() => {
                    if (selectedLanguage !== 'EN') {
                      setIsLanguageChanging(true);
                      setTimeout(() => {
                        setSelectedLanguage('EN');
                        setIsLanguageChanging(false);
                      }, 300);
                    }
                  }}
                >
                  <img src="https://flagcdn.com/w40/gb.png" alt="EN" className="flag-icon" />
                  EN
                </button>
              </div>
              <button className="popup-button" onClick={handleCloseWelcomePopup}>
                {t('home.discoverButton', selectedLanguage)}
              </button>

              <div className="resolution-toggle-container">
                <span className="toggle-label" style={{ color: 'white', fontSize: '0.8rem', opacity: 0.8, marginBottom: '5px', display: 'block' }}>
                  {selectedLanguage === 'FR' ? 'Mode Haute Qualité' : 'High Quality Mode'}
                </span>
                <label className="apple-switch">
                  <input
                    type="checkbox"
                    checked={isHighRes}
                    onChange={(e) => {
                      setIsHighRes(e.target.checked);
                      // Force reload of background videos if needed, but react key change or state should handle it
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        )
      }

      {/* Popup de confirmation d'envoi */}
      {
        showMessageSentPopup && (
          <div className={`popup-overlay ${isMessagePopupClosing ? 'popup-overlay-exit' : ''}`} onClick={handleCloseMessagePopup}>
            <div className={`popup-content ${isMessagePopupClosing ? 'popup-content-exit' : ''}`} onClick={(e) => e.stopPropagation()}>
              <div className="popup-icon success-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" fill="rgba(34, 197, 94, 0.2)" stroke="rgba(34, 197, 94, 1)"></circle>
                  <polyline points="9 12 11 14 15 10" stroke="rgba(34, 197, 94, 1)" strokeWidth="2.5"></polyline>
                </svg>
              </div>
              <h2 className="popup-title">{t('popups.messageSent.title', selectedLanguage)}</h2>
              <p className="popup-message">{t('popups.messageSent.message', selectedLanguage)}</p>
              <button className="popup-button" onClick={handleCloseMessagePopup}>
                {t('popups.messageSent.button', selectedLanguage)}
              </button>
            </div>
          </div>
        )
      }

      {/* Popup de détail de compétence - Style simplifié */}
      {
        selectedSkill && (
          <div className={`popup-overlay ${isSkillPopupClosing ? 'popup-overlay-exit' : ''}`} onClick={handleCloseSkillPopup}>
            <div className={`popup-content skill-detail-popup ${isSkillPopupClosing ? 'popup-content-exit' : ''}`} onClick={(e) => e.stopPropagation()}>
              <div className="popup-icon">
                {(selectedSkill.icon.toString().startsWith('http') || selectedSkill.icon.toString().startsWith('/')) ? (
                  <img src={selectedSkill.icon} alt={selectedSkill.name} className="skill-popup-img" />
                ) : (
                  <span className="skill-popup-emoji">{selectedSkill.icon}</span>
                )}
              </div>

              <div className="popup-text-content">
                <h2 className="popup-title">{selectedSkill.name}</h2>
                <p className="popup-message">{selectedSkill.description}</p>
              </div>

              <div className="skill-detail-stats">
                <div className="skill-detail-stat">
                  <span className="skill-detail-stat-label">{t('competences.skillPopup.mastery', selectedLanguage)}</span>
                  <span className="skill-detail-stat-value">{selectedSkill.level}%</span>
                </div>
                <div className="skill-detail-stat">
                  <span className="skill-detail-stat-label">{t('competences.skillPopup.experience', selectedLanguage)}</span>
                  <span className="skill-detail-stat-value">{selectedSkill.experience || '3 ans'}</span>
                </div>
              </div>

              <div className="skill-detail-info">
                <p className="skill-detail-details">{selectedSkill.details}</p>
              </div>

              <button className="popup-button" onClick={handleCloseSkillPopup}>
                {t('popups.messageSent.button', selectedLanguage)}
              </button>
            </div>
          </div>
        )
      }

      {/* Popup CV */}
      {
        showCvPopup && (
          <div className={`popup-overlay ${isCvPopupClosing ? 'popup-overlay-exit' : ''}`} onClick={handleCloseCvPopup}>
            <div className={`popup-content ${isCvPopupClosing ? 'popup-content-exit' : ''}`} onClick={(e) => e.stopPropagation()}>
              <div className="popup-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 1)"></path>
                  <polyline points="14 2 14 8 20 8" stroke="rgba(59, 130, 246, 1)"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="rgba(59, 130, 246, 1)"></line>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="rgba(59, 130, 246, 1)"></line>
                </svg>
              </div>
              <h2 className="popup-title">{selectedLanguage === 'FR' ? 'Mon CV' : 'My Resume'}</h2>
              <p className="popup-message">{selectedLanguage === 'FR' ? 'Que souhaitez-vous faire ?' : 'What would you like to do?'}</p>
              <div className="cv-popup-buttons">
                <button className="popup-button cv-button-primary" onClick={handleCvDownload}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  {selectedLanguage === 'FR' ? 'Télécharger' : 'Download'}
                </button>
                <button className="popup-button cv-button-secondary" onClick={handleCvOpen}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  {selectedLanguage === 'FR' ? 'Ouvrir' : 'Open'}
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">{t('footer.copyright', selectedLanguage)}</p>
      </footer>
    </div >
  );
}

export default App;
