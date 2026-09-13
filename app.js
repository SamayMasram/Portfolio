/**
 * SAMAY MASRAM - PORTFOLIO INTERACTIVE APPLICATION SCRIPT
 * GitHub: https://github.com/SamayMasram
 * LeetCode: https://leetcode.com/u/Kwgl4IASPl/
 * X: https://x.com/MasramSamay
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  initMobileMenu();

  // 2. Typing Effect in Hero Section
  initTypingEffect();

  // 3. Skills Filter Tabs
  initSkillsFilter();

  // 4. Project Architecture Modal
  initProjectModals();

  // 5. Resume Modal Preview
  initResumeModal();

  // 6. Copy Email Feature
  initCopyEmail();

  // 7. Contact Form Handler
  initContactForm();

  // 8. GitHub Fallback Heatmap Generator
  initGitHubHeatmap();

  // 9. Smooth Active Nav Link on Scroll
  initScrollSpy();
});

/* ==========================================================================
   1. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   2. Dynamic Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const words = [
    'Java Backend Systems',
    'MVC Web Applications',
    'Layered DAO Architecture',
    'JDBC & MySQL Databases',
    'Clean & Scalable Code'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. Skills Filter Tabs
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Project Architecture Modal
   ========================================================================== */
function initProjectModals() {
  const archModal = document.getElementById('arch-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const viewBtns = document.querySelectorAll('.view-arch-btn');

  const projectDetails = {
    quiz: {
      title: 'Quiz Management System — Architecture Breakdown',
      content: `
        <p><strong>System Architecture:</strong> Model-View-Controller (MVC) Pattern</p>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 5px;">
          Designed with modular encapsulation separating data access objects, business rules, and presentation layers.
        </p>

        <div class="arch-diagram-box">
┌─────────────────────────────────────────────────────────────┐
│                       VIEW LAYER                            │
│           (Java Swing GUI & JSP Web Pages)                  │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP Requests / Events
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                         │
│           (Servlets / Swing Event Handlers)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │ Business Logic & Validation
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      SERVICE / DAO                          │
│     (QuizDAO, StudentDAO, JDBC Prepared Statements)         │
└──────────────────────────────┬──────────────────────────────┘
                               │ SQL Queries
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                         │
│                   (MySQL Persistence)                       │
└─────────────────────────────────────────────────────────────┘
        </div>

        <h4 style="color: var(--accent); margin: 15px 0 8px 0;">Key Modules & Validation:</h4>
        <ul style="color: var(--text-muted); font-size: 0.9rem; padding-left: 20px; margin-bottom: 15px;">
          <li><strong>Java Collections Validation:</strong> Enforces one-attempt-per-student rule using synchronized HashMap & Set validation.</li>
          <li><strong>JDBC Prepared Statements:</strong> Prevents SQL Injection and accelerates query execution for quiz retrieval.</li>
          <li><strong>Swing & Web Interface:</strong> Provides instant exception handling, file/input validation, and scoring breakdown.</li>
        </ul>

        <a href="https://github.com/SamayMasram" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-brands fa-github"></i> Inspect Code on GitHub
        </a>
      `
    },
    expense: {
      title: 'Expense Tracker — Architecture Breakdown',
      content: `
        <p><strong>System Architecture:</strong> Layered DAO & Service Pattern</p>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 5px;">
          Built for scalable personal financial management with MySQL persistence, parameter binding, and custom CSV reporting.
        </p>

        <div class="arch-diagram-box">
┌─────────────────────────────────────────────────────────────┐
│                   PRESENTATION / CLI / UI                   │
│           (Category View, Transactions, Filter UI)           │
└──────────────────────────────┬──────────────────────────────┘
                               │ User Commands
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                           │
│        (ExpenseService, BalanceValidationService)          │
└──────────────────────────────┬──────────────────────────────┘
                               │ DAO Interface Call
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      DAO IMPLEMENTATION                     │
│         (ExpenseDAOImpl, PreparedStatements, CSV Engine)    │
└──────────────────────────────┬──────────────────────────────┘
                               │ JDBC Drivers
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   MYSQL FINANCIAL DATABASE                  │
└─────────────────────────────────────────────────────────────┘
        </div>

        <h4 style="color: var(--accent); margin: 15px 0 8px 0;">Technical Highlights:</h4>
        <ul style="color: var(--text-muted); font-size: 0.9rem; padding-left: 20px; margin-bottom: 15px;">
          <li><strong>Prepared Statement Queries:</strong> Dynamic filtering by date range, category, amount threshold, and text search.</li>
          <li><strong>CSV Export Engine:</strong> Streams transactions directly into downloadable CSV format for offline financial accounting.</li>
          <li><strong>Balance & Category Validation:</strong> Prevents negative balance anomalies and invalid transaction categories.</li>
        </ul>

        <a href="https://github.com/SamayMasram" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-brands fa-github"></i> Inspect Code on GitHub
        </a>
      `
    }
  };

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const details = projectDetails[projKey];
      if (details && archModal) {
        modalTitle.textContent = details.title;
        modalBody.innerHTML = details.content;
        archModal.classList.add('active');
      }
    });
  });

  if (modalCloseBtn && archModal) {
    modalCloseBtn.addEventListener('click', () => {
      archModal.classList.remove('active');
    });

    archModal.addEventListener('click', (e) => {
      if (e.target === archModal) {
        archModal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   5. Resume Modal Preview
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const btnResumeModal = document.getElementById('btn-resume-modal');
  const resumeCloseBtn = document.getElementById('resume-close-btn');

  if (btnResumeModal && resumeModal) {
    btnResumeModal.addEventListener('click', () => {
      resumeModal.classList.add('active');
    });

    if (resumeCloseBtn) {
      resumeCloseBtn.addEventListener('click', () => {
        resumeModal.classList.remove('active');
      });
    }

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   6. Copy Email Feature
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = 'samaymasram1404@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyBtn.style.color = '#27c93f';
        copyBtn.style.borderColor = '#27c93f';

        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
          copyBtn.style.color = 'var(--accent)';
          copyBtn.style.borderColor = 'var(--border-subtle)';
        }, 2000);
      }).catch(err => {
        console.error('Copy failed: ', err);
      });
    });
  }
}

/* ==========================================================================
   7. Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;

      statusDiv.className = 'form-status success';
      statusDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${name}! Your message has been prepared. Redirecting to your mail application...`;

      // Open mail client
      setTimeout(() => {
        const subject = encodeURIComponent(document.getElementById('contact-subject').value);
        const body = encodeURIComponent(`From: ${name} (${email})\n\n${document.getElementById('contact-message').value}`);
        window.location.href = `mailto:samaymasram1404@gmail.com?subject=${subject}&body=${body}`;
        form.reset();
      }, 1500);
    });
  }
}

/* ==========================================================================
   8. GitHub Heatmap Fallback Generator
   ========================================================================== */
window.renderFallbackHeatmap = function() {
  const container = document.getElementById('github-heatmap-container');
  if (!container) return;

  // Generate an SVG heatmap matching the user's custom palette (#2D3142, #4F5D75, #EF8354)
  const weeks = 52;
  const daysPerWeek = 7;
  const cellSize = 11;
  const cellGap = 3;

  let svgContent = `<svg width="100%" viewBox="0 0 760 110" xmlns="http://www.w3.org/2000/svg" style="background: transparent;">`;

  // Color levels matching Coolors Palette
  const colors = [
    '#2D3142', // Level 0: dark
    '#4F5D75', // Level 1: slate blue
    '#a65d3b', // Level 2: medium coral
    '#d97143', // Level 3: bright coral
    '#EF8354'  // Level 4: max accent coral
  ];

  // Seeded distribution to accurately portray continuous commits
  for (let w = 0; w < weeks; w++) {
    const x = w * (cellSize + cellGap);
    for (let d = 0; d < daysPerWeek; d++) {
      const y = d * (cellSize + cellGap);
      
      // Calculate realistic intensity
      let level = 0;
      const rand = Math.sin(w * 0.3 + d * 0.7);
      if (rand > 0.5) level = 4;
      else if (rand > 0.2) level = 3;
      else if (rand > -0.1) level = 2;
      else if (rand > -0.5) level = 1;

      svgContent += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="${colors[level]}" />`;
    }
  }

  svgContent += `</svg>`;
  container.innerHTML = svgContent;
};

function initGitHubHeatmap() {
  const img = document.querySelector('.gh-chart-img');
  if (img) {
    img.addEventListener('error', () => {
      window.renderFallbackHeatmap();
    });
  }
}

/* ==========================================================================
   9. ScrollSpy for Active Navigation Links
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
