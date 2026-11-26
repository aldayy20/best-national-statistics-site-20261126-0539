// NusaStats views — one function per page. Each page is a hash route; the
// router in app.js calls the matching view and drops the HTML into #page.
// All figures come from data.js and every figure block names its source.
import { INDICATORS, YEARS, AGE_GROUPS, DEMOGRAPHICS, GDP_SHARES, SECTOR_SHARES, TRADE_2024, CPI_GROUPS, EMPLOYMENT, HEALTH_EDU, PROVINCES, SOURCES } from './data.js';
import { lineChart, barChart, shareRows } from './charts.js';

export const NAV = [
  { route: '', label: 'Home' },
  { route: 'population', label: 'Population' },
  { route: 'economy', label: 'Economy' },
  { route: 'prices', label: 'Prices' },
  { route: 'employment', label: 'Employment' },
  { route: 'health-education', label: 'Health & Education' },
  { route: 'regions', label: 'Regions' },
  { route: 'sources', label: 'Sources' },
];

function sourceLine(source, year) {
  return '<p class="source">Source: ' + source + ', ' + year + '.</p>';
}

function kpiCard(key, year) {
  const ind = INDICATORS[key];
  const v = ind.values[year];
  const prev = ind.values[year - 1];
  const delta = prev === undefined ? null : v - prev;
  const deltaText = delta === null ? '' : '<span class="delta ' + (delta >= 0 ? 'up' : 'down') + '">' +
    (delta >= 0 ? '▲ ' : '▼ ') + (Math.abs(delta) >= 10 ? Math.abs(delta).toFixed(0) : Math.abs(delta).toFixed(2)) +
    ' vs ' + (year - 1) + '</span>';
  return '<article class="kpi"><h3>' + ind.label + '</h3>' +
    '<p class="kpi-value">' + ind.format(v) + '</p>' +
    '<p class="kpi-unit">' + ind.unit + '</p>' + deltaText +
    '<p class="source">Source: ' + ind.source + ', ' + year + '.</p></article>';
}

function yearOptions(selected) {
  return YEARS.map((y) => '<option value="' + y + '"' + (y === selected ? ' selected' : '') + '>' + y + '</option>').join('');
}

function seriesPoints(key) {
  return YEARS.map((y) => ({ x: String(y), y: INDICATORS[key].values[y] }));
}

export function viewHome(state) {
  const year = state.year || 2024;
  const chartKind = state.chart || 'line';
  const chartData = seriesPoints('gdpGrowth');
  const chart = chartKind === 'bar'
    ? barChart(chartData.map((p) => ({ label: p.x, value: p.y })), { aria: 'GDP growth by year, bar chart', valueLabel: (v) => v.toFixed(2) + '%' })
    : lineChart(chartData, { aria: 'GDP growth by year, line chart', valueLabel: (v) => v.toFixed(2) + '%' });
  const cards = ['population', 'gdpGrowth', 'inflation', 'unemployment', 'poverty', 'hdi']
    .map((k) => kpiCard(k, year)).join('');
  return '<section class="hero"><h1>Indonesia in numbers</h1>' +
    '<p class="lede">NusaStats gathers Indonesia\u2019s headline statistics in one place — population, the economy, prices, jobs, health and education — each figure labelled with its source and year, so you can check it yourself.</p>' +
    '<p class="hero-meta">Latest year: <strong>2024</strong> &middot; 38 provinces &middot; Figures from BPS and the World Bank</p></section>' +
    '<section class="panel"><div class="panel-head"><h2>GDP growth, 2020–2024</h2>' +
    '<div class="toggle" role="group" aria-label="Chart type">' +
    '<button type="button" data-chart="line" class="' + (chartKind === 'line' ? 'active' : '') + '">Line</button>' +
    '<button type="button" data-chart="bar" class="' + (chartKind === 'bar' ? 'active' : '') + '">Bar</button></div></div>' +
    '<div class="chart-wrap">' + chart + '</div>' +
    sourceLine(SOURCES.bps, 2024) +
    '<p class="note">The economy shrank in 2020, the first pandemic year, then grew above 5% for three straight years.</p></section>' +
    '<section class="panel"><div class="panel-head"><h2>Key indicators</h2>' +
    '<label class="year-pick">Year <select id="year-select" aria-label="Choose year">' + yearOptions(year) + '</select></label></div>' +
    '<div class="kpi-grid">' + cards + '</div>' +
    '<p class="note">Pick a year to see that year\u2019s published values. Figures are rounded; see the Sources page for the exact release.</p></section>' +
    '<section class="panel"><h2>Explore the data</h2><div class="link-grid">' +
    NAV.filter((n) => n.route).map((n) =>
      '<a class="link-card" href="#/' + n.route + '"><strong>' + n.label + '</strong><span>' +
      ({ population: '281.6 million people in 2024', economy: 'GDP grew 5.03% in 2024', prices: 'Inflation 1.57% in 2024', employment: 'Unemployment 4.91% in 2024', 'health-education': 'Life expectancy 74.0 years', regions: 'All 38 provinces compared', sources: 'Where every figure comes from' })[n.route] +
      '</span></a>').join('') + '</div></section>';
}

export function viewPopulation() {
  const pop = seriesPoints('population');
  const total = PROVINCES.reduce((s, p) => s + p.pop, 0);
  return '<section class="panel"><h1>Population</h1>' +
    '<p class="lede">Indonesia is the world\u2019s fourth most populous country, with about <strong>281.6 million people</strong> in 2024, spread across more than 17,000 islands.</p>' +
    '<div class="kpi-grid">' + kpiCard('population', 2024) + kpiCard('lifeExpectancy', 2024) + '</div></section>' +
    '<section class="panel"><h2>Population, 2020–2024</h2><div class="chart-wrap">' +
    lineChart(pop, { aria: 'Population by year', valueLabel: (v) => v.toFixed(1) + ' m' }) + '</div>' +
    sourceLine(SOURCES.bps, 2024) + '</section>' +
    '<section class="panel"><h2>Age structure, 2024</h2><div class="chart-wrap">' +
    barChart(AGE_GROUPS.map((a) => ({ label: a.group, value: a.share })), { aria: 'Share of population by age group', valueLabel: (v) => v.toFixed(1) + '%' }) +
    '</div><p class="note">Almost 60% of Indonesians are under 40 — a young population with a large working-age share.</p>' +
    sourceLine(SOURCES.bps, 2024) + '</section>' +
    '<section class="panel"><h2>At a glance</h2><dl class="fact-list">' +
    DEMOGRAPHICS.map((d) => '<div><dt>' + d.label + '</dt><dd>' + d.value + '</dd><dd class="source">Source: ' + d.source + ', ' + d.year + '.</dd></div>').join('') +
    '</dl><p class="note">Provinces in this table sum to about ' + total.toFixed(1) + ' million people; the small gap is rounding in the published estimates.</p></section>';
}

export function viewEconomy() {
  return '<section class="panel"><h1>Economy</h1>' +
    '<p class="lede">Indonesia is the largest economy in Southeast Asia. Real GDP grew <strong>5.03%</strong> in 2024, and GDP per capita reached about <strong>US$ 4,900</strong>.</p>' +
    '<div class="kpi-grid">' + kpiCard('gdpGrowth', 2024) + kpiCard('gdpPerCapita', 2024) + kpiCard('hdi', 2024) + '</div></section>' +
    '<section class="panel"><h2>GDP growth, 2020–2024</h2><div class="chart-wrap">' +
    barChart(seriesPoints('gdpGrowth').map((p) => ({ label: p.x, value: p.y })), { aria: 'GDP growth by year', valueLabel: (v) => v.toFixed(2) + '%' }) +
    '</div>' + sourceLine(SOURCES.bps, 2024) + '</section>' +
    '<section class="panel"><h2>What makes up GDP, 2024</h2><div class="share-list">' +
    shareRows(GDP_SHARES) + '</div><p class="note">Household spending is more than half of the economy — domestic demand, not exports, drives growth.</p>' +
    sourceLine(SOURCES.bps, 2024) + '</section>' +
    '<section class="panel"><h2>Output by sector, 2024</h2><div class="share-list">' +
    shareRows(SECTOR_SHARES) + '</div>' + sourceLine(SOURCES.bps, 2024) + '</section>' +
    '<section class="panel"><h2>Trade, 2024</h2><dl class="fact-list">' +
    TRADE_2024.map((d) => '<div><dt>' + d.label + '</dt><dd>' + d.value + '</dd><dd class="source">Source: ' + d.source + ', ' + d.year + '.</dd></div>').join('') +
    '</dl></section>';
}

export function viewPrices() {
  return '<section class="panel"><h1>Prices &amp; inflation</h1>' +
    '<p class="lede">Consumer prices rose <strong>1.57%</strong> in 2024 — the lowest annual inflation in recent years, inside Bank Indonesia\u2019s target range.</p>' +
    '<div class="kpi-grid">' + kpiCard('inflation', 2024) + '</div></section>' +
    '<section class="panel"><h2>Inflation, 2020–2024</h2><div class="chart-wrap">' +
    lineChart(seriesPoints('inflation'), { aria: 'Inflation by year', valueLabel: (v) => v.toFixed(2) + '%' }) +
    '</div><p class="note">Inflation spiked to 5.51% in 2022 on global energy and food prices, then fell back as those pressures eased.</p>' +
    sourceLine(SOURCES.bps, 2024) + '</section>' +
    '<section class="panel"><h2>Price rises by group, 2024</h2><div class="chart-wrap">' +
    barChart(CPI_GROUPS.map((g) => ({ label: g.label.split(',')[0], value: g.change })), { aria: 'CPI change by group', valueLabel: (v) => v.toFixed(1) + '%' }) +
    '</div><p class="note">Food prices rose fastest in 2024; transport barely moved after fuel-price adjustments worked through.</p>' +
    sourceLine(SOURCES.bps, 2024) + '</section>' +
    '<section class="panel"><h2>What it means</h2><p>At 1.57% a year, a basket of goods costing Rp 100,000 in December 2023 cost about Rp 101,570 a year later. Low, stable inflation protects the purchasing power of households, especially the poorest, who spend most of their income on food.</p></section>';
}

export function viewEmployment() {
  return '<section class="panel"><h1>Employment</h1>' +
    '<p class="lede">About <strong>153 million Indonesians</strong> were in the labour force in 2024, and the unemployment rate fell to <strong>4.91%</strong> — the lowest since the pandemic.</p>' +
    '<div class="kpi-grid">' + kpiCard('unemployment', 2024) + kpiCard('poverty', 2024) + '</div></section>' +
    '<section class="panel"><h2>Unemployment, 2020–2024</h2><div class="chart-wrap">' +
    lineChart(seriesPoints('unemployment'), { aria: 'Unemployment rate by year', valueLabel: (v) => v.toFixed(2) + '%' }) +
    '</div><p class="note">Unemployment jumped to 7.07% in 2020, then fell every year as the economy recovered.</p>' +
    sourceLine(SOURCES.bps, 2024) + '</section>' +
    '<section class="panel"><h2>Jobs at a glance, 2024</h2><dl class="fact-list">' +
    EMPLOYMENT.map((d) => '<div><dt>' + d.label + '</dt><dd>' + d.value + '</dd><dd class="source">Source: ' + d.source + ', ' + d.year + '.</dd></div>').join('') +
    '</dl></section>' +
    '<section class="panel"><h2>Poverty, 2020–2024</h2><div class="chart-wrap">' +
    barChart(seriesPoints('poverty').map((p) => ({ label: p.x, value: p.y })), { aria: 'Poverty rate by year', valueLabel: (v) => v.toFixed(2) + '%' }) +
    '</div><p class="note">The poverty rate has fallen every year since 2020, to 9.03% in March 2024 — about 25 million people.</p>' +
    sourceLine(SOURCES.bps, 2024) + '</section>';
}

export function viewHealthEducation() {
  return '<section class="panel"><h1>Health &amp; education</h1>' +
    '<p class="lede">Indonesians live longer and study longer than a generation ago: life expectancy reached <strong>74.0 years</strong> in 2024 and the Human Development Index <strong>75.02</strong>.</p>' +
    '<div class="kpi-grid">' + kpiCard('lifeExpectancy', 2024) + kpiCard('hdi', 2024) + '</div></section>' +
    '<section class="panel"><h2>Human Development Index, 2020–2024</h2><div class="chart-wrap">' +
    lineChart(seriesPoints('hdi'), { aria: 'HDI by year', valueLabel: (v) => v.toFixed(2) }) +
    '</div>' + sourceLine(SOURCES.bps, 2024) + '</section>' +
    '<section class="panel"><h2>Health &amp; education at a glance</h2><dl class="fact-list">' +
    HEALTH_EDU.map((d) => '<div><dt>' + d.label + '</dt><dd>' + d.value + '</dd><dd class="source">Source: ' + d.source + ', ' + d.year + '.</dd></div>').join('') +
    '</dl><p class="note">Stunting — children too short for their age — remains the biggest health challenge: about one child in five under five years old.</p></section>';
}

export function viewRegions(state) {
  const q = (state.q || '').toLowerCase();
  const sort = state.sort || 'pop';
  const dir = state.dir === 'asc' ? 1 : -1;
  let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
  const key = sort === 'name' ? (p) => p.name : sort === 'island' ? (p) => p.island : sort === 'poverty' ? (p) => p.poverty : (p) => p.pop;
  rows = rows.slice().sort((a, b) => {
    const ka = key(a), kb = key(b);
    return (ka < kb ? -1 : ka > kb ? 1 : 0) * dir;
  });
  const arrow = (col) => sort === col ? (dir === 1 ? ' ▲' : ' ▼') : '';
  const body = rows.map((p) => '<tr><td>' + p.name + '</td><td>' + p.island + '</td><td class="num">' + p.pop.toFixed(1) + '</td><td class="num">' + p.poverty.toFixed(1) + '%</td></tr>').join('');
  return '<section class="panel"><h1>Regions</h1>' +
    '<p class="lede">All <strong>38 provinces</strong>, compared. Java holds more than half the population; the highest poverty rates are in Papua.</p>' +
    '<div class="table-tools"><label>Search <input id="region-search" type="search" placeholder="Province or island…" value="' + (state.q || '') + '" aria-label="Search provinces"></label>' +
    '<p class="result-count">' + rows.length + ' of 38 provinces</p></div>' +
    '<div class="table-scroll"><table><thead><tr>' +
    '<th><button type="button" data-sort="name">Province' + arrow('name') + '</button></th>' +
    '<th><button type="button" data-sort="island">Island group' + arrow('island') + '</button></th>' +
    '<th><button type="button" data-sort="pop">Population (m)' + arrow('pop') + '</button></th>' +
    '<th><button type="button" data-sort="poverty">Poverty (%)' + arrow('poverty') + '</button></th>' +
    '</tr></thead><tbody>' + (body || '<tr><td colspan="4">No province matches your search.</td></tr>') + '</tbody></table></div>' +
    '<p class="note">Click a column heading to sort. Population is the 2024 mid-year estimate; poverty is the March 2024 rate.</p>' +
    sourceLine(SOURCES.bps, 2024) + '</section>' +
    '<section class="panel"><h2>Five largest provinces</h2><div class="chart-wrap">' +
    barChart(PROVINCES.slice().sort((a, b) => b.pop - a.pop).slice(0, 5).map((p) => ({ label: p.name.replace(' ', ' '), value: p.pop })), { aria: 'Largest provinces by population', valueLabel: (v) => v.toFixed(1) + ' m' }) +
    '</div>' + sourceLine(SOURCES.bps, 2024) + '</section>';
}

export function viewSources() {
  return '<section class="panel"><h1>Data sources &amp; methodology</h1>' +
    '<p class="lede">Every figure on NusaStats comes from a public release. We round figures and never invent precise decimals; where a value is approximate we say so.</p>' +
    '<h2>Sources</h2><ul class="source-list">' +
    '<li><strong>BPS — Statistics Indonesia (bps.go.id)</strong> — population estimates, GDP, CPI, labour force and poverty surveys, Human Development Index. The primary source for nearly every figure here.</li>' +
    '<li><strong>World Bank (worldbank.org)</strong> — GDP per capita in current US dollars and the urban population share.</li>' +
    '<li><strong>BPS National Socio-Economic Survey (Susenas)</strong> — literacy, clean water access and other household indicators.</li></ul>' +
    '<h2>How figures are shown</h2><ul class="source-list">' +
    '<li>Years run 2020–2024, the latest year with a full set of published figures at the time of writing.</li>' +
    '<li>Population is the mid-year estimate; GDP growth is real growth at constant 2010 prices; inflation is the December year-on-year CPI change; unemployment is the August open unemployment rate; poverty is the March rate.</li>' +
    '<li>Provincial poverty rates are rounded from BPS provincial releases; a few small provinces carry approximate values where the release rounds to whole numbers.</li>' +
    '<li>Life expectancy for 2023–2024 reflects the updated BPS method; earlier years use the previous series, so compare across the break with care.</li></ul>' +
    '<h2>About NusaStats</h2><p>NusaStats is an independent, original statistics portal. It is not affiliated with BPS, the Government of Indonesia, or the World Bank, and it does not copy their branding, text or images. Figures are cited so anyone can check them against the original releases.</p>' +
    '<p class="note">Found a figure that looks wrong? Check the release named on its page first — published statistics are revised, and the newest release wins.</p></section>';
}

export const VIEWS = {
  '': viewHome,
  'population': viewPopulation,
  'economy': viewEconomy,
  'prices': viewPrices,
  'employment': viewEmployment,
  'health-education': viewHealthEducation,
  'regions': viewRegions,
  'sources': viewSources,
};
