(function () {
  let heroSection = document.querySelector('.hero');
  let imgBackgroundArray = ["url('../img/hero_1-min.jpg')", "url('../img/hero_2-min.jpg')", "url('../img/hero_3-min.jpg')"]
  heroSection.style.backgroundImage = imgBackgroundArray[0];
  let counter = 1;
  setInterval(stepArrey, 2500);
  function stepArrey() {
    heroSection.style.backgroundImage = imgBackgroundArray[counter];
    counter++;
    if (counter === 3) counter = 0;
  }
  setInterval();
})();
