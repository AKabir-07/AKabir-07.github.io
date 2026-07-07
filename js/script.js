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
