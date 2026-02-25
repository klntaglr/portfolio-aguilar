// COMPLETE ABOUT.JSX WITH PHILOSOPHY, CASE STUDIES, AND DETAILED PROCESS

import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useEffect, useRef, useState } from "react";
import {
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaQuoteRight,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  SiCanva,
  SiCss3,
  SiFigma,
  SiFramer,
  SiGreensock,
  SiHtml5,
  SiIndeed,
  SiReact,
} from "react-icons/si";
import { TfiLayoutMediaLeftAlt } from "react-icons/tfi";
import blueBackground1 from "../assets/blue1.png";
import logo from "../assets/logo.png";
import mockup1 from "../assets/mockup1.jpg";
import mockup4 from "../assets/mockup4.jpg";
import mockup2 from "../assets/wireframe.jpeg";
import mockup3 from "../assets/mockup3.png";
import "./Portfolio.css";

import TiltedCard from "./TiltedCard";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
gsap.registerPlugin(SplitText);

function About() {

  const [pageReady, setPageReady] = useState(false);
  const containerRef = useRef(null);

  // Case Studies Data
  const caseStudies = [
    {
      image: mockup2,
      title: "Martin Architectural",
      category: "Architecture Portfolio",
      role: "UI/UX Design & Development",
      impact: "Increased portfolio engagement by 150%",
      tags: ["React", "GSAP", "Figma"]
    },
    {
      image: mockup1,
      title: "Century 21",
      category: "Real Estate",
      role: "Website Redesign",
      impact: "Improved lead conversion by 40%",
      tags: ["UI/UX", "Landing Pages", "Prototyping"]
    },
    {
      image: mockup3,
      title: "Digital Wellness",
      category: "Healthcare",
      role: "Mobile App Design",
      impact: "4.8★ user rating on launch",
      tags: ["Mobile UI", "User Research", "Figma"]
    },
  ];

  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll(".project-card");
    const cardWidth = cards[0].offsetWidth + 32;
    const totalWidth = cardWidth * (cards.length / 2);

    const animation = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    track.addEventListener("mouseenter", () => animation.pause());
    track.addEventListener("mouseleave", () => animation.resume());

    return () => animation.kill();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.08,
          y: -10,
          duration: 0.4,
          ease: "power3.out",
        });

        gsap.to(cards, {
          opacity: 0.5,
          duration: 0.3,
        });

        gsap.to(card, {
          opacity: 1,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.4,
        });

        gsap.to(cards, {
          opacity: 1,
          duration: 0.3,
        });
      });
    });
  }, []);

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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const check = () => setIsTouchDevice(window.innerWidth <= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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

  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const link = e.target.closest("a[href^='#']");
      if (!link) return;

      const target = document.querySelector(link.getAttribute("href"));
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

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's your background and education?",
      answer:
        "I'm currently a BSIT student at La Consolacion University Philippines, specializing in UI/UX design and frontend development. Over the past year, I've completed 10+ projects ranging from landing pages to full websites, combining academic learning with hands-on experience. I'm actively expanding my skills in React, GSAP, and modern web development practices.",
    },
    {
      question: "What kind of work are you looking for?",
      answer:
        "I'm seeking full-time UI/UX and web design opportunities where I can contribute to meaningful projects while continuing to grow as a designer. I'm particularly interested in roles that value user-centered design, clean code, and collaborative teamwork. I'm also open to internships or entry-level positions that offer mentorship and learning opportunities.",
    },
    {
      question: "What makes your approach different?",
      answer:
        "I handle both design and development, which allows me to bridge the gap between visual concepts and technical execution. This dual skillset means I can create cohesive experiences from wireframe to deployment, communicate effectively with both designers and developers, and understand the practical constraints of implementation during the design phase.",
    },
    {
      question: "Can you work with remote teams?",
      answer:
        "Yes. I'm comfortable with remote collaboration tools like Figma, Slack, Git, and video conferencing platforms. I maintain clear communication, provide regular progress updates, and adapt to different team workflows. My academic projects and freelance work have prepared me for both independent work and collaborative environments.",
    },
    {
      question: "What's your typical workflow?",
      answer:
        "I start by understanding project requirements and user needs through research and stakeholder input. Next, I create wireframes and prototypes for feedback. Once approved, I develop using clean, maintainable code and modern frameworks. Throughout the process, I test across devices, iterate based on feedback, and ensure the final product meets both user and business objectives.",
    },
    {
      question: "Are you available for freelance projects?",
      answer:
        "While my primary focus is securing a full-time position, I'm open to select freelance opportunities that align with my skills and schedule. I approach every project—whether employment or freelance—with the same commitment to quality, communication, and delivering results. Feel free to reach out to discuss your needs.",
    },
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {


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
                  <a href="#about" className="nav-link-animated">
                    <span className="nav-text">
                      <span className="nav-text-top">About</span>
                      <span className="nav-text-bottom">About</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/" className="nav-link-animated">
                    <span className="nav-text">
                      <span className="nav-text-top">Portfolio</span>
                      <span className="nav-text-bottom">Portfolio</span>
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
              <button
                className="mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <span className="close-line close-line-1"></span>
                <span className="close-line close-line-2"></span>
              </button>

              <div className="mobile-menu-header">
                <h3 className="mobile-menu-title">Menu</h3>
                <p className="mobile-menu-subtitle">
                  Explore my work & services
                </p>
              </div>

              <nav className="mobile-nav-container">
                <ul className="mobile-nav-links">
                  <li className="mobile-nav-item">
                    <a
                      href="/"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">01</span>
                      <div className="nav-content">
                        <span className="nav-label">Portfolio</span>
                        <span className="nav-description">
                          Look at my Portfolio
                        </span>
                      </div>
                      <FaArrowRight className="nav-arrow" />
                    </a>
                  </li>

                  <li className="mobile-nav-item">
                    <a
                      href="#about"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">02</span>
                      <div className="nav-content">
                        <span className="nav-label">About Me</span>
                        <span className="nav-description">Learn about me</span>
                      </div>
                      <FaArrowRight className="nav-arrow" />
                    </a>
                  </li>
                </ul>
              </nav>

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
                <div className="hero-wrapper">
                  <div className="hero-content">
                    <p className="tagline split-animate">UI/UX & Web Designer

                    </p>
                    <h1 className="hero-title split-animate">
                      Learning by doing.{" "}
                      <span className="highlight">Designing websites</span> that look great and work better
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
                      <button className="cta-button">Get in Touch</button>
                      <button className="cta-buttons1">View Work</button>
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
              </div>
            </motion.main>
          </div>

          {/* INTRO SECTION */}
          <section className="about-section">

            <div className="services-container">
              <div className="services-header">
                <h2 className="works-titles" id="about">
                  About Me <br />
                  & My Work
                </h2>
              </div>

              <div className="services-content">
                <h3 className="services-subtitles split-animate">
                  UI/UX & Web Designer
                </h3>
              </div>

              <div className="services-description">
                <p className="services-paragraph">
                  I'm <span className="services-highlight">Klent Russell Aguilar,</span> a
                  BSIT student at La Consolacion University Philippines specializing in
                  UI/UX design and web development. I create digital experiences that
                  balance aesthetics with functionality—from wireframe to deployment.
                </p>

                <p className="services-paragraph">
                  My dual focus on design and development means I can{" "}
                  <span className="services-highlight">
                    bridge the gap between visual concepts and technical execution
                  </span>
                  —communicating effectively with both designers and developers while
                  understanding implementation constraints during the design phase.
                </p>

                <div className="services-what-i-do">
                  <p className="services-label">What I do:</p>
                  <ul className="services-list">
                    <li>Website design and development</li>
                    <li>UI/UX design and prototyping (Figma)</li>
                    <li>Interactive web animations (GSAP, Framer Motion)</li>
                    <li>Responsive, mobile-first implementation</li>
                    <li>Performance optimization and user testing</li>
                  </ul>
                </div>
              </div>

              {/* DESIGN PHILOSOPHY */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="philosophy">
                  <span className="services-subtitle-accent">Design</span> Philosophy
                </h3>
              </div>

              <div className="services-description">
                <p className="services-paragraph">
                  My design philosophy centers on simplicity and usability. If users need
                  to think about how to navigate a website, something needs improvement.
                  <span className="services-highlight">
                    {" "}Every design choice should serve a clear purpose
                  </span>
                  —supporting user goals while maintaining visual appeal.
                </p>

                <p className="services-paragraph">
                  I prioritize the user perspective throughout the process. What looks good
                  in design software doesn't always work in practice, which is why I test
                  designs across different devices and gather feedback at every stage.
                </p>

                <div className="services-what-i-do">
                  <p className="services-label">Core principles:</p>
                  <ul className="services-list">
                    <li><strong>User-first thinking</strong> — Design decisions guided by real user needs and behaviors</li>
                    <li><strong>Purposeful simplicity</strong> — Remove unnecessary complexity, keep interfaces intuitive</li>
                    <li><strong>Iterative refinement</strong> — Test, gather feedback, improve continuously</li>
                    <li><strong>Technical awareness</strong> — Design with implementation feasibility in mind</li>
                  </ul>
                </div>
              </div>

              {/* DETAILED PROCESS */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="process">
                  <span className="services-subtitle-accent">My</span> Design Process
                </h3>
              </div>

              <div className="services-description">
                <div className="services-what-i-dos">
                  <img
                    src={mockup2}
                    alt="Design process wireframes"
                    className="services-images"
                  />
                </div>

                <p className="services-paragraph">
                  I follow a structured, user-centered approach that emphasizes research,
                  strategic planning, and iterative development. This process ensures each
                  project addresses real user needs while meeting business objectives.
                </p>

                <div className="approach-section">
                  <h4 className="approach-title">Process breakdown:</h4>

                  <ol className="approach-list">
                    <li>
                      <strong>Research & Discovery</strong> — Understanding user needs,
                      business goals, and competitive landscape through stakeholder
                      interviews and user research
                    </li>
                    <li>
                      <strong>Information Architecture</strong> — Organizing content
                      structure, defining user flows, and mapping navigation patterns
                      to support intuitive experiences
                    </li>
                    <li>
                      <strong>Wireframing</strong> — Creating low-fidelity layouts to
                      establish page structure, content hierarchy, and interaction
                      patterns before visual design
                    </li>
                    <li>
                      <strong>Prototyping</strong> — Building interactive prototypes in
                      Figma to test user flows, validate concepts, and gather early
                      feedback
                    </li>
                    <li>
                      <strong>Visual Design</strong> — Applying design systems, brand
                      guidelines, and visual principles to create high-fidelity mockups
                    </li>
                    <li>
                      <strong>Frontend Development</strong> — Implementing designs with
                      clean, maintainable code using React, ensuring responsiveness and
                      performance
                    </li>
                    <li>
                      <strong>Testing & Iteration</strong> — Conducting usability tests,
                      cross-browser testing, and performance audits, then refining based
                      on feedback
                    </li>
                  </ol>
                </div>

                <p className="services-paragraph">
                  This iterative approach allows me to validate decisions early and make
                  adjustments before committing to development.{" "}
                  <span className="services-highlight">
                    The result is a product that's been refined through continuous feedback
                    and testing.
                  </span>
                </p>
              </div>

              {/* CASE STUDY HIGHLIGHTS */}


              {/* CORE CAPABILITIES */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="cap">
                  Core Capabilities
                </h3>
              </div>
              <div className="core-capabilities">
                <ul className="capabilities-list">
                  <li>Designing user-friendly interfaces focused on clear navigation and usability</li>
                  <li>Building responsive websites that work smoothly across all devices</li>
                  <li>Creating purposeful animations that enhance user experience</li>
                  <li>Developing clean, maintainable code using modern frameworks</li>
                  <li>Testing and refining designs based on user feedback</li>
                </ul>
              </div>

              {/* TOOLS & TECHNOLOGIES */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="skills">
                  Tools & Technologies
                </h3>
              </div>
              <div className="core-capabilities">
                <ul className="capabilities-list">
                  <li><span className="bold">Design:</span> Figma, Canva, Adobe Photoshop</li>
                  <li><span className="bold">Development:</span> React, HTML/CSS, JavaScript</li>
                  <li><span className="bold">Animation:</span> GSAP, Framer Motion</li>
                  <li><span className="bold">Tools:</span> Git, VS Code, Chrome DevTools</li>
                  <li><span className="bold">Performance:</span> Responsive design, loading optimization, cross-browser testing</li>
                </ul>
              </div>

              {/* WORK VALUES */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate">
                  Work Values
                </h3>
              </div>

              <div className="services-description">
                <div className="services-what-i-do">
                  <ul className="services-list">
                    <li><strong>Continuous learning</strong> — Staying current with modern design and development practices</li>
                    <li><strong>Clear communication</strong> — Regular updates and collaborative feedback throughout projects</li>
                    <li><strong>User-first thinking</strong> — Designing experiences that are intuitive and accessible</li>
                    <li><strong>Quality focus</strong> — Delivering thoughtful, well-executed work</li>
                  </ul>
                </div>

                <p className="services-paragraph">
                  I'm seeking opportunities to contribute to meaningful projects while
                  continuing to grow as a designer and developer.{" "}
                  <span className="services-highlight">
                    Open to full-time roles, internships, and collaborative work.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* ANIMATED PROJECT CAROUSEL */}
          <section className="works-section">
            <div className="carousel-track" ref={trackRef}>
              {[...caseStudies, ...caseStudies].map((project, i) => (
                <div className="project-card" key={i}>
                  <div className="project-image">
                    <img src={project.image} alt="" draggable="false" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="faq-section">
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
                      <span className="faq-question-text">{faq.question}</span>
                      <span className="faq-toggle-icon">
                        {openFAQ === index ? "×" : "+"}
                      </span>
                    </button>

                    <div
                      className={`faq-answer ${openFAQ === index ? "open" : ""}`}
                    >
                      <div className="faq-answer-content">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <div id="container" ref={containerRef}>
            <section className="parallax-reveal-section panels">
              <div className="parallax-reveal-sticky">
                <div className="parallax-reveal-card">
                  <h2 className="cta-title split-animate">
                    Ready to{" "}
                    <span className="highlight">collaborate?</span>
                  </h2>

                  <p className="cta-description split-animate">
                    I'm actively seeking opportunities to contribute to meaningful projects
                    and grow as a designer. Whether you're hiring, exploring collaboration,
                    or just want to connect—let's talk.
                  </p>

                  <button className="cta-button">Get in Touch</button>
                </div>
              </div>
            </section>

            {/* Footer Section */}
            <footer className="footer-section panels">
              <div className="footer-container">
                <div className="footer-top">
                  <div className="footer-cta">
                    <p className="footer-label">LET'S CONNECT</p>
                    <h2 className="footer-email">
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
                        <li><a href="#heros">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#philosophy">Philosophy</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#process">Process</a></li>
                        <li><a href="#contact">Contact</a></li>
                      </ul>
                    </div>

                    <div className="footer-column">
                      <h3 className="footer-column-title">SOCIAL MEDIA</h3>
                      <ul className="footer-nav-list">
                        <li>
                          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="footer-icon" /> Facebook
                          </a>
                        </li>
                        <li>
                          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="footer-icon" /> Instagram
                          </a>
                        </li>
                        <li>
                          <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
                            <FaDribbble className="footer-icon" /> Dribbble
                          </a>
                        </li>
                        <li>
                          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                            <FaDiscord className="footer-icon" /> Discord
                          </a>
                        </li>
                        <li>
                          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="footer-icon" /> LinkedIn
                          </a>
                        </li>
                        <li>
                          <a href="https://indeed.com" target="_blank" rel="noopener noreferrer">
                            <SiIndeed className="footer-icon" /> Indeed
                          </a>
                        </li>
                      </ul>
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

export default About;