window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById('preloader-geo').classList.add('preloader-hidden');
    document.body.classList.remove('no-scroll');
  }, 2800);
});

// Animações da página
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const smoother = ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
});

gsap.from("header", {
  opacity: 0,
  duration: 2,
  delay: 1.5 
});

gsap.from(".hero-section", {
  opacity: 0,
  duration: 2,
  delay: 1.5
});

gsap.from(".background-typo", {
  opacity: 0,
  duration: 2,
  delay: 1.5
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

gsap.to(".projects-section" , {
y: -300,
scrollTrigger: {
trigger: ".projects-section",
start: "100% 100%",
end: "130% 0%",
scrub: true,
}
});





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

/* --- Sistema de Tradução (Inglês / Português) --- */
(function () {
  const langBtn = document.getElementById('lang-btn');
  let isPt = false; // Começa em inglês

  // Dicionário mapeando os seletores do CSS com os textos
  const translations = {
    // Menu
    ".site-nav ul li:nth-child(1) a": { en: "Home", pt: "Início" },
    ".site-nav ul li:nth-child(2) a": { en: "About me", pt: "Sobre mim" },
    ".site-nav ul li:nth-child(3) a": { en: "Projects", pt: "Projetos" },
    ".site-nav ul li:nth-child(4) a": { en: "Skills", pt: "Habilidades" },
    ".site-nav ul li:nth-child(5) a": { en: "Certificates", pt: "Certificados" },
    ".site-nav ul li:nth-child(6) a": { en: "Contact me", pt: "Contato" },
    
    // Hero Section
    ".main-title": { 
      en: "HELLO!<br /><span class=\"light-text\">I AM</span><br /><span class=\"big-text\">PEDRO</span>", 
      pt: "OLÁ!<br /><span class=\"light-text\">EU SOU</span><br /><span class=\"big-text\">PEDRO</span>" 
    },
    ".intro-box h3": { en: "INTRODUCE", pt: "INTRODUÇÃO" },
    ".introduce p": { 
      en: "Blending the precision of code with the beauty of design to build immersive web experiences.", 
      pt: "Unindo a precisão do código com a beleza do design para criar experiências web imersivas." 
    },
    
    // Sobre Mim
    ".about-group .mini-title h3": { en: "ABOUT ME", pt: "SOBRE MIM" },
    ".about-me p:nth-child(1)": { 
      en: "I'm 18 years old and I'm a Software Engineering student. I'm currently in my third semester and I'm very excited about what the future holds.", 
      pt: "Tenho 18 anos e sou estudante de Engenharia de Software. Atualmente estou no terceiro semestre e muito animado com o que o futuro reserva." 
    },
    ".about-me p:nth-child(2)": { 
      en: "I'm trying to learn as much as possible about web development and other technology-related areas, with the goal of becoming a well-rounded and up-to-date professional.", 
      pt: "Busco aprender o máximo possível sobre desenvolvimento web e outras áreas de tecnologia, com o objetivo de me tornar um profissional completo e atualizado." 
    },
    
    // Títulos de Seções
    ".project-title": { en: "PROJECTS", pt: "PROJETOS" },
    ".skills-section .mini-title": { en: "SKILLS", pt: "HABILIDADES" },
    ".certificates-list-section .mini-title h3": { en: "CERTIFICATES", pt: "CERTIFICADOS" },
    
    // Footer
    ".footer-text h4": { en: "CONNECTED WITH ME", pt: "CONECTE-SE COMIGO" },
    ".footer-text p": { en: "Follow me on social media and let's chat!", pt: "Siga-me nas redes sociais e vamos conversar!" },
    ".footer-bottom p": { en: "&copy; 2026 Designed & Developed by Pedro Leão.", pt: "&copy; 2026 Projetado e Desenvolvido por Pedro Leão." }
  };

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      isPt = !isPt; 
      langBtn.innerText = isPt ? 'EN' : 'PT'; 
      
      
      for (const selector in translations) {
        const element = document.querySelector(selector);
        if (element) {
          
          gsap.to(element, { 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => {
              element.innerHTML = isPt ? translations[selector].pt : translations[selector].en;
              gsap.to(element, { opacity: 1, duration: 0.3 });
            }
          });
        }
      }
    });
  }
})();
