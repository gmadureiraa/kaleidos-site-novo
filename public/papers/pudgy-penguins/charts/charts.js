/* =========================================================================
   KALEIDOS PAPER Vol.02 — Pudgy Penguins
   charts.js — configs Chart.js prontas (new Chart(ctx, config))
   -------------------------------------------------------------------------
   Paleta Kaleidos:
     fundo creme   #F4F1EC
     tinta         #111111
     rosa accent   #d262b2  (sempre destaque do Pudgy)
     neutros       #C9C2B6 / #A89F90 / #6B655B  (concorrentes / contexto)
     verde 2ndary  #7CF067  (uso parcimonioso)
   Fonte de dados: research/RESEARCH-PUDGY.md (§5 séries) + enriquecimento
   WebSearch (NFTPriceFloor, CoinGecko/CoinLore, CoinDesk Research). Ver
   charts/DADOS.md pra fonte + nota real/interpolado por gráfico.
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

  // helper: legendas
  const noLegend = { display: false };

  /* =======================================================================
     1) chartFloor — LINHA/ÁREA — Floor price do NFT (ETH) ao longo do tempo
     FONTE: research §5 (Wikipedia, PANews, Decrypt, NFTPriceFloor, CoinDesk)
     + WebSearch NFTPriceFloor/Cryptopolitan. A virada Netz (abr/22) marcada.
     Pontos âncora reais; meses intermediários interpolados (ver DADOS.md).
     ===================================================================== */
  const chartFloor = {
    type: 'line',
    data: {
      labels: ['Mint jul/21','Pós-mint','Fim/21','Mar/22 ATH','Compra Netz abr/22',
               'Fim/22','2023','Fev/24 ATH','Dez/24','Pico/25','Crash/25','Jun/26'],
      datasets: [{
        label: 'Floor Pudgy Penguins (ETH)',
        data: [0.03, 2.4, 0.5, 3.15, 1.0, 4.0, 5.5, 20.5, 18.0, 36.0, 18.0, 5.0],
        borderColor: K.pinkLine,
        backgroundColor: K.pinkSoft,
        borderWidth: 2.5,
        fill: true,
        tension: 0.3,
        pointRadius: 3.5,
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
        tooltip: { callbacks: { label: (c) => ` ${c.parsed.y} ETH` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 9 }, maxRotation: 45, autoSkip: false } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => v + ' ETH' },
        },
      },
    },
  };

  /* =======================================================================
     2) chartPengu — LINHA/ÁREA — PENGU market cap (US$ bi) ao longo do tempo
     FONTE: research §4/§5 (CoinDesk, Decrypt) + WebSearch CoinGecko/CoinLore.
     Debut $2,3B (pico $2,7B) -> rally jul/25 (~$4B) -> crash -> ~$424M jun/26.
     ===================================================================== */
  const chartPengu = {
    type: 'line',
    data: {
      labels: ['Debut dez/24','Jan/25','Abr/25 fundo','Jul/25 pico','Out/25 crash','Dez/25','Jun/26'],
      datasets: [{
        label: 'PENGU market cap (US$ bi)',
        data: [2.30, 4.10, 0.34, 4.00, 1.50, 0.80, 0.424],
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
        tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y.toFixed(2)} bi mcap` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 9 }, maxRotation: 30, autoSkip: false } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'bi' },
        },
      },
    },
  };

  /* =======================================================================
     3) chartGiphy — BARRA — Views GIPHY (bilhões): Pudgy vs marcas Web2
     FONTE: research §3 tabela GIPHY (CoinDesk Research, primária).
     Pudgy 65,1B > Disney 23,3 + Pokémon 10,8 + Hello Kitty 7,4 SOMADOS.
     ===================================================================== */
  const chartGiphy = {
    type: 'bar',
    data: {
      labels: ['Pudgy Penguins','Disney','Pokémon','Hello Kitty'],
      datasets: [{
        label: 'Views GIPHY (bilhões)',
        data: [65.1, 23.3, 10.8, 7.4],
        backgroundColor: [K.pink, K.neutral2, K.neutral, K.neutral3],
        hoverBackgroundColor: [K.pinkLine, K.neutral2, K.neutral, K.neutral3],
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 64,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ` ${c.parsed.y} bi views` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 12 } } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => v + 'bi' },
        },
      },
    },
  };

  /* =======================================================================
     4) chartToys — BARRA HORIZONTAL — Alcance de varejo dos brinquedos (nº de lojas)
     FONTE: research §2 (Decrypt, The Defiant/PRNewswire, CoinDesk Research).
     Walmart 3.100 + Walgreens 2.000 + Target + Amazon. >1,5M unidades vendidas.
     Target/Amazon não têm nº de lojas público -> barra de "alcance" qualitativa.
     ===================================================================== */
  const chartToys = {
    type: 'bar',
    data: {
      labels: ['Walmart','Walgreens','Target','Amazon'],
      datasets: [{
        label: 'Lojas físicas com Pudgy Toys',
        data: [3100, 2000, null, null],
        backgroundColor: [K.pink, '#E89AD0', K.neutral2, K.neutral2],
        hoverBackgroundColor: [K.pinkLine, '#E89AD0', K.neutral, K.neutral],
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 38,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: {
          callbacks: {
            label: (c) => c.parsed.x == null
              ? ' Presente (nº de lojas não divulgado)'
              : ` ${c.parsed.x.toLocaleString('pt-BR')} lojas`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => v.toLocaleString('pt-BR') },
        },
        y: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 12 } } },
      },
    },
  };

  /* =======================================================================
     5) chartReceita — BARRA — Receita da marca (US$ mi): real -> guidance
     FONTE: research §5 (Gate News, CoinDesk Research, Bloomingbit).
     2023 $10M -> 2024 >$13M varejo / >$50M marca -> guidance $60M(25)/$120M(26).
     Guidance (não realizado) em rosa-claro hachurado conceitual via cor soft.
     ===================================================================== */
  const chartReceita = {
    type: 'bar',
    data: {
      labels: ['2023','2024','>$50M marca','Guidance 2025','Guidance 2026'],
      datasets: [{
        label: 'Receita (US$ mi)',
        data: [10, 13, 50, 60, 120],
        backgroundColor: [K.neutral, K.neutral, K.pink, '#E89AD0', '#EBB6DD'],
        hoverBackgroundColor: [K.neutral3, K.neutral3, K.pinkLine, '#E89AD0', '#EBB6DD'],
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
        tooltip: {
          callbacks: {
            label: (c) => c.dataIndex >= 3
              ? ` US$ ${c.parsed.y} mi (guidance/meta)`
              : ` US$ ${c.parsed.y} mi`,
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 11 } } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'mi' },
        },
      },
    },
  };

  // ---- Export ------------------------------------------------------------
  const KaleidosCharts = {
    chartFloor, chartPengu, chartGiphy, chartToys, chartReceita,
    palette: K,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = KaleidosCharts;
  global.KaleidosCharts = KaleidosCharts;
})(typeof window !== 'undefined' ? window : globalThis);
