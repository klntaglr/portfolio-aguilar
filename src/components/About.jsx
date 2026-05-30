// COMPLETE ABOUT.JSX WITH PHILOSOPHY, CASE STUDIES, AND DETAILED PROCESS

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import {
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaStar,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import {
  FiAlertCircle,
  FiBriefcase,
  FiCheckCircle,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiEdit3,
  FiGlobe,
  FiLayers,
  FiMail,
  FiMessageSquare,
  FiRepeat,
  FiUser,
  FiX
} from "react-icons/fi";
import {
  SiIndeed
} from "react-icons/si";
import { TfiLayoutMediaLeftAlt } from "react-icons/tfi";
import blueBackground1 from "../assets/blue1.png";
import logo from "../assets/logo.png";
import arielle1 from "../assets/arielle1.png";
import bangkal1 from "../assets/bangkal1.png";
import laconslanet5 from "../assets/laconslanet5.png";
import mockup2 from "../assets/wireframe.jpeg";
import virielleorig from "../assets/virielleorig.png";
import grad from "../assets/grad.jpg";
import ladyAvatar from "../assets/ladyclient.jpg";
import nammerAvatar from "../assets/nammer1.png";
import czarAvatar from "../assets/czar.jpg";
import ellaAvatar from "../assets/ella.jpg";
import freecodecampLogo from "../assets/freecodecamp.png";
import "./Portfolio.css";

import TiltedCard from "./TiltedCard";
import useSplitAnimateReveal from "./useSplitAnimateReveal";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

function About() {
  const [heroReady, setHeroReady] = useState(false);
  const containerRef = useRef(null);
  const consultationToastTimerRef = useRef(null);
  const [consultationStep, setConsultationStep] = useState(0);
  const [consultationToast, setConsultationToast] = useState(null);
  const [consultationForm, setConsultationForm] = useState({
    projectType: "redesign",
    investment: "project",
    timeline: "asap",
    website: "",
    brief: "",
    name: "",
    email: "",
  });

  // Case Studies Data
  const caseStudies = [
    {
      image: virielleorig,
      title: "Martin Architectural",
      category: "Architecture Portfolio",
      role: "UI/UX Design & Development",
      impact: "Increased portfolio engagement by 150%",
      tags: ["React", "GSAP", "Figma"]
    },
    {
      image: arielle1,
      title: "Century 21",
      category: "Real Estate",
      role: "Website Redesign",
      impact: "Improved lead conversion by 40%",
      tags: ["UI/UX", "Landing Pages", "Prototyping"]
    },
    {
      image: laconslanet5,
      title: "Digital Wellness",
      category: "Healthcare",
      role: "Mobile App Design",
      impact: "4.8★ user rating on launch",
      tags: ["Mobile UI", "User Research", "Figma"]
    },
    {
      image: bangkal1,
      title: "Barangay QRUSH",
      category: "Public Service",
      role: "Full-stack Web App",
      impact: "Streamlined document requests",
      tags: ["React", "Firebase", "GSAP"]
    },
  ];

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

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHeroReady(true);
    }, 100);
    return () => window.clearTimeout(timer);
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
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    const onTick = () => {
      const currentScroll = smoother.scrollTop();
      const navbar = document.querySelector(".navbar");
      const scrollDelta = currentScroll - lastScrollRef.current;

      if (!navbar) return;

      if (currentScroll <= 80 || scrollDelta < -3) {
        setShowNavbar(true);
      } else if (scrollDelta > 3 && currentScroll > 120) {
        setShowNavbar(false);
      }

      if (currentScroll > 80) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      lastScrollRef.current = currentScroll;
    };

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
      smoother.kill();
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
  const [hoveredCert, setHoveredCert] = useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's your background and education?",
      answer:
        "I'm currently a BSIT student at La Consolacion University Philippines, specializing in UI/UX design and frontend development. Over the past year, I've completed 4 projects ranging from landing pages to full websites, combining academic learning with hands-on experience. I'm actively expanding my skills in React, GSAP, and modern web development practices.",
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

  const consultationTotalSteps = 4;
  const consultationProgress =
    ((consultationStep + 1) / consultationTotalSteps) * 100;

  const projectTypeOptions = [
    {
      value: "hire",
      title: "Hire me full-time",
      description: "UI/UX, web design, and React frontend for your team",
      icon: <FiBriefcase />,
    },
    {
      value: "redesign",
      title: "Website redesign",
      description: "Upgrade an existing site into a cleaner experience",
      icon: <FiRepeat />,
    },
    {
      value: "landing",
      title: "Landing page",
      description: "Focused single page for leads, launches, or offers",
      icon: <FiEdit3 />,
    },
    {
      value: "product",
      title: "UI/UX + React project",
      description: "Dashboards, web apps, prototypes, and product screens",
      icon: <FiLayers />,
    },
  ];

  const investmentOptions = [
    {
      value: "internship",
      title: "Internship / OJT",
      description: "Training-ready",
    },
    {
      value: "entry",
      title: "Entry-level role",
      description: "Full-time / junior",
    },
    {
      value: "project",
      title: "Project-based",
      description: "Open scope",
    },
    {
      value: "discuss",
      title: "Let's discuss",
      description: "Flexible terms",
    },
  ];

  const timelineOptions = [
    { value: "asap", label: "ASAP" },
    { value: "1-3", label: "1 - 3 months" },
    { value: "3-6", label: "3 - 6 months" },
    { value: "flexible", label: "Flexible" },
  ];

  const updateConsultationField = (field, value) => {
    setConsultationForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const showConsultationToast = (type, message) => {
    if (consultationToastTimerRef.current) {
      window.clearTimeout(consultationToastTimerRef.current);
    }

    setConsultationToast({ type, message });
    consultationToastTimerRef.current = window.setTimeout(() => {
      setConsultationToast(null);
    }, 3600);
  };

  const isConsultationStepValid = () => {
    if (consultationStep === 0) return Boolean(consultationForm.projectType);
    if (consultationStep === 1) return Boolean(consultationForm.investment);
    if (consultationStep === 2) return Boolean(consultationForm.timeline);
    return (
      consultationForm.name.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultationForm.email.trim())
    );
  };

  const nextConsultationStep = () => {
    if (!isConsultationStepValid()) {
      showConsultationToast("error", "Please complete this step first.");
      return;
    }

    setConsultationStep((current) =>
      Math.min(current + 1, consultationTotalSteps - 1),
    );
  };

  const previousConsultationStep = () => {
    setConsultationStep((current) => Math.max(current - 1, 0));
  };

  const submitConsultation = (event) => {
    event.preventDefault();

    if (!isConsultationStepValid()) {
      showConsultationToast("error", "Add your name and a valid email.");
      return;
    }

    showConsultationToast(
      "success",
      "Consultation request ready. I'll reply within 24 hours.",
    );
    setConsultationForm({
      projectType: "redesign",
      investment: "project",
      timeline: "asap",
      website: "",
      brief: "",
      name: "",
      email: "",
    });
    setConsultationStep(0);
  };

  useEffect(() => {
    return () => {
      if (consultationToastTimerRef.current) {
        window.clearTimeout(consultationToastTimerRef.current);
      }
    };
  }, []);

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

  useSplitAnimateReveal();


  return (
    <>
      <nav
        className={`navbar navbar-static ${showNavbar ? "navbar-visible" : "navbar-hidden"}`}
      >
        <div className="logo">
          <a href="#heros">
            <img src={logo} alt="Logo" />
          </a>
        </div>

        <ul className="nav-links desktop-nav">
          <li>
            <a href="/" className="nav-link-animated">
              <span className="nav-text">
                <span className="nav-text-top">Portfolio</span>
                <span className="nav-text-bottom">Portfolio</span>
              </span>
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link-animated">
              <span className="nav-text">
                <span className="nav-text-top">About</span>
                <span className="nav-text-bottom">About</span>
              </span>
            </a>
          </li>
          <li className="nav-dropdown">
            <button
              type="button"
              className="nav-link-animated nav-dropdown-toggle"
              aria-haspopup="true"
            >
              <span className="nav-text">
                <span className="nav-text-top">Explore About</span>
                <span className="nav-text-bottom">Explore About</span>
              </span>
              <FiChevronDown className="nav-dropdown-icon" />
            </button>
            <div className="nav-dropdown-menu" role="menu">
       
              <a href="#process" className="nav-dropdown-link" role="menuitem">Process</a>
              <a href="#certifications" className="nav-dropdown-link" role="menuitem">Certifications</a>
              <a href="#skills" className="nav-dropdown-link" role="menuitem">Tools</a>
              <a href="#case" className="nav-dropdown-link" role="menuitem">Case Studies</a>
              <a href="#faq" className="nav-dropdown-link" role="menuitem">FAQ</a>
            </div>
          </li>


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
            className="portfolio-container about-page"
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
                          Back to homepage
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
                      <span className="nav-number">03</span>
                      <div className="nav-content">
                        <span className="nav-label">What I Do</span>
                        <span className="nav-description">My capabilities & expertise</span>
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
                      href="#certifications"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">05</span>
                      <div className="nav-content">
                        <span className="nav-label">Certifications</span>
                        <span className="nav-description">
                          Credentials and achievements
                        </span>
                      </div>
                      <FaArrowRight className="nav-arrow" />
                    </a>
                  </li>
                  <li className="mobile-nav-item">
                    <a
                      href="#skills"
                      onClick={closeMobileMenu}
                      className="mobile-nav-link"
                    >
                      <span className="nav-number">06</span>
                      <div className="nav-content">
                        <span className="nav-label">Tools</span>
                        <span className="nav-description">
                          My core tools and stack
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
                      <span className="nav-number">07</span>
                      <div className="nav-content">
                        <span className="nav-label">Case Studies</span>
                        <span className="nav-description">
                          Highlights and outcomes
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
                      <span className="nav-number">08</span>
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

              <div className="mobile-menu-cta-section">
                <div className="cta-highlight-badge">
                  <TfiLayoutMediaLeftAlt className="cta-gift-icon" />
                  <span className="cta-badge-text">Limited Offer</span>
                </div>

                <a href="/free-landing-page" className="cta-button-mobile" onClick={closeMobileMenu}>
                  <span className="cta-text">Free Landing Page</span>
                  <FaArrowRight className="cta-button-arrow" />
                </a>

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
              className={`hero-section panel ${heroReady ? "hero-ready" : ""}`}
              id="hero"
              style={{ filter: blur, opacity }}
            >
              <div className="hero-background" aria-hidden="true"></div>
              <div className="hero-entry-overlay" aria-hidden="true"></div>
              <div className="hero-wrapper">
                <div className="hero-content">
                  <p className="tagline hero-tagline-entry">UI/UX Designer & Web Designer</p>
                  <h1 className="hero-title split-animate hero-title-reveal">
                    Designing <span className="highlight">clean interfaces</span> for better user experience.
                  </h1>

                  <div className="hero-social-proof hero-stats-entry">
                    <div className="hero-proof-pill">
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
                    <a href="/contact-me" className="cta-button">Let's Connect</a>
                    <a href="/projects" className="cta-buttons1">View Works</a>
                  </div>
                </div>

                <div className="hero-card hero-card-entry">
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
                </div>
              </div>
            </motion.main>
          </div>

          {/* INTRO SECTION */}
          <section className="about-section" id="services">

            <div className="services-container">
              <div className="services-header">
                <h2 className="works-titles" id="about">
                  Behind <br />
                  the Work
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
                  UI/UX and web designer focused on creating purposeful, user-centered interfaces. My work spans
                  product design, mobile UI, web design, and frontend development — with an emphasis on
                  research-grounded decisions and clean, intentional execution.
                </p>

                <p className="services-paragraph">
                  I handle both design and development — not to replace collaboration, but to
                  strengthen it.{" "}
                  <span className="services-highlight">
                    Understanding implementation constraints makes me a stronger designer;
                  </span>{" "}
                  understanding user needs makes me a more intentional builder.
                </p>

                <div className="services-what-i-do">
                  <p className="services-label">What I do:</p>
                  <ul className="services-list">
                    <li>UI/UX design & prototyping (Figma)</li>
                    <li>Mobile app design — iOS & Android</li>
                    <li>Web design & responsive development</li>
                    <li>Landing pages, dashboards & portfolio sites</li>
                    <li>Interaction design (GSAP, Framer Motion)</li>
                    <li>Redesign, UX audits & usability testing</li>
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
                  Every project follows the same discipline: understand the user before
                  touching a design tool, structure before style, and validate before
                  shipping. This keeps decisions grounded and avoids expensive pivots later.
                </p>

                <div className="approach-section">
                  <h4 className="approach-title">Step by step:</h4>

                  <ol className="approach-list">
                    <li>
                      <strong>Requirement Gathering</strong> — Before anything else,
                      I align with stakeholders on business goals, technical constraints,
                      target users, timeline, and scope. This is where functional
                      requirements (what the system must do) and non-functional
                      requirements (performance, accessibility, security) are documented
                      and agreed upon — so the design work never starts from assumption.
                    </li>
                    <li>
                      <strong>Research & Discovery</strong> — Stakeholder interviews,
                      user interviews, surveys, competitive analysis, and analytics review.
                      Every design decision starts here — grounded in evidence, not gut feel.
                      I observe real users in real contexts before touching a design tool.
                    </li>
                    <li>
                      <strong>Define & Synthesize</strong> — Research findings are turned
                      into user personas, journey maps, affinity maps, and a sharp problem
                      statement. This phase keeps the entire team aligned on what is actually
                      being solved — not just what looks good to build.
                    </li>
                    <li>
                      <strong>Information Architecture</strong> — Content structure,
                      sitemaps, card sorting, and navigation flows — so users find
                      what they need without thinking too hard. Structure decisions
                      happen before any visual work begins.
                    </li>
                    <li>
                      <strong>Wireframing & Ideation</strong> — Lo-fi sketches and
                      digital wireframes that establish layout, hierarchy, and screen
                      connections. Fast, cheap, and built for rapid iteration —
                      no colors, no fonts yet. Crazy 8s and user flows happen here.
                    </li>
                    <li>
                      <strong>Visual Design & Prototyping</strong> — High-fidelity UI
                      in Figma: typography systems, color tokens, spacing, iconography,
                      and reusable component libraries. Interactive prototypes validate
                      flows and micro-interactions before a single line of code is written.
                    </li>
                    <li>
                      <strong>Usability Testing & Iteration</strong> — Real users test
                      the prototype. I observe, document friction points, run heuristic
                      reviews against Nielsen's 10 principles, and iterate on findings
                      before committing to development. Test early — revise cheaply.
                    </li>
                    <li>
                      <strong>Development & Handoff</strong> — Clean, responsive React
                      implementation with annotated Figma specs, design tokens, and
                      asset exports. I stay involved during the build phase to catch
                      implementation gaps before they ship.
                    </li>
                    <li>
                      <strong>QA, Launch & Iteration</strong> — Cross-browser and device
                      testing, accessibility audits (WCAG), and performance reviews before
                      launch. Post-launch analytics and user feedback feed the next
                      iteration cycle — because good design is never truly finished.
                    </li>
                  </ol>
                </div>

                <p className="services-paragraph">
                  This process isn't rigid — it adapts to project scope and team structure.
                  But the core discipline stays the same:{" "}
                  <span className="services-highlight">
                    validate early, iterate often, and never skip the research.
                  </span>
                </p>
              </div>

   


              {/* CORE CAPABILITIES */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="cap">
                  Core Capabilities
                </h3>
              </div>
              <div className="core-capabilities">
                <ul className="capabilities-list">
                  <li>End-to-end UI/UX design — research, wireframes, high-fidelity Figma, prototype</li>
                  <li>Mobile app design for iOS and Android</li>
                  <li>Web design: landing pages, dashboards, portfolios, and full site redesigns</li>
                  <li>Interaction design and micro-animations (GSAP, Framer Motion)</li>
                  <li>Frontend implementation in React — responsive, accessible, performant</li>
                  <li>Usability testing and iterative design refinement</li>
                </ul>
              </div>

              {/* CERTIFICATIONS */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="certifications">
                  Certifications
                </h3>
              </div>
              <div className="about-cert-grid">
                <a href="https://www.coursera.org/account/accomplishments/professional-cert/VV2F4V6ODWAJ" target="_blank" rel="noopener noreferrer" className="about-cert-card">
                  <div className="about-cert-card__logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" />
                  </div>
                  <div className="about-cert-card__body">
                    <strong className="about-cert-card__title">Google UX Design</strong>
                    <span className="about-cert-card__meta">Professional Certificate · Coursera · 2026</span>
                    <div className="about-cert-card__tools">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma" className="cert-tool-icon" title="Figma" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="cert-tool-icon" title="Google" />
                    </div>
                  </div>
                  <div className="about-cert-card__arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                  </div>
                </a>

                <a href="https://www.coursera.org/account/accomplishments/professional-cert/P5944BGSCQGU" target="_blank" rel="noopener noreferrer" className="about-cert-card">
                  <div className="about-cert-card__logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" />
                  </div>
                  <div className="about-cert-card__body">
                    <strong className="about-cert-card__title">Microsoft UX Design Professional</strong>
                    <span className="about-cert-card__meta">Professional Certificate · Coursera · 2026</span>
                    <div className="about-cert-card__tools">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma" className="cert-tool-icon" title="Figma" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="cert-tool-icon" title="Microsoft" />
                    </div>
                  </div>
                  <div className="about-cert-card__arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                  </div>
                </a>

                <a href="https://www.freecodecamp.org/certification/klntaglr/front-end-development-libraries" target="_blank" rel="noopener noreferrer" className="about-cert-card">
                  <div className="about-cert-card__logo about-cert-card__logo--fcc">
                    <img src={freecodecampLogo} alt="freeCodeCamp" />
                  </div>
                  <div className="about-cert-card__body">
                    <strong className="about-cert-card__title">Front End Development Libraries</strong>
                    <span className="about-cert-card__meta">freeCodeCamp · Dec 2025</span>
                    <div className="about-cert-card__tools">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="cert-tool-icon" title="React" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" className="cert-tool-icon" title="Node.js" />
                    </div>
                  </div>
                  <div className="about-cert-card__arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                  </div>
                </a>
              </div>

              {/* TOOLS & TECHNOLOGIES */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate" id="skills">
                  Tools & Technologies
                </h3>
              </div>
              <div className="core-capabilities">
                <ul className="capabilities-list">
                  <li><span className="bold">Design:</span> Figma (layouts, prototyping, component systems, auto-layout), Framer, UX research, usability testing, typography & colour systems, WCAG accessibility</li>
                  <li><span className="bold">Interaction:</span> GSAP, Framer Motion</li>
                  <li><span className="bold">Frontend development:</span> React, Next.js, HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, responsive & mobile-first implementation</li>
                  <li><span className="bold">Additional technical experience:</span> Node.js, Express.js, Supabase, Firebase, SQLite, Prisma, Electron, Git & GitHub</li>
                </ul>
              </div>

              {/* CASE STUDY HIGHLIGHTS */}
              <div className="apart-cases" id="case">
                <h3 className="services-subtitles split-animate">Case Study Highlights</h3>
                <div className="apart-cases-grid">
                  <a href="/projects/qrush" className="apart-case-card">
                    <div className="apart-case-img">
                      <img src={bangkal1} alt="QRUSH Barangay Bangkal" draggable="false" />
                      <div className="rw-card__overlay" />
                      <div className="rw-card__hover-content">
                        <span className="rw-card__hover-label">View Case Study</span>
                        <div className="rw-card__arrow">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="apart-case-info">
                      <strong className="apart-case-title">QRUSH — Barangay Bangkal</strong>
                      <p className="apart-case-desc">Full-stack web app for barangay document requests built from the ground up. I led requirements gathering, stakeholder alignment, user research, and UI/UX design, then implemented the React frontend and Node.js backend for a live deployment. The system includes request tracking, QR verification, and notification flows that reduced repeat visits and shortened turnaround time, and it was evaluated at 4.47/5 against ISO/IEC 25010:2023 with 40 respondents.</p>
                    </div>
                  </a>
                  <a href="/projects/laconslanet" className="apart-case-card">
                    <div className="apart-case-img">
                      <img src={laconslanet5} alt="LaConsolaNet!" draggable="false" />
                      <div className="rw-card__overlay" />
                      <div className="rw-card__hover-content">
                        <span className="rw-card__hover-label">View Case Study</span>
                        <div className="rw-card__arrow">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="apart-case-info">
                      <strong className="apart-case-title">LaConsolaNet! — LCUP Social Platform</strong>
                      <p className="apart-case-desc">Complete UI/UX redesign of a social media web app across web, mobile, and landing page surfaces, delivered in 3 to 5 days before defense. I reviewed the research paper, aligned the information architecture with user priorities, and rebuilt every screen to match LCUP's institutional identity. The result was a cohesive design system, tighter navigation flow, and a clearer visual hierarchy that improved readability, content scanning, and overall usability.</p>
                    </div>
                  </a>
                </div>
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
          <section className="works-section about-marquee" id="projects" style={{ overflow: 'hidden' }}>
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <div className="carousel-track about-marquee-track">
                {[...caseStudies, ...caseStudies].map((project, i) => (
                  <div className="project-card" key={i}>
                    <div className="project-image">
                      <img src={project.image} alt="" draggable="false" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="faq-section" id="faq">
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
                  <h2 className="cta-title">
                    Looking for a <span className="highlight">UI/UX designer</span>?
                  </h2>

                  <p className="cta-description split-animate">
                    I create user-focused digital experiences that combine research, design strategy, and smooth Figma-to-code execution. Always ready to bring ideas to life in UI/UX and web design projects.
                  </p>

                  <div className="cta-actions">
                    <a href="/contact-me" className="cta-button">Let's Work Together</a>
                    <a href="/resume.pdf" className="cta-buttons1" download>Download CV</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Section */}
            <footer className="footer-section panels" id="contact">
              <div className="footer-container">
                <div className="footer-top">
                  <div className="footer-cta">
                    <p className="footer-label">LET'S CONNECT</p>
                    <h2 className="footer-email">
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
                        <li><a href="#heros">Home</a></li>
                        <li><a href="/about-web-designer">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="/projects/qrush">Projects</a></li>
                        <li><a href="#process">Process</a></li>
                        <li><a href="#process">Contact</a></li>
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
