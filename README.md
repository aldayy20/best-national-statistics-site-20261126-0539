# NusaStats — Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/aldayy20/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/aldayy20/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An original national statistics portal for Indonesia, built for the make.fun
"Make the best national statistics site" bounty. Static files only, no network
at runtime, works on desktop and on a phone.

## What it is

NusaStats gathers Indonesia's headline statistics in one place: population,
the economy, prices and inflation, employment, health and education, and a
comparison of all 38 provinces. Every figure is a rounded, published figure
labelled with its source (BPS — Statistics Indonesia, or the World Bank) and
its year, so anyone can check it against the original release.

## Pages

- **Home** — key-indicator cards with a year selector (2020–2024) and a GDP
  growth chart with a line/bar toggle.
- **Population** — population trend, age structure, density and urban share.
- **Economy** — GDP growth and per-capita figures, what makes up GDP, output
  by sector, and trade.
- **Prices** — inflation trend and price rises by CPI group.
- **Employment** — unemployment trend, jobs at a glance, poverty trend.
- **Health & Education** — HDI trend, literacy, schooling, health indicators.
- **Regions** — all 38 provinces in a searchable, sortable table, plus a chart
  of the five largest provinces.
- **Sources** — where every figure comes from and how figures are shown.

## How it works

Hash routing (`#/` … `#/regions`), hand-rolled SVG charts in `app/charts.js`,
data in `app/data.js`, page templates in `app/views.js`, routing and controls
in `app/app.js`. No libraries, no build step, no network requests: every
script, stylesheet and figure is a file under `app/`.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
`vendor/makefun-frontend.ts` library.

## License

MIT — see `LICENSE`.
