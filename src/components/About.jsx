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
import "./Portfolio.css";
import Preloader from "./Preloader"; // ADD THIS
import TiltedCard from "./TiltedCard";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
gsap.registerPlugin(SplitText);

function About() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const containerRef = useRef(null);
  const projectsData = [
    { image: mockup2, title: "Martin Architectural" },
    { image: mockup1, title: "Century 21" },
    { image: mockup2, title: "Digital Wellness" },
    { image: mockup1, title: "Brand Refresh" },
    { image: mockup2, title: "Interactive Portfolio" },
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

    // Pause on hover track
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
    { node: <SiReact />, title: "React" },
    { node: <SiFramer />, title: "Framer" },
    { node: <SiGreensock />, title: "GSAP" },
    { node: <SiCanva />, title: "Canva" },
    { node: <SiFigma />, title: "Figma" },
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

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!pageReady) return;

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
                      <span className="nav-text-bottom">Portfolio </span>
                    </span>
                  </a>
                </li>




                <li>
                  <a href="#about" className="nav-link-animated">
                    <span className="nav-text">
                      <span className="nav-text-top">Projects</span>
                      <span className="nav-text-bottom">Projects</span>
                    </span>
                  </a>

                </li>
                <a href="/contact-me" className="nav-cta-btn">
                  <TfiLayoutMediaLeftAlt className="nav-cta-icon" />
                  Get in Touch
                </a>
                {/* CTA stays untouched */}
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
                <div className="hero-wrapper">
                  <div className="hero-content">
                    <p className="tagline split-animate">LEARN ABOUT ME</p>
                    <h1 className="hero-title split-animate">
                      Learning by doing.{" "}
                      <span className="highlight">Designing websites </span> {" "}
                      that look great and work better
                    </h1>{" "}


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
                      <button className="cta-button ">Get in Touch</button>{" "}
                      <button className="cta-buttons1">About Me</button>{" "}
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

          <section className="about-section">

            <FaQuoteRight className="quote-watermark" />
            <div className="about-container">
              <div className="intro-story">
                <h2 className="story-paragraph" id="about">
                  Hi! I'm{" "}
                  <span className="intro-name">Klent Russell Aguilar,</span> a
                  BSIT student at La Consolacion University Philippines
                  specializing in UI/UX design and front-end development. Over
                  the past year, I've focused on understanding what makes
                  websites effective— combining user-centered design with clean
                  development to create digital experiences that look
                  professional and function smoothly. What started as curiosity
                  about web design has grown into a genuine commitment to the
                  craft.
                </h2>
              </div>

              <div className="intro-story">
                <p className="story-paragraph">
                  My approach focuses on{" "}
                  <span className="story-highlight">
                    combining thoughtful design with practical development
                  </span>{" "}
                  to create websites that serve both user needs and business
                  goals. I believe good design should feel natural guiding
                  visitors without overwhelming them. I'm committed to
                  continuous learning because web design and development are
                  fields that constantly evolve, and staying current is
                  essential to delivering quality work.
                </p>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="about-section">
            <div className="services-container">
              <div className="services-header">
                <h2 className="man-behind-title ">
                  The Evolution <br />
                  of Web Design
                </h2>
              </div>
              <div className="services-content">
                <h3 className="services-subtitles split-animate ">
                  <span className="services-subtitle-accent">
                    {" "}
                    What Sets Me Apart as a
                  </span>{" "}
                  Web Designer
                </h3>
              </div>

              <div className="services-description">
                <p className="services-paragraph">
                  I approach web design as both a creative and technical challenge.
                  <span className="services-highlight"> {" "}
                    My dual focus on UI/UX design and frontend development
                  </span> means I can create interfaces that look polished and actually work—from
                  wireframe to deployment.
                </p>

                <p className="services-paragraph">
                  Through academic projects and real client work, I've learned that great design
                  isn't just about aesthetics. It's about clear communication, thoughtful interaction,
                  and solving actual problems for real users.
                </p>

                <div className="services-what-i-do">
                  <p className="services-label">What I do:</p>
                  <ul className="services-list">
                    <li>Web design and frontend development</li>
                    <li>UI/UX design and prototyping</li>
                    <li>Interactive animations (GSAP, Framer Motion)</li>
                    <li>Responsive, mobile-first development</li>
                    <li>Performance optimization and testing</li>
                  </ul>
                </div>


                <p className="services-paragraph">
                  This combination of design and development skills allows me to
                  create cohesive digital experiences.{" "}
                  <span className="services-highlight">
                    The result is websites that look professional and function
                    smoothly across all devices.
                  </span>
                </p>
              </div>

              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="cap">
                  Core Capabilities
                </h3>
              </div>
              <div className="core-capabilities">
                <ul className="capabilities-list">
                  <li>
                    Designing user-friendly interfaces focused on clear
                    navigation and usability
                  </li>
                  <li>
                    Building responsive websites that work smoothly across all
                    devices
                  </li>
                  <li>
                    Creating purposeful animations that enhance user experience
                  </li>
                  <li>
                    Developing clean, maintainable code using modern frameworks
                    (React, GSAP)
                  </li>
                  <li>
                    Testing and refining designs based on user feedback and
                    performance data
                  </li>
                </ul>
              </div>
              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="phil">
                  <span className="services-subtitle-accent">My Design</span>{" "}
                  Philosophy
                </h3>
              </div>
              <div className="services-description">
                <p className="services-paragraph">
                  My design philosophy centers on simplicity and usability. If
                  users need to think about how to navigate your website,
                  something needs improvement. Every design choice should serve
                  a clear purpose—supporting user goals while maintaining visual
                  appeal.
                </p>

                <p className="services-paragraph">
                  I approach each project by prioritizing the user perspective.
                  What looks good in design software doesn't always work in
                  practice, which is why I test designs across different devices
                  and gather feedback throughout the development process.
                </p>
              </div>
              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="process">
                  <span className="services-subtitle-accent">Strategic</span>{" "}
                  Web <br /> Design Process
                </h3>
              </div>

              <div className="services-description">
                <div className="services-what-i-dos">
                  <img
                    src={mockup2}
                    alt="What I do"
                    className="services-images"
                  />
                </div>

                <p className="services-paragraph">
                  Through my studies and project experience, I've developed a
                  structured approach to web design that emphasizes user
                  research, strategic planning, and iterative development. This
                  process helps ensure that each project addresses real user
                  needs while meeting business objectives.
                </p>

                <p className="services-paragraph">
                  Every project begins with understanding your goals and target
                  audience, allowing me to create designs that are both visually
                  appealing and functionally effective.
                </p>
                <div className="approach-section">
                  <h4 className="approach-title">My approach combines:</h4>

                  <ol className="approach-list">
                    <li>
                      User-centered design focused on clear navigation and
                      usability
                    </li>
                    <li>
                      Purposeful animations that enhance rather than distract
                    </li>
                    <li>Clean, well-structured content presentation</li>
                    <li>Performance-optimized development practices</li>
                    <li>
                      Consistent visual design aligned with brand identity
                    </li>
                  </ol>
                </div>
              </div>
              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="approach">
                  <span className="services-subtitle-accent">
                    My Approach to
                  </span>{" "}
                  Collaboration
                </h3>
              </div>
              <div className="services-description">
                <p className="services-paragraph">
                  I maintain clear communication throughout every project stage.
                  Regular updates and collaborative feedback sessions ensure we
                  stay aligned on goals and direction. Your input is
                  essential—you understand your business and audience better
                  than anyone, and that knowledge guides the design decisions we
                  make together.
                </p>
                {/* My Approach & Values */}
                <div className="services-content">
                  <h3 className="services-subtitles split-animate">
                    <span className="services-subtitle-accent">My</span>{" "}
                    Approach & Values
                  </h3>
                </div>

                <div className="services-description">
                  <p className="services-paragraph">
                    Beyond tools and techniques, my work is guided by a clear
                    set of principles. These values shape how I design,
                    communicate, and collaborate on every project—ensuring the
                    process feels structured, transparent, and purposeful from
                    start to finish.
                  </p>

                  <div className="services-what-i-do">
                    <p className="services-label">What guides my work:</p>
                    <ul className="services-list">
                      <li>
                        <strong>Continuous learning</strong> — staying current
                        with modern design trends, tools, and best practices to
                        deliver relevant solutions.
                      </li>
                      <li>
                        <strong>Clear communication</strong> — providing regular
                        updates and maintaining alignment throughout each
                        project phase.
                      </li>
                      <li>
                        <strong>User-first thinking</strong> — designing
                        experiences that feel intuitive, accessible, and
                        purposeful for real users.
                      </li>
                      <li>
                        <strong>Quality over speed</strong> — focusing on
                        thoughtful execution rather than rushing results.
                      </li>
                    </ul>
                  </div>

                  <p className="services-paragraph">
                    This approach allows me to work efficiently while
                    maintaining a high standard of quality.{" "}
                    <span className="services-highlight">
                      The goal is not just to deliver a website, but to create a
                      digital experience that supports long-term growth and
                      trust.
                    </span>
                  </p>
                </div>

                <h3 className="services-subtitles split-animate" id="skills">
                  Tools & Technologies
                </h3>
              </div>
              <div className="core-capabilities">
                <ul className="capabilities-list">
                  <li>
                    <span className="bold">Design:</span> Figma, Canva, Adobe
                    Photoshop
                  </li>
                  <li>
                    <span className="bold">Development:</span> React, HTML/CSS,
                    JavaScript
                  </li>
                  <li>
                    <span className="bold">Animation:</span> GSAP, Framer Motion
                  </li>
                  <li>
                    <span className="bold">Tools:</span> Git, VS Code, Chrome
                    DevTools
                  </li>
                  <li>
                    <span className="bold">Performance:</span> Responsive
                    design, loading optimization, cross-browser testing
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="works-section">
            <div className="carousel-track" ref={trackRef}>
              {[...projectsData, ...projectsData].map((project, i) => (
                <div className="project-card" key={i}>
                  <div className="project-image">
                    <img src={project.image} alt="" draggable="false" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="faq-section ">
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

export default About;
