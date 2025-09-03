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
  // ajaxWeather(); // Task 3
  // fetchPokemon(); // Task 4 - fair use policy!!!
  // fetchDataFromFile('books7.json'); // Task 5
  // fetchDataFromFile('not-found.json'); // Task 5
  // fetchCors(); // Task 6
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
 */

/**
 * The question about HTTP response status codes:
 * Your answer here...
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

/* Task 3 --------------------------------------------------------------------------------------- */

// Use these constants to build your final endpoint.
// You will need four parameters (timezone is already provided, you need to add the other three).
const apiUrl = 'https://api.open-meteo.com/v1/forecast?timezone=Europe/Madrid';
const latitude = 41.60594;
const longitude = 1.039171;

/* Task 3 solution ------------------------------------------------------------------------------ */

/* Task 4 --------------------------------------------------------------------------------------- */

const pokeapiEndpoint = 'https://pokeapi.co/api/v2/pokemon?offset=500&limit=50';

/* Task 4 solution ------------------------------------------------------------------------------ */

/* Task 5 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 5 solution ------------------------------------------------------------------------------ */

/* Task 6 --------------------------------------------------------------------------------------- */

// There is no initial provided code.

/* Task 6 solution ------------------------------------------------------------------------------ */
