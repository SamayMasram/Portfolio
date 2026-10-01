/**
 * SAMAY MASRAM - REALISTIC HANDWRITTEN PAPER PORTFOLIO & PEN INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {
  initPenCursorAndInkTrail();
  initInkColorPicker();
  initRuledLineToggle();
  initNotebookTabs();
  initSkillsFilter();
  initExpandableProjects();
  initAnimatedCounters();
  initAnimatedSkillBars();
  initCopyEmail();
  initResumeModal();
  initGitHubHeatmap();
  initContactForm();
});

/* ==========================================================================
   1. Real-Time Custom Pen Cursor & Dynamic Ink Trail
   ========================================================================== */
function initPenCursorAndInkTrail() {
  const penCursor = document.getElementById('pen-cursor');
  const canvas = document.getElementById('ink-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const inkParticles = [];
  let mouse = { x: -100, y: -100, lastX: -100, lastY: -100 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (penCursor) {
      penCursor.style.left = `${mouse.x}px`;
      penCursor.style.top = `${mouse.y}px`;
    }

    const dx = mouse.x - mouse.lastX;
    const dy = mouse.y - mouse.lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 3) {
      createInkPoint(mouse.x, mouse.y, dist);
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    }
  });

  function getInkRgb() {
    const inkHex = getComputedStyle(document.body).getPropertyValue('--ink-main').trim();
    let r = 29, g = 78, b = 216;
    if (inkHex.startsWith('#')) {
      const hex = inkHex.replace('#', '');
      if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }
    }
    return { r, g, b };
  }

  function createInkPoint(x, y, speed) {
    const { r, g, b } = getInkRgb();
    inkParticles.push({
      x: x + (Math.random() - 0.5) * 2,
      y: y + (Math.random() - 0.5) * 2,
      radius: Math.min(Math.max(1, 3 - speed * 0.05), 2.5),
      alpha: 0.35,
      r, g, b
    });

    if (inkParticles.length > 60) {
      inkParticles.shift();
    }
  }

  function renderInk() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < inkParticles.length; i++) {
      const p = inkParticles[i];
      p.alpha -= 0.008;

      if (p.alpha > 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(renderInk);
  }

  renderInk();

  const interactiveEls = document.querySelectorAll('a, button, .expandable-project-card, .tab-btn, .handwritten-skill-card, input, textarea');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (penCursor) penCursor.classList.add('writing');
    });
    el.addEventListener('mouseleave', () => {
      if (penCursor) penCursor.classList.remove('writing');
    });
  });
}

/* ==========================================================================
   2. Ink Color Picker Switcher
   ========================================================================== */
function initInkColorPicker() {
  const inkBtns = document.querySelectorAll('.ink-btn');

  inkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const inkTheme = btn.dataset.ink;
      document.body.className = `ink-${inkTheme}`;

      inkBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      showInkToast(`✒️ Ink switched to ${inkTheme.toUpperCase()} Ballpoint!`);
    });
  });
}

/* ==========================================================================
   3. Ruled Line Toggle
   ========================================================================== */
function initRuledLineToggle() {
  const toggleBtn = document.getElementById('toggle-ruled-lines');
  const paperSheet = document.getElementById('main-paper-sheet');

  if (toggleBtn && paperSheet) {
    toggleBtn.addEventListener('click', () => {
      paperSheet.classList.toggle('no-ruled-lines');
      const isPlain = paperSheet.classList.contains('no-ruled-lines');
      toggleBtn.classList.toggle('active', isPlain);
      showInkToast(isPlain ? '📄 Plain Paper Mode' : '📝 Ruled Notebook Lines Active');
    });
  }
}

/* ==========================================================================
   4. Notebook Side Tabs Navigation & ScrollSpy
   ========================================================================== */
function initNotebookTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.paper-section, .paper-header');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        tabBtns.forEach(btn => {
          if (btn.dataset.target === id) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   5. Technical Skills Category Filter
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.handwritten-skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      skillCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.style.animation = 'unfoldSheet 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Expandable Interactive Project Notebook Cards
   ========================================================================== */
function initExpandableProjects() {
  const projectCards = document.querySelectorAll('.expandable-project-card');

  projectCards.forEach(card => {
    const expandBtn = card.querySelector('.expand-btn');
    const closeBtn = card.querySelector('.close-project-btn');

    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        card.classList.toggle('expanded');
        if (card.classList.contains('expanded')) {
          expandBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Fold Details';
        } else {
          expandBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Unfold Details & Architecture';
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        card.classList.remove('expanded');
        if (expandBtn) expandBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Unfold Details & Architecture';
      });
    }
  });
}

/* ==========================================================================
   7. GitHub Contribution Heatmap Generator
   ========================================================================== */
function initGitHubHeatmap() {
  const container = document.getElementById('github-heatmap-grid');
  if (!container) return;

  container.innerHTML = '';

  // Generate 52 weeks x 7 days
  const totalDays = 52 * 7;
  const levels = ['l0', 'l0', 'l1', 'l1', 'l2', 'l3', 'l4'];

  for (let i = 0; i < totalDays; i++) {
    const day = document.createElement('div');
    day.className = 'hm-day';

    // Simulate realistic commit clusters
    let randIndex = Math.floor(Math.random() * levels.length);
    if (i % 7 === 0 || i % 7 === 6) {
      // Weekend lower frequency
      randIndex = Math.floor(Math.random() * 3);
    }
    const levelClass = levels[randIndex];
    day.classList.add(levelClass);

    const contribCount = levelClass === 'l0' ? 0 : levelClass === 'l1' ? 2 : levelClass === 'l2' ? 5 : levelClass === 'l3' ? 8 : 12;
    day.title = `${contribCount} contributions on Day ${i + 1}`;

    container.appendChild(day);
  }
}

/* ==========================================================================
   8. Animated Counters
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.handwritten-stat-num[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target);
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(progress * target);
          entry.target.textContent = current + '+';

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target + '+';
          }
        }
        requestAnimationFrame(updateCounter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   9. Animated Skill & Topic Progress Fill Bars
   ========================================================================== */
function initAnimatedSkillBars() {
  const fills = document.querySelectorAll('.ink-fill, .topic-bar .fill');

  fills.forEach(fill => {
    fill.dataset.targetWidth = fill.style.width;
    fill.style.width = '0%';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        setTimeout(() => {
          fill.style.width = fill.dataset.targetWidth;
        }, 150);
      }
    });
  }, { threshold: 0.2 });

  fills.forEach(fill => observer.observe(fill));
}

/* ==========================================================================
   10. Copy Email Button
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('samaymasram1404@gmail.com').then(() => {
        showInkToast('✓ Email copied to clipboard!');
      });
    });
  }
}

/* ==========================================================================
   11. Resume PDF Modal
   ========================================================================== */
function initResumeModal() {
  const openBtn = document.getElementById('btn-resume-modal');
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

/* ==========================================================================
   12. Interactive "Leave Me a Handwritten Message" Note Modal
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const noteModal = document.getElementById('note-modal');
  const noteModalClose = document.getElementById('note-modal-close');
  const sendMailBtn = document.getElementById('send-mail-client-btn');
  const copyNoteBtn = document.getElementById('copy-note-text-btn');

  if (form && noteModal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      // Populate Note Modal
      document.getElementById('note-letter-author').textContent = name;
      document.getElementById('note-letter-email').textContent = `(${email})`;
      document.getElementById('note-letter-body').textContent = message;
      document.getElementById('note-letter-date').textContent = `Date: ${dateStr}`;

      // Set Mailto Link
      if (sendMailBtn) {
        const mailtoSubject = encodeURIComponent(`Handwritten Note from ${name}`);
        const mailtoBody = encodeURIComponent(`Hi Samay,\n\n${message}\n\nBest regards,\n${name}\n${email}`);
        sendMailBtn.href = `mailto:samaymasram1404@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      }

      // Copy Note Button Handler
      if (copyNoteBtn) {
        copyNoteBtn.onclick = () => {
          const fullNote = `Dear Samay,\n\n${message}\n\nSigned by: ${name} (${email}) - ${dateStr}`;
          navigator.clipboard.writeText(fullNote).then(() => {
            showInkToast('✓ Handwritten note copied to clipboard!');
          });
        };
      }

      // Open Modal with pop-in
      noteModal.classList.add('active');
      showInkToast('✍️ Handwritten note signed & sealed!');
      form.reset();
    });

    if (noteModalClose) {
      noteModalClose.addEventListener('click', () => {
        noteModal.classList.remove('active');
      });
    }

    noteModal.addEventListener('click', (e) => {
      if (e.target === noteModal) noteModal.classList.remove('active');
    });
  }
}

/* Toast Helper */
function showInkToast(msg) {
  let toast = document.getElementById('ink-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ink-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: var(--paper-bg);
      border: 2px solid var(--ink-main);
      color: var(--ink-main);
      font-family: var(--font-heading);
      font-size: 1.2rem;
      padding: 10px 20px;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      z-index: 99999;
      opacity: 0;
      transform: translateY(15px);
      transition: all 0.3s ease;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
  }, 2500);
}
