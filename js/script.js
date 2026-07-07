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
const veilleSteps = document.querySelectorAll('.veille-step');
const veilleCards = document.querySelectorAll('.veille-card');
const veilleDots = document.querySelectorAll('.veille-dots .dot');
const veillePrev = document.getElementById('veillePrev');
const veilleNext = document.getElementById('veilleNext');

if (veilleSteps.length) {
  let currentStep = 0;
  const totalSteps = veilleSteps.length;

  function goToStep(index) {
    currentStep = (index + totalSteps) % totalSteps;
    veilleSteps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === currentStep));
    veilleCards.forEach(c => c.classList.toggle('active', Number(c.dataset.step) === currentStep));
    veilleDots.forEach(d => d.classList.toggle('active', Number(d.dataset.step) === currentStep));
  }

  veilleSteps.forEach(s => s.addEventListener('click', () => goToStep(Number(s.dataset.step))));
  veilleDots.forEach(d => d.addEventListener('click', () => goToStep(Number(d.dataset.step))));
  if (veillePrev) veillePrev.addEventListener('click', () => goToStep(currentStep - 1));
  if (veilleNext) veilleNext.addEventListener('click', () => goToStep(currentStep + 1));
}
