/* SQA Builders — main.js
   All shared behaviour lives here. Safe to load on every page. */

// Sticky nav shadow on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('siteNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('open');
  });
}

// Mobile dropdown expand (tap-to-open on small screens)
document.querySelectorAll('.nav-menu > li.has-dropdown > .nav-trigger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (window.innerWidth <= 720) {
      e.preventDefault();
      btn.parentElement.classList.toggle('dropdown-open');
    }
  });
});

// Smooth scroll for anchor links on the same page
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    }
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Form handler (all forms on site use this)
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sent Successfully';
  btn.disabled = true;
  setTimeout(() => { btn.textContent = original; btn.disabled = false; e.target.reset(); }, 3000);
}

// Featured projects slider
(function initFeaturedSlider() {
  const track = document.getElementById('featuredTrack');
  const prev = document.getElementById('featuredPrev');
  const next = document.getElementById('featuredNext');
  if (!track || !prev || !next) return;

  let index = 0;
  function cardsPerView() {
    if (window.innerWidth <= 720) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }
  function maxIndex() { return Math.max(0, track.children.length - cardsPerView()); }
  function update() {
    const cardWidth = track.children[0].getBoundingClientRect().width + 24;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    prev.disabled = index === 0;
    next.disabled = index >= maxIndex();
  }
  prev.addEventListener('click', () => { if (index > 0) { index--; update(); } });
  next.addEventListener('click', () => { if (index < maxIndex()) { index++; update(); } });
  window.addEventListener('resize', () => { index = Math.min(index, maxIndex()); update(); });
  update();
})();

// Expandable leader bios
document.querySelectorAll('.leader-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.leader');
    card.classList.toggle('expanded');
    btn.querySelector('.toggle-label').textContent = card.classList.contains('expanded') ? 'Read Less' : 'Read More';
  });
});

// Project filter (current + completed pages)
(function initProjectFilter() {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.project-card[data-cat]');
  if (!chips.length || !cards.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.dataset.filter;
      cards.forEach(card => {
        const match = val === 'all' || card.dataset.cat === val;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();

// Data loaders — populate projects / management / jobs from /data/*.json when present
async function loadJSON(path) {
  try { const r = await fetch(path); if (!r.ok) return null; return await r.json(); } catch { return null; }
}

async function mountCurrentProjects() {
  const mount = document.getElementById('currentProjectsMount');
  if (!mount) return;
  const data = await loadJSON('data/projects.json');
  if (!data || !data.current) return;
  mount.innerHTML = data.current.map((p, i) => projectCardHTML(p, 'under-construction', i)).join('');
  initProjectFilter();
}

async function mountCompletedProjects() {
  const mount = document.getElementById('completedProjectsMount');
  if (!mount) return;
  const data = await loadJSON('data/projects.json');
  if (!data || !data.completed) return;
  mount.innerHTML = data.completed.map((p, i) => projectCardHTML(p, 'completed', i)).join('');
  initProjectFilter();
}

function projectCardHTML(p, status, i) {
  const statusLabel = status === 'completed' ? 'Completed' : 'Ongoing';
  return `<article class="project-card" data-cat="${p.category}">
    <div class="project-img"><span class="project-status ${status}">${statusLabel}</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>
    </div>
    <div class="project-body">
      <div class="project-cat">${p.category}</div>
      <h3>${p.title}</h3>
      <div class="project-meta">
        ${p.client ? `<div class="project-meta-row"><span>Client</span><span>${p.client}</span></div>` : ''}
        ${p.location ? `<div class="project-meta-row"><span>Location</span><span>${p.location}</span></div>` : ''}
        ${p.period ? `<div class="project-meta-row"><span>Period</span><span>${p.period}</span></div>` : ''}
        ${p.value ? `<div class="project-meta-row"><span>Value</span><span>${p.value}</span></div>` : ''}
      </div>
    </div>
  </article>`;
}

// Jobs as flip cards (Careers page)
async function mountJobs() {
  const mount = document.getElementById('jobsMount');
  if (!mount) return;
  const data = await loadJSON('data/jobs.json');
  if (!data || !data.jobs || !data.jobs.length) {
    mount.innerHTML = `<div style="padding: 40px; text-align: center; background: var(--white); border: 1px solid var(--gray-light); border-radius: var(--radius);">
      <h3 style="font-size: 1.05rem; color: var(--ink); margin-bottom: 8px;">No open positions at the moment.</h3>
      <p style="color: var(--steel);">Please send your resume to <a href="mailto:careers@sqabuilders.com" style="color: var(--blue); font-weight: 600;">careers@sqabuilders.com</a> — we'll keep you in mind as new roles open.</p>
    </div>`;
    return;
  }
  mount.innerHTML = data.jobs.map(j => `
    <article class="flip-card" data-job="${encodeURIComponent(j.title)}">
      <div class="flip-card-inner">
        <div class="flip-face flip-front">
          <div>
            <div class="flip-dept">${j.department}</div>
            <h3>${j.title}</h3>
            <div class="flip-loc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${j.location}
            </div>
          </div>
          <div class="flip-cta">View Description</div>
        </div>
        <div class="flip-face flip-back">
          <button type="button" class="flip-close" aria-label="Close">&times;</button>
          <h3>${j.title}</h3>
          ${j.summary ? `<p class="flip-summary">${j.summary}</p>` : ''}
          ${j.responsibilities && j.responsibilities.length ? `<strong style="font-size:0.7rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 6px;">Responsibilities</strong><ul class="flip-list">${j.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>` : ''}
          ${j.requirements && j.requirements.length ? `<strong style="font-size:0.7rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 6px;">Requirements</strong><ul class="flip-list">${j.requirements.map(r => `<li>${r}</li>`).join('')}</ul>` : ''}
          <a class="flip-apply" href="mailto:careers@sqabuilders.com?subject=Application — ${encodeURIComponent(j.title)}">Apply Now &rarr;</a>
        </div>
      </div>
    </article>
  `).join('');

  // Click-to-flip behaviour
  mount.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.flip-apply')) return;     // let the email link work
      if (e.target.closest('.flip-close')) {
        card.classList.remove('flipped');
        return;
      }
      card.classList.toggle('flipped');
    });
  });
}

// Leaders — renders Board of Directors + optional Key Management
async function mountLeaders() {
  const boardMount = document.getElementById('boardMount');
  const keyMount = document.getElementById('keyManagementMount');
  const keySection = document.getElementById('keyManagementSection');
  if (!boardMount) return;
  const data = await loadJSON('data/leadership.json') || await loadJSON('data/management.json');
  if (!data) return;

  const boardList = data.board || data.leaders || [];
  const keyList = data.keyManagement || [];
  const showKey = !!(data.showKeyManagement && keyList.length);

  const renderCard = (l) => `<article class="leader">
    <div class="leader-photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg></div>
    <div class="leader-body">
      <h3>${l.name}</h3>
      <div class="leader-role">${l.role}</div>
      <div class="leader-bio">${l.bio}</div>
      <button class="leader-toggle" type="button"><span class="toggle-label">Read More</span></button>
    </div>
  </article>`;

  boardMount.innerHTML = boardList.map(renderCard).join('');

  if (keyMount && keySection) {
    if (showKey) {
      keySection.style.display = '';
      keyMount.innerHTML = keyList.map(renderCard).join('');
    } else {
      keySection.style.display = 'none';
    }
  }

  document.querySelectorAll('.leaders-grid .leader-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.leader');
      card.classList.toggle('expanded');
      btn.querySelector('.toggle-label').textContent = card.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
  });
}

// Milestones timeline
async function mountMilestones() {
  const mount = document.getElementById('milestonesMount');
  if (!mount) return;
  const data = await loadJSON('data/milestones.json');
  if (!data || !data.milestones) return;
  mount.innerHTML = data.milestones.map(m => `
    <div class="milestone">
      <div class="milestone-year">${m.year}</div>
      <div class="milestone-title">${m.title}</div>
      <div class="milestone-body">${m.body}</div>
    </div>
  `).join('');
}

// Awards — tabs + cards
async function mountAwards() {
  const tabsMount = document.getElementById('awardsTabs');
  const panelsMount = document.getElementById('awardsPanels');
  if (!tabsMount || !panelsMount) return;
  const data = await loadJSON('data/awards.json');
  if (!data || !data.tabs) return;

  const iconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`;

  tabsMount.innerHTML = data.tabs.map((t, i) => `<button class="tab-btn ${i===0?'active':''}" data-tab="${t.id}">${t.label}</button>`).join('');

  panelsMount.innerHTML = data.tabs.map((t, i) => `
    <div class="tab-panel ${i===0?'active':''}" id="tab-${t.id}">
      ${t.intro ? `<p class="section-lead" style="margin-bottom: 36px;">${t.intro}</p>` : ''}
      <div class="awards-grid">
        ${(t.items||[]).map(item => `
          <article class="award-card">
            <div class="award-badge">${iconSVG}</div>
            <div class="award-body">
              ${item.year ? `<div class="award-year">${item.year}</div>` : ''}
              <h4>${item.title}</h4>
              ${item.score ? `<span class="award-score">${item.score}</span>` : ''}
              ${item.description ? `<p>${item.description}</p>` : ''}
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `).join('');

  tabsMount.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsMount.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      panelsMount.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('tab-' + btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// Run mounts
mountCurrentProjects();
mountCompletedProjects();
mountJobs();
mountLeaders();
mountMilestones();
mountAwards();
