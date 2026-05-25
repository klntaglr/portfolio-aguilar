import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect, useMemo } from "react";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
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

function App() {
  return (
    <Router>
      <TitleManager />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/about-web-designer" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/free-landing-page" element={<LandingPage />} />
        <Route path="/contact-me" element={<Contact />} />
        <Route path="/free-landing-page/terms-and-conditions" element={<Terms />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}


export default App;
