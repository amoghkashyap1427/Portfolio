

'use strict';






(function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
         
          const delay = parseInt(entry.target.dataset.aosDelay || 0, 10);
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();




(function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const PARTICLE_COUNT = 40;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');

    const size   = Math.random() * 3 + 1;        
    const x      = Math.random() * 100;           
    const y      = Math.random() * 100;
    const dur    = Math.random() * 20 + 15;       
    const delay  = Math.random() * -20;
    const colors = ['124,58,237', '37,99,235', '6,182,212', '52,211,153'];
    const color  = colors[Math.floor(Math.random() * colors.length)];
    const alpha  = Math.random() * 0.4 + 0.1;

    Object.assign(p.style, {
      position:        'absolute',
      width:           size + 'px',
      height:          size + 'px',
      borderRadius:    '50%',
      background:      `rgba(${color}, ${alpha})`,
      left:            x + '%',
      top:             y + '%',
      animation:       `floatParticle ${dur}s ${delay}s infinite linear`,
      willChange:      'transform',
      pointerEvents:   'none',
    });

    container.appendChild(p);
  }

 
  if (!document.getElementById('particleKeyframes')) {
    const style = document.createElement('style');
    style.id = 'particleKeyframes';
    style.textContent = `
      @keyframes floatParticle {
        0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 60}px) scale(0.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();



(function initContactForm() {
  const form      = document.getElementById('contactForm');
  const toast     = document.getElementById('toast');
  const toastClose = document.getElementById('toastClose');
  let toastTimer  = null;

  if (!form) return;

  function showToast() {
    if (toastTimer) clearTimeout(toastTimer);
    toast.classList.add('show');
    toastTimer = setTimeout(hideToast, 5000);
  }

  function hideToast() {
    toast.classList.remove('show');
    if (toastTimer) clearTimeout(toastTimer);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

   
    const inputs   = form.querySelectorAll('input, textarea');
    let   allFilled = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = 'rgba(239,68,68,0.6)';
        input.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.1)';
        setTimeout(() => {
          input.style.borderColor = '';
          input.style.boxShadow   = '';
        }, 2000);
      }
    });

    if (!allFilled) return;

   
    const btn = form.querySelector('[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML   = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    btn.disabled    = true;

    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled  = false;
      form.reset();
      showToast();
    }, 1200);
  });

  if (toastClose) {
    toastClose.addEventListener('click', hideToast);
  }
})();



(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('navbar')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();



(function initTypingEffect() {
  const target = document.querySelector('.hero-greeting');
  if (!target) return;

  const texts  = [
    '👋 Hello, I\'m',
    '💻 Developer &',
    '🚀 Problem Solver,',
  ];
  let tIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = texts[tIdx];

    if (!deleting) {
      target.textContent = current.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      target.textContent = current.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % texts.length;
       
        if (tIdx === 0) { tIdx = 0; }
      }
    }

    setTimeout(type, deleting ? 50 : 80);
  }

 
  setTimeout(type, 1500);
})();



(function initHeroFloat() {
  const wrapper = document.querySelector('.hero-image-wrapper');
  if (!wrapper) return;

  const style = document.createElement('style');
  style.textContent = `
    .hero-image-wrapper {
      animation: heroFloat 6s ease-in-out infinite;
    }
    @keyframes heroFloat {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-14px); }
    }
  `;
  document.head.appendChild(style);
})();
