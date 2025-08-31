/* Task 1 --------------------------------------------------------------------------------------- */

/* This is a line with exactly 100 characters --------------------------------------------------- */

/**
 * The question about the DOM:
 * Your answer here...
 * The DOM (Document Object Model) is a programming interface for web documents. It represents the
 * page as a hierarchical tree structure of nodes (elements, attributes, text, etc.), allowing
 * languages like JavaScript to dynamically access, modify, and manipulate the content, structure,
 * and styles of a webpage.
 */

/**
 * The question about `defer`:
 * Your answer here...
 * The defer attribute tells the browser to download the script in parallel while parsing the HTML,
 * but to delay its execution until after the HTML parsing is complete and the DOM is built.
 */

/**
 * The question about `getElementBy...` vs `getElementsBy...`:
 * Your answer here...
 * The singular method returns a single element (commonly by ID), while the plural methods return a
 * live collection of all matching elements.
 */

/* Task 2 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 2 solution ------------------------------------------------------------------------------ */

function updateRoleSelection(selectedItem, roleNavItems) {
  roleNavItems.forEach((navItem) => {
    navItem.classList.remove('role-selected');
  });
  selectedItem.classList.add('role-selected');
}

function updateOptionsVisibility(roleIndex, roleNavOptions, adminOptions) {
  // Code breaks if HTML order changes, prefer data attributes when possible
  const USER_ROLE_INDEX = 0;

  // Remove inline overrides to restore CSS defaults
  roleNavOptions.forEach((option) => {
    option.style.display = '';
  });

  if (roleIndex === USER_ROLE_INDEX) {
    adminOptions.forEach((option) => {
      option.style.display = 'none';
    });
  }
  // Implicit admin role (index !== 0) shows all options by default
}

function initializeRoleNavigation() {
  const roleNavItems = document.querySelectorAll('.nav-role li');
  const roleNavOptions = document.querySelectorAll('.nav-options li');
  const adminOptions = document.querySelectorAll('.nav-options li.admin');

  roleNavItems.forEach((item, index) => {
    item.addEventListener('click', function () {
      updateRoleSelection(this, roleNavItems);
      updateOptionsVisibility(index, roleNavOptions, adminOptions);
    });
  });
}

initializeRoleNavigation();

/* Task 3 --------------------------------------------------------------------------------------- */

let teams = [
  {
    team: 'South Korea',
    games: {
      wins: 0,
      draws: 1,
      losses: 2,
    },
  },
  {
    team: 'Denmark',
    games: {
      wins: 1,
      draws: 0,
      losses: 2,
    },
  },
  {
    team: 'Finland',
    games: {
      wins: 2,
      draws: 1,
      losses: 0,
    },
  },
  {
    team: 'Italy',
    games: {
      wins: 1,
      draws: 2,
      losses: 0,
    },
  },
];

/* Task 3 solution ------------------------------------------------------------------------------ */

function sortTeamsByPoints(teams) {
  return teams
    .map((team) => ({
      ...team,
      points: team.games.wins * 3 + team.games.draws,
    }))
    .sort((a, b) => b.points - a.points);
}

function createTableRow(data, isFirst = false) {
  const row = document.createElement('tr');

  if (isFirst) {
    row.classList.add('classification-first');
  }

  const rowData = {
    team: data.team,
    wins: data.games.wins,
    draws: data.games.draws,
    losses: data.games.losses,
    points: data.points,
  };

  Object.values(rowData).forEach((cellData) => {
    const cell = document.createElement('td');
    cell.textContent = cellData;
    row.appendChild(cell);
  });

  return row;
}

function renderClassificationTable(teams) {
  const classificationTbody = document.querySelector('#classification tbody');
  const sortedTeams = sortTeamsByPoints(teams);

  sortedTeams.forEach((team, index) => {
    const row = createTableRow(team, index === 0);
    classificationTbody.appendChild(row);
  });
}

renderClassificationTable(teams);

/* Task 4 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 4 solution ------------------------------------------------------------------------------ */

const customersTable = document.querySelector('#customers');
const rows = customersTable.querySelectorAll('tbody tr');

function markUnpaidAmount(rows) {
  rows.forEach((row) => {
    // Breaks if column order changes, but HTML modification is restricted
    const thirdColumn = row.querySelector('td:nth-child(3)');
    const value = parseFloat(thirdColumn.textContent);

    if (value < 0) {
      thirdColumn.classList.add('unpaid');
    }
  });
}

function calculateTotalAmount() {
  const amountCells = customersTable.querySelectorAll('tbody .amount');
  const total = Array.from(amountCells).reduce((totalAmount, cellAmount) => {
    return totalAmount + parseFloat(cellAmount.textContent);
  }, 0);

  const footerAmountCell = customersTable.querySelector('tfoot .amount');
  footerAmountCell.textContent = total.toFixed(2);
}

markUnpaidAmount(rows);
calculateTotalAmount();

/* Task 5 --------------------------------------------------------------------------------------- */

let rating = 0;

/* Task 5 solution ------------------------------------------------------------------------------ */

/* Task 6 --------------------------------------------------------------------------------------- */

// This is how many pixels the bar has to move each time.
const delta = 20;
// Same initial value as left: 200px in CSS.
let left = 200;

/* Task 6 solution ------------------------------------------------------------------------------ */

/* Task 7 --------------------------------------------------------------------------------------- */

// These indicate how many pixels the ball has to move each time on each axis.
let topDelta = (leftDelta = 5);
// These are the coordinates for ball position.
let topCoord = (leftCoord = 0);
// This is the width of the playground area.
const fieldWidth = document.querySelector('.ball-container').clientWidth;
// This is the height of the playground area.
const fieldHeight = document.querySelector('.ball-container').clientHeight;

/* Task 7 solution ------------------------------------------------------------------------------ */
