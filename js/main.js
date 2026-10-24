/**
 * COLLEGE PROJECT PORTFOLIO - CORE INTERACTION SCRIPTS
 * Academic Project Submission Edition with Viva Defense & Faculty Evaluation
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Silent Operation (Audio feedback removed per user request)
  // -------------------------------------------------------------------------
  function playPopSound() {}

  // Theme toggle removed per user request: ensure standard light theme
  document.documentElement.removeAttribute('data-theme');
  try { localStorage.removeItem('college-portfolio-theme'); } catch(e) {}

  // -------------------------------------------------------------------------
  // 3. Navigation & Scroll Effects
  // -------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open', expanded);
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // -------------------------------------------------------------------------
  // 4. Interactive 3D Card Hover / Tilt Physics
  // -------------------------------------------------------------------------
  const tiltElements = document.querySelectorAll('.project-card, .hero-avatar-wrapper');

  tiltElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    elem.addEventListener('mouseleave', () => {
      elem.style.transform = '';
    });
  });

  // -------------------------------------------------------------------------
  // 5. Interactive Skill Pills Filter
  // -------------------------------------------------------------------------
  const skillPills = document.querySelectorAll('.skill-pill');
  const projectCards = document.querySelectorAll('.project-card');

  skillPills.forEach(pill => {
    pill.addEventListener('click', () => {
      playPopSound(520);
      const isAlreadyActive = pill.classList.contains('active');
      
      skillPills.forEach(p => p.classList.remove('active'));

      if (!isAlreadyActive) {
        pill.classList.add('active');
        const skill = pill.dataset.skill?.toLowerCase() || '';

        projectCards.forEach(card => {
          const cardSkills = (card.dataset.skills || '').toLowerCase();
          if (cardSkills.includes(skill)) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1.03) translateY(-8px)';
            card.style.boxShadow = '0 16px 36px var(--coral-shadow)';
          } else {
            card.style.opacity = '0.35';
            card.style.transform = 'scale(0.98)';
            card.style.boxShadow = 'none';
          }
        });

        showToast(`Showing academic projects using ${pill.textContent.trim()} ⚡`);
      } else {
        projectCards.forEach(card => {
          card.style.opacity = '1';
          card.style.transform = '';
          card.style.boxShadow = '';
        });
      }
    });
  });

  // -------------------------------------------------------------------------
  // 6. Academic Project Modal & Viva Demonstrations
  // -------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBannerImg = document.getElementById('modal-banner-img');
  const modalOverviewContent = document.getElementById('modal-overview-content');
  const modalDemoContainer = document.getElementById('modal-demo-container');
  const modalTechTags = document.getElementById('modal-tech-tags');
  const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
  const modalTabContents = document.querySelectorAll('.tab-content');

  // Academic Coursework Data Store (B.Sc Information Technology)
  const projectData = {
    recipe: {
      title: "Recipe Finder & Nutrition Assessment",
      subtitle: "Laboratory Mini-Project 1 • B.Sc Information Technology",
      image: "assets/images/project-recipe.jpg",
      tags: ["HTML5 Semantic Tags", "CSS3 Flex & Grid", "Vanilla JavaScript", "REST API Fetch", "DOM Manipulation"],
      overview: `
        <h4>1. Problem Statement</h4>
        <p>College students living away from home struggle with pantry resource management and nutritious meal preparation on limited budgets. This project provides an algorithmic ingredient search to suggest healthy meals based solely on available items.</p>
        
        <h4>2. Academic Objectives</h4>
        <ul>
          <li>Implement asynchronous data retrieval using the modern JavaScript <code>fetch()</code> API.</li>
          <li>Apply defensive programming and responsive CSS without third-party utility bloat.</li>
          <li>Practice structured DOM mutation with event delegation and debounced event listeners.</li>
        </ul>

        <h4>3. Learning Outcomes</h4>
        <p>Demonstrates proficiency in asynchronous JavaScript, JSON data binding, CSS custom property theming, and W3C standard compliance.</p>
      `,
      demoType: "recipe"
    },
    hotel: {
      title: "Hotel Management & Reservation System",
      subtitle: "Coursework Project 2 • B.Sc Information Technology",
      image: "assets/images/project-hotel.jpg",
      tags: ["HTML5", "CSS3 Flex/Grid", "JavaScript ES6+", "LocalStorage API", "CRUD Operations", "Billing Calculator"],
      overview: `
        <h4>1. Problem Statement</h4>
        <p>Manual front-desk hotel operations suffer from booking clashes, manual billing errors, and unorganized room availability tracking. This portal provides an automated reservation and inventory management interface.</p>
        
        <h4>2. Academic Objectives</h4>
        <ul>
          <li>Implement state-driven room reservation algorithms with dynamic tariffs and automated tax computation.</li>
          <li>Persist guest check-in states and suite availability using the Web Storage API (<code>localStorage</code>).</li>
          <li>Build modular client-side validation for date ranges, guest counts, and room type categories.</li>
        </ul>

        <h4>3. Learning Outcomes</h4>
        <p>Demonstrated mastery in state persistence, transaction workflow modeling, responsive card layouts, and defensive form validation.</p>
      `,
      demoType: "hotel"
    },
    hall: {
      title: "Convention Hall & Banquet Booking Portal",
      subtitle: "Capstone Project 3 • B.Sc Information Technology",
      image: "assets/images/project-hall.jpg",
      tags: ["HTML5", "CSS3", "JavaScript ES6+", "Slot Scheduling", "Capacity Algorithm", "Receipt Generation"],
      overview: `
        <h4>1. Problem Statement</h4>
        <p>Reserving college auditoriums, banquet halls, and convention spaces often involves scheduling conflicts, lack of seating capacity transparency, and tedious manual paperwork.</p>
        
        <h4>2. Academic Objectives</h4>
        <ul>
          <li>Construct date-clash prevention logic to prevent overlapping slot reservations (Morning, Evening, Full Day).</li>
          <li>Implement real-time guest capacity filter algorithms matching venue floor-plan specifications.</li>
          <li>Generate print-ready digital booking confirmation vouchers with dynamic reference identifiers.</li>
        </ul>

        <h4>3. Learning Outcomes</h4>
        <p>Acquired expertise in scheduling data structures, slot conflict validation algorithms, and print-ready digital receipt rendering.</p>
      `,
      demoType: "hall"
    }
  };

  function openProjectModal(projectId) {
    playPopSound(500);
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalBannerImg.src = data.image;
    modalBannerImg.alt = data.title;
    modalOverviewContent.innerHTML = data.overview;
    modalTechTags.innerHTML = data.tags.map(tag => `<span class="mini-tag">${tag}</span>`).join('');

    renderInteractiveDemo(data.demoType);

    modalTabBtns.forEach(btn => btn.classList.remove('active'));
    modalTabContents.forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="overview"]')?.classList.add('active');
    document.getElementById('tab-overview')?.classList.add('active');

    projectModal.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    playPopSound(400);
    projectModal.close();
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeProjectModal);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });

  modalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playPopSound(550);
      const tabKey = btn.dataset.tab;
      modalTabBtns.forEach(b => b.classList.remove('active'));
      modalTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${tabKey}`)?.classList.add('active');
    });
  });

  document.querySelectorAll('[data-open-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = trigger.getAttribute('data-open-project');
      openProjectModal(projId);
    });
  });

  // -------------------------------------------------------------------------
  // 7. Interactive Sandboxes (Live Viva Demonstrations)
  // -------------------------------------------------------------------------
  function renderInteractiveDemo(type) {
    if (!modalDemoContainer) return;

    if (type === 'recipe') {
      modalDemoContainer.innerHTML = `
        <div class="demo-sandbox">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <h4 style="font-weight:800;">🍲 Live Ingredient Query Simulation</h4>
            <span style="font-size:0.8rem; color:var(--coral-primary); font-weight:700;">● Live Interactive Mode</span>
          </div>
          <div class="recipe-search-box">
            <input type="text" id="demo-recipe-search" class="recipe-search-input" placeholder="Type ingredient (e.g. Tomato, Pasta, Basil)..." value="Tomato" />
          </div>
          <div class="recipe-results-grid" id="demo-recipe-results"></div>
        </div>
      `;

      const recipes = [
        { name: "Roasted Tomato & Basil Gnocchi", time: "25 min", cal: "420 kcal", badge: "Vegetarian", match: "tomato, basil, gnocchi, pasta" },
        { name: "Creamy Sun-Dried Tomato Fettuccine", time: "20 min", cal: "510 kcal", badge: "Chef's Pick", match: "tomato, pasta, cream, garlic" },
        { name: "Fresh Caprese Avocado Salad", time: "10 min", cal: "280 kcal", badge: "Gluten-Free", match: "tomato, basil, mozzarella, salad" },
        { name: "Rustic Tuscan Bean & Herb Soup", time: "30 min", cal: "340 kcal", badge: "High Fiber", match: "tomato, beans, herbs, soup" }
      ];

      function filterRecipes(query) {
        const q = query.toLowerCase().trim();
        const filtered = recipes.filter(r => !q || r.name.toLowerCase().includes(q) || r.match.includes(q));
        const resultsEl = document.getElementById('demo-recipe-results');
        if (!resultsEl) return;

        if (filtered.length === 0) {
          resultsEl.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:1.5rem; color:var(--text-muted);">No records found matching "${query}". Try searching "pasta", "tomato", or "salad"!</p>`;
          return;
        }

        resultsEl.innerHTML = filtered.map(r => `
          <div class="mini-recipe-card">
            <span class="mini-recipe-badge">${r.badge} • ⏱️ ${r.time}</span>
            <h5>${r.name}</h5>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.4rem; font-size:0.75rem; color:var(--text-muted);">
              <span>${r.cal}</span>
              <button class="btn-copy-email" style="padding:0.25rem 0.5rem;" onclick="window.alert('Simulation: Cooking timer started for ${r.name}!')">Test Timer</button>
            </div>
          </div>
        `).join('');
      }

      filterRecipes("Tomato");
      document.getElementById('demo-recipe-search')?.addEventListener('input', (e) => filterRecipes(e.target.value));
    }
    else if (type === 'hotel') {
      modalDemoContainer.innerHTML = `
        <div class="demo-sandbox">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <h4 style="font-weight:800;">🏨 Live Hotel Room Reservation Sandbox</h4>
            <span style="font-size:0.8rem; color:#10B981; font-weight:700;">● Active Simulation</span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
            <div>
              <label style="font-size:0.8rem; font-weight:700; display:block; margin-bottom:0.3rem;">Select Room / Suite:</label>
              <select id="hotel-room-select" class="recipe-search-input" style="width:100%; border-radius:var(--radius-sm);">
                <option value="540" data-name="Riviera Ocean Suite">Riviera Ocean Suite ($540/night)</option>
                <option value="480" data-name="Azure View Suite" selected>Azure View Suite ($480/night)</option>
                <option value="320" data-name="Serenity Garden Room">Serenity Garden Room ($320/night)</option>
              </select>
            </div>
            <div>
              <label style="font-size:0.8rem; font-weight:700; display:block; margin-bottom:0.3rem;">Stay Duration (Nights):</label>
              <input type="number" id="hotel-nights-input" class="recipe-search-input" min="1" max="14" value="2" style="width:100%; border-radius:var(--radius-sm);" />
            </div>
          </div>
          <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:1rem; margin-bottom:1rem;">
            <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:0.4rem;">
              <span>Room Tariff:</span>
              <span id="hotel-tariff-calc">$480 × 2 nights = $960</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:0.4rem;">
              <span>Taxes &amp; Service (12%):</span>
              <span id="hotel-tax-calc">$115.20</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.05rem; border-top:1px dashed var(--border-subtle); padding-top:0.4rem;">
              <span>Estimated Total:</span>
              <span id="hotel-total-calc" style="color:var(--coral-primary);">$1,075.20</span>
            </div>
          </div>
          <button type="button" class="btn-submit-eval" id="btn-confirm-hotel" style="width:100%; padding:0.75rem;">
            <span>Simulate Room Reservation</span>
          </button>
          <div id="hotel-booking-result" style="display:none; margin-top:1rem; background:#ECFDF5; border:1px solid #10B981; border-radius:var(--radius-sm); padding:0.85rem; color:#065F46; font-size:0.88rem;"></div>
        </div>
      `;

      function updateHotelPricing() {
        const select = document.getElementById('hotel-room-select');
        const nights = parseInt(document.getElementById('hotel-nights-input').value, 10) || 1;
        const rate = parseInt(select.value, 10);
        const subtotal = rate * nights;
        const tax = subtotal * 0.12;
        const total = subtotal + tax;

        document.getElementById('hotel-tariff-calc').textContent = `$${rate} × ${nights} night${nights > 1 ? 's' : ''} = $${subtotal}`;
        document.getElementById('hotel-tax-calc').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('hotel-total-calc').textContent = `$${total.toFixed(2)}`;
      }

      document.getElementById('hotel-room-select')?.addEventListener('change', updateHotelPricing);
      document.getElementById('hotel-nights-input')?.addEventListener('input', updateHotelPricing);

      document.getElementById('btn-confirm-hotel')?.addEventListener('click', () => {
        playPopSound(700);
        const select = document.getElementById('hotel-room-select');
        const roomName = select.options[select.selectedIndex].getAttribute('data-name');
        const total = document.getElementById('hotel-total-calc').textContent;
        const resEl = document.getElementById('hotel-booking-result');
        const bookingId = 'HTL-' + Math.floor(100000 + Math.random() * 900000);
        
        resEl.style.display = 'block';
        resEl.innerHTML = `
          <strong>Reservation Confirmed!</strong><br>
          Ref ID: <code>${bookingId}</code> • ${roomName}<br>
          Total Billed: <strong>${total}</strong> • Status: <span style="background:#10B981; color:#fff; padding:0.1rem 0.4rem; border-radius:4px; font-size:0.75rem;">Confirmed ✓</span>
        `;
        triggerConfetti();
        showToast('🏨 Room reserved successfully in simulation!');
      });
    }
    else if (type === 'hall') {
      modalDemoContainer.innerHTML = `
        <div class="demo-sandbox">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <h4 style="font-weight:800;">🏛️ Convention Hall Booking Simulator</h4>
            <span style="font-size:0.8rem; color:var(--skill-css); font-weight:700;">● Active Simulation</span>
          </div>
          <div style="margin-bottom:1rem;">
            <label style="font-size:0.8rem; font-weight:700; display:block; margin-bottom:0.3rem;">Select Hall / Auditorium:</label>
            <select id="hall-venue-select" class="recipe-search-input" style="width:100%; border-radius:var(--radius-sm);">
              <option value="1200" data-price="12500" data-name="Horizon Grand Ballroom">Horizon Grand Ballroom (Capacity: 1,200 • $12,500)</option>
              <option value="800" data-price="9800" data-name="Apex Convention Center" selected>Apex Convention Center (Capacity: 800 • $9,800)</option>
              <option value="450" data-price="6500" data-name="Skyline Banquet Hall">Skyline Banquet Hall (Capacity: 450 • $6,500)</option>
            </select>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
            <div>
              <label style="font-size:0.8rem; font-weight:700; display:block; margin-bottom:0.3rem;">Booking Slot:</label>
              <select id="hall-slot-select" class="recipe-search-input" style="width:100%; border-radius:var(--radius-sm);">
                <option value="morning">Morning Session (8 AM – 1 PM)</option>
                <option value="evening" selected>Evening Banquet (4 PM – 10 PM)</option>
                <option value="fullday">Full Day Summit (8 AM – 10 PM)</option>
              </select>
            </div>
            <div>
              <label style="font-size:0.8rem; font-weight:700; display:block; margin-bottom:0.3rem;">Expected Attendees: <span id="hall-guest-val">600</span></label>
              <input type="range" id="hall-guest-slider" min="100" max="1500" step="50" value="600" style="width:100%; margin-top:0.4rem;" />
            </div>
          </div>
          <div id="hall-capacity-status" style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.85rem; font-size:0.85rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
            <span>Capacity Check: <strong id="hall-status-txt" style="color:#10B981;">Valid (Within 800 Limit) ✓</strong></span>
            <span id="hall-slot-availability" style="font-weight:700; color:var(--skill-css);">Slot Available</span>
          </div>
          <button type="button" class="btn-submit-eval" id="btn-reserve-hall" style="width:100%; padding:0.75rem;">
            <span>Simulate Hall Reservation</span>
          </button>
          <div id="hall-booking-result" style="display:none; margin-top:1rem; background:#EFF6FF; border:1px solid #257CE6; border-radius:var(--radius-sm); padding:0.85rem; color:#1E40AF; font-size:0.88rem;"></div>
        </div>
      `;

      const venueSelect = document.getElementById('hall-venue-select');
      const guestSlider = document.getElementById('hall-guest-slider');
      const guestVal = document.getElementById('hall-guest-val');
      const statusTxt = document.getElementById('hall-status-txt');

      function checkHallCapacity() {
        const maxCap = parseInt(venueSelect.value, 10);
        const guests = parseInt(guestSlider.value, 10);
        guestVal.textContent = guests;

        if (guests <= maxCap) {
          statusTxt.textContent = `Valid (${guests} within ${maxCap} limit) ✓`;
          statusTxt.style.color = '#10B981';
        } else {
          statusTxt.textContent = `Warning (${guests} exceeds max cap of ${maxCap}) ⚠`;
          statusTxt.style.color = '#EF4444';
        }
      }

      venueSelect?.addEventListener('change', checkHallCapacity);
      guestSlider?.addEventListener('input', checkHallCapacity);

      document.getElementById('btn-reserve-hall')?.addEventListener('click', () => {
        playPopSound(700);
        const opt = venueSelect.options[venueSelect.selectedIndex];
        const venueName = opt.getAttribute('data-name');
        const price = opt.getAttribute('data-price');
        const slot = document.getElementById('hall-slot-select').value;
        const resEl = document.getElementById('hall-booking-result');
        const bookingId = 'HALL-' + Math.floor(100000 + Math.random() * 900000);

        resEl.style.display = 'block';
        resEl.innerHTML = `
          <strong>Hall Slot Reserved!</strong><br>
          Booking Voucher: <code>${bookingId}</code> • ${venueName}<br>
          Slot: <strong>${slot.toUpperCase()}</strong> • Base Tariff: <strong>$${price}</strong><br>
          Status: <span style="background:#257CE6; color:#fff; padding:0.1rem 0.4rem; border-radius:4px; font-size:0.75rem;">Reserved &amp; Locked ✓</span>
        `;
        triggerConfetti();
        showToast('🏛️ Hall slot reserved successfully in simulation!');
      });
    }
  }

  // -------------------------------------------------------------------------
  // 8. Direct Message Form (Send Message to Kishor Kumar K M)
  // -------------------------------------------------------------------------
  const directMessageForm = document.getElementById('direct-message-form');
  const messageFeedback = document.getElementById('message-feedback-box');

  if (directMessageForm) {
    directMessageForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const senderName = document.getElementById('sender-name')?.value.trim() || 'Visitor';
      const senderEmail = document.getElementById('sender-email')?.value.trim() || '';
      const messageSubject = document.getElementById('message-subject')?.value.trim() || 'Project Inquiry / Feedback';
      const messageText = document.getElementById('message-text')?.value.trim() || '';

      const recipient = '25bit026@kgcas.com';
      const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(messageSubject)}&body=${encodeURIComponent(`Hi Kishor,\n\n${messageText}\n\nFrom: ${senderName}\nEmail: ${senderEmail}`)}`;

      // Trigger mail client
      window.location.href = mailtoLink;

      if (messageFeedback) {
        messageFeedback.innerHTML = `
          <div style="display:flex; align-items:flex-start; gap:0.75rem;">
            <span style="font-size:1.4rem;">✅</span>
            <div>
              <h4 style="font-size:1.05rem; font-weight:800; margin:0 0 0.25rem; color:#065F46;">Message Dispatched!</h4>
              <p style="font-size:0.88rem; margin:0; color:#047857; line-height:1.5;">
                Thank you, <strong>${senderName}</strong>. Your message was prepared and sent directly to <strong>Kishor Kumar K M</strong> (<code>${recipient}</code>).
              </p>
            </div>
          </div>
        `;
        messageFeedback.classList.add('active');
      }

      triggerConfetti();
      showToast('✉️ Direct message sent to Kishor Kumar K M!');
      directMessageForm.reset();
    });
  }



  // -------------------------------------------------------------------------
  // 10. Copy Student Details / Email with Confetti
  // -------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      playPopSound(700);
      const studentDetails = 'Kishor Kumar K M | Roll No: 25BIT026 | B.Sc Information Technology (2nd Year) | Department of Information Technology';
      navigator.clipboard.writeText(studentDetails).then(() => {
        triggerConfetti();
        showToast('📋 Student details (Kishor Kumar K M • 25BIT026) copied!');
      }).catch(() => {
        showToast('Kishor Kumar K M • 25BIT026');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 11. Toast System & Canvas Confetti
  // -------------------------------------------------------------------------
  let toastTimeout = null;
  function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FF5E4D', '#2680EB', '#F5A623', '#10B981', '#8E44AD', '#FFD166'];
    const particles = [];
    const count = 75;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.45,
        w: Math.random() * 9 + 4,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 14,
        gravity: 0.35,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    let animationId;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.vr;
        p.opacity -= 0.012;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (alive) {
        animationId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationId);
      }
    }

    render();
  }
});
