import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Portfolio.css';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import LogoLoop from './LogoLoop';
import experienceIcon from "../assets/experience.svg";
import projects from "../assets/projects.svg";
import { FaArrowLeft } from "react-icons/fa";
import Preloader from './Preloader'; // ADD THIS
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
import mockup2 from '../assets/wireframe.jpeg';
import mockup3 from '../assets/mockup3.png';
import mockup4 from '../assets/mockup4.jpg';
import quote from '../assets/quote.png';
import TiltedCard from './TiltedCard';
import { FaFacebook, FaInstagram, FaLinkedin, FaDribbble, FaDiscord } from 'react-icons/fa';
import { SiIndeed } from 'react-icons/si';
import SplitText from "gsap/SplitText";
import { IoIosArrowUp } from "react-icons/io";
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
        { image: mockup2, title: "Interactive Portfolio" }
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
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
            }
        });

        // Pause on hover track
        track.addEventListener("mouseenter", () => animation.pause());
        track.addEventListener("mouseleave", () => animation.resume());

        return () => animation.kill();

    }, []);
    useEffect(() => {

        const cards = document.querySelectorAll(".project-card");

        cards.forEach(card => {

            card.addEventListener("mouseenter", () => {

                gsap.to(card, {
                    scale: 1.08,
                    y: -10,
                    duration: 0.4,
                    ease: "power3.out"
                });

                gsap.to(cards, {
                    opacity: 0.5,
                    duration: 0.3
                });

                gsap.to(card, {
                    opacity: 1
                });

            });

            card.addEventListener("mouseleave", () => {

                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    duration: 0.4
                });

                gsap.to(cards, {
                    opacity: 1,
                    duration: 0.3
                });

            });

        });

    }, []);



    useEffect(() => {
        let ctx = gsap.context(() => {

            // Z-Index stacking
            gsap.set(".panels", {
                zIndex: (i, target, targets) => targets.length - i
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
                    pin: true
                }
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
    offset: ["start start", "end start"]
});

const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
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
            {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <div className="portfolio-container"id="heros" style={{ backgroundImage: `url(${blueBackground1})` }}>
                        <nav className={`navbar ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
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
                                    <a href="#about" className="nav-link-animated">
                                        <span className="nav-text">
                                            <span className="nav-text-top">About Me</span>
                                            <span className="nav-text-bottom">About Me</span>
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
                                        <a href="/" onClick={closeMobileMenu} className="mobile-nav-link">
                                            <span className="nav-number">01</span>
                                            <div className="nav-content">
                                                <span className="nav-label">Portfolio</span>
                                                <span className="nav-description">Look at my Portfolio</span>
                                            </div>
                                            <FaArrowRight className="nav-arrow" />
                                        </a>
                                    </li>

                                    <li className="mobile-nav-item">
                                        <a href="#about" onClick={closeMobileMenu} className="mobile-nav-link">
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
                                        UI/UX & Web Designer: Crafting <span className="highlight"> results-driven,</span> Interactive Websites.
                                    </h1>

                                    <button className="cta-button ">
                                        Let's Collaborate
                                    </button>
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
   </div>
                  </motion.main>
                    </div>

                    <section className="about-section">
                        <div className="intro-container">
                            <div className="intro-header">
                                <h2 className="story-paragraph" id="about">
                                    Hi! I'm <span className="intro-name">Klent Russell Aguilar,</span> a BSIT student at La Consolacion University specializing in UI/UX and front-end development with one year of experience creating websites that actually perform.
                                </h2>
                            </div>

                            <div className="intro-story">
                                <p className="story-paragraph ">
                                    What started as curiosity became passion. Over the past year, I've learned what separates websites that just exist from websites that convert through UI/UX design, front-end development, and quality assurance. Great websites aren't accidental. They're intentional, tested, and refined until every interaction feels effortless.
                                </p>

                                <p className="story-paragraph " >
                                    My approach is simple: <span className="story-highlight">clean design meets strategic thinking to create experiences that guide users naturally toward action.</span> I build minimal, purposeful interfaces that look professional and perform professionally helping businesses communicate value and turn visitors into customers. I'm constantly learning and growing because web design isn't just what I do it's a craft I'm committed to mastering.
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* Services Section */}
                    <section className="services-section" >
                        <div className="services-container">
                            <div className="services-header">
                                <h2 className="man-behind-title ">
                                    The Evolution  <br />
                                    of  Web Design
                                </h2>

                            </div>
                            <div className="services-content">

                                <h3 className="services-subtitles split-animate ">
                               <span className="services-subtitle-accent"> What Sets Me Apart as a</span> Web Designer
                                </h3>


                            </div>


                            <div className="services-description">
                                <p className="services-paragraph">
                                    Clients expect a lot more now than they did years ago. What I've learned works is combining solid conversion strategies with animations that actually make sense—not just flashy stuff that gets in the way. I'm probably too focused on small details, but that's usually what makes something feel really polished instead of just okay.
                                </p>

                                <p className="services-paragraph ">
                                    Working with clients from different countries taught me how to communicate clearly across cultures while keeping projects organized and on track.
                                </p>

                                <div className="services-what-i-do">
                                    <p className="services-label">What I do:</p>
                                    <ul className="services-list ">
                                        <li>Web design and development</li>
                                        <li>Motion design and visual work</li>
                                        <li>User experience and branding</li>
                                        <li>Making sites that convert visitors</li>
                                        <li>SEO and digital marketing</li>
                                    </ul>
                                </div>

                                <p className="services-paragraph">
                                    This mix lets me handle both the creative side and the business side. Your website won't just look good—<span className="services-highlight">it'll actually work for your goals.</span>
                                </p>
                            </div>

                            <div className="services-content">
                                <h3 className="services-subtitles split-animate">
                                    Core Capabilities
                                </h3>
                            </div>
                            <div className="core-capabilities">
                                <ul className="capabilities-list">
                                    <li>Converting visitors into customers through strategic interactive web design</li>
                                    <li>Creating memorable brand experiences with thoughtful motion web design</li>
                                    <li>Developing high-performance, SEO-optimized websites</li>
                                    <li>Crafting minimalist interfaces that elegantly showcase your brand</li>
                                    <li>Integrating advanced technologies for app-like experiences using SvelteKit</li>
                                </ul>
                            </div>
                            <div className="services-content">
                                <h3 className="services-subtitles split-animate">
                                   <span className="services-subtitle-accent">My Design</span>   Philosophy
                                </h3></div>
                            <div className="services-description">
                                <p className="services-paragraph ">
                                    My philosophy is simple: if someone has to think about how to use your website, I haven't done my job right. Every design decision should make sense to your actual users, not just look pretty in a portfolio. I test everything because what I think works and what actually works are sometimes completely different things.
                                </p>

                            </div>
                            <div className="services-content">
                                <h3 className="services-subtitles split-animate">
                                  <span className="services-subtitle-accent">Strategic</span> Web <br />  Design Process
                                </h3>

                            </div>

                            <div className="services-description">

                                <div className="services-what-i-dos">
                                    <img src={mockup2} alt="What I do" className="services-images" />
                                </div>

                                <p className="services-paragraph">
                                    The web design landscape in the Philippines has evolved significantly, with clients now seeking partners who understand both local and global market dynamics. Whether you're evaluating web design companies or agencies, understanding the process is crucial. Drawing from my experience working with diverse clients worldwide, I've developed a comprehensive process that ensures result-driven success.
                                </p>

                                <p className="services-paragraph">
                                    Every project begins with a deep dive into your business objectives and target audience.
                                </p>

                                <div className="approach-section">
                                    <h4 className="approach-title">My approach combines:</h4>

                                    <ol className="approach-list">
                                        <li>Result-driven User-centered design principles</li>
                                        <li>Strategic web motion</li>
                                        <li>Conversion optimization copywriting</li>
                                        <li>Performance-driven development</li>
                                        <li>Brand-aligned messaging</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="services-content">
                                <h3 className="services-subtitles split-animate">
                               <span className="services-subtitle-accent">My Approach to</span>       Collaboration
                                </h3>
                            </div>
                            <div className="services-description">
                                <p className="services-paragraph">
                                    I keep clients in the loop throughout the whole process. No surprises, no designer ego – just honest communication about what's working and what isn't. Your feedback matters because you know your business better than I do.
                                </p>
                            </div>
                        </div>


                          <div className="services-content">
                                <h3 className="services-subtitles split-animate">
                                  Tools & Technologies
                                </h3>
                            </div>
                            <div className="core-capabilities">
                                <ul className="capabilities-list">
                                    <li><span className="bold">Design: </span>Figma, Adobe Creative Suite</li>
                                    <li><span className="bold">Development:</span> SvelteKit, GSAP</li>
                                    <li><span className="bold">Motion:</span> Strategic animations, Jitter</li>
                                    <li><span className="bold">Performance:</span> SEO optimization, speed tuning, Google Search Console and Analytics, Semrush, Customer Behavior Analytics</li>
                              
                                </ul>
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
                    <div id="container" ref={containerRef}>
                        <section className="parallax-reveal-section panels">
                            <div className="parallax-reveal-sticky">
                                <div className="parallax-reveal-card">
                                    <h2 className="cta-title split-animate">
                                        Your website should be your <span className="highlight">best salesperson</span>
                                    </h2>

                                    <p className="cta-description ">
                                        I know the frustration of running a successful business while your website fails to communicate your value. You're losing opportunities to competitors with better digital presence. Let's fix that. Together, we'll build a website that attracts, engages, and converts.
                                    </p>

                                    <button className="cta-button">
                                        Book a Free Consultation
                                    </button>

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
                                                <li><a href="#heros">Home</a></li>
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
                                        <IoIosArrowUp />
                                    </button>
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