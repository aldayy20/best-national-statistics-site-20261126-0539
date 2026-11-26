// NusaStats router — hash routing, page rendering and the interactive
// controls: year selector, chart-type toggle, region search and table sort.
// No network calls anywhere; all data is already in the page's modules.
import { VIEWS, NAV } from './views.js';

const pageEl = document.getElementById('page');
const navEl = document.getElementById('main-nav');
const menuBtn = document.getElementById('menu-btn');

// Per-page UI state, kept across re-renders of the same page.
const state = { year: 2024, chart: 'line', q: '', sort: 'pop', dir: 'desc' };

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  return raw.split('/')[0] || '';
}

function render() {
  const route = parseHash();
  const view = VIEWS[route] || VIEWS[''];
  pageEl.innerHTML = view(state);
  document.querySelectorAll('#main-nav a').forEach((a) => {
    const r = a.getAttribute('href').replace(/^#\/?/, '');
    a.classList.toggle('active', r === route);
    if (r === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  wireControls(route);
  navEl.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}

function wireControls(route) {
  const yearSelect = document.getElementById('year-select');
  if (yearSelect) {
    yearSelect.addEventListener('change', () => {
      state.year = Number(yearSelect.value);
      render();
    });
  }
  document.querySelectorAll('[data-chart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.chart = btn.getAttribute('data-chart');
      render();
    });
  });
  const search = document.getElementById('region-search');
  if (search) {
    search.addEventListener('input', () => {
      state.q = search.value;
      const pos = search.selectionStart;
      render();
      const again = document.getElementById('region-search');
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    });
  }
  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const col = btn.getAttribute('data-sort');
      if (state.sort === col) state.dir = state.dir === 'desc' ? 'asc' : 'desc';
      else { state.sort = col; state.dir = col === 'name' ? 'asc' : 'desc'; }
      render();
    });
  });
}

menuBtn.addEventListener('click', () => {
  const open = navEl.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

window.addEventListener('hashchange', render);
render();
