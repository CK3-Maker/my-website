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

async function mountJobs() {
  const mount = document.getElementById('jobsMount');
  if (!mount) return;
  const data = await loadJSON('data/jobs.json');
  if (!data || !data.jobs || !data.jobs.length) {
    mount.innerHTML = '<div class="job-row"><div class="job-title">No open positions at the moment</div><div class="job-dept">Please email your resume to <a href="mailto:careers@sqabuilders.com">careers@sqabuilders.com</a></div></div>';
    return;
  }
  mount.innerHTML = `<div class="job-row head"><div>Position</div><div>Department</div><div>Location</div><div>&nbsp;</div></div>` +
    data.jobs.map(j => `<div class="job-row">
      <div class="job-title">${j.title}</div>
      <div class="job-dept">${j.department}</div>
      <div class="job-loc">${j.location}</div>
      <div><a class="btn-link" href="mailto:careers@sqabuilders.com?subject=Application – ${encodeURIComponent(j.title)}">Apply</a></div>
    </div>`).join('');
}

async function mountLeaders() {
  const mount = document.getElementById('leadersMount');
  if (!mount) return;
  const data = await loadJSON('data/management.json');
  if (!data || !data.leaders) return;
  mount.innerHTML = data.leaders.map(l => `<article class="leader">
    <div class="leader-photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg></div>
    <div class="leader-body">
      <h3>${l.name}</h3>
      <div class="leader-role">${l.role}</div>
      <div class="leader-bio">${l.bio}</div>
      <button class="leader-toggle" type="button"><span class="toggle-label">Read More</span></button>
    </div>
  </article>`).join('');
  // Re-bind toggles now that cards exist
  mount.querySelectorAll('.leader-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.leader');
      card.classList.toggle('expanded');
      btn.querySelector('.toggle-label').textContent = card.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
  });
}

// Run mounts
mountCurrentProjects();
mountCompletedProjects();
mountJobs();
mountLeaders();
