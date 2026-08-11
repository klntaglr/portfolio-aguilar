import { FaCrown } from "react-icons/fa";
import { PiBrainBold } from "react-icons/pi";
import { IoRocketOutline, IoFlaskOutline } from "react-icons/io5";
import { BsChatSquareTextFill } from "react-icons/bs";
import "./RightIconNav.css";

const defaultIcons = [
  { icon: <FaCrown size={18} />, label: "Awards" },
  { icon: <PiBrainBold size={20} />, label: "Insights" },
  { icon: <IoRocketOutline size={20} />, label: "Boost" },
  { icon: <IoFlaskOutline size={20} />, label: "Lab" },
  { icon: <BsChatSquareTextFill size={16} />, label: "Chat", badge: "99", active: true },
];

export default function RightIconNav({ items = defaultIcons, onSelect }) {
  return (
    <nav className="right-icon-nav" aria-label="Quick actions">
      {items.map((item, i) => (
        <button
          key={item.label}
          type="button"
          className={`right-icon-nav__item ${item.active ? "right-icon-nav__item--active" : ""}`}
          onClick={() => onSelect?.(item, i)}
          aria-label={item.label}
        >
          {item.icon}
          {item.badge && (
            <span className="right-icon-nav__badge">{item.badge}</span>
          )}
        </button>
      ))}
    </nav>
  );
}