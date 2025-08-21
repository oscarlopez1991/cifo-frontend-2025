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

/* Task 4 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 4 solution ------------------------------------------------------------------------------ */

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
