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
      title: "Convention Hall & CAD Seating Booking Suite",
      subtitle: "Capstone Project 3 • Architectural Blueprint Edition • B.Sc Information Technology",
      image: "assets/images/project-hall.jpg",
      tags: ["HTML5", "CSS3 Blueprint CAD", "JavaScript ES6+", "2D Seating Model", "Slot Tariff Matrix", "Digital Pass Generator"],
      overview: `
        <h4>1. Problem Statement</h4>
        <p>Reserving college auditoriums, banquet halls, and convention spaces often involves scheduling conflicts, lack of seating capacity transparency, and tedious manual paperwork. Traditional tools lack visual seat mapping and instant booking vouchers.</p>
        
        <h4>2. Academic Objectives & Architectural Model</h4>
        <ul>
          <li>Engineer an interactive 2D floor-plan matrix dividing venues into VIP Executive, Delegate, and General Assembly pods.</li>
          <li>Implement real-time capacity and dynamic tariff calculations considering session multipliers and technical add-ons.</li>
          <li>Generate authenticated digital boarding-pass style booking passes with randomized verification barcodes and print-ready layouts.</li>
        </ul>

        <h4>3. Learning Outcomes</h4>
        <p>Demonstrated mastery in stateful DOM grid rendering, spatial data modeling, reactive tariff aggregation, and print stylesheet optimization.</p>
      `,
      demoType: "hall"
    }
  };

  function openProjectModal(projectId) {
    playPopSound(500);
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    projectModal.setAttribute('data-project', projectId);

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
    projectModal.removeAttribute('data-project');
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
        <div class="hall-blueprint-container hall-3d-experience">
          <!-- Top 3D Telemetry & Controls Bar -->
          <div class="blueprint-meta-bar">
            <div class="blueprint-tag-cluster">
              <span class="blueprint-pill highlight">✨ 3D ISOMETRIC VENUE ARENA</span>
              <span class="blueprint-pill">CAD ARCHITECTURE MODEL v3.0</span>
            </div>
            <div class="blueprint-live-indicator">
              <span class="pulse-cyan-dot"></span>
              <span>LIVE ORBITAL 3D VIEWPORT</span>
            </div>
          </div>

          <!-- Camera & 3D Perspective Control Toolbar -->
          <div class="arena-3d-toolbar">
            <div class="camera-mode-group" role="group" aria-label="3D Camera Presets">
              <button type="button" class="cam-btn active" id="btn-cam-iso" title="Switch to 3D Isometric View">
                🏛️ 3D Isometric
              </button>
              <button type="button" class="cam-btn" id="btn-cam-stage" title="Switch to Front Stage Perspective">
                🎭 Stage Perspective
              </button>
              <button type="button" class="cam-btn" id="btn-cam-top" title="Switch to Top-Down 2D CAD Plan">
                📐 Top-Down CAD
              </button>
              <button type="button" class="cam-btn auto-rotate" id="btn-cam-spin" title="Toggle Continuous 360° Turntable Auto-Rotation">
                🔄 Auto-Spin
              </button>
            </div>
            <div class="camera-drag-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              <span>Click &amp; drag arena to orbit 3D camera</span>
            </div>
          </div>

          <!-- Venue & Slot Configuration Controls -->
          <div class="blueprint-controls-grid">
            <div class="blueprint-field">
              <label class="blueprint-label">Convention Venue Model:</label>
              <select id="hall-venue-select" class="blueprint-select">
                <option value="apex" data-name="Apex Convention Center" data-price="9800" data-cap="800" selected>
                  Apex Convention Center (Capacity: 800 • Base: $9,800)
                </option>
                <option value="horizon" data-name="Horizon Grand Ballroom" data-price="12500" data-cap="1200">
                  Horizon Grand Ballroom (Capacity: 1,200 • Base: $12,500)
                </option>
                <option value="skyline" data-name="Skyline Banquet Hall" data-price="6500" data-cap="450">
                  Skyline Banquet Hall (Capacity: 450 • Base: $6,500)
                </option>
              </select>
            </div>

            <div class="blueprint-field">
              <label class="blueprint-label">Session Slot &amp; Timeline:</label>
              <select id="hall-slot-select" class="blueprint-select">
                <option value="morning" data-multiplier="1.0">Morning Session (8:00 AM – 1:00 PM)</option>
                <option value="evening" data-multiplier="1.25" selected>Evening Gala &amp; Banquet (4:00 PM – 10:00 PM)</option>
                <option value="fullday" data-multiplier="1.75">Full Day Tech Summit (8:00 AM – 10:00 PM)</option>
              </select>
            </div>
          </div>

          <!-- 3D Isometric Arena Viewport -->
          <div class="arena-viewport-3d" id="arena-viewport-3d">
            <!-- 3D Orbiting World Plane -->
            <div class="arena-world-3d" id="arena-world-3d">
              <!-- Holographic Grid Floor Plane -->
              <div class="arena-floor-plane"></div>

              <!-- Volumetric Sweeping Spotlights -->
              <div class="spotlight-beam-3d beam-left" aria-hidden="true"></div>
              <div class="spotlight-beam-3d beam-right" aria-hidden="true"></div>

              <!-- Elevated 3D Proscenium Stage (Z: 36px) -->
              <div class="stage-structure-3d">
                <div class="stage-backdrop-screen">
                  <span class="screen-text">4K ULTRA-WIDE PROSCENIUM WALL</span>
                </div>
                <div class="stage-wood-deck">
                  <div class="stage-podium-3d">
                    <span class="podium-mic-icon">🎙️</span>
                    <span class="podium-title">KEYNOTE PODIUM</span>
                  </div>
                </div>
                <div class="stage-face-front"></div>
                <div class="stage-rim-glow"></div>
              </div>

              <!-- 3D Seating Risers -->
              <!-- Tier A: VIP Ground Level Pods (Z: 10px) -->
              <div class="riser-tier-3d tier-a-wrap">
                <div class="riser-header-3d">
                  <span class="tier-badge-3d vip">ZONE A • VIP EXECUTIVE SEATING ($45/SEAT)</span>
                </div>
                <div class="seats-matrix-3d zone-a-3d" id="zone-a-3d-grid"></div>
              </div>

              <!-- Tier B: Delegate Conference Platform Riser (Z: 28px) -->
              <div class="riser-tier-3d tier-b-wrap">
                <div class="riser-step-face b-face"></div>
                <div class="riser-header-3d">
                  <span class="tier-badge-3d delegate">ZONE B • DELEGATE CONFERENCE RISER ($25/SEAT)</span>
                </div>
                <div class="seats-matrix-3d zone-b-3d" id="zone-b-3d-grid"></div>
              </div>

              <!-- Tier C: Stadium Assembly Gallery Riser (Z: 52px) -->
              <div class="riser-tier-3d tier-c-wrap">
                <div class="riser-step-face c-face"></div>
                <div class="riser-header-3d">
                  <span class="tier-badge-3d assembly">ZONE C • AUDITORIUM GALLERY RISER ($15/SEAT)</span>
                </div>
                <div class="seats-matrix-3d zone-c-3d" id="zone-c-3d-grid"></div>
              </div>

              <!-- Floating 3D Telemetry HUD (Z: 85px) -->
              <div class="floating-hud-3d">
                <div class="hud-chip">
                  <span class="hud-glow-dot"></span>
                  <span id="hud-camera-angle">CAM: 56°X / -36°Z</span>
                </div>
                <div class="hud-chip highlight">
                  <span id="hud-seats-telemetry">SEATS: 4 SELECTED</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3D Legend & Presets -->
          <div class="blueprint-legend-row">
            <div class="blueprint-legend">
              <div class="legend-item"><span class="legend-swatch available"></span> Available</div>
              <div class="legend-item"><span class="legend-swatch selected"></span> Selected (Laser Beam 3D)</div>
              <div class="legend-item"><span class="legend-swatch reserved"></span> Reserved</div>
              <div class="legend-item"><span class="legend-badge vip">VIP ($45)</span></div>
              <div class="legend-item"><span class="legend-badge delegate">Delegate ($25)</span></div>
              <div class="legend-item"><span class="legend-badge assembly">Assembly ($15)</span></div>
            </div>

            <!-- Quick Preset Action Toolbar -->
            <div class="blueprint-presets-toolbar">
              <span class="presets-label">Presets:</span>
              <button type="button" class="preset-btn" id="btn-preset-vip">Front Row VIP (8 Seats)</button>
              <button type="button" class="preset-btn" id="btn-preset-delegate">Delegate Block (6 Seats)</button>
              <button type="button" class="preset-btn" id="btn-preset-all">Select All Available</button>
              <button type="button" class="preset-btn reset" id="btn-preset-clear">Clear Seats</button>
            </div>
          </div>

          <!-- Add-on Services Checklist -->
          <div class="blueprint-addons-box">
            <h5 class="addons-heading">Production &amp; Hospitality Add-ons:</h5>
            <div class="addons-grid">
              <label class="addon-checkbox-label">
                <input type="checkbox" id="addon-video-wall" value="450" checked />
                <span>4K Dual Laser Video Wall (+$450)</span>
              </label>
              <label class="addon-checkbox-label">
                <input type="checkbox" id="addon-sound-rig" value="250" checked />
                <span>Acoustic Multi-Mic Sound Rig (+$250)</span>
              </label>
              <label class="addon-checkbox-label">
                <input type="checkbox" id="addon-buffet" value="18" />
                <span>Executive Buffet &amp; High-Tea ($18 / Seat)</span>
              </label>
            </div>
          </div>

          <!-- Real-time Cost & Capacity Ticker -->
          <div class="blueprint-ticker-bar">
            <div class="ticker-stat">
              <span class="ticker-label">Selected Seats</span>
              <span class="ticker-value" id="ticker-seats-count">0 Seats</span>
            </div>
            <div class="ticker-stat">
              <span class="ticker-label">Seats Breakdown</span>
              <span class="ticker-sub" id="ticker-seats-breakdown">None selected</span>
            </div>
            <div class="ticker-stat">
              <span class="ticker-label">Capacity Utilized</span>
              <span class="ticker-value highlight" id="ticker-capacity-val">0%</span>
            </div>
            <div class="ticker-stat total-col">
              <span class="ticker-label">Estimated Total Tariff</span>
              <span class="ticker-total" id="ticker-total-tariff">$0.00</span>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="button" class="btn-generate-voucher" id="btn-generate-hall-voucher">
            <span>Generate Official Booking Voucher &amp; CAD Pass 🎟️</span>
          </button>

          <!-- Generated Digital Booking Pass (Printable Boarding Pass Style) -->
          <div id="hall-voucher-container" class="digital-voucher-wrapper" style="display:none;"></div>
        </div>
      `;

      // -----------------------------------------------------------------------
      // Hall Blueprint Seating Model Store
      // -----------------------------------------------------------------------
      const seatModel = [
        // Zone A: VIP ($45)
        { id: 'A1', zone: 'A', name: 'VIP Pod A1', price: 45, status: 'available' },
        { id: 'A2', zone: 'A', name: 'VIP Pod A2', price: 45, status: 'available' },
        { id: 'A3', zone: 'A', name: 'VIP Pod A3', price: 45, status: 'reserved' },
        { id: 'A4', zone: 'A', name: 'VIP Pod A4', price: 45, status: 'available' },
        { id: 'A5', zone: 'A', name: 'VIP Pod A5', price: 45, status: 'available' },
        { id: 'A6', zone: 'A', name: 'VIP Pod A6', price: 45, status: 'available' },
        { id: 'A7', zone: 'A', name: 'VIP Pod A7', price: 45, status: 'available' },
        { id: 'A8', zone: 'A', name: 'VIP Pod A8', price: 45, status: 'available' },

        // Zone B: Delegate ($25)
        { id: 'B1', zone: 'B', name: 'Delegate B1', price: 25, status: 'available' },
        { id: 'B2', zone: 'B', name: 'Delegate B2', price: 25, status: 'available' },
        { id: 'B3', zone: 'B', name: 'Delegate B3', price: 25, status: 'available' },
        { id: 'B4', zone: 'B', name: 'Delegate B4', price: 25, status: 'available' },
        { id: 'B5', zone: 'B', name: 'Delegate B5', price: 25, status: 'available' },
        { id: 'B6', zone: 'B', name: 'Delegate B6', price: 25, status: 'reserved' },
        { id: 'B7', zone: 'B', name: 'Delegate B7', price: 25, status: 'available' },
        { id: 'B8', zone: 'B', name: 'Delegate B8', price: 25, status: 'available' },
        { id: 'B9', zone: 'B', name: 'Delegate B9', price: 25, status: 'available' },
        { id: 'B10', zone: 'B', name: 'Delegate B10', price: 25, status: 'available' },
        { id: 'B11', zone: 'B', name: 'Delegate B11', price: 25, status: 'reserved' },
        { id: 'B12', zone: 'B', name: 'Delegate B12', price: 25, status: 'available' },

        // Zone C: General Assembly ($15)
        { id: 'C1', zone: 'C', name: 'Assembly C1', price: 15, status: 'available' },
        { id: 'C2', zone: 'C', name: 'Assembly C2', price: 15, status: 'available' },
        { id: 'C3', zone: 'C', name: 'Assembly C3', price: 15, status: 'available' },
        { id: 'C4', zone: 'C', name: 'Assembly C4', price: 15, status: 'reserved' },
        { id: 'C5', zone: 'C', name: 'Assembly C5', price: 15, status: 'available' },
        { id: 'C6', zone: 'C', name: 'Assembly C6', price: 15, status: 'available' },
        { id: 'C7', zone: 'C', name: 'Assembly C7', price: 15, status: 'available' },
        { id: 'C8', zone: 'C', name: 'Assembly C8', price: 15, status: 'available' },
        { id: 'C9', zone: 'C', name: 'Assembly C9', price: 15, status: 'reserved' },
        { id: 'C10', zone: 'C', name: 'Assembly C10', price: 15, status: 'available' },
        { id: 'C11', zone: 'C', name: 'Assembly C11', price: 15, status: 'available' },
        { id: 'C12', zone: 'C', name: 'Assembly C12', price: 15, status: 'available' },
        { id: 'C13', zone: 'C', name: 'Assembly C13', price: 15, status: 'available' },
        { id: 'C14', zone: 'C', name: 'Assembly C14', price: 15, status: 'reserved' },
        { id: 'C15', zone: 'C', name: 'Assembly C15', price: 15, status: 'available' },
        { id: 'C16', zone: 'C', name: 'Assembly C16', price: 15, status: 'available' }
      ];

      // Pre-select 4 premium seats
      const selectedSeats = new Set(['A1', 'A2', 'B4', 'B5']);

      const zoneAGrid = document.getElementById('zone-a-3d-grid');
      const zoneBGrid = document.getElementById('zone-b-3d-grid');
      const zoneCGrid = document.getElementById('zone-c-3d-grid');
      const venueSelect = document.getElementById('hall-venue-select');
      const slotSelect = document.getElementById('hall-slot-select');
      const addonVideoWall = document.getElementById('addon-video-wall');
      const addonSoundRig = document.getElementById('addon-sound-rig');
      const addonBuffet = document.getElementById('addon-buffet');

      // -----------------------------------------------------------------------
      // Interactive 3D Camera Orbit Engine
      // -----------------------------------------------------------------------
      const arenaViewport = document.getElementById('arena-viewport-3d');
      const arenaWorld = document.getElementById('arena-world-3d');
      const hudAngle = document.getElementById('hud-camera-angle');
      const hudSeatsTelemetry = document.getElementById('hud-seats-telemetry');

      let rotX = 56;
      let rotZ = -36;
      let isDragging = false;
      let startMouseX = 0;
      let startMouseY = 0;
      let isAutoSpinning = false;
      let spinAnimId = null;

      function applyArenaTransform() {
        if (!arenaWorld) return;
        arenaWorld.style.transform = `rotateX(${rotX}deg) rotateZ(${rotZ}deg)`;
        if (hudAngle) {
          hudAngle.textContent = `CAM: ${Math.round(rotX)}°X / ${Math.round(rotZ)}°Z`;
        }
      }

      function setCameraPreset(newX, newZ, activeBtnId) {
        stopAutoSpin();
        document.querySelectorAll('.cam-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(activeBtnId)?.classList.add('active');
        rotX = newX;
        rotZ = newZ;
        if (arenaWorld) {
          arenaWorld.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1)';
          applyArenaTransform();
          setTimeout(() => {
            if (arenaWorld) arenaWorld.style.transition = '';
          }, 600);
        }
      }

      function startAutoSpin() {
        if (isAutoSpinning) return;
        isAutoSpinning = true;
        document.querySelectorAll('.cam-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('btn-cam-spin')?.classList.add('active');

        function spinLoop() {
          if (!isAutoSpinning) return;
          rotZ = (rotZ + 0.35) % 360;
          applyArenaTransform();
          spinAnimId = requestAnimationFrame(spinLoop);
        }
        spinAnimId = requestAnimationFrame(spinLoop);
      }

      function stopAutoSpin() {
        isAutoSpinning = false;
        if (spinAnimId) {
          cancelAnimationFrame(spinAnimId);
          spinAnimId = null;
        }
        document.getElementById('btn-cam-spin')?.classList.remove('active');
      }

      // Camera Toolbar Buttons
      document.getElementById('btn-cam-iso')?.addEventListener('click', () => {
        playPopSound(500);
        setCameraPreset(56, -36, 'btn-cam-iso');
      });

      document.getElementById('btn-cam-stage')?.addEventListener('click', () => {
        playPopSound(520);
        setCameraPreset(74, 0, 'btn-cam-stage');
      });

      document.getElementById('btn-cam-top')?.addEventListener('click', () => {
        playPopSound(480);
        setCameraPreset(0, 0, 'btn-cam-top');
      });

      document.getElementById('btn-cam-spin')?.addEventListener('click', () => {
        playPopSound(600);
        if (isAutoSpinning) {
          stopAutoSpin();
          setCameraPreset(56, -36, 'btn-cam-iso');
        } else {
          startAutoSpin();
        }
      });

      // Mouse Drag to Orbit in 3D Space
      if (arenaViewport) {
        arenaViewport.addEventListener('mousedown', (e) => {
          // If clicking a seat button, allow seat selection without dragging
          if (e.target.closest('.seat-3d-item')) return;
          isDragging = true;
          startMouseX = e.clientX;
          startMouseY = e.clientY;
          stopAutoSpin();
          arenaViewport.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          const deltaX = e.clientX - startMouseX;
          const deltaY = e.clientY - startMouseY;
          startMouseX = e.clientX;
          startMouseY = e.clientY;

          rotZ += deltaX * 0.45;
          rotX = Math.max(0, Math.min(84, rotX - deltaY * 0.35));
          applyArenaTransform();
        });

        window.addEventListener('mouseup', () => {
          if (isDragging) {
            isDragging = false;
            arenaViewport.style.cursor = '';
          }
        });

        // Touch support for mobile
        arenaViewport.addEventListener('touchstart', (e) => {
          if (e.target.closest('.seat-3d-item')) return;
          if (e.touches.length === 1) {
            isDragging = true;
            startMouseX = e.touches[0].clientX;
            startMouseY = e.touches[0].clientY;
            stopAutoSpin();
          }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
          if (!isDragging || e.touches.length !== 1) return;
          const deltaX = e.touches[0].clientX - startMouseX;
          const deltaY = e.touches[0].clientY - startMouseY;
          startMouseX = e.touches[0].clientX;
          startMouseY = e.touches[0].clientY;

          rotZ += deltaX * 0.45;
          rotX = Math.max(0, Math.min(84, rotX - deltaY * 0.35));
          applyArenaTransform();
        }, { passive: true });

        window.addEventListener('touchend', () => { isDragging = false; });
      }

      // -----------------------------------------------------------------------
      // Render Volumetric 3D Seats with Laser Light Pillars
      // -----------------------------------------------------------------------
      function render3DSeatButtons() {
        const create3DSeatBtn = (seat) => {
          const isSelected = selectedSeats.has(seat.id);
          const isReserved = seat.status === 'reserved';
          const zoneClass = seat.zone === 'A' ? 'vip' : seat.zone === 'B' ? 'delegate' : 'assembly';

          let stateClass = 'available';
          if (isReserved) stateClass = 'reserved';
          else if (isSelected) stateClass = 'selected';

          return `
            <button type="button" 
              class="seat-3d-item ${zoneClass} ${stateClass}" 
              data-seat-id="${seat.id}"
              ${isReserved ? 'disabled title="Seat ' + seat.id + ' is Reserved"' : 'title="Seat ' + seat.id + ' • ' + seat.name + ' • $' + seat.price + '"'}
              aria-label="${seat.name}, $${seat.price}, ${stateClass}">
              <!-- 3D Backrest Plane -->
              <span class="seat-backrest-3d"></span>
              <!-- 3D Cushion Top -->
              <span class="seat-cushion-3d">
                <span class="seat-label-3d">${seat.id}</span>
                <span class="seat-status-dot"></span>
              </span>
              <!-- 3D Pedestal Base -->
              <span class="seat-base-3d"></span>
              <!-- Volumetric Laser Beam Pillar when Selected -->
              ${isSelected ? '<span class="seat-laser-pillar-3d"><span class="pillar-core"></span><span class="pillar-ring"></span></span>' : ''}
            </button>
          `;
        };

        if (zoneAGrid) zoneAGrid.innerHTML = seatModel.filter(s => s.zone === 'A').map(create3DSeatBtn).join('');
        if (zoneBGrid) zoneBGrid.innerHTML = seatModel.filter(s => s.zone === 'B').map(create3DSeatBtn).join('');
        if (zoneCGrid) zoneCGrid.innerHTML = seatModel.filter(s => s.zone === 'C').map(create3DSeatBtn).join('');

        // Attach seat click listener
        document.querySelectorAll('.seat-3d-item:not(.reserved)').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const sid = btn.getAttribute('data-seat-id');
            if (selectedSeats.has(sid)) {
              selectedSeats.delete(sid);
            } else {
              selectedSeats.add(sid);
            }
            playPopSound(620);
            render3DSeatButtons();
            updateBlueprintCalculations();
          });
        });
      }

      function updateBlueprintCalculations() {
        const selectedVenueOpt = venueSelect.options[venueSelect.selectedIndex];
        const baseVenuePrice = parseFloat(selectedVenueOpt.getAttribute('data-price')) || 9800;

        const selectedSlotOpt = slotSelect.options[slotSelect.selectedIndex];
        const slotMultiplier = parseFloat(selectedSlotOpt.getAttribute('data-multiplier')) || 1.0;

        let seatingCost = 0;
        let countA = 0;
        let countB = 0;
        let countC = 0;

        selectedSeats.forEach(sid => {
          const s = seatModel.find(item => item.id === sid);
          if (s) {
            seatingCost += s.price;
            if (s.zone === 'A') countA++;
            else if (s.zone === 'B') countB++;
            else if (s.zone === 'C') countC++;
          }
        });

        // Add-ons computation
        let addonsCost = 0;
        if (addonVideoWall?.checked) addonsCost += parseFloat(addonVideoWall.value) || 0;
        if (addonSoundRig?.checked) addonsCost += parseFloat(addonSoundRig.value) || 0;
        if (addonBuffet?.checked) {
          const buffetRate = parseFloat(addonBuffet.value) || 0;
          addonsCost += buffetRate * Math.max(selectedSeats.size, 1);
        }

        const totalTariff = (baseVenuePrice * slotMultiplier) + seatingCost + addonsCost;

        // Update DOM Ticker & HUD
        const tickerCount = document.getElementById('ticker-seats-count');
        const tickerBreakdown = document.getElementById('ticker-seats-breakdown');
        const tickerCapacity = document.getElementById('ticker-capacity-val');
        const tickerTotal = document.getElementById('ticker-total-tariff');

        if (tickerCount) tickerCount.textContent = `${selectedSeats.size} Seats`;
        if (tickerBreakdown) {
          if (selectedSeats.size === 0) {
            tickerBreakdown.textContent = 'None selected';
          } else {
            const parts = [];
            if (countA > 0) parts.push(`${countA} VIP`);
            if (countB > 0) parts.push(`${countB} Del`);
            if (countC > 0) parts.push(`${countC} Asm`);
            tickerBreakdown.textContent = parts.join(' • ');
          }
        }

        const totalAvailableSeats = seatModel.filter(s => s.status !== 'reserved').length;
        const percentUtilized = Math.round((selectedSeats.size / totalAvailableSeats) * 100);
        if (tickerCapacity) tickerCapacity.textContent = `${percentUtilized}% Pods`;

        if (hudSeatsTelemetry) {
          hudSeatsTelemetry.textContent = `SEATS: ${selectedSeats.size} ACTIVE (${percentUtilized}%)`;
        }

        if (tickerTotal) {
          tickerTotal.textContent = '$' + totalTariff.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
      }

      // Presets
      document.getElementById('btn-preset-vip')?.addEventListener('click', () => {
        playPopSound(600);
        seatModel.filter(s => s.zone === 'A' && s.status !== 'reserved').forEach(s => selectedSeats.add(s.id));
        render3DSeatButtons();
        updateBlueprintCalculations();
        showToast('Selected all VIP Front Row Pods 🌟');
      });

      document.getElementById('btn-preset-delegate')?.addEventListener('click', () => {
        playPopSound(600);
        seatModel.filter(s => s.zone === 'B' && s.status !== 'reserved').slice(0, 6).forEach(s => selectedSeats.add(s.id));
        render3DSeatButtons();
        updateBlueprintCalculations();
        showToast('Selected Delegate Conference Block 💼');
      });

      document.getElementById('btn-preset-all')?.addEventListener('click', () => {
        playPopSound(650);
        seatModel.filter(s => s.status !== 'reserved').forEach(s => selectedSeats.add(s.id));
        render3DSeatButtons();
        updateBlueprintCalculations();
        showToast('Selected All Available 3D Arena Seats 🏛️');
      });

      document.getElementById('btn-preset-clear')?.addEventListener('click', () => {
        playPopSound(350);
        selectedSeats.clear();
        render3DSeatButtons();
        updateBlueprintCalculations();
        showToast('Cleared Seat Selection');
      });

      // Change listeners for recalculation
      venueSelect?.addEventListener('change', () => { playPopSound(450); updateBlueprintCalculations(); });
      slotSelect?.addEventListener('change', () => { playPopSound(450); updateBlueprintCalculations(); });
      addonVideoWall?.addEventListener('change', updateBlueprintCalculations);
      addonSoundRig?.addEventListener('change', updateBlueprintCalculations);
      addonBuffet?.addEventListener('change', updateBlueprintCalculations);

      // Generate Voucher Pass Handler
      document.getElementById('btn-generate-hall-voucher')?.addEventListener('click', () => {
        playPopSound(750);
        triggerConfetti();

        const voucherWrap = document.getElementById('hall-voucher-container');
        if (!voucherWrap) return;

        const selectedVenueOpt = venueSelect.options[venueSelect.selectedIndex];
        const venueName = selectedVenueOpt.getAttribute('data-name');
        const selectedSlotOpt = slotSelect.options[slotSelect.selectedIndex];
        const slotText = selectedSlotOpt.textContent.split('(')[0].trim();
        const totalFormatted = document.getElementById('ticker-total-tariff')?.textContent || '$9,800.00';

        const voucherId = 'KGCAS-HALL-' + Math.floor(100000 + Math.random() * 900000);
        const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        const seatTagsHtml = selectedSeats.size > 0 
          ? Array.from(selectedSeats).sort().map(sid => `<span class="voucher-seat-badge">${sid}</span>`).join(' ')
          : '<span style="color:#94A3B8; font-style:italic;">General Admission (No reserved pods)</span>';

        voucherWrap.style.display = 'block';
        voucherWrap.innerHTML = `
          <div class="digital-voucher-card">
            <!-- Left Main Ticket Section -->
            <div class="voucher-main-body">
              <div class="voucher-holo-stripe"></div>
              
              <div class="voucher-header">
                <div class="voucher-title-wrap">
                  <span class="voucher-academic-badge">🎓 OFFICIAL ACADEMIC VENUE PASS • CAPSTONE PROJECT 3</span>
                  <h4 class="voucher-venue-title">${venueName}</h4>
                </div>
                <div class="voucher-ref-badge">
                  <span class="ref-label">PASS REF</span>
                  <span class="ref-id" id="pass-ref-code">${voucherId}</span>
                </div>
              </div>

              <div class="voucher-details-grid">
                <div class="v-cell">
                  <span class="v-label">RESERVATION SLOT</span>
                  <span class="v-value">${slotText}</span>
                </div>
                <div class="v-cell">
                  <span class="v-label">EVENT DATE</span>
                  <span class="v-value">${todayDate}</span>
                </div>
                <div class="v-cell">
                  <span class="v-label">ALLOCATED 3D SEATS (${selectedSeats.size})</span>
                  <div class="v-seats-list">${seatTagsHtml}</div>
                </div>
                <div class="v-cell">
                  <span class="v-label">TOTAL AUTHORIZED TARIFF</span>
                  <span class="v-value total-highlight">${totalFormatted}</span>
                </div>
              </div>

              <div class="voucher-footer">
                <div class="voucher-author-signature">
                  <span>Author / Developer: <strong>Kishor Kumar K M (25BIT026)</strong></span>
                  <span class="dept-txt">B.Sc Information Technology • KGCAS</span>
                </div>
                <div class="voucher-btn-group">
                  <button type="button" class="v-action-btn print" onclick="window.print()">
                    🖨️ Print Pass
                  </button>
                  <button type="button" class="v-action-btn copy" id="btn-copy-pass-ref">
                    📋 Copy Code
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Tear-Off Stub with Barcode -->
            <div class="voucher-stub">
              <div class="stub-notch top"></div>
              <div class="stub-inner">
                <div class="stub-watermark">KGCAS</div>
                <div class="stub-qr-code">
                  <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                    <circle cx="17.5" cy="17.5" r="2.5" fill="currentColor"></circle>
                    <line x1="14" y1="14" x2="14" y2="14.01"></line>
                    <line x1="21" y1="14" x2="21" y2="14.01"></line>
                    <line x1="14" y1="21" x2="14" y2="21.01"></line>
                    <line x1="21" y1="21" x2="21" y2="21.01"></line>
                  </svg>
                </div>
                <div class="stub-barcode-lines" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div class="stub-code-txt">${voucherId}</div>
                <div class="stub-verified-badge">VERIFIED ✓</div>
              </div>
              <div class="stub-notch bottom"></div>
            </div>
          </div>
        `;

        // Smooth scroll to voucher
        voucherWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        document.getElementById('btn-copy-pass-ref')?.addEventListener('click', () => {
          playPopSound(500);
          navigator.clipboard.writeText(voucherId).then(() => {
            showToast(`Voucher Ref ${voucherId} copied to clipboard! 📋`);
          }).catch(() => {
            showToast(`Voucher Ref: ${voucherId}`);
          });
        });

        showToast('🏛️ 3D Venue Pass generated successfully!');
      });

      // Initialize
      applyArenaTransform();
      render3DSeatButtons();
      updateBlueprintCalculations();
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
