/* ==========================================================================
   MALILI'S SWEET BAKERY — Main JavaScript
   Core functionality + GSAP animations
   ========================================================================== */

(function () {
  "use strict";

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  document.addEventListener("DOMContentLoaded", () => {
    initLenis();
    initNavbar();
    initSmoothScroll();
    initMobileMenu();
    initFaqAccordion();

    // GSAP animations (skip if user prefers reduced motion)
    if (
      !prefersReducedMotion &&
      typeof gsap !== "undefined" &&
      typeof ScrollTrigger !== "undefined"
    ) {
      gsap.registerPlugin(ScrollTrigger);
      initHeroAnimations();
      initScrollReveal();
      initProductCards();
      initFloatingDecor();
      initParallax();
    }
  });

  /* ------------------------------------------------------------------
     LENIS — Smooth Scroll
  ------------------------------------------------------------------ */
  function initLenis() {
    if (typeof Lenis === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Store globally so mobile menu can stop/start it
    window.__lenis = lenis;
  }

  /* ------------------------------------------------------------------
     NAVBAR — Scroll-aware sticky header
  ------------------------------------------------------------------ */
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    let lastScroll = 0;
    const threshold = 60;

    window.addEventListener(
      "scroll",
      () => {
        const currentScroll = window.pageYOffset;

        // Solid background after scroll threshold
        navbar.classList.toggle("navbar--scrolled", currentScroll > threshold);

        // Hide on scroll down, show on scroll up (after 300px)
        if (currentScroll > 300) {
          if (currentScroll > lastScroll + 5) {
            navbar.classList.add("navbar--hidden");
          } else if (currentScroll < lastScroll - 5) {
            navbar.classList.remove("navbar--hidden");
          }
        } else {
          navbar.classList.remove("navbar--hidden");
        }

        lastScroll = currentScroll;
      },
      { passive: true },
    );
  }

  /* ------------------------------------------------------------------
     SMOOTH SCROLL — Anchor links
  ------------------------------------------------------------------ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const navbarHeight =
          document.getElementById("navbar")?.offsetHeight || 80;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        // Use Lenis if available, otherwise native
        if (window.__lenis) {
          window.__lenis.scrollTo(targetPosition, { duration: 1.2 });
        } else {
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     MOBILE MENU
  ------------------------------------------------------------------ */
  function initMobileMenu() {
    const toggle = document.querySelector(".navbar__toggle");
    const menu = document.querySelector(".navbar__menu");
    if (!toggle || !menu) return;

    const links = menu.querySelectorAll(".navbar__link, .navbar__cta");

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("navbar__menu--open");
      toggle.classList.toggle("navbar__toggle--active");
      document.body.classList.toggle("no-scroll");

      // Pause/resume Lenis
      if (window.__lenis) {
        if (!isOpen) {
          window.__lenis.stop();
        } else {
          window.__lenis.start();
        }
      }
    });

    // Close menu on link click
    links.forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("navbar__menu--open");
        toggle.classList.remove("navbar__toggle--active");
        document.body.classList.remove("no-scroll");
        if (window.__lenis) window.__lenis.start();
      });
    });
  }

  /* ------------------------------------------------------------------
     FAQ ACCORDION
  ------------------------------------------------------------------ */
  function initFaqAccordion() {
    const items = document.querySelectorAll(".faq__item");
    if (!items.length) return;

    items.forEach((item) => {
      const summary = item.querySelector("summary");
      const answer = item.querySelector(".faq__answer");
      if (!summary || !answer) return;

      summary.addEventListener("click", (e) => {
        e.preventDefault();

        // Close other items
        items.forEach((other) => {
          if (other !== item && other.open) {
            closeItem(other);
          }
        });

        // Toggle current
        if (item.open) {
          closeItem(item);
        } else {
          openItem(item);
        }
      });
    });

    function openItem(item) {
      const answer = item.querySelector(".faq__answer");
      item.open = true;

      if (typeof gsap !== "undefined" && !prefersReducedMotion) {
        answer.style.height = "0px";
        answer.style.overflow = "hidden";
        gsap.to(answer, {
          height: answer.scrollHeight,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            answer.style.height = "auto";
            answer.style.overflow = "";
          },
        });
      }
    }

    function closeItem(item) {
      const answer = item.querySelector(".faq__answer");

      if (typeof gsap !== "undefined" && !prefersReducedMotion) {
        gsap.to(answer, {
          height: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            item.open = false;
            answer.style.height = "";
          },
        });
      } else {
        item.open = false;
      }
    }
  }

  /* ==================================================================
     GSAP ANIMATIONS
  ================================================================== */

  /* ------------------------------------------------------------------
     HERO — Entry sequence
  ------------------------------------------------------------------ */
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Store original circle opacities before hiding them
    const circles = gsap.utils.toArray(".hero__decor .decor-circle");
    const circleOpacities = circles.map((el) => {
      const style = window.getComputedStyle(el);
      return parseFloat(style.opacity) || 1;
    });

    // Set initial states (prevent flash of unstyled content)
    gsap.set(".hero__heading-line", { y: "110%", opacity: 0 });
    gsap.set(".hero__chef", { y: 20, opacity: 0 });
    gsap.set(".hero__subtext", { y: 20, opacity: 0 });
    gsap.set(".hero__actions .btn", { scale: 0.8, opacity: 0 });
    gsap.set(".hero__product-img", { y: 100, opacity: 0, scale: 0.88 });
    circles.forEach((c) => gsap.set(c, { scale: 0, opacity: 0 }));

    // Choreographed reveal
    tl.to(".hero__heading-line", {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2,
    })
      .to(
        ".hero__product-img",
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.7",
      )
      .to(
        ".hero__chef",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
        "-=0.6",
      )
      .to(
        ".hero__subtext",
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        },
        "-=0.4",
      )
      .to(
        ".hero__actions .btn",
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );
    // Animate circles back to their original CSS opacity values
    const circleOffset = tl.duration() - 1;
    circles.forEach((circle, i) => {
      tl.to(
        circle,
        {
          scale: 1,
          opacity: circleOpacities[i],
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
        },
        circleOffset + i * 0.15,
      );
    });
  }

  /* ------------------------------------------------------------------
     SCROLL REVEAL — Universal section animations
  ------------------------------------------------------------------ */
  function initScrollReveal() {
    // Section headings — slide up
    gsap.utils
      .toArray(
        ".about__heading, .products__heading, .spotlight__heading, .faq__heading, .footer__cta-heading",
      )
      .forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

    // Eyebrow text
    gsap.utils.toArray('[class$="__eyebrow"]').forEach((el) => {
      // Skip hero eyebrow (handled in hero animation)
      if (el.classList.contains("hero__eyebrow")) return;

      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        y: 20,
        opacity: 0,
        duration: 0.5,
      });
    });

    // Paragraph text
    gsap.utils
      .toArray(
        ".about__text, .spotlight__text, .testimonial__text, .footer__cta-text",
      )
      .forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.15,
        });
      });

    // About — Marjory photo scale in
    gsap.from(".about__photo", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about__showcase",
        start: "top 75%",
      },
    });

    // About — Rings fade in
    gsap.from(".about__ring", {
      scale: 0.6,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about__showcase",
        start: "top 75%",
      },
    });

    // About — Balloons stagger in from outside
    gsap.from(".about__balloon", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".about__showcase",
        start: "top 70%",
      },
    });

    // Spotlight image — scale in
    gsap.utils.toArray(".spotlight__img").forEach((img) => {
      gsap.from(img, {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: img,
          start: "top 80%",
        },
      });
    });

    // Spotlight features list — stagger
    gsap.from(".spotlight__features li", {
      scrollTrigger: {
        trigger: ".spotlight__features",
        start: "top 85%",
      },
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: "power2.out",
    });

    // Testimonial section
    gsap.from(".testimonial__decor-dog", {
      scrollTrigger: {
        trigger: ".testimonial",
        start: "top 80%",
      },
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.5)",
    });

    gsap.from(".testimonial__author", {
      scrollTrigger: {
        trigger: ".testimonial__author",
        start: "top 90%",
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
    });

    // FAQ items — stagger
    gsap.from(".faq__item", {
      scrollTrigger: {
        trigger: ".faq__list",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
    });

    // Footer CTA
    gsap.from(".footer__cta-dog", {
      scrollTrigger: {
        trigger: ".footer__cta-band",
        start: "top 85%",
      },
      y: 20,
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.5)",
    });
  }

  /* ------------------------------------------------------------------
     PRODUCT CARDS — Staggered entrance + hover
  ------------------------------------------------------------------ */
  function initProductCards() {
    const cards = gsap.utils.toArray(".product-card");

    cards.forEach((card, i) => {
      const img = card.querySelector(".product-card__img");
      const circle = card.querySelector(".product-card__circle");
      const info = card.querySelector(".product-card__info");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      // Circle scales in first
      if (circle) {
        tl.from(circle, {
          scale: 0,
          duration: 0.6,
          ease: "back.out(1.4)",
          delay: i * 0.12,
        });
      }

      // Product image floats up
      if (img) {
        tl.from(
          img,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      // Text info slides up
      if (info) {
        tl.from(
          info,
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3",
        );
      }

      // Hover: product image subtle float
      if (img) {
        card.addEventListener("mouseenter", () => {
          gsap.to(img, { y: -12, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(img, { y: 0, duration: 0.4, ease: "power2.out" });
        });
      }
    });
  }

  /* ------------------------------------------------------------------
     FLOATING DECOR — Continuous ambient animation
  ------------------------------------------------------------------ */
  function initFloatingDecor() {
    // Hero decorative circles — gentle floating
    gsap.utils
      .toArray(
        ".decor-circle--hero-lg, .decor-circle--hero-md, .decor-circle--hero-sm",
      )
      .forEach((circle, i) => {
        const yAmp = 12 + i * 6;
        const xAmp = 6 + i * 4;
        const dur = 5 + i * 1.5;

        gsap.to(circle, {
          y: `+=${yAmp}`,
          x: `+=${xAmp}`,
          rotation: 2 + i * 1.5,
          duration: dur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

    // Spotlight circles
    gsap.utils
      .toArray(".decor-circle--spotlight-1, .decor-circle--spotlight-2")
      .forEach((circle, i) => {
        gsap.to(circle, {
          y: `+=${10 + i * 8}`,
          x: `+=${5 + i * 3}`,
          duration: 6 + i * 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

    // About balloons — gentle floating
    gsap.utils.toArray(".about__balloon").forEach((balloon, i) => {
      const yAmp = 8 + (i % 3) * 4;
      const xAmp = 4 + (i % 2) * 3;
      const dur = 3.5 + i * 0.7;

      gsap.to(balloon, {
        y: `+=${yAmp}`,
        x: `+=${xAmp}`,
        duration: dur,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      });
    });

    // Product card circles — subtle pulse
    gsap.utils.toArray(".product-card__circle").forEach((circle, i) => {
      gsap.to(circle, {
        scale: 1.04,
        duration: 3.5 + i * 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "center center",
      });
    });
  }

  /* ------------------------------------------------------------------
     PARALLAX — Depth layers on scroll
  ------------------------------------------------------------------ */
  function initParallax() {
    // Only on desktop
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function () {
        // Hero image parallax
        gsap.to(".hero__product-img", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Hero circles at different speeds
        gsap.utils
          .toArray(".hero__decor .decor-circle")
          .forEach((circle, i) => {
            gsap.to(circle, {
              yPercent: -15 - i * 10,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 2,
              },
            });
          });

        // Spotlight image parallax
        gsap.to(".spotlight__img", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".spotlight",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Testimonial dog decoration
        gsap.to(".testimonial__decor-dog", {
          yPercent: -25,
          rotation: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ".testimonial",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      },
    });
  }
})();
