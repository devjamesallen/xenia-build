// =================== XENIA HOME BUILD - SHARED APP JS ===================

// --- Format helpers ---
const fmt = n => '$' + Math.round(n).toLocaleString();
const fmtShort = n => n >= 1000 ? '$' + (n/1000).toFixed(0) + 'K' : '$' + n;

// --- Apply plan decision from localStorage if set in admin ---
// (Runs before any page reads HOME.decisionStatus)
(function applyStoredPlanDecision() {
  try {
    const saved = JSON.parse(localStorage.getItem('xeniabuild:planDecision'));
    if (saved && window.HOME) {
      if (saved.status) HOME.decisionStatus = saved.status;
      if (saved.primary !== undefined) HOME.primaryPlan = saved.primary;
      if (saved.date !== undefined) HOME.decisionDate = saved.date;
      if (saved.note !== undefined) HOME.leaningNote = saved.note;
    }
  } catch {}
})();

// --- Local storage state ---
const STORAGE = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem('xeniabuild:' + key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem('xeniabuild:' + key, JSON.stringify(val)); } catch {}
  }
};

// --- Budget calculations ---
function calcBudget(overrides = {}) {
  const b = HOME.budget;
  const land = overrides.land ?? b.siteWork[0].amount;
  const contingencyPct = overrides.contingencyPct ?? b.contingencyPct;
  const upgradesOverride = overrides.upgrades;

  const baseHome = b.base.basePrice + b.base.elevationB;
  const upgrades = upgradesOverride ?? b.upgrades.reduce((s,u) => s + u.amount, 0);
  const customs = b.customizations.reduce((s,c) => s + c.amount, 0);
  const siteWork = land + b.siteWork.slice(1).reduce((s,sw) => s + sw.amount, 0);
  const construction = baseHome + upgrades + customs;
  const contingency = Math.round(construction * contingencyPct);
  const total = construction + siteWork + contingency + b.loanCosts;
  const psf = Math.round(total / HOME.sqft);

  return {
    baseHome, upgrades, customs, siteWork,
    construction, contingency, loanCosts: b.loanCosts,
    total, psf,
    diff: total - b.target
  };
}

// --- Mortgage calculation ---
function calcMortgage(price, downPct, rate, term) {
  const down = price * (downPct / 100);
  const loan = price - down;
  const monthlyRate = rate / 100 / 12;
  const months = term * 12;
  if (monthlyRate <= 0 || months <= 0 || loan <= 0) return { loan, monthly: 0, taxIns: 0, piti: 0 };
  const monthly = loan * (monthlyRate * Math.pow(1+monthlyRate, months)) / (Math.pow(1+monthlyRate, months) - 1);
  const taxIns = price * 0.012 / 12;
  return { loan, monthly, taxIns, piti: monthly + taxIns };
}

// --- Mobile nav toggle ---
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
}

// --- Set active nav link ---
function setActiveNav(page) {
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('data-page') === page) a.classList.add('active');
    else a.classList.remove('active');
  });
}

// --- Render shared nav HTML ---
function renderNav(activePage = '') {
  return `<nav class="nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-brand">
        <div class="nav-brand-icon">🏠</div>
        <span>Xenia Home</span>
      </a>
      <button class="nav-toggle" aria-label="Toggle menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <ul class="nav-links">
        <li><a href="index.html" data-page="home" class="${activePage==='home'?'active':''}">Overview</a></li>
        <li><a href="kelly.html" data-page="kelly" class="${activePage==='kelly'?'active':''}">Kelly</a></li>
        <li><a href="rosedale.html" data-page="rosedale" class="${activePage==='rosedale'?'active':''}">Rosedale</a></li>
        <li><a href="floor-plan.html" data-page="floorplan" class="${activePage==='floorplan'?'active':''}">Harbor Spring</a></li>
        <li><a href="compare.html" data-page="compare" class="${activePage==='compare'?'active':''}">Compare</a></li>
        <li><a href="budget.html" data-page="budget" class="${activePage==='budget'?'active':''}">Budget</a></li>
        <li><a href="configurator.html" data-page="configurator" class="${activePage==='configurator'?'active':''}">Configurator</a></li>
        <li><a href="features.html" data-page="features" class="${activePage==='features'?'active':''}">Gold Package</a></li>
        <li><a href="timeline.html" data-page="timeline" class="${activePage==='timeline'?'active':''}">Timeline</a></li>
        <li><a href="decisions.html" data-page="decisions" class="${activePage==='decisions'?'active':''}">Decisions</a></li>
      </ul>
    </div>
  </nav>`;
}

// --- Render shared footer ---
function renderFooter() {
  return `<footer class="footer">
    <div class="container">
      <div class="grid grid-3">
        <div>
          <h4>The Home</h4>
          <p style="font-size:14px;line-height:1.7;">${HOME.plan}<br>${HOME.sqft.toLocaleString()} SF · ${HOME.bedrooms} BR / ${HOME.bathrooms} BA<br>${HOME.location}</p>
        </div>
        <div>
          <h4>Builder</h4>
          <p style="font-size:14px;line-height:1.7;">
            <strong style="color:white">${HOME.builder}</strong><br>
            <a href="${HOME.plansUrl}" target="_blank">View Plan Page</a><br>
            <a href="${HOME.virtualTourUrl}" target="_blank">3D Virtual Tour</a><br>
            <a href="tel:1-855-349-2664">${HOME.builderPhone}</a>
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <p style="font-size:14px;line-height:1.7;">
            <a href="budget.html">Budget</a> · <a href="evolution.html">Evolution</a><br>
            <a href="timeline.html">Timeline</a> · <a href="decisions.html">Decisions</a><br>
            <a href="admin.html">Admin</a> · <a href="gallery.html">Gallery</a>
          </p>
        </div>
      </div>
      <div class="footer-bottom">Xenia Home Build · Personal build tracker · Last updated ${new Date().toLocaleDateString('en-US', {month:'long', year:'numeric'})}</div>
    </div>
  </footer>`;
}

// --- Render gallery lightbox ---
function initLightbox() {
  // Create lightbox element if missing
  if (!document.querySelector('.lightbox')) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<button class="lightbox-close">×</button><img src="" alt="">`;
    document.body.appendChild(lb);
    lb.querySelector('.lightbox-close').addEventListener('click', () => lb.classList.remove('open'));
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
  }
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        const lb = document.querySelector('.lightbox');
        lb.querySelector('img').src = img.src;
        lb.classList.add('open');
      }
    });
  });
}

// --- Bootstrap on every page ---
document.addEventListener('DOMContentLoaded', () => {
  // Insert nav and footer if placeholders exist
  const navPlace = document.getElementById('nav-placeholder');
  const footerPlace = document.getElementById('footer-placeholder');
  const page = document.body.getAttribute('data-page') || '';
  if (navPlace) navPlace.outerHTML = renderNav(page);
  if (footerPlace) footerPlace.outerHTML = renderFooter();
  initNav();
});
