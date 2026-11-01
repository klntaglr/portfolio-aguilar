import { useLayoutEffect, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import menuImage from "../assets/behindbg.jpg";

/* tunables */
const TILT = { rotate: -10, scale: 1, xVW: 0.42, yVH: 0.4, duration: 1, ease: "power3.inOut" };
const LINKS = [
    { label: "Home", to: "/" },
    { label: "Work", to: "/works" },
    { label: "About", to: "/about-web-designer" },
    { label: "Contact", to: "/contact-me" },
];

/* shared flag: the next page's TiltMenu starts tilted, then closes */
export const menuNav = { pending: false };

const getWrapper = () =>
    document.getElementById("smooth-wrapper") || document.getElementById("contact-smooth-wrapper");

export default function TiltMenu({ open, onClose }) {
    const panelRef = useRef(null);
    const closeRef = useRef(null);
    const first = useRef(true);
    const navigate = useNavigate();
    const location = useLocation();

    useLayoutEffect(() => {
        const wrapper = getWrapper();
        const panel = panelRef.current;
        const closeBtn = closeRef.current;
        if (!wrapper || !panel) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const inners = panel.querySelectorAll(".tm__link-inner");
        const bg = panel.querySelector(".tm__img");

        const closeAnim = (delay = 0) => {
            gsap.to(closeBtn, { autoAlpha: 0, duration: 0.25, delay });
            gsap.to(inners, { autoAlpha: 0, duration: 0.25, stagger: 0.02, delay });
            gsap.to(wrapper, {
                rotate: 0,
                scale: 1,
                x: 0,
                y: 0,
                borderRadius: 0,
                duration: 0.9,
                delay,
                ease: "power3.inOut",
                onComplete: () => {
                    gsap.set(wrapper, { clearProps: "transform,willChange,transformOrigin" });
                    gsap.set(panel, { autoAlpha: 0 });
                    gsap.set(inners, { yPercent: 115, autoAlpha: 1 });
                },
            });
        };

        if (first.current) {
            first.current = false;

            if (menuNav.pending) {
                /* arrived from the menu: start already tilted, then close smoothly */
                menuNav.pending = false;
                gsap.set(wrapper, {
                    transformOrigin: "0% 0%",
                    rotate: reduce ? 0 : TILT.rotate,
                    scale: TILT.scale,
                    x: window.innerWidth * TILT.xVW,
                    y: window.innerHeight * TILT.yVH,
                    willChange: "transform",
                });
                gsap.set(panel, { autoAlpha: 1 });
                gsap.set(closeBtn, { autoAlpha: 1 });
                gsap.set(inners, { yPercent: 0, autoAlpha: 1 });
                gsap.set(bg, { y: 0, opacity: 1 });
                closeAnim(0.35);
            } else {
                gsap.set(panel, { autoAlpha: 0 });
                gsap.set(closeBtn, { autoAlpha: 0 });
                gsap.set(inners, { yPercent: 115 });
            }
            return;
        }

        gsap.killTweensOf([wrapper, panel, closeBtn, inners, bg]);

        if (open) {
            gsap.set(wrapper, { transformOrigin: "0% 0%", borderRadius: 0, willChange: "transform" });
            gsap.set(panel, { autoAlpha: 1 });
            gsap.to(closeBtn, { autoAlpha: 1, duration: 0.4, delay: 0.3 });
            gsap.to(wrapper, {
                rotate: reduce ? 0 : TILT.rotate,
                scale: TILT.scale,
                x: window.innerWidth * TILT.xVW,
                y: window.innerHeight * TILT.yVH,
                duration: TILT.duration,
                ease: TILT.ease,
            });
            gsap.set(bg, { y: 0, opacity: 1 });
            gsap.to(inners, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.08, delay: 0.35 });
        } else {
            closeAnim(0);
        }
    }, [open]);

    /* Esc + click the tilted page to close */
    useEffect(() => {
        if (!open) return undefined;
        const wrapper = getWrapper();
        const onKey = (e) => e.key === "Escape" && onClose();
        const onWrapperClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        };
        window.addEventListener("keydown", onKey);
        wrapper?.addEventListener("click", onWrapperClick, true);
        return () => {
            window.removeEventListener("keydown", onKey);
            wrapper?.removeEventListener("click", onWrapperClick, true);
        };
    }, [open, onClose]);

    const go = (e, to) => {
        e.preventDefault();
        if (to === location.pathname) {
            onClose();
            return;
        }
        menuNav.pending = true;
        navigate(to, { state: { fromMenu: true } });
    };

    return createPortal(
        <>
            <div className="tm" ref={panelRef} aria-hidden={!open}>
                <i className="tm__line" style={{ left: "12.5%" }} />
                <i className="tm__line" style={{ left: "37.5%" }} />
                <i className="tm__line" style={{ left: "62.5%" }} />
                <i className="tm__line" style={{ left: "87.5%" }} />

                <nav className="tm__nav" id="site-navigation">
                    {LINKS.map((l) => (
                        <Link key={l.to} to={l.to} className="tm__link" onClick={(e) => go(e, l.to)} tabIndex={open ? 0 : -1}>
                            <span className="tm__link-mask">
                                <span className="tm__link-inner">{l.label}</span>
                            </span>
                        </Link>
                    ))}
                </nav>

                <img className="tm__img" src={menuImage} alt="" />
            </div>

            <button type="button" className="tm__close" ref={closeRef} onClick={onClose} tabIndex={open ? 0 : -1}>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
                <span>Close</span>
            </button>
        </>,
        document.body
    );
}