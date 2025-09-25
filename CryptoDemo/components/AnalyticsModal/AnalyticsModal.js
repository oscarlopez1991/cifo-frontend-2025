import { fetchMarketChart } from '../../services/cryptoService.js';
import { setupAnalyticsPage } from '../../pages/Analytics/Analytics.js';

export async function showAnalyticsModal(
  coinId = 'bitcoin',
  coinName = 'Bitcoin'
) {
  // Load modal HTML if not present
  let modal = document.getElementById('analytics-modal');
  if (!modal) {
    const res = await fetch('./components/AnalyticsModal/AnalyticsModal.html');
    const html = await res.text();
    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div.firstElementChild);
    modal = document.getElementById('analytics-modal');
  }

  // Replace placeholder with actual coin name
  const content = modal.querySelector('section');
  content.innerHTML = content.innerHTML.replace(/{{coinName}}/g, coinName);

  modal.classList.remove('hidden');

  // Render chart for selected coin
  setupAnalyticsPage(coinId, coinName);

  // Close modal
  document.getElementById('close-analytics-modal').onclick = () => {
    modal.classList.add('hidden');
    // Reset content if needed for next open
    content.innerHTML = content.innerHTML.replace(coinName, '{{coinName}}');
  };
}

async function setupAnalyticsPage(coinId = 'bitcoin', coinName = 'Bitcoin') {
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
    // Fetch selected coin for 7 days from cryptoService
    const raw = await fetchMarketChart(coinId, 7);

    // Group by date
    const grouped = {};
    raw.forEach(([ts, price]) => {
      const d = new Date(ts);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!grouped[dateStr]) grouped[dateStr] = [];
      grouped[dateStr].push(price);
    });
    const points = Object.entries(grouped)
      .sort(([a, b]) => a.localeCompare(b))
      .map(([date, arr]) => {
        const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
        return [date, avg];
      });
    const prices = points.map(([, avg]) => avg);
    const times = points.map(([date]) => date);

    // Metrics
    const last = prices[prices.length - 1];
    const first = prices[0];
    const change = ((last - first) / first) * 100;
    priceEl.textContent = `$${last.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
    changeEl.className = `text-base font-medium ${change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`;

    // Chart
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
        labels: { show: true, rotate: -45, style: { colors: '#9ca3af' } },
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
    chart.render();
  } catch (err) {
    chartContainer.innerHTML = `<div class="text-center text-red-500 py-16">Failed to load chart data.</div>`;
    priceEl.textContent = '--';
    changeEl.textContent = '--';
    console.error(err);
  }
}
