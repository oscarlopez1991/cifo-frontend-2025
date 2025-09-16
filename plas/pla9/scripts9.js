/*
  .__                              __                 __   
  |__| _____ ______   ____________/  |______    _____/  |_ 
  |  |/     \\____ \ /  _ \_  __ \   __\__  \  /    \   __\
  |  |  Y Y  \  |_> >  <_> )  | \/|  |  / __ \|   |  \  |  
  |__|__|_|  /   __/ \____/|__|   |__| (____  /___|  /__|  
          \/|__|                           \/     \/      

   DO NOT modify anything on provided code!!!
*/

/* Task 1 provided code (do NOT modify anything) ------------------------------------------------ */

const artists = [
  { name: 'Michael Jackson', art: 'music' },
  { name: "Ronnie O'Sullivan", art: 'snooker' },
  { name: 'Billy Wilder', art: 'cinema' },
];

function chooseBetween(artist1, artist2) {
  console.log(Math.random() < 0.5 ? artist1.name : artist2.name);
}

console.log('Task 1 ---------------------------------------');

const [a1, a2, a3] = artists;
const { name, art } = a2;
console.log(a1);
console.log(name);
console.log(art);

/* Task 1 solution ------------------------------------------------------------------------------ */

// The next line does not work as expected, uncomment & fix it!
chooseBetween(...artists);

/* Task 2 provided code (do NOT modify anything) ------------------------------------------------ */

console.log('Task 2 ---------------------------------------');

// Part 2.1
document.querySelector('.buttons').addEventListener('click', changeBackground);
document.querySelectorAll('.btn').forEach((b) => (b.style.backgroundColor = b.textContent));

// Part 2.2
function changeBackground(e) {
  if (e.target.classList.contains('btn')) {
    document.body.style.background = e.target.textContent + '6';
    saveBackgroundColor();
    e.preventDefault();
  }
}

console.log('Setup done');

/* Task 2 solution ------------------------------------------------------------------------------ */

function saveBackgroundColor() {
  // Get the current background color from the body's inline style
  const currentBackgroundColor = document.body.style.background;
  // Save it to localStorage with a specific key
  localStorage.setItem('userBackgroundColor', currentBackgroundColor);
}

// This function will run when the page loads to check for a saved color
function loadAndApplyBackgroundColor() {
  // Retrieve the saved color from localStorage using the same key
  const savedColor = localStorage.getItem('userBackgroundColor');

  // If a color was found in localStorage, apply it to the body
  if (savedColor) {
    document.body.style.background = savedColor;
  }
}

// Run the function to apply the saved color as soon as the script loads
loadAndApplyBackgroundColor();

/* Task 3 provided code (do NOT modify anything) ------------------------------------------------ */

console.log('Task 3 ---------------------------------------');

// We import Person from person.js.
// We usually add all our `import` at the top of the file.
import { Person } from './modules/person.js';

const albert = new Person('Albert', new Date(1992, 4, 20), 'male', 'programming');
console.log(albert.greet());
albert.updateHobby('playing ukelele');
console.log(albert.greet());

// We import three functions from functions.js.
// We usually add all our `import` at the top of the file.
import { addOne, addTwo, addThree } from './modules/functions.js';

console.log('42 + 1 is ' + addOne(42));
console.log('42 + 2 is ' + addTwo(42));
console.log('42 + 3 is ' + addThree(42));

/* Task 3 solution ------------------------------------------------------------------------------ */

/* Task 4 provided code (do NOT modify anything) ------------------------------------------------ */

const people = [
  {
    _id: '618526665bdb617604ca3532',
    index: 0,
    guid: 'eca511a1-b81c-44bc-826c-7c5c100d673a',
    isActive: true,
    balance: '$2,612.22',
    picture: 'http://placehold.it/32x32',
    age: 22,
    eyeColor: 'green',
    name: 'Sabrina Ferrell',
    gender: 'female',
    company: 'SOLGAN',
    email: 'sabrinaferrell@solgan.com',
    phone: '+1 (855) 475-3741',
    address: '801 Florence Avenue, Clay, Delaware, 8032',
    about:
      'Eu duis nulla excepteur fugiat exercitation deserunt eiusmod cillum ipsum. Eiusmod tempor aliquip aliqua id do minim cillum aliquip magna aliqua nostrud est elit. Sint nisi id ad adipisicing nostrud esse cupidatat ut cupidatat. Reprehenderit deserunt esse cupidatat velit nulla nostrud. Id deserunt id enim aliqua aliquip consequat ex tempor cillum aliqua nostrud.\r\n',
    registered: '2019-01-28T05:30:48 -01:00',
    latitude: -32.765384,
    longitude: 168.409665,
    tags: ['dolor', 'consectetur', 'minim', 'id', 'ex', 'enim', 'irure'],
    friends: [
      {
        id: 0,
        name: 'Silvia Peck',
      },
      {
        id: 1,
        name: 'Adela Jones',
      },
      {
        id: 2,
        name: 'Daugherty Sandoval',
      },
    ],
    greeting: 'Hello, Sabrina Ferrell! You have 10 unread messages.',
    favoriteFruit: 'banana',
  },
  {
    _id: '61852666fc81a9bf06a9889e',
    index: 1,
    guid: '6a2454bb-ca69-4fd5-b039-67baf3342a62',
    isActive: true,
    balance: '$1,530.47',
    picture: 'http://placehold.it/32x32',
    age: 24,
    eyeColor: 'green',
    name: 'Moody Callahan',
    gender: 'male',
    company: 'KRAGGLE',
    email: 'moodycallahan@kraggle.com',
    phone: '+1 (934) 495-3090',
    address: '111 Cropsey Avenue, Chesapeake, Vermont, 3558',
    about:
      'Commodo et do fugiat sunt consectetur non esse cillum tempor officia mollit. Est adipisicing est officia sint ad aliquip mollit laborum. Exercitation occaecat exercitation commodo occaecat quis irure.\r\n',
    registered: '2017-06-24T01:12:39 -02:00',
    latitude: -46.989353,
    longitude: 127.485427,
    tags: ['ipsum', 'ullamco', 'deserunt', 'veniam', 'eu', 'eiusmod', 'in'],
    friends: [
      {
        id: 0,
        name: 'Quinn Gould',
      },
      {
        id: 1,
        name: 'Christian Noel',
      },
    ],
    greeting: 'Hello, Moody Callahan! You have 7 unread messages.',
    favoriteFruit: 'strawberry',
  },
  {
    _id: '61852666fe1204edb94ee0bc',
    index: 2,
    guid: '6b46e2e8-ee42-4c23-9442-a893c4ec30d3',
    isActive: false,
    balance: '$1,554.18',
    picture: 'http://placehold.it/32x32',
    age: 39,
    eyeColor: 'brown',
    name: 'Hurley Lowe',
    gender: 'male',
    company: 'SECURIA',
    email: 'hurleylowe@securia.com',
    phone: '+1 (929) 435-3330',
    address: '402 Elliott Place, Berlin, Alaska, 496',
    about:
      'Minim id nostrud irure amet dolore irure pariatur in ullamco commodo amet cupidatat ex. Laborum reprehenderit consequat dolore nostrud consectetur exercitation aliquip. Do anim dolore consequat aliqua consequat ullamco ad nostrud magna in Lorem duis anim occaecat. Velit excepteur ex proident pariatur do fugiat enim culpa consectetur. Culpa ipsum et quis duis officia laboris et. Proident reprehenderit exercitation et consequat minim pariatur elit ad cillum. Labore mollit ipsum nulla commodo culpa sit magna incididunt est tempor aliqua.\r\n',
    registered: '2016-10-07T12:00:37 -02:00',
    latitude: -64.001813,
    longitude: -14.577866,
    tags: ['ullamco', 'et', 'nisi', 'dolor', 'velit', 'in', 'est'],
    friends: [
      {
        id: 0,
        name: 'Roberson Mcbride',
      },
      {
        id: 1,
        name: 'Jeanie Stafford',
      },
      {
        id: 2,
        name: 'Wiley Camacho',
      },
      {
        id: 3,
        name: 'Alvarez Preston',
      },
    ],
    greeting: 'Hello, Hurley Lowe! You have 5 unread messages.',
    favoriteFruit: 'apple',
  },
  {
    _id: '61852666e8b612b1ba72dc60',
    index: 3,
    guid: 'd6db0561-9a5a-4a03-b54a-70baecbecbd8',
    isActive: true,
    balance: '$2,189.39',
    picture: 'http://placehold.it/32x32',
    age: 25,
    eyeColor: 'blue',
    name: 'Jennifer Fitzpatrick',
    gender: 'female',
    company: 'BRAINQUIL',
    email: 'jenniferfitzpatrick@brainquil.com',
    phone: '+1 (927) 468-3335',
    address: '211 Richardson Street, Convent, Virginia, 9298',
    about:
      'Pariatur sit commodo qui dolor. Aliqua eiusmod fugiat ea in anim id velit. Ipsum magna ad anim nulla officia amet incididunt Lorem et proident. Ad nostrud adipisicing incididunt esse dolor tempor tempor in anim.\r\n',
    registered: '2017-07-20T11:48:14 -02:00',
    latitude: 68.50313,
    longitude: -78.332247,
    tags: ['aliquip', 'cupidatat', 'anim', 'cupidatat', 'quis', 'nostrud', 'velit'],
    friends: [
      {
        id: 0,
        name: 'Mccall Bass',
      },
      {
        id: 1,
        name: 'Ballard Schultz',
      },
      {
        id: 2,
        name: 'Castro Brennan',
      },
    ],
    greeting: 'Hello, Jennifer Fitzpatrick! You have 7 unread messages.',
    favoriteFruit: 'banana',
  },
  {
    _id: '61852666a626715247e78802',
    index: 4,
    guid: 'd48d3a5a-40a9-4919-8b42-c7e591f96226',
    isActive: false,
    balance: '$3,957.23',
    picture: 'http://placehold.it/32x32',
    age: 35,
    eyeColor: 'brown',
    name: 'Mosley Stark',
    gender: 'male',
    company: 'CALLFLEX',
    email: 'mosleystark@callflex.com',
    phone: '+1 (921) 417-2413',
    address: '858 Jefferson Avenue, Connerton, New York, 3782',
    about:
      'Non veniam amet magna ullamco. Ea aliquip adipisicing quis tempor fugiat. Adipisicing sint tempor irure deserunt magna eu. Laborum aliquip ex eiusmod sit irure aute enim irure eu pariatur dolore. Non anim ex nostrud et veniam nulla.\r\n',
    registered: '2019-06-03T01:44:18 -02:00',
    latitude: 75.361624,
    longitude: -87.887992,
    tags: ['mollit', 'qui', 'ullamco', 'adipisicing', 'aliqua', 'elit', 'ex'],
    friends: [
      {
        id: 0,
        name: 'Velazquez Lloyd',
      },
      {
        id: 1,
        name: 'Janice White',
      },
      {
        id: 2,
        name: 'Lane Beck',
      },
      {
        id: 1,
        name: 'Jeanie Stafford',
      },
      {
        id: 2,
        name: 'Wiley Camacho',
      },
      {
        id: 3,
        name: 'Alvarez Preston',
      },
    ],
    greeting: 'Hello, Mosley Stark! You have 1 unread messages.',
    favoriteFruit: 'strawberry',
  },
  {
    _id: '61852666ba64a184beb95aa7',
    index: 5,
    guid: '14acef4e-c22f-496b-89e4-7a89a00c15df',
    isActive: false,
    balance: '$1,804.14',
    picture: 'http://placehold.it/32x32',
    age: 27,
    eyeColor: 'brown',
    name: 'Haley Joyce',
    gender: 'male',
    company: 'SINGAVERA',
    email: 'haleyjoyce@singavera.com',
    phone: '+1 (955) 429-2602',
    address: '195 Harwood Place, Warren, Wyoming, 2436',
    about:
      'Ex veniam qui minim cillum cupidatat veniam est cupidatat quis consequat sint. Exercitation exercitation consectetur laboris aliquip aliquip proident enim voluptate aliquip. Occaecat magna consequat consectetur ea sunt ut exercitation minim deserunt nostrud. Excepteur eiusmod voluptate esse ea anim deserunt tempor duis.\r\n',
    registered: '2015-02-10T10:27:26 -01:00',
    latitude: 18.458962,
    longitude: 60.233935,
    tags: ['ipsum', 'culpa', 'incididunt', 'irure', 'minim', 'ad', 'deserunt'],
    friends: [],
    greeting: 'Hello, Haley Joyce! You have 5 unread messages.',
    favoriteFruit: 'apple',
  },
  {
    _id: '6185266642fe1c64af3e4b48',
    index: 6,
    guid: '7f1556db-e8c6-4f02-854c-0fcf128c1cda',
    isActive: true,
    balance: '$1,432.32',
    picture: 'http://placehold.it/32x32',
    age: 35,
    eyeColor: 'brown',
    name: 'Ratliff Bartlett',
    gender: 'male',
    company: 'BYTREX',
    email: 'ratliffbartlett@bytrex.com',
    phone: '+1 (880) 524-2624',
    address: '311 Frank Court, Whitestone, Utah, 3734',
    about:
      'Ipsum mollit fugiat velit fugiat excepteur et ut non. Et tempor incididunt sunt laborum minim ex voluptate elit exercitation fugiat et sit nisi. Pariatur quis voluptate voluptate culpa.\r\n',
    registered: '2015-04-29T02:56:30 -02:00',
    latitude: 54.059953,
    longitude: -119.372761,
    tags: ['officia', 'ex', 'cillum', 'aute', 'magna', 'magna', 'laboris'],
    friends: [
      {
        id: 0,
        name: 'Brandi Malone',
      },
      {
        id: 1,
        name: 'Hayes Newman',
      },
      {
        id: 2,
        name: 'Hunt Chavez',
      },
    ],
    greeting: 'Hello, Ratliff Bartlett! You have 8 unread messages.',
    favoriteFruit: 'banana',
  },
];

console.log('Task 4 ---------------------------------------');

/* Task 4 solution ------------------------------------------------------------------------------ */

const numberOfFriends = null; // replace null with your expression
console.log(numberOfFriends);

const emailDomains = null; // replace null with your expression
console.log(emailDomains);

const favoriteFruits = null; // replace null with your expression
console.log(favoriteFruits);

const averageAge = null; // replace null with your expression
console.log(averageAge);

const richPeople = null; // replace null with your expression
console.log(richPeople);
