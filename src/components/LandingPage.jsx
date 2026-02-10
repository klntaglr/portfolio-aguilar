import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Maillards from "./Maillards";
import "./Portfolio.css";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import {
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
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
import mockup from "../assets/mockup.jpg";
import mockup1 from "../assets/mockup1.jpg";
import mockup3 from "../assets/mockup3.png";
import mockup4 from "../assets/mockup4.jpg";
import mockup2 from "../assets/wireframe.jpeg";
import Preloader from "./Preloader"; // ADD THIS
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
gsap.registerPlugin(SplitText);

function LandingPage() {
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
        "Strategic landing page design engineered to capture attention, build trust, and drive conversions. Every element is purposefully crafted to guide your audience toward taking action—whether that's booking a call, making a purchase, or requesting a demo. The result: landing pages that don't just look good, they perform.",
      tags: [
        "Conversion Optimization",
        "Lead Generation",
        "A/B Testing Ready",
        "Strategic Messaging",
        "Mobile-First Design",
      ],
      image: mockup,
    },
    {
      number: "02",
      name: "Website Design",
      description:
        "Premium website design that positions your brand as an industry authority. We create sophisticated digital experiences that communicate credibility, professionalism, and value from the first impression. Your website becomes a powerful asset that attracts ideal clients and sets you apart from competitors.",
      tags: [
        "Brand Positioning",
        "Premium Design",
        "Strategic Architecture",
        "Multi-Device Excellence",
        "Scalable Systems",
      ],
      image: mockup1,
    },
    {
      number: "03",
      name: "UI/UX Design",
      description:
        "User experience design rooted in psychology and business strategy. We eliminate friction, reduce bounce rates, and create intuitive pathways that guide users exactly where you want them to go. The focus is simple: design that feels effortless while driving measurable business outcomes.",
      tags: [
        "User Psychology",
        "Conversion Flows",
        "Behavioral Design",
        "Usability Testing",
        "Strategic Prototyping",
      ],
      image: mockup2,
    },
    {
      number: "04",
      name: "Website Redesign",
      description:
        "Turn your underperforming website into a revenue-generating platform. We revitalize outdated brands with modern design systems, improved user journeys, and strategic messaging that resonates with today's market. Your refreshed website will reflect where your business is going—not where it's been.",
      tags: [
        "Brand Evolution",
        "Competitive Repositioning",
        "Legacy Modernization",
        "Growth-Focused Redesign",
        "Market Alignment",
      ],
      image: mockup3,
    },
    {
      number: "05",
      name: "Interactive Web Design",
      description:
        "Immersive web experiences that captivate and engage. Through sophisticated animations, scroll-triggered interactions, and micro-moments of delight, we create websites that people remember and talk about. Stand out in crowded markets with digital experiences that feel less like websites and more like journeys.",
      tags: [
        "Cinematic Scrolling",
        "Brand Storytelling",
        "Advanced Animations",
        "Memorable Interactions",
        "Premium Polish",
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
      question: "What happens after I submit my application?",
      answer:
        "Within 3-5 business days, you'll receive an email letting you know if your project was selected. If chosen, we'll schedule a kickoff call to discuss your vision, goals, and requirements in detail. If not selected this round, you're welcome to apply again in the future or explore my paid services. Either way, you'll hear back from me — I review every application personally.",
    },
    {
      question: "Can I see examples of landing pages you've built before?",
      answer:
        "Absolutely. You can check out my portfolio section on this website to see previous projects I've completed. Each project showcases different styles, industries, and design approaches. Since this free landing page offer is new, I'm specifically looking to add diverse, creative projects to my collection. Your project could be featured as one of the premium examples that demonstrates my capabilities to future clients.",
    },
    {
      question:
        "What if my business or project idea changes during the design process?",
      answer:
        "Minor pivots or refinements are completely normal and expected — businesses evolve. If the changes are small (like adjusting your messaging, switching target audience focus, or tweaking your offer), we can incorporate them into the design revisions. However, if your entire business concept changes drastically (switching from a restaurant to a tech startup, for example), we may need to pause and reassess whether the project still fits within the free offering scope.",
    },
    {
      question:
        "Do you offer ongoing maintenance after the 30-day support period?",
      answer:
        "Yes. After the free 30-day support period ends, you can hire me for ongoing maintenance, updates, or additional features on a paid basis. This includes content updates, design tweaks, new sections, performance optimization, or technical fixes. I offer flexible monthly retainer packages or one-time project rates depending on your needs. Many clients prefer keeping me on retainer for peace of mind and quick turnaround times.",
    },
    {
      question: "Can I upgrade to a multi-page website later?",
      answer:
        "Definitely. The free landing page is a single-page design, but if your business grows and you need additional pages (About, Services, Blog, Contact, etc.), I can expand it into a full multi-page website. We'd discuss pricing based on the number of pages, features, and complexity you need. The great part is we'd already have your branding, design system, and content foundation established from the landing page.",
    },
    {
      question: "What if I need the landing page faster than 10-14 days?",
      answer:
        "The 10-14 day timeline is realistic for maintaining quality while managing multiple projects. However, if you have an urgent deadline (like an upcoming product launch or event), let me know in your application. Depending on my current workload and your project's complexity, I may be able to expedite the process for an additional rush fee, or we can explore paid priority service to guarantee faster delivery.",
    },
    {
      question: "Will my landing page work with my existing marketing tools?",
      answer:
        "Yes. I can integrate your landing page with most popular marketing and analytics tools including Google Analytics, Facebook Pixel, Mailchimp, ConvertKit, HubSpot, Calendly, Typeform, and more. Just let me know which platforms you're currently using or plan to use during our kickoff call, and I'll make sure everything connects seamlessly. Most integrations are straightforward and included in the free service.",
    },
    {
      question: "Can you help with copywriting if I'm not good at writing?",
      answer:
        "I can definitely help refine and structure your copy to be more conversion-focused and persuasive. I'll guide you on messaging, help you organize your thoughts, and suggest improvements to headlines, CTAs, and benefit statements. However, I'm not a professional copywriter — you'll need to provide the core ideas, value propositions, and key information about your business. If you need full copywriting services, I can recommend talented copywriters I've worked with.",
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
                  <a href="/" className="nav-link-animated">
                    <span className="nav-text">
                      <span className="nav-text-top">Portfolio</span>
                      <span className="nav-text-bottom">Portfolio </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a href="/about-web-designer" className="nav-link-animated">
                    <span className="nav-text">
                      <span className="nav-text-top">About Me</span>
                      <span className="nav-text-bottom">About Me</span>
                    </span>
                  </a>
                </li>

                {/* CTA stays untouched */}
                <a href="#start" className="nav-cta-btn">
                  Start Your Project
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
              className="hero-section panel "
              id="hero"
              style={{ filter: blur, opacity }}
            >
              <div className="hero-wrapper">
                <div className="hero-contents">
                  <h1 className="hero-titles ">
                    Free Landing Page Design{" "}
                    <span className="highlight">Trade Your Feedback</span> for
                    Professional Work
                  </h1>
                  <div className="cta-wrapper">
                    <a href="#about" className="cta-buttons1">
                      How it Works
                    </a>
                    <a href="#start" className="cta-buttons">
                      Claim My Free Page
                    </a>
                  </div>
                </div>
              </div>
            </motion.main>
          </div>

          {/* Services Section */}
          <section className="about-section">
            <div className="services-container">
              {/* HEADER */}
              <div className="services-header">
                <h2 className="man-behind-title">
                  Free Landing
                  <br />
                  Page Design
                </h2>
              </div>

              {/* WHAT YOU GET */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate">
                  <span className="services-subtitle-accent" id="about">
                    What's Included
                  </span>{" "}
                  — Everything You Need to Launch
                </h3>
              </div>

              <div className="services-description">
                <p className="services-paragraph">
                  I'm offering 5 free, professional landing pages to projects
                  I'm genuinely excited about. This is a complete
                  design-to-deployment package — not just mockups or templates.
                  You'll get a fully functional, live website that's ready to
                  collect leads, showcase your work, or launch your product.
                </p>

                <div className="services-what-i-do">
                  <p className="services-label">What you'll receive:</p>
                  <ul className="services-list">
                    <li>
                      Custom landing page design tailored to your brand and
                      goals
                    </li>
                    <li>
                      Fully responsive layout (works perfectly on mobile,
                      tablet, desktop)
                    </li>
                    <li>
                      Modern animations and smooth interactions using GSAP
                    </li>
                    <li>Clean, optimized code for fast loading speeds</li>
                    <li>
                      SEO-ready structure with proper meta tags and headings
                    </li>
                    <li>
                      Free hosting on Vercel, Netlify, or Firebase (included)
                    </li>
                    <li>Contact form integration (if needed)</li>
                    <li>2 rounds of design revisions based on your feedback</li>
                    <li>All source files (Figma design + code)</li>
                    <li>Basic deployment and setup guide</li>
                    <li>
                      30 days of email support for questions or minor fixes
                    </li>
                  </ul>
                </div>

                <p className="services-paragraph">
                  <span className="services-highlight">
                    What's NOT included:
                  </span>{" "}
                  Custom domain names (.com, .net, etc.) — if you want your own
                  domain, you'll need to purchase it separately (around
                  ₱500-800/year or $10-15/year). I can help you connect it to
                  your free hosting, but the domain registration cost is on you.
                  If you're okay with a free subdomain like
                  yourproject.vercel.app or yourproject.netlify.app, then
                  everything is 100% free.
                </p>

                <p className="services-paragraph">
                  Hosting is completely free and included — platforms like
                  Vercel, Netlify, and Firebase offer generous free tiers that
                  are more than enough for landing pages. You won't pay a single
                  cent for hosting unless you scale to enterprise levels (which
                  is unlikely for a landing page).
                </p>
              </div>

              {/* TYPES OF WEBSITES */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate">
                  <span className="services-subtitle-accent">
                    Types of Websites
                  </span>{" "}
                  <br /> I Can Build for You
                </h3>
              </div>

              <div className="core-capabilities">
                <p className="services-paragraph">
                  <span className="services-highlight">
                    Note on E-commerce:
                  </span>{" "}
                  I build beautiful product showcases with professional layouts,
                  galleries, and pricing — but no payment processing or checkout
                  systems. Your page can link to platforms where you already
                  sell (Shopify, Etsy, Gumroad) or work as a stunning product
                  portfolio. Simple features like contact forms and email
                  signups are included. I don't handle shopping carts, payment
                  gateways, or databases — those need specialized back-end
                  security I don't provide.
                </p>

                <ul className="capabilities-list">
                  <li>
                    <span className="bold">Portfolio/Creative:</span> Showcase
                    your creative work, case studies, projects, or design
                    portfolio — perfect for designers, photographers,
                    developers, artists, videographers, or freelancers looking
                    to attract clients and display their best work
                  </li>
                  <li>
                    <span className="bold">Business/Professional:</span>{" "}
                    Single-page site for service businesses, agencies,
                    consultants, law firms, accounting firms, or local
                    businesses to explain services, build credibility, and
                    capture qualified leads
                  </li>
                  <li>
                    <span className="bold">E-commerce Product Page:</span>{" "}
                    Visually stunning product showcase page with features,
                    pricing, high-quality product images, customer reviews, and
                    purchase CTAs. This is design and UI/UX only — no payment
                    processing or checkout systems. Perfect for displaying
                    products that link to your existing Shopify, Etsy, or
                    e-commerce platform, or for portfolio/presentation purposes.
                  </li>
                  <li>
                    <span className="bold">Personal Brand/Influencer:</span>{" "}
                    Build your online presence as an influencer, content
                    creator, coach, speaker, author, or thought leader with bio,
                    social links, media kit, and contact options
                  </li>
                  <li>
                    <span className="bold">SaaS/Software Landing:</span>{" "}
                    Introduce and sell software, apps, or digital tools with
                    feature highlights, demo videos, pricing tiers, and free
                    trial CTAs
                  </li>
                  <li>
                    <span className="bold">Event/Workshop Registration:</span>{" "}
                    Promote and collect sign-ups for webinars, conferences,
                    meetups, workshops, bootcamps, or online courses with event
                    details, speakers, agenda, and registration forms
                  </li>
                  <li>
                    <span className="bold">Lead Generation/Service:</span>{" "}
                    Convert visitors into email subscribers, phone calls, or
                    consultation bookings — ideal for coaches, real estate
                    agents, insurance brokers, marketing agencies, or B2B
                    services
                  </li>
                  <li>
                    <span className="bold">Coming Soon/Pre-launch:</span> Tease
                    an upcoming launch and collect emails from interested early
                    adopters before your full site or product is ready — great
                    for building hype and validating demand
                  </li>
                  <li>
                    <span className="bold">Informational/Educational:</span>{" "}
                    Share educational content, resources, guides, or tutorials
                    on a specific topic with clear navigation and downloadable
                    materials
                  </li>
                  <li>
                    <span className="bold">Nonprofit/Advocacy:</span> Share your
                    mission, impact stories, volunteer opportunities, or cause
                    with clear CTAs for donations, sign-ups, or community
                    involvement
                  </li>
                  <li>
                    <span className="bold">Restaurant/Menu:</span> Showcase your
                    menu, location, hours, reservation system, and food
                    photography to attract diners and online orders
                  </li>
                  <li>
                    <span className="bold">Booking/Appointment:</span> Enable
                    online booking for salons, clinics, fitness trainers,
                    therapists, or service providers with integrated scheduling
                    tools
                  </li>
                </ul>
              </div>

              <div className="services-description">
                <p className="services-paragraph">
                  Not sure which type fits your project? That's completely fine
                  — we'll figure it out together during our kickoff call. I'll
                  ask questions about your goals, audience, and what action you
                  want visitors to take, then recommend the best structure and
                  approach for your specific needs.
                </p>
              </div>

              {/* TIMELINE & PROCESS */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate">
                  <span className="services-subtitle-accent">Timeline &</span>{" "}
                  How Long It Takes
                </h3>
              </div>

              <div className="services-description">
                <p className="services-paragraph">
                  From start to finish, expect{" "}
                  <span className="services-highlight">
                    10-14 business days
                  </span>{" "}
                  depending on project complexity, number of sections, and how
                  quickly you respond to feedback. Here's the realistic,
                  detailed breakdown:
                </p>

                <div className="approach-section">
                  <h4 className="approach-title">
                    Complete timeline breakdown:
                  </h4>
                  <ol className="approach-list">
                    <li>
                      <span className="bold">
                        Application Review (3-5 business days):
                      </span>{" "}
                      I'll carefully review all submissions and select 5
                      projects based on creativity, feasibility, portfolio fit,
                      and how excited I am about the idea. You'll receive an
                      email either way — selected or not.
                    </li>
                    <li>
                      <span className="bold">
                        Kickoff Call (30-60 minutes):
                      </span>{" "}
                      If selected, we'll schedule a video or voice call to
                      discuss your vision, clarify goals, review your materials,
                      and answer any questions. This is where we align
                      expectations and get on the same page.
                    </li>
                    <li>
                      <span className="bold">
                        Research & Strategy (1-2 days):
                      </span>{" "}
                      I'll research your industry, analyze competitors, study
                      your target audience, and create a content/design strategy
                      tailored to your specific goals and market positioning.
                    </li>
                    <li>
                      <span className="bold">
                        Content Organization (1 day):
                      </span>{" "}
                      I'll organize your provided content, refine copy if
                      needed, and structure the page flow to maximize
                      conversions and user experience.
                    </li>
                    <li>
                      <span className="bold">
                        Initial Design Concepts (3-4 days):
                      </span>{" "}
                      I'll create the full visual design in Figma including
                      layout, color scheme, typography, imagery placement, and
                      overall aesthetic. You'll see exactly how your landing
                      page will look.
                    </li>
                    <li>
                      <span className="bold">
                        First Review & Feedback (1 day):
                      </span>{" "}
                      I'll share the design with you via Figma link and walk you
                      through it. Take your time to review, gather opinions, and
                      provide detailed feedback on what you like and what needs
                      adjusting.
                    </li>
                    <li>
                      <span className="bold">Revision Round 1 (2-3 days):</span>{" "}
                      Based on your feedback, I'll refine the design, adjust
                      colors, modify layouts, swap imagery, or change typography
                      — whatever is needed to get closer to your vision.
                    </li>
                    <li>
                      <span className="bold">
                        Second Review & Feedback (1 day):
                      </span>{" "}
                      I'll share the updated design for your final review. This
                      is your last chance to request changes before development
                      begins.
                    </li>
                    <li>
                      <span className="bold">Revision Round 2 (1-2 days):</span>{" "}
                      Final polish, detail refinement, and ensuring everything
                      feels perfect. After this round, the design is locked and
                      we move to development.
                    </li>
                    <li>
                      <span className="bold">
                        Front-End Development (4-5 days):
                      </span>{" "}
                      I'll code the landing page using React/HTML/CSS, implement
                      animations with GSAP, optimize for performance, and ensure
                      pixel-perfect responsiveness across all devices.
                    </li>
                    <li>
                      <span className="bold">
                        Testing & Quality Assurance (1-2 days):
                      </span>{" "}
                      I'll test on multiple browsers (Chrome, Firefox, Safari,
                      Edge), devices (mobile, tablet, desktop), and screen
                      sizes. I'll also check loading speed, accessibility, and
                      SEO optimization.
                    </li>
                    <li>
                      <span className="bold">Deployment & Launch (1 day):</span>{" "}
                      I'll deploy your landing page to free hosting (Vercel,
                      Netlify, or Firebase), set up SSL certificate for
                      security, and make sure everything is live and functional.
                      If you have a custom domain, I'll help you connect it.
                    </li>
                    <li>
                      <span className="bold">
                        Handoff & Documentation (1 day):
                      </span>{" "}
                      I'll send you all design files (Figma), source code
                      (GitHub or ZIP), hosting dashboard access, and a simple
                      guide on how to make basic updates or content changes
                      yourself.
                    </li>
                    <li>
                      <span className="bold">
                        30-Day Support Period (Ongoing):
                      </span>{" "}
                      After launch, you can email me anytime within 30 days for
                      questions, minor fixes, or clarifications. I'll respond
                      within 24-48 hours on business days.
                    </li>
                  </ol>
                </div>

                <p className="services-paragraph">
                  <span className="services-highlight">Important note:</span>{" "}
                  This timeline assumes you respond to feedback requests and
                  provide materials within 24-48 hours. If you take longer to
                  reply or delay providing necessary content/images, the project
                  timeline extends accordingly. The faster you respond, the
                  faster we launch. Communication is key.
                </p>

                <p className="services-paragraph">
                  I'll send progress updates via email at each milestone so you
                  always know where we are in the process. Transparency matters
                  — you should never feel left in the dark about your project's
                  status.
                </p>
              </div>

              {/* WHAT I NEED FROM YOU */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate">
                  <span className="services-subtitle-accent">
                    Required Resources
                  </span>{" "}
                  & Materials From You
                </h3>
              </div>

              <div className="services-description">
                <p className="services-paragraph">
                  To create the best possible landing page for your project,
                  I'll need your input, materials, and collaboration. Don't
                  worry if you don't have everything perfectly organized — I'll
                  guide you through the process and help fill in the gaps.
                  Here's what I need:
                </p>

                <div className="approach-section">
                  <h4 className="approach-title">
                    Essential information & resources:
                  </h4>
                  <ol className="approach-list">
                    <li>
                      <span className="bold">Project Overview & Goals:</span> A
                      clear description of what you're building, what problem it
                      solves, who your target audience is, and what you want
                      visitors to do (sign up, buy, book, download, etc.). A
                      simple 2-3 paragraph summary is enough.
                    </li>
                    <li>
                      <span className="bold">Brand Assets (if available):</span>
                      <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
                        <li>
                          Logo files (PNG, SVG, or AI format — transparent
                          background preferred)
                        </li>
                        <li>
                          Brand colors (hex codes, RGB values, or brand
                          guidelines if you have them)
                        </li>
                        <li>
                          Brand fonts (name of fonts or font files if custom)
                        </li>
                        <li>
                          Existing style guide or branding document (if
                          available)
                        </li>
                      </ul>
                      If you don't have any branding yet, that's okay — we can
                      create a fresh visual identity together during the design
                      phase.
                    </li>
                    <li>
                      <span className="bold">Written Content:</span>
                      <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
                        <li>
                          Main headline (what grabs attention and communicates
                          your value)
                        </li>
                        <li>
                          Subheadline (supporting message that expands on the
                          headline)
                        </li>
                        <li>
                          About/description text (explain what you do and why it
                          matters)
                        </li>
                        <li>
                          Key features or benefits (top 3-5 things that make you
                          unique)
                        </li>
                        <li>
                          Call-to-action copy (button text like "Get Started,"
                          "Book Now," etc.)
                        </li>
                        <li>
                          Footer information (copyright, contact details, social
                          links)
                        </li>
                      </ul>
                      Content doesn't need to be perfect or final — I'll help
                      refine, shorten, or restructure it for better conversions.
                      Just give me your best draft.
                    </li>
                    <li>
                      <span className="bold">Images & Media:</span>
                      <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
                        <li>
                          High-resolution photos of your product, team,
                          workspace, or results
                        </li>
                        <li>
                          Product mockups, screenshots, or app interface images
                        </li>
                        <li>
                          Graphics, illustrations, or icons you want to include
                        </li>
                        <li>
                          Posters, flyers, or marketing materials with your
                          branding
                        </li>
                        <li>
                          Video files or YouTube links (if you want embedded
                          video)
                        </li>
                        <li>Team member headshots (if applicable)</li>
                      </ul>
                      If you don't have professional photos, I can suggest free
                      stock photo resources or create simple graphics. Just let
                      me know what's available.
                    </li>
                    <li>
                      <span className="bold">Visual References:</span> Share 2-3
                      websites or landing pages you like (for style inspiration,
                      not copying). This helps me understand your aesthetic
                      preferences, what kind of vibe you're going for, and what
                      resonates with you visually.
                    </li>
                    <li>
                      <span className="bold">
                        Contact & Business Information:
                      </span>
                      <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
                        <li>Business name and tagline</li>
                        <li>Email address (for contact forms or display)</li>
                        <li>Phone number (if you want it shown)</li>
                        <li>Physical address or location (if relevant)</li>
                        <li>
                          Social media links (Facebook, Instagram, LinkedIn,
                          Twitter, etc.)
                        </li>
                        <li>Operating hours or availability (if applicable)</li>
                      </ul>
                    </li>
                    <li>
                      <span className="bold">Social Proof (if available):</span>
                      <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
                        <li>Customer testimonials or reviews</li>
                        <li>
                          Client logos (if you've worked with recognizable
                          brands)
                        </li>
                        <li>Case study results or success metrics</li>
                        <li>Awards, certifications, or credentials</li>
                        <li>Media mentions or press coverage</li>
                      </ul>
                      Social proof builds trust and credibility — if you have
                      it, definitely include it.
                    </li>
                    <li>
                      <span className="bold">Technical Requirements:</span>
                      <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
                        <li>
                          Do you need a contact form? (I can integrate free form
                          services like Formspree or Web3Forms)
                        </li>
                        <li>
                          Do you need email capture/newsletter signup? (I can
                          connect to Mailchimp, ConvertKit, etc.)
                        </li>
                        <li>
                          Do you need analytics? (I can add Google Analytics or
                          similar tracking)
                        </li>
                        <li>
                          Do you want live chat integration? (Tawk.to, Intercom,
                          etc.)
                        </li>
                        <li>Any specific integrations or third-party tools?</li>
                      </ul>
                    </li>
                    <li>
                      <span className="bold">Legal Pages (if needed):</span>
                      <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
                        <li>
                          Privacy Policy (required if collecting emails or data)
                        </li>
                        <li>Terms & Conditions or Terms of Service</li>
                        <li>Cookie Policy (if applicable)</li>
                        <li>Refund/Return Policy (for e-commerce)</li>
                      </ul>
                      If you don't have these yet, I can provide basic templates
                      or recommend free legal policy generators. These are
                      important for compliance, especially if you're collecting
                      user data.
                    </li>
                  </ol>
                </div>

                <p className="services-paragraph">
                  Don't have everything on this list?{" "}
                  <span className="services-highlight">
                    That's completely normal.
                  </span>{" "}
                  Most people don't. I'll help you organize your thoughts,
                  source free alternatives for missing materials, and fill in
                  gaps during our kickoff call. My goal is to make this process
                  as easy and stress-free as possible for you.
                </p>

                <p className="services-paragraph">
                  The more complete and organized your materials are, the faster
                  we can move through the design process. But even if you're
                  starting from scratch with just an idea, we'll figure it out
                  together step by step.
                </p>
              </div>
            </div>
          </section>

          <section className="works-section">
            <Maillards />
          </section>

          <section className="parallax-reveal-section">
            <div className="parallax-reveal-sticky">
              <div className="parallax-reveal-card">
                <h2 className="cta-title split-animate">
                  Ready to get your{" "}
                  <span className="highlight">
                    free professional landing page?
                  </span>
                </h2>

                <p className="cta-description">
                  Only 5 slots available for this limited opportunity. Get a
                  fully designed, mobile-responsive, and conversion-focused
                  landing page in exchange for your honest feedback. No hidden
                  costs, no commitments — just professional work that helps your
                  business grow.
                </p>

                <button className="cta-button">Claim Your Free Slot</button>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="services-container">
              <div className="services-content">
                <h3 className="services-subtitles split-animate">
                  <span className="services-subtitle-accent">Terms &</span>{" "}
                  Conditions
                </h3>
              </div>

              <div className="services-description">
                <p className="services-paragraph">
                  To keep this opportunity fair, transparent, and mutually
                  beneficial, here are the terms and conditions for the free
                  landing page offer:
                </p>

                <div className="approach-section">
                  <h4 className="approach-title">
                    Please read carefully before applying:
                  </h4>
                  <ol className="approach-list">
                    <li>
                      <span className="bold">Selection Process:</span> I reserve
                      the right to select projects based on my own criteria
                      including creativity, feasibility, portfolio fit, and
                      personal interest. Not all applicants will be selected.
                      Selection decisions are final and non-negotiable.
                    </li>
                    <li>
                      <span className="bold">Free Service Scope:</span> The free
                      landing page includes design, development, and deployment
                      on free hosting platforms (Vercel, Netlify, Firebase).
                      Custom domain registration is NOT included — you must
                      purchase your own domain if you want a custom URL.
                    </li>
                    <li>
                      <span className="bold">Revision Limits:</span> You're
                      entitled to 2 rounds of design revisions during the design
                      phase. Additional revisions beyond this may be declined or
                      require paid service. Revisions must be provided within 48
                      hours of each review to keep the project on schedule.
                    </li>
                    <li>
                      <span className="bold">Content Responsibility:</span> You
                      are responsible for providing all written content, images,
                      logos, and materials needed for the landing page. I can
                      help refine and organize content, but I'm not a copywriter
                      or photographer. Content must be original or properly
                      licensed — no copyrighted or stolen materials.
                    </li>
                    <li>
                      <span className="bold">Timeline Flexibility:</span> The
                      estimated 10-14 day timeline is subject to change based on
                      project complexity and your responsiveness. Delays in
                      providing feedback or materials will extend the timeline.
                      I'll do my best to meet deadlines, but external factors
                      may cause adjustments.
                    </li>
                    <li>
                      <span className="bold">Portfolio Rights:</span> By
                      accepting this free service, you grant me permission to
                      showcase the completed landing page in my portfolio, case
                      studies, social media, and marketing materials. I will
                      credit your project and may use screenshots or live links.
                    </li>
                    <li>
                      <span className="bold">Testimonial Requirement:</span> If
                      you're satisfied with the final result, you agree to
                      provide a short testimonial (2-3 sentences) that I can use
                      on my website and marketing materials. Testimonials must
                      be honest and authentic.
                    </li>
                    <li>
                      <span className="bold">Ownership:</span> Upon project
                      completion and handoff, you own all rights to the final
                      landing page design and code. You can modify,
                      redistribute, or use it however you want. I retain the
                      right to showcase it in my portfolio.
                    </li>
                    <li>
                      <span className="bold">Support Period:</span> I provide 30
                      days of email support after launch for questions, minor
                      fixes, or clarifications. After 30 days, support ends
                      unless you hire me for paid ongoing maintenance. Support
                      does not include major feature additions or redesigns.
                    </li>
                    <li>
                      <span className="bold">No Guarantees:</span> While I'll
                      design and build your landing page professionally, I
                      cannot guarantee specific business results like sales,
                      leads, or conversions. Success depends on many factors
                      including your product, market, and marketing efforts.
                    </li>
                    <li>
                      <span className="bold">Professional Conduct:</span> Both
                      parties agree to communicate professionally, respectfully,
                      and promptly. Abusive, disrespectful, or unreasonable
                      behavior from either side may result in project
                      termination.
                    </li>
                    <li>
                      <span className="bold">Legal Compliance:</span> You are
                      responsible for ensuring your landing page complies with
                      all applicable laws, regulations, and industry standards
                      including privacy laws (GDPR, CCPA), advertising
                      standards, and terms of service for any integrated
                      platforms.
                    </li>
                    <li>
                      <span className="bold">Third-Party Services:</span> If
                      your landing page requires third-party integrations
                      (payment processors, email services, analytics), you are
                      responsible for creating accounts, managing subscriptions,
                      and complying with their terms of service. I can assist
                      with technical integration only.
                    </li>
                    <li>
                      <span className="bold">Cancellation:</span> I reserve the
                      right to cancel or pause a project if you become
                      unresponsive for more than 7 days, fail to provide
                      necessary materials, or if continuing the project is no
                      longer feasible. You may also cancel at any time, but the
                      slot will not be reopened.
                    </li>
                    <li>
                      <span className="bold">No Refunds:</span> Since this is a
                      free service, there are no refunds. However, if you're
                      unsatisfied with the final result, I'll work with you to
                      address concerns within the agreed revision scope.
                    </li>
                    <li>
                      <span className="bold">Modification of Terms:</span> I
                      reserve the right to modify these terms at any time. Any
                      changes will be communicated to active projects. By
                      continuing with the project, you accept updated terms.
                    </li>
                  </ol>
                </div>

                <p className="services-paragraph">
                  By applying for this free landing page opportunity, you
                  acknowledge that you've read, understood, and agree to these
                  terms and conditions. If you have questions or concerns about
                  any of these terms, please reach out before applying.
                </p>
              </div>

              {/* PRIVACY & DATA */}
              <div className="services-content">
                <h3 className="services-subtitles split-animate">
                  <span className="services-subtitle-accent">Privacy &</span>{" "}
                  Data Handling
                </h3>
              </div>

              <div className="services-description">
                <p className="services-paragraph">
                  Your privacy and data security matter. Here's how I handle
                  information during our collaboration:
                </p>

                <div className="approach-section">
                  <h4 className="approach-title">
                    Data protection commitments:
                  </h4>
                  <ol className="approach-list">
                    <li>
                      <span className="bold">Information Collection:</span> I'll
                      collect only the information necessary to complete your
                      landing page including business details, contact
                      information, brand assets, content, and project
                      requirements. I won't ask for sensitive personal data,
                      financial information, or anything unrelated to the
                      project.
                    </li>
                    <li>
                      <span className="bold">Data Storage:</span> All project
                      files, communications, and materials will be stored
                      securely on password-protected cloud storage (Google
                      Drive, Dropbox) or project management tools. Access is
                      limited to me and you only.
                    </li>
                    <li>
                      <span className="bold">Communication Privacy:</span> All
                      emails, calls, and conversations between us are
                      confidential. I won't share your ideas, business plans, or
                      proprietary information with third parties without your
                      explicit permission.
                    </li>
                    <li>
                      <span className="bold">Third-Party Access:</span> I may
                      use third-party tools for design (Figma), development
                      (GitHub), hosting (Vercel/Netlify), and communication
                      (Email, Zoom). These platforms have their own privacy
                      policies which I encourage you to review.
                    </li>
                    <li>
                      <span className="bold">Portfolio Use:</span> When
                      showcasing your project in my portfolio, I'll only share
                      publicly visible information (website screenshots, project
                      description, your business name). I won't share private
                      business metrics, analytics, or confidential details
                      unless you explicitly approve.
                    </li>
                    <li>
                      <span className="bold">Data Retention:</span> Project
                      files will be retained for 90 days after project
                      completion in case you need access or revisions. After 90
                      days, files may be deleted or archived. If you want files
                      deleted sooner, just ask.
                    </li>
                    <li>
                      <span className="bold">No Selling of Data:</span> I will
                      never sell, rent, or share your personal or business
                      information with marketers, advertisers, or third parties
                      for commercial purposes. Your data is yours.
                    </li>
                    <li>
                      <span className="bold">Breach Notification:</span> In the
                      unlikely event of a data breach affecting your project
                      materials, I'll notify you immediately and take steps to
                      secure your information.
                    </li>
                    <li>
                      <span className="bold">Your Rights:</span> You have the
                      right to request access to your data, request corrections,
                      or ask for deletion at any time. Just email me and I'll
                      comply within 72 hours.
                    </li>
                  </ol>
                </div>

                <p className="services-paragraph">
                  If you have specific privacy concerns or requirements (NDAs,
                  confidentiality agreements, etc.), let me know during the
                  application process and we can discuss appropriate measures.
                </p>
              </div>

              {/* HOW TO APPLY */}
              <div className="services-content">
                <h3 className="services-subtitless1 split-animate">
                  <span className="services-subtitle-accent">Ready to</span>{" "}
                  Apply?
                </h3>
              </div>

              <div className="services-description" id="start">
                <p className="services-paragraph">
                  If you've read everything above and you're excited about this
                  opportunity, here's how to apply for one of the 5 free landing
                  page slots:
                </p>
                <div className="approach-section">
                  <h4 className="approach-title">Application process:</h4>
                  <ol className="approach-list">
                    <li>
                      <span className="bold">Prepare Your Information:</span>{" "}
                      Gather your project details, goals, target audience
                      description, any existing materials (logo, content,
                      images), and 2-3 reference websites you like.
                    </li>
                    <li>
                      <span className="bold">Submit Your Application:</span>{" "}
                      Email me at{" "}
                      <a
                        href="mailto:klentaguilar@gmail.com"
                        style={{
                          color: "var(--purple-primary)",
                          textDecoration: "underline",
                        }}
                      >
                        klentaguilar@gmail.com
                      </a>{" "}
                      with the subject line "Free Landing Page Application -
                      [Your Project Name]"
                    </li>
                    <li>
                      <span className="bold">Include in Your Email:</span>
                      <ul style={{ marginTop: "8px", marginLeft: "20px" }}>
                        <li>Your name and contact information</li>
                        <li>Project name and description (2-3 paragraphs)</li>
                        <li>
                          What type of landing page you need (portfolio,
                          business, product, etc.)
                        </li>
                        <li>Your target audience and main goal</li>
                        <li>Why you're applying for this free opportunity</li>
                        <li>
                          Any materials you already have (attach or provide
                          links)
                        </li>
                        <li>Your timeline and availability</li>
                      </ul>
                    </li>
                    <li>
                      <span className="bold">Wait for Response:</span> I'll
                      review all applications within 3-5 business days and send
                      you an email either confirming selection or thanking you
                      for applying.
                    </li>
                    <li>
                      <span className="bold">If Selected:</span> We'll schedule
                      a kickoff call within 1 week to get started on your
                      project.
                    </li>
                  </ol>
                </div>
                <p className="services-paragraph">
                  Slots are limited to 5 projects to maintain quality and give
                  each one the attention it deserves. If you're interested,
                  don't wait — once they're filled, I'll open applications again
                  in a few months.{" "}
                  <span className="services-highlight">
                    Let's build something great together.
                  </span>
                </p>
                <div className="quick-reminder-box">
                  <p className="reminder-label">Quick Reminder:</p>
                  <p className="reminder-text">
                    This is a genuine opportunity to get professional design
                    work in exchange for feedback and portfolio rights. I'm
                    selective about projects because I want to create work I'm
                    proud of. If your project excites me and aligns with my
                    portfolio goals, you'll get the same quality I deliver to
                    paying clients. Apply with authentic details and realistic
                    expectations.
                  </p>
                </div>{" "}
              </div>
            </div>
          </section>
          <div id="container" ref={containerRef}>
            <section className="faq-section panels">
              <div className="faq-container">
                <h2 className="faq-title split-animate">
                  Still Have Questions?
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

export default LandingPage;
