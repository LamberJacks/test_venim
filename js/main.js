(function () {
  // меню анимация (временно)
  const headerList = document.querySelector(".header__list");
  if (!headerList) return;

  headerList.addEventListener("click", function (e) {
    const item = e.target.closest(".header__item");

    if (
      item &&
      !item.classList.contains("header__subitem") &&
      !item.classList.contains("header__item--has-submenu")
    ) {
      const currentActive = headerList.querySelector(".header__item--active");
      if (currentActive) {
        currentActive.classList.remove("header__item--active");
      }

      item.classList.add("header__item--active");
    }
  });

  headerList.addEventListener("click", function (e) {
    const target = e.target;
    const item = target.closest(".header__item--has-submenu");

    if (item) {
      e.preventDefault();

      const submenu = item.querySelector(".header__submenu");
      const isOpen = item.classList.contains("header__item--open");

      if (isOpen) {
        closeSubmenu(item);
      } else {
        openSubmenu(item, submenu);
      }
    }
  });

  function openSubmenu(item, submenu) {
    item.classList.add("header__item--open");
    submenu.style.height = submenu.scrollHeight + "px";
  }

  function closeSubmenu(item) {
    const submenu = item.querySelector(".header__submenu");
    item.classList.remove("header__item--open");
    submenu.style.height = "0px";
  }

  // Burger menu
  (function () {
    const MOBILE_WIDTH = 800;
    let isMobile = false;
    let scrollY = 0;
  
    const body = document.body;
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");
    const headerInfo = document.querySelector(".header__info");
  
    let navBorder = null;
  
    function isIOS() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
  
    function setHeaderHeight() {
      if (!headerInfo) return;
      document.documentElement.style.setProperty(
        "--header-height",
        headerInfo.offsetHeight + 50 + "px"
      );
    }
  
    function lockBody() {
      if (!isIOS()) {
        body.classList.add("no-scroll");
        return;
      }
  
      scrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
    }
  
    function unlockBody() {
      if (!isIOS()) {
        body.classList.remove("no-scroll");
        return;
      }
  
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    }
  
    function createNavBorder() {
      if (navBorder) return;
  
      navBorder = document.createElement("div");
      navBorder.className = "nav-border";
      navBorder.style.cssText = `
        position: absolute;
        top: var(--header-height, 100px);
        left: 0;
        right: 0;
        height: 3px;
        background-color: var(--accent-color);
        z-index: 11;
        pointer-events: none;
        transition: top 0.4s ease;
      `;
      document.body.appendChild(navBorder);
    }
  
    function openMenu() {
      nav.style.height = "60vh";
      nav.classList.add("open");
      lockBody();
  
      navBorder.style.top = `calc(var(--header-height, 100px) + 60vh - 3px)`;
    }
  
    function closeMenu() {
      nav.style.height = "0";
      navBorder.style.top = "var(--header-height, 100px)";
  
      setTimeout(() => {
        nav.classList.remove("open");
        unlockBody();
      }, 400);
    }
  
    function burgerHandler(e) {
      if (e.type === "touchstart") e.preventDefault();
      nav.classList.contains("open") ? closeMenu() : openMenu();
    }
  
    function outsideHandler(e) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        closeMenu();
      }
    }
  
    function resizeNavBorder() {
      if (!navBorder) return;
      navBorder.style.top = nav.classList.contains("open")
        ? `calc(var(--header-height, 100px) + 60vh - 3px)`
        : "var(--header-height, 100px)";
    }
  
    function enableMobileMenu() {
      if (isMobile) return;
      isMobile = true;
  
      setHeaderHeight();
      createNavBorder();
  
      burger.addEventListener("click", burgerHandler);
      burger.addEventListener("touchstart", burgerHandler, { passive: false });
  
      document.addEventListener("click", outsideHandler);
      window.addEventListener("resize", resizeNavBorder);
      window.addEventListener("orientationchange", resizeNavBorder);
  
      document
        .querySelectorAll(".nav__link, .header__sublink, .header__subitem")
        .forEach((el) => {
          el.addEventListener("click", closeMenu);
          el.addEventListener("touchstart", closeMenu, { passive: true });
        });
    }
  
    function disableMobileMenu() {
      if (!isMobile) return;
      isMobile = false;
  
      nav.style.height = "";
      nav.classList.remove("open");
      unlockBody();
  
      burger.removeEventListener("click", burgerHandler);
      burger.removeEventListener("touchstart", burgerHandler);
  
      document.removeEventListener("click", outsideHandler);
      window.removeEventListener("resize", resizeNavBorder);
      window.removeEventListener("orientationchange", resizeNavBorder);
  
      if (navBorder) {
        navBorder.remove();
        navBorder = null;
      }
    }
  
    function checkMode() {
      document.documentElement.clientWidth <= MOBILE_WIDTH
        ? enableMobileMenu()
        : disableMobileMenu();
    }
  
    document.addEventListener("DOMContentLoaded", checkMode);
    window.addEventListener("resize", checkMode);
  })();
  

  // ---------------------header_swiper-----------------------------
  const swiper = new Swiper(".header__swiper", {
    autoplay: {
      delay: 10000,
    },
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },



    // If we need pagination
    pagination: {
      el: ".header__pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".header__next",
      prevEl: ".header__prev",
    },
  });

    // ---------------------team_swiper-----------------------------

// Левый слайдер (миниатюры)
const thumbsSwiper = new Swiper('.team__swiper-left', {
  spaceBetween: -10,
  slidesPerView: 'auto',
  freeMode: true,
  watchSlidesProgress: true,
  slideToClickedSlide: true,
  
  scrollbar: {
    el: '.team__scrollbar',
    draggable: true,
  },
  breakpoints: {
  800: {
    spaceBetween: 32
  }
}

});

// Функция показа члена команды
function showTeamMember(index) {
  // Все правые слайды
  const rightSlides = document.querySelectorAll('.team__slide-right');
  const leftSlides = document.querySelectorAll('.team__slide-left');
  
  // Прячем все
  rightSlides.forEach(slide => {
    slide.classList.remove('active');
    // slide.style.opacity = '0';
    slide.style.visibility = 'hidden';
    
  });
  leftSlides.forEach(slide => {
    slide.classList.remove('active-left');
  });
  
  // Показываем нужный
  if (rightSlides[index] && leftSlides[index]) {
    rightSlides[index].classList.add('active');
    leftSlides[index].classList.add('active-left');

    // rightSlides[index].style.opacity = '1';
    rightSlides[index].style.visibility = 'visible';
  }
}

// Клик по миниатюре
document.querySelectorAll('.team__slide-left').forEach((slide, index) => {
  slide.addEventListener('click', () => {
    thumbsSwiper.slideTo(index);
    showTeamMember(index);
  });
});


showTeamMember(0);


  // Таб
  const tabControls = document.querySelector(".tab-controls")

  tabControls.addEventListener("click", toggleTab)

  function toggleTab(e) {
    const target = e.target
    const tabControl = target.closest(".tab-controls__link")

    if (!tabControl) return
    e.preventDefault()
    if (tabControl.classList.contains("tab-controls--active")) return


    const tabContentID = tabControl.getAttribute("href")
    const tabContent = document.querySelector(tabContentID)
    const tabContentShow = document.querySelector(".tab-content--show")
    const tabControlsActive = document.querySelector(".tab-controls--active")

    tabContentShow.classList.remove("tab-content--show")
    tabControlsActive.classList.remove("tab-controls--active")

    tabContent.classList.add("tab-content--show")
    tabControl.classList.add('tab-controls--active')
  }
  //------------------------------------------------------

  
  // Слайдеры для телефонов 
  const TabOneSlider = new Swiper('.services__swiper--one', {
    spaceBetween: 20,
    slidesPerView: 'auto',
    freeMode: true, 
    watchSlidesProgress: true,
  
  });

  const TabTwoSlider = new Swiper('.services__swiper--two', {
    spaceBetween: 20,
    slidesPerView: 'auto',
    freeMode: true, 
    watchSlidesProgress: true,
  
  });
  
  // marquee

  const track = document.querySelector('.marquee__track');
  const line = document.querySelector('.marquee__line');
  const speed = 0.5; // px per frame
  
  let position = 0;
  const lineWidth = line.offsetWidth;
  
  function animate() {
    position -= speed;
  
    if (Math.abs(position) >= lineWidth) {
      position = 0;
    }
  
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }
  
  animate();


// reviews slider
const reviewsSwiper = new Swiper('.reviews__swiper', {
  spaceBetween: 10,
  slidesPerView: 1,
  
  pagination: {
    el: '.reviews__pagination',
  },
  breakpoints: {
  1000: {
    slidesPerView: 2,
  },
  800: {
    slidesPerView: 1.5,
  }
}

});
  

})();
