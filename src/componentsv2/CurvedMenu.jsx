import { useRef } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaDribbble, FaFigma } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import "./CurvedMenu.css";

const MENU_SLIDE_ANIMATION = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

const defaultNavItems = [
  { heading: "Home", href: "/" },
  { heading: "Work", href: "/works" },
  { heading: "About", href: "/about-web-designer" },
  { heading: "Contact", href: "/contact-me" },
];

function MenuFooter() {
  return (
    <div className="curved-menu__footer">
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={22} /></a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub size={22} /></a>
      <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer"><FaDribbble size={22} /></a>
      <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer"><FaFigma size={22} /></a>
    </div>
  );
}

function NavLink({ heading, href, onNavigate, index }) {
  const ref = useRef(null);

  return (
    <motion.div
      onClick={onNavigate}
      initial="initial"
      whileHover="whileHover"
      className="curved-menu__link"
    >
      <a ref={ref} href={href}>
        <div className="curved-menu__link-inner">
   
          <motion.span
            variants={{ initial: { x: 0 }, whileHover: { x: -16 } }}
            transition={{ type: "spring", staggerChildren: 0.075, delayChildren: 0.25 }}
            className="curved-menu__heading"
          >
            {heading.split("").map((letter, i) => (
              <motion.span
                key={i}
                variants={{ initial: { x: 0 }, whileHover: { x: 16 } }}
                transition={{ type: "spring" }}
                className="curved-menu__letter"
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </div>
      </a>
    </motion.div>
  );
}

function Curve() {
  const h = typeof window !== "undefined" ? window.innerHeight : 800;
  const initialPath = `M100 0 L200 0 L200 ${h} L100 ${h} Q-100 ${h / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${h} L100 ${h} Q100 ${h / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: { d: targetPath, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
    exit: { d: initialPath, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  };

  return (
    <svg className="curved-menu__curve">
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
    </svg>
  );
}

export default function CurvedMenu({ onClose, navItems = defaultNavItems }) {
  return (
    <motion.div
      variants={MENU_SLIDE_ANIMATION}
      initial="initial"
      animate="enter"
      exit="exit"
      className="curved-menu"
    >
      <button
        type="button"
        className="curved-menu__close"
        onClick={onClose}
        aria-label="Close menu"
      >
        <IoClose size={26} />
      </button>

      <div className="curved-menu__inner">
        <div className="curved-menu__top">
        
          <section className="curved-menu__list">
            {navItems.map((item, index) => (
              <NavLink key={item.href} {...item} onNavigate={onClose}  />
            ))}
          </section>
        </div>
        <MenuFooter />
      </div>
      <Curve />
    </motion.div>
  );
}