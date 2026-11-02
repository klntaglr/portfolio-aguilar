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
import CaseStudy, { CASE_STUDIES } from "./componentsv2/CaseStudy";

import './App.css';
import NotFound from "./components/NotFound";
import Terms from "./components/Terms";

const SITE_NAME = "Russell Aguilar";
const SITE_URL = "https://YOUR-DOMAIN.com"; // TODO: palitan ng totoong domain
const DEFAULT_DESC =
  "Russell Aguilar is a UI/UX designer in the Philippines. Case studies in mobile apps, web, healthtech, and govtech.";

const trimText = (text, max = 155) => {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
};

function getMeta(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/") {
    return { path, title: `UI/UX Designer | ${SITE_NAME}`, description: DEFAULT_DESC };
  }
  if (path === "/about-web-designer") {
    return {
      path,
      title: `About | ${SITE_NAME}`,
      description: "About Russell Aguilar, a UI/UX designer who also builds what he designs.",
    };
  }
  if (path === "/works") {
    return {
      path,
      title: `UI/UX Design Case Studies | ${SITE_NAME}`,
      description: "Selected UI/UX case studies in healthtech, govtech, and learning apps by Russell Aguilar.",
    };
  }
  if (path.startsWith("/works/")) {
    const slug = path.split("/")[2];
    const cs = CASE_STUDIES[slug];
    if (cs) {
      return {
        path,
        title: `${cs.title} | ${SITE_NAME}`,
        description: trimText(`${cs.title} for ${cs.client}. ${cs.background.text}`),
      };
    }
    return { path, title: `Case Study | ${SITE_NAME}`, description: DEFAULT_DESC };
  }
  if (path.startsWith("/projects")) {
    return { path, title: `Projects | ${SITE_NAME}`, description: DEFAULT_DESC };
  }
  if (path === "/contact-me") {
    return {
      path,
      title: `Contact | ${SITE_NAME}`,
      description: "Get in touch with Russell Aguilar for UI/UX design projects and collaborations.",
    };
  }
  if (path === "/free-landing-page/terms-and-conditions") {
    return { path, title: `Terms | ${SITE_NAME}`, description: DEFAULT_DESC };
  }
  return { path, title: SITE_NAME, description: DEFAULT_DESC };
}

function upsertTag(tagName, matchAttr, matchValue, valueAttr, value) {
  let el = document.head.querySelector(`${tagName}[${matchAttr}="${matchValue}"]`);
  if (!el) {
    el = document.createElement(tagName);
    el.setAttribute(matchAttr, matchValue);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

function useRouteTitle() {
  const location = useLocation();
  const meta = useMemo(() => getMeta(location.pathname), [location.pathname]);

  useLayoutEffect(() => {
    const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
    document.title = meta.title;
    upsertTag("meta", "name", "description", "content", meta.description);
    upsertTag("link", "rel", "canonical", "href", url);
    upsertTag("meta", "property", "og:title", "content", meta.title);
    upsertTag("meta", "property", "og:description", "content", meta.description);
    upsertTag("meta", "property", "og:url", "content", url);
    upsertTag("meta", "name", "twitter:title", "content", meta.title);
    upsertTag("meta", "name", "twitter:description", "content", meta.description);
  }, [meta]);
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
