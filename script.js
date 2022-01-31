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
// const h1 = document.querySelector('h1');

// 1. addeventlistener allows us to add multiple event listeners to the same event
// 2. allows us to remove an event handler we don't need anymore
// const logH1 = function(e) {
//   console.log(e);
//   console.log(e.target);

//   //   h1.removeEventListener('mouseenter', logH1);
// };

// h1.addEventListener('mouseenter', logH1);

// setTimeout(() => h1.removeEventListener('mouseenter', logH1), 3000);

// Generate random color rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

// Event Propagtation
// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   e.preventDefault();
//   //   this === e.currentTarget
//   console.log('LINK', e.target, e.currentTarget);
//   this.style.background = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   //   this === e.currentTarget
//   console.log('CONTAINER', e.target, e.currentTarget);
//   this.style.background = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function(e) {
//   //   this === e.currentTarget
//   console.log('NAV', e.target, e.currentTarget);
//   this.style.background = randomColor();
// });

// Event Delegation - Smooth Page Navigation

// 1. add eventlistener to common parent element
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();
  console.log(e.target);
  //   Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// 1. determine what element originiated the event

// const navLinks = document.querySelector('.nav__link');
// console.log(navLinks);

// navLinks.forEach((link, i) =>
//   link.addEventListener('click', function(e) {
//     e.preventDefault();
//     console.log(e);
//     console.log(e.target);
//     console.log(e.currentTarget); //=this
//     // const sections = document.querySelectorAll(`#section--${i + 1}`);
//     // console.log(sections);
//     // sections[0].scrollIntoView({ behavior: 'smooth' });
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

// DOM Traversing - tabbed component

const tabs = document.querySelectorAll('.operations__tab');
console.log(tabs);
const tabsContainer = document.querySelector('.operations__tab-container');
console.log(tabsContainer);
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  // closest operations tab, to solve problem of click on span
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  // ignore clicks on tabscontainer
  // Guard Close
  // null = falsy value
  if (!clicked) return;

  // remove active on all before adding to one
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // activate content area
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Intersection Observer API
// entries array of thresholds
const obsCallback = function(entries, observer) {
  entries.forEach(entry => entry);
};

const obsOptions = {
  // viewport
  root: null,
  // section1 intersecting viewport at 10%
  threshold: [0, 0.2]
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

// Lazy Loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));
