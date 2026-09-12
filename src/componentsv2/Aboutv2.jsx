import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
import "./Aboutv2.css";
import CurvedMenu from "./CurvedMenu";
import logoImage from "../assets/logo.png";
import portraitImage from "../assets/grad.jpg";
import awardImage from "../assets/award.png";
import projectImage from "../assets/sample1.png";
import enov8tiveLogo from "../assets/enov8tive-full.svg";
import enov8tive from "../assets/enov8tive.png";
import rtcImage from "../assets/RTC.png";
import microsoftCert from "../assets/MicrosoftUX.png";
import googleCert from "../assets/GoogleUX.png";
import responsiveCert from "../assets/responsive.png";
import frontendCert from "../assets/frontend.png";
import bestDesignCert from "../assets/bestdesign.png";
import citeCert from "../assets/CITE.png";

import {
    SiApplemusic,
    SiBlender,
    SiCanva,
    SiClaude,
    SiCodesandbox,
    SiDribbble,
    SiFigma,
    SiFramer,
    SiGreensock,
    SiGithub,
    SiJira,
    SiNotion,
    SiOpenai,
    SiReact,
    SiThreedotjs,
} from "react-icons/si";

/* ─────────────────────────────────────────────
   Static data
───────────────────────────────────────────── */
const TOOLS = [
  { icon: <SiFigma />, label: "Figma" },
  { icon: <SiFramer />, label: "Framer" },
  { icon: <SiDribbble />, label: "Dribbble" },
  { icon: <SiCanva />, label: "Canva" },

  { icon: <SiOpenai />, label: "OpenAI" },
  { icon: <SiClaude />, label: "Claude" },
  { icon: <SiNotion />, label: "Notion" },
  { icon: <SiJira />, label: "Jira" },
  { icon: <SiGithub />, label: "GitHub" },

  { icon: <SiReact />, label: "React" },
  { icon: <SiGreensock />, label: "GSAP" },
  { icon: <SiThreedotjs />, label: "Three.js" },
  { icon: <SiBlender />, label: "Blender" },

  { icon: <SiApplemusic />, label: "Apple Music" },
];

const SCREEN_PROMPTS = [
    { prompt: "play something chill", song: "Night Drive" },
    { prompt: "queue lo-fi beats", song: "Golden Hour" },
    { prompt: "find my study mix", song: "Static Bloom" },
];

const MENU_SONGS = ["Night Drive", "Golden Hour", "Static Bloom", "Slow Orbit"];

const AWARD_SLIDES = [
    {
        id: "enov8tive",
        image: enov8tiveLogo,
        label: "UI/UX Designer at Enov8tive",
    },
    {
        id: "bestdesign",
        image: awardImage,
        label: "La Consolacion University Philippines",
    },
];

const SERVICES = [   
    "UI/UX Design",
    "Web Design", 
    "User Research & Testing",
    "User Experience",
    "Design Thinking",

    "Design Systems","Landing Pages",
     "Motion Design", 
      
    "Portfolio Design",
   
 
    "Wireframing & Prototyping",
    
    "Frontend Development",
   

];

const EXPERIENCE_DATA = [
    {
        id: "enov8tive",
        logo: enov8tive,
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

const EARNED_DATA = [
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

const HONOURS_DATA = [
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

const TOTAL_CERTS = EXPERIENCE_DATA.length + EARNED_DATA.length + HONOURS_DATA.length;

function Av2CertPreview({ pos, visible, imgSrc, showButton = true }) {
    return (
        <motion.div
            className="av2-certs__preview"
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
            {imgSrc && <img src={imgSrc} alt="certification preview" />}
            {showButton && (
                <div className="av2-certs__preview-circle">
                    <span>Verify</span>
                </div>
            )}
        </motion.div>
    );
}

function MagneticButton({ children, className = "", ...props }) {
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
            x,
            y,
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
            x,
            y,
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

    return (
        <button
            ref={btnRef}
            type="button"
            className={`magnetic-btn${className ? ` ${className}` : ""}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <span ref={fillRef} className="magnetic-btn__fill" />
            <span className="magnetic-btn__text">{children}</span>
        </button>
    );
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Aboutv2() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const rollingRef = useRef(null);
    const mediaStageRef = useRef(null);
    const certsRef = useRef(null);
    const [certPreview, setCertPreview] = useState({ visible: false, x: 0, y: 0, img: null, hasLink: true });

    const [awardIndex, setAwardIndex] = useState(0);

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

    useEffect(() => {
        const interval = setInterval(() => {
            setAwardIndex((prev) => (prev + 1) % AWARD_SLIDES.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);
    const handleCertHover = (item) => {
        setCertPreview({ visible: true, x: 0, y: 0, img: item.preview, hasLink: !!item.link });
    };

    const handleCertMove = (e) => {
        const rect = certsRef.current?.getBoundingClientRect();
        if (!rect) return;
        setCertPreview((prev) => ({ ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top }));
    };

    const handleCertLeave = () => {
        setCertPreview((prev) => ({ ...prev, visible: false }));
    };

    const handleCertClick = (link) => {
        if (link) window.open(link, "_blank", "noopener,noreferrer");
    };
    const ipodRef = useRef(null);
    const promptViewRef = useRef(null);
    const promptTextRef = useRef(null);
    const menuViewRef = useRef(null);
    const menuListRef = useRef(null);
    const playingViewRef = useRef(null);
    const npTitleRef = useRef(null);
    const npProgressRef = useRef(null);

    /* ── ScrollSmoother ── */
    useEffect(() => {
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
        });
        return () => smoother?.kill();
    }, []);

    /* ── Hero headline staggered reveal ── */
    useEffect(() => {
        const items = rollingRef.current?.querySelectorAll(".roll-item");
        if (!items || items.length === 0) return;

        Array.from(items).forEach((el, index) => {
            el.style.transform = index === 1 ? "translateY(0%)" : "translateY(100%)";
            el.style.opacity = index === 1 ? "1" : "0";
            el.style.transition =
                "transform 0.65s cubic-bezier(0.76,0,0.24,1), opacity 0.65s cubic-bezier(0.76,0,0.24,1)";
        });

        let current = 1;
        const roll = () => {
            const next = current + 1 >= items.length ? 1 : current + 1;
            items[current].style.transform = "translateY(-100%)";
            items[current].style.opacity = "0";
            window.setTimeout(() => {
                items[next].style.transform = "translateY(0%)";
                items[next].style.opacity = "1";
            }, 50);
            current = next;
        };

        const timer = window.setTimeout(() => {
            const interval = window.setInterval(roll, 3000);
            rollingRef.current._interval = interval;
        }, 500);
        return () => {
            window.clearTimeout(timer);
            if (rollingRef.current?._interval) {
                window.clearInterval(rollingRef.current._interval);
            }
        };
    }, []);

 
    useEffect(() => {
        const stage = mediaStageRef.current;
        const ipod = ipodRef.current;
        if (!stage || !ipod) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        gsap.set(ipod, { transformPerspective: 900, transformOrigin: "50% 50%" });

        // gentle infinite float + sway
        const floatTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
        floatTl
            .to(ipod, { y: -8, rotationZ: 1.4, duration: 3 })
            .to(ipod, { y: 3, rotationZ: -1.2, duration: 2.4 }, ">-0.3");


        const revealTween = gsap.fromTo(
            ipod,
            { autoAlpha: 0, rotationY: 70, scale: 0.85 },
            {
                autoAlpha: 1,
                rotationY: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: { trigger: stage, start: "top 85%", once: true },
            }
        );

        // pointer parallax tilt
        const quickRotY = gsap.quickTo(ipod, "rotationY", { duration: 0.6, ease: "power3.out" });
        const quickRotX = gsap.quickTo(ipod, "rotationX", { duration: 0.6, ease: "power3.out" });

        const handleMove = (e) => {
            const rect = stage.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            quickRotY(relX * 16);
            quickRotX(relY * -12);
        };
        const handleLeave = () => {
            quickRotY(0);
            quickRotX(0);
        };

        stage.addEventListener("mousemove", handleMove);
        stage.addEventListener("mouseleave", handleLeave);

        return () => {
            floatTl.kill();
            revealTween.scrollTrigger?.kill();
            revealTween.kill();
            stage.removeEventListener("mousemove", handleMove);
            stage.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    /* ── iPod screen: type a prompt -> reveal song list -> "click" select -> play ── */
    useEffect(() => {
        const promptViewEl = promptViewRef.current;
        const promptTextEl = promptTextRef.current;
        const menuViewEl = menuViewRef.current;
        const menuItems = menuListRef.current?.querySelectorAll(".av2-ipod__menu-item");
        const playingViewEl = playingViewRef.current;
        const npTitleEl = npTitleRef.current;
        const npProgressEl = npProgressRef.current;

        if (
            !promptViewEl || !promptTextEl || !menuViewEl || !menuItems?.length ||
            !playingViewEl || !npTitleEl || !npProgressEl
        ) {
            return;
        }

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return; // CSS fallback already shows a static "now playing" view

        let cycle = 0;
        let cycleTl;

        const runCycle = () => {
            const step = SCREEN_PROMPTS[cycle % SCREEN_PROMPTS.length];
            const targetIndex = Math.max(MENU_SONGS.indexOf(step.song), 0);
            const typeState = { i: 0 };

            menuItems.forEach((item) => item.classList.remove("is-active"));
            promptTextEl.textContent = "";
            gsap.set(promptViewEl, { autoAlpha: 1 });
            gsap.set(menuViewEl, { autoAlpha: 0 });
            gsap.set(playingViewEl, { autoAlpha: 0 });
            gsap.set(npProgressEl, { width: "0%" });

            cycleTl = gsap.timeline({
                onComplete: () => {
                    cycle += 1;
                    runCycle();
                },
            });

            // 1. type out the "prompt"
            cycleTl.to(typeState, {
                i: step.prompt.length,
                duration: step.prompt.length * 0.055,
                ease: "none",
                onUpdate: () => {
                    promptTextEl.textContent = step.prompt.slice(0, Math.round(typeState.i));
                },
            });
            cycleTl.to({}, { duration: 0.5 }); // beat for the cursor to blink / read

            // 2. cross-fade into the song list
            cycleTl.to(promptViewEl, { autoAlpha: 0, duration: 0.25 });
            cycleTl.to(menuViewEl, { autoAlpha: 1, duration: 0.25 }, "<");
            cycleTl.from(menuItems, { autoAlpha: 0, y: 4, duration: 0.3, stagger: 0.05 }, "<0.05");

            // 3. simulate scrolling the click-wheel down to the target song
            for (let i = 0; i <= targetIndex; i += 1) {
                cycleTl.call(
                    () => {
                        menuItems.forEach((item) => item.classList.remove("is-active"));
                        menuItems[i].classList.add("is-active");
                    },
                    null,
                    `+=${i === 0 ? 0.15 : 0.28}`
                );
            }

            // 4. "press" to confirm the selection
            cycleTl.to(menuItems[targetIndex], {
                scale: 1.06,
                duration: 0.12,
                yoyo: true,
                repeat: 1,
                transformOrigin: "left center",
            }, "+=0.2");

            // 5. swap to now-playing
            cycleTl.call(() => {
                npTitleEl.textContent = step.song;
            });
            cycleTl.to(menuViewEl, { autoAlpha: 0, duration: 0.3 }, "+=0.15");
            cycleTl.to(playingViewEl, { autoAlpha: 1, duration: 0.3 }, "<");
            cycleTl.fromTo(
                playingViewEl,
                { scale: 0.94 },
                { scale: 1, duration: 0.4, ease: "back.out(2)" },
                "<"
            );

            // 6. play it out
            cycleTl.to(npProgressEl, { width: "100%", duration: 3.2, ease: "none" });
            cycleTl.to({}, { duration: 0.6 }); // hold on the finished track

            // 7. fade out, then loop into the next prompt
            cycleTl.to(playingViewEl, { autoAlpha: 0, duration: 0.3 });
        };

        runCycle();

        return () => {
            cycleTl?.kill();
        };
    }, []);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <main className="av2-root">

                    {/* ══ HERO ══ */}
                    <section className="av2-hero hero">
                        <div className="hero__bg av2-hero__bg" />
                        <div className="hero__glow" />
                        <div className="hero__overlay" />

                        {/* NAV */}
                        <nav className="hero__nav">

                            <motion.a
                                href="/"
                                className="hero__logo-wrap"
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <img src={logoImage} alt="Russell Aguilar" className="hero__logo" />
                            </motion.a> <motion.button
                                type="button"
                                className="hero__menu"
                                aria-expanded={isMenuOpen}
                                aria-controls="site-navigation"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="menu-icon"><span /><span /></span>
                                <span className="menu-label">Menu</span>
                            </motion.button>
                        </nav>

                        {/* COPY */}
                        <div className="hero__content av2-hero__content">
                            <h1 className="hero__headline" aria-label="A page About me. Check out my story, my work, and what I do.">
                                <motion.span
                                    className="hero__line"
                                    initial={{ opacity: 0, y: 64 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="dim">A page </span>
                                    <span className="bright">About me.</span>
                                </motion.span>
                                <motion.span
                                    className="hero__line"
                                    initial={{ opacity: 0, y: 64 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.1, delay: 0.57, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="dim">Check out </span>
                                    <span className="bright roll-wrap" ref={rollingRef}>
                                        <span className="roll-item" aria-hidden="true">
                                            my story.
                                        </span>
                                        {[
                                            "my story.",
                                            "my work.",
                                            "what I do.",
                                        ].map((text) => (
                                            <span key={text} className="roll-item">
                                                {text}
                                            </span>
                                        ))}
                                    </span>
                                </motion.span>
                            </h1>

                            <motion.p
                                className="hero__sub av2-hero__sub"
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            >
                                If I'm not working, I'm probably thinking about my next trip.
                                Or nerding out over games, comics, and fashion.
                            </motion.p>
                        </div>

                        {/* Scroll indicator */}
                        <motion.div
                            className="hero__scroll"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.3 }}
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

                    {/* ══ BENTO ══ */}
                    <section className="av2-bento" id="about-bento">
                        <div className="av2-bento__grid">
                            <div className="av2-bento__card av2-bento__card--portrait">
                                <img
                                    src={portraitImage}
                                    alt="Russell Aguilar"
                                    className="av2-bento__portrait-img"
                                />

                                <time className="av2-bento__portrait-time">From The Philippines.</time>
                            </div>

                            <div className="av2-bento__card av2-bento__card--brief">
                                <h2 className="av2-bento__brief-title">
                                    Who I am
                                    <span className="av2-bento__brief-count"> (6) </span>
                                </h2>
                                <p className="av2-bento__brief-body">
                                    I’ve always been drawn to work that makes me feel something. Work that is beautiful, thoughtful, and quietly purposeful. It makes me want to grow, create, and someday leave that same feeling in someone else.

                                </p>
                            </div>

                            <div className="av2-bento__card av2-bento__card--music">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={AWARD_SLIDES[awardIndex].id}
                                        className="av2-bento__award-slide"
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <div className="av2-bento__award-img-wrap">
                                            <img
                                                src={AWARD_SLIDES[awardIndex].image}
                                                alt={AWARD_SLIDES[awardIndex].label}
                                                className={`av2-bento__award-img${AWARD_SLIDES[awardIndex].id === "enov8tive" ? " av2-bento__award-img--logo" : ""}`}
                                            />
                                        </div>
                                        <p className="av2-bento__award-label">
                                            {AWARD_SLIDES[awardIndex].label}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                                <div className="av2-bento__award-dots">
                                    {AWARD_SLIDES.map((slide, i) => (
                                        <button
                                            key={slide.id}
                                            type="button"
                                            className={`av2-bento__award-dot${i === awardIndex ? " is-active" : ""}`}
                                            onClick={() => setAwardIndex(i)}
                                            aria-label={`Show ${slide.label}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="av2-bento__card av2-bento__card--tools">
                                <h3 className="av2-bento__card-title">
                                    Tools I love
                                    <span> (7) </span>
                                </h3>
                                <div className="av2-bento__tools-marquee" aria-label="Tools I love">
                                    <div className="av2-bento__tools-track">
                                        {[0, 1].map((group) => (
                                            <div
                                                className="av2-bento__tools-group"
                                                key={group}
                                                aria-hidden={group === 1}
                                            >
                                                {TOOLS.map((tool) => (
                                                    <div
                                                        key={`${tool.label}-${group}`}
                                                        className="av2-bento__tool-icon"
                                                        title={tool.label}
                                                    >
                                                        {tool.icon}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="av2-bento__card av2-bento__card--services">
                                <h3 className="av2-bento__card-title">
                                    What I do
                                    <span> (12) </span>
                                </h3>
                                <div className="av2-bento__skills-pills">
                                    {SERVICES.map((skill) => (
                                        <span key={skill} className="av2-bento__skill-pill">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="av2-bento__card av2-bento__card--media">
                                <div className="av2-bento__media-stage" ref={mediaStageRef}>
                                    <span className="av2-bento__pixel-tag" aria-hidden="true" />
                                    <div className="av2-ipod" aria-hidden="true">
                                        <div className="av2-ipod__screen">
                                            <div className="av2-ipod__view av2-ipod__view--prompt" ref={promptViewRef}>
                                                <div className="av2-ipod__prompt-line">
                                                    <span className="av2-ipod__prompt-prefix">&gt;</span>
                                                    <span className="av2-ipod__prompt-text" ref={promptTextRef} />
                                                    <span className="av2-ipod__prompt-caret" />
                                                </div>
                                            </div>

                                            <div className="av2-ipod__view av2-ipod__view--menu" ref={menuViewRef}>
                                                <ul className="av2-ipod__menu-list" ref={menuListRef}>
                                                    {MENU_SONGS.map((title) => (
                                                        <li key={title} className="av2-ipod__menu-item">
                                                            {title}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="av2-ipod__view av2-ipod__view--playing" ref={playingViewRef}>
                                                <div className="av2-ipod__cover" />
                                                <p className="av2-ipod__np-title" ref={npTitleRef}>Don't Ask</p>
                                                <span className="av2-ipod__np-artist">abt.me</span>
                                                <div className="av2-ipod__np-progress">
                                                    <span ref={npProgressRef} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="av2-ipod__wheel">
                                            <span className="av2-ipod__menu">MENU</span>
                                            <span className="av2-ipod__prev">...</span>
                                            <span className="av2-ipod__next">...</span>
                                            <span className="av2-ipod__play">..</span>
                                            <span className="av2-ipod__button" />
                                        </div>
                                    </div>
                                </div>
                                <p className="av2-bento__media-label">Vibe coding :D</p>
                            </div>
                        </div>
                    </section>

                    <section className="av2-certs" ref={certsRef}>
                        <Av2CertPreview
                            pos={{ x: certPreview.x, y: certPreview.y }}
                            visible={certPreview.visible}
                            imgSrc={certPreview.img}
                            showButton={certPreview.hasLink}
                        />

                        <div className="av2-certs__header">
                            <h2 className="av2-certs__title">Certifications & Experience</h2>
                            <span className="av2-certs__badge">({TOTAL_CERTS})</span>
                        </div>

                        <div className="av2-certs__group">
                            <span className="av2-certs__label">Where I've Been</span>
                            <table className="av2-certs__table">
                                <tbody>
                                    {EXPERIENCE_DATA.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={`av2-certs__row${item.current ? " av2-certs__row--current" : ""}`}
                                            onMouseEnter={() => handleCertHover(item)}
                                            onMouseMove={handleCertMove}
                                            onMouseLeave={handleCertLeave}
                                        >
                                            <td>
                                                <span className="av2-certs__company">
                                                    {item.logo && (
                                                        <img src={item.logo} alt={item.company} className="av2-certs__logo" />
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

                        <div className="av2-certs__group">
                            <span className="av2-certs__label">Certifications</span>
                            <table className="av2-certs__table">
                                <tbody>
                                    {EARNED_DATA.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="av2-certs__row"
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

                        <div className="av2-certs__group">
                            <span className="av2-certs__label">Honours</span>
                            <table className="av2-certs__table">
                                <tbody>
                                    {HONOURS_DATA.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="av2-certs__row"
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

                    <footer className="av2-footer footer">
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
                                 <a href="https://www.behance.net/klentaguilar/projects" className="footer__bar-link">Behance</a>     <a href="https://www.instagram.com/klntaglr/" className="footer__bar-link">Instagram</a>
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
