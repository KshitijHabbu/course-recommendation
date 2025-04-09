"use client"

import { useState, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { ThemeContext } from "../context/ThemeContext"
import logo from "../assets/your-logo-file-name.svg";


function Header({ onLoginClick, onSignupClick }) {
  const { user, logout, isAuthenticated } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src={logo || "/placeholder.svg"} alt="Career Compass Logo" />
            <span>Career Compass</span>
          </Link>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/" className={isActive("/")} onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/chat" className={isActive("/chat")} onClick={closeMobileMenu}>
                AI Chat
              </Link>
            </li>
            <li>
              <Link to="/career-suggester" className={isActive("/career-suggester")} onClick={closeMobileMenu}>
                Career Suggester
              </Link>
            </li>
            <li>
              <Link to="/job-recommender" className={isActive("/job-recommender")} onClick={closeMobileMenu}>
                Job Recommender
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
          </button>

          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
              <div className="user-dropdown">
                <span className="user-name">{user.name}</span>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn btn-secondary" onClick={onLoginClick}>
                Login
              </button>
              <button className="btn btn-primary" onClick={onSignupClick}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
