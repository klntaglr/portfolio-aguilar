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
    SiCanva,
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

import SplitText from "gsap/SplitText";
import {
    FaDiscord,
    FaDribbble,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FiArrowUpRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { SiIndeed } from "react-icons/si";
import { TfiLayoutMediaLeftAlt } from "react-icons/tfi";
import blueBackground from "../assets/blue.jpg";
import blueBackground1 from "../assets/blue1.png";
import logo from "../assets/logo.png";
import mockup from "../assets/mockup.jpg";
import mockup1 from "../assets/mockup1.jpg";
import mockup2 from "../assets/mockup2.jpg";
import mockup3 from "../assets/mockup3.png";
import mockup4 from "../assets/mockup4.jpg";
import since from "../assets/since.jpg";
import virielleLogo from "../assets/viriellelogo.png";
import TiltedCard from "./TiltedCard";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
gsap.registerPlugin(SplitText);

function Portfolio() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Z-Index stacking
      gsap.set(".panels", {
        zIndex: (i, target, targets) => targets.length - i,
      });

      // Scroll animation
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openService, setOpenService] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

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
    { node: <SiHtml5 />, title: "HTML" },
    { node: <SiCss3 />, title: "CSS" },
    { node: <SiJavascript />, title: "JavaScript" },
    { node: <SiReact />, title: "React" },
    { node: <SiThreedotjs />, title: "Three.js" },
    { node: <SiFramer />, title: "Framer" },

    { node: <SiGreensock />, title: "GSAP" },
    { node: <SiTailwindcss />, title: "Tailwind CSS" },
    { node: <SiSass />, title: "Sass" },
    { node: <SiFigma />, title: "Figma" },
    { node: <SiCanva />, title: "Canva" },
  ];

  useEffect(() => {
    const carousel = document.getElementById("projectsCarousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!carousel || !prevBtn || !nextBtn) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;

    // GSAP Smooth Scroll Navigation
    const smoothScrollTo = (targetScroll) => {
      gsap.to(carousel, {
        scrollLeft: targetScroll,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    // Get card width for navigation
    const getCardWidth = () => {
      const card = carousel.querySelector(".project-card");
      return card ? card.offsetWidth + 32 : 450; // 32 = gap
    };

    // Button Navigation with GSAP
    const handlePrevClick = () => {
      const cardWidth = getCardWidth();
      const targetScroll = Math.max(0, carousel.scrollLeft - cardWidth);
      smoothScrollTo(targetScroll);
    };

    const handleNextClick = () => {
      const cardWidth = getCardWidth();
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      const targetScroll = Math.min(maxScroll, carousel.scrollLeft + cardWidth);
      smoothScrollTo(targetScroll);
    };

    // Drag functionality with GSAP inertia
    const handleMouseDown = (e) => {
      isDown = true;
      isDragging = false;
      carousel.classList.add("dragging");
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      gsap.killTweensOf(carousel);
    };

    const handleMouseLeave = () => {
      if (!isDown) return;
      isDown = false;
      carousel.classList.remove("dragging");

      if (isDragging) {
        // Add snap-to-card effect
        const cardWidth = getCardWidth();
        const currentScroll = carousel.scrollLeft;
        const nearestCard = Math.round(currentScroll / cardWidth) * cardWidth;
        smoothScrollTo(nearestCard);
      }
    };

    const handleMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      carousel.classList.remove("dragging");

      if (isDragging) {
        // Add snap-to-card effect
        const cardWidth = getCardWidth();
        const currentScroll = carousel.scrollLeft;
        const nearestCard = Math.round(currentScroll / cardWidth) * cardWidth;
        smoothScrollTo(nearestCard);
      }
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      isDragging = true;
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    };

    // Touch Support
    const handleTouchStart = (e) => {
      isDown = true;
      isDragging = false;
      carousel.classList.add("dragging");
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      gsap.killTweensOf(carousel);
    };

    const handleTouchEnd = () => {
      if (!isDown) return;
      isDown = false;
      carousel.classList.remove("dragging");

      if (isDragging) {
        const cardWidth = getCardWidth();
        const currentScroll = carousel.scrollLeft;
        const nearestCard = Math.round(currentScroll / cardWidth) * cardWidth;
        smoothScrollTo(nearestCard);
      }
    };

    const handleTouchMove = (e) => {
      if (!isDown) return;
      isDragging = true;
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    };

    // Update button states
    const updateButtons = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      prevBtn.disabled = carousel.scrollLeft <= 0;
      nextBtn.disabled = carousel.scrollLeft >= maxScroll - 5;
    };

    carousel.addEventListener("scroll", updateButtons);
    updateButtons();

    // Event Listeners
    carousel.addEventListener("mousedown", handleMouseDown);
    carousel.addEventListener("mouseleave", handleMouseLeave);
    carousel.addEventListener("mouseup", handleMouseUp);
    carousel.addEventListener("mousemove", handleMouseMove);
    carousel.addEventListener("touchstart", handleTouchStart);
    carousel.addEventListener("touchend", handleTouchEnd);
    carousel.addEventListener("touchmove", handleTouchMove);
    prevBtn.addEventListener("click", handlePrevClick);
    nextBtn.addEventListener("click", handleNextClick);

    return () => {
      carousel.removeEventListener("mousedown", handleMouseDown);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
      carousel.removeEventListener("mouseup", handleMouseUp);
      carousel.removeEventListener("mousemove", handleMouseMove);
      carousel.removeEventListener("touchstart", handleTouchStart);
      carousel.removeEventListener("touchend", handleTouchEnd);
      carousel.removeEventListener("touchmove", handleTouchMove);
      carousel.removeEventListener("scroll", updateButtons);
      prevBtn.removeEventListener("click", handlePrevClick);
      nextBtn.removeEventListener("click", handleNextClick);
    };
  }, []);

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

  useEffect(() => {
    let lastScroll = 0;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    gsap.ticker.add(() => {
      const currentScroll = smoother.scrollTop();
      const navbar = document.querySelector(".navbar");

      if (!navbar) return;

      if (currentScroll > lastScroll && currentScroll > 120) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      if (currentScroll > 80) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      lastScroll = currentScroll;
    });

    return () => {
      smoother.kill();
      gsap.ticker.remove(() => {});
    };
  }, []);

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
      name: "Landing Page Design",
      description:
        "Focused landing page design built to capture attention and encourage action. I create pages with clear messaging, strategic layouts, and user-friendly interfaces that guide visitors toward your goals—whether that's generating leads, driving sign-ups, or showcasing your offer. I also offer limited free landing page opportunities for select projects in exchange for feedback and portfolio permission.",
      tags: [
        "Lead Generation",
        "Conversion-Focused",
        "Mobile Responsive",
        "Strategic Layout",
        "Free Opportunity Available",
        "Portfolio Projects",
      ],
      image: mockup,
    },

    {
      number: "02",
      name: "Website Design & Development",
      description:
        "Complete website design that communicates your brand professionally and serves your business goals. I focus on creating clean, modern layouts with intuitive navigation, responsive design, and performance optimization. From small business sites to portfolio showcases, I build websites that look professional and function smoothly.",
      tags: [
        "Responsive Design",
        "Modern Layouts",
        "Professional Aesthetic",
        "Performance Focused",
        "Brand Alignment",
        "Multi-Page Sites",
      ],
      image: mockup1,
    },

    {
      number: "03",
      name: "UI/UX Design",
      description:
        "User interface and experience design focused on usability and clarity. I create wireframes, prototypes, and high-fidelity designs that prioritize user needs while supporting business objectives. My process includes user research, information architecture, and iterative design to ensure interfaces that are both functional and visually appealing.",
      tags: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
        "Interface Design",
        "User Flows",
      ],
      image: mockup2,
    },

    {
      number: "04",
      name: "Website Redesign",
      description:
        "Modernization and improvement of existing websites. I help update outdated designs with fresh layouts, improved navigation, better mobile responsiveness, and enhanced visual appeal. The goal is to bring your website in line with current design standards while maintaining your brand identity and improving user experience.",
      tags: [
        "Visual Refresh",
        "UX Improvements",
        "Modern Standards",
        "Mobile Optimization",
        "Brand Consistency",
        "Performance Updates",
      ],
      image: mockup3,
    },

    {
      number: "05",
      name: "Interactive Web Experiences",
      description:
        "Websites with engaging animations and interactive elements that enhance user experience. Using modern tools like GSAP, Framer Motion, and Three.js, I create smooth transitions, scroll-triggered animations, and micro-interactions that make websites feel polished and professional while maintaining performance.",
      tags: [
        "GSAP Animations",
        "Scroll Effects",
        "Micro-interactions",
        "Framer Motion",
        "Performance Balanced",
        "Modern Techniques",
      ],
      image: mockup4,
    },
  ];
  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setPageReady(true);

    ScrollTrigger.refresh();
  };

  useEffect(() => {
    if (!pageReady) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [pageReady]);

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How long does it usually take to design and build a website?",
      answer:
        "Timeline varies by project scope. Simple landing pages typically take 1-2 weeks. Business websites with multiple pages take 3-4 weeks. More complex projects with custom features may take 4-6 weeks. I follow a structured process including planning, design, development, and testing to ensure quality results within the agreed timeframe.",
    },
    {
      question:
        "What information or materials do you need before starting a project?",
      answer:
        "To begin a project smoothly, I typically need basic information about your business, including your goals, target audience, and the purpose of the website. If available, brand assets like your logo, colors, and any existing content are helpful. If you're still developing these materials, that's completely fine—I can guide you through organizing your ideas and clarifying your messaging as part of the design process.",
    },
    {
      question:
        "Do you offer fixed pricing packages or customized project pricing?",
      answer:
        "I offer customized pricing based on project scope and requirements. After discussing your project goals, I provide a clear proposal outlining deliverables, timeline, and cost. As a graduating designer building my portfolio, I offer competitive rates and am open to working within reasonable budgets. For the free landing page opportunity, selected projects receive a complete landing page at no cost in exchange for feedback and portfolio permission.",
    },
    {
      question:
        "How can a professionally designed website support business growth?",
      answer:
        "A well-designed website serves as a 24/7 digital presence that communicates your value and builds credibility. Good design combined with clear messaging and smooth functionality makes it easier for visitors to understand what you offer and take action—whether that's contacting you, making a purchase, or booking a service. A professional website also helps you stand out from competitors and creates a positive first impression.",
    },
    {
      question: "Will my website be responsive and optimized for performance?",
      answer:
        "Yes. Every website I create is fully mobile-responsive and tested across different devices and screen sizes. I also optimize for fast loading speeds, smooth interactions, and accessibility to ensure a positive experience for all users. Performance and usability are built into my development process from the start.",
    },
    {
      question:
        "Can you improve or redesign my existing website instead of building a new one?",
      answer:
        "Yes, I offer redesign services for existing websites. The process typically starts with evaluating your current site to identify design limitations, usability issues, or performance gaps. From there, I create a refreshed design that improves user experience, updates the visual style, and aligns with current web standards while maintaining your brand identity.",
    },
    {
      question: "Do you provide support after the website is launched?",
      answer:
        "Yes. After launch, I provide post-launch support to address any issues or needed adjustments. The specific support period can be discussed based on your needs. For ongoing updates or maintenance beyond the initial period, we can arrange continued support. I can also provide basic training if you prefer to manage simple content updates yourself.",
    },
    {
      question:
        "What is the Free Landing Page opportunity and how does it work?",
      answer:
        "I'm currently offering 5 free landing page design slots to build my portfolio and gain experience with diverse projects. Selected businesses or individuals receive a professional, mobile-responsive, conversion-focused landing page at no cost. In exchange, I ask for honest feedback about your experience working with me and permission to showcase the project in my portfolio. If you're interested, feel free to reach out through the contact section to discuss your project.",
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
  useEffect(() => {
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".split-animate");

      elements.forEach((el) => {
        const split = new SplitText(el, {
          type: "lines,words",
          linesClass: "ts-line",
        });

        gsap.from(split.words, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "circ.out",

          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true, // 🔥 Important
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div
            className="portfolio-container"
            id="heros"
            style={{ backgroundImage: `url(${blueBackground1})` }}
          >
            <nav
              className={`navbar ${showNavbar ? "navbar-visible" : "navbar-hidden"}`}
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
                      <span className="nav-text-top">Services</span>
                      <span className="nav-text-bottom">Services</span>
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
                      <span className="nav-text-top">FAQS</span>
                      <span className="nav-text-bottom">FAQS</span>
                    </span>
                  </a>
                </li>
                {/* CTA stays untouched */}
                <a href="/free-landing-page" className="nav-cta-btn">
                  <TfiLayoutMediaLeftAlt className="nav-cta-icon" />
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
                    <a
                      href="#services"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">02</span>
                      <div className="nav-content">
                        <span className="nav-label">Services</span>
                        <span className="nav-description">
                          What I can do for you
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
              <div className="mobile-menu-cta-section">
                <div className="cta-highlight-badge">
                  <TfiLayoutMediaLeftAlt className="cta-gift-icon" />
                  <span className="cta-badge-text">Limited Offer</span>
                </div>

                <button className="cta-button-mobile" onClick={closeMobileMenu}>
                  <span className="cta-text">Free Landing Page</span>
                  <FaArrowRight className="cta-button-arrow" />
                </button>

                <p className="cta-availability">
                  5 slots available | No commitment required
                </p>
              </div>

              {/* Contact Info Footer */}
              <div className="mobile-menu-footer">
                <p className="footer-label">Get in Touch</p>
                <a
                  href="mailto:klentaguilar@gmail.com"
                  className="footer-email"
                >
                  klentaguilar@gmail.com
                </a>
              </div>
            </div>
            <motion.main
              ref={heroRef}
              className="hero-section panel"
              id="hero"
              style={{ filter: blur, opacity }}
            >
              <div className="hero-wrapper">
                <div className="hero-content">
                  <p className="tagline split-animate">UI/UX & Web Designer</p>

                  <h1 className="hero-title split-animate">
                    I design{" "}
                    <span className="highlight">user-focused websites</span>{" "}
                    with strategic layouts and modern interactions.
                  </h1>
                  <div className="hero-cta-group">
                    <button className="cta-button primary">
                      Explore My Work
                    </button>

                    <button className="cta-buttons1">How I Work</button>
                  </div>
                </div>

                <TiltedCard
                  imageSrc={mockup4}
                  altText="Klent Russell Aguilar"
                  captionText="Web Designer | Klent Russell Aguilar"
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
            </motion.main>
          </div>

          <section className="about-section">
            <div className="about-container">
              <h2 className="about-title split-animate">
                Design is more than aesthetics.{" "}
                <span className="about-title-accent">
                  It is how businesses communicate, build trust, and create
                  meaningful digital experiences.
                </span>
              </h2>

              <div className="about-content">
                <div className="about-cards">
                  <div
                    className="about-card card-blue card-blue-image"
                    style={{ backgroundImage: `url(${blueBackground})` }}
                  >
                    <div className="card-icon">
                      <img src={virielleLogo} alt="Virielle Logo" />
                    </div>

                    <h3 className="card-label">FOCUSED APPROACH</h3>
                    <p className="card-description">
                      Design driven by user needs, clear purpose, and practical
                      solutions.
                    </p>
                  </div>
                  <div className="about-card card-dark">
                    <h3 className="card-title">
                      <span className="title-design">DESIGN</span>
                      <span className="title-designs">×</span>
                      <span className="title-create">CODE</span>
                    </h3>
                    <p className="card-date">Building Since 2024</p>
                  </div>
                </div>
                <div
                  className="about-statss card-blue card-blue-image"
                  style={{ backgroundImage: `url(${since})` }}
                >
                  <div className="card-iconss">
                    <img src={virielleLogo} alt="Virielle Logo" />
                  </div>
                  <h3 className="card-labels">CONTINUOUS GROWTH</h3>
                  <p className="card-descriptions">
                    Learning and applying modern web design, UX principles, and
                    development techniques.
                  </p>
                </div>
              </div>

              <div className="about-topbar">
                <span className="about-index">(INTRODUCTION — 01)</span>

                <p className="about-mini-desc">
                  Effective websites combine clear purpose, thoughtful design,
                  and user-centered thinking.
                </p>
                <button className="cta-button">View My Approach</button>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="services-section">
            <div className="services-container">
              <div className="services-header">
                <h2 className="services-title" id="services">
                  Services
                </h2>
              </div>

              <div className="services-content">
                <span className="services-index">(SERVICE — 02)</span>

                <h3 className="services-subtitle split-animate">
                  Transforming brands through{" "}
                  <span className="services-subtitle-accent">
                    purposeful design and strategic digital experiences.
                  </span>
                </h3>
              </div>

              <div className="services-divider"></div>

              <div className="services-list">
                <div className="services-items">
                  {services.map((service, index) => (
                    <div key={index} className="service-item">
                      <div
                        className="service-header"
                        onClick={() => toggleService(index)}
                      >
                        <div className="service-number">{service.number}</div>
                        <h3 className="service-name ">{service.name}</h3>
                        <button className="service-toggle">
                          {openService === index ? "−" : "+"}
                        </button>
                      </div>
                      <div
                        className={`service-details  ${openService === index ? "open" : ""}`}
                      >
                        <p className="service-description">
                          {service.description}
                        </p>

                        <div className="service-tags">
                          {service.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="services-image-container">
                  <div className="services-image">
                    <div
                      className={`service-image-placeholder ${openService === null ? "active" : ""}`}
                    >
                      <div className="placeholder-content">
                        <svg
                          width="80"
                          height="80"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <p>Select a service to view details</p>
                      </div>
                    </div>

                    {services.map((service, index) => (
                      <div
                        key={index}
                        className={`service-image ${openService === index ? "active" : ""}`}
                      >
                        <img src={service.image} alt={service.name} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Works Section */}
          <section className="works-section">
            <div className="works-container">
              <div className="works-header">
                <h2 className="works-title" id="projects">
                  Works
                </h2>
                <div className="works-header-right">
                  <span className="works-index">(PROJECT — 03)</span>
                  <div className="carousel-controls">
                    <button className="carousel-nav-btn prev-btn" id="prevBtn">
                      <MdOutlineArrowBackIos />
                    </button>
                    <button className="carousel-nav-btn next-btn" id="nextBtn">
                      <MdOutlineArrowForwardIos />
                    </button>
                  </div>
                </div>
              </div>

              <div className="works-divider"></div>

              {/* GSAP Smooth Carousel */}
              <div className="projects-carousel-wrapper">
                <div className="projects-carousel" id="projectsCarousel">
                  <div className="carousel-track" id="carouselTrack">
                    {/* Project 1 */}
                    <div className="project-card">
                      <div className="project-image">
                        <img
                          src={mockup}
                          alt="Martin Architectural"
                          draggable="false"
                        />
                        <div className="project-overlay">
                          <div className="project-icon">
                            <FiArrowUpRight />
                          </div>
                        </div>
                      </div>
                      <div className="project-info">
                        <div className="project-info-left">
                          <h3 className="project-title">
                            Martin Architectural
                          </h3>
                          <p className="project-year">(2025 — 2026)</p>
                          <p className="project-case-preview">
                            Designed and developed a modern architecture
                            portfolio website focusing on visual storytelling
                            and project showcases. Built with React, GSAP
                            animations, and responsive layouts to highlight
                            architectural work effectively.
                          </p>
                        </div>
                        <div className="project-tags">
                          <span className="project-tag">Website Design</span>
                          <span className="project-tag">Architecture</span>
                          <span className="project-tag">Animation</span>
                        </div>
                      </div>
                    </div>

                    {/* Project 2 */}
                    <div className="project-card">
                      <div className="project-image">
                        <img
                          src={mockup1}
                          alt="Century 21 Pura Vida"
                          draggable="false"
                        />
                        <div className="project-overlay">
                          <div className="project-icon">
                            <FiArrowUpRight />
                          </div>
                        </div>
                      </div>
                      <div className="project-info">
                        <div className="project-info-left">
                          <h3 className="project-title">
                            Century 21® Pura Vida
                          </h3>
                          <p className="project-year">(2025 — 2026)</p>
                        </div>
                        <div className="project-tags">
                          <span className="project-tag">Website Design</span>
                          <span className="project-tag">UI/UX</span>
                          <span className="project-tag">Real Estate</span>
                        </div>
                      </div>
                    </div>

                    {/* Project 3 */}
                    <div className="project-card">
                      <div className="project-image">
                        <img
                          src={mockup2}
                          alt="Digital Wellness"
                          draggable="false"
                        />
                        <div className="project-overlay">
                          <div className="project-icon">
                            <FiArrowUpRight />
                          </div>
                        </div>
                      </div>
                      <div className="project-info">
                        <div className="project-info-left">
                          <h3 className="project-title">Digital Wellness</h3>
                          <p className="project-year">(2025 — 2026)</p>
                        </div>
                        <div className="project-tags">
                          <span className="project-tag">UI/UX Design</span>
                          <span className="project-tag">Healthcare</span>
                          <span className="project-tag">Interaction</span>
                        </div>
                      </div>
                    </div>

                    {/* Project 4 */}
                    <div className="project-card">
                      <div className="project-image">
                        <img
                          src={mockup3}
                          alt="Brand Refresh"
                          draggable="false"
                        />
                        <div className="project-overlay">
                          <div className="project-icon">
                            <FiArrowUpRight />
                          </div>
                        </div>
                      </div>
                      <div className="project-info">
                        <div className="project-info-left">
                          <h3 className="project-title">Brand Refresh</h3>
                          <p className="project-year">(2025 — 2026)</p>
                        </div>
                        <div className="project-tags">
                          <span className="project-tag">Redesign</span>
                          <span className="project-tag">Branding</span>
                          <span className="project-tag">Modern</span>
                        </div>
                      </div>
                    </div>

                    {/* Project 5 */}
                    <div className="project-card">
                      <div className="project-image">
                        <img
                          src={mockup4}
                          alt="Interactive Portfolio"
                          draggable="false"
                        />
                        <div className="project-overlay">
                          <div className="project-icon">
                            <FiArrowUpRight />
                          </div>
                        </div>
                      </div>
                      <div className="project-info">
                        <div className="project-info-left">
                          <h3 className="project-title">
                            Interactive Portfolio
                          </h3>
                          <p className="project-year">(2025 — 2026)</p>
                        </div>
                        <div className="project-tags">
                          <span className="project-tag">Interactive</span>
                          <span className="project-tag">Animation</span>
                          <span className="project-tag">Creative</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="works-statement">
                <p className="statement-text split-animate">
                  Selected projects demonstrating my approach to web design —{" "}
                  <span className="statement-highlight">
                    combining visual appeal with functional, user-friendly
                    experiences.
                  </span>
                </p>
                <button className="cta-button">Discuss Your Project</button>
              </div>
            </div>
          </section>

          {/* Process Section - Updated Layout */}
          <section className="process-section">
            <div className="process-container">
              <div className="process-header-wrapper">
                <div className="process-header" id="process">
                  <span className="process-index">(PROCESS — 04)</span>
                  <h2 className="process-title split-animate">
                    My design process
                    <span className="process-title-accent">
                      {" "}
                      where research, creativity, and development come together.
                    </span>
                  </h2>

                  <p className="process-subtitle split-animate">
                    A structured approach that turns ideas into functional
                    digital experiences through careful planning, iterative
                    design, and clean development.
                  </p>
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
                      <span className="step-label">Discovery</span>
                    </div>

                    <div className="step-marker">
                      <div className="marker-dot"></div>
                    </div>

                    <div className="step-container">
                      <div className="step-content">
                        <h3 className="step-title">Discovery & Research</h3>
                        <p className="step-description">
                          Every project begins with understanding your business,
                          goals, and audience. This stage focuses on identifying
                          opportunities and defining the direction needed to
                          create a meaningful and effective website experience.
                        </p>
                        <br />
                        <p className="step-description">
                          I start each project by researching your business,
                          target audience, and design goals to ensure the
                          website aligns with your objectives and user needs.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="process-step" data-step="2">
                    <div className="step-number-wrapper">
                      <span className="step-number">02.</span>
                      <span className="step-label">Strategy</span>
                    </div>

                    <div className="step-marker">
                      <div className="marker-dot"></div>
                    </div>

                    <div className="step-container">
                      <div className="step-content">
                        <h3 className="step-title">Strategy & Planning</h3>
                        <p className="step-description">
                          Based on research insights, the website structure,
                          user flow, and content layout are carefully planned.
                          Wireframes and strategic planning help ensure the
                          website delivers a clear message while aligning with
                          your business goals and user expectations.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="process-step" data-step="3">
                    <div className="step-number-wrapper">
                      <span className="step-number">03.</span>
                      <span className="step-label">Design</span>
                    </div>

                    <div className="step-marker">
                      <div className="marker-dot"></div>
                    </div>

                    <div className="step-container">
                      <div className="step-content">
                        <h3 className="step-title">
                          UI/UX Design & Prototyping
                        </h3>
                        <p className="step-description">
                          Visual design and user interface elements are created
                          to reflect your brand identity while ensuring a
                          seamless and engaging user experience. Interactive
                          prototypes help visualize the website's functionality
                          and allow refinement before development begins.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="process-step" data-step="4">
                    <div className="step-number-wrapper">
                      <span className="step-number">04.</span>
                      <span className="step-label">Build</span>
                    </div>

                    <div className="step-marker">
                      <div className="marker-dot"></div>
                    </div>

                    <div className="step-container">
                      <div className="step-content">
                        <h3 className="step-title">
                          Development & Implementation
                        </h3>
                        <p className="step-description">
                          I build the website using modern development
                          practices, focusing on clean code, responsive design,
                          and performance optimization. The result is a website
                          that works smoothly across all devices and browsers.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="process-step" data-step="5">
                    <div className="step-number-wrapper">
                      <span className="step-number">05.</span>
                      <span className="step-label">Launch</span>
                    </div>

                    <div className="step-marker">
                      <div className="marker-dot"></div>
                    </div>

                    <div className="step-container">
                      <div className="step-content">
                        <h3 className="step-title">
                          Testing, Launch & Optimization
                        </h3>
                        <p className="step-description">
                          The website undergoes final testing to ensure
                          usability, responsiveness, and performance. After
                          launch, improvements and adjustments are made when
                          needed to maintain a smooth and effective user
                          experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Man Behind The Work Section */}
          <section className="man-behind-section">
            <div className="man-behind-container">
              <div className="man-behind-header ">
                <h2 className="man-behind-title">
                  Man Behind <br />
                  The Work
                </h2>
              </div>
              <div className="services-content">
                <span className="services-index">( ABOUT ME — 05 )</span>
                <h3 className="services-subtitless split-animate">
                  Designing websites that look great while
                  <span className="services-subtitle-accent">
                    {" "}
                    supporting real user needs and business goals.
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
                        Experience building websites and landing pages focused
                        on design, usability, and performance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="about-stats ">
                  <div className="stats-item">
                    <h3 className="stats-number">10+</h3>
                    <img
                      src={projects}
                      alt="projects watermark"
                      className="stats-watermark"
                    />
                    <p className="stats-description">
                      Projects in web design, landing pages,
                      <br /> and business websites.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-topbar">
                <p className="about-mini-desc">
                  There’s more behind the work—how I think, how I design, and
                  how every decision starts with the user.
                </p>

                <button className="cta-button">About Me</button>
              </div>
            </div>
          </section>

          <section className="works-section">
            <Maillards />
          </section>

          <section className="parallax-reveal-section ">
            <div className="parallax-reveal-sticky">
              <div className="parallax-reveal-card">
                <h2 className="cta-title split-animate">
                  Your website should be your{" "}
                  <span className="highlight">strongest asset</span>
                </h2>

                <p className="cta-description split-animate">
                  An effective website goes beyond aesthetics—it communicates
                  your value with clarity, establishes credibility with your
                  audience, and creates seamless pathways for engagement. Let's
                  collaborate to build a digital presence that authentically
                  represents your brand and consistently delivers results.
                </p>

                <button className="cta-button">Let's Collaborate</button>
              </div>
            </div>
          </section>

          <div id="container" ref={containerRef}>
            <section className="faq-section panels" id="faq">
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
                              <button className="faq-cta-btn">
                                Get Started . .
                              </button>
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
            <footer className="footer-section panels">
              <div className="footer-container">
                <div className="footer-top">
                  <div className="footer-cta">
                    <p className="footer-label">HAVE ANY PROJECT IN MIND?</p>
                    <h2 className="footer-email ">
                      <a href="mailto:klentaguilar@gmail.com">
                        klentaguilar@gmail.com
                      </a>
                    </h2>
                    <button className="footer-cta-button">
                      Start a Conversation
                      <span className="footer-arrow-circle">
                        <FaArrowRight />
                      </span>
                    </button>
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
                      <p className="footer-tagline split-animate">
                        Web designer focused on creating user-friendly,
                        conversion-oriented websites through thoughtful design,
                        clean development, and attention to user experience.
                      </p>

                      <p className="footer-copyright">
                        © 2025 Designed and developed by Klent Russell Aguilar |
                        Web Designer
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
