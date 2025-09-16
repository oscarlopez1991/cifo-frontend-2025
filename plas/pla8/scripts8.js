/* Task 1 --------------------------------------------------------------------------------------- */

function testCdn() {
  const p = $('#cdn');
  p.text(p.text() + new Date().getFullYear());
}

/* Task 1 solution ------------------------------------------------------------------------------ */

// There is nothing to do here. For this task you only need to add something to index8.html.

/* Task 2 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 2 solution ------------------------------------------------------------------------------ */

// Add class killed to id "task21" of element bill in index8.html
$('#task21 li:contains("Bill")').addClass('killed');
// Remove killed class of list id "task22" elements in index8.html
$('#task22 li').removeClass('killed');

/* Task 3 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 3 solution ------------------------------------------------------------------------------ */

/* Task 3 solution ------------------------------------------------------------------------------ */

// Variable to track the state of body background color
let isBodyToggled = false;

$('#task3')
  .on('mouseenter', function () {
    // On hover, randomly set color to #0909
    if (Math.random() > 0.5) {
      $(this).css('background-color', '#0909');
    }
  })
  .on('mouseleave', function () {
    // On mouse leave, restart color (#9009)
    $(this).css('background-color', '#9009');
  })
  .on('click', function () {
    // On click, toggle body background between #9009 and #fff
    const backgroundColor = isBodyToggled ? '#fff' : '#9009';
    $('body').css('background-color', backgroundColor);

    // Flip the state for the next click
    isBodyToggled = !isBodyToggled;
  });

/* Task 4 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 4 solution ------------------------------------------------------------------------------ */

function ajaxPokemon() {
  const pokemonName = 'charmeleon';
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  $.ajax({
    url: apiUrl,
    method: 'GET',
    success: function (data) {
      // The raw abilities array from the API
      const abilitiesArray = data.abilities;

      // Convert the JavaScript array of objects into a formatted JSON string
      // The third argument '2' makes it nicely indented and readable
      const abilitiesJSON = JSON.stringify(abilitiesArray, null, 2);

      // Display the formatted JSON string directly in the .task4 div
      $('.task4').text(abilitiesJSON);
    },
    error: function (xhr, status, error) {
      // Log an error message if the request fails
      $('.task4').text(`Failed to fetch Pokémon data: ${status} ${error}`);
    },
  });
}

/* Task 5 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 5 solution ------------------------------------------------------------------------------ */

/* DOMContentLoaded ----------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  testCdn();
  ajaxPokemon();
});
