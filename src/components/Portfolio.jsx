import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import experienceIcon from "../assets/experience.svg";
import projects from "../assets/projects.svg";
import LogoLoop from "./LogoLoop";
import Maillards from "./Maillards";
import "./Portfolio.css";
import Preloader from "./Preloader"; // ADD THIS

import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import {
  SiCss3,
  SiFigma,
  SiFramer,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiThreedotjs,
} from "react-icons/si";

import {
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { SiIndeed } from "react-icons/si";
import blueBackground1 from "../assets/blue1.png";
import logo from "../assets/logo.png";
import mockup from "../assets/mockup.jpg";
import mockup1 from "../assets/mockup1.jpg";
import mockup2 from "../assets/mockup2.jpg";
import mockup3 from "../assets/mockup3.png";
import mockup4 from "../assets/mockup4.jpg";
import soon from "../assets/soon.png";
import TiltedCard from "./TiltedCard";
import useSplitAnimateReveal from "./useSplitAnimateReveal";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

const PROCESS_STEPS = [
  {
    label: "Discovery",
    title: "Discovery & Research",
    description:
      "I begin by researching your target audience and design goals, understanding user needs, competitive landscape, and success metrics so every decision aligns with what your users actually expect.",
  },
  {
    label: "Strategy",
    title: "Strategy & Planning",
    description:
      "Based on research insights, I map information architecture, user flows, and wireframes to create a strong structural foundation before the visual direction is finalized.",
  },
  {
    label: "Design",
    title: "UI/UX Design & Prototyping",
    description:
      "I design high-fidelity interfaces and interactive prototypes in Figma, refining hierarchy, motion, and usability while keeping the experience consistent with your brand.",
  },
  {
    label: "Build",
    title: "Development & Delivery",
    description:
      "I translate the approved direction into clean, responsive frontend code with careful attention to performance, accessibility, and the details that make the final product feel premium.",
  },
  {
    label: "Launch",
    title: "Testing, Launch & Optimization",
    description:
      "Before launch, I review the experience across devices and browsers, then refine interactions and performance so the final release feels polished, stable, and ready to grow.",
  },
];

function Portfolio() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [pf_activeIdx, setPf_activeIdx] = useState(0);
  const pf_trackRef = useRef(null);


  useEffect(() => {
    if (!pf_trackRef.current) return;
    const card = pf_trackRef.current.querySelector(".project-card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(pf_trackRef.current).gap) || 24;
    pf_trackRef.current.style.transform =
      `translateX(-${pf_activeIdx * (card.offsetWidth + gap)}px)`;
  }, [pf_activeIdx]);
  useEffect(() => {
    const check = () => setIsTouchDevice(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const [showPreloader, setShowPreloader] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {

      gsap.set(".panels", {
        zIndex: (i, target, targets) => targets.length - i,
      });


      gsap.to(".panels:not(:last-child)", {
        yPercent: -100,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: "#container",
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [rw_idx, setRw_idx] = useState(0);
  const rw_total = 4;
  const [crs_active, setCrs_active] = useState(false);
  const rw_trackRef = useRef(null);
  const crs_ref = useRef(null);
  const crs_areaRef = useRef(null);
  const crs_raf = useRef(null);
  const crs_mouse = useRef({ x: 0, y: 0 });
  const crs_cur = useRef({ x: 0, y: 0 });


  useEffect(() => {
    if (!rw_trackRef.current) return;

    const cards = rw_trackRef.current.querySelectorAll(".rw-card");
    if (!cards.length) return;

    const card = cards[0];
    const gap = parseFloat(getComputedStyle(rw_trackRef.current).gap) || 24;
    const wrapEl = rw_trackRef.current.parentElement;
    const wrapStyles = getComputedStyle(wrapEl);
    const paddingLeft = parseFloat(wrapStyles.paddingLeft) || 0;
    const paddingRight = parseFloat(wrapStyles.paddingRight) || 0;
    const wrapWidth = Math.max(0, wrapEl.offsetWidth - paddingLeft - paddingRight);
    const trackWidth = cards.length * (card.offsetWidth + gap) - gap;

    const maxTranslate = Math.max(0, trackWidth - wrapWidth);
    const translate = Math.min(rw_idx * (card.offsetWidth + gap), maxTranslate);

    rw_trackRef.current.style.transform = `translateX(-${translate}px)`;
  }, [rw_idx]);

  useEffect(() => {
    if (isTouchDevice) return;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      crs_cur.current.x = lerp(crs_cur.current.x, crs_mouse.current.x, 0.11);
      crs_cur.current.y = lerp(crs_cur.current.y, crs_mouse.current.y, 0.11);
      if (crs_ref.current) {
        crs_ref.current.style.left = `${crs_cur.current.x}px`;
        crs_ref.current.style.top = `${crs_cur.current.y}px`;
      }
      crs_raf.current = requestAnimationFrame(tick);
    };
    const onMove = (e) => { crs_mouse.current = { x: e.clientX, y: e.clientY }; };
    const el = crs_areaRef.current;
    if (el) el.addEventListener("mousemove", onMove);
    crs_raf.current = requestAnimationFrame(tick);
    return () => {
      if (el) el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(crs_raf.current);
    };
  }, [isTouchDevice]);






  const handleCardMouseMove = (e, cardRef) => {
    const thumb = cardRef.current?.querySelector(".rw-card__thumb");
    const demo = cardRef.current?.querySelector(".rw-card__demo");
    if (!thumb || !demo) return;

    const rect = thumb.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    demo.style.left = `${x}px`;
    demo.style.top = `${y}px`;
  };

  // Refs for each card
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
 
const scrollFillRef = useRef(null);






  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openService, setOpenService] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [navTheme, setNavTheme] = useState("light");
  const navbarRef = useRef(null);
  const smootherRef = useRef(null);

  const leftRef = useRef(null);
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(10px)"],
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const techLogos = [
    { node: <SiFigma />, title: "Figma" },
    { node: <SiFramer />, title: "Framer" },
    { node: <SiGreensock />, title: "GSAP" },
    { node: <SiReact />, title: "React" },
    { node: <SiTailwindcss />, title: "Tailwind CSS" },
    { node: <SiJavascript />, title: "JavaScript" },
    { node: <SiHtml5 />, title: "HTML" },
    { node: <SiCss3 />, title: "CSS" },
    { node: <SiSass />, title: "Sass" },
    { node: <SiThreedotjs />, title: "Three.js" },
  ];


  const [localDateTime, setLocalDateTime] = useState("");
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(now);

      const get = (type) => parts.find((p) => p.type === type)?.value || "";

      const formatted = `${get("weekday")} ${get("month")} ${get("day")}, ${get("year")}, ${get("hour")}:${get("minute")} ${get("dayPeriod")}`;

      setLocalDateTime(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const steps = gsap.utils.toArray(".process-step");

      /* ===== Timeline Fill ===== */

      gsap.to(".timeline-line", {
        "--progress": "100%",
        ease: "none",

        scrollTrigger: {
          trigger: ".process-timeline",
          start: "top 60%",
          end: "bottom 70%",
          scrub: 1.4,
        },
      });

      /* ===== Dot Activation ===== */

      steps.forEach((step) => {
        const dot = step.querySelector(".marker-dot");

        gsap.fromTo(
          dot,
          {
            backgroundColor: "#ffffff",
            borderColor: "#d0d0d0",
            scale: 1,
          },
          {
            backgroundColor: "#4CAF50",
            borderColor: "#4CAF50",
            scale: 1.25,
            ease: "power2.out",

            scrollTrigger: {
              trigger: step,
              start: "top 55%",
              end: "top 40%",
              scrub: true,
            },
          },
        );
      });

      /* ===== Step Entrance ===== */

      steps.forEach((step) => {
        gsap.from(step.querySelector(".step-number-wrapper"), {
          x: -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        });

        gsap.from(step.querySelector(".step-container"), {
          x: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=120",
        end: "bottom bottom",
        pin: leftRef.current,
        pinSpacing: false,
      });
    });

    return () => ctx.revert();
  }, []);
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const link = e.target.closest("a[href*='#']");

      if (!link) return;

      const id = link.getAttribute("href").split("#")[1];
      const target = document.getElementById(id);

      if (!target) return;

      e.preventDefault();

      gsap.to(window, {
        duration: 1.4,
        scrollTo: {
          y: target,
          offsetY: 80,
        },
        ease: "power3.out",
      });
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleService = (index) => {
    setOpenService(openService === index ? null : index);
  };
const lastScrollRef = useRef(0);

  useEffect(() => {
    if (!pageReady) return undefined;

    const existingSmoother = ScrollSmoother.get();
    if (existingSmoother) {
      existingSmoother.kill();
    }

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });
    smootherRef.current = smoother;

    ScrollTrigger.refresh();

    const updateNavbar = (currentScroll, direction) => {
      const navbar = navbarRef.current;

      if (!navbar) return;

      setShowNavbar((prev) => {
        if (currentScroll <= 80 || direction === -1) return true;
        if (direction === 1 && currentScroll > 120) return false;
        return prev;
      });

      navbar.classList.toggle("scrolled", currentScroll > 80);
    };

    lastScrollRef.current = smoother.scrollTop();

    const navbarScrollTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        const direction =
          currentScroll === lastScrollRef.current
            ? 0
            : currentScroll > lastScrollRef.current
              ? 1
              : -1;

        updateNavbar(currentScroll, direction);
        lastScrollRef.current = currentScroll;
      },
    });
    updateNavbar(lastScrollRef.current, 0);

    return () => {
      navbarScrollTrigger.kill();
      smoother.kill();
      if (smootherRef.current === smoother) {
        smootherRef.current = null;
      }
    };
  }, [pageReady]);

  useEffect(() => {
    if (!pageReady) return undefined;

    const themedSections = gsap.utils.toArray("[data-nav-theme]");
    if (!themedSections.length) return undefined;

    const applyTheme = (section) => {
      const nextTheme = section?.dataset?.navTheme || "light";
      setNavTheme((prev) => (prev === nextTheme ? prev : nextTheme));
    };

    const updateThemeFromViewport = () => {
      const marker = window.innerHeight * 0.22;
      const activeSection =
        themedSections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= marker && rect.bottom >= marker;
        }) || themedSections[0];

      applyTheme(activeSection);
    };

    let rafId = null;
    const requestThemeUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateThemeFromViewport();
      });
    };

    const sectionTriggers = themedSections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 22%",
        end: "bottom 22%",
        onEnter: () => applyTheme(section),
        onEnterBack: () => applyTheme(section),
        onUpdate: () => requestThemeUpdate(),
      }),
    );

    requestThemeUpdate();
    window.addEventListener("scroll", requestThemeUpdate, { passive: true });
    window.addEventListener("resize", requestThemeUpdate);

    return () => {
      window.removeEventListener("scroll", requestThemeUpdate);
      window.removeEventListener("resize", requestThemeUpdate);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      sectionTriggers.forEach((trigger) => trigger.kill());
    };
  }, [pageReady]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");

      let tops = panels.map((panel) =>
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
        }),
      );

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });

      ScrollTrigger.create({
        snap: {
          snapTo: () => {
            let panelStarts = tops.map((st) => st.start);

            let snapScroll = gsap.utils.snap(
              panelStarts,
              ScrollTrigger.scroll(),
            );

            return gsap.utils.normalize(
              0,
              ScrollTrigger.maxScroll(),
              snapScroll,
            );
          },

          duration: 0.5,
        },
      });

      ScrollTrigger.refresh();
    }, "#smooth-content");

    return () => ctx.revert();
  }, []);

  // UPDATED GSAP ANIMATION - Works without min-height
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".parallax-reveal-section",
          start: "top 120%",
          end: "bottom 100%",
          scrub: 0.8,
        },
      });

      tl.fromTo(
        ".parallax-reveal-card",
        {
          clipPath: "inset(0% 40% 0% 40% round 36px)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          ease: "none",
        },
      );

      tl.fromTo(
        ".parallax-reveal-card",
        {
          scale: 1.6,
          y: 200,
        },
        {
          scale: 1,
          y: 0,
          ease: "none",
        },
        0,
      );
    }, "#smooth-content");

    return () => ctx.revert();
  }, []);

  const services = [
  {
    number: "01",
    name: "UI/UX Design — Layout, Wireframe & Prototype",
    description:
      "Full end-to-end UI/UX design starting from low-fidelity wireframes to high-fidelity Figma prototypes. I map out user flows, information architecture, and interaction patterns before applying the visual layer — so every screen is grounded in usability, not just aesthetics. Covers web apps, mobile apps, dashboards, and digital products.",
    tags: [
      "Wireframing",
      "Prototyping",
      "User Flows",
      "High-Fidelity UI",
      "Figma",
      "Interaction Design",
    ],
    image: mockup2,
  },

  {
    number: "02",
    name: "Web Design & Development",
    description:
      "Custom website design and frontend development — from concept to deployed product. I design clean, responsive layouts and build them with React, Tailwind CSS, and modern frontend tools. Whether it's a business site, portfolio, or multi-page web presence, I handle the full pipeline from design to live deployment.",
    tags: [
      "React",
      "Tailwind CSS",
      "Responsive Design",
      "Frontend Development",
      "Deployment",
      "Performance Optimized",
    ],
    image: mockup1,
  },

  {
    number: "03",
    name: "Landing Page Design & Deployment",
    description:
      "Focused, conversion-oriented landing pages designed to capture attention and drive action — then deployed live. I design with clear messaging, strategic CTAs, and mobile-first layouts, then build and ship the page so it's ready from day one. Ideal for product launches, campaigns, freelance clients, and early-stage businesses.",
    tags: [
      "Conversion-Focused",
      "Mobile-First",
      "Live Deployment",
      "Strategic CTAs",
      "Fast Turnaround",
      "Campaign-Ready",
    ],
    image: mockup,
  },

  {
    number: "04",
    name: "Dashboard & Web App UI Design",
    description:
      "UI design for dashboards, admin panels, and data-heavy web applications. I design clear information hierarchies, intuitive navigation patterns, and component systems that make complex data easy to read and act on. Outputs include annotated Figma files and design systems ready for developer handoff.",
    tags: [
      "Dashboard UI",
      "Admin Panels",
      "Data Visualization",
      "Component Systems",
      "Design Handoff",
      "Web App UI",
    ],
    image: mockup2,
  },

  {
    number: "05",
    name: "Website Redesign & Modernization",
    description:
      "Transforming outdated websites into modern, effective digital experiences. I audit existing sites for design, UX, and performance gaps — then redesign with updated visuals, improved navigation, better mobile responsiveness, and a cleaner overall structure. All while preserving what's already working with your brand.",
    tags: [
      "UX Audit",
      "Visual Refresh",
      "Mobile Optimization",
      "Modern Standards",
      "Brand Consistency",
      "Performance Updates",
    ],
    image: mockup3,
  },

  {
    number: "06",
    name: "Interactive Web Experiences",
    description:
      "Websites with scroll-triggered animations, micro-interactions, and dynamic motion that make the experience feel premium and memorable. I use GSAP and Framer Motion to implement smooth, performance-conscious animations — from parallax effects and reveal sequences to complex timeline-driven interactions.",
    tags: [
      "GSAP",
      "Framer Motion",
      "Scroll Animations",
      "Micro-interactions",
      "Parallax Effects",
      "Motion Design",
    ],
    image: mockup4,
  },

  {
    number: "07",
    name: "Mobile App UI Design",
    description:
      "End-to-end UI/UX design for iOS and Android mobile applications. I design platform-native interfaces with a focus on usability, accessibility, and visual polish — from user flows and wireframes to high-fidelity Figma prototypes with interactive components and handoff-ready specs.",
    tags: [
      "iOS & Android UI",
      "Figma Prototyping",
      "Mobile-First",
      "User Flows",
      "Accessibility",
      "Design Systems",
    ],
    image: mockup2,
  },
];
const handlePreloaderComplete = () => {
  setShowPreloader(false);

  setTimeout(() => {
    setPageReady(true);
    ScrollTrigger.refresh(true);
  }, 80);
};
useEffect(() => {
  if (!pageReady) return undefined;

  const timer = setTimeout(() => {
    setHeroReady(true);
  }, 100);

  return () => clearTimeout(timer);
}, [pageReady]);
useEffect(() => {
  const root = document.documentElement;
  if (!pageReady) {
    root.classList.add("preloader-lock");
    document.body.classList.add("preloader-lock");
  } else {
    setTimeout(() => {
      root.classList.remove("preloader-lock");
      document.body.classList.remove("preloader-lock");
    }, 100);
  }

  return () => {
    root.classList.remove("preloader-lock");
    document.body.classList.remove("preloader-lock");
  };
}, [pageReady]);

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  const faqs = [
    {
      question: "What's your background in UI/UX and web design?",
      answer:
        "I'm a UI/UX and web designer with 1+ years of hands-on experience building websites, landing pages, and digital interfaces. I've completed 6 projects focusing on user-centered design, responsive development, and creating experiences that balance aesthetics with functionality. I continuously learn and apply modern design principles and development techniques.",
    },
    {
      question: "What does your design process look like?",
      answer:
        "I follow a structured approach: research and discovery, wireframing and prototyping, visual design, frontend development, and testing. I prioritize understanding user needs and business goals before moving into execution. Throughout the process, I collaborate closely with stakeholders and iterate based on feedback to ensure the final product meets both user and business objectives.",
    },
    {
      question: "What tools and technologies are you proficient in?",
      answer:
        "Design: Figma, Canva. Development: HTML, CSS, JavaScript, React, Tailwind CSS, GSAP, Framer Motion, Three.js. I'm experienced with responsive design, version control (Git), and performance optimization. I stay current with industry trends and regularly expand my technical skillset to deliver modern, effective solutions.",
    },
    {
      question: "Do you work on both design and development?",
      answer:
        "I design with implementation in mind. Having built projects from Figma prototypes to deployed React applications, I understand the constraints developers work within — which makes my handoffs cleaner and my design decisions more grounded. I'm a designer first, but one who speaks the developer's language.",
    },
    {
      question: "Can you work with existing design systems or brand guidelines?",
      answer:
        "Absolutely. I'm comfortable working within established design systems, brand guidelines, and UI component libraries. I understand the importance of consistency and can adapt my work to fit existing frameworks while bringing thoughtful design solutions that align with company standards.",
    },
    {
      question: "What kind of projects are you most interested in?",
      answer:
        "I'm drawn to projects that prioritize user experience and solve real problems through design. I enjoy working on websites, landing pages, web applications, dashboards, and digital products where thoughtful UI/UX can make a measurable impact. I'm particularly interested in opportunities where I can contribute to product thinking and collaborate with cross-functional teams.",
    },
    {
      question: "Are you available for full-time positions or freelance work?",
        answer:
        "I'm actively looking for a UI/UX or web design role where I can own the full design process — from research and wireframing through to final UI and handoff. I'm eager, fast to learn, and ready to contribute from day one. Open to full-time roles, internships, and select freelance projects.",
    },

  ];
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);
useSplitAnimateReveal();

useEffect(() => {
  const el = scrollFillRef.current;
  if (!el) return;

  // Only target the grey accent span
  const accentEl = el.querySelector(".scroll-fill-text");
  if (!accentEl) return;

  const rawText = accentEl.textContent
    .replace(/\s+/g, " ")
    .trim();
  const chars = rawText.split("");

  accentEl.innerHTML = chars
    .map((char, i) =>
      char === " "
        ? `<span class="sf-space"> </span>`
        : `<span class="sf-char" style="--i:${i}">${char}</span>`
    )
    .join("");

  const ctx = gsap.context(() => {
    const spans = accentEl.querySelectorAll(".sf-char");
    gsap.fromTo(
      spans,
      { color: "#c0c0c0", opacity: 1 },
      {
        color: "#1a1a1a",
        opacity: 1,
        ease: "none",
        stagger: { each: 0.018, from: "start" },
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 2,
        },
      }
    );
  });

  return () => ctx.revert();
}, [pageReady]);
  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <nav
        ref={navbarRef}
        className={`navbar navbar-theme-${navTheme} ${showNavbar ? "navbar-visible" : "navbar-hidden"}`}
      >
        <div className="logo">
          <a href="#heros">
            <img src={logo} alt="Logo" />
          </a>
        </div>

        <ul className="nav-links desktop-nav">
          <li>
            <a href="/about-web-designer" className="nav-link-animated">
              <span className="nav-text">
                <span className="nav-text-top">About</span>
                <span className="nav-text-bottom">About</span>
              </span>
            </a>
          </li>

          <li>
            <a href="#services" className="nav-link-animated">
              <span className="nav-text">
                <span className="nav-text-top">What I Do</span>
                <span className="nav-text-bottom">What I Do</span>
              </span>
            </a>
          </li>
          <li>
            <a href="#projects" className="nav-link-animated">
              <span className="nav-text">
                <span className="nav-text-top">Projects</span>
                <span className="nav-text-bottom">Projects</span>
              </span>
            </a>
          </li>


          {/* CTA stays untouched */}
          <a href="/contact-me" className="nav-cta-btn1s">

            Get in Touch
          </a>
        </ul>

        <button
          className={`mobile-menu-button ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          Menu
          {isMobileMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </nav>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div
            className="portfolio-container"
            id="heros"
            style={{ "--hero-bg-image": `url(${blueBackground1})` }}
          >
            {/* Backdrop Overlay */}
            <div
              className={`mobile-menu-backdrop ${isMobileMenuOpen ? "open" : ""}`}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
              {/* Close Button */}
              <button
                className="mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <span className="close-line close-line-1"></span>
                <span className="close-line close-line-2"></span>
              </button>

              {/* Menu Header */}
              <div className="mobile-menu-header">
                <h3 className="mobile-menu-title">Menu</h3>
                <p className="mobile-menu-subtitle">
                  Explore my work & services
                </p>
              </div>

              {/* Navigation Links with Numbers & Descriptions */}
              <nav className="mobile-nav-container">
                <ul className="mobile-nav-links">
                  <li className="mobile-nav-item">
                    <a
                      href="/about-web-designer"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">01</span>
                      <div className="nav-content">
                        <span className="nav-label">About</span>
                        <span className="nav-description">
                          Learn about my approach
                        </span>
                      </div>
                      <FaArrowRight className="nav-arrow" />
                    </a>
                  </li>
                  <li className="mobile-nav-item">
                    <a href="#services" onClick={closeMobileMenu} className="mobile-nav-link">
                      <span className="nav-number">02</span>
                      <div className="nav-content">
                        <span className="nav-label">What I Do</span>
                        <span className="nav-description">My capabilities & expertise</span>
                      </div>
                      <FaArrowRight className="nav-arrow" />
                    </a>
                  </li>

                  <li className="mobile-nav-item">
                    <a
                      href="#projects"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">03</span>
                      <div className="nav-content">
                        <span className="nav-label">Projects</span>
                        <span className="nav-description">
                          View my latest work
                        </span>
                      </div>
                      <FaArrowRight className="nav-arrow" />
                    </a>
                  </li>

                  <li className="mobile-nav-item">
                    <a
                      href="#process"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">04</span>
                      <div className="nav-content">
                        <span className="nav-label">Process</span>
                        <span className="nav-description">
                          How I bring ideas to life
                        </span>
                      </div>
                      <FaArrowRight className="nav-arrow" />
                    </a>
                  </li>
                  <li className="mobile-nav-item">
                    <a
                      href="#contact"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">05</span>
                      <div className="nav-content">
                        <span className="nav-label">Contact</span>
                        <span className="nav-description">
                          Get in touch with me
                        </span>
                      </div>
                      <FaArrowRight className="nav-arrow" />
                    </a>
                  </li>
                </ul>
              </nav>

              {/* CTA Section */}


              {/* Contact Info Footer */}

            </div>
            <motion.main
              ref={heroRef}
              className={`hero-section panel ${heroReady ? "hero-ready" : ""}`}
              id="hero"
              data-nav-theme="light"
              style={{ filter: blur, opacity }}
            >
              <div className="hero-background" aria-hidden="true"></div>
              <div className="hero-entry-overlay" aria-hidden="true"></div>
              <div className="hero-wrapper">
                <div className="hero-content">
               <p className="tagline hero-tagline-entry">UI/UX Designer & Web Designer</p>

                  <h1
                    className="hero-title split-animate hero-title-reveal"
                    data-split-mode="hero"
                  >
                    I turn{" "}
                    <span className="highlight">interfaces</span>{" "}
                  into experiences — from pixel to productions
                  </h1>
                  <div className="hero-stats hero-stats-entry">
                    <div className="stat-item">
                      <span className="stat-number">6</span>
                       <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">1+</span>
                 <span className="stat-label">Year of Practice</span>
                    </div>
                    <div className="stat-item">
                   <span className="stat-number">UI/UX</span>
                        <span className="stat-label">Primary Discipline</span>
                    </div>
                  </div>
             <div className="hero-cta-group hero-cta-entry">
                  <a href="#projects" className="cta-button">
                      View My Work
                    </a>

                    <a href="/about-web-designer" className="cta-buttons1">
                      Let's Connect
                    </a>
                  </div>

                </div>

                <div className="hero-card hero-card-entry">
                  <TiltedCard
                    imageSrc={mockup4}
                    altText="Klent Russell Aguilar"
                    captionText="Web / UI/UX Designer  | Klent Russell Aguilar"
                    containerHeight="clamp(240px, 70vw, 520px)"
                    containerWidth="clamp(240px, 70vw, 520px)"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={21}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent={false}
                  />
                </div>
              </div>
            </motion.main>
          </div>

          <section className="about-section" id="about" data-nav-theme="dark">
            <div className="about-container">
              <h2 className="about-title" ref={scrollFillRef}>
                <span className="scroll-fill-text about-title-accent">Design isn't just about how it looks. It's about how it works, how users feel, and whether it actually solves the problem it was built for.</span>
              </h2>

            </div>
          </section>

       {/* Services Section */}
<section className="services-section" data-nav-theme="dark">
  <div className="services-container">
    <div className="services-header">
      <h2 className="services-title" id="services">What I Do</h2>
    </div>

    <div className="services-content">
      <span className="services-index">(CAPABILITIES — 02)</span>
    </div>

    <div className="services-divider"></div>

    <div className="services-list">
      <div className="services-items">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            
            {/* HEADER */}
            <div
              className="service-header"
              onClick={() => toggleService(index)}
            >
              <div className="service-number">{service.number}</div>
              <h3 className="service-name">{service.name}</h3>
              <button className="service-toggle">
                {openService === index ? "−" : "+"}
              </button>
            </div>

            {/* DETAILS */}
            <div
              className={`service-details ${
                openService === index ? "open" : ""
              }`}
            >
              <p className="service-description">
                {service.description}
              </p>

{/* Tags — CSS-only, no Framer conflict */}
<div className="service-tags">
  {service.tags.map((tag, tagIndex) => (
    <span
      key={tagIndex}
      className="tag"
      style={{
        transitionDelay: openService === index ? `${tagIndex * 0.06}s` : "0s",
      }}
    >
      {tag}
    </span>
  ))}
</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

          {/* Works Section */}
          <section className="works-section" data-nav-theme="dark">
            <div className="works-container">
              <div className="works-header">
                <h2 className="works-title" id="projects">Recent Work</h2>
                <div className="works-header-right">

                </div>
              </div>

              <span className="works-index">(PORTFOLIO — 03)</span>
              <div className="works-divider"></div>

              {!isTouchDevice && (
                <div
                  ref={crs_ref}
                  className={`crs-cursor ${crs_active ? "crs-cursor--visible" : ""}`}
                  aria-hidden="true"
                >
                  <div className="crs-cursor__blob">
                    <span className="crs-cursor__text">

                      View Details
                    </span>
                  </div>
                </div>
              )}

              {/* Carousel */}
              <div
                className="rw-wrap"
                ref={crs_areaRef}
                onMouseEnter={() => { if (!isTouchDevice) setCrs_active(true); }}
                onMouseLeave={() => setCrs_active(false)}
              >
                <div className="rw-track" ref={rw_trackRef}>

                  {/* Card 1 */}
                 <article
                    className="rw-card"
                    ref={card1Ref}
                    onMouseMove={(e) => handleCardMouseMove(e, card1Ref)}
                  >
                    <div className="rw-card__thumb">
                      <img src={soon} alt="Century 21 Pura Vida" draggable="false" />
                      <div className="rw-card__demo">
                        <span className="rw-card__demo-text">

                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="rw-card__body">
                      <div className="rw-card__meta">
                        <h3 className="rw-card__name">Barangay Bangkal</h3>
                        <p className="rw-card__period">(2025 — 2026)</p>
                      </div>  
                      <div className="rw-card__chips">
                        <span className="rw-chip">Capstone</span>
                        <span className="rw-chip">Web App</span>
                        <span className="rw-chip">Document Request</span>
                      </div>
                    </div>
                  </article>

                  {/* Card 2 */}
                  <article
                    className="rw-card"
                    ref={card2Ref}
                    onMouseMove={(e) => handleCardMouseMove(e, card2Ref)}
                  >
                    <div className="rw-card__thumb">
                      <img src={soon} alt="Century 21 Pura Vida" draggable="false" />
                      <div className="rw-card__demo">
                        <span className="rw-card__demo-text">

                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="rw-card__body">
                      <div className="rw-card__meta">
                        <h3 className="rw-card__name">Virielle</h3>
                        <p className="rw-card__period">(2025 — 2026)</p>
                      </div>  
                      <div className="rw-card__chips">
                        <span className="rw-chip">Website Design</span>
                        <span className="rw-chip">UI/UX</span>
                        <span className="rw-chip">Freelance</span>
                      </div>
                    </div>
                  </article>

                  {/* Card 3 */}
                  <article
                    className="rw-card"
                    ref={card3Ref}
                    onMouseMove={(e) => handleCardMouseMove(e, card3Ref)}
                  >
                    <div className="rw-card__thumb">
                      <img src={soon} alt="Digital Wellness" draggable="false" />
                      <div className="rw-card__demo">
                        <span className="rw-card__demo-text">

                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="rw-card__body">
                      <div className="rw-card__meta">
                        <h3 className="rw-card__name">ClockedIn</h3>
                        <p className="rw-card__period">(2025 — 2026)</p>
                      </div>  
                      <div className="rw-card__chips">
                        <span className="rw-chip">Ojt Tracker</span>
                        <span className="rw-chip">Web App</span>
             
                      </div>
                    </div>
                  </article>

                  {/* Card 4 */}
                  <article
                    className="rw-card"
                    ref={card4Ref}
                    onMouseMove={(e) => handleCardMouseMove(e, card4Ref)}
                  >
                    <div className="rw-card__thumb">
                      <img src={soon} alt="Brand Refresh" draggable="false" />
                      <div className="rw-card__demo">
                        <span className="rw-card__demo-text">

                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="rw-card__body">
                      <div className="rw-card__meta">
                        <h3 className="rw-card__name">ArmadaPH</h3>
                        <p className="rw-card__period">(2025 — 2026)</p>
                      </div>  
                      <div className="rw-card__chips">
                        <span className="rw-chip">Redesign</span>
                        <span className="rw-chip">Branding</span>
                        <span className="rw-chip">Dance Studio</span>
                      </div>
                    </div>
                  </article>

          

                </div>

                <div className="rw-nav">
                  <button
                    className={`rw-nav__btn ${rw_idx === 0 ? "rw-nav__btn--off" : ""}`}
                    onClick={() => setRw_idx((n) => Math.max(0, n - 1))}
                    disabled={rw_idx === 0}
                    aria-label="Previous project"
                  >
                    <MdOutlineArrowBackIos />
                  </button>

                  <div className="rw-nav__dots">
                    {Array.from({ length: rw_total }).map((_, idx) => (
                      <button
                        key={`rw-dot-${idx}`}
                        type="button"
                        className={`rw-nav__dot ${rw_idx === idx ? "rw-nav__dot--on" : ""}`}
                        onClick={() => setRw_idx(idx)}
                        aria-label={`Go to project ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <span className="rw-nav__count">
                    <b>{String(rw_idx + 1).padStart(2, "0")}</b>
                    <span> / {String(rw_total).padStart(2, "0")}</span>
                  </span>

                  <button
                    className={`rw-nav__btn rw-nav__btn--fwd ${rw_idx === rw_total - 1 ? "rw-nav__btn--off" : "rw-nav__btn--on"}`}
                    onClick={() => setRw_idx((n) => Math.min(rw_total - 1, n + 1))}
                    disabled={rw_idx === rw_total - 1}
                    aria-label="Next project"
                  >
                    <MdOutlineArrowForwardIos />
                  </button>
                </div>

              </div>

              <div className="works-statement">
                <p className="statement-text split-animate">
                  Each project is driven by{" "}
                  <span className="statement-highlight">
                    rigorous thinking and uncompromising attention to detail.
                  </span>
                </p>
                <a href="/contact-me" className="cta-button">Discuss Your Project</a>
              </div>
            </div>
          </section>

          {/* Process Section - Updated Layout */}
          <section className="process-section" data-nav-theme="light">
            <div className="process-container">
              <div className="process-header-wrapper">
                <div className="process-header" id="process">
                  <span className="process-index">(PROCESS — 04)</span>
                  <h2 className="process-title ">
                        My design process —
                    <span className="process-title-accent">
                      {" "}
                      from first research question to shipped product.
                    </span>
                  </h2>

                </div>
              </div>
              <div>
                {/* Basic horizontal loop */}
                <LogoLoop
                  logos={techLogos}
                  speed={30}
                  direction="left"
                  logoHeight={window.innerWidth <= 768 ? 40 : 70}
                  gap={60}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="#ffffff"
                  ariaLabel="Technology partners"
                />
              </div>

              <div className="process-divider"></div>

              <div className="process-timeline">
                <div className="timeline-line">
                  <div className="timeline-progress"></div>
                </div>
                <div className="process-steps ">
                  {/* Step 1 */}
                  <div className="process-step" data-step="1">
                    <div className="step-number-wrapper">
                    <span className="step-number">01.</span>
                      <span className="step-label">Research</span>
                    </div>

                    <div className="step-marker">
                      <div className="marker-dot"></div>
                    </div>

                    <div className="step-container">
                      <div className="step-content">
                          <h3 className="step-title">Research & Discovery</h3>
                        <p className="step-description">
                          I start by understanding the problem — not opening a design tool. This means stakeholder interviews, user research, surveys, competitive analysis, and reviewing existing analytics. Every decision that follows is grounded in evidence, not assumption.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="process-step" data-step="2">
                    <div className="step-number-wrapper">
                        <span className="step-number">02.</span>
                      <span className="step-label">Define</span>
                    </div>

                    <div className="step-marker">
                      <div className="marker-dot"></div>
                    </div>

                    <div className="step-container">
                      <div className="step-content">
                       <h3 className="step-title">Define & Structure</h3>
                        <p className="step-description">
                          Research gets synthesized into user personas, journey maps, and a clear problem statement. I then map information architecture, sitemaps, and navigation flows — so users can find what they need intuitively, before any screen is designed.
                        </p>

                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="process-step" data-step="3">
                    <div className="step-number-wrapper">
                              <span className="step-number">03.</span>
                      <span className="step-label">Wireframe</span>
                    </div>

                    <div className="step-marker">
                      <div className="marker-dot"></div>
                    </div>

                    <div className="step-container">
                      <div className="step-content">
                        <h3 className="step-title">UI/UX Design with Wireframing & Prototyping</h3>
                     
                        <p className="step-description">
                          Low-fidelity wireframes lock in layout, hierarchy, and how screens connect — fast and cheap to change. These become interactive Figma prototypes for early usability testing, validating flows before a single line of code is written.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="process-step" data-step="4">
                    <div className="step-number-wrapper">
                        <span className="step-number">04.</span>
                      <span className="step-label">Visual Design</span>
                    </div>

                    <div className="step-marker">
                      <div className="marker-dot"></div>
                    </div>

                    <div className="step-container">
                      <div className="step-content">
                         <h3 className="step-title">Visual Design & UI</h3>
                        <p className="step-description">
                          Once flows are validated, I apply the full visual layer — typography systems, color, spacing, iconography, and component libraries in Figma. This is where the product starts looking and feeling real. Design specs and annotated interactions are prepared for a clean developer handoff.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="process-step" data-step="5">
                    <div className="step-number-wrapper">
                      <span className="step-number">05.</span>
                      <span className="step-label">Build & Ship</span>
                    </div>

                    <div className="step-marker">
                      <div className="marker-dot"></div>
                    </div>

                    <div className="step-container">
                      <div className="step-content">
                        <h3 className="step-title">Build, Test & Launch</h3>
                        <p className="step-description">
                          Designs are implemented in React — responsive, accessible, and performance-optimized. I review the live build against designs, catch spacing issues and missing states, then run cross-browser and device QA before anything ships. Post-launch, I monitor analytics and iterate based on real user behavior.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Man Behind The Work Section */}
          <section className="man-behind-section" data-nav-theme="dark">
            <div className="man-behind-container">
              <div className="man-behind-header ">
                <h2 className="man-behind-title">
                  About Me
                </h2>
              </div>
              <div className="services-content">
                <span className="services-index">( ABOUT ME — 05 )</span>
                <h3 className="services-subtitless split-animate">
          Good design is invisible — <br />
                  <span className="services-subtitle-accent">
                    {" "}
                    you only notice it when it's missing.
                  </span>
                </h3>
              </div>

              <div className="about-content">
                <div className="about-cards">
                  <div
                    className="about-card card-blue card-blue-images"
                    style={{ backgroundImage: `url(${mockup3})` }}
                  ></div>
                  <div className="about-stats">
                    <div className="stats-item">
                      <h3 className="stats-number ">
                        <img
                          src={experienceIcon}
                          alt="experience watermark"
                          className="stats-watermarks"
                        />
                        1<span className="stats-years">Year</span>
                      </h3>

                    <p className="stats-description">
                        Building interfaces that balance aesthetics, usability, and real-world performance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="about-stats ">
                  <div className="stats-item">
                    <h3 className="stats-number">6</h3>
                    <img
                      src={projects}
                      alt="projects watermark"
                      className="stats-watermark"
                    />
               <p className="stats-description">
                        Across web, mobile UI, and interactive experiences.
                      </p>
                  </div>
                </div>
              </div>

              <div className="about-topbar">
                <p className="about-mini-desc">
           UI/UX and web design — with the frontend skills to bring it to life.
                </p>

               <a href="/about-web-designer" className="cta-button">See the Full Story</a>
              </div>
            </div>
          </section>

          <section className="works-section" data-nav-theme="dark">
            <Maillards />
          </section>

          <section className="parallax-reveal-section" data-nav-theme="dark">
            <div className="parallax-reveal-sticky">
              <div className="parallax-reveal-card">
          <h2 className="cta-title">
                  Looking for a <span className="highlight">UI/UX designer</span> who understands both design and code?
                </h2>

              <p className="cta-description split-animate">
                  I'm actively seeking UI/UX and web design roles. I bring research-grounded design,
                  Figma-to-code capability, and genuine enthusiasm for every project I take on. If
                  you're hiring or want to collaborate — I'd love to hear from you.
                </p>
                 <a href="/contact-me" className="cta-button">Let's Work Together</a>

              </div>
            </div>
          </section>
          <div id="container" ref={containerRef}>
            <section className="faq-section panels" id="faq" data-nav-theme="dark">
              <div className="faq-container">
                <h2 className="faq-title split-animate">
                  Questions You Might Ask
                </h2>

                <div className="faq-list">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`faq-item ${openFAQ === index ? "active" : ""}`}
                    >
                      <button
                        className="faq-question"
                        onClick={() => toggleFAQ(index)}
                        aria-expanded={openFAQ === index}
                      >
                        <span className="faq-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="faq-question-text">
                          {faq.question}
                        </span>
                        <span className="faq-toggle-icon">
                          {openFAQ === index ? "×" : "+"}
                        </span>
                      </button>

                      <div
                        className={`faq-answer ${openFAQ === index ? "open" : ""}`}
                      >
                        <div className="faq-answer-content">
                          <p>{faq.answer}</p>

                          {faq.question.includes("Free Landing") && (
                            <div className="faq-cta-wrapper">
                              <a href="/free-landing-page#start" className="faq-cta-btn">
                                Get Started . .
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            {/* Footer Section */}
            <footer className="footer-section panels" id="contact" data-nav-theme="light">
              <div className="footer-container">
                <div className="footer-top">
                  <div className="footer-cta">
                    <p className="footer-label">LET'S CONNECT</p>
                    <h2 className="footer-email ">
                      <a href="mailto:klentaguilar@gmail.com">
                        klentaguilar@gmail.com
                      </a>
                    </h2>
                    <a href="/contact-me" className="footer-cta-button">
                      Start a Conversation
                      <span className="footer-arrow-circle">
                        <FaArrowRight />
                      </span>
                    </a>
                  </div>
                </div>

                <div className="footer-middle">
                  <div className="footer-brand">
                    <div className="footer-logo-section">
                      <img src={logo} alt="Logo" className="footer-logo" />
                      <div className="footer-logo-text">
                        <span className="logo-name">Russell</span>
                        <span className="logo-surname">Aguilar</span>
                      </div>
                    </div>
                    <div className="footer-brand-content">
                      <p className="footer-tagline ">
                        Web designer focused on creating user-friendly,
                        conversion-oriented websites through thoughtful design,
                        clean development, and attention to user experience.
                      </p>

                      <p className="footer-copyright">
                         © 2026 Designed and built by Klent Russell Aguilar — UI/UX & Web Designer
                      </p>
                    </div>

                    <div className="footer-location-info">
                      <div className="footer-info-item">
                        <p className="footer-info-label">Local Address:</p>
                        <p className="footer-info-value">
                          Malolos City, Bulacan, Philippines
                        </p>
                      </div>
                      <div className="footer-info-item">
                        <p className="footer-info-label">Local Time:</p>
                        <p className="footer-info-value">
                          {localDateTime} Philippines (UTC+8)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="footer-links">
                    <div className="footer-column">
                      <h3 className="footer-column-title">NAVIGATE</h3>
                      <ul className="footer-nav-list">
                        <li>
                          <a href="#heros">Home</a>
                        </li>
                        <li>
                          <a href="#about">About</a>
                        </li>
                        <li>
                          <a href="#services">Services</a>
                        </li>
                        <li>
                          <a href="#projects">Projects</a>
                        </li>
                        <li>
                          <a href="#process">Process</a>
                        </li>
                        <li>
                          <a href="#process">Contact</a>
                        </li>
                        <li>
                          <a href="#about">Profile</a>
                        </li>
                      </ul>
                    </div>

                    <div className="footer-column">
                      <h3 className="footer-column-title">SOCIAL MEDIA</h3>
                      <ul className="footer-nav-list">
                        <li>
                          <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebook className="footer-icon" /> Facebook
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaInstagram className="footer-icon" /> Instagram
                          </a>
                        </li>

                        <li>
                          <a
                            href="https://dribbble.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaDribbble className="footer-icon" /> Dribbble
                          </a>
                        </li>

                        <li>
                          <a
                            href="https://discord.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaDiscord className="footer-icon" /> Discord
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin className="footer-icon" /> LinkedIn
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://indeed.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <SiIndeed className="footer-icon" /> Indeed
                          </a>
                        </li>
                      </ul>{" "}
                    </div>
                  </div>
                </div>

                <div className="footer-bottom">
                  <div className="footer-logo-large">
                    <span className="logo-virielle-large">PORTFOLIO</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
