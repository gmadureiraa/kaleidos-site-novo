/* =========================================================================
   KALEIDOS PAPER — Pump.fun
   charts.js — configs Chart.js (dark) prontas (new Chart(ctx, config))
   -------------------------------------------------------------------------
   Paleta DARK Kaleidos:
     surface dark  #101010   (card)
     tinta clara   #F4F1EC
     rosa accent   #d262b2   (destaque Pump.fun)
     verde 2ndary  #7CF067   (uso parcimonioso)
     neutros       #C9C2B6 / #A89F90 / #8d877c  (concorrentes / contexto)
   Fonte: research/RESEARCH-NUMBERS.md + RESEARCH-MARKETING.md + RESEARCH-STRESS.md.
   Ver charts/DADOS.md pra tabela de dados + fonte + confiança por gráfico.
   ========================================================================= */

(function (global) {
  const K = {
    cream:   '#101010',
    ink:     '#F4F1EC',
    pink:    '#d262b2',
    pinkSoft:'rgba(210, 98, 178, 0.20)',
    pinkLine:'rgba(210, 98, 178, 1)',
    neutral: '#A89F90',
    neutral2:'#C9C2B6',
    neutral3:'#8d877c',
    green:   '#7CF067',
    greenSoft:'rgba(124, 240, 103, 0.18)',
    ash:     '#5a564e',
    grid:    'rgba(244, 241, 236, 0.10)',
    serif:   "'Atelier', system-ui, sans-serif",
    sans:    "'Inter', system-ui, -apple-system, sans-serif",
    mono:    "'Gridlite', 'SFMono-Regular', monospace",
  };

  if (global.Chart) {
    global.Chart.defaults.font.family = K.sans;
    global.Chart.defaults.font.size = 12;
    global.Chart.defaults.color = K.ink;
  }

  const noLegend = { display: false };

  /* =======================================================================
     1) chartReceitaTri — LINHA/ÁREA — Receita trimestral (US$ M)
     FONTE: DefiLlama (fees=revenue), 10 trimestres Q1/24→Q2/26 (parcial).
     Pico Q1 2025 = $263,8M. Todos Real (Q2/26 parcial).
     ===================================================================== */
  const chartReceitaTri = {
    type: 'line',
    data: {
      labels: ['Q1 24','Q2 24','Q3 24','Q4 24','Q1 25','Q2 25','Q3 25','Q4 25','Q1 26','Q2 26*'],
      datasets: [{
        label: 'Receita (US$ M)',
        data: [2.44, 47.89, 63.53, 207.31, 263.81, 144.19, 110.49, 100.97, 108.29, 66.55],
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
        tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y.toFixed(1)} M` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, maxRotation: 0, autoSkip: false } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'M' },
        },
      },
    },
  };

  /* =======================================================================
     2) chartRevAcum — LINHA/ÁREA — Receita acumulada (US$ M) — $50M→$1B+
     FONTE: The Block (cruzou $50M fim/24), DefiLlama (lifetime $1,04B jun/26).
     Pontos = soma cumulativa da série trimestral (Real).
     ===================================================================== */
  const chartRevAcum = {
    type: 'line',
    data: {
      labels: ['Q1 24','Q2 24','Q3 24','Q4 24','Q1 25','Q2 25','Q3 25','Q4 25','Q1 26','Q2 26*'],
      datasets: [{
        label: 'Receita acumulada (US$ M)',
        data: [2.4, 50.3, 113.8, 321.1, 584.9, 729.1, 839.6, 940.6, 1048.9, 1115.4],
        borderColor: K.pinkLine,
        backgroundColor: K.pinkSoft,
        borderWidth: 2.5,
        fill: true,
        tension: 0.3,
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
        tooltip: { callbacks: { label: (c) => ` US$ ${(c.parsed.y/1000).toFixed(2)} bi acumulado` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, maxRotation: 0, autoSkip: false } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + (v/1000).toFixed(1) + 'bi' },
        },
      },
    },
  };

  /* =======================================================================
     3) chartReceita2025 — BARRA HORIZONTAL — Ranking receita 2025 (US$ bi)
     FONTE: CoinGecko Top Revenue-Generating Protocols 2025 (mesma metodologia).
     Pump.fun = #5, único launchpad no top-10. Em rosa; resto neutro.
     ===================================================================== */
  const chartReceita2025 = {
    type: 'bar',
    data: {
      labels: ['Tether','TRON','Circle','Hyperliquid','Pump.fun'],
      datasets: [{
        label: 'Receita 2025 (US$ bi)',
        data: [5.2, 3.45, 2.38, 0.742, 0.536],
        backgroundColor: [K.neutral2, K.neutral, K.neutral3, '#6f675b', K.pink],
        hoverBackgroundColor: [K.neutral2, K.neutral, K.neutral3, '#6f675b', K.pinkLine],
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
     4) chartFunil — BARRA — O funil de extinção (tokens, escala log)
     FONTE: Solidus Labs (7M+ lançados, ~97k c/ >$1k liquidez), graduação ~1%.
     Mostra: lançados → com liquidez real → graduados. Conta a tese do cassino.
     ===================================================================== */
  const chartFunil = {
    type: 'bar',
    data: {
      labels: ['Tokens lançados','Mantêm >US$1k liquidez','Graduam (curva cheia)'],
      datasets: [{
        label: 'Tokens',
        data: [7000000, 97000, 70000],
        backgroundColor: [K.neutral3, K.neutral2, K.pink],
        hoverBackgroundColor: [K.neutral3, K.neutral2, K.pinkLine],
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 70,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: noLegend,
        tooltip: { callbacks: { label: (c) => ` ${c.parsed.x.toLocaleString('pt-BR')} tokens` } },
      },
      scales: {
        x: {
          type: 'logarithmic',
          grid: { color: K.grid },
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => {
            if (v === 100 || v === 10000 || v === 1000000) return (v).toLocaleString('pt-BR');
            return null;
          } },
        },
        y: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 11 } } },
      },
    },
  };

  /* =======================================================================
     5) chartShareFlip — LINHA — Share Solana launchpad: o flip da LetsBonk
     FONTE: DL News / Coinpaper / Cointelegraph. Pump.fun cai ~90%→~24%→~73%.
     Dois datasets: Pump.fun (rosa) vs LetsBonk (verde).
     ===================================================================== */
  const chartShareFlip = {
    type: 'line',
    data: {
      labels: ['Jan/25','Mai/25','Jun/25','7 Jul','25 Jul','Ago/25','Out/25','Q1/26'],
      datasets: [
        {
          label: 'Pump.fun',
          data: [90, 80, 75, 40, 24, 73.6, 50, 81],
          borderColor: K.pinkLine,
          backgroundColor: K.pinkSoft,
          borderWidth: 2.6,
          fill: false,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: K.pink,
          pointBorderColor: K.cream,
          pointBorderWidth: 1.4,
        },
        {
          label: 'LetsBonk',
          data: [2, 5, 12, 58, 84, 15.3, 30, 12],
          borderColor: K.green,
          backgroundColor: K.greenSoft,
          borderWidth: 2.2,
          fill: false,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: K.green,
          pointBorderColor: K.cream,
          pointBorderWidth: 1.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, labels: { font: { family: K.sans, size: 11 }, color: K.ink, boxWidth: 12, padding: 12 } },
        tooltip: { callbacks: { label: (c) => ` ${c.dataset.label}: ${c.parsed.y}%` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, maxRotation: 0 } },
        y: {
          grid: { color: K.grid }, beginAtZero: true, max: 100,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => v + '%' },
        },
      },
    },
  };

  /* =======================================================================
     6) chartPump — LINHA — Preço do token PUMP (marcos)
     FONTE: CoinDesk (ICO $0,004), Blockworks (open $0,00529), CoinGecko (ATH
     $0,00893), CoinMarketCap (atual $0,00161, jun/26). 4 marcos Real.
     ===================================================================== */
  const chartPump = {
    type: 'line',
    data: {
      labels: ['ICO (US$0,004)','Abertura','ATH','Atual (jun/26)'],
      datasets: [{
        label: 'Preço PUMP (US$)',
        data: [0.004, 0.00529, 0.00893, 0.00161],
        borderColor: K.pinkLine,
        backgroundColor: K.pinkSoft,
        borderWidth: 2.5,
        fill: true,
        tension: 0.25,
        pointRadius: 5,
        pointHoverRadius: 7,
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
        tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y.toFixed(5)}` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.neutral3, font: { family: K.mono, size: 9.5 }, maxRotation: 0 } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v.toFixed(4) },
        },
      },
    },
  };

  /* =======================================================================
     7) chartSupplyPump — DOUGHNUT — Distribuição do supply PUMP (%)
     FONTE: Blockworks / CoinDCX / Mitrade. Público 12,5–15%, private 18%,
     time ~20%, ecossistema/tesouro o resto. Crítica de "fair launch".
     ===================================================================== */
  const chartSupplyPump = {
    type: 'doughnut',
    data: {
      labels: ['Ecossistema / tesouro 49%','Time 20%','Private sale 18%','Venda pública 13%'],
      datasets: [{
        label: 'Supply (%)',
        data: [49, 20, 18, 13],
        backgroundColor: [K.neutral, K.neutral3, '#7d7468', K.pink],
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
        legend: { position: 'right', labels: { font: { family: K.sans, size: 10.5 }, color: K.ink, boxWidth: 12, padding: 9 } },
        tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed}%` } },
      },
    },
  };

  /* =======================================================================
     8) chartLancamentos — BARRA — Lançamentos/dia (pico vs pós-pico)
     FONTE: STORM Partners / MEXC. ~70k/dia (jan/25) → ~30k pós-frenesi.
     ===================================================================== */
  const chartLancamentos = {
    type: 'bar',
    data: {
      labels: ['Pico (jan/25)','Pós-frenesi'],
      datasets: [{
        label: 'Tokens lançados/dia',
        data: [70000, 30000],
        backgroundColor: [K.pink, K.neutral],
        hoverBackgroundColor: [K.pinkLine, K.neutral3],
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
        tooltip: { callbacks: { label: (c) => ` ${c.parsed.y.toLocaleString('pt-BR')} tokens/dia` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 12 } } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => (v/1000) + 'k' },
        },
      },
    },
  };

  /* =======================================================================
     9) chartBuyback — BARRA — Buyback/burn de PUMP (US$ M)
     FONTE: KuCoin ($300M+ cumulativo) + The Block/CoinDesk ($370M burn abr/26).
     ===================================================================== */
  const chartBuyback = {
    type: 'bar',
    data: {
      labels: ['Buyback acum. (abr/26)','Burn único (28 abr/26)'],
      datasets: [{
        label: 'PUMP (US$ M)',
        data: [350, 370],
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
        tooltip: { callbacks: { label: (c) => ` US$ ${c.parsed.y} M` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: K.ink, font: { family: K.sans, size: 11 } } },
        y: {
          grid: { color: K.grid }, beginAtZero: true,
          ticks: { color: K.neutral3, font: { family: K.mono, size: 10 }, callback: (v) => '$' + v + 'M' },
        },
      },
    },
  };

  const KaleidosCharts = {
    chartReceitaTri, chartRevAcum, chartReceita2025, chartFunil,
    chartShareFlip, chartPump, chartSupplyPump, chartLancamentos, chartBuyback,
    palette: K,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = KaleidosCharts;
  global.KaleidosCharts = KaleidosCharts;
})(typeof window !== 'undefined' ? window : globalThis);
