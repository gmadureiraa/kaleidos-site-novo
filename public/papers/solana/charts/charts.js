/* =========================================================================
   KALEIDOS PAPER Vol.03 — Solana
   charts.js — configs Chart.js prontas (new Chart(ctx, config))
   -------------------------------------------------------------------------
   Paleta Kaleidos + accent Solana:
     fundo creme    #F4F1EC
     tinta          #111111
     rosa Kaleidos  #d262b2  (cor da MARCA)
     roxo Solana    #9945FF  (accent do projeto — destaque principal)
     verde Solana   #14F195  (accent secundário)
     neutros        #C9C2B6 / #A89F90 / #6B655B  (contexto / concorrentes)
   Fonte de dados: research/RESEARCH-SOLANA.md seções H/I/E/F/D/J. Ver DADOS.md.
   ========================================================================= */

(function (global) {
  const K = {
    cream:   '#F4F1EC',
    ink:     '#111111',
    pink:    '#d262b2',
    purple:  '#9945FF',
    purpleSoft:'rgba(153, 69, 255, 0.16)',
    purpleLine:'rgba(153, 69, 255, 1)',
    green:   '#14F195',
    greenLine:'rgba(20, 241, 149, 1)',
    neutral: '#A89F90',
    neutral2:'#C9C2B6',
    neutral3:'#6B655B',
    grid:    'rgba(17, 17, 17, 0.08)',
    serif:   "'Fraunces', 'Playfair Display', Georgia, serif",
    sans:    "'Inter', system-ui, -apple-system, sans-serif",
    mono:    "'IBM Plex Mono', 'SFMono-Regular', monospace",
  };

  if (global.Chart) {
    global.Chart.defaults.font.family = K.sans;
    global.Chart.defaults.font.size = 12;
    global.Chart.defaults.color = K.ink;
  }

  const noLegend = { display: false };

  /* =======================================================================
     1) chartPreco — LINHA — Preço SOL (USD): o arco queda/volta/correção
     FONTE: MEXC/CoinShares (fundo ~8, topo 2021 ~260), CoinDesk (topo ~295
     jan/25). Meses intermediários interpolados (marcados em DADOS.md).
     ===================================================================== */
  const chartPreco = {
    type: 'line',
    data: {
      labels: ['Nov/21','Nov/22','Dez/22','Jun/23','Dez/23','Jun/24','Dez/24',
               'Jan/25','Ago/25','Dez/25','Jun/26'],
      datasets: [{
        label: 'Preço SOL (USD)',
        data: [260, 13, 9, 18, 100, 145, 195, 295, 200, 130, 110],
        borderColor: K.purpleLine,
        backgroundColor: K.purpleSoft,
        borderWidth: 2.5,
        fill: true,
        tension: 0.32,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: K.purple,
        pointBorderColor: K.cream,
        pointBorderWidth: 1.5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ' US$ ' + c.parsed.y } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, maxRotation: 0, autoSkip: true } },
        y: { grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v } },
      },
    },
  };

  /* =======================================================================
     2) chartDevs — BARRA — Novos desenvolvedores 2024 (Electric Capital)
     FONTE: Electric Capital via CoinDesk/Blockworks. Solana 7.625 vs ETH 6.456.
     ===================================================================== */
  const chartDevs = {
    type: 'bar',
    data: {
      labels: ['Solana','Ethereum','Base','Outros (top)'],
      datasets: [{
        label: 'Novos devs 2024',
        data: [7625, 6456, 2247, 1500],
        backgroundColor: [K.purple, K.neutral, K.neutral2, '#E1DACE'],
        hoverBackgroundColor: [K.purpleLine, K.neutral3, K.neutral, '#E1DACE'],
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 70,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ' ' + c.parsed.y.toLocaleString('pt-BR') + ' novos devs' } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 11 } } },
        y: { grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => (v/1000) + 'k' } },
      },
    },
  };

  /* =======================================================================
     3) chartTVL — LINHA/ÁREA — TVL Solana (US$ bi)
     FONTE: DefiLlama / BYDFi / CoinDesk. Fundo ~0,2 → 10 bi jan/25 →
     pico >11,5 ago/25 → ~5,5 mid-2026.
     ===================================================================== */
  const chartTVL = {
    type: 'line',
    data: {
      labels: ['Dez/22','Dez/23','Jun/24','Jan/25','Ago/25','Dez/25','Jun/26'],
      datasets: [{
        label: 'TVL (US$ bi)',
        data: [0.2, 1.4, 4.5, 10.0, 11.5, 8.0, 5.5],
        borderColor: K.greenLine,
        backgroundColor: 'rgba(20, 241, 149, 0.14)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: K.green,
        pointBorderColor: K.ink,
        pointBorderWidth: 1.2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ' US$ ' + c.parsed.y.toFixed(1) + ' bi' } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 } } },
        y: { grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'bi' } },
      },
    },
  };

  /* =======================================================================
     4) chartBreakpoint — BARRA — Participantes do Breakpoint
     FONTE: Solana Compass / Solana. 2023 ~3.000 → 2024 6.000+.
     ===================================================================== */
  const chartBreakpoint = {
    type: 'bar',
    data: {
      labels: ['2023 · Amsterdam','2024 · Singapura'],
      datasets: [{
        label: 'Participantes',
        data: [3000, 6000],
        backgroundColor: [K.neutral, K.purple],
        hoverBackgroundColor: [K.neutral3, K.purpleLine],
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
        tooltip: { callbacks: { label: (c) => ' ' + c.parsed.y.toLocaleString('pt-BR') + '+ participantes' } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 11 } } },
        y: { grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => (v/1000) + 'k' } },
      },
    },
  };

  /* =======================================================================
     5) chartPerdas — BARRA — TRUMP + LIBRA: o asterisco (US$ bi de perda)
     FONTE: FXStreet (3,94 bi total), Nansen/The Block (LIBRA 251 mi).
     Aqui mostramos a perda total agregada vs LIBRA isolado.
     ===================================================================== */
  const chartPerdas = {
    type: 'bar',
    data: {
      labels: ['TRUMP + LIBRA (total)','LIBRA (isolado)'],
      datasets: [{
        label: 'Perda de quem comprou (US$ bi)',
        data: [3.94, 0.251],
        backgroundColor: ['#7a1f1f', '#b94a4a'],
        hoverBackgroundColor: ['#5e1414', '#a13c3c'],
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 84,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ' US$ ' + c.parsed.y + ' bi de perda' } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 11 } } },
        y: { grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'bi' } },
      },
    },
  };

  /* =======================================================================
     6) chartShareDevs — DOUGHNUT — Share de novos devs 2024 (%)
     FONTE: Electric Capital. Solana 19,5% do total global de novos devs.
     ===================================================================== */
  const chartShareDevs = {
    type: 'doughnut',
    data: {
      labels: ['Solana 19,5%','Ethereum 16,5%','Outros ecossistemas 64%'],
      datasets: [{
        label: 'Share de novos devs 2024',
        data: [19.5, 16.5, 64],
        backgroundColor: [K.purple, K.neutral, '#E1DACE'],
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
        tooltip: { callbacks: { label: (c) => ' ' + c.label } },
      },
    },
  };

  const KaleidosCharts = {
    chartPreco, chartDevs, chartTVL, chartBreakpoint, chartPerdas, chartShareDevs,
    palette: K,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = KaleidosCharts;
  global.KaleidosCharts = KaleidosCharts;
})(typeof window !== 'undefined' ? window : globalThis);
