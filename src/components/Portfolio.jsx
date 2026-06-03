import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Portfolio.css";
import experienceIcon from "../assets/experience.svg";
import projects from "../assets/projects.svg";
import LogoLoop from "./LogoLoop";
import Maillards from "./Maillards";
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
  FaQuoteLeft,
  FaStar,
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
import grad from "../assets/grad.jpg";
import aboutme from "../assets/aboutme.png";
import soon from "../assets/soon.png";
import bangkalProject from "../assets/bangkalproject.png";
import virielleproject from "../assets/virielleorig.png";
import laconslanetproject from "../assets/laconslanetproject.png";
import arielleproject from "../assets/arielleproject.png";
import bangkaLogo from "../assets/bangka.png";
import ladyLogo from "../assets/lady.png";
import laconslanetLogo from "../assets/laconslanet.png";
import viriellesLogo from "../assets/virielles.png";
import nammerAvatar from "../assets/nammer1.png";
import ladyAvatar from "../assets/ladyclient.jpg";
import czarAvatar from "../assets/czar.jpg";
import ellaAvatar from "../assets/ella.jpg";
import TiltedCard from "./TiltedCard";
import useSplitAnimateReveal from "./useSplitAnimateReveal";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

const PROCESS_STEPS = [
  {
    label: "Discover",
    title: "Research & Discovery",
    description:
      "I align with stakeholders on business goals, user needs, scope, and constraints, then conduct user research, market checks, and initial insights gathering to understand the problem context clearly.",
  },
  {
    label: "Define",
    title: "Define & Strategize",
    description:
      "I synthesize research into clear problem statements, user personas, journeys, and information architecture, ensuring both user needs and business goals are aligned before design decisions begin.",
  },
  {
    label: "Design",
    title: "Design & Prototype",
    description:
      "I translate structure into wireframes and evolve them into high-fidelity UI designs in Figma, focusing on layout, hierarchy, interaction flow, and system consistency.",
  },
  {
    label: "Deliver",
    title: "Test, Handoff & Iterate",
    description:
      "I validate designs through usability testing and feedback, collaborate with developers during implementation, and refine the experience based on real usage and post-launch insights.",
  }
];
function Portfolio() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const check = () => setIsTouchDevice(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
  useEffect(() => {
    if (!pageReady) return undefined;
    const ctx = gsap.context(() => {

      // Cards fade up on scroll — clean, no scale
      gsap.utils.toArray(".rw-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: (i % 3) * 0.07,
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );

      });

      // Divider draw
      gsap.fromTo(".rw-top-divider",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".rw-top-divider", start: "top 90%" },
        }
      );

    });
    return () => ctx.revert();
  }, [pageReady]);
  const [showPreloader, setShowPreloader] = useState(true);
  const [crs_active, setCrs_active] = useState(false);

  const crs_ref = useRef(null);
  const crs_areaRef = useRef(null);
  const crs_raf = useRef(null);
  const crs_mouse = useRef({ x: 0, y: 0 });
  const crs_cur = useRef({ x: 0, y: 0 });




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









  const scrollFillRef = useRef(null);
  const aboutVisualRef = useRef(null);






  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openService, setOpenService] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [navTheme, setNavTheme] = useState("light");
  const navbarRef = useRef(null);
  const smootherRef = useRef(null);
  const processSectionRef = useRef(null);
  const [smoothReady, setSmoothReady] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: aboutVisualProgress } = useScroll({
    target: aboutVisualRef,
    offset: ["start end", "end start"],
  });

  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(10px)"],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.82, 1], [1, 0.15, 0]);
  const aboutPortraitY = useTransform(aboutVisualProgress, [0, 1], ["-3%", "3%"]);

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
    if (!pageReady || !smoothReady) return undefined;

    const processSection = processSectionRef.current;
    if (!processSection) return undefined;

    let ctx;
    let mm;
    let firstFrame = 0;
    let secondFrame = 0;
    let refreshTimer = 0;

    const initProcessAnimation = () => {
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(processSection);
        const timeline = q(".process-timeline")[0];
        const timelineLine = q(".timeline-line")[0];
        const steps = q(".process-step");
        const stickyPanel = q(".process-sticky-panel")[0];
        const stickyDots = q(".process-roll-dot");
        const rollNumberStack = q(".process-roll-number-stack")[0];
        const rollLabelStack = q(".process-roll-label-stack")[0];

        if (!timeline || !timelineLine || !steps.length) return;

        gsap.set(timelineLine, { "--progress": "0%" });
        gsap.to(timelineLine, {
          "--progress": "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top center",
            end: "bottom center",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });

        mm = gsap.matchMedia();
        mm.add("(min-width: 769px)", () => {
          if (!stickyPanel || !rollNumberStack || !rollLabelStack) {
            return undefined;
          }

          let activeStepIndex = -1;
          const stepMarkers = steps.map((step) => step.querySelector(".step-marker") || step);

          const getStepAtViewportCenter = () => {
            const viewportCenter = window.innerHeight / 2;

            return stepMarkers.reduce((activeIndex, marker, markerIndex) => {
              const rect = marker.getBoundingClientRect();
              const markerCenter = rect.top + rect.height / 2;
              return markerCenter <= viewportCenter + 1 ? markerIndex : activeIndex;
            }, 0);
          };

          const setActiveProcessStep = (nextIndex, immediate = false) => {
            const activeIndex = gsap.utils.clamp(0, steps.length - 1, nextIndex);
            if (activeStepIndex === activeIndex && !immediate) return;

            activeStepIndex = activeIndex;

            const numberHeight =
              rollNumberStack
                .querySelector(".process-roll-number")
                ?.getBoundingClientRect().height || 0;
            const labelHeight =
              rollLabelStack
                .querySelector(".process-roll-label")
                ?.getBoundingClientRect().height || 0;
            const duration = immediate ? 0 : 0.58;

            gsap.to(rollNumberStack, {
              y: numberHeight ? -numberHeight * activeIndex : 0,
              duration,
              ease: "power3.out",
              overwrite: "auto",
            });

            gsap.to(rollLabelStack, {
              y: labelHeight ? -labelHeight * activeIndex : 0,
              duration: immediate ? 0 : 0.46,
              ease: "power3.out",
              overwrite: "auto",
            });

            steps.forEach((step, index) => {
              const marker = step.querySelector(".marker-dot");
              step.classList.toggle("is-active", index === activeIndex);
              marker?.classList.toggle("is-active", index <= activeIndex);
            });

            stickyDots.forEach((dot, index) => {
              dot.classList.toggle("is-active", index <= activeIndex);
            });
          };

          setActiveProcessStep(getStepAtViewportCenter(), true);

          const pinTrigger = ScrollTrigger.create({
            trigger: timeline,
            start: "top top",
            end: "bottom bottom",
            pin: stickyPanel,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              setActiveProcessStep(getStepAtViewportCenter(), true);
            },
          });

          const stepTriggers = steps.map((step, index) =>
            ScrollTrigger.create({
              trigger: stepMarkers[index],
              start: "center center",
              end: "center center",
              invalidateOnRefresh: true,
              onEnter: () => setActiveProcessStep(index),
              onEnterBack: () => setActiveProcessStep(index),
              onRefresh: (self) => {
                if (self.isActive) {
                  setActiveProcessStep(index, true);
                  return;
                }

                setActiveProcessStep(getStepAtViewportCenter(), true);
              },
            }),
          );

          return () => {
            pinTrigger.kill();
            stepTriggers.forEach((trigger) => trigger.kill());
          };
        });

        steps.forEach((step) => {
          const markerDot = step.querySelector(".marker-dot");
          const markerAnchor = step.querySelector(".step-marker") || step;
          const numberBlock = step.querySelector(".step-number-wrapper");
          const rightPanel = step.querySelector(".step-container");

          if (markerDot) {
            gsap.fromTo(
              markerDot,
              {
                backgroundColor: "#323131",
                borderColor: "#5a5a5a",
                scale: 1,
              },
              {
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                scale: 1.25,
                ease: "power2.out",
                overwrite: "auto",
                scrollTrigger: {
                  trigger: markerAnchor,
                  start: "center 62%",
                  end: "center center",
                  scrub: 0.55,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          if (numberBlock) {
            gsap.fromTo(
              numberBlock,
              { opacity: 0, x: -48 },
              {
                opacity: 1,
                x: 0,
                duration: 0.78,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: markerAnchor,
                  start: "center 74%",
                  toggleActions: "play none none reverse",
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          if (rightPanel) {
            gsap.fromTo(
              rightPanel,
              { opacity: 0, x: 72, y: 16 },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.86,
                delay: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: markerAnchor,
                  start: "center 72%",
                  toggleActions: "play none none reverse",
                  invalidateOnRefresh: true,
                },
              },
            );
          }
        });
      }, processSection);

      ScrollTrigger.refresh();
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    };

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(initProcessAnimation);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(refreshTimer);
      mm?.revert();
      ctx?.revert();
    };
  }, [pageReady, smoothReady]);
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

    setSmoothReady(false);

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

    let isActive = true;
    let readyFrame = 0;
    let fontsFrame = 0;

    const refreshSmoother = () => {
      if (!isActive) return;
      ScrollTrigger.refresh();
      setSmoothReady(true);
    };

    readyFrame = window.requestAnimationFrame(refreshSmoother);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!isActive) return;
        fontsFrame = window.requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    }

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
      isActive = false;
      window.cancelAnimationFrame(readyFrame);
      window.cancelAnimationFrame(fontsFrame);
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
  const [testiIndex, setTestiIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(null);

  const testimonials = [{
    quote: "I highly recommend Mr. Russell Aguilar for his excellent work and professionalism. He created my portfolio beautifully and was very responsive, accommodating, and easy to work with throughout the entire process. He listened carefully to my ideas, welcomed revisions, and delivered results that exceeded my expectations. The final output was clean, creative, and high quality, and I’m genuinely very satisfied with his work. Thank you so much!",
    name: "Lady Arielle",
    role: "Marketing Portfolio Website",
    brand: "Lady Arielle",
    brandLogo: ladyLogo,
    avatar: ladyAvatar,
    rating: 5.0,
    date: "May 2026",
  },
  {
    quote: "Dati puro pila at balik-balik lang ang mga residente namin just to follow up. Now through QRUSH, online na ang lahat — may tracking, may QR, may notifications pa. Ang ganda pa ng interface, bagay talaga sa aming barangay. Malaking tulong sa amin ang system na ito.",
    name: "Capt. Nammer A. Bulaong",
    role: "Barangay Captain · Barangay Bangkal, Malolos, Bulacan",
    brand: "QRUSH",
    brandLogo: bangkaLogo,
    avatar: nammerAvatar,
    rating: 4.8,
    date: "December 2025",
  },

  {
    quote: "We went to Mr. Russell because we needed a UI/UX redesign before our defense — for the web app, mobile version, and even our research poster. We weren’t disappointed at all. He immediately understood the concept of LaConsolaNet without needing too much explanation, and the final output was a huge improvement from before. The glow-up was incredible. Highly recommended.",
    name: "Czar Bjorn Medina & Team",
    role: "Capstone Client · UI/UX Redesign, Mobile & Research Poster",
    brand: "LaConsolaNet!",
    brandLogo: laconslanetLogo,
    avatar: czarAvatar,
    rating: 4.9,
    date: "December 2025",
  },
  {
    quote: "Mr. Russell Aguilar and I go way back — we were schoolmates at La Consolacion University, and he was actually referred to me by our friends when I needed someone to design our studio website. I’m really glad I worked with him because he understood the vision right away without needing too much explanation. The final result perfectly captured the brand identity we wanted to showcase.",
    name: "Madelle Ella",
    role: "Freelance Client · Studio Website Design",
    brand: "Virielle Studio",
    brandLogo: viriellesLogo,
    avatar: ellaAvatar,
    rating: 4.3,
    date: "April 2026",
  },
  ];
  const TESTIMONIALS_PER_PAGE = 2;
  const totalTestimonialPages = Math.ceil(
    testimonials.length / TESTIMONIALS_PER_PAGE,
  );
  const visibleTestimonials = testimonials
    .slice(
      testiIndex * TESTIMONIALS_PER_PAGE,
      testiIndex * TESTIMONIALS_PER_PAGE + TESTIMONIALS_PER_PAGE,
    )
    .map((testimonial, offset) => ({
      ...testimonial,
      index: testiIndex * TESTIMONIALS_PER_PAGE + offset,
    }));

  const showPreviousTestimonial = () => {
    setTestiIndex((prev) => (prev - 1 + totalTestimonialPages) % totalTestimonialPages);
  };

  const showNextTestimonial = () => {
    setTestiIndex((prev) => (prev + 1) % totalTestimonialPages);
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2);

  const renderRatingStars = (rating) =>
    Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`testi-star ${index < Math.round(rating) ? "testi-star--active" : ""}`}
        aria-hidden="true"
      />
    ));

  useEffect(() => {
    if (!activeTestimonial) return undefined;

    document.body.classList.add("testi-modal-open");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveTestimonial(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("testi-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTestimonial]);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  const faqs = [
    {
      question: "What's your background in UI/UX and web design?",
      answer:
        "I'm a UI/UX and web designer with 1+ years of hands-on experience building websites, landing pages, and digital interfaces. I've completed 4 projects focusing on user-centered design, responsive development, and creating experiences that balance aesthetics with functionality. I continuously learn and apply modern design principles and development techniques.",
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

    const accentEl = el.querySelector(".scroll-fill-text");
    if (!accentEl) return;
    const fillStyles = window.getComputedStyle(el);
    const dimColor = fillStyles.getPropertyValue("--about-fill-dim").trim() || "#526376";
    const activeColor = fillStyles.getPropertyValue("--about-fill-active").trim() || "#f8fbff";

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
        { color: dimColor, opacity: 1 },
        {
          color: activeColor,
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
            <a href="#projects" className="nav-link-animated">
              <span className="nav-text">
                <span className="nav-text-top">Projects</span>
                <span className="nav-text-bottom">Projects</span>
              </span>
            </a>
          </li>
          <li>
            <a href="#process" className="nav-link-animated">
              <span className="nav-text">
                <span className="nav-text-top">Process</span>
                <span className="nav-text-bottom">Process</span>
              </span>
            </a>
          </li>
          <li>
            <a href="#faq" className="nav-link-animated">
              <span className="nav-text">
                <span className="nav-text-top">FAQ</span>
                <span className="nav-text-bottom">FAQ</span>
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
            className="portfolio-container portfolio-home"
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
                      href="#heros"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">01</span>
                      <div className="nav-content">
                        <span className="nav-label">Home</span>
                        <span className="nav-description">Back to the top</span>
                      </div>
                      <FaArrowRight className="nav-arrow" />
                    </a>
                  </li>
                  <li className="mobile-nav-item">
                    <a
                      href="/about-web-designer"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">02</span>
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
                    <a
                      href="#projects"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">03</span>
                      <div className="nav-content">
                        <span className="nav-label">Projects</span>
                        <span className="nav-description">
                          View recent work and case studies
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
                      href="#faq"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">05</span>
                      <div className="nav-content">
                        <span className="nav-label">FAQ</span>
                        <span className="nav-description">
                          Common questions answered
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
                      <span className="nav-number">06</span>
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

                  <p className="tagline hero-tagline-entry">
                    UI/UX Designer &amp; Web Designer
                  </p>

                  <h1
                    className="hero-title split-animate hero-title-reveal"
                    data-split-mode="hero"
                  >
                    I turn{" "}
                    <span className="highlight hero-highlight">interfaces</span>{" "}
                    into experiences,{" "}
                    <br className="hero-title-br" />
                    pixel to production
                  </h1>

                  <div className="hero-social-proof hero-stats-entry">
                    <div className="hero-proof-pill">

                      {/* Avatars */}
                      <div className="hero-proof-avatars">
                        <div className="hero-proof-avatar">
                          <img src={ladyAvatar} alt="Lady Arielle" />
                        </div>
                        <div className="hero-proof-avatar">
                          <img src={nammerAvatar} alt="Nammer Bulaong" />
                        </div>
                        <div className="hero-proof-avatar">
                          <img src={czarAvatar} alt="Czar Medina" />
                        </div>
                        <div className="hero-proof-avatar">
                          <img src={ellaAvatar} alt="Madelle Ella" />
                        </div>
                      </div>

                {/* Rating */}
                      <div className="hero-proof-text-block">
                        <div className="hero-proof-stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="hero-proof-star-icon" />
                          ))}
                        </div>
                        <p className="hero-proof-label">
                          <strong>4.8</strong> · 4 clients
                        </p>
                      </div>

                      <span className="hero-proof-sep" />

              {/* Certs */}
                      <div className="hero-cert-row">
                        <span className="hero-cert-badge">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                            alt="Google"
                          />
                          <span>UI/UX</span>
                        </span>
                        <span className="hero-cert-divider" />
                        <span className="hero-cert-badge">
                       <img
  src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
  alt="Microsoft"
  style={{ filter: "brightness(0) invert(1)", opacity: 0.5 }}
/>
                          <span>UX Design</span>
                        </span>
                      </div>

                    </div>
                  </div>

                  <div className="hero-cta-group hero-cta-entry">
                    <a href="#projects" className="cta-button hero-cta-primary">
                      View My Work
                    </a>
                    <a href="/contact-me" className="cta-buttons1 hero-cta-secondary">
                      Let's Connect
                    </a>
                  </div>

                </div>
                {/* <div className="hero-card hero-card-entry">
                  <TiltedCard
                    imageSrc={grad}
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
                </div> */}
              </div>
            </motion.main>
          </div>

          <section className="about-section" id="about" data-nav-theme="dark">
            <div className="about-container">
              <div className="about-statement-grid">
                <motion.div
                  className="about-copy"
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="about-title" ref={scrollFillRef}>
                    <span className="scroll-fill-text about-title-accent">
                   Design isn't just about how it looks. It's about how it works, how users feel, and whether it actually solves the problem it was built for.
                    </span>
                  </h2>
                </motion.div>

                <motion.figure
                  className="about-visual"
                  ref={aboutVisualRef}
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty(
                      "--about-cursor-x",
                      `${event.clientX - rect.left}px`,
                    );
                    event.currentTarget.style.setProperty(
                      "--about-cursor-y",
                      `${event.clientY - rect.top}px`,
                    );
                  }}
                  initial={{ opacity: 0, x: 64, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.img
                    src={aboutme}
                    alt="Klent Russell Aguilar portrait"
                    className="about-portrait"
                    style={{ y: aboutPortraitY, objectFit: "cover", objectPosition: "center" }}
                  />
                  <div className="about-cursor-badge" aria-hidden="true">
                    <span className="about-cursor-dot"></span>
                    <span>About me</span>
                  </div>
                </motion.figure>
              </div>
            </div>
          </section>

          {/* Works Section */}
          <section className="works-section" data-nav-theme="dark">
            <div className="works-container">

              {/* Header Row */}
              <div className="rw-header-row">
                <div className="rw-header-left">
                  <span className="rw-eyebrow">Portfolio — 03</span>
                  <h2 className="works-title" id="projects">Recent Work</h2>
                </div>
             
              </div>

              <div className="works-divider rw-top-divider"></div>

              {!isTouchDevice && (
                <div
                  ref={crs_ref}
                  className={`crs-cursor ${crs_active ? "crs-cursor--visible" : ""}`}
                  aria-hidden="true"
                >
                  <div className="crs-cursor__blob">
                    <span className="crs-cursor__text">View Project</span>
                  </div>
                </div>
              )}

              {/* Project Grid */}
              <div
                className="rw-grid"
                ref={crs_areaRef}
                onMouseEnter={() => { if (!isTouchDevice) setCrs_active(true); }}
                onMouseLeave={() => setCrs_active(false)}
              >
                {/* Row 1 — Featured large + tall side */}
                <a
                  href="/projects/qrush"
                  className="rw-card rw-card--featured"
                  data-rw-index="0"
                  aria-label="View QRUSH Barangay Bangkal case study"
                >
                  <div className="rw-card__thumb">
                    <img src={bangkalProject} alt="Barangay Bangkal" draggable="false" />
                    <div className="rw-card__overlay" />
                    <div className="rw-card__hover-content">
                      <span className="rw-card__hover-label">View Case Study</span>
                      <div className="rw-card__arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </div>
                    </div>
                    <span className="rw-card__num">01</span>
                  </div>
                  <div className="rw-card__body">
                    <div className="rw-card__meta">
                      <h3 className="rw-card__name">QRUSH: Barangay Bangkal</h3>
                      <p className="rw-card__role">Capstone Project · Full-stack Web App</p>
                    </div>
                    <div className="rw-card__right">
                      <p className="rw-card__period">Dec 2025 — Jan 2026</p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">Web Development</span>
                         <span className="rw-chip">Document Request</span>
                        <span className="rw-chip">FullStack</span>

                      </div>
                    </div>
                  </div>
                </a>

                <a
                  href="/projects/virielle"
                  className="rw-card rw-card--tall"
                  data-rw-index="1"
                  aria-label="View Virielle case study"
                >
                  <div className="rw-card__thumb">
                    <img src={virielleproject} alt="Virielle" draggable="false" />
                    <div className="rw-card__overlay" />
                    <div className="rw-card__hover-content">
                      <span className="rw-card__hover-label">View Case Study</span>
                      <div className="rw-card__arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </div>
                    </div>
                    <span className="rw-card__num">02</span>
                  </div>
                  <div className="rw-card__body">
                    <div className="rw-card__meta">
                      <h3 className="rw-card__name">Virielle</h3>
                      <p className="rw-card__role">Freelance Studio · Website Design</p>
                    </div>
                    <div className="rw-card__right">
                      <p className="rw-card__period">Apr 2026</p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">UI/UX Design</span>
                        <span className="rw-chip">Web Design</span>     
                           <span className="rw-chip">Branding</span>
                      </div>
                    </div>
                  </div>
                </a>

                {/* Row 2 — Three equal columns */}
                {/* <article className="rw-card rw-card--third" data-rw-index="2">
                  <div className="rw-card__thumb">
                    <img src={soon} alt="ClockedIn" draggable="false" />
                    <div className="rw-card__overlay" />
                    <div className="rw-card__hover-content">
                      <span className="rw-card__hover-label">View Case Study</span>
                      <div className="rw-card__arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </div>
                    </div>
                    <span className="rw-card__num">03</span>
                  </div>
                  <div className="rw-card__body">
                    <div className="rw-card__meta">
                      <h3 className="rw-card__name">ClockedIn</h3>
                      <p className="rw-card__role">OJT Tracker · Web App</p>
                    </div>
                    <div className="rw-card__right">
                      <p className="rw-card__period">2025 — 2026</p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">Web App</span>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="rw-card rw-card--third" data-rw-index="3">
                  <div className="rw-card__thumb">
                    <img src={soon} alt="ArmadaPH" draggable="false" />
                    <div className="rw-card__overlay" />
                    <div className="rw-card__hover-content">
                      <span className="rw-card__hover-label">View Case Study</span>
                      <div className="rw-card__arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </div>
                    </div>
                    <span className="rw-card__num">04</span>
                  </div>
                  <div className="rw-card__body">
                    <div className="rw-card__meta">
                      <h3 className="rw-card__name">ArmadaPH</h3>
                      <p className="rw-card__role">Freelance · Brand Redesign</p>
                    </div>
                    <div className="rw-card__right">
                      <p className="rw-card__period">2025 — 2026</p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">Branding</span>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="rw-card rw-card--third" data-rw-index="4">
                  <div className="rw-card__thumb">
                    <img src={soon} alt="ClockedIn" draggable="false" />
                    <div className="rw-card__overlay" />
                    <div className="rw-card__hover-content">
                      <span className="rw-card__hover-label">View Case Study</span>
                      <div className="rw-card__arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </div>
                    </div>
                    <span className="rw-card__num">05</span>
                  </div>
                  <div className="rw-card__body">
                    <div className="rw-card__meta">
                      <h3 className="rw-card__name">ClockedIn</h3>
                      <p className="rw-card__role">OJT Tracker · Web App</p>
                    </div>
                    <div className="rw-card__right">
                      <p className="rw-card__period">2025 — 2026</p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">Web App</span>
                      </div>
                    </div>
                  </div>
                </article> */}


                {/* Row 3 — Wide + small */}
                {/* Row 3 — Two equal halves */}
                <a
                  href="/projects/lady-arielle"
                  className="rw-card rw-card--wide"
                  data-rw-index="2"
                  aria-label="View Lady Arielle case study"
                >
                  <div className="rw-card__thumb">
                    <img src={arielleproject} alt="SpinPix 360" draggable="false" />
                    <div className="rw-card__overlay" />
                    <div className="rw-card__hover-content">
                      <span className="rw-card__hover-label">View Case Study</span>
                      <div className="rw-card__arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </div>
                    </div>
                    <span className="rw-card__num">03</span>
                  </div>
                  <div className="rw-card__body">
                    <div className="rw-card__meta">
                      <h3 className="rw-card__name">Lady Arielle</h3>
                      <p className="rw-card__role">Marketing Portfolio Website</p>
                    </div>
                    <div className="rw-card__right">
                      <p className="rw-card__period">MAY 2026</p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">UI/UX Design</span>
                            <span className="rw-chip">Web Design</span>
                                <span className="rw-chip">Portfolio</span>
                                    <span className="rw-chip">Marketing</span>
                      </div>
                    </div>
                  </div>
                </a>

                <a
                  href="/projects/laconslanet"
                  className="rw-card rw-card--wide-right"
                  data-rw-index="3"
                  aria-label="View LaConsolaNet case study"
                >

                  <div className="rw-card__thumb">
                    <img src={laconslanetproject} alt="LaConsolaNet" draggable="false" />
                    <div className="rw-card__overlay" />
                    <div className="rw-card__hover-content">
                      <span className="rw-card__hover-label">View Case Study</span>
                      <div className="rw-card__arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </div>
                    </div>
                    <span className="rw-card__num">04</span>
                  </div>
                  <div className="rw-card__body">
                    <div className="rw-card__meta">
                      <h3 className="rw-card__name">LaConsolaNet!</h3>
                      <p className="rw-card__role">Social Media Platform</p>
                    </div>
                    <div className="rw-card__right">
                      <p className="rw-card__period">Feb 2026</p>
                      <div className="rw-card__chips">
                  
                        <span className="rw-chip">UI/UX Redesign</span>
                           <span className="rw-chip">Web Redesign</span>
                        <span className="rw-chip">Social Media</span>
                                 <span className="rw-chip">Web APP</span>
                      </div>
                    </div>
                  </div>
                </a>

              </div>

              {/* Footer Statement */}
              <div className="works-divider" style={{ marginTop: "4rem" }}></div>
    
            </div>
          </section>



          {/* Testimonials Section */}
          <motion.section
            className="testimonials-section"
            data-nav-theme="dark"
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="testimonials-container">
              <motion.aside
                className="testi-intro"
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <FaQuoteLeft className="testi-quote-mark" aria-hidden="true" />
                <h2 className="testi-title">What my clients are saying</h2>

                <div className="testi-controls" aria-label="Testimonial navigation">
                  <motion.button
                    type="button"
                    className="testi-nav-btn"
                    onClick={showPreviousTestimonial}
                    aria-label="Previous testimonial group"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <MdOutlineArrowBackIos />
                  </motion.button>
                  <div className="testi-progress-track" aria-hidden="true">
                    <motion.span
                      className="testi-progress-fill"
                      animate={{
                        width: `${((testiIndex + 1) / totalTestimonialPages) * 100}%`,
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <motion.button
                    type="button"
                    className="testi-nav-btn"
                    onClick={showNextTestimonial}
                    aria-label="Next testimonial group"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <MdOutlineArrowForwardIos />
                  </motion.button>
                </div>
              </motion.aside>

              <div className="testi-cards-viewport">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testiIndex}
                    className="testi-card-track"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 0, x: 34 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.24,
                          staggerChildren: 0.12,
                        },
                      },
                      exit: {
                        opacity: 0,
                        x: -34,
                        transition: {
                          duration: 0.22,
                          staggerChildren: 0.06,
                          staggerDirection: -1,
                        },
                      },
                    }}
                  >
                    {visibleTestimonials.map((testimonial) => (
                      <motion.article
                        className="testi-card"
                        key={`${testimonial.name}-${testimonial.index}`}
                        variants={{
                          hidden: { opacity: 0, y: 28, scale: 0.98 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              duration: 0.58,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          },
                          exit: {
                            opacity: 0,
                            y: -18,
                            scale: 0.98,
                            transition: {
                              duration: 0.2,
                              ease: [0.4, 0, 1, 1],
                            },
                          },
                        }}
                        whileHover={{ y: -8 }}
                      >
                        <div className="testi-speech-card">
                          <blockquote className="testi-quote">
                            {testimonial.quote}
                          </blockquote>
                          <div className="testi-card-actions">
                            <div
                              className="testi-stars"
                              aria-label={`${Math.round(testimonial.rating)} out of 5 stars`}
                            >
                              {renderRatingStars(testimonial.rating)}
                            </div>
                            <button
                              type="button"
                              className="testi-read-btn"
                              onClick={() => setActiveTestimonial(testimonial)}
                            >
                              Read full comment
                              <FaArrowRight aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="testi-author-row">
                          <div className="testi-avatar">
                            {testimonial.avatar ? (
                              <img src={testimonial.avatar} alt={testimonial.name} />
                            ) : (
                              <span className="testi-avatar-initials">
                                {getInitials(testimonial.name)}
                              </span>
                            )}
                          </div>
                          <div className="testi-author-info">
                            <p className="testi-author-name">{testimonial.name}</p>
                            <p className="testi-author-date">{testimonial.date}</p>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {typeof document !== "undefined" &&
              createPortal(
                <AnimatePresence>
                  {activeTestimonial && (
                    <motion.div
                      className="testi-modal-backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      onClick={() => setActiveTestimonial(null)}
                    >
                      <motion.div
                        className="testi-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="testi-modal-title"
                        initial={{ opacity: 0, y: 26, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 18, scale: 0.96 }}
                        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="testi-modal-close"
                          onClick={() => setActiveTestimonial(null)}
                          aria-label="Close full testimonial"
                        >
                          ×
                        </button>

                        <FaQuoteLeft className="testi-modal-mark" aria-hidden="true" />
                        <div
                          className="testi-stars"
                          aria-label={`${Math.round(activeTestimonial.rating)} out of 5 stars`}
                        >
                          {renderRatingStars(activeTestimonial.rating)}
                        </div>
                        <blockquote className="testi-modal-quote">
                          {activeTestimonial.quote}
                        </blockquote>

                        <div className="testi-modal-author">
                          <div className="testi-avatar">
                            {activeTestimonial.avatar ? (
                              <img
                                src={activeTestimonial.avatar}
                                alt={activeTestimonial.name}
                              />
                            ) : (
                              <span className="testi-avatar-initials">
                                {getInitials(activeTestimonial.name)}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 id="testi-modal-title">{activeTestimonial.name}</h3>
                            <p>{activeTestimonial.role}</p>
                            <span>{activeTestimonial.date}</span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>,
                document.body,
              )}
          </motion.section>

          {/* Process Section - Updated Layout */}
          <section ref={processSectionRef} className="process-section" data-nav-theme="light">
            <div className="process-container">
              <div className="process-header-wrapper">
                <div className="process-header" id="process">
                  <span className="process-index">PROCESS — 04</span>
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
                  logoHeight={isTouchDevice ? 40 : 70}
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
                <aside className="process-sticky-panel" aria-hidden="true">
                  <div className="process-sticky-content">
                   
                    <div className="process-roll-number-window">
                      <div className="process-roll-number-stack">
                        {PROCESS_STEPS.map((step, index) => (
                          <span className="process-roll-number" key={step.label}>
                            {String(index + 1).padStart(2, "0")}.
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="process-roll-label-window">
                      <div className="process-roll-label-stack">
                        {PROCESS_STEPS.map((step) => (
                          <span className="process-roll-label" key={step.label}>
                            {step.label}
                          </span>
                        ))}
                      </div>
                    </div>
              
                 
                  </div>
                </aside>
                <div className="timeline-line">
                  <div className="timeline-progress"></div>
                </div>
                <div className="process-steps">
                  {PROCESS_STEPS.map((step, index) => (
                    <div
                      className="process-step"
                      data-step={index + 1}
                      key={step.label}
                    >
                      <div className="step-number-wrapper">
                        <span className="step-number">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        <span className="step-label">{step.label}</span>
                      </div>
                      <div className="step-marker">
                        <div className="marker-dot"></div>
                      </div>
                      <div className="step-container">
                        <div className="step-content">
                          <h3 className="step-title">{step.title}</h3>
                          <p className="step-description">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
                <span className="services-index"> ABOUT ME — 05 </span>
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
                    style={{ backgroundImage: `url(${aboutme})` }}
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
                    <h3 className="stats-number">4+</h3>
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
                    Open to <span className="highlight">full-time opportunities</span>.
                  </h2>

                  <p className="cta-description split-animate">
                    UI/UX designer with hands-on experience in Figma, React, and end-to-end product design. Ready to contribute to a team from day one — bring me your toughest design problems.
                  </p>
                <div className="cta-actions">
                  <a href="/contact-me" className="cta-button">Let's Work Together</a>
                  <a href="/resume.pdf" className="cta-buttons1" download>Download CV</a>
                </div>

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
                          <a href="/about-web-designer">About</a>
                        </li>
                        <li>
                          <a href="/projects/qrush">Projects</a>
                        </li>
                        <li>
                          <a href="#process">Process</a>
                        </li>
                        <li>
                          <a href="#process">Contact</a>
                        </li>
                        <li>
                        
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
                            href="https://www.instagram.com/klntaglr/"
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
                            href="https://www.linkedin.com/in/klent-russell-aguilar-b6929739b/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin className="footer-icon" /> LinkedIn
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://profile.indeed.com/?hl=en_PH&co=PH&from=gnav-jobseeker-profile--profile-one-frontend"
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
