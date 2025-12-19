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
  function initBurgerMenu() {
    const width = document.documentElement.clientWidth;
    if (width <= 800) {
      const headerInfo = document.querySelector(".header__info");
      if (headerInfo) {
        document.documentElement.style.setProperty(
          "--header-height",
          headerInfo.offsetHeight + 50 + "px"
        );
      }

      window.addEventListener("resize", () => {
        if (headerInfo) {
          document.documentElement.style.setProperty(
            "--header-height",
            headerInfo.offsetHeight + 50 + "px"
          );
        }
      });

      const burger = document.querySelector(".burger");
      const nav = document.querySelector(".nav");
      const body = document.body;

      let navBorder = document.querySelector(".nav-border");
      if (!navBorder) {
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

      const oldBurgerClick = burger._burgerClickHandler;
      if (oldBurgerClick) {
        burger.removeEventListener("click", oldBurgerClick);
      }

      const burgerClickHandler = () => {
        const isOpen = nav.classList.contains("open");

        if (!isOpen) {
          nav.style.height = "60vh";
          nav.classList.add("open");
          body.classList.add("no-scroll");

          navBorder.style.top = `calc(var(--header-height, 100px) + 60vh - 3px)`;
        } else {
          nav.style.height = "0";

          navBorder.style.top = "var(--header-height, 100px)";

          setTimeout(() => {
            nav.classList.remove("open");
            body.classList.remove("no-scroll");
          }, 400);
        }
      };

      burger._burgerClickHandler = burgerClickHandler;
      burger.addEventListener("click", burgerClickHandler);

      document
        .querySelectorAll(".nav__link, .header__sublink, .header__subitem")
        .forEach((element) => {
          // Удаляем старый обработчик
          const oldClickHandler = element._menuCloseHandler;
          if (oldClickHandler) {
            element.removeEventListener("click", oldClickHandler);
          }

          const clickHandler = () => {
            nav.style.height = "0";
            navBorder.style.top = "var(--header-height, 100px)";

            setTimeout(() => {
              nav.classList.remove("open");
              body.classList.remove("no-scroll");
            }, 400);
          };

          element._menuCloseHandler = clickHandler;
          element.addEventListener("click", clickHandler);
        });

      const oldDocumentClick = document._outsideClickHandler;
      if (oldDocumentClick) {
        document.removeEventListener("click", oldDocumentClick);
      }

      const outsideClickHandler = (e) => {
        if (
          !nav.contains(e.target) &&
          !burger.contains(e.target) &&
          nav.classList.contains("open")
        ) {
          nav.style.height = "0";
          navBorder.style.top = "var(--header-height, 100px)";

          setTimeout(() => {
            nav.classList.remove("open");
            body.classList.remove("no-scroll");
          }, 400);
        }
      };

      document._outsideClickHandler = outsideClickHandler;
      document.addEventListener("click", outsideClickHandler);

      const oldResizeHandler = window._navBorderResizeHandler;
      if (oldResizeHandler) {
        window.removeEventListener("resize", oldResizeHandler);
      }

      const resizeHandler = () => {
        if (nav.classList.contains("open")) {
          navBorder.style.top = `calc(var(--header-height, 100px) + 60vh - 3px)`;
        } else {
          navBorder.style.top = "var(--header-height, 100px)";
        }
      };

      window._navBorderResizeHandler = resizeHandler;
      window.addEventListener("resize", resizeHandler);
    } else {
      const nav = document.querySelector(".nav");
      const burger = document.querySelector(".burger");

      if (nav) {
        nav.style.height = "";
        nav.classList.remove("open");
      }

      if (burger && burger._burgerClickHandler) {
        burger.removeEventListener("click", burger._burgerClickHandler);
        delete burger._burgerClickHandler;
      }

      if (document._outsideClickHandler) {
        document.removeEventListener("click", document._outsideClickHandler);
        delete document._outsideClickHandler;
      }

      if (window._navBorderResizeHandler) {
        window.removeEventListener("resize", window._navBorderResizeHandler);
        delete window._navBorderResizeHandler;
      }

      const navBorder = document.querySelector(".nav-border");
      if (navBorder) {
        navBorder.remove();
      }
    }
  }

  // Запускаем при загрузке
  document.addEventListener("DOMContentLoaded", initBurgerMenu);

  // Запускаем при изменении размера окна
  window.addEventListener("resize", initBurgerMenu);

  // ---------------------header_swiper-----------------------------
  const swiper = new Swiper(".header__swiper", {
    // autoplay: {
    //   delay: 2000,
    // },
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


})();
