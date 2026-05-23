import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./Portfolio.css";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { FaArrowRight } from "react-icons/fa6";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
    SiCanva,
    SiCss3,
    SiFigma,
    SiFramer,
    SiGreensock,
    SiHtml5,
    SiReact
} from "react-icons/si";
import { TfiLayoutMediaLeftAlt } from "react-icons/tfi";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineChatAlt2,
  HiOutlineClipboardCheck,
  HiOutlineClipboardCopy,
} from "react-icons/hi";
import { BsBriefcase, BsPalette, BsArrowRepeat } from "react-icons/bs";
import { IoCheckmarkCircle } from "react-icons/io5";
import mockup from "../assets/mockup.jpg";
import mockup1 from "../assets/mockup1.jpg";
import mockup3 from "../assets/mockup3.png";
import mockup4 from "../assets/mockup4.jpg";
import mockup2 from "../assets/wireframe.jpeg";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
gsap.registerPlugin(SplitText);

function Contact() {
const [showPreloader, setShowPreloader] = useState(true);
const [pageReady, setPageReady] = useState(false);
const [pageVisible, setPageVisible] = useState(false);
const pageRef = useRef(null);
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
const [engagementType, setEngagementType] = useState("hire");
const [copiedItem, setCopiedItem] = useState(null);

const handleCopy = async (text, item) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  }
};

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
  ];const [isTouchDevice, setIsTouchDevice] = useState(false);

useEffect(() => {
  const check = () => setIsTouchDevice(window.innerWidth <= 1024); // 🔥 includes tablet + iPad
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);
// Page load entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

tl.fromTo(
      ".contact-back-btn",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    )
    .fromTo(
      ".contact-hero-eyebrow",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
    .fromTo(
      ".contact-hero-title",
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "expo.out" },
      "-=0.4"
    )
    .fromTo(
      ".contact-hero-sub",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(
      ".services-divider",
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      ".contact-picker-label",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(
      ".contact-pick-card",
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.65, ease: "power3.out",
        stagger: 0.1
      },
      "-=0.3"
    );

    // Scroll-triggered animations for form section
    gsap.fromTo(
      ".contact-left",
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-left", start: "top 80%", once: true }
      }
    );

    gsap.fromTo(
      ".contact-right",
      { opacity: 0, x: 50 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-right", start: "top 80%", once: true }
      }
    );

    gsap.fromTo(
      ".form-group",
      { opacity: 0, y: 25 },
      {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.07,
        scrollTrigger: { trigger: ".form-grid", start: "top 80%", once: true }
      }
    );

    return () => tl.kill();
  }, []);

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
          <div className="portfolio-container">
            <nav
              className={`navbar ${showNavbar ? "navbar-visible" : "navbar-hidden"}`}
            >
   <a href="/" className="contact-back-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
                </svg>
                <span>Back to Portfolio</span>
              </a>

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

                <a href="/free-landing-page" className="cta-button-mobile" onClick={closeMobileMenu}>
                  <span className="cta-text">Free Landing Page</span>
                  <FaArrowRight className="cta-button-arrow" />
                </a>

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
             
 {/* Contact Section */}
<section className="about-section contact-page-section">
  <div className="services-container">

    {/* HEADER */}
    <span className="services-index contact-hero-eyebrow">GET IN TOUCH — 01</span>
    <div className="contact-head-row">
      <h1 className="works-title contact-hero-title">
        Let's <br />
        Collaborate
      </h1>
      <p className="contact-head-sub contact-hero-sub">
        Whether you're hiring, launching a project, or need ongoing design support — I'm available and ready to build something great together.
      </p>
    </div>
    <div className="services-divider" />

    {/* ENGAGEMENT TYPE PICKER */}
    <span className="contact-picker-label">How can I help you?</span>
    <div className="contact-picker-grid">

  <div
        className={`contact-pick-card ${engagementType === "hire" ? "contact-pick-card--active" : ""}`}
        onClick={() => setEngagementType("hire")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setEngagementType("hire")}
      >
        <div className="contact-pick-icon-wrap">
          <div className="contact-pick-icon"><BsBriefcase /></div>
          {engagementType === "hire" && <span className="contact-pick-check">✓</span>}
        </div>
        <p className="contact-pick-title">Hire me full-time</p>
        <p className="contact-pick-desc">Looking for a UI/UX or web designer to join your team. I do design + React frontend.</p>
        <span className="contact-pick-tag contact-pick-tag--hire">Corporate / HR</span>
      </div>

      <div
        className={`contact-pick-card ${engagementType === "project" ? "contact-pick-card--active" : ""}`}
        onClick={() => setEngagementType("project")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setEngagementType("project")}
      >
        <div className="contact-pick-icon-wrap">
          <div className="contact-pick-icon"><BsPalette /></div>
          {engagementType === "project" && <span className="contact-pick-check">✓</span>}
        </div>
        <p className="contact-pick-title">Commission a project</p>
        <p className="contact-pick-desc">Landing page, website, dashboard, or UI/UX — wireframe to deployed product.</p>
        <span className="contact-pick-tag contact-pick-tag--project">Freelance · Open to discuss</span>
      </div>

      <div
        className={`contact-pick-card ${engagementType === "retainer" ? "contact-pick-card--active" : ""}`}
        onClick={() => setEngagementType("retainer")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setEngagementType("retainer")}
      >
        <div className="contact-pick-icon-wrap">
          <div className="contact-pick-icon"><BsArrowRepeat /></div>
          {engagementType === "retainer" && <span className="contact-pick-check">✓</span>}
        </div>
        <p className="contact-pick-title">Ongoing retainer</p>
        <p className="contact-pick-desc">Weekly design tasks, UX audits, new sections, and React updates on a regular basis.</p>
        <span className="contact-pick-tag contact-pick-tag--retainer">Retainer · Flexible terms</span>
      </div>
    </div>

  </div>
  <div className="contact-form-wrapper">
    <div className="contact-container">

      {/* Left Section */}
      <div className="contact-left">
        <span className="contact-left-eyebrow">Reach out directly</span>

        <div className="contact-options">

          {/* EMAIL — clickable to mailto, copy button separate */}
          <div className="contact-option contact-option--copyable">
            <div className="contact-option-icon">
              <HiOutlineMail />
            </div>
            <div className="contact-option-content">
              <span className="contact-option-label">Email</span>
              <a href="mailto:klentaguilar@gmail.com" className="contact-option-value">
                klentaguilar@gmail.com
              </a>
            </div>
            <div className="contact-copy-wrapper">
              <button
                className="contact-copy-btn"
                onClick={() => handleCopy("klentaguilar@gmail.com", "email")}
                aria-label="Copy email address"
              >
                {copiedItem === "email"
                  ? <IoCheckmarkCircle className="copy-icon copy-icon--success" />
                  : <HiOutlineClipboardCopy className="copy-icon" />
                }
              </button>
              <span className={`copy-tooltip ${copiedItem === "email" ? "copy-tooltip--visible" : ""}`}>
                Copied!
              </span>
            </div>
          </div>

          {/* PHONE — clickable to tel, copy button separate */}
          <div className="contact-option contact-option--copyable">
            <div className="contact-option-icon">
              <HiOutlinePhone />
            </div>
            <div className="contact-option-content">
              <span className="contact-option-label">Phone</span>
              <a href="tel:+639672179650" className="contact-option-value">
                (+63) 967-217-965
              </a>
            </div>
            <div className="contact-copy-wrapper">
              <button
                className="contact-copy-btn"
                onClick={() => handleCopy("+639672179650", "phone")}
                aria-label="Copy phone number"
              >
                {copiedItem === "phone"
                  ? <IoCheckmarkCircle className="copy-icon copy-icon--success" />
                  : <HiOutlineClipboardCopy className="copy-icon" />
                }
              </button>
              <span className={`copy-tooltip ${copiedItem === "phone" ? "copy-tooltip--visible" : ""}`}>
                Copied!
              </span>
            </div>
          </div>

          {/* FORM LINK */}
          <a href="#contact-form" className="contact-option contact-option--last">
            <div className="contact-option-icon">
              <HiOutlineChatAlt2 />
            </div>
            <div className="contact-option-content">
              <span className="contact-option-label">Send a message</span>
              <span className="contact-option-value contact-option-value--muted">Fill the form →</span>
            </div>
          </a>

        </div>

        {/* Availability badge */}
        <div className="contact-avail-box">
          <div className="contact-avail-row">
            <span className="contact-avail-dot" />
            <span className="contact-avail-status">Currently available</span>
          </div>
          <p className="contact-avail-detail">
            Replies within 24hrs · Manila, PH (GMT+8)
          </p>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="contact-vline"></div>

      {/* Right Section - Form */}
      <div className="contact-right" id="contact-form">
        <span className="contact-form-eyebrow">Send a message</span>

        <form className="form-grid">

          <div className="form-group">
            <label className="form-label" htmlFor="yourName">
              Your Name <span className="required">*</span>
            </label>
            <input type="text" id="yourName" name="yourName" className="form-input" placeholder="Juan dela Cruz" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="company">
              Company <span className="required">*</span>
            </label>
            <input type="text" id="company" name="company" className="form-input" placeholder="Acme Corp" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="telephone">
              Telephone <span className="required">*</span>
            </label>
            <input type="tel" id="telephone" name="telephone" className="form-input" placeholder="+63 912 345 6789" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input type="email" id="email" name="email" className="form-input" placeholder="hello@company.com" required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="budget">
              {engagementType === "hire" ? "Role / Level" : engagementType === "retainer" ? "Support Level" : "Project Type"}
            </label>
          <select id="budget" name="budget" className="form-input form-select">
              <option value="">Select a range</option>
              {engagementType === "hire" ? (
                <>
                  <option value="internship">Internship / OJT</option>
                  <option value="entry">Entry level — open to discuss</option>
                  <option value="junior">Junior / Associate level</option>
                  <option value="discuss">Let's talk about it</option>
                </>
              ) : engagementType === "retainer" ? (
                <>
                  <option value="light">Light support — occasional updates</option>
                  <option value="regular">Regular — weekly design tasks</option>
                  <option value="heavy">Full support — ongoing product work</option>
                  <option value="discuss">Open to discuss</option>
                </>
              ) : (
                <>
                  <option value="landing">Landing page / Single page</option>
                  <option value="website">Multi-page website</option>
                  <option value="uiux">UI/UX design only (Figma)</option>
                  <option value="webapp">Web app / Dashboard</option>
                  <option value="discuss">Not sure yet — let's talk</option>
                </>
              )}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="timeline">
              {engagementType === "hire" ? "Desired Start Date" : "Timeline"}
            </label>
         <select id="timeline" name="timeline" className="form-input form-select">
              <option value="">
                {engagementType === "hire" ? "When would I start?" : "When do you need this?"}
              </option>
              {engagementType === "hire" ? (
                <>
                  <option value="immediate">Available now</option>
                  <option value="2weeks">Within 2 weeks</option>
                  <option value="1month">Next month</option>
                  <option value="flexible">Flexible — let's align</option>
                </>
              ) : (
                <>
                  <option value="asap">As soon as possible</option>
                  <option value="2weeks">1 – 2 weeks</option>
                  <option value="1month">Within a month</option>
                  <option value="3months">1 – 3 months</option>
                  <option value="flexible">No hard deadline</option>
                </>
              )}
            </select>
          </div>

          <div className="form-group full-width">
            <label className="form-label" htmlFor="yourEnquiry">
              Your Enquiry <span className="required">*</span>
            </label>
            <textarea
              id="yourEnquiry"
              name="yourEnquiry"
              className="form-textarea"
           placeholder={
                engagementType === "hire"
                  ? "Tell me about the role, the team, and what you're looking for. I do UI/UX design, web design, and React frontend development."
                  : engagementType === "retainer"
                  ? "What kind of ongoing support do you need? (e.g. design iterations, new pages, UX audits, React updates)"
                  : "Tell me about your project — is it a landing page, website, UI/UX design, dashboard, or something else? Goals, audience, timeline."
              }
              required
            />
          </div>

          <div className="recaptcha-wrapper">
            <div className="recaptcha-placeholder">
              <input type="checkbox" id="recaptcha" />
              <label htmlFor="recaptcha">I'm not a robot</label>
              <div className="recaptcha-logo">reCAPTCHA</div>
            </div>
          </div>

          <div className="submit-wrapper">
         <p className="form-micro-copy">
                Based in Malolos, Bulacan — available remotely. Replies within 24hrs.
              </p>
            <button type="submit" className="cta-buttons">
              Send Message
            </button>
          </div>

        </form>
      </div>

    </div>
  </div>
</section>
          </div>

    

      
   
        </div>
      </div>
    </>
  );
}

export default Contact;
