"use strict"

// window.addEventListener('load', (event) => {});

// desktop or mobile (mouse or touchscreen)
const isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i) },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i) },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i) },
   any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
   }
};
const isPC = !isMobile.any();
if (isPC) { document.body.classList.add('_pc') } else { document.body.classList.add('_touch') };

// media queries
const MIN1024 = window.matchMedia('(min-width: 1024px)');
const MIN768 = window.matchMedia('(min-width: 768px)');

// variables
// const HEADER = document.getElementById('header');
const HEADER_BODY = document.getElementById('header-body');
const HEADER_ACTION = document.getElementById('header-actions');
const HEADER_POP_UP = document.getElementById('header-pop-up');
const HEADER_POP_UP_INNER = document.getElementById('header-pop-up-inner');



function throttle(callee, timeout) {
   let timer = null;
   return function perform(...args) {
      if (timer) return;
      timer = setTimeout(() => {
         callee(...args);
         clearTimeout(timer);
         timer = null;
      }, timeout)
   }
}



/* динамические переменные */
function addHeightVariable() {
   // if (typeof HEADER !== "undefined") {
   //    document.body.style.setProperty('--height-header', `${HEADER.offsetHeight}px`);
   // }
   if (typeof HEADER_ACTION !== "undefined") {
      HEADER_ACTION.style.setProperty('--offset-right', `${HEADER_ACTION.offsetWidth}px`);
   }
}
addHeightVariable();


// ** ======================= RESIZE ======================  ** //
window.addEventListener('resize', () => {
   addHeightVariable();
   setWidthHeaderMenu();
})


// ** ======================= CLICK ======================  ** //
document.documentElement.addEventListener("click", (event) => {
   if (event.target.closest('.js-open-header-menu')) { openHeaderMenu() };
})

function openHeaderMenu() {
   document.body.classList.toggle('is-open-header-menu');
   setWidthHeaderMenu();
}
function setWidthHeaderMenu() {
   if (document.body.classList.contains('is-open-header-menu')) {
      let width = HEADER_POP_UP_INNER.offsetWidth;
      let bodyWidth = HEADER_BODY.offsetWidth;
      HEADER_POP_UP.style.setProperty('--width-pop-up', `${bodyWidth > width ? width : bodyWidth}px`);
      return;
   }
}
function closeHeaderMenu() {
   document.body.classList.remove('is-open-header-menu')
}

