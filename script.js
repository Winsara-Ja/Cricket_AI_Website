// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 100) {
    navbar.style.borderBottomColor = 'rgba(30, 33, 48, 0.8)';
  } else {
    navbar.style.borderBottomColor = 'rgba(30, 33, 48, 0.3)';
  }
  lastScroll = currentScroll;
});

// ===== DOMAIN SIDEBAR ACTIVE STATE =====
const domainLinks = document.querySelectorAll('.domain-sidebar a');
if (domainLinks.length > 0) {
  const sections = [];
  domainLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.getElementById(href.slice(1));
      if (section) sections.push({ link, section });
    }
  });

  window.addEventListener('scroll', () => {
    let current = sections[0];
    sections.forEach((item) => {
      if (window.scrollY >= item.section.offsetTop - 200) {
        current = item;
      }
    });
    domainLinks.forEach((l) => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  });
}

// ===== STAT COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-item h3').forEach((el) => {
    const text = el.textContent.trim();
    const num = parseInt(text);
    if (isNaN(num)) return;

    let current = 0;
    const duration = 1500;
    const step = Math.ceil(num / (duration / 16));

    const counter = setInterval(() => {
      current += step;
      if (current >= num) {
        current = num;
        clearInterval(counter);
      }
      el.textContent = current;
    }, 16);
  });
}

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  statsObserver.observe(statsBar);
}
