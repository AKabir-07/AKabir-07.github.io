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

// =========================================================
// Page E5 — Tableau de bord des tâches de stage
// =========================================================
const e5Tasks = [
  { id: 0, title: "Inventaire du matériel informatique", short: "Inventaire complet des équipements (postes, écrans, périphériques, consommables, imprimantes) en prévision d'un déménagement, avec vérification de l'état du matériel.", full: "Ma principale mission a consisté à réaliser un inventaire complet des équipements informatiques de l'entreprise en prévision du futur déménagement des locaux. J'ai créé un fichier Excel structuré en plusieurs feuilles pour répertorier les équipements en stock, les consommables (toners) et les imprimantes. J'ai ensuite participé à une vérification avec le responsable informatique afin d'identifier les équipements fonctionnels, hors service, ou nécessitant une réparation.", bloc: "patrimoine", lieu: "entreprise", outils: ["Excel"] },
  { id: 1, title: "Suivi des tickets et incidents", short: "Découverte de l'outil Freshservice et observation du traitement des demandes utilisateurs, ainsi que de la gestion des incidents selon leur gravité.", full: "J'ai assisté à une réunion de l'équipe informatique consacrée à la gestion des incidents selon leur niveau de gravité et leur impact sur l'activité de l'entreprise (incidents prioritaires, procédures de résolution, réduction du nombre d'incidents, amélioration de la sécurité du SI). J'ai également découvert l'outil Freshservice et suivi le traitement d'un ticket de création de compte utilisateur.", bloc: "incidents", lieu: "entreprise", outils: ["Freshservice"] },
  { id: 2, title: "Gestion des comptes utilisateurs", short: "Observation de la création d'un compte Microsoft 365, affectation à un groupe de service et vérification des droits et accès.", full: "J'ai observé la création d'un compte utilisateur dans Microsoft 365 Administration, l'affectation de cet utilisateur à un groupe correspondant à son service, ainsi que la vérification des droits et accès associés.", bloc: "service", lieu: "entreprise", outils: ["Microsoft 365 Admin"] },
  { id: 3, title: "Déploiement d'une infrastructure de supervision", short: "Mise en place d'une solution de supervision des serveurs : VM Hyper-V, Ubuntu Server, Docker, Prometheus et Grafana.", full: "Élaboration d'un plan d'action détaillé pour déployer une solution de supervision temps réel des serveurs (CPU, mémoire, stockage, réseau). J'ai créé et configuré une machine virtuelle Hyper-V, installé Ubuntu Server LTS, configuré le service SSH pour l'administration à distance, puis installé Docker pour déployer les conteneurs Prometheus (collecte des métriques) et Grafana (tableaux de bord de visualisation).", bloc: "projet", lieu: "entreprise", outils: ["Hyper-V", "Ubuntu Server", "Docker", "Prometheus", "Grafana", "SSH"] },
  { id: 4, title: "Masterisation et déploiement via PXE", short: "Déploiement automatique d'une image système standardisée sur plusieurs machines via démarrage réseau PXE.", full: "Participation à une opération de masterisation et de déploiement système via PXE (Preboot Execution Environment) : démarrage des postes directement depuis le réseau via le BIOS afin de déployer automatiquement une image système standardisée sur plusieurs machines.", bloc: "patrimoine", lieu: "entreprise", outils: ["PXE"] },
  { id: 5, title: "Intégration Windows Exporter & alertes Prometheus", short: "Supervision d'un serveur Windows et création de règles d'alertes (serveur injoignable, CPU/RAM élevés).", full: "Installation de Windows Exporter sur un serveur Windows cible pour la collecte de métriques, configuration d'un nouveau job Prometheus dédié, et validation de la remontée des informations (état du serveur, CPU, RAM) via le label hostname. J'ai ensuite organisé les fichiers de configuration Prometheus, créé un groupe d'alertes dédié aux serveurs Windows (Serveur_Injoignable, CPU_Élevé, RAM_Élevée) et intégré le montage des règles dans le conteneur via docker-compose.yml.", bloc: "incidents", lieu: "entreprise", outils: ["Docker Compose", "Prometheus", "Alertmanager", "Windows Exporter", "SSH", "Nano"] },
  { id: 6, title: "Notifications d'alertes & documentation technique", short: "Configuration de l'envoi d'alertes par email via Alertmanager, tests de bout en bout et rédaction de la documentation.", full: "Finalisation de la configuration d'Alertmanager pour l'envoi automatique d'alertes par email (paramétrage SMTP, destinataires du service informatique) et simulation d'incidents pour valider les notifications. J'ai ensuite vérifié le bon fonctionnement de toute la stack de supervision (Prometheus, Grafana, Alertmanager) et rédigé la documentation technique complète de la solution.", bloc: "devpro", lieu: "entreprise", outils: ["Alertmanager", "Documentation technique"] },
  { id: 7, title: "Masterisation de poste & création de compte", short: "Déploiement d'une image Windows 11 préconfigurée et participation à la création d'un compte utilisateur.", full: "Participation à la masterisation d'un poste informatique par déploiement d'une image système Windows 11 préconfigurée, afin de préparer rapidement le poste avant sa mise en service. J'ai également assisté à la création d'un compte pour un nouvel utilisateur, incluant l'attribution de la licence nécessaire.", bloc: "service", lieu: "entreprise", outils: ["Windows 11", "Microsoft 365"] },
  { id: 8, title: "Déploiement d'Uptime Kuma", short: "Mise en place d'une supervision de disponibilité (HTTPS, TCP, Ping, DNS) pour le site web et les services réseau.", full: "Déploiement d'Uptime Kuma via Docker (fichier docker-compose.yml, volumes persistants, port d'accès) pour superviser la disponibilité du site internet de l'entreprise et de plusieurs services réseau. J'ai configuré des sondes HTTPS, TCP, Ping (ICMP) et DNS, puis rédigé la documentation technique de la solution.", bloc: "projet", lieu: "entreprise", outils: ["Docker", "Uptime Kuma"] }
];

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
    <button class="glass card task-card reveal" data-id="${t.id}" data-bloc="${t.bloc}" data-lieu="${t.lieu}">
      <span class="bloc-badge dot-${t.bloc}"></span>
      <h4>${t.title}</h4>
      <p>${t.short}</p>
      <span class="veille-link accent">Voir plus...</span>
    </button>
  `).join('');

  // Rendu de la sidebar
  e5SidebarList.innerHTML = e5Tasks.map(t => `
    <li><a href="#" data-id="${t.id}"><span class="sidebar-dot dot-${t.bloc}"></span>${t.title}</a></li>
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
  const taskTitleEl = document.getElementById('taskModalTitle');
  const taskDescEl = document.getElementById('taskModalDesc');
  const taskBlocEl = document.getElementById('taskModalBloc');
  const taskToolsEl = document.getElementById('taskModalTools');
  const taskClose = document.getElementById('taskModalClose');
  const taskPrev = document.getElementById('taskModalPrev');
  const taskNext = document.getElementById('taskModalNext');
  let currentTask = 0;

  function openTask(index) {
    currentTask = (index + e5Tasks.length) % e5Tasks.length;
    const t = e5Tasks[currentTask];
    taskTitleEl.textContent = t.title;
    taskDescEl.textContent = t.full;
    taskBlocEl.textContent = blocLabels[t.bloc];
    taskToolsEl.innerHTML = t.outils.map(o => `<span class="badge">${o}</span>`).join('');
    taskOverlay.classList.add('open');
  }
  function closeTask() { taskOverlay.classList.remove('open'); }

  taskCards.forEach(c => c.addEventListener('click', () => openTask(Number(c.dataset.id))));
  e5SidebarList.querySelectorAll('a').forEach(a => a.addEventListener('click', (e) => {
    e.preventDefault();
    openTask(Number(a.dataset.id));
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
