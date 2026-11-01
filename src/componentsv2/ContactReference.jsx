import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Link } from "react-router-dom";
import CurvedMenu from "./CurvedMenu";
import TiltMenu from "./TiltMenu";
import logo from "../assets/logo.png";
import portrait from "../assets/grad.jpg";
import "./ContactReference.css";

gsap.registerPlugin(ScrollSmoother);

const CONTACT_EMAIL = "klentaguilar@gmail.com";
const CONTACT_PHONE = "+63 967 217 9685";
const INITIAL_FORM = { name: "", email: "", company: "", role: "", message: "" };

function MagneticButton({ children, type = "button", disabled = false }) {
    const buttonRef = useRef(null);
    const fillRef = useRef(null);

    const handleMove = useCallback((event) => {
        const button = buttonRef.current;
        if (!button) return;
        const rect = button.getBoundingClientRect();
        gsap.to(button, {
            x: (event.clientX - rect.left - rect.width / 2) * 0.25,
            y: (event.clientY - rect.top - rect.height / 2) * 0.25,
            duration: 0.35,
            ease: "power2.out",
        });
    }, []);

    const handleEnter = useCallback((event) => {
        const button = buttonRef.current;
        const fill = fillRef.current;
        if (!button || !fill) return;
        const rect = event.currentTarget.getBoundingClientRect();
        gsap.killTweensOf(button);
        gsap.killTweensOf(fill);
        gsap.set(fill, { x: event.clientX - rect.left, y: event.clientY - rect.top, xPercent: -50, yPercent: -50, scale: 0 });
        gsap.to(fill, { scale: 90, duration: 1.2, ease: "expo.out" });
    }, []);

    const handleLeave = useCallback((event) => {
        const button = buttonRef.current;
        const fill = fillRef.current;
        if (!button || !fill) return;
        const rect = event.currentTarget.getBoundingClientRect();
        gsap.killTweensOf(button);
        gsap.killTweensOf(fill);
        gsap.set(fill, { x: event.clientX - rect.left, y: event.clientY - rect.top, xPercent: -50, yPercent: -50 });
        gsap.to(fill, { scale: 0, duration: 0.5, ease: "power2.inOut" });
        gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.35)" });
    }, []);

    return (
        <button ref={buttonRef} className="contact-form__submit" type={type} disabled={disabled} aria-busy={disabled} onMouseMove={handleMove} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <span ref={fillRef} className="contact-form__submit-fill" />
            <span className="contact-form__submit-text">{children}</span>
        </button>
    );
}

export default function ContactReference() {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [status, setStatus] = useState({ type: "idle", message: "" });
    const [copiedLabel, setCopiedLabel] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [website, setWebsite] = useState("");
    const lastSubmitRef = useRef(0);

    useEffect(() => {
        const smoother = ScrollSmoother.create({ wrapper: "#contact-smooth-wrapper", content: "#contact-smooth-content", smooth: 1.35, effects: true, smoothTouch: 0.08 });
        return () => smoother?.kill();
    }, []);

    useEffect(() => {
        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            ScrollSmoother.get()?.paused(true);
        }
        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            ScrollSmoother.get()?.paused(false);
        };
    }, [isMenuOpen]);

    const updateField = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const copyContact = async (event, value, label) => {
        event.preventDefault();
        try {
            await navigator.clipboard.writeText(value);
            setCopiedLabel(label);
            window.setTimeout(() => setCopiedLabel(""), 2200);
        } catch {
            setStatus({ type: "error", message: `Could not copy ${label.toLowerCase()}.` });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;
        if (website.trim()) return;

        const now = Date.now();
        if (now - lastSubmitRef.current < 5000) {
            setStatus({ type: "error", message: "Please wait a moment before sending again." });
            return;
        }

        lastSubmitRef.current = now;
        setIsSubmitting(true);
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        if (!serviceId || !templateId || !publicKey) {
            setStatus({ type: "error", message: "Email service is not configured yet." });
            setIsSubmitting(false);
            return;
        }
        try {
            await emailjs.send(serviceId, templateId, {
                from_name: formData.name,
                from_email: formData.email,
                company: formData.company,
                role: formData.role,
                message: formData.message,
                to_email: CONTACT_EMAIL,
            }, publicKey);
            setFormData(INITIAL_FORM);
            setStatus({ type: "success", message: "Thanks. I will get back to you soon." });
        } catch {
            setStatus({ type: "error", message: "Something went wrong. Please email me directly." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="contact-smooth-wrapper">
            <div id="contact-smooth-content">
                <main className="contact-page">
                    <header className="contact-page__nav">
                         <button className="contact-page__menu" type="button" aria-expanded={isMenuOpen} aria-controls="contact-navigation" onClick={() => setIsMenuOpen((current) => !current)}>
                            {isMenuOpen ? <FiX aria-hidden="true" /> : <span className="contact-page__burger" aria-hidden="true"><span /><span /></span>}<span>Menu</span>
                        </button> <Link to="/" className="contact-page__logo" aria-label="Back to home">
                            <img src={logo} alt="Russell Aguilar" />
                        </Link>
                      
                    </header>

                    <section className="contact-page__layout">
                        <div className="contact-page__main">
                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                                Let&apos;s start a<br />project together
                            </motion.h1>
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="contact-form__honeypot" aria-hidden="true">
                                    <label htmlFor="website">Website</label>
                                    <input id="website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex="-1" autoComplete="off" />
                                </div>
                                <label className="contact-form__row"><span className="contact-form__number">01</span><span className="contact-form__field"><strong>What&apos;s your name?</strong><input name="name" value={formData.name} onChange={updateField} placeholder="John Doe *" maxLength={80} required /><span className="contact-form__counter" aria-live="polite">{formData.name.length}/80</span></span></label>
                                <label className="contact-form__row"><span className="contact-form__number">02</span><span className="contact-form__field"><strong>What&apos;s your email?</strong><input name="email" type="email" value={formData.email} onChange={updateField} placeholder="john@doe.com *" required /></span></label>
                                <label className="contact-form__row"><span className="contact-form__number">03</span><span className="contact-form__field"><strong>Where are you from? (company/organization)</strong><input name="company" value={formData.company} onChange={updateField} placeholder="John & Doe ®" maxLength={100} /><span className="contact-form__counter" aria-live="polite">{formData.company.length}/100</span></span></label>
                                <label className="contact-form__row"><span className="contact-form__number">04</span><span className="contact-form__field"><strong>What role are you hiring for?</strong><input name="role" value={formData.role} onChange={updateField} placeholder="UI/UX Designer, Web Designer ..." maxLength={80} /><span className="contact-form__counter" aria-live="polite">{formData.role.length}/80</span></span></label>
                                <label className="contact-form__row contact-form__row--message"><span className="contact-form__number">05</span><span className="contact-form__field"><strong>Your message</strong><span className="contact-form__textarea-wrap"><textarea name="message" value={formData.message} onChange={updateField} placeholder="Hi Russell, we'd like to ... *" maxLength={1000} required /><span className="contact-form__counter contact-form__counter--textarea" aria-live="polite">{formData.message.length}/1000</span></span></span></label>
                                <div className="contact-form__submit-row"><span className="contact-form__submit-line" /><MagneticButton type="submit" disabled={isSubmitting}>{isSubmitting ? <><span className="contact-form__spinner" aria-hidden="true" /> Sending...</> : "Send it"}</MagneticButton></div>
                                {status.message && <p className={`contact-form__status is-${status.type}`}>{status.message}</p>}
                            </form>
                        </div>

                        <aside className="contact-page__aside">
                            <img className="contact-page__portrait" src={portrait} alt="Russell Aguilar" />
                            <div className="contact-page__details">
                                <span>Contact details</span>
                                <a className={copiedLabel === "Email" ? "is-copied" : ""} href={`mailto:${CONTACT_EMAIL}`} onClick={(event) => copyContact(event, CONTACT_EMAIL, "Email")}>
                                    {copiedLabel === "Email" ? <><FiCheck aria-hidden="true" /> Email copied</> : CONTACT_EMAIL}
                                </a>
                                <a className={copiedLabel === "Phone" ? "is-copied" : ""} href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} onClick={(event) => copyContact(event, CONTACT_PHONE, "Phone")}>
                                    {copiedLabel === "Phone" ? <><FiCheck aria-hidden="true" /> Phone copied</> : CONTACT_PHONE}
                                </a>
                            </div>
                            <div className="contact-page__details"><span>Socials</span>
                                <a href="https://www.linkedin.com/in/klent-russell-aguilar-b6929739b/" target="_blank" rel="noreferrer">LinkedIn</a>
                                <a href="https://www.behance.net/klentaguilar/projects" target="_blank" rel="noreferrer">Behance</a>
                                <a href="https://github.com/klntaglr" target="_blank" rel="noreferrer">GitHub</a>
                                <a href="https://www.tiktok.com/@klntaglr" target="_blank" rel="noreferrer">TikTok</a>
                                <a href="https://www.instagram.com/klntaglr/" target="_blank" rel="noreferrer">Instagram</a>
                            </div>

                        </aside>
                    </section>

                    <footer className="contact-page__footer">
                        <div><span>Credits</span><small>© Russell Aguilar - 2026</small></div>
                        <div><span>Contact</span><small><a href={`mailto:${CONTACT_EMAIL}`}>Email</a><a href="https://www.linkedin.com/in/klent-russell-aguilar-b6929739b/">LinkedIn</a><a href="https://www.instagram.com/klntaglr/">Instagram</a></small></div>
                        <div><span>Menu</span><small><Link to="/">Home</Link><Link to="/works">Work</Link><Link to="/about-web-designer">About</Link><Link to="/contact-me">Contact</Link></small></div>
                    </footer>

                    <TiltMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                </main>
            </div>
        </div>
    );
}
