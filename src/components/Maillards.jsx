import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import "./Maillards.css";
gsap.registerPlugin(ScrollTrigger);


export default function Maillards() {
  const loaderTextRef = useRef(null);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    const ctx = gsap.context(() => {
  const images = gsap.utils.toArray(".demo-wrapper img");

      const loaderText = loaderTextRef.current;


      const updateProgress = (instance) => {
        if (!loaderText) return;
        loaderText.textContent = `${Math.round(
          (instance.progressedCount * 100) / images.length
        )}%`;
      };


      const showDemo = () => {
        document.body.style.overflow = "auto";
        document.scrollingElement.scrollTo(0, 0);


        gsap.to(".loader", {
          autoAlpha: 0,
          duration: 0.6,
          onComplete: () => setLoaded(true),
        });


        gsap.utils.toArray("section").forEach((section, index) => {
          const wrapper = section.querySelector(".wrapper");
          if (!wrapper) return;


          const [xStart, xEnd] =
            index % 2
              ? ["100%", (wrapper.scrollWidth - section.offsetWidth) * -1]
              : [wrapper.scrollWidth * -1, 0];


          gsap.fromTo(
            wrapper,
            { x: xStart },
            {
              x: xEnd,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                scrub: 0.5,
              },
            }
          );
        });


        ScrollTrigger.refresh();
      };


   showDemo();

    });


    return () => ctx.revert();
  }, []);


  return (
    <>
      {/* Loader */}
      <div className="loader df aic jcc">
        <div>
          <h1>Loading</h1>
          <h2 className="loader--text" ref={loaderTextRef}>
            0%
          </h2>
        </div>
      </div>


      {/* Demo */}
      <div className="demo-wrapper">
    

        <section className="demo-text">
          <div className="wrapper text">
           YOURYOURYOUR 
          </div>
        
        </section>

  <section className="demo-text">
          <div className="wrapper text">
        NEXTNEXTNEXT 
          </div>
        </section>
      

        <section className="demo-text">
          <div className="wrapper text">
          DESIGNERDESIGNER
          </div>
        </section>


     
      </div>
    </>
  );
}


