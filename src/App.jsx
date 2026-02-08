import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import LandingPage from "./components/LandingPage";
import Contact from "./components/Contact";
import './App.css';
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/about-web-designer" element={<About />} />
        <Route path="/free-landing-page" element={<LandingPage />} />
<Route path="/contact-me" element={<Contact />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}


export default App;