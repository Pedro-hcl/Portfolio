// Animações da página
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const smoother = ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
});

gsap.from("header", {
  opacity: 0,
  duration: 2,
});

gsap.from(".hero-section", {
  opacity: 0,
  duration: 2,
});

gsap.from(".background-typo", {
  opacity: 0,
  duration: 2,
});

gsap.from(".about-group", {
  opacity: 0,
  x: -30,
  stagger: 0.5,
  scrollTrigger: {
    trigger: ".introduce",
    start: "0% 60%",
    end: "100% 20%",
    scrub: true,
  },
});
gsap.from(".projects-section", {
  opacity: 0,

  scrollTrigger: {
    trigger: ".about-section",
    start: "120% 100%",
    end: "130% 0%",
    scrub: true,
  },
});

gsap.from(".project-title", {
  opacity: 0,
  y: -300,
  scrollTrigger: {
    trigger: ".about-section",
    start: "100% 100%",
    end: "130% 0%",
    scrub: true,
  },
});

gsap.from(".projects", {
  opacity: 0,
  stagger: 1,
  y: -300,
  scrollTrigger: {
    trigger: ".about-section",
    start: "120% 100%",
    end: "130% 0%",
    scrub: true,
  },
});

//gsap.to(".projects-section" , {
//y: -300,
//scrollTrigger: {
//trigger: ".projects-section",
//markers:true,
//start: "100% 100%",
//end: "130% 0%",
//scrub: true,
//}
//});





/* --- Navegação --- */

(function () {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".site-nav");
  const overlay = document.querySelector(".nav-overlay");
  const closeBtn = document.querySelector(".nav-close");
  const links = nav ? nav.querySelectorAll("a") : [];

  function openNav() {
    if (nav) nav.classList.add("open");
    if (menuBtn) {
      menuBtn.classList.add("active");
      menuBtn.setAttribute("aria-expanded", "true");
    }
    if (overlay) overlay.classList.add("active");
    document.body.classList.add("nav-open");
  }

  function closeNav() {
    if (nav) nav.classList.remove("open");
    if (menuBtn) {
      menuBtn.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    }
    if (overlay) overlay.classList.remove("active");
    document.body.classList.remove("nav-open");
  }

  if (menuBtn) {
    // initialize aria-expanded
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.addEventListener("click", function () {
      if (nav && nav.classList.contains("open")) closeNav();
      else openNav();
    });
  }

  if (overlay) overlay.addEventListener("click", closeNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  // Close nav when user scrolls
  window.addEventListener(
    "scroll",
    function () {
      if (nav && nav.classList.contains("open")) closeNav();
    },
    { passive: true },
  );

  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      const href = a.getAttribute("href");

      closeNav();

      smoother.scrollTo(href, true, "top top");
    });
  });
})();

/* --- Carrossel --- */
(function () {
  const projectsContainer = document.querySelector(".projects");

  const projectItems = projectsContainer
    ? projectsContainer.querySelectorAll(".project-item")
    : [];
  const leftBtn = projectsContainer
    ? projectsContainer.querySelector(".button.left")
    : null;
  const rightBtn = projectsContainer
    ? projectsContainer.querySelector(".button.right")
    : null;

  if (projectsContainer && projectItems.length > 0) {
    let currentIndex = 0;

    projectItems.forEach((item, index) => {
      if (item.classList.contains("select")) {
        currentIndex = index;
      }
    });

    function showProject(index, direction) {
      projectItems.forEach((item) => {
        item.classList.remove("select", "animateLeft", "animateRight");
      });

      const currentItem = projectItems[index];

      void currentItem.offsetWidth;

      currentItem.classList.add("select");

      if (direction === "next") {
        currentItem.classList.add("animateRight");
      } else if (direction === "prev") {
        currentItem.classList.add("animateLeft");
      }
    }

    function nextProject() {
      currentIndex = (currentIndex + 1) % projectItems.length;
      showProject(currentIndex, "next"); // Passamos a direção 'next'
    }

    function prevProject() {
      currentIndex =
        (currentIndex - 1 + projectItems.length) % projectItems.length;
      showProject(currentIndex, "prev"); // Passamos a direção 'prev'
    }

    if (leftBtn) {
      leftBtn.addEventListener("click", prevProject);
    }
    if (rightBtn) {
      rightBtn.addEventListener("click", nextProject);
    }
  }
})();
