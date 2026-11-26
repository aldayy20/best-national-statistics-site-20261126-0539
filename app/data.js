// NusaStats data layer — every figure is a rounded, published figure with its
// source and year. Figures come from public releases of BPS (Statistics
// Indonesia) and the World Bank; nothing here is invented, and any value we
// could not pin to a release is rounded and marked as approximate.
export const SOURCES = {
  bps: 'BPS — Statistics Indonesia',
  wb: 'World Bank',
  bpsSusenas: 'BPS — National Socio-Economic Survey (Susenas)',
};

export const YEARS = [2020, 2021, 2022, 2023, 2024];

// Headline indicators, one value per year. Values are rounded published
// figures; see the Sources page for the exact release each one comes from.
export const INDICATORS = {
  population: {
    label: 'Population',
    unit: 'million people',
    format: (v) => v.toFixed(1) + ' m',
    source: SOURCES.bps,
    note: 'Mid-year population estimate.',
    values: { 2020: 270.2, 2021: 272.7, 2022: 275.8, 2023: 278.7, 2024: 281.6 },
  },
  gdpGrowth: {
    label: 'GDP growth',
    unit: '% year on year',
    format: (v) => v.toFixed(2) + '%',
    source: SOURCES.bps,
    note: 'Real GDP growth at constant 2010 prices.',
    values: { 2020: -2.07, 2021: 3.7, 2022: 5.31, 2023: 5.05, 2024: 5.03 },
  },
  gdpPerCapita: {
    label: 'GDP per capita',
    unit: 'US dollars',
    format: (v) => '$' + v.toLocaleString('en-US'),
    source: SOURCES.wb,
    note: 'Nominal GDP per capita, current US$.',
    values: { 2020: 3869, 2021: 4349, 2022: 4798, 2023: 4876, 2024: 4900 },
  },
  inflation: {
    label: 'Inflation (CPI)',
    unit: '% year on year',
    format: (v) => v.toFixed(2) + '%',
    source: SOURCES.bps,
    note: 'Consumer price index, December year on year.',
    values: { 2020: 1.68, 2021: 1.87, 2022: 5.51, 2023: 2.61, 2024: 1.57 },
  },
  unemployment: {
    label: 'Unemployment rate',
    unit: '% of labour force',
    format: (v) => v.toFixed(2) + '%',
    source: SOURCES.bps,
    note: 'Open unemployment rate, August survey.',
    values: { 2020: 7.07, 2021: 6.49, 2022: 5.86, 2023: 5.32, 2024: 4.91 },
  },
  poverty: {
    label: 'Poverty rate',
    unit: '% of population',
    format: (v) => v.toFixed(2) + '%',
    source: SOURCES.bps,
    note: 'Share of population below the poverty line, March.',
    values: { 2020: 10.19, 2021: 9.71, 2022: 9.54, 2023: 9.36, 2024: 9.03 },
  },
  lifeExpectancy: {
    label: 'Life expectancy',
    unit: 'years at birth',
    format: (v) => v.toFixed(1) + ' yrs',
    source: SOURCES.bps,
    note: 'Life expectancy at birth, both sexes.',
    values: { 2020: 71.5, 2021: 71.6, 2022: 71.9, 2023: 73.9, 2024: 74.0 },
  },
  hdi: {
    label: 'Human Development Index',
    unit: 'index (0–100)',
    format: (v) => v.toFixed(2),
    source: SOURCES.bps,
    note: 'BPS Human Development Index.',
    values: { 2020: 71.94, 2021: 72.29, 2022: 73.37, 2023: 74.39, 2024: 75.02 },
  },
};

// Population by age group, 2024 (BPS population projection, rounded).
export const AGE_GROUPS = [
  { group: '0–14 years', share: 24.5, note: 'Children' },
  { group: '15–24 years', share: 16.9, note: 'Youth' },
  { group: '25–54 years', share: 42.8, note: 'Working age' },
  { group: '55–64 years', share: 9.6, note: 'Pre-retirement' },
  { group: '65+ years', share: 6.2, note: 'Older people' },
];

// Population density and urban share, 2024 (BPS, rounded).
export const DEMOGRAPHICS = [
  { label: 'Population density', value: '≈ 148 people / km²', source: SOURCES.bps, year: 2024 },
  { label: 'Urban population', value: '≈ 59% of total', source: SOURCES.wb, year: 2024 },
  { label: 'Median age', value: '≈ 30 years', source: SOURCES.bps, year: 2024 },
  { label: 'Annual population growth', value: '≈ 0.8% per year', source: SOURCES.bps, year: 2024 },
  { label: 'Fertility rate', value: '≈ 2.1 children per woman', source: SOURCES.bps, year: 2024 },
  { label: 'Provinces', value: '38 provinces', source: SOURCES.bps, year: 2024 },
];

// Economy: GDP by expenditure and by sector, 2024 shares (BPS, rounded).
export const GDP_SHARES = [
  { label: 'Household consumption', share: 54.0 },
  { label: 'Investment (gross fixed capital)', share: 29.0 },
  { label: 'Government consumption', share: 7.6 },
  { label: 'Exports minus imports', share: 5.6 },
  { label: 'Other (inventories, discrepancy)', share: 3.8 },
];

export const SECTOR_SHARES = [
  { label: 'Manufacturing', share: 18.7 },
  { label: 'Agriculture, forestry & fishing', share: 12.5 },
  { label: 'Wholesale & retail trade', share: 12.8 },
  { label: 'Mining & quarrying', share: 10.2 },
  { label: 'Construction', share: 9.9 },
  { label: 'Other services', share: 36.0 },
];

export const TRADE_2024 = [
  { label: 'Exports', value: '≈ US$ 265 bn', source: SOURCES.bps, year: 2024 },
  { label: 'Imports', value: '≈ US$ 234 bn', source: SOURCES.bps, year: 2024 },
  { label: 'Trade balance', value: '≈ US$ 31 bn surplus', source: SOURCES.bps, year: 2024 },
  { label: 'Top export: coal & mineral fuels', value: '≈ 20% of exports', source: SOURCES.bps, year: 2024 },
  { label: 'Top export: palm oil & products', value: '≈ 10% of exports', source: SOURCES.bps, year: 2024 },
  { label: 'Main export partners', value: 'China, United States, Japan', source: SOURCES.bps, year: 2024 },
];

// Prices: CPI by group, 2024 annual change (BPS, rounded).
export const CPI_GROUPS = [
  { label: 'Food, beverages & tobacco', change: 3.4 },
  { label: 'Housing, water & energy', change: 1.1 },
  { label: 'Transport', change: 0.8 },
  { label: 'Health', change: 1.9 },
  { label: 'Education', change: 1.7 },
  { label: 'Clothing & footwear', change: 0.6 },
  { label: 'Restaurants & accommodation', change: 2.2 },
  { label: 'Personal care & other services', change: 2.6 },
];

// Employment, 2024 (BPS August survey, rounded).
export const EMPLOYMENT = [
  { label: 'Labour force', value: '≈ 153 m people', source: SOURCES.bps, year: 2024 },
  { label: 'Employed', value: '≈ 145 m people', source: SOURCES.bps, year: 2024 },
  { label: 'Informal workers', value: '≈ 59% of employed', source: SOURCES.bps, year: 2024 },
  { label: 'Youth unemployment (15–24)', value: '≈ 16% of youth labour force', source: SOURCES.bps, year: 2024 },
  { label: 'Labour force participation', value: '≈ 70%', source: SOURCES.bps, year: 2024 },
  { label: 'Working in agriculture', value: '≈ 28% of employed', source: SOURCES.bps, year: 2024 },
];

// Health & education, 2023–2024 (BPS / Susenas, rounded).
export const HEALTH_EDU = [
  { label: 'Literacy rate (15+)', value: '≈ 96%', source: SOURCES.bpsSusenas, year: 2023 },
  { label: 'Mean years of schooling', value: '≈ 9.0 years', source: SOURCES.bps, year: 2024 },
  { label: 'Expected years of schooling', value: '≈ 13.2 years', source: SOURCES.bps, year: 2024 },
  { label: 'Infant mortality', value: '≈ 17 per 1,000 live births', source: SOURCES.bps, year: 2023 },
  { label: 'Stunting in children under 5', value: '≈ 21% of children', source: SOURCES.bps, year: 2023 },
  { label: 'Households with clean water access', value: '≈ 90%', source: SOURCES.bpsSusenas, year: 2023 },
  { label: 'Households with electricity', value: '≈ 99%', source: SOURCES.bps, year: 2023 },
  { label: 'Gini ratio (inequality)', value: '0.379', source: SOURCES.bps, year: 2024 },
];

// Provinces: 2024 population estimates (BPS, rounded to 0.1 m) and 2024
// poverty rate where published. Figures are rounded; see Sources page.
export const PROVINCES = [
  { name: 'West Java', pop: 49.9, poverty: 7.5, island: 'Java' },
  { name: 'East Java', pop: 41.8, poverty: 9.8, island: 'Java' },
  { name: 'Central Java', pop: 37.9, poverty: 10.5, island: 'Java' },
  { name: 'North Sumatra', pop: 15.6, poverty: 8.0, island: 'Sumatra' },
  { name: 'Banten', pop: 12.7, poverty: 5.6, island: 'Java' },
  { name: 'Jakarta', pop: 10.7, poverty: 4.3, island: 'Java' },
  { name: 'South Sulawesi', pop: 9.5, poverty: 8.5, island: 'Sulawesi' },
  { name: 'Lampung', pop: 9.4, poverty: 10.7, island: 'Sumatra' },
  { name: 'South Sumatra', pop: 9.0, poverty: 11.4, island: 'Sumatra' },
  { name: 'West Sumatra', pop: 6.0, poverty: 5.7, island: 'Sumatra' },
  { name: 'Riau', pop: 7.0, poverty: 6.4, island: 'Sumatra' },
  { name: 'East Kalimantan', pop: 4.0, poverty: 6.0, island: 'Kalimantan' },
  { name: 'South Kalimantan', pop: 4.3, poverty: 4.2, island: 'Kalimantan' },
  { name: 'West Kalimantan', pop: 5.8, poverty: 6.7, island: 'Kalimantan' },
  { name: 'Central Kalimantan', pop: 2.8, poverty: 5.0, island: 'Kalimantan' },
  { name: 'North Kalimantan', pop: 0.7, poverty: 6.7, island: 'Kalimantan' },
  { name: 'Aceh', pop: 5.6, poverty: 14.2, island: 'Sumatra' },
  { name: 'Jambi', pop: 3.7, poverty: 7.1, island: 'Sumatra' },
  { name: 'Bengkulu', pop: 2.1, poverty: 11.9, island: 'Sumatra' },
  { name: 'Riau Islands', pop: 2.3, poverty: 5.0, island: 'Sumatra' },
  { name: 'Bangka Belitung', pop: 1.5, poverty: 4.5, island: 'Sumatra' },
  { name: 'Yogyakarta', pop: 3.9, poverty: 10.5, island: 'Java' },
  { name: 'Bali', pop: 4.4, poverty: 3.7, island: 'Bali & Nusa Tenggara' },
  { name: 'West Nusa Tenggara', pop: 5.7, poverty: 12.7, island: 'Bali & Nusa Tenggara' },
  { name: 'East Nusa Tenggara', pop: 5.7, poverty: 19.1, island: 'Bali & Nusa Tenggara' },
  { name: 'North Sulawesi', pop: 2.7, poverty: 7.4, island: 'Sulawesi' },
  { name: 'Central Sulawesi', pop: 3.1, poverty: 11.7, island: 'Sulawesi' },
  { name: 'Southeast Sulawesi', pop: 2.8, poverty: 10.9, island: 'Sulawesi' },
  { name: 'Gorontalo', pop: 1.3, poverty: 14.6, island: 'Sulawesi' },
  { name: 'West Sulawesi', pop: 1.6, poverty: 10.7, island: 'Sulawesi' },
  { name: 'Maluku', pop: 2.0, poverty: 16.5, island: 'Maluku & Papua' },
  { name: 'North Maluku', pop: 1.4, poverty: 6.3, island: 'Maluku & Papua' },
  { name: 'Papua', pop: 1.1, poverty: 23.2, island: 'Maluku & Papua' },
  { name: 'West Papua', pop: 0.6, poverty: 21.1, island: 'Maluku & Papua' },
  { name: 'South Papua', pop: 0.5, poverty: 20.2, island: 'Maluku & Papua' },
  { name: 'Central Papua', pop: 1.4, poverty: 30.1, island: 'Maluku & Papua' },
  { name: 'Highland Papua', pop: 1.5, poverty: 32.4, island: 'Maluku & Papua' },
  { name: 'Southwest Papua', pop: 0.6, poverty: 19.4, island: 'Maluku & Papua' },
];
