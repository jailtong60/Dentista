/* ============================================================
   CLÍNICA Telma Carneiro — main.js
   Autor: JOTAF
   Versão: 1.1 (com menu mobile e validação melhorada)
   ============================================================ */

/* ------------------------------------------------------------
   1. ANIMAÇÕES DE ENTRADA AO ROLAR (Reveal on Scroll)
   ------------------------------------------------------------ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ------------------------------------------------------------
   2. NAVBAR — encolhe ao rolar + Menu mobile
   ------------------------------------------------------------ */
const nav = document.querySelector('nav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.padding = '12px 60px';
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
  } else {
    nav.style.padding = '18px 60px';
    nav.style.boxShadow = 'none';
  }
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}


/* ------------------------------------------------------------
   3. FORMULÁRIO DE CONTATO
   ------------------------------------------------------------ */
const form = document.querySelector('.contact-form');

if (form) {
  const submitBtn = form.querySelector('.form-submit');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const nome    = form.querySelector('#nome').value.trim();
    const tel     = form.querySelector('#telefone').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const servico = form.querySelector('#servico').value;
    const msg     = form.querySelector('#mensagem').value.trim();

    /* Validação simples */
    if (!nome || !tel || !email || !servico || !msg) {
      showToast('Por favor, preencha todos os campos.', 'erro');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      showToast('Informe um e-mail válido.', 'erro');
      return;
    }

    const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    const cleanPhone = tel.replace(/\D/g, '');
    if (!phoneRegex.test(tel) && !/^\d{10,11}$/.test(cleanPhone)) {
      showToast('Informe um telefone válido. Ex: (81) 99584-7139', 'erro');
      return;
    }

    /* Simulação de envio */
    submitBtn.textContent = 'Enviando…';
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast('Mensagem enviada! Em breve entraremos em contato. 😊', 'ok');
      form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
      submitBtn.textContent = 'Enviar mensagem';
      submitBtn.disabled = false;
    }, 1400);
  });
}


/* ------------------------------------------------------------
   4. TOAST DE FEEDBACK
   ------------------------------------------------------------ */
function showToast(msg, tipo) {
  /* Remove toast anterior se existir */
  const old = document.getElementById('toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = msg;

  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '100px',
    right:        '32px',
    zIndex:       '300',
    background:   tipo === 'ok' ? '#1A6B5A' : '#C0392B',
    color:        '#fff',
    padding:      '14px 22px',
    borderRadius: '4px',
    fontSize:     '14px',
    fontFamily:   "'DM Sans', sans-serif",
    boxShadow:    '0 8px 24px rgba(0,0,0,0.15)',
    opacity:      '0',
    transform:    'translateY(12px)',
    transition:   'opacity .3s, transform .3s',
    maxWidth:     '320px',
    lineHeight:   '1.5',
  });

  document.body.appendChild(toast);

  /* Animar entrada */
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  /* Remover após 4s */
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}


/* ------------------------------------------------------------
   5. LINKS SUAVES — highlight do item ativo no nav
   ------------------------------------------------------------ */
const sections   = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--teal)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
