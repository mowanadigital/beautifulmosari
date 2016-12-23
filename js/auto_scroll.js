/*
Ininite looping scroll.
Tested and works well in latest verions of Chrome, Safari and Firefox.

Not built/tested for mobile.
*/

'use strict';

var doc = window.document,
  context = doc.getElementsByClassName('js-loop')[0],
  clones = context.getElementsByClassName('is-clone'),
  disableScroll,
  scrollHeight,
  scrollPos,
  clonesHeight,
  i;

function getScrollPos() {
  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos(pos) {
  context.scrollTop = pos;
}

function getClonesHeight() {
  clonesHeight = 0;
  i = 0;

  for (i; i < clones.length; i += 1) {
    clonesHeight = clonesHeight + clones[i].offsetHeight;
  }

  return clonesHeight;
}

function reCalc() {
  window.requestAnimationFrame(reCalc);
  scrollPos = getScrollPos();
  scrollHeight = context.scrollHeight;
  clonesHeight = getClonesHeight();

  if (scrollPos <= 0) {
    setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
  }
}

// Calculate variables
window.requestAnimationFrame(reCalc);

function scrollUpdate() {
  if (!disableScroll) {
    scrollPos = getScrollPos();

    if (clonesHeight + scrollPos >= scrollHeight) {
      // Scroll to the top when you’ve reached the bottom
      setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
      disableScroll = true;
    } else if (scrollPos <= 0) {
      // Scroll to the bottom when you reach the top
      setScrollPos(scrollHeight - clonesHeight);
      disableScroll = true;
    }
  }

  if (disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
    window.setTimeout(function () {
      disableScroll = false;
    }, 40);
  }
}

context.addEventListener('scroll', function () {
  window.requestAnimationFrame(scrollUpdate);
}, false);

window.addEventListener('resize', function () {
  window.requestAnimationFrame(reCalc);
}, false);





// Just for the demo: Center the middle block on page load
window.onload = function () {
  setScrollPos(Math.round(clones[0].getBoundingClientRect().top + getScrollPos() - (window.innerHeight - clones[0].offsetHeight) / 2));
};