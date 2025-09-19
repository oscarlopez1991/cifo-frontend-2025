/** ---------------------------------------------------------------------------
 * Desenvolupament Web Frontend
 * PLA 5: Fonaments de JavaScript
 * Mòdul: 2
 * Dedicació: 5 dies (25 hores)
 * Data d'entrega: 24 de juliol de 2025
 * ------------------------------------------------------------------------- */

/* Task 1 ------------------------------------------------------------------ */

const question = "What is the answer to life, universe and everything?";
let answer = 0;
answer = 42;

// Write all your variables below this line:

const cifo = "CIFO";
const pi = 3.1416;
let distance = 0;
distance = answer * 1004 + 27;
const yeap = true;
const nope = false;
let condition = question === cifo;
condition = distance >= 42_000;
pi_sign = "π";
pi_text =
  "The number " +
  pi_sign +
  " is a mathematical constant, approximately equal to " +
  pi +
  ", defined in...";
cifo_text = `El Bruc is approximately ${distance} meters away from the ${cifo} location.`;

/* Task 2 ------------------------------------------------------------------ */

const lang = "ca";
const age = 38;

// Write your first `if` block below this line:

if (age >= 30) {
  console.log("You are a boomer!");
}

// Write your second `if` block below this line:

if (age <= 20) {
  console.log("Too young to be a boomer");
} else if (age > 20 && age <= 35) {
  console.log("Quite close to be a boomer");
} else if (age > 35) {
  console.log("A boomer for sure");
}

// Write your `switch` block below this line:

switch (lang) {
  case "es":
    console.log("Spanish");
    break;
  case "ca":
    console.log("Catalan");
    break;
  case "fr":
    console.log("French");
    break;
  default:
    console.log("Unknown");
}

// Replace `null` in the line below with your one-liner using a ternary operator:

console.log(lang === "ca" ? "Catalan" : "Some other language");

/* Task 3 ------------------------------------------------------------------ */

let num = 9;
let sum = 0;
let product = 1;

// Write your `for` loop below this line:

for (let i = 1; i <= num; i++) {
  sum += i;
}

console.log(sum);

// Write your `while` loop below this line:

i = 1;

while (i <= num) {
  product *= i;
  i++;
}

console.log(product);

// Write your `do...while` loop below this line:

i = 3;

do {
  console.log(num);
  num--;
} while (num >= i);

/* Task 4 ------------------------------------------------------------------ */

// I've added the necessary parameter
function func1(n) {
  return n + 10;
}

//I've changed the assignment for the return
function func2(n) {
  return n * n;
}

// I've defined the necessary parameters and the logic of the method
function func3(name, location) {
  return `Hello ${name} from ${location}`;
}

// I've changed the return variable, instead of n I return m
function func4(n) {
  n = n * 42;
  let m = n / 10;
  m = m + " is a pretty big number";
  return m;
}

// I've added the necessary parameters of both cities
function func5(city1, city2) {
  return "First we take " + city1 + " then we take " + city2;
}

// I've corrected mistake with method name
function func6(n) {
  n = "Double of " + n + " is " + n * 2;
  return n;
}

// Do not modify anything in the console.log lines below!
// But uncomment them to check your results.

// expected 23, got error :(
console.log(func1(13));

// expected 25, got undefined :(
console.log(func2(5));

// expected 'Hello Mike from London', got undefined :(
console.log(func3("Mike", "London"));

// expected '63 is a pretty big number', got number 630 :(
console.log(func4(15));

// expected 'First we take Manhattan then we take Berlin', got error :(
console.log(func5("Manhattan", "Berlin"));

// expected 'Double of 7 is 14', got error :(
console.log(func6(7));

/* Task 5 ------------------------------------------------------------------ */

const numbers = [1, 2, 3, 4, 5];
const days = new Array(
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
);
const mixed = [
  Date.now(),
  "New York",
  6.62607004,
  [["Paris", "Rome"]],
  { a: 97, e: 101, i: 105 },
  numbers,
];
const years = [1978, 2021, 1657, 2301, 1867, 2008];

// Replace the `null`s in the code below with your one-liners:
console.log(days);
console.log(mixed[2]);
console.log(numbers[numbers.length - 1]);
console.log(mixed[4].e);
console.log(mixed[3][0][0]);

// Replace the `null`s in the code below (do not add any new line):
const tuesdayToFriday = days.slice(1, 5);
console.log(tuesdayToFriday);
const sortedDays = days.sort();
console.log(sortedDays);
const number = Number(numbers.join(""));
console.log(number);
const maxYear = Math.max(...years);
console.log(maxYear);

// Today is Friday
// Today is Monday
// Today is Saturday
// Today is Sunday
// Today is Thursday
// Today is Tuesday
// Today is Wednesday
// Write your `for` loop below this line:
for (const day of sortedDays) {
  console.log(`Today is ${day}`);
}

/* Task 6 ------------------------------------------------------------------ */

const laptop = {
  brand: "Apple",
  model: "MacBook Pro",
  os: "macOS Sonoma",
  year: 2022,
  memory: "16 GB",
  processor: "3 GHz Dual-Core Intel Core i7",
  apps: ["Visual Studio Code", "Xcode", "Dropbox", "Magnet"],
  owner: {
    name: "Albert",
    phone: "678901234",
  },
};

// Replace the `null`s in the code below with your one-liners:
console.log(laptop.os);
console.log(laptop.year + 10);
console.log(laptop.apps[laptop.apps.length - 1]);
console.log(laptop.owner.phone);

// Write your code to change some properties below this line:
laptop.memory = "32 GB";
laptop.apps.push("Spotify");
laptop.apps.push("Docker");
laptop.apps = laptop.apps.slice(1);
laptop.owner.name = "Oscar";

// brand property has value Apple
// model property has value MacBook Pro
// os property has value macOS Sonoma
// year property has value 2022
// memory property has value 32 GB
// processor property has value 3 GHz Dual-Core Intel Core i7
// apps property is an array with 5 elements
// owner property is an object with 2 fields
// Write your `for` loop below this line:

for (const key in laptop) {
  const value = laptop[key];

  if (value instanceof Array) {
    console.log(`${key} property is an array with ${value.length} elements`);
  } else if (typeof value === "object" && value !== null) {
    console.log(
      `${key} property is an object with ${Object.keys(value).length} fields`
    );
  } else {
    console.log(`${key} property has value ${value}`);
  }
}

/* Task 7 ------------------------------------------------------------------ 

1. Check if a variable is a number:
Number.isFinite(42) // true

2. Replace all occurrences of a substring:
"abracadabraabracadabra".replace(/abracadabra/g, "ibricidibri") // "ibricidibriibricidibri"

3. Get month of a date
new Date().getMonth() + 1 // returns current month (1-12)

4. Convert string to lowercase
"Hello World".toLowerCase() // "hello world"

5. Get ISO date representation
new Date().toISOString() // "2025-07-21T12:00:00.000Z"

6. Get square of array numbers
[1, 2, 3].map(n => n * n) // [1, 4, 9]

7. Filter anything (example with greater 3 numbers)
[1, 2, 3, 4, 5].filter(n => n > 3) // [4, 5]
-------------------------------------------------------------------------- */
