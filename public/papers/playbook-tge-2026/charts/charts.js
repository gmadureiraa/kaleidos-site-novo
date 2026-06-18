/* Kaleidos Playbook TGE 2026 — Chart.js configs (paleta Kaleidos dark) */
(function () {
  if (typeof Chart === 'undefined') return;

  const PINK = '#d262b2';
  const PINK_SOFT = 'rgba(210,98,178,.16)';
  const GREY = '#8d877c';
  const GREEN = '#7CF067';
  const ORANGE = '#e09a52';
  const BLUE = '#5aa6ff';
  const GRID = 'rgba(244,241,236,.10)';

  Chart.defaults.font.family = "'Gridlite', 'SFMono-Regular', monospace";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = '#cfcabf';

  /* ---- CAP 5 — Curva de venda pós-airdrop (D0 → D90) ---- */
  const ret = document.getElementById('chart-dump');
  if (ret) {
    new Chart(ret, {
      type: 'line',
      data: {
        labels: ['Snapshot', 'Claim (TGE)', 'D1', 'D7', 'D30', 'D90'],
        datasets: [
          {
            label: 'Airdrop farmado — carteiras ainda holdando',
            data: [100, 100, 36, 25, 18, 10],
            borderColor: GREY, backgroundColor: 'transparent',
            borderWidth: 2, borderDash: [6, 4], fill: false, tension: .3,
            pointBackgroundColor: GREY, pointRadius: 3
          },
          {
            label: 'Airdrop ligado a produto que retém',
            data: [100, 100, 78, 62, 51, 44],
            borderColor: PINK, backgroundColor: PINK_SOFT,
            borderWidth: 3, fill: true, tension: .3,
            pointBackgroundColor: PINK, pointRadius: 4
          }
        ]
      },
      options: {
        responsive: false, animation: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 14, padding: 12, font: { size: 10.5 } } },
          tooltip: { callbacks: { label: (c) => c.dataset.label + ': ' + c.parsed.y + '%' } }
        },
        scales: {
          y: { min: 0, max: 100, grid: { color: GRID },
            ticks: { callback: (v) => v + '%', font: { size: 11 } },
            title: { display: true, text: '% das carteiras', font: { size: 10.5, weight: '600' }, color: '#cfcabf' } },
          x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 0 } }
        }
      }
    });
  }

  /* ---- CAP 8 — Float inicial: 2024 (low float) vs lançamento saudável ---- */
  const flt = document.getElementById('chart-float');
  if (flt) {
    new Chart(flt, {
      type: 'bar',
      data: {
        labels: ['MC / FDV médio\ntokens 2024', 'Faixa saudável\n(community-first)'],
        datasets: [{
          label: 'Float inicial (% do supply circulante)',
          data: [12.3, 40],
          backgroundColor: [ORANGE, PINK],
          borderRadius: 6, barThickness: 64
        }]
      },
      options: {
        responsive: false, animation: false,
        plugins: { legend: { display: false },
          tooltip: { callbacks: { label: (c) => c.parsed.y + '%' } } },
        scales: {
          y: { min: 0, max: 60, grid: { color: GRID },
            ticks: { callback: (v) => v + '%', font: { size: 11 } },
            title: { display: true, text: 'circulante / FDV', font: { size: 10.5, weight: '600' }, color: '#cfcabf' } },
          x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 0 } }
        }
      }
    });
  }

  /* ---- CAP 7 — Comunidade pré-construída: meses de antecedência ---- */
  const com = document.getElementById('chart-comunidade');
  if (com) {
    new Chart(com, {
      type: 'bar',
      data: {
        labels: ['Berachain\n(Bong Bears)', 'Pudgy\n(NFT + brinquedos)', 'Jupiter\n(catdets)', 'Friend.tech\n(zero base)'],
        datasets: [{
          label: 'Meses construindo comunidade antes do token',
          data: [40, 30, 6, 0],
          backgroundColor: [GREEN, PINK, BLUE, ORANGE],
          borderRadius: 6, barThickness: 42
        }]
      },
      options: {
        responsive: false, animation: false, indexAxis: 'y',
        plugins: { legend: { display: false },
          tooltip: { callbacks: { label: (c) => c.parsed.x + ' meses' } } },
        scales: {
          x: { min: 0, max: 44, grid: { color: GRID },
            ticks: { callback: (v) => v + 'm', font: { size: 11 } } },
          y: { grid: { display: false }, ticks: { font: { size: 9.5 } } }
        }
      }
    });
  }
})();
