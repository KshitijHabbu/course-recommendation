"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function LoginModal({ onClose, onSignupClick }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      login({
        name: email.split("@")[0],
        email: email,
      })
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Welcome Back</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
          </form>
          <div className="social-login">
            <p>Or login with</p>
            <div className="social-buttons">
              <button className="social-btn google">
                <i className="fab fa-google"></i>
                Google
              </button>
              <button className="social-btn linkedin">
                <i className="fab fa-linkedin-in"></i>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <p>
            Don't have an account?{" "}
            <button className="text-btn" onClick={onSignupClick}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
