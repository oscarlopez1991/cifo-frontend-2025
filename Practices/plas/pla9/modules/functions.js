// This is a file with some related functions.
// We can use them from other JavaScript files because we `export` them at the end.

function addOne(x) {
  return x + 1;
}

const addTwo = (x) => x + 2;

const addThree = function (x) {
  return x + 3;
};

export { addOne, addTwo, addThree };

// Please note `addOne`, `addTwo` and `addThree` are functions.
// We have used different syntaxes simply to demonstrate their usage.
