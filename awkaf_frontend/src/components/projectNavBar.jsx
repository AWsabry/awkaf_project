import { Link } from "react-router-dom";
import { useState } from "react";
import { ar } from "../translations/ar.ts";
import { FaSignOutAlt } from "react-icons/fa";
import "./projectNavBar.css";

export default function ProjectNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <FaSignOutAlt /> {ar.navigation.logout}
        </Link>
        
        {/* Hamburger menu button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div dir="rtl" lang="ar">
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/projects" onClick={() => setIsMenuOpen(false)}>
                  {ar.navigation.projects}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mosques" onClick={() => setIsMenuOpen(false)}>
                  {ar.navigation.mosques}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blocked-projects" onClick={() => setIsMenuOpen(false)}>
                  {ar.navigation.blockedProjects}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}