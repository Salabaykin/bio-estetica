document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var myMap;
  ymaps.ready(init);
  function init() {
    myMap = new ymaps.Map(
      "map",
      {
        center: [55.76, 37.64],
        zoom: 10,
        controls: [],
      },
      {
        searchControlProvider: "yandex#search",
      }
    );
  }

  const promoSwiper = new Swiper(".promo-slider.swiper-container", {
    loop: false,
    breakpoints: {
      768: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    },
  });

  const companySwiper = new Swiper(".company-slider.swiper-container", {
    loop: true,
    autoplay: {
      delay: 3500,
    },
    navigation: false,
  });

  var galleryThumbs = new Swiper(".swiper-container.gallery-thumbs", {
    loop: false,
    freeMode: true,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  var galleryTop = new Swiper(".swiper-container.gallery-top", {
    spaceBetween: 10,
    loop: false,
    loopedSlides: 4, //looped slides should be the same
    thumbs: {
      swiper: galleryThumbs,
    },
  });

  // Modal
  const popUp = () => {
    const modalContent = document.querySelector(".modal__content");

    const modalData = {
      popupLink: document.querySelectorAll("[data-link-id]"),
      modal: document.querySelectorAll(".modal"),
      closeBtn(elem) {
        const closeBtn = elem.querySelector(".modal-close");
        closeBtn.addEventListener("click", () => {
          this.closeModal(elem);
        });
        this.modal.forEach((elem) => {
          elem.addEventListener("click", (e) => {
            if (e.target.classList.contains("modal__window")) {
              this.closeModal(elem);
            }
          });
        });
      },
      closeModal(elem) {
        elem.classList.remove("modal-open");
      },
      openModal(attr) {
        this.modal.forEach((elem) => {
          const elemAttr = elem.getAttribute("data-modal-id");
          if (attr === elemAttr) {
            elem.classList.add("modal-open");
            this.closeBtn(elem);
          }
        });
      },
    };

    modalData.popupLink.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        const attrLinkValue = target.getAttribute("data-link-id");
        modalData.openModal(attrLinkValue);
      });
    });
  };

  popUp();

  // Menu
  const header = document.querySelector(".header"),
    headerNav = header.querySelector(".header__nav"),
    overlay = document.querySelector(".overlay");

  header.addEventListener("click", (e) => {
    const target = e.target;

    if (target.closest(".burger")) {
      headerNav.classList.toggle("active");
      overlay.classList.toggle("active");
    } else if (target.closest(".header__close")) {
      headerNav.classList.remove("active");
      overlay.classList.remove("active");
    }
  });

  overlay.addEventListener("click", () => {
    headerNav.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Accordion
  class Accordion {
    constructor(id, header) {
      this.header = header;
      this.id = id;
      this.render();
    }
    render() {
      function initAccordion(element, header) {
        const mainElement = document.querySelector(element);
        function actionClick(e) {
          if (!e.target.classList.contains(header)) {
            return;
          }
          e.preventDefault();
          const headerHead = e.target;
          const item = headerHead.parentElement;
          item.classList.toggle("show");
        }
        function setupListeners() {
          mainElement.addEventListener("click", actionClick);
        }
        if (mainElement) {
          setupListeners();
        }
      }
      initAccordion(this.id, this.header);
    }
  }
  const libraryAccordion = new Accordion(
    "#accordion",
    "accordion-item__header"
  );

  // Link scroll
  const navLink = document.querySelectorAll('.question-nav ul li a[href^="#"]');

  if (navLink.length > 0) {
    navLink.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        let href = this.getAttribute("href").substring(1);
        const scrollTarget = document.getElementById(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - 20;
        window.scrollBy({
          top: offsetPosition,
          behavior: "smooth",
        });
      });
    });
  }

  const aboutSwiper = new Swiper(".about-slider.swiper-container", {
    loop: false,
    slidesPerView: 6,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
  });

  // Video
  const playBlock = document.querySelector(".about__video"),
    videoBlock = document.getElementById("video-block");

  if (playBlock) {
    playBlock.addEventListener("click", () => {
      videoBlock.play();
      playBlock.classList.add("hide");
    });
  }
});
