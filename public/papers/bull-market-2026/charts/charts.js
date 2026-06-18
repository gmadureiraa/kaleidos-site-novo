/* Kaleidos Playbook Bull Market — Chart.js configs (âmbar + rosa Kaleidos) */
/* Requer Chart.js carregado antes deste script. */

(function () {
  if (typeof Chart === 'undefined') return;

  const AMBER = '#E0913A';
  const AMBER_SOFT = 'rgba(224,145,58,.16)';
  const PINK = '#d262b2';
  const INK = '#0d0d12';
  const GREY = '#9a93a6';
  const GREEN = '#3fae73';
  const RED = '#d9534f';
  const BLUE = '#5aa6ff';
  const GRID = 'rgba(13,13,18,.07)';

  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = '#3a3540';

  /* ---- CAP 1 — ATH do BTC por ciclo (barras, escala log) ---- */
  const ath = document.getElementById('chart-ath');
  if (ath) {
    new Chart(ath, {
      type: 'bar',
      data: {
        labels: ['2013', '2017', '2021', '2025'],
        datasets: [{
          label: 'Topo do BTC (US$)',
          data: [1127, 19700, 69000, 126000],
          backgroundColor: [
            'rgba(224,145,58,.45)',
            'rgba(224,145,58,.62)',
            'rgba(224,145,58,.80)',
            'rgba(224,145,58,1)'
          ],
          borderColor: AMBER, borderWidth: 1, borderRadius: 5, barPercentage: .62
        }]
      },
      options: {
        responsive: false, animation: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (c) => 'ATH: US$ ' + c.parsed.y.toLocaleString('pt-BR') } }
        },
        scales: {
          y: {
            type: 'logarithmic',
            grid: { color: GRID },
            ticks: {
              font: { size: 10 },
              callback: (v) => {
                if (v === 1000 || v === 10000 || v === 100000) return 'US$ ' + (v/1000) + 'k';
                return null;
              }
            }
          },
          x: { grid: { display: false }, ticks: { font: { size: 11, weight: '700' } } }
        }
      }
    });
  }

  /* ---- CAP 1 — Linha do tempo dos halvings (recompensa por bloco) ---- */
  const halv = document.getElementById('chart-halvings');
  if (halv) {
    new Chart(halv, {
      type: 'line',
      data: {
        labels: ['2012', '2016', '2020', '2024'],
        datasets: [{
          label: 'Recompensa por bloco (BTC)',
          data: [25, 12.5, 6.25, 3.125],
          borderColor: PINK, backgroundColor: 'rgba(210,98,178,.12)',
          borderWidth: 3, fill: true, tension: .15,
          pointBackgroundColor: PINK, pointRadius: 5, pointHoverRadius: 6,
          stepped: false
        }]
      },
      options: {
        responsive: false, animation: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (c) => c.parsed.y + ' BTC por bloco' } }
        },
        scales: {
          y: {
            min: 0, max: 28, grid: { color: GRID },
            ticks: { font: { size: 10 }, callback: (v) => v + ' BTC' },
            title: { display: true, text: 'recompensa / bloco', font: { size: 10, weight: '600' }, color: '#5a5560' }
          },
          x: { grid: { display: false }, ticks: { font: { size: 11, weight: '700' } } }
        }
      }
    });
  }

  /* ---- CAP 3 — Painel de indicadores: euforia vs capitulação (radar) ---- */
  const panel = document.getElementById('chart-painel');
  if (panel) {
    new Chart(panel, {
      type: 'radar',
      data: {
        labels: ['MVRV-Z', 'Pi Cycle', 'RHODL', 'Altseason', 'Funding', 'Fear & Greed'],
        datasets: [
          {
            label: 'Zona de TOPO (euforia)',
            data: [9, 9, 9, 8.5, 9, 9.5],
            borderColor: RED, backgroundColor: 'rgba(217,83,79,.14)',
            borderWidth: 2, pointBackgroundColor: RED, pointRadius: 3
          },
          {
            label: 'Zona de FUNDO (capitulação)',
            data: [1.5, 2, 2, 2, 1.5, 1],
            borderColor: GREEN, backgroundColor: 'rgba(63,174,115,.14)',
            borderWidth: 2, pointBackgroundColor: GREEN, pointRadius: 3
          }
        ]
      },
      options: {
        responsive: false, animation: false,
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 14, font: { size: 11 } } } },
        scales: {
          r: {
            min: 0, max: 10,
            ticks: { display: false, stepSize: 2 },
            grid: { color: GRID },
            angleLines: { color: GRID },
            pointLabels: { font: { size: 10, weight: '600' }, color: '#5a5560' }
          }
        }
      }
    });
  }

  /* ---- CAP 2 — As 8 narrativas: o que sobrou (barras horizontais) ---- */
  const narr = document.getElementById('chart-narrativas');
  if (narr) {
    new Chart(narr, {
      type: 'bar',
      data: {
        labels: ['DeFi Summer', 'RWA', 'Ordinals', 'NFT/PFP', 'AI agents', 'ICO', 'Memecoins', 'Play-to-Earn'],
        datasets: [{
          label: 'O que sobrou (índice qualitativo 0–10)',
          data: [9, 8.5, 5, 3.5, 4.5, 1, 2, 1],
          backgroundColor: (ctx) => {
            const v = ctx.raw;
            if (v >= 7) return 'rgba(63,174,115,.85)';
            if (v >= 4) return 'rgba(224,145,58,.85)';
            return 'rgba(217,83,79,.78)';
          },
          borderRadius: 4, barPercentage: .72
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: false, animation: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (c) => 'Resíduo de valor: ' + c.parsed.x + '/10' } }
        },
        scales: {
          x: { min: 0, max: 10, grid: { color: GRID }, ticks: { font: { size: 10 } } },
          y: { grid: { display: false }, ticks: { font: { size: 10.5, weight: '600' } } }
        }
      }
    });
  }

  /* ---- CAP 6 — Take-profit escalonado (curva + tranches) ---- */
  const tp = document.getElementById('chart-takeprofit');
  if (tp) {
    new Chart(tp, {
      type: 'line',
      data: {
        labels: ['Acumulação', 'Início bull', 'Meio bull', 'Euforia', 'Topo', 'Correção', 'Bear'],
        datasets: [
          {
            label: 'Preço do ativo',
            data: [10, 28, 55, 88, 100, 62, 30],
            borderColor: AMBER, backgroundColor: AMBER_SOFT,
            borderWidth: 3, fill: true, tension: .35,
            pointBackgroundColor: AMBER, pointRadius: 4, pointHoverRadius: 5
          },
          {
            label: 'Tranches de venda (20% cada)',
            data: [null, null, 55, 88, 100, null, null],
            borderColor: PINK, backgroundColor: PINK,
            borderWidth: 0, showLine: false,
            pointBackgroundColor: PINK, pointRadius: 7, pointStyle: 'rectRot'
          }
        ]
      },
      options: {
        responsive: false, animation: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 13, padding: 14, font: { size: 11 } } },
          tooltip: { callbacks: { label: (c) => c.dataset.label + (c.parsed.y != null ? ': ' + c.parsed.y : '') } }
        },
        scales: {
          y: {
            min: 0, max: 110, grid: { color: GRID },
            ticks: { font: { size: 10 }, callback: (v) => v },
            title: { display: true, text: 'preço (índice)', font: { size: 10, weight: '600' }, color: '#5a5560' }
          },
          x: { grid: { display: false }, ticks: { font: { size: 9.5, weight: '600' }, maxRotation: 0 } }
        }
      }
    });
  }
})();
