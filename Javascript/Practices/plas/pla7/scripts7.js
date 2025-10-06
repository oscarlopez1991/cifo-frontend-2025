/*
  .__                              __                 __   
  |__| _____ ______   ____________/  |______    _____/  |_ 
  |  |/     \\____ \ /  _ \_  __ \   __\__  \  /    \   __\
  |  |  Y Y  \  |_> >  <_> )  | \/|  |  / __ \|   |  \  |  
  |__|__|_|  /   __/ \____/|__|   |__| (____  /___|  /__|  
          \/|__|                           \/     \/      

   Use Live Server and Go Live to run your web application, 
   DO NOT just open index7.html file using your browser.
*/

/* DOMContentLoaded ----------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // CREATE FUNCTIONS WITH THESE NAMES IN YOUR CODE AND THEN UNCOMMENT THESE LINES TO RUN THEM
  ajaxWeather(); // Task 3
  fetchPokemon(); // Task 4 - fair use policy!!!
  fetchDataFromFile('books7.json'); // Task 5
  // fetchDataFromFile('not-found.json'); // Task 5
  fetchCors(); // Task 6
});

/* Task 1 --------------------------------------------------------------------------------------- */

/* This is a line with exactly 100 characters --------------------------------------------------- */

/**
 * The question about CORS:
 * Your answer here...
 * CORS problems only appear in the browser because it enforces security rules. Before sending a
 * cross-origin request, the browser makes a small preflight request to check if the server allows
 * it. If not, the browser blocks the call.
 * Postman or the REST Client are not browsers, so they skip this step and just send the HTTP
 * request directly, without checking CORS.
 */

/**
 * The question about promises:
 * Your answer here...
 * Option 1: .then() and .catch() methods:
 * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
 * Option 2: async/await syntax:
 * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
 * Both options are valid. The second one is syntactic sugar over the first one, making the code
 * easier to read and write, especially when dealing with multiple asynchronous operations.
 * Dev community prefers async/await for its simplicity and readability.
 */

/**
 * The question about HTTP response status codes:
 * Your answer here...
 * 200 OK: The request has succeeded. The meaning of the success depends on the HTTP method.
 * 201 Created: The request has been fulfilled and has resulted in one or more new resources being created.
 * 204 No Content: The server has successfully processed the request and is not returning any content.
 * 301 Moved Permanently: The requested resource has been assigned a new permanent URI.
 * 401 Unauthorized: The request requires user authentication.
 * 404 Not Found: The server has not found anything matching the Request-URI.
 * 503 Service Unavailable: The server is currently unable to handle the request due to temporary
 * overloading or maintenance of the server.
 * (https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
 */

/* Task 2 --------------------------------------------------------------------------------------- */

const googleMaps = {
  markers: [
    {
      name: 'Rixos The Palm Dubai',
      location: {
        lat: 25.1212,
        long: 55.1535,
      },
    },
    {
      name: 'Shangri-La Hotel',
      location: {
        lat: 25.2084,
        long: 55.2719,
      },
    },
    {
      name: 'Grand Hyatt',
      location: {
        lat: 25.2285,
        long: 55.3273,
      },
    },
  ],
};

const database = [
  {
    _id: {
      $oid: '5968dd23fc13ae04d94561',
    },
    product_name: 'sildenafil citrate',
    supplier: 'Wisozk Inc',
    quantity: 261,
    unit_cost: '$10.47',
  },
  {
    _id: {
      $oid: '5968dd23fc13ae04d92342',
    },
    product_name: 'Mountain Juniperus ashei',
    supplier: 'Keebler-Hilpert',
    quantity: 292,
    unit_cost: '$8.74',
  },
  {
    _id: {
      $oid: '5968dd23fc13ae04d92403',
    },
    product_name: 'Dextromathorphan HBr',
    supplier: 'Schmitt-Weissnat',
    quantity: 211,
    unit_cost: '$20.53',
  },
];

const youtube = {
  kind: 'youtube#searchListResponse',
  etag: '"m2yskBQFythfE4irbTIeOgYYfBU/PaiEDiVxOyCWelLPuuwa9LKz3Gk"',
  nextPageToken: 'CAUQAA',
  regionCode: 'KE',
  pageInfo: { totalResults: 4249, resultsPerPage: 5 },
  items: [
    {
      kind: 'youtube#searchResult',
      etag: '"m2yskBQFythfE4irbTIeOgYYfBU/QpOIr3QKlV5EUlzfFcVvDiJT0hw"',
      id: { kind: 'youtube#channel', channelId: 'UCJowOS1R0FnhipXVqEnYU1A' },
    },
    {
      kind: 'youtube#searchResult',
      etag: '"m2yskBQFythfE4irbTIeOgYYfBU/AWutzVOt_5p1iLVifyBdfoSTf9E"',
      id: { kind: 'youtube#video', videoId: 'Eqa2nAAhHN0' },
    },
    {
      kind: 'youtube#searchResult',
      etag: '"m2yskBQFythfE4irbTIeOgYYfBU/2dIR9BTfr7QphpBuY3hPU-h5u-4"',
      id: { kind: 'youtube#video', videoId: 'IirngItQuVs' },
    },
  ],
};

/* Task 2 solution ------------------------------------------------------------------------------ */

// 1. The latitude of the place named Grand Hyatt
const grandHyattMarker = googleMaps.markers.find((marker) => marker.name === 'Grand Hyatt');
console.log(grandHyattMarker.location.lat);

// 2. The name of the place with the highest longitude value
const highestLongitudeMarker = googleMaps.markers.reduce((max, current) =>
  current.location.long > max.location.long ? current : max,
);
console.log(highestLongitudeMarker.name);

// 3. The supplier name of the product with an identifier that includes the string 9234
const productWith9234 = database.find((product) => product._id.$oid.includes('9234'));
console.log(productWith9234.supplier);

// 4. The identifier of all products that have more than 250 units in stock
const productsOver250 = database.filter((product) => product.quantity > 250);
productsOver250.forEach((product) => console.log(product._id.$oid));

// 5. The text using template literals retrieving the values
console.log(
  `Hi ha un total de ${youtube.pageInfo.totalResults} resultats i se'n mostren ${youtube.pageInfo.resultsPerPage} per pàgina`,
);

// 6. The videoId identifier value of the first video type element
const firstVideo = youtube.items.find((item) => item.id.kind === 'youtube#video');
console.log(firstVideo.id.videoId);

/* Task 3 --------------------------------------------------------------------------------------- */

// Use these constants to build your final endpoint.
// You will need four parameters (timezone is already provided, you need to add the other three).
const apiUrl = 'https://api.open-meteo.com/v1/forecast?timezone=Europe/Madrid';
const latitude = 41.60594;
const longitude = 1.039171;

/* Task 3 solution ------------------------------------------------------------------------------ */

function ajaxWeather() {
  // Build the complete endpoint URL with all required parameters
  const finalUrl = `${apiUrl}&latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&forecast_days=4`;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', finalUrl, true);

  // Set up event handler for when the request completes
  xhr.onreadystatechange = function () {
    // Check if request is complete (readyState 4) and successful (status 200)
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        const weatherData = JSON.parse(xhr.responseText);

        // 1. Show elevation of Preixana above sea level
        console.log(weatherData.elevation);

        // 2. Show array with minimum temperature forecast for next 4 days in Celsius
        console.log(weatherData.daily.temperature_2m_min);
      } catch (error) {
        console.error('Error parsing JSON response:', error);
      }
    } else if (xhr.readyState === 4) {
      // Request completed but with error
      console.error('Request failed with status:', xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error('Network error occurred');
  };

  xhr.send();
}

/* Task 4 --------------------------------------------------------------------------------------- */

const pokeapiEndpoint = 'https://pokeapi.co/api/v2/pokemon?offset=500&limit=50';

/* Task 4 solution ------------------------------------------------------------------------------ */

function fetchPokemon() {
  fetch(pokeapiEndpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Filter Pokemon names that include the letter "p"
      const pokemonWithP = data.results
        .filter((pokemon) => pokemon.name.includes('p'))
        .map((pokemon) => pokemon.name);

      // Show the array of names (should be more than 10 and less than 20)
      console.log(pokemonWithP);
    })
    .catch((error) => {
      console.error('Error fetching Pokemon data:', error);
    });
}

/* Task 5 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 5 solution ------------------------------------------------------------------------------ */

async function fetchDataFromFile(filename) {
  try {
    // Fetch the JSON file using await
    const response = await fetch(filename);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Convert response to JavaScript objects and store in data variable
    const data = await response.json();

    // Calculate total cost of buying two copies of each book structure iteration
    const totalCost = data.reduce((sum, book) => sum + book.price * 2, 0);

    // Show the exact amount with two decimal places
    console.log(totalCost.toFixed(2));
  } catch (error) {
    console.error(`Error fetching data from ${filename}:`, error);
  }
}

/* Task 6 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 6 solution ------------------------------------------------------------------------------ */

function fetchCors() {
  // CORS API
  const apiUrlWithoutCors = 'http://uselessfacts.jsph.pl/random.json?language=en';

  // Proxy URL using corsproxy.io as recommended in the PDF
  const proxyUrl = 'https://corsproxy.io/?';
  const apiUrlWithProxy = proxyUrl + encodeURIComponent(apiUrlWithoutCors);

  console.log('=== CORS Demonstration ===');

  // 1. First, show that the API has CORS problems
  console.log('1. Attempting direct call to API (this will fail due to CORS):');
  console.log('URL:', apiUrlWithoutCors);

  fetch(apiUrlWithoutCors)
    .then((response) => response.json())
    .then((data) => {
      console.log('Direct call succeeded (unexpected):', data);
    })
    .catch((error) => {
      console.error('❌ CORS Error (as expected):', error.message);
      console.log('The browser blocked this request due to CORS policy');

      // 2. Now show how to solve it using a proxy
      console.log('\n2. Using CORS proxy to solve the problem:');
      console.log('Proxy URL:', apiUrlWithProxy);

      return fetch(apiUrlWithProxy);
    })
    .then((response) => {
      if (response) {
        return response.json();
      }
    })
    .then((data) => {
      if (data) {
        console.log('✅ Success with proxy!');
        console.log('Random fact:', data.text);
        console.log('Full response:', data);
      }
    })
    .catch((error) => {
      console.error('Proxy request also failed:', error);
    });
}
