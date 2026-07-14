// =========================================================
// Portfolio Kabir AMOUSSA — interactions
// =========================================================

// Navbar : flou renforcé + fond plus opaque au scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Animation au scroll (reveal) — IntersectionObserver natif, pas de librairie
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// Année dynamique dans le footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Carrousel Veille Technologique
const veilleCards = document.querySelectorAll('.veille-card');
const veilleDots = document.querySelectorAll('.veille-dots .dot');
const veillePrev = document.getElementById('veillePrev');
const veilleNext = document.getElementById('veilleNext');
const veilleNum = document.getElementById('veilleNum');
const veillePeriod = document.getElementById('veillePeriod');

if (veilleCards.length) {
  let currentStep = 0;
  const totalSteps = veilleCards.length;

  function goToStep(index) {
    currentStep = (index + totalSteps) % totalSteps;
    veilleCards.forEach(c => c.classList.toggle('active', Number(c.dataset.step) === currentStep));
    veilleDots.forEach(d => d.classList.toggle('active', Number(d.dataset.step) === currentStep));
    const activeCard = document.querySelector('.veille-card.active');
    if (veilleNum) veilleNum.textContent = currentStep + 1;
    if (veillePeriod && activeCard) veillePeriod.textContent = activeCard.dataset.period;
  }

  veilleDots.forEach(d => d.addEventListener('click', () => goToStep(Number(d.dataset.step))));
  if (veillePrev) veillePrev.addEventListener('click', () => goToStep(currentStep - 1));
  if (veilleNext) veilleNext.addEventListener('click', () => goToStep(currentStep + 1));
}

// Modale Compétences
const skillsData = [
  { title: "Serveur DHCP", desc: "J'ai appris les principes de base de la configuration d'un serveur DHCP : attribution automatique d'adresses IP, gestion des plages et des baux, pour simplifier l'administration d'un réseau." },
  { title: "Serveur DNS", desc: "Je connais les notions de configuration d'un serveur DNS : résolution de noms, zones et enregistrements, essentielles au bon fonctionnement d'un réseau d'entreprise." },
  { title: "Adressage IP", desc: "Je maîtrise l'adressage IP (IPv4, sous-réseaux) nécessaire pour planifier, configurer et dépanner une infrastructure réseau." },
  { title: "Brassage & connectivité", desc: "J'ai pratiqué le brassage réseau et les tests de connectivité (ping, traceroute) pour diagnostiquer et valider une installation." },
  { title: "Maintenance matérielle", desc: "J'ai réalisé des interventions matérielles sur poste Windows : changement de disque dur et de RAM, en formation et dans un contexte professionnel." },
  { title: "Configuration IP", desc: "Je sais configurer les paramètres IP d'un poste Windows pour l'intégrer correctement à un réseau d'entreprise." },
  { title: "PowerShell", desc: "J'ai découvert les bases de PowerShell pour automatiser des tâches d'administration système simples." },
  { title: "Chiffrement", desc: "Je connais les notions de chiffrement de supports amovibles (type BitLocker To Go) pour protéger des données sensibles en mobilité." },
  { title: "Sécurisation des postes", desc: "J'ai appris les bonnes pratiques de sécurisation des postes de travail, renforcées par l'e-sensibilisation SensCyber de Cybermalveillance.gouv.fr." },
  { title: "Analyse de vulnérabilités", desc: "J'ai des notions d'analyse de vulnérabilités, pour identifier les failles potentielles d'un système avant qu'elles ne soient exploitées." }
];

const skillCards = document.querySelectorAll('.skill-card');
const skillOverlay = document.getElementById('skillModalOverlay');
const skillTitleEl = document.getElementById('skillModalTitle');
const skillDescEl = document.getElementById('skillModalDesc');
const skillClose = document.getElementById('skillModalClose');
const skillPrev = document.getElementById('skillModalPrev');
const skillNext = document.getElementById('skillModalNext');

if (skillCards.length && skillOverlay) {
  let currentSkill = 0;

  function openSkill(index) {
    currentSkill = (index + skillsData.length) % skillsData.length;
    skillTitleEl.textContent = skillsData[currentSkill].title;
    skillDescEl.textContent = skillsData[currentSkill].desc;
    skillOverlay.classList.add('open');
  }
  function closeSkill() { skillOverlay.classList.remove('open'); }

  skillCards.forEach(c => c.addEventListener('click', () => openSkill(Number(c.dataset.skill))));
  if (skillClose) skillClose.addEventListener('click', closeSkill);
  if (skillPrev) skillPrev.addEventListener('click', () => openSkill(currentSkill - 1));
  if (skillNext) skillNext.addEventListener('click', () => openSkill(currentSkill + 1));
  skillOverlay.addEventListener('click', (e) => { if (e.target === skillOverlay) closeSkill(); });
  document.addEventListener('keydown', (e) => {
    if (!skillOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeSkill();
    if (e.key === 'ArrowLeft') openSkill(currentSkill - 1);
    if (e.key === 'ArrowRight') openSkill(currentSkill + 1);
  });
}

// Modale Parcours (Formation & Expérience)
const parcoursData = [
  { title: "BTS SIO — Option SISR", dates: "Depuis septembre 2025", org: "Lycée Voillaume, Aulnay-sous-Bois",
    full: "Formation en BTS Services Informatiques aux Organisations, option Solutions d'Infrastructure, Systèmes et Réseaux (SISR), au Lycée Voillaume à Aulnay-sous-Bois. Cette formation couvre l'administration de serveurs et de réseaux, la virtualisation, la supervision d'infrastructure et la cybersécurité.",
    link: "https://www.lyceevoillaume.fr/", linkLabel: "Site du lycée" },
  { title: "1ère année BUT Techniques de commercialisation", dates: "Septembre 2024 - Juin 2025", org: "IUT de Cergy-Pontoise, site de Sarcelles",
    full: "Première année de BUT Techniques de commercialisation à l'IUT de Cergy-Pontoise (site de Sarcelles). Cette année m'a permis de confirmer mon intérêt pour l'informatique et de me réorienter vers un BTS SIO option SISR.",
    link: "https://cyiut.cyu.fr/publications/site-de-sarcelles", linkLabel: "Site de l'IUT" },
  { title: "Baccalauréat général", dates: "Septembre 2023 - Juillet 2024", org: "Lycée Galilée, Gennevilliers",
    full: "Baccalauréat général obtenu au Lycée Galilée à Gennevilliers, avec les spécialités Mathématiques et Sciences Économiques et Sociales (SES).",
    link: "https://lyc-galilee-gennevilliers.ac-versailles.fr/", linkLabel: "Site du lycée" },
  { title: "Stage informatique", dates: "Juin 2026 (4 semaines)", org: "HYGECO",
    full: [
      "Inventaire du matériel informatique en prévision d'un déménagement",
      "Suivi des tickets et incidents utilisateurs sur Freshservice",
      "Gestion des comptes utilisateurs sous Microsoft 365",
      "Déploiement d'une infrastructure de supervision (Hyper-V, Docker, Prometheus, Grafana)",
      "Masterisation et déploiement de postes via PXE",
      "Intégration de Windows Exporter et création de règles d'alertes Prometheus",
      "Configuration des notifications d'alertes par email et rédaction de documentation technique",
      "Masterisation d'un poste et création de compte pour un nouvel utilisateur",
      "Déploiement d'Uptime Kuma pour la supervision de disponibilité des services"
    ],
    link: "https://www.hygeco.com/", linkLabel: "Site de l'entreprise" },
  { title: "Stage Vente", dates: "Janvier - Février 2025 (1 mois)", org: "Maxxi Games, Saint-Denis",
    full: "Stage d'observation et de vente d'un mois au sein du magasin de jeux vidéo Maxxi Games à Saint-Denis : accueil et conseil client, mise en rayon, tenue de caisse.",
    link: "http://www.maxxi-games.fr/", linkLabel: "Site de l'entreprise" },
  { title: "Coach adjoint bénévole", dates: "Septembre 2023 - Juin 2024 (saison complète)", org: "Équipe de football (catégorie U12), Gennevilliers",
    full: "Coach adjoint bénévole d'une équipe de football de la catégorie U12 à Gennevilliers pendant une saison complète : organisation des entraînements et encadrement des jeunes joueurs.",
    link: null, linkLabel: null }
];

const parcoursItems = document.querySelectorAll('[data-parcours]');
const parcoursOverlay = document.getElementById('parcoursModalOverlay');
const parcoursBodyEl = document.getElementById('parcoursModalBody');
const parcoursClose = document.getElementById('parcoursModalClose');
const parcoursPrev = document.getElementById('parcoursModalPrev');
const parcoursNext = document.getElementById('parcoursModalNext');

if (parcoursItems.length && parcoursOverlay) {
  let currentParcours = 0;

  function openParcours(index) {
    currentParcours = (index + parcoursData.length) % parcoursData.length;
    const p = parcoursData[currentParcours];
    const contentHtml = Array.isArray(p.full)
      ? `<ul class="task-checklist">${p.full.map(m => `<li>${m}</li>`).join('')}</ul>`
      : `<p>${p.full}</p>`;
    parcoursBodyEl.innerHTML = `
      <h3 class="accent">${p.title}</h3>
      <p class="parcours-modal-meta">${p.dates} — ${p.org}</p>
      ${contentHtml}
      ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:16px;">${p.linkLabel} &#8599;</a>` : ''}
    `;
    parcoursOverlay.classList.add('open');
  }
  function closeParcours() { parcoursOverlay.classList.remove('open'); }

  parcoursItems.forEach(c => c.addEventListener('click', () => openParcours(Number(c.dataset.parcours))));
  if (parcoursClose) parcoursClose.addEventListener('click', closeParcours);
  if (parcoursPrev) parcoursPrev.addEventListener('click', () => openParcours(currentParcours - 1));
  if (parcoursNext) parcoursNext.addEventListener('click', () => openParcours(currentParcours + 1));
  parcoursOverlay.addEventListener('click', (e) => { if (e.target === parcoursOverlay) closeParcours(); });
  document.addEventListener('keydown', (e) => {
    if (!parcoursOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeParcours();
    if (e.key === 'ArrowLeft') openParcours(currentParcours - 1);
    if (e.key === 'ArrowRight') openParcours(currentParcours + 1);
  });
}

// =========================================================
// Page E5 — Tableau de bord des tâches de stage
// =========================================================
const e5Tasks = [
  { id: 0, title: "Inventaire du matériel informatique", icon: "monitor", bloc: "patrimoine", lieu: "entreprise",
    short: "Inventaire complet des équipements (postes, écrans, périphériques, consommables, imprimantes) en prévision d'un déménagement, avec vérification de l'état du matériel.",
    tags: ["Gestion de parc", "Excel", "Inventaire"],
    description: "En prévision du déménagement des locaux de l'entreprise, j'ai été chargé de réaliser un inventaire complet du matériel informatique afin d'anticiper le transfert et le remplacement des équipements obsolètes.",
    outils: ["Excel", "Échanges avec le responsable informatique"],
    travauxIntro: "J'ai structuré un fichier Excel en plusieurs feuilles afin de répertorier précisément le parc informatique de l'entreprise.",
    etapes: [
      { label: "Recensement", desc: "Répertorier les équipements en stock : ordinateurs, écrans, périphériques." },
      { label: "Consommables", desc: "Lister les consommables informatiques, notamment les toners d'imprimantes." },
      { label: "Imprimantes", desc: "Répertorier l'ensemble des imprimantes présentes dans l'entreprise." },
      { label: "Vérification", desc: "Contrôler avec le responsable informatique l'état de chaque équipement (fonctionnel, hors service, à réparer)." }
    ],
    images: [],
    resultat: "Un inventaire fiable et à jour du parc informatique, exploitable pour préparer le déménagement et anticiper les besoins de remplacement de matériel." },

  { id: 1, title: "Suivi des tickets et incidents", icon: "ticket", bloc: "incidents", lieu: "entreprise",
    short: "Découverte de l'outil Freshservice et observation du traitement des demandes utilisateurs, ainsi que de la gestion des incidents selon leur gravité.",
    tags: ["Support", "Freshservice", "Gestion des incidents"],
    description: "Découverte des processus de gestion des incidents informatiques de l'entreprise, à travers une réunion d'équipe et le suivi d'un ticket réel sur l'outil Freshservice.",
    outils: ["Freshservice"],
    travauxIntro: "J'ai assisté à une réunion de l'équipe informatique consacrée à la gestion des incidents selon leur niveau de gravité, puis j'ai découvert l'outil de ticketing Freshservice.",
    etapes: [
      { label: "Réunion incidents", desc: "Comprendre comment les incidents sont traités selon leur gravité et leur impact sur l'activité." },
      { label: "Priorisation", desc: "Échanges sur la gestion des incidents prioritaires et les procédures de résolution." },
      { label: "Découverte Freshservice", desc: "Observation du traitement des demandes utilisateurs sur l'outil." },
      { label: "Suivi d'un ticket", desc: "Suivi complet d'un ticket de création de compte utilisateur, de l'ouverture à la résolution." }
    ],
    images: [],
    resultat: "Une meilleure compréhension des procédures de traitement des incidents et de l'usage d'un outil de ticketing professionnel." },

  { id: 2, title: "Gestion des comptes utilisateurs", icon: "user", bloc: "service", lieu: "entreprise",
    short: "Observation de la création d'un compte Microsoft 365, affectation à un groupe de service et vérification des droits et accès.",
    tags: ["Microsoft 365", "Administration", "Comptes utilisateurs"],
    description: "Observation du processus de création et de gestion d'un compte utilisateur au sein de l'environnement Microsoft 365 de l'entreprise.",
    outils: ["Microsoft 365 Administration"],
    travauxIntro: "J'ai suivi la création d'un compte utilisateur dans Microsoft 365 Administration, depuis sa création jusqu'à la vérification de ses accès.",
    etapes: [
      { label: "Création du compte", desc: "Observation de la création d'un compte dans Microsoft 365 Administration." },
      { label: "Affectation au groupe", desc: "Affectation de l'utilisateur au groupe correspondant à son service." },
      { label: "Vérification des accès", desc: "Contrôle des droits et accès associés au compte créé." }
    ],
    images: [],
    resultat: "Compréhension du circuit complet de provisionnement d'un compte utilisateur en entreprise." },

  { id: 3, title: "Déploiement d'une infrastructure de supervision", icon: "server", bloc: "projet", lieu: "entreprise",
    short: "Mise en place d'une solution de supervision des serveurs : VM Hyper-V, Ubuntu Server, Docker, Prometheus et Grafana.",
    tags: ["Supervision", "Hyper-V", "Docker", "Prometheus", "Grafana"],
    description: "Mise en place, avec l'équipe informatique, d'une solution de supervision et de monitoring des serveurs de l'entreprise, permettant de surveiller en temps réel leur état et leurs performances.",
    outils: ["Hyper-V", "Ubuntu Server LTS", "SSH", "Docker", "Prometheus", "Grafana"],
    travauxIntro: "Un plan d'action détaillé a d'abord été élaboré pour définir les étapes du déploiement, avant la mise en place technique de la solution.",
    etapes: [
      { label: "Machine virtuelle", desc: "Création et configuration d'une VM sur un serveur physique via Hyper-V." },
      { label: "Installation d'Ubuntu Server", desc: "Installation d'Ubuntu Server LTS à partir d'une image ISO officielle." },
      { label: "Configuration SSH", desc: "Mise en place du service SSH pour l'administration à distance sécurisée." },
      { label: "Déploiement Docker", desc: "Installation de Docker pour déployer les conteneurs de supervision." },
      { label: "Prometheus & Grafana", desc: "Déploiement de Prometheus (collecte des métriques) et Grafana (visualisation en tableaux de bord)." }
    ],
    images: [],
    resultat: "Une infrastructure de supervision partiellement opérationnelle, avec la collecte des métriques serveurs et une première visualisation Grafana en place." },

  { id: 4, title: "Masterisation et déploiement via PXE", icon: "monitor", bloc: "patrimoine", lieu: "entreprise",
    short: "Déploiement automatique d'une image système standardisée sur plusieurs machines via démarrage réseau PXE.",
    tags: ["Masterisation", "PXE", "Déploiement"],
    description: "Participation à une opération de déploiement automatisé d'une image système standardisée sur plusieurs postes via démarrage réseau.",
    outils: ["PXE (Preboot Execution Environment)"],
    travauxIntro: "Cette intervention consistait à démarrer des postes directement depuis le réseau via le BIOS afin de déployer automatiquement une image système sur plusieurs machines.",
    etapes: [
      { label: "Démarrage réseau", desc: "Configuration du BIOS des postes pour démarrer via PXE." },
      { label: "Déploiement de l'image", desc: "Déploiement automatique de l'image système standardisée sur les machines cibles." }
    ],
    images: [],
    resultat: "Plusieurs postes masterisés rapidement et de façon homogène, sans intervention manuelle poste par poste." },

  { id: 5, title: "Intégration Windows Exporter & alertes Prometheus", icon: "bell", bloc: "incidents", lieu: "entreprise",
    short: "Supervision d'un serveur Windows et création de règles d'alertes (serveur injoignable, CPU/RAM élevés).",
    tags: ["Prometheus", "Windows Exporter", "Alertmanager"],
    description: "Extension de l'infrastructure de supervision à un serveur Windows, et mise en place de règles d'alertes pour détecter automatiquement les anomalies.",
    outils: ["Windows Exporter", "Prometheus", "Docker Compose", "Nano", "SSH"],
    travauxIntro: "Après vérification du bon fonctionnement des conteneurs Docker existants, j'ai intégré un serveur Windows à la supervision et configuré des alertes automatiques.",
    etapes: [
      { label: "Installation de Windows Exporter", desc: "Installation sur le serveur Windows cible pour permettre la collecte des métriques système." },
      { label: "Configuration Prometheus", desc: "Ajout d'un nouveau job dédié à Windows Exporter, avec label hostname (T1A-V-SAO) pour identifier le serveur." },
      { label: "Tests de remontée", desc: "Vérification de l'état du serveur, de l'utilisation CPU/RAM et des autres indicateurs système." },
      { label: "Règles d'alertes", desc: "Création du groupe d'alertes Windows : Serveur_Injoignable, CPU_Élevé, RAM_Élevée." },
      { label: "Intégration Docker", desc: "Montage du répertoire des règles d'alertes dans le conteneur Prometheus via docker-compose.yml." }
    ],
    images: [],
    resultat: "Le serveur Windows est désormais supervisé et remonte ses métriques ; les alertes critiques sont détectées automatiquement par Prometheus." },

  { id: 6, title: "Notifications d'alertes & documentation technique", icon: "document", bloc: "devpro", lieu: "entreprise",
    short: "Configuration de l'envoi d'alertes par email via Alertmanager, tests de bout en bout et rédaction de la documentation.",
    tags: ["Alertmanager", "SMTP", "Documentation"],
    description: "Finalisation de la chaîne d'alerte en configurant l'envoi automatique de notifications par email, puis validation complète de la solution de supervision.",
    outils: ["Alertmanager", "SMTP"],
    travauxIntro: "J'ai complété la configuration d'Alertmanager pour permettre l'envoi automatique d'alertes par courrier électronique en cas d'incident détecté par Prometheus.",
    etapes: [
      { label: "Configuration SMTP", desc: "Ajout des informations de connexion au serveur SMTP (serveur, port, compte d'envoi) dans Alertmanager." },
      { label: "Destinataires", desc: "Ajout des adresses des membres du service informatique devant recevoir les alertes." },
      { label: "Simulation d'incidents", desc: "Simulation de plusieurs alertes pour valider l'envoi correct des emails." },
      { label: "Vérifications globales", desc: "Contrôle de la collecte Prometheus, des tableaux de bord Grafana et du déclenchement des alertes Alertmanager." },
      { label: "Documentation", desc: "Rédaction de la documentation technique complète de la solution de supervision." }
    ],
    images: [],
    resultat: "Une chaîne d'alerte fonctionnelle de bout en bout, avec notification email automatique, et une documentation permettant la reprise ou la maintenance de la solution." },

  { id: 7, title: "Masterisation de poste & création de compte", icon: "user", bloc: "service", lieu: "entreprise",
    short: "Déploiement d'une image Windows 11 préconfigurée et participation à la création d'un compte utilisateur.",
    tags: ["Windows 11", "Masterisation", "Microsoft 365"],
    description: "Préparation d'un poste de travail pour un nouvel utilisateur : déploiement d'une image système et création de son compte.",
    outils: ["Windows 11", "Microsoft 365"],
    travauxIntro: "J'ai participé à la masterisation d'un poste destiné à un utilisateur, ainsi qu'à la création de son compte.",
    etapes: [
      { label: "Masterisation", desc: "Déploiement d'une image système Windows 11 préconfigurée sur le poste." },
      { label: "Création du compte", desc: "Création du compte pour le nouvel utilisateur." },
      { label: "Attribution de licence", desc: "Attribution de la licence Microsoft 365 nécessaire à l'utilisateur." }
    ],
    images: [],
    resultat: "Un poste prêt à l'emploi et un compte utilisateur pleinement fonctionnel avant l'arrivée du collaborateur." },

  { id: 8, title: "Déploiement d'Uptime Kuma", icon: "radar", bloc: "projet", lieu: "entreprise",
    short: "Mise en place d'une supervision de disponibilité (HTTPS, TCP, Ping, DNS) pour le site web et les services réseau.",
    tags: ["Uptime Kuma", "Docker", "Disponibilité"],
    description: "Mise en place d'une seconde solution de supervision, orientée disponibilité des services, en complément de la stack Prometheus/Grafana déjà déployée.",
    outils: ["Docker", "Docker Compose", "Uptime Kuma"],
    travauxIntro: "Contrairement à Prometheus, davantage orienté métriques système, Uptime Kuma permet de surveiller en temps réel la disponibilité des serveurs, sites web et services réseau.",
    etapes: [
      { label: "Déploiement du conteneur", desc: "Création d'un fichier docker-compose.yml pour déployer Uptime Kuma (image, volumes persistants, port)." },
      { label: "Configuration initiale", desc: "Accès à l'interface web et création du compte administrateur." },
      { label: "Sonde HTTPS", desc: "Vérification de l'accessibilité du site web de l'entreprise, du temps de réponse et de la validité du certificat SSL/TLS." },
      { label: "Sonde TCP", desc: "Contrôle qu'un service réseau écoute bien sur un port précis." },
      { label: "Sonde Ping (ICMP)", desc: "Vérification de la joignabilité d'un équipement et mesure de la latence." },
      { label: "Sonde DNS", desc: "Contrôle de la bonne résolution d'un nom de domaine vers son adresse IP." },
      { label: "Documentation", desc: "Rédaction de la documentation technique de l'installation, la configuration et l'utilisation de la solution." }
    ],
    images: [],
    resultat: "Une supervision de disponibilité opérationnelle sur le site web et les services réseau clés, avec alertes automatiques en cas d'interruption." }
];

const e5Icons = {
  monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4V8z"/><path d="M10 6v12" stroke-dasharray="2 2"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c1-3.5 3.8-5.5 7-5.5s6 2 7 5.5"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3a1 1 0 011 1v1.06A6 6 0 0119 11v3l1.5 3h-17L5 14v-3a6 6 0 016-5.94V4a1 1 0 011-1z"/><path d="M9 20a3 3 0 006 0"/></svg>',
  document: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9 13h6M9 17h6"/></svg>',
  radar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="M12 3v2M21 12h-2"/></svg>'
};

const blocLabels = {
  patrimoine: "Gérer le patrimoine informatique",
  incidents: "Répondre aux incidents et demandes",
  presence: "Développer la présence en ligne",
  projet: "Travailler en mode projet",
  service: "Mettre à disposition un service",
  devpro: "Organiser son développement professionnel"
};

const e5Grid = document.getElementById('e5TasksGrid');
const e5SidebarList = document.getElementById('e5SidebarList');

if (e5Grid && e5SidebarList) {
  // Rendu des cartes
  e5Grid.innerHTML = e5Tasks.map(t => `
    <button class="glass card task-card" data-id="${t.id}" data-bloc="${t.bloc}" data-lieu="${t.lieu}">
      <span class="bloc-badge dot-${t.bloc}"></span>
      <h4>${t.title}</h4>
      <p>${t.short}</p>
      <span class="veille-link accent">Voir plus...</span>
    </button>
  `).join('');

  // Rendu de la sidebar
  e5SidebarList.innerHTML = e5Tasks.map(t => `
    <li><a href="#" data-id="${t.id}"><span class="sidebar-icon">${e5Icons[t.icon]}</span><span class="sidebar-text">${t.title}</span></a></li>
  `).join('');

  const taskCards = document.querySelectorAll('.task-card');

  // Filtres
  const legendItems = document.querySelectorAll('.legend-item');
  const filterPills = document.querySelectorAll('.filter-pill');
  let activeBloc = 'all';
  let activeLieu = 'all';

  function applyFilters() {
    taskCards.forEach(card => {
      const matchBloc = activeBloc === 'all' || card.dataset.bloc === activeBloc;
      const matchLieu = activeLieu === 'all' || card.dataset.lieu === activeLieu;
      card.classList.toggle('hidden', !(matchBloc && matchLieu));
    });
  }
  legendItems.forEach(item => item.addEventListener('click', () => {
    legendItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    activeBloc = item.dataset.bloc;
    applyFilters();
  }));
  filterPills.forEach(pill => pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activeLieu = pill.dataset.lieu;
    applyFilters();
  }));

  // Sidebar collapse
  const e5Sidebar = document.getElementById('e5Sidebar');
  const e5SidebarToggle = document.getElementById('e5SidebarToggle');
  if (e5SidebarToggle) e5SidebarToggle.addEventListener('click', () => e5Sidebar.classList.toggle('collapsed'));

  // Modale
  const taskOverlay = document.getElementById('taskModalOverlay');
  const taskBodyEl = document.getElementById('taskModalBody');
  const taskClose = document.getElementById('taskModalClose');
  const taskPrev = document.getElementById('taskModalPrev');
  const taskNext = document.getElementById('taskModalNext');
  let currentTask = 0;

  const sectionIcons = {
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>',
    tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 005.4-5.4l-2.6 2.6-2-2 2.6-2.6z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></svg>'
  };

  function openTask(index) {
    currentTask = (index + e5Tasks.length) % e5Tasks.length;
    const t = e5Tasks[currentTask];

    const tagsHtml = t.tags.map(tag => `<span class="badge">${tag}</span>`).join('');
    const outilsHtml = t.outils.map(o => `<li>${o}</li>`).join('');
    const etapesHtml = t.etapes.map(e => `<li><strong>${e.label} :</strong> ${e.desc}</li>`).join('');
    const imagesHtml = (t.images && t.images.length)
      ? t.images.map(img => `<figure class="task-figure"><img src="${img.src}" alt="${img.caption || ''}"><figcaption>${img.caption || ''}</figcaption></figure>`).join('')
      : '';

    taskBodyEl.innerHTML = `
      <h3 class="accent">${t.title}</h3>
      <div class="task-tags">${tagsHtml}</div>

      <div class="task-section">
        <div class="task-section-head">${sectionIcons.info}<h4>Description de la mission</h4></div>
        <p>${t.description}</p>
      </div>

      <div class="task-section">
        <div class="task-section-head">${sectionIcons.tools}<h4>Outils utilisés</h4></div>
        <ul class="task-checklist">${outilsHtml}</ul>
      </div>

      <div class="task-section">
        <div class="task-section-head">${sectionIcons.check}<h4>Travaux réalisés</h4></div>
        <p>${t.travauxIntro}</p>
        ${imagesHtml}
        <p class="task-etapes-title">Étapes de l'intervention :</p>
        <ul class="task-checklist">${etapesHtml}</ul>
      </div>

      <div class="task-section">
        <div class="task-section-head">${sectionIcons.target}<h4>Résultat</h4></div>
        <p>${t.resultat}</p>
      </div>
    `;
    taskOverlay.classList.add('open');
  }
  function closeTask() { taskOverlay.classList.remove('open'); }

  taskCards.forEach(c => c.addEventListener('click', () => openTask(Number(c.dataset.id))));

  // Clic sidebar : scroll + surbrillance de la carte correspondante (pas de popup)
  function scrollToTask(id) {
    const card = document.querySelector(`.task-card[data-id="${id}"]`);
    if (!card) return;
    // Réinitialise les filtres pour être sûr que la carte visée est bien visible
    activeBloc = 'all';
    activeLieu = 'all';
    legendItems.forEach(i => i.classList.toggle('active', i.dataset.bloc === 'all'));
    filterPills.forEach(p => p.classList.toggle('active', p.dataset.lieu === 'all'));
    applyFilters();

    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('highlight');
    setTimeout(() => card.classList.remove('highlight'), 1600);
  }
  e5SidebarList.querySelectorAll('a').forEach(a => a.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTask(Number(a.dataset.id));
  }));
  if (taskClose) taskClose.addEventListener('click', closeTask);
  if (taskPrev) taskPrev.addEventListener('click', () => openTask(currentTask - 1));
  if (taskNext) taskNext.addEventListener('click', () => openTask(currentTask + 1));
  taskOverlay.addEventListener('click', (e) => { if (e.target === taskOverlay) closeTask(); });
  document.addEventListener('keydown', (e) => {
    if (!taskOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeTask();
    if (e.key === 'ArrowLeft') openTask(currentTask - 1);
    if (e.key === 'ArrowRight') openTask(currentTask + 1);
  });
}
