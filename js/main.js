// селект header

document.querySelectorAll(".dropdown__simplebar").forEach(dropdown => {
  new SimpleBar(dropdown, {
    //* чтобы изначально ползунок был виден */
    autoHide: false,
    //* с помощью этого значения вы можете управлять высотой ползунка*/
    scrollbarMaxSize: 28,
  });
})

const btns = document.querySelectorAll(".undernav__btn");
const dropdowns = document.querySelectorAll(".dropdown");
const activeClassdropdowns = "dropdown__active";
const activeClassbtns = "btn__active";

btns.forEach(item => {
  item.addEventListener("click", function () {
    let DropThis = this.parentElement.querySelector(".dropdown");
    dropdowns.forEach(el => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns)
      }
    });
    btns.forEach(el => {
      if (el != this) {
        el.classList.remove(activeClassbtns)
      }
    });
    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);
  })
})

// галлерея

// селект

const element = document.querySelector('.filter__select');
const choices = new Choices(element, {
  searchEnabled: false,//убрали строку поиска
  itemSelectText: '',// убрали подсказку фокуска в списке
  shouldSort: false
});

// слайдер

// Галерея

const swiperGallery = new Swiper('.swiper-gallery', {
  loop: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 50,
  //Брейкпоинт
  breakpoints: {
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    },
    576: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
  },
  // If we need pagination
  pagination: {
    el: '.gallery .swiper-pagination',
    type: 'fraction',
  },
  // Navigation arrows
  navigation: {
    nextEl: '.gallery .swiper-button-next',
    prevEl: '.gallery .swiper-button-prev',
  },
  autoheight: true,
});

// слайдер события

const swiperDevelopments = new Swiper('.swiper-developments', {
  loop: true,
  autoheight: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
  //Брейкпоинт

  breakpoints: {
    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    },
    992: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27
    },
    767: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
  },

  // If we need pagination
  pagination: {
    el: '.developments .swiper-pagination',
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.developments .swiper-button-next',
    prevEl: '.developments .swiper-button-prev',
  },
  autoheight: true,
});

// слайдер проекты

const swiperProjects = new Swiper('.swiper-projects', {
  loop: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 50,
  //Брейкпоинт
  breakpoints: {
    1250: {
      slidesPerView: 3,
      slidesPerGroup: 3
    },
    767: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 35
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: '.projects .swiper-button-next',
    prevEl: '.projects .swiper-button-prev',
  },
  autoheight: true,
});


//accordion
new Accordion('.accordion-container', {
  triggerClass: 'accordion__inner',
});


//tabs

let tabsBtn = document.querySelectorAll('.catalog__btn-step')
let tabsCont = document.querySelectorAll('.content__wrapper')

tabsBtn.forEach(function (element) {
  element.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;
    tabsBtn.forEach(function (btn) { btn.classList.remove('catalog__btn-active') });
    e.currentTarget.classList.add('catalog__btn-active');
    tabsCont.forEach(function (element) { element.classList.remove('content__wrapper-active') });
    document.querySelector(`[data-target="${path}"]`).classList.add('content__wrapper-active');
  })
})

//map

ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.75846806898367, 37.60108849999989],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 14
  });

  var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/myplacemark.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-3, -42]
  });

  // Размещение геообъекта на карте.

  myMap.geoObjects.add(myPlacemark);
}

// плавный скролл Scroll to anchors САМОВЫЗЫВЮЩАЯСЯ ФУНКЦИЯ
// для ссылок навигации (в т.ч. кнопка в hero) и кнопок в галлере
(function () {
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = 0; //document.querySelector('.header').clientHeight; //В ПЕРЕМЕННУЮ ПЕРЕДАЕМ ВЫСОТУ ХЕДЕРА(УКАЗЫВАЕМ СЕЛЕКТОР НАШ)
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;
    //ФУНКЦИЯ ОБРАБОТЧИК СКРОЛА
    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    //ФУНКЦИЯ АНИМАЦИИ
    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };
  //ПОДВЕШИВАНИЕ ОБРАБОТЧИКА СОБЫИТЯ для ссылок навигации и ссылки (кнопки) в HeRo
  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');//КЛАСС js-scroll УКАЗВАЕМ ДЛЯ ВСЕХ ССЫЛОК
    const nameArtist = document.querySelectorAll('.catalog__btn-step');//КЛАСС catalog__btn-step' УКАЗВАЕМ ДЛЯ ВСЕХ ССЫЛОК

    links.forEach(each => {
      each.addEventListener('click', function () {
        const currentTarget = this.getAttribute('href');
        // console.log('currentTarget', currentTarget);
        smoothScroll(currentTarget, 1000);
      });
    });

    //ПОДВЕШИВАНИЕ ОБРАБОТЧИКА СОБЫИТЯ для галлереи в мольной версии

    window.addEventListener('resize', function () {
      const viewport_width = Math.max(this.document.documentElement.clientWidth, window.innerWidth || 0);
      if (viewport_width <= 992) {
        nameArtist.forEach(each => {
          each.addEventListener('click', function () {
            const currentTargetArtist = '#blockArtist';
            // console.log(currentTargetArtist);
            smoothScroll(currentTargetArtist, 1000);
          });
        });
      };
    });
  };

  scrollTo();
}());

//hero change pictures подменные изображения в ХЕРО

(function () {
  let heroSection = document.querySelector('.hero');
  let imgBackgroundArray = ["url('img/hero_1-min.jpg')", "url('img/hero_2-min.jpg')", "url('img/hero_3-min.jpg')"];
  window.addEventListener('resize', function () {
    const viewport_width = Math.max(this.document.documentElement.clientWidth, window.innerWidth || 0);

    if (viewport_width <= 1200) {
      imgBackgroundArray = ["url('img/hero_1-1024-min.jpg')", "url('img/hero_2-1024-min.jpg')", "url('img/hero_3-1024-min.jpg')"];
    }

    if (viewport_width <= 992) {
      imgBackgroundArray = ["url('img/hero_1-768-min.jpg')", "url('img/hero_2-768-min.jpg')", "url('img/hero_3-768-min.jpg')"];
    }

    if (viewport_width <= 576) {
      imgBackgroundArray = ["url('img/hero_1-320-min.jpg')", "url('img/hero_2-320-min.jpg')", "url('img/hero_3-320-min.jpg')"];
    }
  });

  heroSection.style.backgroundImage = imgBackgroundArray[0];
  let counter = 1;
  setInterval(stepArrey, 2500);
  function stepArrey() {
    heroSection.style.backgroundImage = imgBackgroundArray[counter]; //0 заменить на переменную counter
    counter++;
    if (counter === 3) counter = 0;
  }
})();

//burger

(function () {
  let burger = document.querySelector('.burger');
  let menu = document.querySelector('.header__nav');
  let headerBtn = document.querySelector('.header__btn-top');
  let menulinks = document.querySelectorAll('.nav__link');

  burger.addEventListener('click',
    function () {
      burger.classList.toggle('burger__active');
      menu.classList.toggle('header__nav-active');
      headerBtn.classList.toggle('header__btn-active');
      document.body.classList.toggle('stop-scroll');
    })

  menulinks.forEach(function (el) {
    el.addEventListener('click',
      function () {
        burger.classList.remove('burger__active');
        menu.classList.remove('header__nav-active');
        headerBtn.classList.remove('header__btn-active');
        document.body.classList.remove('stop-scroll');
      })
  })
  headerBtn.addEventListener('click',
  function () {
    burger.classList.remove('burger__active');
    menu.classList.remove('header__nav-active');
    headerBtn.classList.remove('header__btn-active');
    document.body.classList.remove('stop-scroll');
  })
})();

//serch

(function () {
  let serch = document.querySelector('.header__serch');
  let btnserch = document.querySelector('.header__btn-search');
  let btnclose = document.querySelector('.header__search-close');

  btnserch.addEventListener('click',
    function () {
      serch.classList.add('header__serch-active');
      btnserch.classList.add('header__btn-unsearch');
    });

  btnclose.addEventListener('click',
    function () {
      serch.classList.remove('header__serch-active');
      btnserch.classList.remove('header__btn-unsearch');
    });
})();
