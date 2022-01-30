'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Implement smoorth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //   Elemebt that was clicked
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth'
  //   });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Types of events and Event Handlers
const h1 = document.querySelector('h1');

// 1. addeventlistener allows us to add multiple event listeners to the same event
// 2. allows us to remove an event handler we don't need anymore
const logH1 = function(e) {
  console.log(e);
  console.log(e.target);

  //   h1.removeEventListener('mouseenter', logH1);
};

h1.addEventListener('mouseenter', logH1);

setTimeout(() => h1.removeEventListener('mouseenter', logH1), 3000);

// Generate random color rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

// Event Propagtation
document.querySelector('.nav__link').addEventListener('click', function(e) {
  e.preventDefault();
  //   this === e.currentTarget
  console.log('LINK', e.target, e.currentTarget);
  this.style.background = randomColor();
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  //   this === e.currentTarget
  console.log('CONTAINER', e.target, e.currentTarget);
  this.style.background = randomColor();
});

document.querySelector('.nav').addEventListener('click', function(e) {
  //   this === e.currentTarget
  console.log('NAV', e.target, e.currentTarget);
  this.style.background = randomColor();
});
