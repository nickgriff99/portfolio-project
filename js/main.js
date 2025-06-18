const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

const root = document.documentElement;

const portfolioItems = [
  {
    id: 1,
    category: 'web',
    image: './assets/images/portfolio-1.jpg',
    type: 'Web Development',
    title: 'Food Website'
  },
  {
    id: 2,
    category: 'web',
    image: './assets/images/portfolio-2.jpg',
    type: 'Web Development',
    title: 'Skate Website'
  },
  {
    id: 3,
    category: 'web',
    image: './assets/images/portfolio-3.jpg',
    type: 'Web Development',
    title: 'Eating Website'
  },
  {
    id: 4,
    category: 'ui',
    image: './assets/images/portfolio-4.jpg',
    type: 'UI Design',
    title: 'Cool Design'
  },
  {
    id: 5,
    category: 'app',
    image: './assets/images/portfolio-5.jpg',
    type: 'App Development',
    title: 'Game App'
  },
  {
    id: 6,
    category: 'app',
    image: './assets/images/portfolio-6.jpg',
    type: 'App Development',
    title: 'Gambling App'
  },
  {
    id: 7,
    category: 'app',
    image: './assets/images/portfolio-7.jpg',
    type: 'App Development',
    title: 'Money App'
  },
  {
    id: 8,
    category: 'ui',
    image: './assets/images/portfolio-8.jpg',
    type: 'UI Design',
    title: 'Fantastic Design'
  }
];

const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

const filterLink = document.querySelectorAll(dataFilter);
const portfolioGrid = document.querySelector('.portfolio-grid');
const searchBox = document.querySelector('#search');

const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const createPortfolioCards = (items) => {
  portfolioGrid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.setAttribute('data-item', item.category);
    
    card.innerHTML = `
      <div class="card-body">
        <img src="${item.image}" alt="portfolio-icon">
        <a href="#" class="card-popup-box">
          <div>${item.type}</div>
          <h3>${item.title}</h3>
        </a>
      </div>
    `;
    
    portfolioGrid.appendChild(card);
  });
};

createPortfolioCards(portfolioItems);

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });
  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
};

toggleTheme.addEventListener('click', function() {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener('click', function() {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  })
};

searchBox.addEventListener('keyup', (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  const filteredItems = portfolioItems.filter(item => 
    item.title.toLowerCase().includes(searchInput) ||
    item.type.toLowerCase().includes(searchInput) ||
    item.category.toLowerCase().includes(searchInput)
  );
  createPortfolioCards(filteredItems);
});


for (const link of filterLink) {
  link.addEventListener('click', function() {
    setActive(this, '.filter-link');
    const filter = this.dataset.filter;
    
    if (filter === 'all') {
      createPortfolioCards(portfolioItems);
    } else {
      const filteredItems = portfolioItems.filter(item => item.category === filter);
      createPortfolioCards(filteredItems);
    }
  })
};

for (const elm of openModal) {
  elm.addEventListener('click', function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  })
};

for (const elm of closeModal) {
  elm.addEventListener('click', function () {
    this.parentElement.parentElement.classList.remove(isVisible);
  })
};

