import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { useState } from "react";
import { ar } from "../translations/ar.ts";
import { FaSignOutAlt } from "react-icons/fa";
import "../styles/projectNavBar.css";

export default function ProjectNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("logout");
      await authService.logout();
      // Clear user data from localStorage
      localStorage.removeItem('user');
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, we should still log the user out locally
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/projects">
          {ar.navigation.title}
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

        <div dir="rtl" lang="ar" className="d-flex justify-content-between w-100">
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>
                  الرئيسية
                </Link>
              </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users" onClick={() => setIsMenuOpen(false)}>
                  المستخدمين
                </Link>
              </li>
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
              <li className="nav-item">
                <Link className="nav-link" to="/constructors" onClick={() => setIsMenuOpen(false)}>
                  {ar.navigation.constructors}
                </Link>
              </li>
         
            </ul>
          </div>
          <button 
            className="btn btn-outline-danger ms-2"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> {ar.navigation.logout}
          </button>
        </div>
      </div>
    </nav>
  );
}