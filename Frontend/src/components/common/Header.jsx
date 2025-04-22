"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi"
import "./Header.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="CareerGuide AI" />
          <span>CareerGuide AI</span>
        </Link>

        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul>
            {user && (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className={location.pathname === "/dashboard" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/chatbot" className={location.pathname === "/chatbot" ? "active" : ""} onClick={closeMenu}>
                    Career Chat
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-suggester"
                    className={location.pathname === "/career-suggester" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    Career Suggester
                  </Link>
                </li>
                <li>
                  <Link
                    to="/course-recommender"
                    className={location.pathname === "/course-recommender" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    Course Finder
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="header-right">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                <FiUser />
                <span>{user.name || "User"}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </div>
          )}
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
