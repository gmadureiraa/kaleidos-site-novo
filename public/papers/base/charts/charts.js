/* =========================================================================
   KALEIDOS PAPER Vol.04 — Base (Coinbase L2)
   charts.js — configs Chart.js dark prontas (new Chart(ctx, config))
   Paleta: dark surface #101010 · light ink #F4F1EC · rosa Kaleidos #d262b2
   accent secundário: azul Base #4d8cff (uso parcimonioso, prova de marca)
   neutros #A89F90 / #C9C2B6 / #8d877c (concorrentes / contexto)
   Fonte de dados: research/RESEARCH-BASE.md (DefiLlama, Messari, The Block, a16z).
   ========================================================================= */

(function (global) {
  const K = {
    cream:   '#101010',
    ink:     '#F4F1EC',
    pink:    '#d262b2',
    pinkSoft:'rgba(210, 98, 178, 0.20)',
    pinkLine:'rgba(210, 98, 178, 1)',
    blue:    '#4d8cff',
    blueSoft:'rgba(77, 140, 255, 0.20)',
    neutral: '#A89F90',
    neutral2:'#C9C2B6',
    neutral3:'#8d877c',
    green:   '#7CF067',
    grid:    'rgba(244, 241, 236, 0.10)',
    sans:    "'Inter', system-ui, -apple-system, sans-serif",
    mono:    "'Gridlite', 'SFMono-Regular', monospace",
  };

  if (global.Chart) {
    global.Chart.defaults.font.family = K.sans;
    global.Chart.defaults.font.size = 12;
    global.Chart.defaults.color = K.ink;
  }

  const noLegend = { display: false };

  /* 1) chartTVL — LINHA/ÁREA — TVL da Base (US$ bi). DefiLlama. */
  const chartTVL = {
    type: 'line',
    data: {
      labels: ['Ago/23','Set/23','Jun/24','Out/24','Dez/24','Mai/25','Out/25','Jun/26'],
      datasets: [{
        label: 'TVL Base (US$ bi)',
        data: [0.05, 0.38, 1.62, 2.49, 3.54, 4.2, 5.58, 11.0],
        borderColor: K.pinkLine, backgroundColor: K.pinkSoft,
        borderWidth: 2.5, fill: true, tension: 0.32,
        pointRadius: 3, pointHoverRadius: 5,
        pointBackgroundColor: K.pink, pointBorderColor: K.cream, pointBorderWidth: 1.5,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: noLegend, tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y.toFixed(2)} bi` } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, maxRotation: 0, autoSkip: true } },
        y: { grid: { color: K.grid }, beginAtZero: true, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'bi' } },
      },
    },
  };

  /* 2) chartShare — DOUGHNUT — Market share L2 por TVL (mid-2026). DefiLlama/BlockEden. */
  const chartShare = {
    type: 'doughnut',
    data: {
      labels: ['Arbitrum','Base','OP Mainnet','Outros L2'],
      datasets: [{
        label: 'Share L2 por TVL (%)',
        data: [42, 29, 15, 14],
        backgroundColor: [K.neutral, K.pink, K.neutral3, '#E1DACE'],
        borderColor: K.cream, borderWidth: 2, hoverOffset: 6,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '58%',
      plugins: {
        legend: { position: 'right', labels: { font: { family: K.sans, size: 11 }, color: K.ink, boxWidth: 12, padding: 10 } },
        tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed}%` } },
      },
    },
  };

  /* 3) chartTx — BARRA — Tx diárias / endereços ativos (marcos). The Block / a16z. */
  const chartTx = {
    type: 'bar',
    data: {
      labels: ['Ago/23','Jun/24','Jan/25','Mid/26'],
      datasets: [{
        label: 'Tx diárias (milhões)',
        data: [1.4, 4.5, 12.0, 8.5],
        backgroundColor: [K.neutral, K.neutral2, K.pink, K.pinkLine],
        hoverBackgroundColor: K.pinkLine,
        borderRadius: 6, borderSkipped: false, maxBarThickness: 56,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: noLegend, tooltip: { callbacks: { label: (c) => ` ${c.parsed.y}M tx/dia (pico)` } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 } } },
        y: { grid: { color: K.grid }, beginAtZero: true, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => v + 'M' } },
      },
    },
  };

  /* 4) chartMoat — BARRA HORIZONTAL — A vantagem injusta de distribuição. CoinLaw. */
  const chartMoat = {
    type: 'bar',
    data: {
      labels: ['Coinbase (verificados)','Base (endereços ativos 2024)','Onchain Summer 2023 (wallets)'],
      datasets: [{
        label: 'Usuários (milhões)',
        data: [110, 22, 0.27],
        backgroundColor: [K.blue, K.pink, K.neutral2],
        hoverBackgroundColor: [K.blue, K.pinkLine, K.neutral2],
        borderRadius: 6, borderSkipped: false, maxBarThickness: 34,
      }],
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: noLegend, tooltip: { callbacks: { label: (c) => ` ${c.parsed.x}M` } } },
      scales: {
        x: { grid: { color: K.grid }, beginAtZero: true, type: 'logarithmic', ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => v + 'M' } },
        y: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 11 } } },
      },
    },
  };

  /* 5) chartHype — BARRA — Curvas de hype que colapsaram (% queda do pico). research §D/E. */
  const chartHype = {
    type: 'bar',
    data: {
      labels: ['friend.tech','FRIEND token','$NORMIE','Content coin'],
      datasets: [{
        label: 'Queda do pico (%)',
        data: [-99, -98, -99, -90],
        backgroundColor: K.neutral,
        hoverBackgroundColor: K.neutral3,
        borderRadius: 6, borderSkipped: false, maxBarThickness: 56,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: noLegend, tooltip: { callbacks: { label: (c) => ` ${c.parsed.y}% do pico` } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 10 } } },
        y: { grid: { color: K.grid }, max: 0, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => v + '%' } },
      },
    },
  };

  /* 6) chartInfra — BARRA — Infra que compôs (durável) US$ bi. DefiLlama/Aerodrome. */
  const chartInfra = {
    type: 'bar',
    data: {
      labels: ['Aerodrome (vol. acum.)','Stablecoins na Base','TVL pico (out/25)'],
      datasets: [{
        label: 'US$ bi',
        data: [392.5, 4.9, 5.58],
        backgroundColor: [K.pink, K.blue, K.pinkLine],
        hoverBackgroundColor: [K.pinkLine, K.blue, K.pinkLine],
        borderRadius: 6, borderSkipped: false, maxBarThickness: 50,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: noLegend, tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y} bi` } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 9.5 } } },
        y: { grid: { color: K.grid }, type: 'logarithmic', ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'bi' } },
      },
    },
  };

  /* 7) chartRevenue — BARRA — Receita do sequencer da Base (US$ M). Fortune/Messari. */
  const chartRevenue = {
    type: 'bar',
    data: {
      labels: ['2023','H1 2025'],
      datasets: [{
        label: 'Receita sequencer (US$ M)',
        data: [56.1, 42.4],
        backgroundColor: K.pink, hoverBackgroundColor: K.pinkLine,
        borderRadius: 6, borderSkipped: false, maxBarThickness: 90,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: noLegend, tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y}M` } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 12 } } },
        y: { grid: { color: K.grid }, beginAtZero: true, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'M' } },
      },
    },
  };

  /* 8) chartSummer — BARRA — Onchain Summer builder growth. Base blog. */
  const chartSummer = {
    type: 'bar',
    data: {
      labels: ['OS 2023 (wallets, k)','OS 2024 (builders)','OS 2024 (projetos)'],
      datasets: [{
        label: 'Participação',
        data: [268, 7500, 1250],
        backgroundColor: [K.neutral2, K.pink, K.blue],
        hoverBackgroundColor: [K.neutral2, K.pinkLine, K.blue],
        borderRadius: 6, borderSkipped: false, maxBarThickness: 50,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: noLegend, tooltip: { callbacks: { label: (c) => ` ${c.parsed.y.toLocaleString('pt-BR')}` } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 9 } } },
        y: { grid: { color: K.grid }, type: 'logarithmic', ticks: { color: K.neutral3, font: { family: K.mono, size: 10 } } },
      },
    },
  };

  const KaleidosCharts = {
    chartTVL, chartShare, chartTx, chartMoat, chartHype, chartInfra, chartRevenue, chartSummer,
    palette: K,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = KaleidosCharts;
  global.KaleidosCharts = KaleidosCharts;
})(typeof window !== 'undefined' ? window : globalThis);
