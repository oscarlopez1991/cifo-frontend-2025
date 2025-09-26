import { fetchMarketChart } from '../../services/cryptoService.js';
import { getCachedData } from '../../services/cacheService.js';

export async function showAnalyticsModal(
  coinId = 'bitcoin',
  coinName = 'Bitcoin',
  days = 7
) {
  // Load modal HTML always to reset placeholders
  const res = await fetch('./components/AnalyticsModal/AnalyticsModal.html');
  const html = await res.text();
  const div = document.createElement('div');
  div.innerHTML = html;
  const existingModal = document.getElementById('analytics-modal');
  if (existingModal) existingModal.remove();
  document.body.appendChild(div.firstElementChild);
  const modal = document.getElementById('analytics-modal');

  // Replace placeholders with actual values
  const content = modal.querySelector('section');
  content.innerHTML = content.innerHTML
    .replace(/{{coinName}}/g, coinName)
    .replace(/{{days}}/g, days === 1 ? '24 hours' : `${days} days`);

  modal.classList.remove('hidden');

  // Render chart for selected coin
  setupAnalyticsPage(coinId, coinName, days);

  // Close modal
  document.getElementById('close-analytics-modal').onclick = () => {
    modal.classList.add('hidden');
  };
}

async function setupAnalyticsPage(
  coinId = 'bitcoin',
  coinName = 'Bitcoin',
  days = 7
) {
  if (!window.ApexCharts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  const chartContainer = document.getElementById('analytics-chart');
  const priceEl = document.getElementById('metric-price');
  const changeEl = document.getElementById('metric-change');
  let chart = null;

  chartContainer.innerHTML =
    '<div class="text-center animate-pulse text-gray-400 py-16">Loading chart...</div>';
  priceEl.textContent = '--';
  changeEl.textContent = '--';

  try {
    const raw = await fetchMarketChart(coinId, days);
    await renderChart(
      raw,
      coinName,
      days,
      priceEl,
      changeEl,
      chartContainer,
      chart
    );
  } catch (err) {
    const cached = getCachedData(`cryptoChart-${coinId}-${days}`);
    if (cached) {
      await renderChart(
        cached,
        coinName,
        days,
        priceEl,
        changeEl,
        chartContainer,
        chart
      );
    } else {
      chartContainer.innerHTML = `<div class="text-center text-red-500 py-16">Failed to load chart data. Please try again later.</div>`;
    }
    console.error(err);
  }
}

async function renderChart(
  raw,
  coinName,
  days,
  priceEl,
  changeEl,
  chartContainer,
  chart
) {
  // Group by date or hour depending on days
  const grouped = {};
  raw.forEach(([ts, price]) => {
    const d = new Date(ts);
    let key;
    if (days === 1) {
      key = `${String(d.getHours()).padStart(2, '0')}:00`;
    } else {
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(price);
  });
  const points = Object.entries(grouped)
    .sort(([a, b]) => a.localeCompare(b))
    .map(([key, arr]) => {
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      return [key, avg];
    });
  const prices = points.map(([, avg]) => avg);
  const times = points.map(([key]) => key);

  // Metrics
  const last = prices[prices.length - 1];
  const first = prices[0];
  const change = ((last - first) / first) * 100;
  priceEl.textContent = `$${last.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  changeEl.className = `text-base font-medium ${change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`;

  // Chart options
  const options = {
    chart: {
      type: 'area',
      width: '100%',
      height: '100%',
      toolbar: { show: false },
      background: 'transparent',
    },
    series: [{ name: coinName.toUpperCase(), data: prices }],
    xaxis: {
      categories: times,
      labels: {
        show: true,
        rotate: days === 1 ? -45 : -45,
        showEvery: days === 1 ? 1 : 1,
        style: { colors: '#9ca3af' },
        formatter: (value) => {
          if (days === 1 && typeof value === 'string' && value.includes(':')) {
            return value;
          }
          return value;
        },
      },
      axisBorder: { show: true, color: '#6b7280' },
      axisTicks: { show: false },
    },
    yaxis: {
      show: true,
      labels: {
        style: { colors: '#9ca3af' },
        formatter: (v) => `$${Math.round(v).toLocaleString()}`,
      },
    },
    grid: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 3, curve: 'smooth', colors: ['#2563eb'] },
    fill: {
      type: 'gradient',
      gradient: { opacityFrom: 0.4, opacityTo: 0, stops: [0, 100] },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (v) =>
          `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      },
    },
    legend: { show: false },
  };

  if (chart) chart.destroy();
  chartContainer.innerHTML = '';
  chart = new window.ApexCharts(chartContainer, options);
  await chart.render();
}
