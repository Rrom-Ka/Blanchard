let btnModal = swiperGallery.slides;
let modalOverlay = document.querySelector('.modals__ovelay');
let modals = document.querySelectorAll('.modal__box');
let modalClose = document.querySelectorAll('.modal__close');

btnModal.forEach(function (el) {
  el.addEventListener('click', function (e) {
    let path = e.currentTarget.getAttribute('data-path');
    modals.forEach(function (el) {
      el.classList.remove('modal__box-visible');
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('modal__box-visible');
    modalOverlay.classList.add('modals__ovelay-visible');
  });
});

modalOverlay.addEventListener('click', function (e) {
  if (e.target == modalOverlay) {
    modalOverlay.classList.remove('modals__ovelay-visible');
    modals.forEach(function (el) {
      el.classList.remove('modal__box-visible');
    });
  }
});

modalClose.forEach(function (elem) {
  elem.addEventListener('click', function (e) {
    modalOverlay.classList.remove('modals__ovelay-visible');
    modals.forEach(function (el) {
      el.classList.remove('modal__box-visible');
    });
  });
});

document.body.addEventListener("keydown", function (e) {
  if (e.code == "Escape") {
    modalOverlay.classList.remove('modals__ovelay-visible');
    modals.forEach(function (el) {
      el.classList.remove('modal__box-visible');
    });
  }
});

