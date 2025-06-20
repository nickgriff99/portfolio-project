const slides = document.querySelectorAll('.review-item');
const buttons = document.querySelectorAll('.slide-ctrl-container button');

let current = Math.floor(Math.random() * slides.length);
let next = current < slides.length - 1 ? current + 1 : 0;
let previous = current > 0 ? current - 1 : slides.length - 1;

const update = () => {
  slides.forEach((slide) => {
    slide.classList.remove('active', 'next', 'previous');
  })
  slides[current].classList.add('active');
  slides[previous].classList.add('previous');
  slides[next].classList.add('next');
};

const goToNumber = (number) => {
  current = number;
  next = current < slides.length - 1 ? current + 1 : 0;
  previous = current > 0 ? current - 1 : slides.length - 1;
  update();
};

const goToNext = () => { current < slides.length - 1 ? goToNumber(current + 1) : goToNumber(0) };
const goToPrev = () => { current > 0 ? goToNumber(current - 1) : goToNumber(slides.length - 1)};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => i === 0 ? goToPrev() : goToNext());
};

update();

