import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CurvedMenu from "./CurvedMenu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./Worksv2.css";

import bgImage from "../assets/v2bg.png";
import logoImage from "../assets/logo.png";
import portraitImage from "../assets/grad.jpg";
import bangkalProject from "../assets/bangkalproject.png";
import laconslanetProject from "../assets/laconslanetproject.png";
import virielleProject from "../assets/virielleproject.png";
import arielleProject from "../assets/arielleproject.png";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const WORKS = [
    {
        title: "bol's inspiring way of gift giving.",
        meta: "AI Design / Web Research & Writeup / UX Design",
        image: arielleProject,
        href: "/projects/virielle",
    },
    {
        title: "kqulity's data visualization.",
        meta: "Product Design / Dashboard / Computing",
        image: laconslanetProject,
        href: "/projects/laconslanet",
    },
    {
        title: "Central Belher's salvation mirror.",
        meta: "Service Design / Computing / App Design",
        image: bangkalProject,
        href: "/projects/qrush",
    },
    {
        title: "Greenpatch tree with accessibility.",
        meta: "Product Design / User Research & Testing / A11Y",
        image: virielleProject,
        href: "/projects/virielle",
    },
];

function MagneticButton({ children, className = "", href }) {
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
        const fill = fillRef.current;
        if (!fill) return;

        const rect = e.currentTarget.getBoundingClientRect();
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

        const rect = e.currentTarget.getBoundingClientRect();
        gsap.killTweensOf(fill);
        gsap.set(fill, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
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

    const Component = href ? "a" : "button";

    return (
        <Component
            ref={btnRef}
            href={href}
            type={href ? undefined : "button"}
            className={`magnetic-btn${className ? ` ${className}` : ""}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span ref={fillRef} className="magnetic-btn__fill" />
            <span className="magnetic-btn__text">{children}</span>
        </Component>
    );
}

export default function Worksv2() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const existing = ScrollSmoother.get();
        if (existing) existing.kill();

        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
            smoothTouch: 0.08,
        });

        ScrollTrigger.refresh();
        return () => {
            smoother?.kill();
        };
    }, []);

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const ctx = gsap.context(() => {
            gsap.utils.toArray(".worksv2-card").forEach((card) => {
                gsap.fromTo(
                    card,
                    reduceMotion
                        ? { autoAlpha: 0 }
                        : { autoAlpha: 0, y: 44, rotateX: 10, scale: 0.98 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                            once: true,
                        },
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <main className="worksv2-root">
                    <section className="hero worksv2-hero">
                        <div className="hero__bg worksv2-hero__bg" style={{ backgroundImage: `url(${bgImage})` }} />
                        <div className="hero__glow" />
                        <div className="hero__overlay" />

                        <nav className="hero__nav">
                          <motion.button
                                className="hero__menu"
                                type="button"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="menu-icon" aria-hidden="true">
                                    <span />
                                    <span />
                                </span>
                                <span className="menu-label">Menu</span>
                            </motion.button>

                            <motion.a
                                href="/"
                                className="hero__logo-wrap"
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <img src={logoImage} alt="Russell Aguilar" className="hero__logo" />
                            </motion.a>
                        </nav>

                        <div className="hero__content worksv2-hero__content">
                            <h1 className="hero__headline worksv2-hero__headline">
                                <motion.span
                                    className="hero__line"
                                    initial={{ opacity: 0, y: 64 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="dim">Here is some of my </span>
                                    <span className="bright">Work.</span>
                                </motion.span>
                                <motion.span
                                    className="hero__line"
                                    initial={{ opacity: 0, y: 64 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.1, delay: 0.57, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="dim">I've worked in </span>
                                    <span className="bright">technology.</span>
                                </motion.span>
                            </h1>

                            <motion.p
                                className="hero__sub worksv2-hero__sub"
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            >
                                Passionately creating innovative digital experiences, rooted in user needs.
                            </motion.p>
                        </div>

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

                    <section className="worksv2-work" id="work">
                        <div className="worksv2-work__inner">
                            <div className="worksv2-work__header">
                                <h2 className="worksv2-work__title">Work</h2>
                                <span className="worksv2-work__count">(4)</span>
                            </div>

                            <div className="worksv2-grid">
                                {WORKS.map((work) => (
                                    <a
                                        className="worksv2-card"
                                        href={work.href}
                                        key={work.title}
                                    >
                                        <div className="worksv2-card__media">
                                            <img src={work.image} alt={`${work.title} project preview`} />
                                        </div>
                                        <div className="worksv2-card__copy">
                                            <h3>{work.title}</h3>
                                            <p>{work.meta}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="worksv2-work__cta">
                                <MagneticButton className="worksv2-archives-btn">
                                    Archives <sup className="magnetic-btn__sup">(11)</sup>
                                </MagneticButton>
                            </div>
                        </div>
                    </section>

                    <footer className="footer worksv2-footer">
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
                            <MagneticButton className="footer__cta" href="/contact-me">Get in Touch</MagneticButton>
                        </div>

                        <div className="footer__contacts">
                            <MagneticButton className="footer__pill-btn" href="mailto:klentaguilar@gmail.com">
                                klentaguilar@gmail.com
                            </MagneticButton>
                            <MagneticButton className="footer__pill-btn" href="tel:+639672179685">
                                +63 967 217 9685
                            </MagneticButton>
                        </div>

                        <div className="footer__bar">
                            <div className="footer__bar-col">
                                <span className="footer__bar-label">Credits</span>
                                <div className="footer__bar-links">
                                    <span className="footer__bar-link">© Russell Aguilar - 2026</span>
                                </div>
                            </div>
                            <div className="footer__bar-col">
                                <span className="footer__bar-label">Contact</span>
                                <div className="footer__bar-links">
                                    <a href="https://linkedin.com" className="footer__bar-link">LinkedIn</a>
                                    <a href="https://instagram.com" className="footer__bar-link">Instagram</a>
                                    <a href="https://github.com" className="footer__bar-link">Github</a>
                                    <a href="mailto:klentaguilar@gmail.com" className="footer__bar-link">Email</a>
                                </div>
                            </div>
                            <div className="footer__bar-menu">
                                <span className="footer__bar-label">Menu</span>
                                <div className="footer__bar-links">
                                    <a href="/" className="footer__bar-link">Home</a>
                                    <a href="/works" className="footer__bar-link">Work</a>
                                    <a href="/about-web-designer" className="footer__bar-link">About</a>
                                    <a href="/contact-me" className="footer__bar-link">Contact</a>
                                </div>
                            </div>
                        </div>
        </footer>

                    <AnimatePresence mode="wait">
                        {isMenuOpen && (
                            <CurvedMenu onClose={() => setIsMenuOpen(false)} />
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}