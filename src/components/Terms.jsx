import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Portfolio.css'; import Maillards from './Maillards';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import LogoLoop from './LogoLoop';
import experienceIcon from "../assets/experience.svg";
import projects from "../assets/projects.svg";
import { FaArrowLeft } from "react-icons/fa";

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
import poster from '../assets/poster.png';
import quote from '../assets/quote.png';
import TiltedCard from './TiltedCard';
import { FaFacebook, FaInstagram, FaLinkedin, FaDribbble, FaDiscord } from 'react-icons/fa';
import { SiIndeed } from 'react-icons/si';
import SplitText from "gsap/SplitText";
import { IoIosArrowUp } from "react-icons/io";

gsap.registerPlugin(SplitText);

function Terms() {
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
                    }

                    ,
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


                    {/* Services Section */}



                    <section className="about-section panels">
                        <div className="services-container">
                            <div className="services-content">
                                <h3 className="services-subtitles split-animate">
                                    <span className="services-subtitle-accent">Terms &</span> Conditions
                                </h3>
                            </div>

                            <div className="services-description">
                                <p className="services-paragraph">
                                    To keep this opportunity fair, transparent, and mutually beneficial, here are the terms and conditions for the free landing page offer:
                                </p>

                                <div className="approach-section">
                                    <h4 className="approach-title">Please read carefully before applying:</h4>
                                    <ol className="approach-list">
                                        <li><span className="bold">Selection Process:</span> I reserve the right to select projects based on my own criteria including creativity, feasibility, portfolio fit, and personal interest. Not all applicants will be selected. Selection decisions are final and non-negotiable.</li>
                                        <li><span className="bold">Free Service Scope:</span> The free landing page includes design, development, and deployment on free hosting platforms (Vercel, Netlify, Firebase). Custom domain registration is NOT included — you must purchase your own domain if you want a custom URL.</li>
                                        <li><span className="bold">Revision Limits:</span> You're entitled to 2 rounds of design revisions during the design phase. Additional revisions beyond this may be declined or require paid service. Revisions must be provided within 48 hours of each review to keep the project on schedule.</li>
                                        <li><span className="bold">Content Responsibility:</span> You are responsible for providing all written content, images, logos, and materials needed for the landing page. I can help refine and organize content, but I'm not a copywriter or photographer. Content must be original or properly licensed — no copyrighted or stolen materials.</li>
                                        <li><span className="bold">Timeline Flexibility:</span> The estimated 10-14 day timeline is subject to change based on project complexity and your responsiveness. Delays in providing feedback or materials will extend the timeline. I'll do my best to meet deadlines, but external factors may cause adjustments.</li>
                                        <li><span className="bold">Portfolio Rights:</span> By accepting this free service, you grant me permission to showcase the completed landing page in my portfolio, case studies, social media, and marketing materials. I will credit your project and may use screenshots or live links.</li>
                                        <li><span className="bold">Testimonial Requirement:</span> If you're satisfied with the final result, you agree to provide a short testimonial (2-3 sentences) that I can use on my website and marketing materials. Testimonials must be honest and authentic.</li>
                                        <li><span className="bold">Ownership:</span> Upon project completion and handoff, you own all rights to the final landing page design and code. You can modify, redistribute, or use it however you want. I retain the right to showcase it in my portfolio.</li>
                                        <li><span className="bold">Support Period:</span> I provide 30 days of email support after launch for questions, minor fixes, or clarifications. After 30 days, support ends unless you hire me for paid ongoing maintenance. Support does not include major feature additions or redesigns.</li>
                                        <li><span className="bold">No Guarantees:</span> While I'll design and build your landing page professionally, I cannot guarantee specific business results like sales, leads, or conversions. Success depends on many factors including your product, market, and marketing efforts.</li>
                                        <li><span className="bold">Professional Conduct:</span> Both parties agree to communicate professionally, respectfully, and promptly. Abusive, disrespectful, or unreasonable behavior from either side may result in project termination.</li>
                                        <li><span className="bold">Legal Compliance:</span> You are responsible for ensuring your landing page complies with all applicable laws, regulations, and industry standards including privacy laws (GDPR, CCPA), advertising standards, and terms of service for any integrated platforms.</li>
                                        <li><span className="bold">Third-Party Services:</span> If your landing page requires third-party integrations (payment processors, email services, analytics), you are responsible for creating accounts, managing subscriptions, and complying with their terms of service. I can assist with technical integration only.</li>
                                        <li><span className="bold">Cancellation:</span> I reserve the right to cancel or pause a project if you become unresponsive for more than 7 days, fail to provide necessary materials, or if continuing the project is no longer feasible. You may also cancel at any time, but the slot will not be reopened.</li>
                                        <li><span className="bold">No Refunds:</span> Since this is a free service, there are no refunds. However, if you're unsatisfied with the final result, I'll work with you to address concerns within the agreed revision scope.</li>
                                        <li><span className="bold">Modification of Terms:</span> I reserve the right to modify these terms at any time. Any changes will be communicated to active projects. By continuing with the project, you accept updated terms.</li>
                                    </ol>
                                </div>

                                <p className="services-paragraph">
                                    By applying for this free landing page opportunity, you acknowledge that you've read, understood, and agree to these terms and conditions. If you have questions or concerns about any of these terms, please reach out before applying.
                                </p>
                            </div>

                            {/* PRIVACY & DATA */}
                            <div className="services-content">
                                <h3 className="services-subtitles split-animate">
                                    <span className="services-subtitle-accent">Privacy &</span> Data Handling
                                </h3>
                            </div>

                            <div className="services-description">
                                <p className="services-paragraph">
                                    Your privacy and data security matter. Here's how I handle information during our collaboration:
                                </p>

                                <div className="approach-section">
                                    <h4 className="approach-title">Data protection commitments:</h4>
                                    <ol className="approach-list">
                                        <li><span className="bold">Information Collection:</span> I'll collect only the information necessary to complete your landing page including business details, contact information, brand assets, content, and project requirements. I won't ask for sensitive personal data, financial information, or anything unrelated to the project.</li>
                                        <li><span className="bold">Data Storage:</span> All project files, communications, and materials will be stored securely on password-protected cloud storage (Google Drive, Dropbox) or project management tools. Access is limited to me and you only.</li>
                                        <li><span className="bold">Communication Privacy:</span> All emails, calls, and conversations between us are confidential. I won't share your ideas, business plans, or proprietary information with third parties without your explicit permission.</li>
                                        <li><span className="bold">Third-Party Access:</span> I may use third-party tools for design (Figma), development (GitHub), hosting (Vercel/Netlify), and communication (Email, Zoom). These platforms have their own privacy policies which I encourage you to review.</li>
                                        <li><span className="bold">Portfolio Use:</span> When showcasing your project in my portfolio, I'll only share publicly visible information (website screenshots, project description, your business name). I won't share private business metrics, analytics, or confidential details unless you explicitly approve.</li>
                                        <li><span className="bold">Data Retention:</span> Project files will be retained for 90 days after project completion in case you need access or revisions. After 90 days, files may be deleted or archived. If you want files deleted sooner, just ask.</li>
                                        <li><span className="bold">No Selling of Data:</span> I will never sell, rent, or share your personal or business information with marketers, advertisers, or third parties for commercial purposes. Your data is yours.</li>
                                        <li><span className="bold">Breach Notification:</span> In the unlikely event of a data breach affecting your project materials, I'll notify you immediately and take steps to secure your information.</li>
                                        <li><span className="bold">Your Rights:</span> You have the right to request access to your data, request corrections, or ask for deletion at any time. Just email me and I'll comply within 72 hours.</li>
                                    </ol>
                                </div>

                                <p className="services-paragraph">
                                    If you have specific privacy concerns or requirements (NDAs, confidentiality agreements, etc.), let me know during the application process and we can discuss appropriate measures.
                                </p>
                            </div>

                            {/* HOW TO APPLY */}
                            <div className="services-content">
                                <h3 className="services-subtitless1 split-animate">
                                    <span className="services-subtitle-accent">Ready to</span> Apply?
                                </h3>
                            </div>

                            <div className="services-description" id="start">
                                <p className="services-paragraph">
                                    If you've read everything above and you're excited about this opportunity, here's how to apply for one of the 5 free landing page slots:
                                </p>

                                <div className="approach-section">
                                    <h4 className="approach-title">Application process:</h4>
                                    <ol className="approach-list">
                                        <li><span className="bold">Prepare Your Information:</span> Gather your project details, goals, target audience description, any existing materials (logo, content, images), and 2-3 reference websites you like.</li>
                                        <li><span className="bold">Submit Your Application:</span> Email me at <a href="mailto:klentaguilar@gmail.com" style={{ color: 'var(--purple-primary)', textDecoration: 'underline' }}>klentaguilar@gmail.com</a> with the subject line "Free Landing Page Application - [Your Project Name]"</li>
                                        <li><span className="bold">Include in Your Email:</span>
                                            <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
                                                <li>Your name and contact information</li>
                                                <li>Project name and description (2-3 paragraphs)</li>
                                                <li>What type of landing page you need (portfolio, business, product, etc.)</li>
                                                <li>Your target audience and main goal</li>
                                                <li>Why you're applying for this free opportunity</li>
                                                <li>Any materials you already have (attach or provide links)</li>
                                                <li>Your timeline and availability</li>
                                            </ul>
                                        </li>
                                        <li><span className="bold">Wait for Response:</span> I'll review all applications within 3-5 business days and send you an email either confirming selection or thanking you for applying.</li>
                                        <li><span className="bold">If Selected:</span> We'll schedule a kickoff call within 1 week to get started on your project.</li>
                                    </ol>
                                </div>

                                <p className="services-paragraph">
                                    Slots are limited to 5 projects to maintain quality and give each one the attention it deserves. If you're interested, don't wait — once they're filled, I'll open applications again in a few months. <span className="services-highlight">Let's build something great together.</span>
                                </p>
                                
                                       <a href="/free-landing-page#start" className="cta-button ">
                                        Apply Now
                                    </a>
                                <div className="quick-reminder-box">
                                    <p className="reminder-label">Quick Reminder:</p>
                                    <p className="reminder-text">
                                        This is a genuine opportunity to get professional design work in exchange for feedback and portfolio rights. I'm selective about projects because I want to create work I'm proud of. If your project excites me and aligns with my portfolio goals, you'll get the same quality I deliver to paying clients. Apply with authentic details and realistic expectations.
                                    </p>
                                  
                                </div>
                                
                            </div>
                        </div>
                        
                    </section>






                </div>
            </div>
        </>
    );
}

export default Terms;