import { fetchTopMarkets } from '../../services/cryptoService.js';
/**
 * Loads and displays the markets page content
 */
export const loadMarketsPage = async () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('App container not found');
    return;
  }

  try {
    const response = await fetch('./pages/Markets/Markets.html');
    if (!response.ok) {
      throw new Error(`Failed to fetch Markets page: ${response.statusText}`);
    }

    const html = await response.text();
    appContainer.innerHTML = html;

    // Try to load live data; fallback to static rows if it fails
    let data = null;
    try {
      data = await fetchTopMarkets(100);
    } catch (e) {
      console.warn('CoinGecko fetch failed, using static rows:', e);
    }

    // Initialize search, sorting, and pagination with live data (when available)
    initMarketsTable(data);
  } catch (error) {
    console.error('Error loading markets page:', error);
    appContainer.innerHTML = `
      <div class="text-center py-16">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Error Loading Markets Page
        </h1>
        <p class="text-gray-500 dark:text-gray-400">Please refresh the page to try again.</p>
      </div>
    `;
  }
};

// --- Table logic (search + sort + paginate) ---
const initMarketsTable = (coinsData) => {
  const table = document.getElementById('markets-table');
  const tbody = document.getElementById('markets-tbody');
  const searchInput = document.getElementById('market-search');
  const pageSizeSelect = document.getElementById('rows-per-page');
  const pagination = document.getElementById('pagination');
  const summary = document.getElementById('pagination-summary');

  if (!table || !tbody) return;

  // If API data exists, render it into tbody first
  if (Array.isArray(coinsData) && coinsData.length) {
    tbody.innerHTML = '';
    const rows = coinsData.map((c) => createRowFromCoin(c));
    rows.forEach((tr) => tbody.appendChild(tr));
  }

  // Snapshot rows for client-side filtering/sorting/pagination
  let originalRows = Array.from(tbody.querySelectorAll('tr')).map((tr) =>
    tr.cloneNode(true)
  );

  const state = {
    query: '',
    sortKey: null, // 'name' | 'price' | 'marketCap' | 'volume' | 'change'
    sortDir: 'asc', // 'asc' | 'desc'
    pageSize: parseInt(pageSizeSelect?.value || '10', 10),
    page: 1,
  };

  const getCellValue = (tr, key) => {
    // Columns: 0 name(th), 1 price, 2 marketCap, 3 volume, 4 change
    switch (key) {
      case 'name': {
        const text = tr.children[0].innerText.trim();
        return text.toLowerCase();
      }
      case 'price':
      case 'marketCap':
      case 'volume':
      case 'change': {
        const idx = { price: 1, marketCap: 2, volume: 3, change: 4 }[key];
        const cell = tr.children[idx];
        const dataVal = cell.getAttribute('data-value');
        const n =
          dataVal != null
            ? parseFloat(dataVal)
            : parseFloat(cell.innerText.replace(/[$,%\s,]/g, ''));
        return isNaN(n) ? 0 : n;
      }
      default:
        return 0;
    }
  };

  const filterRows = (rows) => {
    if (!state.query) return rows;
    const q = state.query.toLowerCase();
    return rows.filter((tr) =>
      tr.children[0].innerText.toLowerCase().includes(q)
    );
  };

  const sortRows = (rows) => {
    if (!state.sortKey) return rows;
    const dir = state.sortDir === 'asc' ? 1 : -1;
    return rows.slice().sort((a, b) => {
      const va = getCellValue(a, state.sortKey);
      const vb = getCellValue(b, state.sortKey);
      if (typeof va === 'number' && typeof vb === 'number')
        return (va - vb) * dir;
      return va.localeCompare(vb) * dir;
    });
  };

  const renderPagination = (total) => {
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    state.page = Math.min(state.page, totalPages);

    // Summary
    const start = total === 0 ? 0 : (state.page - 1) * state.pageSize + 1;
    const end = Math.min(total, state.page * state.pageSize);
    if (summary) summary.textContent = `Showing ${start}-${end} of ${total}`;

    // Controls
    if (!pagination) return;
    pagination.innerHTML = '';

    const makeBtn = (label, page, disabled = false, active = false) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = label;
      a.className = [
        'px-3 py-2 leading-tight border',
        active
          ? 'text-blue-600 border-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:text-white'
          : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        disabled ? 'cursor-not-allowed opacity-60' : '',
      ].join(' ');
      if (!disabled) {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          state.page = page;
          render();
        });
      }
      li.appendChild(a);
      return li;
    };

    const totalPagesToShow = Math.min(5, totalPages);
    const startPage = Math.max(
      1,
      Math.min(state.page - 2, totalPages - totalPagesToShow + 1)
    );
    const pages = Array.from(
      { length: totalPagesToShow },
      (_, i) => startPage + i
    );

    pagination.appendChild(
      makeBtn('Prev', Math.max(1, state.page - 1), state.page === 1)
    );
    pages.forEach((p) =>
      pagination.appendChild(makeBtn(String(p), p, false, p === state.page))
    );
    pagination.appendChild(
      makeBtn(
        'Next',
        Math.min(totalPages, state.page + 1),
        state.page === totalPages
      )
    );
  };

  const render = () => {
    // Always start from the stored snapshot
    let rows = originalRows.slice();
    rows = filterRows(rows);
    const total = rows.length;
    rows = sortRows(rows);

    // Paginate
    const start = (state.page - 1) * state.pageSize;
    const pageRows = rows.slice(start, start + state.pageSize);

    // Render body
    tbody.innerHTML = '';
    pageRows.forEach((r) => tbody.appendChild(r.cloneNode(true)));

    renderPagination(total);
    updateSortHeaderStyles();
  };

  const updateSortHeaderStyles = () => {
    const buttons = table.querySelectorAll('.sort-btn');
    buttons.forEach((btn) => {
      const icon = btn.querySelector('.sort-icon');
      btn.classList.remove('text-blue-600', 'dark:text-blue-500');
      icon?.classList.remove('rotate-180', 'transform');
      if (state.sortKey && btn.dataset.key === state.sortKey) {
        btn.classList.add('text-blue-600', 'dark:text-blue-500');
        if (state.sortDir === 'desc')
          icon?.classList.add('rotate-180', 'transform');
      }
    });
  };

  // Events
  table.querySelectorAll('.sort-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortKey = key;
        state.sortDir = 'asc';
      }
      state.page = 1;
      render();
    });
  });

  searchInput?.addEventListener('input', () => {
    state.query = searchInput.value.trim();
    state.page = 1;
    render();
  });

  pageSizeSelect?.addEventListener('change', () => {
    state.pageSize = parseInt(pageSizeSelect.value, 10);
    state.page = 1;
    render();
  });

  // First render
  render();
};

/**
 * Create a <tr> element from a coin object returned by the service.
 */
function createRowFromCoin(c) {
  const coinRowTemplate = document.getElementById('coin-row-template');
  const coinRowElement =
    coinRowTemplate.content.firstElementChild.cloneNode(true);

  coinRowElement.querySelector('img').src = c.image;
  coinRowElement.querySelector('img').alt = c.name;
  coinRowElement.querySelector('.coin-name').textContent =
    `${c.name} (${c.symbol})`;

  // Always use $ (not US$) and prepend for all three columns
  coinRowElement.querySelector('.price').textContent =
    `$${c.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  coinRowElement.querySelector('.market-cap').textContent =
    `$${c.marketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  coinRowElement.querySelector('.volume').textContent =
    `$${c.volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  coinRowElement.querySelector('.change').textContent =
    `${(c.change24h ?? 0).toFixed(2)}%`;
  coinRowElement
    .querySelector('.change')
    .classList.add((c.change24h ?? 0) >= 0 ? 'text-green-500' : 'text-red-500');
  coinRowElement.querySelector('.price').setAttribute('data-value', c.price);
  coinRowElement
    .querySelector('.market-cap')
    .setAttribute('data-value', c.marketCap);
  coinRowElement
    .querySelector('.volume')
    .setAttribute('data-value', c.volume24h);
  coinRowElement
    .querySelector('.change')
    .setAttribute('data-value', c.change24h);

  return coinRowElement;
}
