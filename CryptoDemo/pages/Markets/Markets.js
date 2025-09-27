import { fetchTopMarkets } from '../../services/coinGeckoApiService.js';
import { renderPageError } from '../../utils/renderPageError.js';
import { showAnalyticsModal } from '../../components/AnalyticsModal/AnalyticsModal.js';

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
    let html, data;

    // Use preloaded content if available
    if (window.preloadedMarkets) {
      ({ html, data } = window.preloadedMarkets);
      delete window.preloadedMarkets; // Clear after use
    } else {
      // Fallback: Load normally
      const response = await fetch('./pages/Markets/Markets.html');
      if (!response.ok) {
        throw new Error(`Failed to fetch Markets page: ${response.statusText}`);
      }
      html = await response.text();

      try {
        data = await fetchTopMarkets(100);
      } catch (error) {
        console.warn('CoinGecko fetch failed, using static rows:', error);
      }
    }

    appContainer.innerHTML = html;

    // Initialize search, sorting, and pagination with live data (when available)
    initMarketsTable(data);
  } catch (error) {
    console.error('Error loading markets page:', error);
    renderPageError(appContainer, 'Markets');
  }
};

/**
 * Initializes the markets table with search, sorting, pagination, and row click events.
 * @param {Array} coinsData - Array of coin data objects from the API.
 */
const initMarketsTable = (coinsData) => {
  const table = document.getElementById('markets-table');
  const tbody = document.getElementById('markets-tbody');
  const searchInput = document.getElementById('market-search');
  const pageSizeSelect = document.getElementById('rows-per-page');
  const pagination = document.getElementById('pagination');
  const summary = document.getElementById('pagination-summary');
  if (!table || !tbody) return;

  // 1. Render initial rows
  renderTableRows(tbody, coinsData, createRowFromCoin);

  // 2. Snapshot original rows
  let originalRows = getOriginalRows(tbody);

  // 3. State object
  const state = {
    query: '',
    sortKey: null,
    sortDir: 'asc',
    pageSize: parseInt(pageSizeSelect?.value || '10', 10),
    page: 1,
  };

  // 4. Render function
  const render = () =>
    renderTable(
      tbody,
      originalRows,
      state,
      (total) => renderPagination(total, state, pagination, summary, render),
      () => updateSortHeaderStyles(table, state)
    );

  // 5. Setup events
  setupTableEvents(table, searchInput, pageSizeSelect, state, render);

  // 6. Initial render
  render();

  // 7. Row click event to show analytics modal
  tbody.querySelectorAll('tr').forEach((row) => {
    row.addEventListener('click', () => {
      const coinId = row.dataset.coinId || 'bitcoin';
      const coinName =
        row.querySelector('.coin-name').textContent.split(' (')[0] || 'Bitcoin';
      showAnalyticsModal(coinId, coinName, 7); // 7 days (default)
    });
  });
};

/**
 * Renders table rows from data array using a row creation function.
 * @param {HTMLElement} tbody - The table body element to append rows to.
 * @param {Array} data - Array of data objects.
 * @param {Function} createRowFn - Function to create a row element from data.
 */
function renderTableRows(tbody, data, createRowFn) {
  tbody.innerHTML = '';
  if (Array.isArray(data) && data.length) {
    data.map(createRowFn).forEach((tr) => tbody.appendChild(tr));
  }
}

/**
 * Gets a snapshot of the original table rows for filtering and sorting.
 * @param {HTMLElement} tbody - The table body element.
 * @returns {Array<HTMLElement>} Array of cloned row elements.
 */
function getOriginalRows(tbody) {
  return Array.from(tbody.querySelectorAll('tr')).map((tr) =>
    tr.cloneNode(true)
  );
}

/**
 * Sets up event listeners for table sorting, search, and pagination.
 * @param {HTMLElement} table - The table element.
 * @param {HTMLElement} searchInput - The search input element.
 * @param {HTMLElement} pageSizeSelect - The page size select element.
 * @param {Object} state - The table state object.
 * @param {Function} render - The render function to update the table.
 */
function setupTableEvents(table, searchInput, pageSizeSelect, state, render) {
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
}

/**
 * Renders the table with filtered, sorted, and paginated rows.
 * @param {HTMLElement} tbody - The table body element.
 * @param {Array<HTMLElement>} originalRows - Original rows snapshot.
 * @param {Object} state - The table state object.
 * @param {Function} renderPagination - Function to render pagination.
 * @param {Function} updateSortHeaderStyles - Function to update sort styles.
 */
function renderTable(
  tbody,
  originalRows,
  state,
  renderPagination,
  updateSortHeaderStyles
) {
  let rows = originalRows.slice();
  rows = filterRows(rows, state.query);
  const total = rows.length;
  rows = sortRows(rows, state.sortKey, state.sortDir);

  // Paginate
  const start = (state.page - 1) * state.pageSize;
  const pageRows = rows.slice(start, start + state.pageSize);

  tbody.innerHTML = '';
  pageRows.forEach((tr) => tbody.appendChild(tr.cloneNode(true)));

  // Re-assign row click events after rendering
  tbody.querySelectorAll('tr').forEach((row) => {
    row.addEventListener('click', () => {
      const coinId = row.dataset.coinId || 'bitcoin';
      const coinName =
        row.querySelector('.coin-name').textContent.split(' (')[0] || 'Bitcoin';
      showAnalyticsModal(coinId, coinName, 7); // 7 days (default)
    });
  });

  renderPagination(total);
  updateSortHeaderStyles();
}

/**
 * Filters rows based on search query.
 * @param {Array<HTMLElement>} rows - Array of row elements.
 * @param {string} query - Search query string.
 * @returns {Array<HTMLElement>} Filtered rows.
 */
function filterRows(rows, query) {
  if (!query) return rows;
  const q = query.toLowerCase();
  return rows.filter((tr) =>
    tr.children[0].innerText.toLowerCase().includes(q)
  );
}

/**
 * Sorts rows based on sort key and direction.
 * @param {Array<HTMLElement>} rows - Array of row elements.
 * @param {string} sortKey - Key to sort by (e.g., 'price').
 * @param {string} sortDir - Sort direction ('asc' or 'desc').
 * @returns {Array<HTMLElement>} Sorted rows.
 */
function sortRows(rows, sortKey, sortDir) {
  if (!sortKey) return rows;
  const dir = sortDir === 'asc' ? 1 : -1;
  return rows.slice().sort((a, b) => {
    const va = getCellValue(a, sortKey);
    const vb = getCellValue(b, sortKey);
    if (typeof va === 'number' && typeof vb === 'number')
      return (va - vb) * dir;
    return va.localeCompare(vb) * dir;
  });
}

/**
 * Renders pagination controls.
 * @param {number} total - Total number of rows.
 * @param {Object} state - The table state object.
 * @param {HTMLElement} pagination - Pagination container element.
 * @param {HTMLElement} summary - Summary text element.
 * @param {Function} render - The render function.
 */
function renderPagination(total, state, pagination, summary, render) {
  const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
  state.page = Math.min(state.page, totalPages);

  const start = total === 0 ? 0 : (state.page - 1) * state.pageSize + 1;
  const end = Math.min(total, state.page * state.pageSize);
  if (summary) summary.textContent = `Showing ${start}-${end} of ${total}`;

  if (!pagination) return;
  pagination.innerHTML = '';

  const makeBtn = (label, page, disabled = false, active = false) => {
    const a = document.createElement('li');
    const link = document.createElement('a');
    link.className = [
      'px-3 py-2 leading-tight border',
      active
        ? 'text-blue-600 border-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:text-white'
        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
      disabled ? 'cursor-not-allowed opacity-60' : '',
    ].join(' ');
    link.textContent = label;
    if (!disabled) {
      link.href = '#';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        state.page = page;
        render();
      });
    }
    a.appendChild(link);
    return a;
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
}

/**
 * Updates the styles of sort buttons based on current sort state.
 * @param {HTMLElement} table - The table element.
 * @param {Object} state - The table state object.
 */
function updateSortHeaderStyles(table, state) {
  table.querySelectorAll('.sort-btn').forEach((btn) => {
    const icon = btn.querySelector('.sort-icon');
    btn.classList.remove('text-blue-600', 'dark:text-blue-500');
    icon?.classList.remove('rotate-180', 'transform');
    if (state.sortKey && btn.dataset.key === state.sortKey) {
      btn.classList.add('text-blue-600', 'dark:text-blue-500');
      if (state.sortDir === 'desc')
        icon?.classList.add('rotate-180', 'transform');
    }
  });
}

/**
 * Gets the value from a table cell for sorting.
 * @param {HTMLElement} tr - The table row element.
 * @param {string} key - The sort key.
 * @returns {string|number} The cell value.
 */
function getCellValue(tr, key) {
  // Column order: name (0), price (1), marketCap (2), volume (3), change (4)
  switch (key) {
    case 'name':
      return tr.children[0].innerText.trim().toLowerCase();
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
}

/**
 * Create a <tr> element from a coin object returned by the service.
 */
function createRowFromCoin(coinData) {
  const coinRowTemplate = document.getElementById('coin-row-template');
  const coinRowElement =
    coinRowTemplate.content.firstElementChild.cloneNode(true);

  coinRowElement.dataset.coinId = coinData.id;
  coinRowElement.querySelector('img').src = coinData.image;
  coinRowElement.querySelector('img').alt = coinData.name;
  coinRowElement.querySelector('.coin-name').textContent =
    `${coinData.name} (${coinData.symbol})`;

  coinRowElement.querySelector('.price').textContent =
    `$${coinData.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  coinRowElement.querySelector('.market-cap').textContent =
    `$${coinData.marketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  coinRowElement.querySelector('.volume').textContent =
    `$${coinData.volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  coinRowElement.querySelector('.change').textContent =
    `${(coinData.change24h ?? 0).toFixed(2)}%`;
  coinRowElement
    .querySelector('.change')
    .classList.add(
      (coinData.change24h ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'
    );
  coinRowElement
    .querySelector('.price')
    .setAttribute('data-value', coinData.price);
  coinRowElement
    .querySelector('.market-cap')
    .setAttribute('data-value', coinData.marketCap);
  coinRowElement
    .querySelector('.volume')
    .setAttribute('data-value', coinData.volume24h);
  coinRowElement
    .querySelector('.change')
    .setAttribute('data-value', coinData.change24h);
  coinRowElement.classList.add(
    'hover:bg-gray-100',
    'dark:hover:bg-gray-600',
    'cursor-pointer'
  );

  return coinRowElement;
}
