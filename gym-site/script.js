'use strict';

// Header behavior
const header = document.getElementById('header');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.classList.toggle('scrolled', current > 10);
  lastScrollY = current;
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// Smooth active link highlight
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
sections.forEach(s => observer.observe(s));

// GSAP animations
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  // Logo entrance
  gsap.to('.logo-mark', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 });

  // Hero content
  gsap.from('.hero-title', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
  gsap.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.35 });
  gsap.from('.hero-ctas .btn', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.45 });

  // Cards reveal
  gsap.utils.toArray('.card').forEach((card, i) => {
    gsap.to(card, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 85%' }
    });
  });

  // Sections titles
  gsap.utils.toArray('.section-title, .section-subtitle').forEach(el => {
    gsap.from(el, {
      y: 16, opacity: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}

// Counters
const counters = document.querySelectorAll('.count');
let countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  counters.forEach(el => {
    const target = Number(el.dataset.target || '0');
    try {
      const counter = new window.CountUp.CountUp(el, target, { duration: 2, separator: ',', enableScrollSpy: false });
      if (!counter.error) counter.start();
    } catch (_) { el.textContent = String(target); }
  });
}
const countersObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) startCounters();
  });
}, { rootMargin: '0px 0px -20% 0px' });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) countersObserver.observe(heroStats);

// Swiper Testimonials
const testimonialEl = document.querySelector('.testimonial-swiper');
if (testimonialEl && window.Swiper) {
  new Swiper(testimonialEl, {
    slidesPerView: 1,
    spaceBetween: 16,
    grabCursor: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      700: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
}

// GLightbox Gallery
if (window.GLightbox) {
  GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true, closeButton: true });
}

// Newsletter form (demo)
const form = document.querySelector('.newsletter');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = /** @type {HTMLInputElement} */(form.querySelector('#email')).value.trim();
    if (!email) return;
    form.reset();
    const btn = form.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Subscribed';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2400);
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());