import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import Portfolio from "./components/Portfolio"; // commented out — replaced by Russell
import Russell from "./componentsv2/Russell"; // ← new hero / home page
// import About from "./components/About";
import About from "./componentsv2/Aboutv2";
import Works from "./componentsv2/Worksv2";
import Contact from "./componentsv2/ContactReference";
import Projects from "./components/Projects";
import CaseStudy from "./componentsv2/CaseStudy";

import './App.css';
import NotFound from "./components/NotFound";
import Terms from "./components/Terms";

const TITLE_FALLBACK = "Russell Aguilar";

function useRouteTitle() {
  const location = useLocation();

  const title = useMemo(() => {
    const path = location.pathname.replace(/\/+$/, "") || "/";

    if (path === "/") return "UI/UX Designer | Russell Aguilar";
    if (path === "/about-web-designer") return "About | Russell Aguilar";
    if (path === "/works") return "Work | Russell Aguilar";
    if (path.startsWith("/works/")) return "Case Study | Russell Aguilar";
    if (path.startsWith("/projects")) return "Projects | Russell Aguilar";
    if (path === "/free-landing-page") return "Free Landing Page | Russell Aguilar";
    if (path === "/contact-me") return "Contact | Russell Aguilar";
    
    if (path === "/free-landing-page/terms-and-conditions") {
      return "Terms | Russell Aguilar";
    }

    return TITLE_FALLBACK;
  }, [location.pathname]);

  useLayoutEffect(() => {
    document.title = title;
  }, [title]);
}

function TitleManager() {
  useRouteTitle();
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const instant = !!location.state?.fromMenu;

  const routeVariants = {
    initial: (skip) => ({ opacity: skip ? 1 : 0, y: skip ? 0 : 10 }),
    animate: (skip) => ({
      opacity: 1,
      y: 0,
      transition: { duration: skip ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] },
    }),
    exit: (skip) => ({
      opacity: skip ? 1 : 0,
      y: skip ? 0 : -10,
      transition: { duration: skip ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <AnimatePresence mode="wait" initial={false} custom={instant}>
      <motion.div
        key={location.pathname}
        className="route-transition"
        custom={instant}
        variants={routeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          {/* <Route path="/" element={<Portfolio />} /> */}
          <Route path="/" element={<Russell />} />

          <Route path="/about-web-designer" element={<About />} />
             <Route path="/works" element={<Works />} />
          <Route path="/works/:slug" element={<CaseStudy />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<Projects />} />

          <Route path="/contact-me" element={<Contact />} />
          <Route path="/free-landing-page/terms-and-conditions" element={<Terms />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const preventContextMenu = (event) => event.preventDefault();
    const preventImageDrag = (event) => {
      if (event.target instanceof HTMLImageElement) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("dragstart", preventImageDrag);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("dragstart", preventImageDrag);
    };
  }, []);

  return (
    <Router>
      <TitleManager />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
