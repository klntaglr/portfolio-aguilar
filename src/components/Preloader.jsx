import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import './Preloader.css';

function Preloader({ onComplete }) {
    const preloaderRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);
    const overlayRef = useRef(null);
    const tagsRef = useRef(null);
    const didCompleteRef = useRef(false);

    useEffect(() => {
    gsap.set(preloaderRef.current, { autoAlpha: 1 });
    gsap.set(overlayRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
    gsap.set(textRef.current, { opacity: 0, y: 50, scale: 0.98 });
    gsap.set(tagsRef.current, { opacity: 0, y: 30 });
 gsap.set(logoRef.current, {
  opacity: 0,
  scale: 0.85,
  rotateZ: -4,
  xPercent: -50,
  yPercent: -50
});

    const finalize = () => {
        if (didCompleteRef.current) return;
        didCompleteRef.current = true;

        if (preloaderRef.current) {
            preloaderRef.current.style.display = "none";
        }

        if (onComplete) {
            onComplete();
        }
    };

    const tl = gsap.timeline({
        delay: 0.4,
    });

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

    .to({}, { duration: 0.8 })

    .to([textRef.current, tagsRef.current], {
        opacity: 0,
        y: -40,
        scale: 0.97,
        duration: 0.6,
        ease: "power2.in"
    })

.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        rotateZ: 0,
        duration: 1.2,
        ease: "expo.out"
    }, "-=0.2")

    .to({}, { duration: 0.6 })

    .to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.1,
        ease: "expo.inOut"
    })

    .to(preloaderRef.current, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: finalize
    });

    return () => tl.kill();

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
                      
                   
                        <span>UI/UX DESIGNER</span>
                        <span className="separator">·</span>
                        <span>FRONTEND DEV</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preloader;