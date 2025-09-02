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

function markOverdueCustomers(rows) {
  rows.forEach((row) => {
    // Breaks if column order changes, but HTML modification is restricted
    const daysColumn = row.querySelector('td:nth-child(3)');
    const daysUntilPayment = parseFloat(daysColumn.textContent);

    if (daysUntilPayment < 0) {
      daysColumn.classList.add('unpaid');
    }
  });
}

function calculateTotalAmount() {
  const customersTable = document.querySelector('#customers');
  const amountCells = customersTable.querySelectorAll('tbody .amount');

  const total = Array.from(amountCells).reduce((totalAmount, cellAmount) => {
    return totalAmount + parseFloat(cellAmount.textContent);
  }, 0);

  const footerAmountCell = customersTable.querySelector('tfoot .amount');
  footerAmountCell.textContent = total.toFixed(2);
}

// Global function for HTML onclick reference
function removeUnpaid() {
  const customersTable = document.querySelector('#customers');
  const rows = customersTable.querySelectorAll('tbody tr');

  rows.forEach((row) => {
    const daysColumn = row.querySelector('td:nth-child(3)');
    const daysUntilPayment = parseFloat(daysColumn.textContent);

    if (daysUntilPayment < 0) {
      row.remove();
    }
  });

  calculateTotalAmount();
}

function initializeCustomersTable() {
  const customersTable = document.querySelector('#customers');
  const rows = customersTable.querySelectorAll('tbody tr');

  markOverdueCustomers(rows);
  calculateTotalAmount();
}

initializeCustomersTable();

/* Task 5 --------------------------------------------------------------------------------------- */

let rating = 0;

/* Task 5 solution ------------------------------------------------------------------------------ */

function updateStarRating(selectedIndex) {
  const stars = document.querySelectorAll('.star-container .star');

  // I've used destructuring to get both index and element
  for (const [index, star] of stars.entries()) {
    // Remove both classes first
    star.classList.remove('star-gray', 'star-pink');

    // Add appropriate class according to the selected star index
    if (index <= selectedIndex) {
      star.classList.add('star-pink');
    } else {
      star.classList.add('star-gray');
    }
  }

  rating = selectedIndex + 1;
}

function initializeStarRating() {
  const stars = document.querySelectorAll('.star-container .star');

  // Add click event listeners
  stars.forEach((star, index) => {
    star.addEventListener('click', function () {
      updateStarRating(index);
    });
  });
}

initializeStarRating();

/* Task 6 --------------------------------------------------------------------------------------- */

// This is how many pixels the bar has to move each time.
const delta = 20;
// Same initial value as left: 200px in CSS.
let left = 200;

/* Task 6 solution ------------------------------------------------------------------------------ */

function moveBar(direction) {
  const bar = document.querySelector('.bar');
  const barContainer = document.querySelector('.bar-container');
  const containerWidth = barContainer.clientWidth;
  const barTotalWidth = bar.offsetWidth;

  // Calculate maximum relative position (subtracting barTotalWidth)
  const maxLeft = containerWidth - barTotalWidth;

  if (direction === 'left' && left > 0) {
    // Can move left if current position > 0
    left = Math.max(0, left - delta);
  } else if (direction === 'right' && left < maxLeft) {
    // Can move right if current position < maxLeft
    left = Math.min(maxLeft, left + delta);
  }

  // Update the bar position using inline CSS
  bar.style.left = left + 'px';
}

function handleKeyPress(event) {
  switch (event.key) {
    case 'ArrowLeft':
      // Prevent default scrolling behavior
      event.preventDefault();
      moveBar('left');
      break;
    case 'ArrowRight':
      // Prevent default scrolling behavior
      event.preventDefault();
      moveBar('right');
      break;
  }
}

function initializeBarMovement() {
  document.addEventListener('keydown', handleKeyPress);
}

initializeBarMovement();

/* Task 7 --------------------------------------------------------------------------------------- */

// These indicate how many pixels the ball has to move each time on each axis.
let topDelta = 5,
  leftDelta = 5; // I can't accept global variables
// These are the coordinates for ball position.
let topCoord = 0,
  leftCoord = 0; // I can't accept global variables
// This is the width of the playground area.
const fieldWidth = document.querySelector('.ball-container').clientWidth;
// This is the height of the playground area.
const fieldHeight = document.querySelector('.ball-container').clientHeight;

/* Task 7 solution ------------------------------------------------------------------------------ */

function startBallAnimation() {
  // Access the ball using querySelector inside ball-container (can't use .ball class)
  const ballContainer = document.querySelector('.ball-container');
  const ball = ballContainer.querySelector('div'); // Get the div inside ball-container

  // Get ball dimensions for boundary calculation
  const ballStyles = getComputedStyle(ball);
  const ballWidth = parseInt(ballStyles.width);
  const ballHeight = parseInt(ballStyles.height);

  // Calculate boundaries (ball must stay inside container)
  const maxTop = fieldHeight - ballHeight;
  const maxLeft = fieldWidth - ballWidth;

  function moveBall() {
    // Update coordinates
    topCoord += topDelta;
    leftCoord += leftDelta;

    // Bounce off top and bottom walls
    if (topCoord <= 0 || topCoord >= maxTop) {
      topDelta = -topDelta; // Reverse vertical direction
      topCoord = Math.max(0, Math.min(maxTop, topCoord)); // Keep within bounds
    }

    // Bounce off left and right walls
    if (leftCoord <= 0 || leftCoord >= maxLeft) {
      leftDelta = -leftDelta; // Reverse horizontal direction
      leftCoord = Math.max(0, Math.min(maxLeft, leftCoord)); // Keep within bounds
    }

    // Apply position using inline CSS (overrides external CSS)
    ball.style.top = topCoord + 'px';
    ball.style.left = leftCoord + 'px';
  }

  // Start automatic movement using setInterval (30ms for smooth animation)
  setInterval(moveBall, 30);
}

startBallAnimation();
