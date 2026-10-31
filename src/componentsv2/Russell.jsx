import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP, GSAPSplitText);
import "./Russell.css";
import CurvedMenu from "./CurvedMenu";
import TiltMenu from "./TiltMenu";
import { FiCheck } from "react-icons/fi";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cursor02Icon, MousePointerClickIcon } from "@hugeicons/core-free-icons";
import bgImage from "../assets/v2bg.png";
import logoImage from "../assets/logo.png";
import projectImage from "../assets/placeholder.png";
import portraitImage from "../assets/grad.jpg";
import portraitImage1 from "../assets/mockup4.jpg";
// ← your about photo
import enov8tiveLogo from "../assets/enov8tive.png";
import rtcImage from "../assets/RTC.png";
import microsoftCert from "../assets/MicrosoftUX.png";
import googleCert from "../assets/GoogleUX.png";
import responsiveCert from "../assets/responsive.png";
import frontendCert from "../assets/frontend.png";
import bestDesignCert from "../assets/bestdesign.png";
import citeCert from "../assets/CITE1.png";
import enoCerti from "../assets/enocerti.jpg";
import spiralBackground from "../assets/spiralbg.webp";
export function MagneticButton({ children, href, ...props }) {
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
/* ── SplitText: masked word-by-word reveal ── */
function SplitText({ as: Tag = "h2", className = "", children, ...rest }) {
    const words = String(children).split(" ");
    return (
        <Tag className={className} {...rest}>
            {words.map((w, i) => (
                <span key={i}>
                    <span className="rs-mask">
                        <span className="rs-mask__inner">{w}</span>
                    </span>
                    {i < words.length - 1 ? " " : ""}
                </span>
            ))}
        </Tag>
    );
}

export default function Russell() {
    const rootRef = useRef(null);
    const showcaseRef = useRef(null);
    const rollingRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [copiedLabel, setCopiedLabel] = useState("");
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
            id: "enov8tive-recognition",
            issuer: "Enov8tive",
            title: "Most Promising New Hire",
            date: "Sep 2026",
            source: "Taguig City",
            preview: enoCerti,
            link: null,
        }, {
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

    const copyContact = async (value, label) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedLabel(label);
            window.setTimeout(() => setCopiedLabel(""), 2200);
        } catch {
            setCopiedLabel("");
        }
    };
    const rollingItems = ["UI/UX designer.", "web designer.", "mobile designer."];

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





    /* smoother is created in the gsap effect below */

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
    /* ── ScrollSmoother + every gsap scroll animation ── */
    useLayoutEffect(() => {
        ScrollSmoother.get()?.kill();
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.2,
            effects: true,
        });
        smoother.scrollTop(0);

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            document.querySelectorAll(".about__word").forEach((w) => (w.style.color = "#ffffff"));
            return () => smoother.kill();
        }

        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(rootRef);

            /* 1. hero: copy fades out on scroll (bg stays still, cheaper) */
            gsap.to(q(".hero__content"), {
                y: -70,
                opacity: 0,
                ease: "none",
                scrollTrigger: { trigger: ".hero", start: "top top", end: "65% top", scrub: true },
            });
            gsap.to(q(".hero__scroll"), {
                opacity: 0,
                ease: "none",
                scrollTrigger: { trigger: ".hero", start: "top top", end: "25% top", scrub: true },
            });

            /* 1b. works title + badge */
            gsap.fromTo(
                q(".works__title .rs-mask__inner"),
                { yPercent: 115 },
                {
                    yPercent: 0,
                    duration: 1.2,
                    ease: "expo.out",
                    stagger: 0.08,
                    scrollTrigger: { trigger: ".works__title", start: "top 88%", toggleActions: "play none none reverse" },
                }
            );
            gsap.fromTo(
                q(".works__badge"),
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".works__title", start: "top 88%", toggleActions: "play none none reverse" },
                }
            );

            /* 2. certs title + badge */
            gsap.fromTo(
                q(".certs__title .rs-mask__inner"),
                { yPercent: 115 },
                {
                    yPercent: 0,
                    duration: 1.2,
                    ease: "expo.out",
                    stagger: 0.08,
                    scrollTrigger: { trigger: ".certs__title", start: "top 88%", toggleActions: "play none none reverse" },
                }
            );
            gsap.fromTo(
                q(".certs__badge"),
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".certs__title", start: "top 88%", toggleActions: "play none none reverse" },
                }
            );

            /* 5. cert groups: label + table stagger */
            q(".certs__group").forEach((group) => {
                gsap.fromTo(
                    group.children,
                    { y: 44, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.1,
                        ease: "power3.out",
                        stagger: 0.12,
                        scrollTrigger: { trigger: group, start: "top 88%", toggleActions: "play none none reverse" },
                    }
                );
            });

            /* 6. about card — bidirectional scrub */
            const card = aboutCardRef.current;
            if (card) {
                gsap.fromTo(
                    card,
                    { y: 90, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: { trigger: card, start: "top 92%", end: "top 38%", scrub: 1.2 },
                    }
                );
            }

            /* 7. about: word-by-word colour fill */
            const words = q(".about__word");
            if (words.length) {
                const total = words.length;
                words.forEach((w) => gsap.set(w, { color: "#2a2a2a" }));

                ScrollTrigger.create({
                    trigger: ".about__headline",
                    start: "top 78%",
                    end: "bottom 55%",
                    scrub: 1.8,
                    onUpdate(self) {
                        const band = 1 / total;
                        words.forEach((w, i) => {
                            const wordProgress = Math.max(
                                0,
                                Math.min(1, (self.progress - (i / total) * 0.6) / (band * 2.2))
                            );
                            const v = Math.round(wordProgress * (255 - 42) + 42);
                            w.style.color = `rgb(${v}, ${v}, ${v})`;
                        });
                    },
                });
            }

            /* 8. footer */
            gsap.fromTo(
                q(".footer .rs-mask__inner"),
                { yPercent: 115 },
                {
                    yPercent: 0,
                    duration: 1.2,
                    ease: "expo.out",
                    stagger: 0.08,
                    scrollTrigger: { trigger: ".footer__top", start: "top 88%", toggleActions: "play none none reverse" },
                }
            );
            gsap.fromTo(
                q(".footer__avatar"),
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "back.out(1.6)",
                    scrollTrigger: { trigger: ".footer__top", start: "top 88%", toggleActions: "play none none reverse" },
                }
            );
            gsap.fromTo(
                q(".footer__divider-line"),
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: 1.4,
                    ease: "expo.out",
                    scrollTrigger: { trigger: ".footer__divider-row", start: "top 92%", toggleActions: "play none none reverse" },
                }
            );
            gsap.fromTo(
                q(".footer__contacts, .footer__bar"),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.1,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: { trigger: ".footer__contacts", start: "top 95%", toggleActions: "play none none reverse" },
                }
            );
        }, rootRef);

        return () => {
            ctx.revert();
            smoother.kill();
        };
    }, []);

    const showcaseAnimation = useGSAP(() => {
        const showcase = showcaseRef.current;
        if (!showcase) return undefined;

        gsap.ticker.lagSmoothing(500, 33);

        const PERSPECTIVE = 1300;
        const card = showcase.querySelector(".showcase__card");
        const marqueeWrap = showcase.querySelector(".showcase__marquee");
        const revealWrap = showcase.querySelector(".showcase__reveal");
        const flippers = [card];
        const layers = Array.from(showcase.querySelectorAll(".showcase__layer"));
        const images = Array.from(showcase.querySelectorAll(".showcase__media img"));
        const marqueeTracks = Array.from(showcase.querySelectorAll(".showcase__marquee-track"));
        const revealWords = Array.from(showcase.querySelectorAll(".showcase__reveal-word"));
        const splitRecords = revealWords.map((element) => ({
            project: element.dataset.projectWord,
            split: new GSAPSplitText(element, {
                type: "chars",
                mask: "chars",
                charsClass: "showcase__char",
                aria: "auto",
            }),
        }));
        const charsByProject = {
            bol: splitRecords.filter((record) => record.project === "bol").flatMap((record) => record.split.chars),
            iquality: splitRecords.filter((record) => record.project === "iquality").flatMap((record) => record.split.chars),
        };

        const marqueeUnits = marqueeTracks.map((track) => track.firstElementChild);
        const marqueeSizes = marqueeTracks.map(() => 0);
        const marqueeOffsets = marqueeTracks.map(() => 0);
        const marqueeClones = [];
        marqueeTracks.forEach((track, i) => {
            const unit = marqueeUnits[i];
            const w = unit.getBoundingClientRect().width;
            marqueeSizes[i] = w;
            if (!w) return;
            const copies = Math.ceil(Math.max(window.innerWidth, window.screen.width) / w) + 2;
            for (let c = 0; c < copies; c += 1) {
                const clone = unit.cloneNode(true);
                track.appendChild(clone);
                marqueeClones.push(clone);
            }
        });
        const unitObserver = typeof ResizeObserver === "undefined"
            ? null
            : new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    const i = marqueeUnits.indexOf(entry.target);
                    if (i > -1) marqueeSizes[i] = entry.target.getBoundingClientRect().width;
                });
            });
        marqueeUnits.forEach((unit) => unitObserver?.observe(unit));

        const MARQUEE_SPEED = 70; // px per second, taasan para bumilis
        const marqueeTick = (time, deltaTime) => {
            if (!motionAllowed || !inView || document.hidden) return;
            const i = activeIndex;
            const w = marqueeSizes[i];
            if (!w) return;
            const dir = i === 0 ? -1 : 1;
            marqueeOffsets[i] = (marqueeOffsets[i] + (dir * MARQUEE_SPEED * deltaTime) / 1000) % w;
            const x = marqueeOffsets[i] > 0 ? marqueeOffsets[i] - w : marqueeOffsets[i];
            marqueeTracks[i].style.transform = `translate3d(${x}px, -50%, 0)`;
        };
        gsap.ticker.add(marqueeTick);

        const marqueeOut = Array.from(marqueeTracks[0].children);
        const marqueeIn = Array.from(marqueeTracks[1].children);

        let disposed = false;
        let media;
        let resizeTimer;
        let imagesReady = false;
        let inView = true;
        let motionAllowed = true;
        let activeIndex = 0;

        const syncMarqueePlayback = () => {
            const pageVisible = !document.hidden;
            marqueeTracks.forEach((track, index) => {
                const active = activeIndex === index;
                const shouldRun = motionAllowed && inView && pageVisible && active;
                track.dataset.active = String(active);
                track.style.opacity = active ? "1" : "0";
                track.style.animationPlayState = shouldRun ? "running" : "paused";
                track.style.willChange = shouldRun ? "transform" : "auto";
            });
        };

        const applyActive = (idx, { fade = false, force = false } = {}) => {
            if (!force && idx === activeIndex) return;
            activeIndex = idx;
            layers.forEach((layer, i) => {
                const on = i === idx;
                if (!fade) gsap.set(layer, { autoAlpha: on ? 1 : 0 });
                layer.style.pointerEvents = on ? "auto" : "none";
                layer.setAttribute("aria-hidden", on ? "false" : "true");
                layer.tabIndex = on ? 0 : -1;
            });
            syncMarqueePlayback();
        };

        const observer = typeof IntersectionObserver === "undefined"
            ? null
            : new IntersectionObserver(([entry]) => {
                inView = entry.isIntersecting;
                syncMarqueePlayback();
            }, { threshold: 0.05 });
        if (observer) observer.observe(showcase);
        else inView = true;

        const handleVisibilityChange = () => syncMarqueePlayback();
        document.addEventListener("visibilitychange", handleVisibilityChange);
        const handleResize = () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => {
                if (imagesReady && !disposed) ScrollTrigger.refresh();
            }, 220);
        };
        window.addEventListener("resize", handleResize, { passive: true });

        const initializeTimelines = showcaseAnimation.contextSafe(() => {
            if (disposed) return;

            media = gsap.matchMedia();
            media.add({
                reduce: "(prefers-reduced-motion: reduce)",
                mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
                desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
            }, ({ conditions }) => {
                const { reduce, mobile } = conditions;
                const lowPower = typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 8) <= 4;
                const revealStagger = mobile || lowPower ? 0 : 0.012;
                motionAllowed = !reduce;
                syncMarqueePlayback();

                gsap.set(flippers, { rotateX: 0, willChange: "auto" });
                gsap.set([marqueeWrap, revealWrap], { transformPerspective: PERSPECTIVE });
                gsap.set(layers[0], { autoAlpha: 1, opacity: 1 });
                gsap.set(layers[1], reduce ? { autoAlpha: 1, opacity: 0 } : { autoAlpha: 0 });
                gsap.set(revealWords, { opacity: reduce ? 0 : 1 });
                gsap.set(revealWords[0], { opacity: 1 });
                applyActive(0, { fade: reduce, force: true });
                gsap.set(marqueeOut, { yPercent: 0 });
                gsap.set(marqueeIn, { yPercent: reduce ? 0 : -100 });
                gsap.set(charsByProject.bol, { yPercent: 0 });
                gsap.set(charsByProject.iquality, { yPercent: reduce ? 0 : 100 });

                const timeline = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: showcase,
                        start: "top top",
                        end: () => `+=${Math.round(window.innerHeight * 1.65)}`,
                        pin: true,
                        pinSpacing: true,
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                        refreshPriority: 1,
                    },
                });
                timeline.addLabel("start", 0).addLabel("mid", 0.5).addLabel("end", 1);
                timeline.eventCallback("onUpdate", () =>
                    applyActive(timeline.progress() >= 0.5 ? 1 : 0, { fade: reduce })
                );

                if (reduce) {
                    timeline
                        .to(layers[0], { opacity: 0, duration: 1 }, "start")
                        .to(layers[1], { opacity: 1, duration: 1 }, "start")
                        .to(revealWords.filter((word) => word.dataset.projectWord === "bol"), { opacity: 0, duration: 1 }, "start")
                        .to(revealWords.filter((word) => word.dataset.projectWord === "iquality"), { opacity: 1, duration: 1 }, "start");
                } else {
                    const maxRotation = 90;
                    const revealDuration = 0.12;
                    const outgoingStaggerSpan = revealStagger * Math.max(0, charsByProject.bol.length - 1);
                    const outgoingStart = 0.5 - revealDuration - outgoingStaggerSpan;
                    timeline
                        .to(flippers, { rotateX: maxRotation, duration: 0.5, ease: "power1.in" }, "start")
                        .to(marqueeOut, { yPercent: 100, duration: 0.5, ease: "power1.in" }, "start")
                        .fromTo(marqueeIn,
                            { yPercent: -100 },
                            { yPercent: 0, duration: 0.5, ease: "power1.out", immediateRender: false },
                            "mid")
                        .to(charsByProject.bol, {
                            yPercent: -100,
                            duration: revealDuration,
                            ease: "power2.in",
                            stagger: revealStagger,
                        }, outgoingStart)
                        .fromTo(charsByProject.iquality,
                            { yPercent: 100 },
                            {
                                yPercent: 0,
                                duration: revealDuration,
                                ease: "power2.out",
                                stagger: revealStagger,
                                immediateRender: false,
                            }, 0.475)
                        .fromTo(flippers,
                            { rotateX: -maxRotation },
                            {
                                rotateX: 0,
                                duration: 0.5,
                                ease: "power1.out",
                                immediateRender: false,
                            }, "mid");
                }

                if (!reduce) {
                    const clearCardWillChange = () => gsap.set(flippers, { clearProps: "willChange" });
                    timeline.eventCallback("onStart", () => gsap.set(flippers, { willChange: "transform" }));
                    timeline.eventCallback("onComplete", clearCardWillChange);
                    timeline.eventCallback("onReverseComplete", clearCardWillChange);
                }

                return () => {
                    timeline.scrollTrigger?.kill();
                    timeline.kill();
                };
            });

            imagesReady = true;
            ScrollTrigger.refresh();
            syncMarqueePlayback();
        });

        Promise.all(images.map((image) => (
            typeof image.decode === "function"
                ? image.decode().catch(() => undefined)
                : Promise.resolve()
        ))).then(initializeTimelines);

        return () => {
            disposed = true;
            gsap.ticker.remove(marqueeTick);
            unitObserver?.disconnect();
            marqueeClones.forEach((node) => node.remove());
            marqueeTracks.forEach((track) => track.style.removeProperty("transform"));
            observer?.disconnect();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("resize", handleResize);
            window.clearTimeout(resizeTimer);
            media?.revert();
            splitRecords.forEach(({ split }) => split.revert());
            gsap.set(flippers, { clearProps: "willChange" });
            marqueeTracks.forEach((track, index) => {
                track.style.removeProperty("animation-play-state");
                track.style.removeProperty("will-change");
                track.style.removeProperty("opacity");
                track.dataset.active = String(index === 0);
            });
        };
    }, { scope: showcaseRef });

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <main className="site-root" ref={rootRef}>
                    {/* circle cursor */}
                    {/* moved INSIDE the works section below — delete this */}
                    <section className="hero">
                        {/* bg gradient */}
                        <div
                            className="hero__bg"
                            style={{ backgroundImage: `url(${spiralBackground})` }}
                            aria-hidden="true"
                        />
                        {/* ambient glow */}
                        <div className="hero__glow" />
                        {/* vignette */}
                        <div className="hero__overlay" />

                        {/* ── NAV ── */}
                        <nav className="hero__nav">

                            <motion.button
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
                            <motion.a
                                href="#"
                                className="hero__logo-wrap"
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <img src={logoImage} alt="Russell Aguilar" className="hero__logo" />
                            </motion.a>
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
                                            mobile designer.
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
                                Passionately creating digital experiences that look good, feel right, and work for people.
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

                    <section className="works" id="selected-works">
                        <div className="works__header">
                            <SplitText className="works__title">Selected works</SplitText>
                            <span className="works__badge">(2)</span>
                        </div>

                        <div className="works__showcase" ref={showcaseRef} role="region" aria-label="Featured project showcase">
                            <div className="showcase__marquee" aria-hidden="true">
                                <div className="showcase__marquee-track" data-project-word="bol" data-active="true">
                                    <span>BOL</span>
                                </div>
                                <div className="showcase__marquee-track" data-project-word="iquality" data-active="false">
                                    <span>IQUALITY</span>
                                </div>
                            </div>

                            <div className="showcase__reveal" aria-hidden="true">
                                <span className="showcase__reveal-mask">
                                    <span className="showcase__reveal-word" data-project-word="bol">BOL</span>
                                </span>
                                <span className="showcase__reveal-mask">
                                    <span className="showcase__reveal-word" data-project-word="iquality">IQUALITY</span>
                                </span>
                            </div>

                            <div className="showcase__stage">
                                <div className="showcase__card">
                                    <Link
                                        to="/works/bol"
                                        className="showcase__layer showcase__layer--a"
                                        aria-label="View AI Gift Finder project"
                                        aria-hidden="false"
                                        tabIndex={0}
                                    >
                                        <div className="showcase__media">
                                            <div className="showcase__frame">
                                                <img
                                                    src={projectImage}
                                                    alt="AI Gift Finder app mockup"
                                                    decoding="async"
                                                    fetchPriority="high"
                                                />
                                            </div>
                                        </div>
                                        <span className="showcase__notch" aria-hidden="true">
                                            <HugeiconsIcon icon={Cursor02Icon} className="showcase__icon showcase__icon--idle" />
                                            <HugeiconsIcon icon={MousePointerClickIcon} className="showcase__icon showcase__icon--hover" />
                                        </span>
                                        <div className="showcase__footer">
                                            <h3>AI Gift Finder</h3>
                                            <div className="showcase__tags" aria-label="Project disciplines">
                                                <span>AI</span>
                                                <span>UX research</span>
                                                <span>App design</span>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link
                                        to="/works"
                                        className="showcase__layer showcase__layer--b"
                                        aria-label="View Iquality's Dashboard project"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                    >
                                        <div className="showcase__media">
                                            <div className="showcase__frame">
                                                <img
                                                    src={projectImage}
                                                    alt="Iquality's Dashboard project mockup"
                                                    decoding="async"
                                                    loading="eager"
                                                    fetchPriority="low"
                                                />
                                            </div>
                                        </div>
                                        <span className="showcase__notch" aria-hidden="true">
                                            <HugeiconsIcon icon={Cursor02Icon} className="showcase__icon showcase__icon--idle" />
                                            <HugeiconsIcon icon={MousePointerClickIcon} className="showcase__icon showcase__icon--hover" />
                                        </span>
                                        <div className="showcase__footer">
                                            <h3>Iquality's Dashboard</h3>
                                            <div className="showcase__tags" aria-label="Project disciplines">
                                                <span>Product design</span>
                                                <span>Design system</span>
                                                <span>Branding</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="works__cta">
                            <MagneticButton href="/works">See All Works <sup className="magnetic-btn__sup">(2)</sup></MagneticButton>
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
                            <SplitText className="certs__title">Certifications & Experience</SplitText>
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
                                    "I make things ",
                                    "that make me feel.",
                                    "Because once, ",
                                    "someone else's work",
                                    "made me feel ",
                                    "the same. ",
                                    "Now I create",
                                    "with the hope ",
                                    "of passing ",
                                    "that feeling on."


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
                                    <SplitText className="footer__title">Let's work</SplitText>
                                </div>
                                <SplitText className="footer__title">together</SplitText>
                            </div>
                        </div>

                        {/* divider with circle CTA sitting on the line */}
                        <div className="footer__divider-row">
                            <div className="footer__divider-line" />
                            <MagneticButton href="/contact-me" className="footer__cta">Get in Touch</MagneticButton>
                        </div>
                        <div className="footer__contacts">
                            <MagneticButton className={`footer__pill-btn${copiedLabel === "Email" ? " is-copied" : ""}`} onClick={() => copyContact("klentaguilar@gmail.com", "Email")}>
                                {copiedLabel === "Email" ? <><FiCheck aria-hidden="true" /> Email copied</> : "klentaguilar@gmail.com"}
                            </MagneticButton>
                            <MagneticButton className={`footer__pill-btn${copiedLabel === "Phone" ? " is-copied" : ""}`} onClick={() => copyContact("+63 967 217 9685", "Phone")}>
                                {copiedLabel === "Phone" ? <><FiCheck aria-hidden="true" /> Phone copied</> : "+63 967 217 9685"}
                            </MagneticButton>
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
                                    <Link to="/" className="footer__bar-link">Home</Link>
                                    <Link to="/works" className="footer__bar-link">Work</Link>
                                    <Link to="/about-web-designer" className="footer__bar-link">About</Link>
                                    <Link to="/contact-me" className="footer__bar-link">Contact</Link>
                                </div>
                            </div>
                        </div>
                    </footer>

                    <TiltMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                </main>
            </div>
        </div>
    );
}
