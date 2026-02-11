import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
import logo from "../assets/logo.png";
import mockup from "../assets/mockup.jpg";
import mockup1 from "../assets/mockup1.jpg";
import mockup3 from "../assets/mockup3.png";
import mockup4 from "../assets/mockup4.jpg";
import mockup2 from "../assets/wireframe.jpeg";
import Preloader from "./Preloader"; // ADD THIS
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
gsap.registerPlugin(SplitText);

function Contact() {
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
     
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="portfolio-container">
            <nav
              className={`navbar ${showNavbar ? "navbar-visible" : "navbar-hidden"}`}
            >
              <div className="logo1"></div>

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
            {/* Services Section */}
            <section className="about-section">
              <div className="services-container">
                {/* HEADER */}
                <div className="services-header">
                  <h2 className="man-behind-title">
                    Let's <br />
                    Collaborate
                  </h2>
                </div>
                <div className="services-content">
                  <span className="services-index">(GET IN TOUCH — 01)</span>

                  <h3 className="services-subtitless split-animate">
                    Transforming brands through{" "}
                    <span className="services-subtitle-accent">
                      purposeful design and strategic digital experiences.
                    </span>
                  </h3>
                </div>
              </div>
              <div className="contact-form-wrapper">
                <div className="contact-container">
                  {/* Left Section */}
                  <div className="contact-left">
                    <div className="contact-header">
                      <h2>We'd love to hear from you!</h2>
                    </div>

                    <div className="contact-options">
                      <a
                        href="mailto:klentaguilar@gmail.com"
                        className="contact-option"
                      >
                        <div className="contact-option-icon">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" />
                          </svg>
                        </div>

                        <div className="contact-option-content">
                          <span className="contact-option-text">Email</span>
                          <span className="contact-option-email">
                            klentaguilar@gmail.com
                          </span>
                        </div>
                      </a>

                      <a href="tel:+1234567890" className="contact-option">
                        <div className="contact-option-icon">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" />
                          </svg>
                        </div>
                        <div className="contact-option-content">
                          <span className="contact-option-text">Phone</span>
                          <span className="contact-option-email">
                            (+63) 967-217-965
                          </span>
                        </div>
                      </a>

                      <a href="#contact-form" className="contact-option">
                        <div className="contact-option-icon">
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M11 5H6C4.89543 5 4 5.89543 4 7V19L7.5 16.5H18C19.1046 16.5 20 15.6046 20 14.5V13M11 5L14 2L17 5M11 5V10C11 11.1046 11.8954 12 13 12H14M14 2V7C14 8.10457 14.8954 9 16 9H17M14 2H18C19.1046 2 20 2.89543 20 4V9M20 9L17 12" />
                          </svg>
                        </div>
                        <span className="contact-option-text">Write to Us</span>
                      </a>
                    </div>
                  </div>

                  {/* OR Divider */}
                  <div className="divider-section"></div>

                  {/* Right Section - Form */}
                  <div className="contact-right" id="contact-form">
                    <div className="form-header"></div>

                    <form className="form-grid">
                      <div className="form-group">
                        <label className="form-label" htmlFor="yourName">
                          Your Name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="yourName"
                          name="yourName"
                          className="form-input"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="company">
                          Company <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className="form-input"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="telephone">
                          Telephone <span className="required">*</span>
                        </label>
                        <input
                          type="tel"
                          id="telephone"
                          name="telephone"
                          className="form-input"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="email">
                          Email <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-input"
                          required
                        />
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label" htmlFor="yourEnquiry">
                          Your Enquiry <span className="required">*</span>
                        </label>
                        <textarea
                          id="yourEnquiry"
                          name="yourEnquiry"
                          className="form-textarea"
                          required
                        ></textarea>
                      </div>

                      <div className="recaptcha-wrapper">
                        <div className="recaptcha-placeholder">
                          <input type="checkbox" id="recaptcha" />
                          <label htmlFor="recaptcha">I'm not a robot</label>
                          <div className="recaptcha-logo">reCAPTCHA</div>
                        </div>
                      </div>

                      <div className="submit-wrapper">
                        <button type="submit" className="recaptcha-wrapper">
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div id="container" ref={containerRef}>
            <section className="parallax-reveal-section panels">
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
                    costs, no commitments — just professional work that helps
                    your business grow.
                  </p>

                  <button className="cta-button">Claim Your Free Slot</button>
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

export default Contact;
