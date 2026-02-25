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
    const wrapWidth = rw_trackRef.current.parentElement.offsetWidth;
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
  const card5Ref = useRef(null);






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
      gsap.ticker.remove(() => { });
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
      name: "Website Design & Development",
      description:
        "End-to-end website design and development for businesses, portfolios, and e-commerce platforms. I create modern, responsive websites with intuitive navigation, clean layouts, and strategic content placement. From initial concept to final deployment, I focus on building sites that communicate brand value while delivering smooth user experiences across all devices.",
      tags: [
        "Business Websites",
        "E-commerce Sites",
        "Portfolio Sites",
        "Responsive Design",
        "Performance Optimized",
      ],
      image: mockup1,
    },

    {
      number: "02",
      name: "Landing Page Design",
      description:
        "High-converting landing pages designed to capture attention and drive action. I create focused, goal-oriented pages with clear messaging, strategic layouts, and conversion-optimized elements. Perfect for product launches, lead generation campaigns, event promotions, or businesses establishing their first online presence.",
      tags: [
        "Lead Generation",
        "Conversion-Focused",
        "Mobile Responsive",
        "Clear Messaging",
        "Strategic CTAs",
        "Fast Loading",
      ],
      image: mockup,
    },

    {
      number: "03",
      name: "Website Redesign & Modernization",
      description:
        "Transforming outdated websites into modern, effective digital experiences. I evaluate existing sites to identify design limitations, usability issues, and performance gaps, then create refreshed designs with improved navigation, updated visual styles, better mobile responsiveness, and enhanced user experience—all while maintaining brand identity.",
      tags: [
        "Visual Refresh",
        "UX Improvements",
        "Modern Standards",
        "Mobile Optimization",
        "Performance Updates",
        "Brand Consistency",
      ],
      image: mockup3,
    },

    {
      number: "04",
      name: "UI/UX Design",
      description:
        "User interface and experience design for web applications, dashboards, mobile apps, and digital products. I create wireframes, prototypes, and high-fidelity designs grounded in user research and usability principles. My process includes information architecture, user flows, and iterative design to ensure interfaces that are both functional and visually compelling.",
      tags: [
        "Web Applications",
        "Dashboard Design",
        "Mobile App UI",
        "Wireframing",
        "Prototyping",
        "User Research",
      ],
      image: mockup2,
    },

    {
      number: "05",
      name: "Interactive Web Experiences",
      description:
        "Engaging websites with smooth animations and interactive elements that enhance user experience. Using modern tools like GSAP, Framer Motion, and Three.js, I create scroll-triggered animations, micro-interactions, and dynamic visual effects that make websites feel polished and memorable while maintaining performance and usability.",
      tags: [
        "GSAP Animations",
        "Scroll Effects",
        "Micro-interactions",
        "3D Elements",
        "Motion Design",
        "Performance Balanced",
      ],
      image: mockup4,
    },
  ];
  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setPageReady(true);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
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
      question: "What's your background in UI/UX and web design?",
      answer:
        "I'm a UI/UX and web designer with 1+ years of hands-on experience building websites, landing pages, and digital interfaces. I've completed 10+ projects focusing on user-centered design, responsive development, and creating experiences that balance aesthetics with functionality. I continuously learn and apply modern design principles and development techniques.",
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
        "Yes. I handle both UI/UX design and frontend development, which allows me to create cohesive experiences from concept to implementation. I design interfaces with usability and aesthetics in mind, then build them with clean, maintainable code. This dual capability helps bridge the gap between design vision and technical execution.",
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
        "I'm actively seeking full-time UI/UX and web design opportunities where I can grow as a designer and contribute to meaningful projects. I'm also open to select freelance projects that align with my skills and allow me to build my portfolio while delivering real value.",
    },
    {
      question: "What's the Free Landing Page opportunity?",
      answer:
        "I'm offering 5 complimentary landing page projects to build real-world experience and expand my portfolio. Selected projects receive professional, mobile-responsive design and development at no cost. In exchange, I ask for honest feedback and permission to feature the work in my portfolio. This helps me demonstrate my capabilities while providing value to businesses ready to launch.",
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
    if (!pageReady || isTouchDevice) return; // 🔥 disable on mobile/tablet

    document.fonts.ready.then(() => {

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
              once: true,
            },

            onComplete: () => split.revert(),
          });

        });

        ScrollTrigger.refresh();

      });

      return () => ctx.revert();

    });

  }, [pageReady]);


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
                <a href="/contact-me" className="nav-cta-btn">
            
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
              className="hero-section panel"
              id="hero"
              style={{ filter: blur, opacity }}
            >
              <div className="hero-wrapper">
                <div className="hero-content">
                  <p className="tagline ">UI/UX & Web Designer</p>

                  <h1 className="hero-title ">
                    I design{" "}
                    <span className="highlight">user-focused websites</span>{" "}
                    with strategic layouts and modern interactions
                  </h1>
                  <div className="hero-stats">
                    <div className="stat-item">
                      <span className="stat-number">10+</span>
                      <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">1+</span>
                      <span className="stat-label">Year Experience</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">100%</span>
                      <span className="stat-label">Available</span>
                    </div>
                  </div>
                  <div className="hero-cta-group">
                    <button className="cta-button primary">
                      Explore My Work
                    </button>

                    <button className="cta-buttons1">About Me</button>
                  </div>

                </div>

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
            </motion.main>
          </div>

          <section className="about-section">
            <div className="about-container">
              <h2 className="about-title split-animate">
                Design isn't just about how it looks.{" "}
                <span className="about-title-accent">
                  It's about how it works, how users feel, and whether
                  it actually solves the problem it was built for.
                </span>
              </h2>


            </div>
          </section>

       {/* Services Section */}
<section className="services-section">
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

              {/* 🔥 TAGS WITH ANIMATION */}
 <motion.div
  className="service-tags"
  initial={false} // 🔥 REMOVE INITIAL DELAY
  animate={openService === index ? "show" : "hidden"}
  variants={{
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15, // medyo slow pa rin
        delayChildren: 0, // 🔥 NO DELAY
      },
    },
  }}
>
                {service.tags.map((tag, tagIndex) => (
       <motion.span
  key={tagIndex}
  className="tag"
  variants={{
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  }}
  transition={{
    duration: 0.5,
    ease: "easeOut",
  }}
>
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

          {/* Works Section */}
          <section className="works-section">
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
                    ref={card2Ref}
                    onMouseMove={(e) => handleCardMouseMove(e, card2Ref)}
                  >
                    <div className="rw-card__thumb">
                      <img src={mockup1} alt="Century 21 Pura Vida" draggable="false" />
                      <div className="rw-card__demo">
                        <span className="rw-card__demo-text">

                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="rw-card__body">
                      <div className="rw-card__meta">
                        <h3 className="rw-card__name">Century 21® Pura Vida</h3>
                        <p className="rw-card__period">(2025 — 2026)</p>
                      </div>  <p className="rw-card__excerpt">
                        Designed and developed a modern architecture portfolio website
                        focusing on visual storytelling and project showcases. Built with
                        React, GSAP animations, and responsive layouts.
                      </p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">Website Design</span>
                        <span className="rw-chip">UI/UX</span>
                        <span className="rw-chip">Real Estate</span>
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
                      <img src={mockup1} alt="Century 21 Pura Vida" draggable="false" />
                      <div className="rw-card__demo">
                        <span className="rw-card__demo-text">

                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="rw-card__body">
                      <div className="rw-card__meta">
                        <h3 className="rw-card__name">Century 21® Pura Vida</h3>
                        <p className="rw-card__period">(2025 — 2026)</p>
                      </div>  <p className="rw-card__excerpt">
                        Designed and developed a modern architecture portfolio website
                        focusing on visual storytelling and project showcases. Built with
                        React, GSAP animations, and responsive layouts.
                      </p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">Website Design</span>
                        <span className="rw-chip">UI/UX</span>
                        <span className="rw-chip">Real Estate</span>
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
                      <img src={mockup2} alt="Digital Wellness" draggable="false" />
                      <div className="rw-card__demo">
                        <span className="rw-card__demo-text">

                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="rw-card__body">
                      <div className="rw-card__meta">
                        <h3 className="rw-card__name">Digital Wellness</h3>
                        <p className="rw-card__period">(2025 — 2026)</p>
                      </div>  <p className="rw-card__excerpt">
                        Designed and developed a modern architecture portfolio website
                        focusing on visual storytelling and project showcases. Built with
                        React, GSAP animations, and responsive layouts.
                      </p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">UI/UX Design</span>
                        <span className="rw-chip">Healthcare</span>
                        <span className="rw-chip">Interaction</span>
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
                      <img src={mockup3} alt="Brand Refresh" draggable="false" />
                      <div className="rw-card__demo">
                        <span className="rw-card__demo-text">

                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="rw-card__body">
                      <div className="rw-card__meta">
                        <h3 className="rw-card__name">Brand Refresh</h3>
                        <p className="rw-card__period">(2025 — 2026)</p>
                      </div>  <p className="rw-card__excerpt">
                        Designed and developed a modern architecture portfolio website
                        focusing on visual storytelling and project showcases. Built with
                        React, GSAP animations, and responsive layouts.
                      </p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">Redesign</span>
                        <span className="rw-chip">Branding</span>
                        <span className="rw-chip">Modern</span>
                      </div>
                    </div>
                  </article>

                  {/* Card 5 */}
                  <article
                    className="rw-card"
                    ref={card5Ref}
                    onMouseMove={(e) => handleCardMouseMove(e, card5Ref)}
                  >
                    <div className="rw-card__thumb">
                      <img src={mockup4} alt="Interactive Portfolio" draggable="false" />
                      <div className="rw-card__demo">
                        <span className="rw-card__demo-text">

                          View Details
                        </span>
                      </div>
                    </div>
                    <div className="rw-card__body">
                      <div className="rw-card__meta">
                        <h3 className="rw-card__name">Interactive Portfolio</h3>
                        <p className="rw-card__period">(2025 — 2026)</p>
                      </div>  <p className="rw-card__excerpt">
                        Designed and developed a modern architecture portfolio website
                        focusing on visual storytelling and project showcases. Built with
                        React, GSAP animations, and responsive layouts.
                      </p>
                      <div className="rw-card__chips">
                        <span className="rw-chip">Interactive</span>
                        <span className="rw-chip">Animation</span>
                        <span className="rw-chip">Creative</span>
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
           
                  </div>

                  <span className="rw-nav__count">
                    <b>{String(rw_idx + 1).padStart(2, "0")}</b>
                    <span> / 05</span>
                  </span>

                  <button
                    className={`rw-nav__btn rw-nav__btn--fwd ${rw_idx === 4 ? "rw-nav__btn--off" : "rw-nav__btn--on"}`}
                    onClick={() => setRw_idx((n) => Math.min(4, n + 1))}
                    disabled={rw_idx === 4}
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
                  <h2 className="process-title ">
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
                          I begin by researching your target audience and design goals —
                          understanding user needs, competitive landscape, and success metrics
                          to ensure every decision aligns with what your users actually expect.
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
                          Based on research insights, I develop information architecture, user
                          flows, and wireframes. This planning phase establishes the structural
                          foundation and ensures the design supports both usability and business
                          requirements before moving into visual design.
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
                        <h3 className="step-title">UI/UX Design & Prototyping</h3>
                        <p className="step-description">
                          I create high-fidelity mockups and interactive prototypes using Figma,
                          applying design systems and visual principles while maintaining brand
                          consistency. Prototypes allow for early testing and iteration before
                          development begins.
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
                        <h3 className="step-title">Development & Delivery</h3>
                        <p className="step-description">
                          I build the interface using modern frameworks like React, ensuring clean,
                          maintainable code. Development includes responsive design implementation,
                          performance optimization, and adherence to web accessibility standards.
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
                        <h3 className="step-title">Testing, Launch & Optimization</h3>
                        <p className="step-description">
                          Before launch, I conduct cross-browser testing, usability validation,
                          and performance audits. Post-launch, I monitor analytics and user
                          feedback to identify opportunities for continuous improvement.
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
                  About Me
                </h2>
              </div>
              <div className="services-content">
                <span className="services-index">( ABOUT ME — 05 )</span>
                <h3 className="services-subtitless split-animate">
                  Designing purposeful interfaces where
                  <span className="services-subtitle-accent">
                    {" "}
                    every detail tells a story.
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

          <section className="parallax-reveal-section">
            <div className="parallax-reveal-sticky">
              <div className="parallax-reveal-card">
                <h2 className="cta-title ">
                  Need a <span className="highlight">landing page?</span> Let's build it free
                </h2>

                <p className="cta-description split-animate">
                  5 complimentary landing page slots for businesses ready to launch.
                  Professional design, mobile-responsive, conversion-focused.
                  Trade: your feedback + portfolio permission.
                </p>

                <button className="cta-button">Claim Your Free Slot</button>

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
                    <p className="footer-label">LET'S CONNECT</p>
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
                      <p className="footer-tagline ">
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
