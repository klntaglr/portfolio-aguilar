import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
import "./Russell.css";
import CurvedMenu from "./CurvedMenu";
import LogoLoop from "../components/LogoLoop";
import { TbPointer } from "react-icons/tb";
import { PiCursorClick } from "react-icons/pi";
import bgImage from "../assets/v2bg.png";
import logoImage from "../assets/logo.png";
import projectImage from "../assets/sample1.png";
import portraitImage from "../assets/grad.jpg"; // ← your about photo
import enov8tiveLogo from "../assets/enov8tive.png";
import rtcImage from "../assets/RTC.png";
import microsoftCert from "../assets/MicrosoftUX.png";
import googleCert from "../assets/GoogleUX.png";
import responsiveCert from "../assets/responsive.png";
import frontendCert from "../assets/frontend.png";
import bestDesignCert from "../assets/bestdesign.png";
import citeCert from "../assets/CITE.png";
function MagneticButton({ children, href, ...props }) {
    const btnRef = useRef(null);
    const fillRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.4,
            ease: "power2.out",
        });
    }, []);
    const handleMouseEnter = useCallback((e) => {
        const btn = btnRef.current;
        const fill = fillRef.current;
        if (!btn || !fill) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.killTweensOf(fill);
        gsap.set(fill, {
            x: x,
            y: y,
            xPercent: -50,
            yPercent: -50,
            scale: 0,
            left: 0,
            top: 0,
        });
        gsap.to(fill, {
            scale: 120,
            duration: 4.5,
            ease: "expo.out",
        });
    }, []);

    const handleMouseLeave = useCallback((e) => {
        const btn = btnRef.current;
        const fill = fillRef.current;
        if (!btn || !fill) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.killTweensOf(fill);
        gsap.set(fill, {
            x: x,
            y: y,
            xPercent: -50,
            yPercent: -50,
            left: 0,
            top: 0,
        });
        gsap.to(fill, {
            scale: 0,
            duration: 0.7,
            ease: "power2.inOut",
        });
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.35)",
        });
    }, []);

    const Component = href ? Link : "button";

    return (
        <Component
            ref={btnRef}
            to={href}
            type={href ? undefined : "button"}
            className={`magnetic-btn${props.className ? ` ${props.className}` : ""}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span ref={fillRef} className="magnetic-btn__fill" />
            <span className="magnetic-btn__text">{children}</span>
        </Component>
    );
}

function CardCursor({ hovered }) {
    return (
        <div className="works__card-cursor">
            <AnimatePresence mode="wait">
                {!hovered ? (
                    <motion.span
                        key="default"
                        initial={{ opacity: 0, y: 10, rotate: -10 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, y: -10, rotate: 10 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: "absolute", display: "flex" }}
                    >
                        <TbPointer className="icon-default" aria-hidden="true" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="hover"
                        initial={{ opacity: 0, y: 10, rotate: -10 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, y: -10, rotate: 10 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: "absolute", display: "flex" }}
                    >
                        <PiCursorClick className="icon-hover" aria-hidden="true" />
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}
function CertPreview({ pos, visible, imgSrc, showButton = true }) {
    return (
        <motion.div
            className="certs__preview"
            animate={{
                x: pos.x,
                y: pos.y,
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0.85,
            }}
            transition={{
                x: { duration: 0.06, ease: "linear" },
                y: { duration: 0.06, ease: "linear" },
                opacity: { duration: 0.2 },
                scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            }}
        >
            {imgSrc && <img src={imgSrc} alt="cert preview" />}
            {showButton && (
                <div className="certs__preview-circle">
                    <span>Verify</span>
                </div>
            )}
        </motion.div>
    );
}
export default function Russell() {
    const rollingRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const cardRefs = useRef([]);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);
    const [certPreview, setCertPreview] = useState({ visible: false, x: 0, y: 0, img: null, hasLink: true });
    const certsRef = useRef(null);

    const experienceData = [
        {
            id: "enov8tive",
            logo: enov8tiveLogo,
            company: "Enov8tive",
            role: "UI/UX Designer",
            date: "June 2026 - Present",
            location: "Taguig City",
            preview: projectImage,
            current: true,
        },
        {
            id: "rtc",
            logo: null,
            company: "Regional Trial Court",
            role: "UI/UX Designer & Frontend Dev Intern",
            date: "Feb – May 2026",
            location: "Malolos, Bulacan",
            preview: rtcImage,
            current: false,
        },
    ];

    const earnedData = [
        {
            id: "microsoft",
            issuer: "Microsoft",
            title: "UX Design Professional Certificate",
            date: "2026",
            source: "Coursera",
            preview: microsoftCert,
            link: "https://www.coursera.org/account/accomplishments/specialization/P5944BGSCQGU",
        },
        {
            id: "google",
            issuer: "Google",
            title: "UX Design Certificate",
            date: "2026",
            source: "Coursera",
            preview: googleCert,
            link: "https://www.coursera.org/account/accomplishments/specialization/VV2F4V6ODWAJ",
        },
        {
            id: "responsive",
            issuer: "freeCodeCamp",
            title: "Responsive Web Design",
            date: "Jan 2026",
            source: "Self-paced",
            preview: responsiveCert,
            link: "https://freecodecamp.org/certification/klntaglr/responsive-web-design-v9",
        },
        {
            id: "frontend",
            issuer: "freeCodeCamp",
            title: "Front End Development Libraries V8",
            date: "Dec 2025",
            source: "Self-paced",
            preview: frontendCert,
            link: "https://freecodecamp.org/certification/klntaglr/front-end-development-libraries",
        },
    ];

    const honoursData = [
        {
            id: "bestdesign",
            issuer: "La Consolacion University",
            title: "Best in System Design",
            date: "May 2026",
            source: "Malolos, Bulacan",
            preview: bestDesignCert,
            link: "https://www.facebook.com/share/1BzPMK8U96/",
        },
        {
            id: "cite",
            issuer: "CITE Research Colloquium",
            title: "Certificate of Participation",
            date: "May 2026",
            source: "Malolos, Bulacan",
            preview: citeCert,
            link: null,
        },
    ];

    const totalCerts = experienceData.length + earnedData.length + honoursData.length;

    const handleCertHover = (item) => {
        setCertPreview({ visible: true, x: 0, y: 0, img: item.preview, hasLink: !!item.link });
    };

    const handleCertMove = (e) => {
        const rect = certsRef.current?.getBoundingClientRect();
        if (!rect) return;
        setCertPreview((p) => ({ ...p, x: e.clientX - rect.left, y: e.clientY - rect.top }));
    };

    const handleCertLeave = () => {
        setCertPreview((p) => ({ ...p, visible: false }));
    };

    const handleCertClick = (link) => {
        if (link) window.open(link, "_blank", "noopener,noreferrer");
    };
    const handleCardMouseMove = useCallback((e, cardId) => {
        setHoveredCard(cardId);
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
        setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }, []);

    const handleCardMouseEnter = useCallback((cardId) => {
        setHoveredCard(cardId);
        setCursorVisible(true);
    }, []);

    const handleCardMouseLeave = useCallback((e, cardId) => {
        setHoveredCard(null);
        setCursorVisible(false);
        e.currentTarget.style.transform = `perspective(900px) rotateY(0deg) rotateX(0deg)`;
    }, []);
    const rollingItems = ["UI/UX Designer.", "Web Designer.", "Product Designer."];

    useEffect(() => {
        const smoother = ScrollSmoother.get();
        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        const preventScroll = (event) => event.preventDefault();
        const preventKeyScroll = (event) => {
            if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
                event.preventDefault();
            }
        };

        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            smoother?.paused(true);
            window.addEventListener("wheel", preventScroll, { passive: false });
            window.addEventListener("touchmove", preventScroll, { passive: false });
            window.addEventListener("keydown", preventKeyScroll, { passive: false });
        }

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            smoother?.paused(false);
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
            window.removeEventListener("keydown", preventKeyScroll);
        };
    }, [isMenuOpen]);

    /* ── rolling text loop ── */
    useEffect(() => {
        const items = rollingRef.current?.querySelectorAll(".roll-item");
        if (!items || items.length === 0) return;

        // hide all except the first visible item (index 1, index 0 is ghost spacer)
        Array.from(items).forEach((el, i) => {
            el.style.transform = i === 1 ? "translateY(0%)" : "translateY(100%)";
            el.style.opacity = i === 1 ? "1" : "0";
            el.style.transition = "transform 0.65s cubic-bezier(0.76,0,0.24,1), opacity 0.65s cubic-bezier(0.76,0,0.24,1)";
        });

        let current = 1;
        const roll = () => {
            const next = current + 1 >= items.length ? 1 : current + 1;
            items[current].style.transform = "translateY(-100%)";
            items[current].style.opacity = "0";
            setTimeout(() => {
                items[next].style.transform = "translateY(0%)";
                items[next].style.opacity = "1";
            }, 50);
            current = next;
        };

        const timer = setTimeout(() => {
            const interval = setInterval(roll, 3000);
            rollingRef._interval = interval;
        }, 500);

        return () => {
            clearTimeout(timer);
            if (rollingRef._interval) clearInterval(rollingRef._interval);
        };
    }, []);





    useEffect(() => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
        });
    }, []);

    /* ── about: text-fill + card bidirectional scroll ── */
    const aboutCardRef = useRef(null);
    const aboutBadgeRef = useRef(null);
    const [aboutBadgePos, setAboutBadgePos] = useState({ x: 0, y: 0 });
    const [aboutBadgeVisible, setAboutBadgeVisible] = useState(false);

    const handleAboutMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setAboutBadgePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleAboutMouseEnter = useCallback(() => {
        setAboutBadgeVisible(true);
    }, []);

    const handleAboutMouseLeave = useCallback(() => {
        setAboutBadgeVisible(false);
    }, []);
    useEffect(() => {
        /* 1. card — bidirectional scrub (scroll down = rise, scroll up = fall) */
        const card = aboutCardRef.current;
        if (card) {
            gsap.fromTo(
                card,
                { y: 90, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 92%",
                        end: "top 38%",
                        scrub: 1.2,   /* lag = smoothness, bidirectional by default */
                    },
                }
            );
        }

        /* 2. smooth word-by-word colour fill via gsap scrub */
        const words = document.querySelectorAll(".about__word");
        if (!words.length) return;

        const total = words.length;

        /* give each word its own quick tween target driven by a proxy value */
        words.forEach((w) => {
            gsap.set(w, { color: "#2a2a2a" });
        });

        ScrollTrigger.create({
            trigger: ".about__headline",
            start: "top 78%",
            end: "bottom 55%",
            scrub: 1.8,
            onUpdate(self) {
                const progress = self.progress;
                const band = 1 / total;
                words.forEach((w, i) => {
                    const wordProgress = Math.max(
                        0,
                        Math.min(1, (progress - (i / total) * 0.6) / (band * 2.2))
                    );
                    const v = Math.round(wordProgress * (255 - 42) + 42);
                    w.style.color = `rgb(${v}, ${v}, ${v})`;
                });
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <main className="site-root">
                    {/* circle cursor */}
                    {/* moved INSIDE the works section below — delete this */}
                    <section className="hero">
                                    {/* bg gradient */}
                        <div className="hero__bg" />
                        {/* ambient glow */}
                        <div className="hero__glow" />
                        {/* vignette */}
                        <div className="hero__overlay" />

                        {/* ── NAV ── */}
                        <nav className="hero__nav">

                            <motion.a
                                href="#"
                                className="hero__logo-wrap"
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <img src={logoImage} alt="Russell Aguilar" className="hero__logo" />
                            </motion.a>               <motion.button
                                type="button"
                                className="hero__menu"
                                aria-expanded={isMenuOpen}
                                aria-controls="site-navigation"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="menu-icon">
                                    <span />
                                    <span />
                                </span>
                                <span className="menu-label">Menu</span>
                            </motion.button>

                        </nav>

                        {/* ── COPY ── */}
                        <div className="hero__content">
                            <h1 className="hero__headline">
                                <motion.span
                                    className="hero__line"
                                    initial={{ opacity: 0, y: 64 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="dim">Hi, I'm </span>
                                    <span className="bright">Russell Aguilar.</span>
                                </motion.span>
                                <motion.span
                                    className="hero__line"
                                    initial={{ opacity: 0, y: 64 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.1, delay: 0.57, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="dim">I'm a </span>
                                    <span className="bright roll-wrap" ref={rollingRef}>
                                                                        {/* ghost spacer so the line holds its width */}
                                        <span className="roll-item" aria-hidden="true">
                                            Product Designer.
                                        </span>
                                        {rollingItems.map((text) => (
                                            <span key={text} className="roll-item">
                                                {text}
                                            </span>
                                        ))}
                                    </span>
                                </motion.span>
                            </h1>

                            <motion.p
                                className="hero__sub"
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            >
                                Passionately creating innovative digital
                                experiences, rooted in user needs.
                            </motion.p>
                        </div>

                        {/* ── SCROLL DOT ── */}
                        <motion.div
                            className="hero__scroll"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                        >
                            <div className="scroll-ring">
                                <motion.span
                                    className="scroll-dot"
                                    animate={{ y: [0, 16, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                                />
                            </div>
                        </motion.div>
                    </section>

                    <section className="works">
                        {/* heading */}
                        <div className="works__header">
                            <h2 className="works__title">Selected works</h2>
                            <span className="works__badge">(3)</span>
                        </div>

                        <div className="works__list">
                            <div className="works__item">
                                <div className="works__marquee" aria-hidden="true">
                                    <LogoLoop
                                        logos={[
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                        ]}
                                        speed={200}
                                        direction="left"
                                        logoHeight={130}
                                        gap={48}
                                        pauseOnHover={false}
                                        ariaLabel=""
                                    />
                                </div>
                                <div
                                    className="works__card"
                                    ref={(el) => (cardRefs.current[0] = el)}
                                    onMouseEnter={() => handleCardMouseEnter("card1")}
                                    onMouseMove={(e) => handleCardMouseMove(e, "card1")}
                                    onMouseLeave={(e) => handleCardMouseLeave(e, "card1")}
                                >
                                    <motion.div
                                        className="works__circle-cursor"
                                        animate={{
                                            x: hoveredCard === "card1" ? cursorPos.x : cursorPos.x,
                                            y: hoveredCard === "card1" ? cursorPos.y : cursorPos.y,
                                            opacity: hoveredCard === "card1" ? 1 : 0,
                                            scale: hoveredCard === "card1" ? 1 : 0.5,
                                        }}
                                        transition={{
                                            x: { duration: 0.08, ease: "linear" },
                                            y: { duration: 0.08, ease: "linear" },
                                            opacity: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                                            scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                                        }}
                                    >
                                        <span>View</span>
                                    </motion.div>
                                    <div className="works__card-img">

                                        <img
                                            src={projectImage}
                                            alt="AI Gift Finder app mockup"
                                            className="works__card-screenshot"
                                        />
                                    </div>

                                    <div className="works__card-footer">
                                        <div className="works__card-meta">
                                            <span className="works__card-name">AI Gift Finder</span>
                                        </div>
                                        <div className="works__card-badges">
                                            <span className="works__pill">AI</span>
                                            <span className="works__pill">UX Research</span>
                                            <span className="works__pill">App Design</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="works__item works__item--right">
                                <div className="works__marquee" aria-hidden="true">
                                    <LogoLoop
                                        logos={[
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                        ]}
                                        speed={200}
                                        direction="right"
                                        logoHeight={130}
                                        gap={48}
                                        pauseOnHover={false}
                                        ariaLabel=""
                                    />
                                </div>

                                <div
                                    className="works__card"
                                    ref={(el) => (cardRefs.current[0] = el)}
                                    onMouseEnter={() => handleCardMouseEnter("card1")}
                                    onMouseMove={(e) => handleCardMouseMove(e, "card1")}
                                    onMouseLeave={(e) => handleCardMouseLeave(e, "card1")}
                                >
                                    <motion.div
                                        className="works__circle-cursor"
                                        animate={{
                                            x: hoveredCard === "card1" ? cursorPos.x : cursorPos.x,
                                            y: hoveredCard === "card1" ? cursorPos.y : cursorPos.y,
                                            opacity: hoveredCard === "card1" ? 1 : 0,
                                            scale: hoveredCard === "card1" ? 1 : 0.5,
                                        }}
                                        transition={{
                                            x: { duration: 0.08, ease: "linear" },
                                            y: { duration: 0.08, ease: "linear" },
                                            opacity: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                                            scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                                        }}
                                    >
                                        <span>View</span>
                                    </motion.div>
                                    <div className="works__card-img">

                                        <img
                                            src={projectImage}
                                            alt="Project Two mockup"
                                            className="works__card-screenshot"
                                        />
                                    </div>

                                    <div className="works__card-footer">
                                        <div className="works__card-meta">
                                            <span className="works__card-name">Project Two</span>
                                        </div>
                                        <div className="works__card-badges">
                                            <span className="works__pill">UI/UX</span>
                                            <span className="works__pill">Branding</span>
                                            <span className="works__pill">Web Design</span>
                                        </div>
                                    </div>
                                </div>
                            </div> <div className="works__item">
                                <div className="works__marquee" aria-hidden="true">
                                    <LogoLoop
                                        logos={[
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                            { node: <span className="works__marquee-word">BOL</span> },
                                        ]}
                                        speed={200}
                                        direction="left"
                                        logoHeight={130}
                                        gap={48}
                                        pauseOnHover={false}
                                        ariaLabel=""
                                    />
                                </div>

                                <div
                                    className="works__card"
                                    ref={(el) => (cardRefs.current[0] = el)}
                                    onMouseEnter={() => handleCardMouseEnter("card1")}
                                    onMouseMove={(e) => handleCardMouseMove(e, "card1")}
                                    onMouseLeave={(e) => handleCardMouseLeave(e, "card1")}
                                >
                                    <motion.div
                                        className="works__circle-cursor"
                                        animate={{
                                            x: hoveredCard === "card1" ? cursorPos.x : cursorPos.x,
                                            y: hoveredCard === "card1" ? cursorPos.y : cursorPos.y,
                                            opacity: hoveredCard === "card1" ? 1 : 0,
                                            scale: hoveredCard === "card1" ? 1 : 0.5,
                                        }}
                                        transition={{
                                            x: { duration: 0.08, ease: "linear" },
                                            y: { duration: 0.08, ease: "linear" },
                                            opacity: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                                            scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                                        }}
                                    >
                                        <span>View</span>
                                    </motion.div>
                                    <div className="works__card-img">

                                        <img
                                            src={projectImage}
                                            alt="Project Two mockup"
                                            className="works__card-screenshot"
                                        />
                                    </div>

                                    <div className="works__card-footer">
                                        <div className="works__card-meta">
                                            <span className="works__card-name">Project Two</span>
                                        </div>
                                        <div className="works__card-badges">
                                            <span className="works__pill">UI/UX</span>
                                            <span className="works__pill">Branding</span>
                                            <span className="works__pill">Web Design</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="works__cta">
                            <MagneticButton href="/works">See All Works <sup className="magnetic-btn__sup">(11)</sup></MagneticButton>
                        </div>
                    </section>

                    <section className="certs" ref={certsRef}>
                                            <CertPreview
                            pos={{ x: certPreview.x, y: certPreview.y }}
                            visible={certPreview.visible}
                            imgSrc={certPreview.img}
                            showButton={certPreview.hasLink}
                        />

                                    <div className="certs__header">
                            <h2 className="certs__title">Certifications & Experience</h2>
                            <span className="certs__badge">({totalCerts})</span>
                        </div>
                      
                                              <div className="certs__group">
                            <span className="certs__label">Where I've Been</span>
                            <table className="certs__table">
                                <tbody>
                                    {experienceData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={`certs__row${item.current ? " certs__row--current" : ""}`}
                                            onMouseEnter={() => handleCertHover(item)}
                                            onMouseMove={handleCertMove}
                                            onMouseLeave={handleCertLeave}
                                        >
                                            <td>
                                                <span className="certs__company">
                                                    {item.logo && (
                                                        <img src={item.logo} alt={item.company} className="certs__logo" />
                                                    )}
                                                    {item.company}
                                                </span>
                                            </td>
                                            <td>{item.role}</td>
                                            <td>{item.date}</td>
                                            <td>{item.location}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                                               <div className="certs__group">
                            <span className="certs__label">What I've Earned</span>
                            <table className="certs__table">
                                <tbody>
                                    {earnedData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="certs__row"
                                            onMouseEnter={() => handleCertHover(item)}
                                            onMouseMove={handleCertMove}
                                            onMouseLeave={handleCertLeave}
                                            onClick={() => handleCertClick(item.link)}
                                            style={{ cursor: item.link ? "pointer" : "default" }}
                                        >
                                            <td>{item.issuer}</td>
                                            <td>{item.title}</td>
                                            <td>{item.date}</td>
                                            <td>{item.source}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                                             <div className="certs__group">
                            <span className="certs__label">Honours</span>
                            <table className="certs__table">
                                <tbody>
                                    {honoursData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="certs__row"
                                            onMouseEnter={() => handleCertHover(item)}
                                            onMouseMove={handleCertMove}
                                            onMouseLeave={handleCertLeave}
                                            onClick={() => handleCertClick(item.link)}
                                            style={{ cursor: item.link ? "pointer" : "default" }}
                                        >
                                            <td>{item.issuer}</td>
                                            <td>{item.title}</td>
                                            <td>{item.date}</td>
                                            <td>{item.source}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ══ ABOUT SECTION ══ */}
                    <section className="about">
                        <div className="about__copy">
                            <h2 className="about__headline">
                                {[
                                    " I love to inspire,",
                                    " because",
                                    " I know",
                                    " what",
                                    " it's",
                                    " like",
                                    " to be",
                                    " inspired.",
                                    " Seeing",
                                    " design",
                                    " work",
                                    " and having",
                                    " fun,",
                                    " that's",
                                    " what it's",
                                    " all about.",
                                ].map((text, i) => (
                                    <span key={i} className="about__word">
                                        {text}
                                    </span>
                                ))}
                            </h2>
                        </div>

                        <div className="about__card-wrap">
                            <Link to="/about-web-designer" className="about__card-link" aria-label="Read more about Russell Aguilar">
                                <div
                                    className="about__card"
                                    ref={aboutCardRef}
                                    onMouseMove={handleAboutMouseMove}
                                    onMouseEnter={handleAboutMouseEnter}
                                    onMouseLeave={handleAboutMouseLeave}
                                >
                                    <div className="about__card-inner">
                                        <img
                                            src={portraitImage}
                                            alt="Russell Aguilar"
                                        />
                                    </div>
                                    <motion.div
                                        className="about__card-badge"
                                        animate={{
                                            x: aboutBadgePos.x,
                                            y: aboutBadgePos.y,
                                            opacity: aboutBadgeVisible ? 1 : 0,
                                            scale: aboutBadgeVisible ? 1 : 0.7,
                                        }}
                                        transition={{
                                            x: { duration: 0.08, ease: "linear" },
                                            y: { duration: 0.08, ease: "linear" },
                                            opacity: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                                            scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                                        }}
                                        ref={aboutBadgeRef}
                                    >
                                        <div className="about__card-badge-inner">
                                            <span>• About Me</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </Link>
                        </div>
                    </section>

                    {/* ══ FOOTER ══ */}
                    <footer className="footer">
                        <div className="footer__top">
                            <div>
                                <div className="footer__heading-wrap">
                                    <div className="footer__avatar">
                                        <img src={portraitImage} alt="Russell Aguilar" />
                                    </div>
                                    <h2 className="footer__title">Let's work</h2>
                                </div>
                                <h2 className="footer__title">together</h2>
                            </div>
                        </div>

                        {/* divider with circle CTA sitting on the line */}
                        <div className="footer__divider-row">
                            <div className="footer__divider-line" />
                            <MagneticButton className="footer__cta">Get in Touch</MagneticButton>
                        </div>
                        <div className="footer__contacts">
                            <MagneticButton className="footer__pill-btn">klentaguilar@gmail.com</MagneticButton>
                            <MagneticButton className="footer__pill-btn">+63 967 217 9685</MagneticButton>
                        </div>
                        <div className="footer__bar">
                            <div className="footer__bar-col">
                                <span className="footer__bar-label">Credits</span>
                                <div className="footer__bar-links">
                                    <span className="footer__bar-link">© Russell Aguilar – 2026</span>
                                </div>
                            </div>
                            <div className="footer__bar-col">
                                <span className="footer__bar-label">Contact</span>
                                <div className="footer__bar-links">
                                    <a href="https://www.linkedin.com/in/klent-russell-aguilar-b6929739b/" className="footer__bar-link">LinkedIn</a>
                                <a href="https://www.behance.net/klentaguilar/projects" className="footer__bar-link">Behance</a>    <a href="https://www.instagram.com/klntaglr/" className="footer__bar-link">Instagram</a>
                                    <a href="https://www.tiktok.com/@klntaglr" className="footer__bar-link">TikTok</a>
                                    
                                    <a href="https://github.com/klntaglr" className="footer__bar-link">GitHub</a>
                                </div>
                            </div>
                            <div className="footer__bar-menu">
                                <span className="footer__bar-label">Menu</span>
                                <div className="footer__bar-links">
                                    <a href="#" className="footer__bar-link">Home</a>
                                    <a href="#" className="footer__bar-link">Work</a>
                                    <a href="#" className="footer__bar-link">About</a>
                                    <a href="#" className="footer__bar-link">Contact</a>
                                </div>
                            </div>
                        </div>
                    </footer>

                    <AnimatePresence mode="wait">
                        {isMenuOpen && (
                            <CurvedMenu
                                id="site-navigation"
                                onClose={() => setIsMenuOpen(false)}
                            />
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}