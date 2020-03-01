const main = document.querySelector('main');
const voiceSelect = document.querySelector('#voices');
const textarea = document.querySelector('#text');
const readBtn = document.querySelector('#read');
const toggleBtn = document.querySelector('#toggle');
const closeBtn = document.querySelector('#close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

// loop through the array and call the createBox function for each item. (ForEach can take item, index and the array)
data.forEach(createBox);

// Create speech boxes
// what we want to do with this function is create the boxes on the page
// first we create a containing div
// then we use destructuring to get the image and text properties from the item being passed
// then we create the innerHTML for the box by adding  th markup and two properties
// then we take this newly created html and add it to the main div on the page (appendChild)
function createBox(item) {
  // console.log(item);
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}">
    <p class="info">${text}</p>
  `;

  // adding a speak event
  // when we click, it will run functions to set the text and speak the text
  box.addEventListener('click', () => {
  setTextMessage(text);
  speakText();

  // Add active effect by setting a class for .8 seconds
  box.classList.add('active');
  setTimeout(() => box.classList.remove('active'), 800);
});

  main.appendChild(box);
}

// Initialize speech synth
// SpeechSynthisUtterance is from the API and we're creating a new instance of the object
const message = new SpeechSynthesisUtterance();

// Store voices
// see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis for more information
let voices = [];

// speechSynthesis.getVoices() comes from the API
// then we loop through each of the voices and add name and language
// then add to the options html of the page
function getOurVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `
      ${voice.name} ${voice.lang};
    `;

    voiceSelect.appendChild(option);
  });
}

// Set text
// add the text property of the messages object
function setTextMessage(text) {
  message.text = text;
}

// Speak the text
// using the API, giving it the message
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
// change the voice property of the message object to the current value chosen in the dropdown
// this uses the .find() method
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Event Listeners

// Toggle text box on and off the screen
toggleBtn.addEventListener('click', () => document.querySelector('#text-box').classList.toggle('show'));
// Close text box with the X button
closeBtn.addEventListener('click', () => document.querySelector('#text-box').classList.remove('show'));

// Voices Changed
// run getOurVoices() function whenever select box changes
speechSynthesis.addEventListener('voiceschanged', getOurVoices);

// Change voice
// when select dropdown for voices is changes, run the setVoice() function
voiceSelect.addEventListener('change', setVoice);

// Read text button
// listen for Read text button
// when clicked, set the message to the textarea.value, running it in the setTextMessage() function
// then run speakText() to speak it
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getOurVoices();
