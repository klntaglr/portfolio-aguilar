import { useLayoutEffect, useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import "./Russell.css"; /* shared: smooth wrapper, hero nav/bg, magnetic btn, footer */
import "./CaseStudy.css";
import CurvedMenu from "./CurvedMenu";

import logoImage from "../assets/logo.png";
import spiralBackground from "../assets/spiralbg.webp";
import portraitImage from "../assets/grad.jpg";
import projectImage from "../assets/placeholder.png";
const galleryMain = projectImage;
const galleryEntry = projectImage;
const galleryIntro = projectImage;
const galleryThree = projectImage;
const galleryFour = projectImage;
const growpadImage = projectImage;
const coverImage = projectImage;
/* ════════════════════════════════════════════════
   CONTENT — swap this object per project
════════════════════════════════════════════════ */
const caseStudy = {
    title: "bol's inspiring way of gift giving.",
    client: "bol",
    year: "2025",
    services: ["AI Design", "User research & Testing", "UX Design"],
    cover: coverImage,
    background: {
        text: "In preparation for the holiday season, bol wants to support their users in finding gifts for their loved ones. In comes the AI Gift Finder/Cadeauhulp. This conversational AI chatting experience, helps users with finding inspirational ideas for a gift, or a direct product that may fit their needs.",
        link: { label: "Visit client website.", href: "#" },
    },
    challenge: [
        "At this point in time, DEPT® had already done concepting for the Gift Finder. Though bol felt there were still design opportunities to enhance the user experience before releasing it to the public. My role here was to seek the answers to the questions; learning about how users behave with a conversational chat, learning about the value of output, learning about how intuitive the navigation feels, and more.",
        "Seeking answers to these questions had been done so, by setting up and running the pilot for the Gift Finder. Consisting of a mixed methodology approach with usability tests and retrospective interviews in a lab environment. Learning about what users do, think, and say regarding finding gifts with the Gift Finder.",
    ],
     findings: [
        {
            label: "Suggestions and chip behavior",
            text: "Users struggled in getting enough variety in products per output, variety in product categories, as well as the product amount. With the limit being set to 4 products per output, a behavioral pattern occured where users often relied on repeated use of the quick suggestion chips. Using it in order to quickly gain more product suggestions, as well as quickly navigate oneself through the conversation.",
        },
        {
            label: "Reading input fields",
            text: "When chatting with the Gift Finder, users generally showed 2 prompting styles. Either keyword focussed, or writing longer story-esque prompts. Even though users can finish their tasks quite well in both cases, the users who wrote longer prompts were frustrated that the chat's input field didn't allow for reading back a prompt before sending it. It was also the case that when users send their prompts in the chat, the position stayed in the middle of a chat field, and became disorienting.",
        },
        {
            label: "Losing a chat",
            text: "When navigating between a product detail page and a chat, users on some occasions double tapped the back button. The back button for both product detail pages, as well as the chat are on the same position, this made users exit the chat and lose their history. In other occassions, users also had performance issues. This either made a chat wipe, or made users want to restart their chat.",
        },
        {
            label: "FAB's and mental modals",
            text: "Entering the Gift Finder, goes via the floating action button on the home page. In some cases, users expected the entry point for the Gift Finder to be within a search, a gift page, or a card on the home page. For them, this aligns more with their mental modal of how they see and imagine the layout of the bol app.",
        },
    ],
    results: [
        {
            label: "Insight Sharing",
            paragraphs: [
                "The pilot was well received by bol, the DEPT® team, and key stakeholders, which led to further iterations. Working with the UX Team was an ideal way of integrating findings into design, working to ensure users can find the answers they need quickly through discovery.",
                "As of October 2025, the conversational Gift Finder is a featured link on the 'Wish To Gift' landing page, with over 70% of those users saying it helped 'finding gifts more fun'.",
            ],
        },
    ],
    gallery: {
        main: { src: galleryMain, caption: "Basic navigation to find the gifts quicker" },
        small: [
            { src: galleryEntry, caption: "Main entry point" },
            { src: galleryIntro, caption: "Intro screens" },
            { src: galleryThree, caption: "" },
            { src: galleryFour, caption: "" },
        ],
    },
    next: { name: "Growpad", href: "/works", image: growpadImage },
};

/* ════════════════════════════════════════════════
   REUSABLE: MagneticButton  (same as Russell.jsx)
════════════════════════════════════════════════ */
function MagneticButton({ children, href, ...props }) {
    const btnRef = useRef(null);
    const fillRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
    }, []);

    const handleMouseEnter = useCallback((e) => {
        const btn = btnRef.current;
        const fill = fillRef.current;
        if (!btn || !fill) return;
        const rect = btn.getBoundingClientRect();
        gsap.killTweensOf(fill);
        gsap.set(fill, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            xPercent: -50,
            yPercent: -50,
            scale: 0,
            left: 0,
            top: 0,
        });
        gsap.to(fill, { scale: 120, duration: 4.5, ease: "expo.out" });
    }, []);

    const handleMouseLeave = useCallback((e) => {
        const btn = btnRef.current;
        const fill = fillRef.current;
        if (!btn || !fill) return;
        const rect = btn.getBoundingClientRect();
        gsap.killTweensOf(fill);
        gsap.set(fill, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            xPercent: -50,
            yPercent: -50,
            left: 0,
            top: 0,
        });
        gsap.to(fill, { scale: 0, duration: 0.7, ease: "power2.inOut" });
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
    }, []);

    const Component = href ? Link : "button";

    return (
        <Component
            ref={btnRef}
            to={href}
            type={href ? undefined : "button"}
            className={`magnetic-btn${props.className ? ` ${props.className}` : ""}`}
            onClick={props.onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span ref={fillRef} className="magnetic-btn__fill" />
            <span className="magnetic-btn__text">{children}</span>
        </Component>
    );
}

/* ════════════════════════════════════════════════
   REUSABLE: SplitText — masked word-by-word reveal
════════════════════════════════════════════════ */
function SplitText({ as: Tag = "h2", className = "", children, ...rest }) {
    const words = String(children).split(" ");
    return (
        <Tag className={className} {...rest}>
            {words.map((w, i) => (
                <span key={i}>
                    <span className="cs__mask">
                        <span className="cs__mask-inner">{w}</span>
                    </span>
                    {i < words.length - 1 ? " " : ""}
                </span>
            ))}
        </Tag>
    );
}

/* ════════════════════════════════════════════════
   REUSABLE: InfoRow — label + body (like the ref)
════════════════════════════════════════════════ */
function InfoRow({ label, children }) {
    return (
        <div className="cs__row">
            <span className="cs__row-label">{label}</span>
            <div className="cs__row-body">{children}</div>
        </div>
    );
}

/* ════════════════════════════════════════════════
   REUSABLE: Footer (bar only)
════════════════════════════════════════════════ */
function Footer() {
    return (
        <footer className="footer cs__footer">
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
                        <a href="https://www.instagram.com/klntaglr/" className="footer__bar-link">Instagram</a>
                        <a href="https://github.com/klntaglr" className="footer__bar-link">Github</a>
                        <a href="mailto:klentaguilar@gmail.com" className="footer__bar-link">Email</a>
                    </div>
                </div>
                <div className="footer__bar-menu">
                    <span className="footer__bar-label">Menu</span>
                    <div className="footer__bar-links">
                        <Link to="/" className="footer__bar-link">Home</Link>
                        <Link to="/works" className="footer__bar-link">Work</Link>
                        <Link to="/about-web-designer" className="footer__bar-link">About</Link>
                        <Link to="/contact-me" className="footer__bar-link">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
export default function CaseStudy() {
    const rootRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /* next-case card: tilt + "View" cursor (same behaviour as works cards) */
    const [nextHovered, setNextHovered] = useState(false);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const handleNextMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
        cursorX.set(e.clientX - rect.left);
        cursorY.set(e.clientY - rect.top);
    }, [cursorX, cursorY]);

    const handleNextLeave = useCallback((e) => {
        setNextHovered(false);
        e.currentTarget.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    }, []);

    /* ── smooth scroll + every gsap scroll animation ── */
    useLayoutEffect(() => {
        ScrollSmoother.get()?.kill();
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
        });
        smoother.scrollTop(0);

        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(rootRef);

            /* 1. hero intro */
            const tl = gsap.timeline({ delay: 0.25, defaults: { ease: "expo.out" } });
            tl.fromTo(q(".cs__hero .cs__mask-inner"), { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.07 })
              .fromTo(q(".cs__meta-col"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "-=0.8")
              .fromTo(q(".hero__scroll"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.6");

            /* 2. hero parallax: bg lags, copy drifts + fades */
            gsap.to(q(".cs__hero .hero__bg"), {
                y: 250,
                ease: "none",
                scrollTrigger: { trigger: ".cs__hero", start: "top top", end: "bottom top", scrub: true },
            });
            gsap.to(q(".cs__hero-content"), {
                y: -70,
                opacity: 0,
                ease: "none",
                scrollTrigger: { trigger: ".cs__hero", start: "top top", end: "65% top", scrub: true },
            });
            gsap.to(q(".cs__hero .hero__scroll"), {
                opacity: 0,
                ease: "none",
                scrollTrigger: { trigger: ".cs__hero", start: "top top", end: "25% top", scrub: true },
            });

            /* 3. body card rises in */
            gsap.fromTo(
                q(".cs__body"),
                { y: 70 },
                {
                    y: 0,
                    ease: "none",
                    scrollTrigger: { trigger: ".cs__body", start: "top 98%", end: "top 60%", scrub: 1.2 },
                }
            );

            /* 4. cover: clip-path open + inner scale (scrub, bidirectional) */
            gsap.fromTo(
                q(".cs__cover"),
                { clipPath: "inset(10% 8% round 28px)" },
                {
                    clipPath: "inset(0% 0% round 12px)",
                    ease: "none",
                    scrollTrigger: { trigger: ".cs__cover", start: "top 90%", end: "top 25%", scrub: 1.2 },
                }
            );
            gsap.fromTo(
                q(".cs__cover img"),
                { scale: 1.25 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: { trigger: ".cs__cover", start: "top 90%", end: "bottom 40%", scrub: 1.2 },
                }
            );

            /* 5. info rows: label + body stagger */
            q(".cs__row").forEach((row) => {
                gsap.fromTo(
                    row.children,
                    { y: 44, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.1,
                        ease: "power3.out",
                        stagger: 0.12,
                        scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none reverse" },
                    }
                );
            });

            /* 6. big headings: masked word reveal */
            q(".cs__heading, .cs__next-title").forEach((h) => {
                gsap.fromTo(
                    h.querySelectorAll(".cs__mask-inner"),
                    { yPercent: 115 },
                    {
                        yPercent: 0,
                        duration: 1.2,
                        ease: "expo.out",
                        stagger: 0.08,
                        scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none reverse" },
                    }
                );
            });

            /* 7. gallery: rise + inner image scale scrub */
            q(".cs__shot").forEach((shot) => {
                gsap.fromTo(
                    shot,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: { trigger: shot, start: "top 92%", toggleActions: "play none none reverse" },
                    }
                );
                gsap.fromTo(
                    shot.querySelector("img"),
                    { scale: 1.15 },
                    {
                        scale: 1,
                        ease: "none",
                        scrollTrigger: { trigger: shot, start: "top 95%", end: "bottom 40%", scrub: 1.2 },
                    }
                );
            });

            /* 8. next case */
            gsap.fromTo(
                q(".cs__next-label, .cs__next-card, .cs__next .works__cta"),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.1,
                    ease: "power3.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".cs__next", start: "top 75%", toggleActions: "play none none reverse" },
                }
            );
        }, rootRef);

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        const t = setTimeout(refresh, 400);

        return () => {
            clearTimeout(t);
            window.removeEventListener("load", refresh);
            ctx.revert();
            smoother.kill();
        };
    }, []);

    /* ── lock scroll while the menu is open (same as Russell.jsx) ── */
    useEffect(() => {
        const smoother = ScrollSmoother.get();
        const prevBody = document.body.style.overflow;
        const prevHtml = document.documentElement.style.overflow;
        const preventScroll = (e) => e.preventDefault();
        const preventKeyScroll = (e) => {
            if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) e.preventDefault();
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
            document.body.style.overflow = prevBody;
            document.documentElement.style.overflow = prevHtml;
            smoother?.paused(false);
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
            window.removeEventListener("keydown", preventKeyScroll);
        };
    }, [isMenuOpen]);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <main className="site-root cs" ref={rootRef}>
                    {/* ═════════ HERO ═════════ */}
                    <section className="hero cs__hero">
                        <div
                            className="hero__bg"
                            style={{ backgroundImage: `url(${spiralBackground})` }}
                            aria-hidden="true"
                        />
                        <div className="hero__glow" />
                        <div className="hero__overlay" />

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
                                onClick={() => setIsMenuOpen((p) => !p)}
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

                        <div className="cs__hero-content">
                            <SplitText as="h1" className="cs__title">{caseStudy.title}</SplitText>

                            <div className="cs__meta">
                                <div className="cs__meta-col">
                                    <span className="cs__meta-label">Client</span>
                                    <span className="cs__meta-value">{caseStudy.client}</span>
                                </div>
                                <div className="cs__meta-col">
                                    <span className="cs__meta-label">Year</span>
                                    <span className="cs__meta-value">{caseStudy.year}</span>
                                </div>
                                <div className="cs__meta-col cs__meta-col--services">
                                    <span className="cs__meta-label">Services</span>
                                    {caseStudy.services.map((s) => (
                                        <span key={s} className="cs__meta-value">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="hero__scroll">
                            <div className="scroll-ring">
                                <motion.span
                                    className="scroll-dot"
                                    animate={{ y: [0, 16, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ═════════ BODY CARD ═════════ */}
                    <section className="cs__body">
                        <div className="cs__cover">
                            <img src={caseStudy.cover} alt={`${caseStudy.client} project overview`} />
                        </div>

                                              <div className="cs__block cs__block--loose">
                            <InfoRow label="Background">
                                <p>{caseStudy.background.text}</p>
                                <a
                                    className="cs__link"
                                    href={caseStudy.background.link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="cs__link-dot" />
                                    {caseStudy.background.link.label}
                                </a>
                            </InfoRow>

                            <InfoRow label="Challenge">
                                {caseStudy.challenge.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </InfoRow>
                        </div>

                        <SplitText className="cs__heading">Key findings</SplitText>
                        <div className="cs__block">
                            {caseStudy.findings.map((f) => (
                                <InfoRow key={f.label} label={f.label}>
                                    <p>{f.text}</p>
                                </InfoRow>
                            ))}
                        </div>

                        <SplitText className="cs__heading">Key results</SplitText>
                        <div className="cs__block">
                            {caseStudy.results.map((r) => (
                                <InfoRow key={r.label} label={r.label}>
                                    {r.paragraphs.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </InfoRow>
                            ))}
                        </div>

                        <div className="cs__gallery">
                            <figure className="cs__shot cs__shot--main">
                                <img src={caseStudy.gallery.main.src} alt={caseStudy.gallery.main.caption} />
                                <figcaption>{caseStudy.gallery.main.caption}</figcaption>
                            </figure>
                            <div className="cs__shots-grid">
                                {caseStudy.gallery.small.map((s, i) => (
                                    <figure key={i} className="cs__shot">
                                        <img src={s.src} alt={s.caption || `Screen ${i + 1}`} />
                                        {s.caption && <figcaption>{s.caption}</figcaption>}
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ═════════ NEXT CASE ═════════ */}
                    <section className={`cs__next${nextHovered ? " is-hovered" : ""}`}>
                        <span className="cs__next-label">Next Case</span>
                        <SplitText className="cs__next-title">{caseStudy.next.name}</SplitText>

                        <Link
                            to={caseStudy.next.href}
                            className="cs__next-card"
                            onMouseEnter={() => setNextHovered(true)}
                            onMouseMove={handleNextMove}
                            onMouseLeave={handleNextLeave}
                        >
                            <motion.div
                                className="works__circle-cursor"
                                style={{ x: cursorX, y: cursorY }}
                                animate={{ opacity: nextHovered ? 1 : 0, scale: nextHovered ? 1 : 0.5 }}
                                transition={{
                                    x: { duration: 0.08, ease: "linear" },
                                    y: { duration: 0.08, ease: "linear" },
                                    opacity: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                                    scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                                }}
                            >
                                <span>Next</span>
                            </motion.div>
                            <img src={caseStudy.next.image} alt={`${caseStudy.next.name} preview`} />
                        </Link>

                        <div className="cs__next-line" />

                        <div className="works__cta">
                            <MagneticButton href="/works" className="cs__outline-btn">
                                See All Works <sup className="magnetic-btn__sup">(0)</sup>
                            </MagneticButton>
                        </div>
                    </section>

                    {/* ═════════ FOOTER ═════════ */}
                    <Footer />

                    <AnimatePresence mode="wait">
                        {isMenuOpen && (
                            <CurvedMenu id="site-navigation" onClose={() => setIsMenuOpen(false)} />
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}