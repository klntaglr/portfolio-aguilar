// components/NotFound.jsx
import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
     
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-description">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <Link to="/" className="notfound-home-btn">
         
         Return
        </Link>
      </div>
    </div>
  );
}

export default NotFound;