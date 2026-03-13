/* ═══════════════════════════════════════════
   ALEX REEL — Video Editor Portfolio
   script.js  |  Theme Toggle + Work Links
   ═══════════════════════════════════════════ */

/* ─── ANIMATED HERO PARTICLES ─── */
function createParticles() {
  const container = document.getElementById('particlesContainer');
  if (!container) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const rand = Math.random();
    if (rand < 0.3) particle.classList.add('small');
    else if (rand > 0.7) particle.classList.add('large');
    
    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // Random animation duration and delay
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 5;
    const offset = Math.random() * 40 - 20;
    
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    particle.style.setProperty('--x-offset', offset + 'px');
    
    // Update animation to use the CSS variable
    const style = document.createElement('style');
    style.textContent = `
      .particle {
        --x-offset: 0px;
      }
      @keyframes float {
        0% { transform: translateY(100vh) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(var(--x-offset)); opacity: 0; }
      }
    `;
    if (i === 0) document.head.appendChild(style);
    
    container.appendChild(particle);
  }
}

// Create particles on page load
document.addEventListener('DOMContentLoaded', createParticles);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createParticles);
} else {
  createParticles();
}

/* ─── CUSTOM CURSOR ─── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';
});

(function animateRing() {
  rx += (mx - rx - 19) * 0.18;
  ry += (my - ry - 19) * 0.18;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll(
  'a, button, .portfolio-item, .service-card, .testimonial-card, .tool-card'
).forEach((el) => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('expand'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('expand'));
});


/* ─── DARK / LIGHT THEME TOGGLE ─── */
const html       = document.documentElement;
const themeBtn   = document.getElementById('themeToggle');
const themeIcon  = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

// Persist theme across reloads
const savedTheme = localStorage.getItem('arTheme') || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('arTheme', next);
});

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  if (theme === 'light') {
    themeIcon.className  = 'fas fa-moon';   // clicking again returns to dark
    themeLabel.textContent = 'Dark';
  } else {
    themeIcon.className  = 'fas fa-sun';
    themeLabel.textContent = 'Light';
  }
}


/* ─── NAVBAR SHRINK ON SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach((a) =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);


/* ─── SCROLL PROGRESS BAR ─── */
const scrollBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.width = pct + '%';
});


/* ─── ANIMATED REEL WAVEFORM BARS ─── */
const reelBarsContainer = document.getElementById('reelBars');
if (reelBarsContainer) {
  for (let i = 0; i < 40; i++) {
    const bar = document.createElement('div');
    bar.className = 'reel-bar';
    bar.style.animationDuration = (0.6 + Math.random() * 1.2) + 's';
    bar.style.animationDelay    = (Math.random() * 1) + 's';
    reelBarsContainer.appendChild(bar);
  }
}


/* ─── HERO STAT COUNTERS ─── */
const counterEls = document.querySelectorAll('[data-count]');
if (counterEls.length > 0) {
  let counted = false;

  function animateCounters() {
    if (counted) return;
    const heroRect = document.getElementById('hero').getBoundingClientRect();
    if (heroRect.bottom > 0) {
      counted = true;
      counterEls.forEach((el) => {
        const target = +el.dataset.count;
        const suffix = target >= 10 ? '+' : '';
        let current = 0;
        const inc   = target / 60;
        const timer = setInterval(() => {
          current += inc;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current) + suffix;
        }, 25);
      });
    }
  }
  window.addEventListener('scroll', animateCounters);
  setTimeout(animateCounters, 500);
}


/* ─── SCROLL REVEAL & ANIMATIONS ─── */
const revealEls = document.querySelectorAll('.reveal, .scale-reveal, .rotate-reveal, .slide-left, .slide-right, .bounce-in, .stagger-children');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Don't unobserve - allow re-trigger on scroll back up if needed
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* ─── PARALLAX SCROLL EFFECT ─── */
const parallaxEls = document.querySelectorAll('.parallax');
let ticking = false;

function updateParallax() {
  parallaxEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const offset = (window.innerHeight - rect.top) * 0.5;
    el.style.transform = `translateY(${offset * 0.03}px)`;
  });
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

/* ─── SMOOTH SCROLL ON ANCHOR LINKS ─── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── SKILL BARS ─── */
const skillFills   = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) e.target.style.width = e.target.dataset.width + '%';
  }),
  { threshold: 0.3 }
);
skillFills.forEach((el) => skillObserver.observe(el));


/* ─── SCROLL-BASED OPACITY & MOVEMENT ─── */
function handleScrollAnimations() {
  document.querySelectorAll('.portfolio-item, .service-card, .testimonial-card').forEach((el) => {
    if (!el.hasAttribute('data-scroll-animated')) {
      const rect = el.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
      
      // Fade in as scrolling into view
      el.style.opacity = Math.min(scrollPercent * 1.5, 1);
      
      // Subtle lift effect
      if (scrollPercent > 0.2) {
        const lift = (scrollPercent - 0.2) * 8;
        el.style.transform = `translateY(${Math.min(lift, 20)}px)`;
      }
    }
  });
}

window.addEventListener('scroll', handleScrollAnimations, { passive: true });
handleScrollAnimations(); // Initial call

/* ─── SCROLL TEXT FADE EFFECT ─── */
const fadeTextEls = document.querySelectorAll('.hero-subtitle-tag, .hero-tagline, .hero-title-large');
function updateTextScroll() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;
  
  const heroRect = heroSection.getBoundingClientRect();
  const heroProgress = Math.max(0, Math.min(1, (window.innerHeight - heroRect.top) / window.innerHeight));
  
  fadeTextEls.forEach((el) => {
    el.style.opacity = Math.max(0.5, 1 - heroProgress * 0.5);
  });
}

window.addEventListener('scroll', updateTextScroll, { passive: true });

/* ─── COUNTER ANIMATION ON SCROLL VIEW ─── */
function animateNumbersOnView() {
  const numberEls = document.querySelectorAll('[data-count]');
  numberEls.forEach((el) => {
    if (!el.hasAttribute('data-animated')) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.setAttribute('data-animated', 'true');
        const target = +el.dataset.count;
        const startNum = 0;
        const duration = 1.5;
        const startTime = Date.now();
        
        const counter = () => {
          const elapsed = (Date.now() - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(startNum + (target - startNum) * progress);
          el.textContent = current + (target > 9 ? '+' : '');
          
          if (progress < 1) requestAnimationFrame(counter);
        };
        counter();
      }
    }
  });
}

window.addEventListener('scroll', animateNumbersOnView, { passive: true });
animateNumbersOnView(); // Check on load


/* ─── PORTFOLIO FILTER TABS ─── */
document.querySelectorAll('.filter-tab').forEach((tab) => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach((item) => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.style.opacity       = match ? '1' : '0.18';
      item.style.transform     = match ? '' : 'scale(0.97)';
      item.style.pointerEvents = match ? 'all' : 'none';
    });
  });
});


/* ─── PORTFOLIO ITEM CLICK → MODAL ─── */
document.querySelectorAll('.portfolio-item').forEach((item) => {
  item.addEventListener('click', () => {
    const title    = item.dataset.title    || 'Untitled';
    const catLabel = item.dataset.catLabel || '';
    const duration = item.dataset.duration || '';
    const link     = item.dataset.link     || '#';
    const desc     = item.dataset.desc     || '';
    openModal(title, catLabel, duration, link, desc);
  });
});


/* ─── VIDEO MODAL ─── */
const modalOverlay = document.getElementById('modalOverlay');

function openModal(title, cat, duration, link, desc) {
  document.getElementById('modalTitle').textContent    = title;
  document.getElementById('modalCat').textContent      = cat;
  document.getElementById('modalDuration').textContent = duration ? 'Duration: ' + duration : '';
  document.getElementById('modalDesc').textContent     = desc;
  const watchBtn = document.getElementById('modalWatchBtn');
  watchBtn.href = link || '#';
  watchBtn.style.display = link && link !== '#' ? 'inline-flex' : 'none';
  modalOverlay.classList.add('open');
}

function closeModal(e) {
  if (e.target === modalOverlay) modalOverlay.classList.remove('open');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modalOverlay.classList.remove('open');
});

// Showreel play button
document.getElementById('reelPlay').addEventListener('click', () => {
  openModal(
    'Alex Reel — Showreel 2024',
    'Official Showreel',
    '3:47',
    'https://www.youtube.com',
    'A curated showreel of the best edits, grades, and motion work from 2024 across brand, social, and film categories.'
  );
});


/* ─── FILE UPLOAD DRAG & DROP ─── */
const uploadZone = document.getElementById('uploadZone');
const fileInput  = document.getElementById('fileInput');
const uploadList = document.getElementById('uploadList');

uploadZone.addEventListener('dragover',  (e) => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  handleFiles(e.dataTransfer.files);
});
fileInput.addEventListener('change', () => handleFiles(fileInput.files));

function handleFiles(files) {
  Array.from(files).forEach((file) => {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1) + ' MB';
    const item   = document.createElement('div');
    item.className = 'upload-file-item';
    item.innerHTML = `
      <i class="fas fa-video"></i>
      <div style="flex:1">
        <div class="upload-file-name">${file.name}</div>
        <div class="upload-progress"><div class="upload-progress-fill"></div></div>
      </div>
      <span class="upload-file-size">${sizeMB}</span>
      <i class="fas fa-check-circle" style="color:var(--accent);margin-left:0.5rem;"></i>
    `;
    uploadList.appendChild(item);
  });
  showToast(`${files.length} file${files.length > 1 ? 's' : ''} added successfully!`);
}


/* ─── TOAST NOTIFICATION ─── */
function showToast(message) {
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}


/* ─── FORM SUBMITS ─── */
function submitUpload() {
  showToast("Project submitted! I'll be in touch within 24 hrs.");
}

function sendMessage() {
  const name  = document.getElementById('cfName').value.trim();
  const email = document.getElementById('cfEmail').value.trim();
  if (!name || !email) { showToast('Please fill in your name and email.'); return; }
  showToast(`Thanks ${name}! Your message has been sent.`);
  ['cfName','cfLast','cfEmail','cfMsg'].forEach((id) => {
    document.getElementById(id).value = '';
  });
}


/* ─── SMOOTH ANCHOR SCROLLING ─── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
