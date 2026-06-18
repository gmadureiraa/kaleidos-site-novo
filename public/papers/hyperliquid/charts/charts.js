/* =========================================================================
   KALEIDOS PAPER Vol.01 — Hyperliquid
   charts.js — configs Chart.js prontas (new Chart(ctx, config))
   -------------------------------------------------------------------------
   Paleta Kaleidos:
     fundo creme   #F4F1EC
     tinta         #111111
     rosa accent   #d262b2  (sempre destaque do Hyperliquid)
     neutros       #C9C2B6 / #A89F90 / #6B655B  (concorrentes / contexto)
     verde 2ndary  #7CF067  (uso parcimonioso)
   Fonte de dados: research/RESEARCH-HYPERLIQUID.md seção D + enriquecimento
   WebSearch (CoinLore/CoinGecko/CoinMarketCap). Ver charts/DADOS.md.
   ========================================================================= */

(function (global) {
  // ---- Tokens de marca ---------------------------------------------------
  const K = {
    cream:   '#F4F1EC',
    ink:     '#111111',
    pink:    '#d262b2',
    pinkSoft:'rgba(210, 98, 178, 0.16)',
    pinkLine:'rgba(210, 98, 178, 1)',
    neutral: '#A89F90',
    neutral2:'#C9C2B6',
    neutral3:'#6B655B',
    green:   '#7CF067',
    grid:    'rgba(17, 17, 17, 0.08)',
    serif:   "'Fraunces', 'Playfair Display', Georgia, serif",
    sans:    "'Inter', system-ui, -apple-system, sans-serif",
    mono:    "'IBM Plex Mono', 'SFMono-Regular', monospace",
  };

  // Defaults globais (aplicados se Chart existir no escopo)
  if (global.Chart) {
    global.Chart.defaults.font.family = K.sans;
    global.Chart.defaults.font.size = 12;
    global.Chart.defaults.color = K.ink;
  }

  // helper: tooltip/legenda limpos
  const baseLegend = {
    display: true,
    labels: { font: { family: K.sans, size: 12 }, color: K.ink, boxWidth: 12, padding: 14 },
  };
  const noLegend = { display: false };

  /* =======================================================================
     1) chartPreco — LINHA — Preço HYPE (USD) ao longo do tempo
     FONTE: research (marcos nov/24, dez/24, set/25, jun/26) + WebSearch
     CoinLore/CoinGecko/CoinMarketCap (jan–dez/25). Interpolados marcados em DADOS.md.
     ===================================================================== */
  const chartPreco = {
    type: 'line',
    data: {
      labels: ['Nov/24','Dez/24','Jan/25','Fev/25','Mar/25','Abr/25','Mai/25',
               'Jun/25','Jul/25','Ago/25','Set/25','Out/25','Nov/25','Dez/25','Mar/26','Jun/26'],
      datasets: [{
        label: 'Preço HYPE (USD)',
        data: [3.90, 35.03, 20.24, 24.00, 12.34, 10.21, 25.00,
               45.57, 49.75, 50.99, 59.39, 50.00, 40.00, 31.00, 50.00, 75.51],
        borderColor: K.pinkLine,
        backgroundColor: K.pinkSoft,
        borderWidth: 2.5,
        fill: true,
        tension: 0.32,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: K.pink,
        pointBorderColor: K.cream,
        pointBorderWidth: 1.5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y.toFixed(2)}` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, maxRotation: 0, autoSkip: true } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v },
        },
      },
    },
  };

  /* =======================================================================
     2) chartTVL — LINHA/ÁREA — TVL mensal (US$ bi)
     FONTE: research seção D (marcos + interpolados ~). DefiLlama.
     ===================================================================== */
  const chartTVL = {
    type: 'line',
    data: {
      labels: ['Nov/24','Dez/24','Mai/25','Jul/25','Dez/25','Jun/26'],
      datasets: [{
        label: 'TVL (US$ bi)',
        data: [0.56, 2.0, 3.2, 5.0, 6.0, 5.87],
        borderColor: K.pinkLine,
        backgroundColor: K.pinkSoft,
        borderWidth: 2.5,
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: K.pink,
        pointBorderColor: K.cream,
        pointBorderWidth: 1.5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y.toFixed(2)} bi` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 } } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'bi' },
        },
      },
    },
  };

  /* =======================================================================
     3) chartVolume — BARRA — Volume perp mensal (US$ bi)
     FONTE: research seção D. DefiLlama / The Block.
     ===================================================================== */
  const chartVolume = {
    type: 'bar',
    data: {
      labels: ['Nov/24','Jan/25','Mai/25','Ago/25','Q1/26','Jun/26 (30d)'],
      datasets: [{
        label: 'Volume perp (US$ bi)',
        data: [46, 200, 244, 400, 207, 220],
        backgroundColor: K.pink,
        hoverBackgroundColor: K.pinkLine,
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 56,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y} bi` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 } } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'bi' },
        },
      },
    },
  };

  /* =======================================================================
     4) chartShare — DOUGHNUT — Market share perp DEX (%) jun/26
     FONTE: research seção D. Hyperliquid em rosa, resto neutro.
     ⚠️ Faixa publicada 32-70%; aqui ~57% (vol 30d entre principais DEXs).
     ===================================================================== */
  const chartShare = {
    type: 'doughnut',
    data: {
      labels: ['Hyperliquid','Aster','edgeX','ApeX','Jupiter','dYdX','GMX','Outros'],
      datasets: [{
        label: 'Market share (%)',
        data: [57, 14.7, 11.6, 11.6, 1.6, 0.9, 0.7, 1.9],
        backgroundColor: [
          K.pink, '#B7AE9F', '#A89F90', '#978D7D',
          '#857C6C', '#746B5B', '#C9C2B6', '#E1DACE',
        ],
        borderColor: K.cream,
        borderWidth: 2,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '58%',
      plugins: {
        legend: { position: 'right', labels: { font: { family: K.sans, size: 11 }, color: K.ink, boxWidth: 12, padding: 10 } },
        tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed}%` } },
      },
    },
  };

  /* =======================================================================
     5) chartReceita — BARRA HORIZONTAL — Ranking receita 2025 (US$ bi)
     FONTE: research seção D. Hyperliquid em rosa, resto neutro.
     ===================================================================== */
  const chartReceita = {
    type: 'bar',
    data: {
      labels: ['Tether','TRON','Circle','Hyperliquid','Pump.fun'],
      datasets: [{
        label: 'Receita 2025 (US$ bi)',
        data: [5.2, 3.5, 2.0, 1.1, 0.7],
        backgroundColor: [K.neutral2, K.neutral, K.neutral3, K.pink, '#E1DACE'],
        hoverBackgroundColor: [K.neutral2, K.neutral, K.neutral3, K.pinkLine, '#E1DACE'],
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 34,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.x} bi` } },
      },
      scales: {
        x: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'bi' },
        },
        y: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 12 } } },
      },
    },
  };

  /* =======================================================================
     6) chartBuyback — BARRA — Buyback acumulado (US$ bi)
     FONTE: research seção A/D. crypto.news / DL News.
     ===================================================================== */
  const chartBuyback = {
    type: 'bar',
    data: {
      labels: ['2025','Acum. mai/26'],
      datasets: [{
        label: 'Buyback HYPE (US$ bi)',
        data: [0.716, 1.3],
        backgroundColor: K.pink,
        hoverBackgroundColor: K.pinkLine,
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 90,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y.toFixed(3)} bi` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 12 } } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'bi' },
        },
      },
    },
  };

  /* =======================================================================
     7) chartVsBinance — BARRA — % do volume da Binance (nov/24 vs mai/25)
     FONTE: research seção B. 2% -> ~10% (5x em 6 meses).
     ===================================================================== */
  const chartVsBinance = {
    type: 'bar',
    data: {
      labels: ['Nov/24','Mai/25'],
      datasets: [{
        label: '% do volume da Binance',
        data: [2, 10],
        backgroundColor: [K.neutral, K.pink],
        hoverBackgroundColor: [K.neutral3, K.pinkLine],
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 90,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ` ${c.parsed.y}% do volume da Binance` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 12 } } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => v + '%' },
        },
      },
    },
  };

  /* =======================================================================
     8) chartUsuarios — BARRA — Usuários (milhões, 2024 vs 2025)
     FONTE: research seção B. ~300k -> 1,4M (~4x YoY).
     ===================================================================== */
  const chartUsuarios = {
    type: 'bar',
    data: {
      labels: ['Fim 2024','Fim 2025'],
      datasets: [{
        label: 'Usuários (milhões)',
        data: [0.3, 1.4],
        backgroundColor: [K.neutral, K.pink],
        hoverBackgroundColor: [K.neutral3, K.pinkLine],
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 90,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ` ${c.parsed.y.toFixed(1)}M usuários` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 12 } } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => v + 'M' },
        },
      },
    },
  };

  /* =======================================================================
     9) chartSupply — DOUGHNUT — Distribuição do supply (%)
     FONTE: research seção A. ~70% comunidade vs 23,8% team. tokenomist.ai/OKX.
     ===================================================================== */
  const chartSupply = {
    type: 'doughnut',
    data: {
      labels: ['Future / Community 38,9%','Airdrop (Genesis) 31%','Team 23,8%','Foundation 6%','Outros 0,3%'],
      datasets: [{
        label: 'Supply (%)',
        data: [38.9, 31, 23.8, 6, 0.3],
        backgroundColor: [K.pink, '#E89AD0', K.neutral, K.neutral3, '#E1DACE'],
        borderColor: K.cream,
        borderWidth: 2,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '58%',
      plugins: {
        legend: { position: 'right', labels: { font: { family: K.sans, size: 11 }, color: K.ink, boxWidth: 12, padding: 10 } },
        tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed}%` } },
      },
    },
  };

  // ---- Export ------------------------------------------------------------
  const KaleidosCharts = {
    chartPreco, chartTVL, chartVolume, chartShare,
    chartReceita, chartBuyback, chartVsBinance, chartUsuarios, chartSupply,
    palette: K,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = KaleidosCharts;
  global.KaleidosCharts = KaleidosCharts;
})(typeof window !== 'undefined' ? window : globalThis);
