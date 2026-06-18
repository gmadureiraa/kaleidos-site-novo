/* Kaleidos Playbook — Chart.js configs (paleta Kaleidos) */
/* Requer Chart.js carregado antes deste script. */

(function () {
  if (typeof Chart === 'undefined') return;

  const PINK = '#d262b2';
  const PINK_SOFT = 'rgba(210,98,178,.16)';
  const INK = '#0d0d12';
  const GREY = '#9a93a6';
  const GREEN = '#3fae73';
  const ORANGE = '#ff9a3d';
  const BLUE = '#5aa6ff';
  const GRID = 'rgba(13,13,18,.07)';

  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = '#3a3540';

  /* ---- CAP 2 — Os 4 públicos fragmentados (radar de "intensidade de prova") ---- */
  const pub = document.getElementById('chart-publicos');
  if (pub) {
    new Chart(pub, {
      type: 'radar',
      data: {
        labels: ['Cultura / velocidade', 'Prova técnica', 'Compliance / research', 'Simplicidade', 'Risco tolerado'],
        datasets: [
          {
            label: 'Degens',
            data: [10, 3, 1, 4, 10],
            borderColor: PINK, backgroundColor: 'rgba(210,98,178,.14)',
            borderWidth: 2, pointBackgroundColor: PINK, pointRadius: 3
          },
          {
            label: 'Builders',
            data: [4, 10, 5, 3, 6],
            borderColor: BLUE, backgroundColor: 'rgba(90,166,255,.12)',
            borderWidth: 2, pointBackgroundColor: BLUE, pointRadius: 3
          },
          {
            label: 'Institucional',
            data: [1, 5, 10, 4, 2],
            borderColor: GREEN, backgroundColor: 'rgba(63,174,115,.12)',
            borderWidth: 2, pointBackgroundColor: GREEN, pointRadius: 3
          },
          {
            label: 'Mainstream',
            data: [3, 1, 3, 10, 3],
            borderColor: ORANGE, backgroundColor: 'rgba(255,154,61,.12)',
            borderWidth: 2, pointBackgroundColor: ORANGE, pointRadius: 3
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
            pointLabels: { font: { size: 10.5, weight: '600' }, color: '#5a5560' }
          }
        }
      }
    });
  }

  /* ---- CAP 9 — Curva de retenção pós-airdrop (D0 → D90) ---- */
  const ret = document.getElementById('chart-retencao');
  if (ret) {
    new Chart(ret, {
      type: 'line',
      data: {
        labels: ['D0\n(elegíveis)', 'Claim\n(64% vende)', 'D7', 'D30', 'D90'],
        datasets: [
          {
            label: 'zkSync — carteiras ativas restantes',
            data: [100, 60, 25, 21, 12],
            borderColor: PINK, backgroundColor: PINK_SOFT,
            borderWidth: 3, fill: true, tension: .3,
            pointBackgroundColor: PINK, pointRadius: 4, pointHoverRadius: 5
          },
          {
            label: 'Uniswap — carteiras que não venderam',
            data: [100, 55, 25, 14, 7],
            borderColor: GREY, backgroundColor: 'transparent',
            borderWidth: 2, borderDash: [6, 4], fill: false, tension: .3,
            pointBackgroundColor: GREY, pointRadius: 3
          }
        ]
      },
      options: {
        responsive: false, animation: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 14, padding: 14, font: { size: 11 } } },
          tooltip: { callbacks: { label: (c) => c.dataset.label + ': ' + c.parsed.y + '%' } }
        },
        scales: {
          y: {
            min: 0, max: 100,
            grid: { color: GRID },
            ticks: { callback: (v) => v + '%', font: { size: 11 } },
            title: { display: true, text: '% das carteiras', font: { size: 11, weight: '600' }, color: '#5a5560' }
          },
          x: { grid: { display: false }, ticks: { font: { size: 10.5 }, maxRotation: 0 } }
        }
      }
    });
  }
})();
