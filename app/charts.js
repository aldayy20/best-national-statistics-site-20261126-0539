// NusaStats chart helpers — hand-rolled SVG charts, no libraries. Every chart
// is built from plain numbers and returns an SVG string the views drop into
// the page. Colours come from the site palette in style.css.

const PALETTE = ['#0e7c7b', '#e36414', '#12355b', '#f2a541', '#7fb069', '#9b5de5'];

function niceTicks(min, max, count) {
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const step = span / (count - 1 || 1);
  const ticks = [];
  for (let i = 0; i < count; i++) ticks.push(min + step * i);
  return ticks;
}

function fmtTick(v) {
  const abs = Math.abs(v);
  if (abs >= 1000) return (v / 1000).toFixed(1) + 'k';
  if (abs >= 100) return Math.round(v).toString();
  if (abs >= 10) return v.toFixed(1);
  return v.toFixed(2);
}

// A line chart. points: [{x: '2020', y: 5.03}, ...]. Options: width, height,
// colour, unit label, decimals.
export function lineChart(points, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 280;
  const padL = 52, padR = 16, padT = 18, padB = 34;
  const ys = points.map((p) => p.y);
  let min = Math.min(...ys);
  let max = Math.max(...ys);
  const span = (max - min) || 1;
  // Zoom the axis when the values cluster far from zero (population, HDI);
  // otherwise start at zero so growth is read honestly.
  if (min >= 0 && span / max < 0.3) min = min - span * 0.3;
  else if (min >= 0) min = 0;
  const ticks = niceTicks(min, max, 5);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const xAt = (i) => padL + (i * (w - padL - padR)) / Math.max(points.length - 1, 1);
  const yAt = (v) => padT + (1 - (v - min) / (max - min)) * (h - padT - padB);
  const color = opts.color || PALETTE[0];
  const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + xAt(i).toFixed(1) + ',' + yAt(p.y).toFixed(1)).join(' ');
  const area = path + ' L' + xAt(points.length - 1).toFixed(1) + ',' + yAt(min).toFixed(1) +
    ' L' + xAt(0).toFixed(1) + ',' + yAt(min).toFixed(1) + ' Z';
  const grid = ticks.map((t) => {
    const y = yAt(t);
    return '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y.toFixed(1) +
      '" stroke="#e3ddd2" stroke-width="1"/>' +
      '<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#6b6558">' +
      fmtTick(t) + '</text>';
  }).join('');
  const dots = points.map((p, i) => {
    const anchor = i === 0 ? 'start' : (i === points.length - 1 ? 'end' : 'middle');
    const lx = i === 0 ? xAt(i) + 6 : (i === points.length - 1 ? xAt(i) - 6 : xAt(i));
    return '<circle cx="' + xAt(i).toFixed(1) + '" cy="' + yAt(p.y).toFixed(1) + '" r="4.5" fill="' + color + '" stroke="#fff" stroke-width="1.5"/>' +
    '<text x="' + lx.toFixed(1) + '" y="' + (yAt(p.y) - 10).toFixed(1) + '" text-anchor="' + anchor + '" font-size="11" font-weight="600" fill="#12355b">' +
    (opts.valueLabel ? opts.valueLabel(p.y) : p.y) + '</text>';
  }).join('');
  const labels = points.map((p, i) =>
    '<text x="' + xAt(i).toFixed(1) + '" y="' + (h - 10) + '" text-anchor="middle" font-size="11" fill="#6b6558">' + p.x + '</text>'
  ).join('');
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (opts.aria || 'Line chart') +
    '" class="chart-svg">' + grid +
    '<path d="' + area + '" fill="' + color + '" opacity="0.10"/>' +
    '<path d="' + path + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
    dots + labels + '</svg>';
}

// A vertical bar chart. bars: [{label, value}, ...]. Options: width, height,
// colour, valueLabel, horizontal flag.
export function barChart(bars, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 300;
  const padL = 52, padR = 16, padT = 24, padB = 52;
  const rawMax = Math.max(...bars.map((b) => b.value), 0);
  const rawMin = Math.min(...bars.map((b) => b.value), 0);
  const max = rawMax * 1.15;
  const min = rawMin < 0 ? rawMin * 1.15 : 0;
  const ticks = niceTicks(min, max, 5);
  const top = ticks[ticks.length - 1];
  const bottom = ticks[0];
  const yAt = (v) => padT + (1 - (v - bottom) / (top - bottom)) * (h - padT - padB);
  const zeroY = yAt(0);
  const slot = (w - padL - padR) / bars.length;
  const bw = Math.min(slot * 0.62, 64);
  const color = opts.color || PALETTE[0];
  const grid = ticks.map((t) => {
    const y = yAt(t);
    return '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y.toFixed(1) +
      '" stroke="#e3ddd2" stroke-width="1"/>' +
      '<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#6b6558">' +
      fmtTick(t) + '</text>';
  }).join('');
  const rects = bars.map((b, i) => {
    const x = padL + slot * i + (slot - bw) / 2;
    const y = yAt(b.value);
    const topY = Math.min(y, zeroY);
    const height = Math.max(Math.abs(zeroY - y), 1);
    const fill = b.color || (i % 2 === 0 ? color : PALETTE[3]);
    const labelY = b.value >= 0 ? topY - 6 : y + 16;
    return '<rect x="' + x.toFixed(1) + '" y="' + topY.toFixed(1) + '" width="' + bw.toFixed(1) +
      '" height="' + height.toFixed(1) + '" rx="3" fill="' + fill + '"/>' +
      '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + labelY.toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="600" fill="#12355b">' +
      (opts.valueLabel ? opts.valueLabel(b.value) : b.value) + '</text>' +
      '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (h - padB + 16) + '" text-anchor="middle" font-size="11" fill="#6b6558">' +
      b.label + '</text>' +
      (b.sub ? '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (h - padB + 32) + '" text-anchor="middle" font-size="10" fill="#8a8478">' + b.sub + '</text>' : '');
  }).join('');
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (opts.aria || 'Bar chart') +
    '" class="chart-svg">' + grid + rects + '</svg>';
}

// A horizontal share bar (100% stacked or single shares list).
export function shareRows(rows, opts = {}) {
  const color = opts.color || PALETTE[0];
  return rows.map((r, i) => {
    const pct = Math.max(r.share, 0);
    const fill = r.color || PALETTE[i % PALETTE.length];
    return '<div class="share-row">' +
      '<div class="share-label">' + r.label + '</div>' +
      '<div class="share-track"><div class="share-fill" style="width:' + pct.toFixed(1) + '%;background:' + fill + '"></div></div>' +
      '<div class="share-value">' + pct.toFixed(1) + '%</div></div>';
  }).join('');
}
