import React, { useEffect, useRef } from 'react';
import './Preloader.css';
import gsap from 'gsap';
import logo from '../assets/logo.png';

function Preloader({ onComplete }) {
    const preloaderRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);
    const overlayRef = useRef(null);
    const tagsRef = useRef(null);

    useEffect(() => {
        // Force initial states
        gsap.set(preloaderRef.current, { autoAlpha: 1 });
        gsap.set(overlayRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
        gsap.set(textRef.current, { opacity: 0, y: 50, scale: 0.98 });
        gsap.set(tagsRef.current, { opacity: 0, y: 30 });
        gsap.set(logoRef.current, { opacity: 0, scale: 0.85, rotateZ: -4 });

        const tl = gsap.timeline({
            delay: 0.4,
            onComplete: () => {
                // Trigger page animations after small delay
                gsap.delayedCall(0.15, () => {
                    if (onComplete) onComplete();
                });
            }
        });

        // ===== PHASE 1: TEXT ENTRANCE =====
        tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "expo.out"
        })
        
        .to(tagsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.7")

        // ===== PHASE 2: HOLD =====
        .to({}, { duration: 0.8 })

        // ===== PHASE 3: TEXT EXIT =====
        .to([textRef.current, tagsRef.current], {
            opacity: 0,
            y: -40,
            scale: 0.97,
            duration: 0.6,
            ease: "power2.in"
        })

        // ===== PHASE 4: LOGO ENTRANCE =====
        .to(logoRef.current, {
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            duration: 1.2,
            ease: "expo.out"
        }, "-=0.2")

        // ===== PHASE 5: LOGO HOLD =====
        .to({}, { duration: 0.6 })

        // ===== PHASE 6: LOGO EXIT =====
        .to(logoRef.current, {
            opacity: 0,
            scale: 1.12,
            duration: 0.7,
            ease: "power2.in"
        })

        // ===== PHASE 7: CURTAIN CLOSE =====
        .to(overlayRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.1,
            ease: "expo.inOut"
        }, "-=0.35")

        // ===== PHASE 8: FINAL CLEANUP =====
        .to(preloaderRef.current, {
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                if (preloaderRef.current) {
                    preloaderRef.current.style.display = "none";
                    preloaderRef.current.style.pointerEvents = "none";
                }
            }
        }, "-=0.2");

        return () => {
            tl.kill();
        };

    }, [onComplete]);

    return (
        <div ref={preloaderRef} className="preloader">
            <div ref={overlayRef} className="preloader-overlay">
                <img 
                    ref={logoRef} 
                    src={logo} 
                    alt="Logo Watermark" 
                    className="preloader-logo-watermark"
                    draggable="false"
                />
                <div className="preloader-content">
                    <h1 ref={textRef} className="preloader-title">
                        russell aguilar
                    </h1>
                    <div ref={tagsRef} className="preloader-tags">
                        <span>WEB</span>
                        <span className="separator">·</span>
                        <span>DESIGN</span>
                        <span className="separator">·</span>
                        <span>UX/UI</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preloader;