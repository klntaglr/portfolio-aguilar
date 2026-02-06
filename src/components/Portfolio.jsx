import React, { useState, useEffect, useRef } from 'react';
import './Portfolio.css';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import LogoLoop from './LogoLoop';
import experienceIcon from "../assets/experience.svg";
import projects from "../assets/projects.svg";
import {
    SiReact,
    SiCss3,
    SiHtml5,
    SiFramer,
    SiGreensock,
    SiCanva,
    SiFigma,
} from "react-icons/si";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaGift } from "react-icons/fa";
import { TfiLayoutMediaLeftAlt } from "react-icons/tfi";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
import logo from '../assets/logo.png';
import blueBackground from '../assets/blue.jpg';
import { FaArrowRight, FaArrowUpLong } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import blueBackground1 from '../assets/blue1.png';
import virielleLogo from "../assets/viriellelogo.png";
import mockup from '../assets/mockup.jpg';
import mockup1 from '../assets/mockup1.jpg';
import mockup2 from '../assets/mockup2.jpg';
import mockup3 from '../assets/mockup3.png';
import mockup4 from '../assets/mockup4.jpg';
import quote from '../assets/quote.png';
import TiltedCard from './TiltedCard';
import { FaFacebook, FaInstagram, FaLinkedin, FaDribbble, FaDiscord } from 'react-icons/fa';
import { SiIndeed } from 'react-icons/si';
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

function Portfolio() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openService, setOpenService] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);

    const leftRef = useRef(null);
    const sectionRef = useRef(null);
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
                hour12: true
            }).formatToParts(now);

            const get = (type) =>
                parts.find((p) => p.type === type)?.value || "";

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
                    scrub: 1.4
                }
            });

            /* ===== Dot Activation ===== */

            steps.forEach((step) => {

                const dot = step.querySelector(".marker-dot");

                gsap.fromTo(dot,
                    {
                        backgroundColor: "#ffffff",
                        borderColor: "#d0d0d0",
                        scale: 1
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
                            scrub: true
                        }
                    }
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
                        toggleActions: "play reverse play reverse"
                    }
                });

                gsap.from(step.querySelector(".step-container"), {
                    x: 80,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",

                    scrollTrigger: {
                        trigger: step,
                        start: "top 75%",
                        toggleActions: "play reverse play reverse"
                    }
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
                pinSpacing: false
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

            let tops = panels.map(panel =>
                ScrollTrigger.create({
                    trigger: panel,
                    start: "top top"
                })
            );

            panels.forEach(panel => {

                ScrollTrigger.create({
                    trigger: panel,
                    start: "top top",
                    end: "+=100%",
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1
                });

            });


            ScrollTrigger.create({
                snap: {
                    snapTo: () => {

                        let panelStarts = tops.map(st => st.start);

                        let snapScroll = gsap.utils.snap(
                            panelStarts,
                            ScrollTrigger.scroll()
                        );

                        return gsap.utils.normalize(
                            0,
                            ScrollTrigger.maxScroll(),
                            snapScroll
                        );
                    },
                    duration: 0.5
                }
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
                }

            });

            tl.fromTo(".parallax-reveal-card",
                {
                    clipPath: "inset(0% 40% 0% 40% round 36px)"
                },
                {
                    clipPath: "inset(0% 0% 0% 0% round 28px)",
                    ease: "none"
                }
            );


            tl.fromTo(".parallax-reveal-card",
                {
                    scale: 1.6,
                    y: 200
                },
                {
                    scale: 1,
                    y: 0,
                    ease: "none"
                },
                0
            );

        }, "#smooth-content");

        return () => ctx.revert();

    }, []);

   const services = [
    {
        number: '01',
        name: 'Landing Page Design',
        description: 'Strategic landing page design engineered to capture attention, build trust, and drive conversions. Every element is purposefully crafted to guide your audience toward taking action—whether that\'s booking a call, making a purchase, or requesting a demo. The result: landing pages that don\'t just look good, they perform.',
        tags: ['Conversion Optimization', 'Lead Generation', 'A/B Testing Ready', 'Strategic Messaging', 'Mobile-First Design'],
        image: mockup
    },
    {
        number: '02',
        name: 'Website Design',
        description: 'Premium website design that positions your brand as an industry authority. We create sophisticated digital experiences that communicate credibility, professionalism, and value from the first impression. Your website becomes a powerful asset that attracts ideal clients and sets you apart from competitors.',
        tags: ['Brand Positioning', 'Premium Design', 'Strategic Architecture', 'Multi-Device Excellence', 'Scalable Systems'],
        image: mockup1
    },
    {
        number: '03',
        name: 'UI/UX Design',
        description: 'User experience design rooted in psychology and business strategy. We eliminate friction, reduce bounce rates, and create intuitive pathways that guide users exactly where you want them to go. The focus is simple: design that feels effortless while driving measurable business outcomes.',
        tags: ['User Psychology', 'Conversion Flows', 'Behavioral Design', 'Usability Testing', 'Strategic Prototyping'],
        image: mockup2
    },
    {
        number: '04',
        name: 'Website Redesign',
        description: 'Turn your underperforming website into a revenue-generating platform. We revitalize outdated brands with modern design systems, improved user journeys, and strategic messaging that resonates with today\'s market. Your refreshed website will reflect where your business is going—not where it\'s been.',
        tags: ['Brand Evolution', 'Competitive Repositioning', 'Legacy Modernization', 'Growth-Focused Redesign', 'Market Alignment'],
        image: mockup3
    },
    {
        number: '05',
        name: 'Interactive Web Design',
        description: 'Immersive web experiences that captivate and engage. Through sophisticated animations, scroll-triggered interactions, and micro-moments of delight, we create websites that people remember and talk about. Stand out in crowded markets with digital experiences that feel less like websites and more like journeys.',
        tags: ['Cinematic Scrolling', 'Brand Storytelling', 'Advanced Animations', 'Memorable Interactions', 'Premium Polish'],
        image: mockup4
    }
];
    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };
    const faqs = [
        {
            question: "How long does it usually take to design and build a website?",
            answer: "The timeline for a website project typically ranges from around 2 to 6 weeks, depending on the size of the website, number of pages, level of customization, and overall project requirements. Landing pages and smaller business websites can often be completed faster, while more complex or interactive websites may require additional time for planning, refinement, and testing. I follow a structured process that includes research, design, development, and quality assurance. This approach ensures that the final website is not only visually strong but also functional, optimized, and aligned with your business objectives."
        },
        {
            question: "What information or materials do you need before starting a project?",
            answer: "To begin a project smoothly, I usually ask for basic information about your business, including your goals, target audience, services, and overall vision for the website. If available, brand assets such as your logo, brand colors, imagery, and content drafts are also very helpful. If you are still developing these materials, that is completely fine. I can help guide you through organizing your ideas, clarifying your messaging, and identifying the most effective structure for your website. My goal is to make the process collaborative and comfortable, even if you are starting from scratch."
        },
        {
            question: "Do you offer fixed pricing packages or customized project pricing?",
            answer: "I primarily offer customized pricing based on the scope, goals, and specific requirements of your project. Every business has unique needs, so I focus on creating solutions that are tailored to your brand, audience, and long-term objectives rather than offering one-size-fits-all packages. After discussing your project goals and requirements, I provide a clear and transparent proposal outlining the scope of work, timeline, and deliverables so you know exactly what to expect before the project begins."
        },
        {
            question: "How can a professionally designed website support business growth?",
            answer: "A professionally designed website strengthens credibility, improves user experience, and helps guide visitors toward taking meaningful actions such as sending inquiries, booking services, or requesting consultations. A well-planned website is more than just visual presentation — it functions as a digital platform that communicates your brand value and supports your business goals. By combining strategic layout, clear messaging, user-centered design, and performance optimization, a professionally built website can help increase engagement, build trust with potential clients, and improve overall conversion opportunities."
        },
        {
            question: "Will my website be responsive and optimized for performance?",
            answer: "Yes. Every website I design and develop is built to function smoothly across desktops, tablets, and mobile devices. Responsive design ensures your website remains visually consistent and easy to navigate regardless of screen size. In addition, I focus on performance optimization such as loading speed, clean implementation, accessibility considerations, and smooth interaction design. These factors contribute to better user experience, improved search visibility, and stronger engagement from visitors."
        },
        {
            question: "Can you improve or redesign my existing website instead of building a new one?",
            answer: "Yes, I offer redesign and website improvement services for businesses that already have an existing website but want to enhance its visual design, usability, structure, or performance. Many businesses benefit from redesigning rather than rebuilding from the ground up. The process usually begins with evaluating your current website to identify design limitations, usability concerns, or performance gaps. From there, I create a refreshed design approach that improves user experience while maintaining your brand identity and business goals."
        },
        {
            question: "Do you provide support after the website is launched?",
            answer: "Yes. After launch, I remain available to provide support, updates, and improvements whenever needed. I make sure your website is functioning properly, remains visually consistent, and continues to perform effectively over time. If you would like to manage content updates on your own, I can also provide guidance or basic training so you feel confident maintaining your website independently."
        },
        {
            question: "What is the Free Landing Page opportunity and how does it work?",
            answer: "I currently offer 5 free landing page design slots to support growing businesses and build strong client partnerships. Each selected business will receive a modern, mobile-responsive, and conversion-focused landing page. In exchange, I simply ask for honest feedback, permission to showcase the project in my portfolio, and a short testimonial if you're happy with the result. Slots are limited to maintain quality. If you're interested, feel free to reach out or book a free consultation to discuss your project."
        }
    ];
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('menu-open');
        };
    }, [isMobileMenuOpen]);
useEffect(() => {

    let ctx = gsap.context(() => {

        const elements = gsap.utils.toArray(".split-animate");

        elements.forEach((el) => {

            const split = new SplitText(el, {
                type: "lines,words",
                linesClass: "ts-line"
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
                    once: true // 🔥 Important
                }
            });

        });

    });

    return () => ctx.revert();

}, []);












    return (
        <>
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <div className="portfolio-container" style={{ backgroundImage: `url(${blueBackground1})` }}>
                        <nav className={`navbar ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
                            <div className="logo">
                                <a href="#hero">
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

                                {/* CTA stays untouched */}
                                <button className="nav-cta-btn">
                                    <TfiLayoutMediaLeftAlt className="nav-cta-icon" />Free Landing Page
                                </button>

                            </ul>



                            <button
                                className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                            >
                                Menu
                                {isMobileMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
                            </button>


                        </nav>


                        {/* Backdrop Overlay */}
                        <div
                            className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
                            onClick={closeMobileMenu}
                        />

                        {/* Mobile Menu */}
                        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
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
                                <p className="mobile-menu-subtitle">Explore my work & services</p>
                            </div>

                            {/* Navigation Links with Numbers & Descriptions */}
                            <nav className="mobile-nav-container">
                                <ul className="mobile-nav-links">
                                    <li className="mobile-nav-item">
                                        <a href="#about" onClick={closeMobileMenu} className="mobile-nav-link">
                                            <span className="nav-number">01</span>
                                            <div className="nav-content">
                                                <span className="nav-label">About</span>
                                                <span className="nav-description">Learn about my approach</span>
                                            </div>
                                            <FaArrowRight className="nav-arrow" />
                                        </a>
                                    </li>

                                    <li className="mobile-nav-item">
                                        <a href="#services" onClick={closeMobileMenu} className="mobile-nav-link">
                                            <span className="nav-number">02</span>
                                            <div className="nav-content">
                                                <span className="nav-label">Services</span>
                                                <span className="nav-description">What I can do for you</span>
                                            </div>
                                            <FaArrowRight className="nav-arrow" />
                                        </a>
                                    </li>

                                    <li className="mobile-nav-item">
                                        <a href="#projects" onClick={closeMobileMenu} className="mobile-nav-link">
                                            <span className="nav-number">03</span>
                                            <div className="nav-content">
                                                <span className="nav-label">Projects</span>
                                                <span className="nav-description">View my latest work</span>
                                            </div>
                                            <FaArrowRight className="nav-arrow" />
                                        </a>
                                    </li>

                                    <li className="mobile-nav-item">
                                        <a href="#process" onClick={closeMobileMenu} className="mobile-nav-link">
                                            <span className="nav-number">04</span>
                                            <div className="nav-content">
                                                <span className="nav-label">Process</span>
                                                <span className="nav-description">How I bring ideas to life</span>
                                            </div>
                                            <FaArrowRight className="nav-arrow" />
                                        </a>
                                    </li>
                                    <li className="mobile-nav-item">
                                        <a href="#contact" onClick={closeMobileMenu} className="mobile-nav-link">
                                            <span className="nav-number">05</span>
                                            <div className="nav-content">
                                                <span className="nav-label">Contact</span>
                                                <span className="nav-description">Get in touch with me</span>
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

                                <p className="cta-availability">5 slots available | No commitment required</p>
                            </div>

                            {/* Contact Info Footer */}
                            <div className="mobile-menu-footer">
                                <p className="footer-label">Get in Touch</p>
                                <a href="mailto:klentaguilar@gmail.com" className="footer-email">
                                    klentaguilar@gmail.com
                                </a>
                            </div>
                        </div>


                        <main className="hero-section panel" id="hero">
                            <div className="hero-wrapper">
                                <div className="hero-content">
                                    <p className="tagline split-animate">UI/UX & Web Designer</p>
                                 <h1 className="hero-title split-animate">
  Great brands aren't built overnight but they're felt instantly. I create <span className="highlight">digital experiences</span> that define yours.
</h1>

                                    <button className="cta-button ">
                                        Let's Collaborate
                                    </button>
                                </div>

                                <TiltedCard
                                    imageSrc={mockup4}
                                    altText="Mockup 3"
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
                                    overlayContent={
                                        <p className="tilted-card-demo-text">
                                            Mockup Preview
                                        </p>
                                    }
                                />
                            </div>

                        </main>
                    </div>

                    {/* About Section */}
                    <section className="about-section">
                        <div className="about-container">
                         <h2 className="about-title split-animate" id="about">
    Where brand strategy meets exceptional design — <span className="about-title-accent">creating websites that elevate businesses and drive meaningful growth.</span>
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

                                     <h3 className="card-label">STRATEGY FIRST</h3>
                                         <p className="card-description">
                Design that thinks. Websites that convert. Brands that last.
            </p>

                                    </div>

                                    <div className="about-card card-dark">
                                        <h3 className="card-title">
                                              <span className="title-design">CRAFT</span>
                <span className="title-designs">&</span>
                <span className="title-create">GROW</span>
                                        </h3>

                                        <p className="card-date">Since 2025</p>

                                    </div>
                                </div>

                                <div className="about-stats">
                                    <div className="stats-item">
                                        <h3 className="stats-number">10+</h3>
                                        <img
                                            src={projects}
                                            alt="projects watermark"
                                            className="stats-watermark"
                                        />
                                        <p className="stats-description">
                                            Projects in web design, landing pages,<br /> and business websites.
                                        </p>

                                    </div>
                                </div>
                            </div>

                            <div className="about-topbar">
                                <span className="about-index">(ABOUT — 01)</span>

                                <p className="about-mini-desc">
        Building websites that strengthen credibility and create lasting impressions.
    </p>
                                <button className="cta-button">
                                    Book a Call Now


                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Services Section */}
                    <section className="services-section" >
                        <div className="services-container">
                            <div className="services-header">
                                <h2 className="services-title" id="services">Services</h2>
                            </div>

                            <div className="services-content">
                                <span className="services-index">(SERVICE — 02)</span>

                             <h3 className="services-subtitle split-animate">
    Transforming brands through <span className="services-subtitle-accent">purposeful design and strategic digital experiences.</span>
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
                                                <h3 className="service-name split-animate">{service.name}</h3>
                                                <button className="service-toggle">
                                                    {openService === index ? '−' : '+'}
                                                </button>
                                            </div>
                                            <div className={`service-details  ${openService === index ? 'open' : ''}`}>
                                                <p className="service-description">
                                                    {service.description}
                                                </p>
                                                <div className="service-tags">
                                                    {service.tags.map((tag, tagIndex) => (
                                                        <span key={tagIndex} className="tag">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="services-image-container">
                                    <div className="services-image">
                                        <div className={`service-image-placeholder ${openService === null ? 'active' : ''}`}>
                                            <div className="placeholder-content">
                                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                                                className={`service-image ${openService === index ? 'active' : ''}`}
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
                    <section className="works-section" >
                        <div className="works-container">
                            <div className="works-header">
                                <h2 className="works-title" id="projects">Works</h2>
                                <span className="works-index">(PROJECT — 03)</span>
                            </div>

                            <div className="works-divider"></div>

                            <div className="projects-grid">
                                <div className="project-card">
                                    <div className="project-image">
                                        <img src={mockup} alt="Martin Architectural" />
                                        <div className="project-overlay">
                                            <div className="project-icon">
                                                <FiArrowUpRight />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-info">
                                        <div className="project-info-left">
                                            <h3 className="project-title">Martin Architectural</h3>
                                            <p className="project-year">(2025 — 2026)</p>
                                        </div>
                                        <div className="project-tags">
                                            <span className="project-tag">Website Design</span>
                                            <span className="project-tag">Architecture</span>
                                            <span className="project-tag">Animation</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-card">
                                    <div className="project-image">
                                        <img src={mockup1} alt="Century 21 Pura Vida" />
                                        <div className="project-overlay">
                                            <div className="project-icon">
                                                <FiArrowUpRight />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-info">
                                        <div className="project-info-left">
                                            <h3 className="project-title">Century 21® Pura Vida</h3>
                                            <p className="project-year">(2025 — 2026)</p>
                                        </div>
                                        <div className="project-tags">
                                            <span className="project-tag">Website Design</span>
                                            <span className="project-tag">UI/UX</span>
                                            <span className="project-tag">Real Estate</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="works-statement">
                        <p className="statement-text split-animate">
    Selected projects showcasing design that performs
    <span className="statement-highlight"> beautiful, strategic, and built for growth.</span>
</p>
                                <button className="cta-button">
                                    Start your Project

                                </button>

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
    <span className="process-title-accent"> where strategy, creativity, and execution align.</span>
</h2>

<p className="process-subtitle split-animate">
    A proven methodology that transforms business goals into high-performing digital experiences through strategic planning, thoughtful design, and precise execution.
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
                                                    The process begins by understanding your business, goals, target audience, and project requirements. This stage focuses on identifying key challenges, opportunities, and defining the direction needed to create an effective and meaningful website experience.
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
                                                    Based on research insights, the website structure, user flow, and content layout are carefully planned. Wireframes and strategic planning help ensure the website delivers a clear message while aligning with your business goals and user expectations.
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
                                                    Visual design and user interface elements are created to reflect your brand identity while ensuring a seamless and engaging user experience. Interactive prototypes help visualize the website's functionality and allow refinement before development begins.
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
                                                <h3 className="step-title">Development & Implementation</h3>
                                                <p className="step-description">
                                                    The approved design is transformed into a fully responsive and functional website. This stage focuses on clean implementation, performance optimization, smooth interactions, and ensuring consistency across devices and screen sizes.
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
                                                    The website undergoes final testing to ensure usability, responsiveness, and performance. After launch, improvements and adjustments are made when needed to maintain a smooth and effective user experience.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </div>
                    </section>

                    {/* Parallax Reveal Section */}
                    {/* CTA Parallax Section - Replace your parallax section with this */}
                    <section className="parallax-reveal-section ">
                        <div className="parallax-reveal-sticky">
                            <div className="parallax-reveal-card">
                            <h2 className="cta-title split-animate">
    Your website should be your <span className="highlight">best salesperson</span>
</h2>

<p className="cta-description split-animate">
    I know the frustration of running a successful business while your website fails to communicate your value. You're losing opportunities to competitors with better digital presence. Let's fix that. Together, we'll build a website that attracts, engages, and converts.
</p>

<button className="cta-button">
    Book a Free Consultation
</button>

                            </div>
                        </div>
                    </section>

                    {/* Man Behind The Work Section */}
                    <section className="man-behind-section">
                        <div className="man-behind-container">
                            <div className="man-behind-header ">
                                <h2 className="man-behind-title ">
                                    Man Behind <br />
                                    The Work
                                </h2>

                            </div>

                            <div className="about-content">
                                <div className="about-cards">
                                    <div
                                        className="about-card card-blue card-blue-images"
                                        style={{ backgroundImage: `url(${mockup3})` }}
                                    >



                                    </div>

                                    <div
                                        className="about-card card-blue card-blue-image"
                                        style={{ backgroundImage: `url(${blueBackground})` }}
                                    >
                                        <div className="card-icons">
                                            <img src={quote} alt="Virielle Logo" />
                                        </div>


                                     <p className="card-description split-animate">
    "I don't just design websites. I build digital experiences that turn businesses into brands and visitors into believers."
</p>
                                    </div>
                                </div>
                                <div className="about-stats ">
                                    <div className="stats-item">

                                        <h3 className="stats-number ">

                                            <img
                                                src={experienceIcon}
                                                alt="experience watermark"
                                                className="stats-watermark"
                                            />

                                            1<span className="stats-years">Year</span>

                                        </h3>


                                        <p className="stats-description split-animate">
                                            Experience building websites and landing pages focused on design, usability, and performance.
                                        </p>

                                    </div>
                                </div>


                            </div>

                            <div className="about-topbar">


                                <p className="about-mini-desc">
                                  ( ABOUT THE DESIGNER — 05 )
                                </p>

                   <button className="cta-button">
    Get to Know Me
</button>
                            </div>
                        </div>
                    </section>
                    <section className="faq-section">
                        <div className="faq-container">
                            <h2 className="faq-title split-animate">Questions You Might Ask</h2>

                            <div className="faq-list">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className={`faq-item ${openFAQ === index ? 'active' : ''}`}
                                    >
                                        <button
                                            className="faq-question"
                                            onClick={() => toggleFAQ(index)}
                                            aria-expanded={openFAQ === index}
                                        >
                                            <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                                            <span className="faq-question-text">{faq.question}</span>
                                            <span className="faq-toggle-icon">
                                                {openFAQ === index ? '×' : '+'}
                                            </span>
                                        </button>

                                        <div className={`faq-answer ${openFAQ === index ? 'open' : ''}`}>
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
                    <footer className="footer-section">
                        <div className="footer-container">
                            <div className="footer-top">
                                <div className="footer-cta">
                                    <p className="footer-label split-animate">HAVE ANY PROJECT IN MIND?</p>
                                    <h2 className="footer-email ">
                                        <a href="mailto:klentaguilar@gmail.com">klentaguilar@gmail.com</a>
                                    </h2>
                                    <button className="footer-cta-button">
                                        Let's Collaborate
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
    Specializing in premium web design that transforms businesses into recognized brands through strategic planning, refined execution, and conversion-focused design.
</p>

                                        <p className="footer-copyright">
                                            © 2026 Designed and developed by Klent Russell Aguilar | Web Designer
                                        </p>
                                    </div>


                                    <div className="footer-location-info">
                                        <div className="footer-info-item">
                                            <p className="footer-info-label">Local Address:</p>
                                            <p className="footer-info-value">Malolos City, Bulacan, Philippines
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
                                            <li><a href="#hero">Home</a></li>
                                            <li><a href="#about">About</a></li>
                                            <li><a href="#services">Services</a></li>
                                            <li><a href="#projects">Projects</a></li>
                                            <li><a href="#process">Process</a></li>
                                            <li><a href="#process">Contact</a></li>
                                            <li><a href="#about">Profile</a></li>


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

                                        </ul>        </div>
                                </div>
                            </div>

                            <div className="footer-bottom">
                                <div className="footer-logo-large">
                                    <span className="logo-virielle-large">PORTFOLIO</span>

                                </div>
                                <button className="scroll-to-top" onClick={() => {
                                    gsap.to(window, {
                                        duration: 1.4,
                                        scrollTo: { y: 0 },
                                        ease: "power3.out"
                                    });
                                }}>
                                    <FaArrowUpLong />
                                </button>
                            </div>
                        </div>
                    </footer>

                </div>
            </div>
        </>
    );
}

export default Portfolio;