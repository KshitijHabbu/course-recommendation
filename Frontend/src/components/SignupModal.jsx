"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function SignupModal({ onClose, onLoginClick }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock successful signup
      login({
        name: name,
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
          <h2>Create Account</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="signup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="signup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" required />
                <span className="checkmark"></span>I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Sign Up"}
            </button>
          </form>
          <div className="social-login">
            <p>Or sign up with</p>
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
            Already have an account?{" "}
            <button className="text-btn" onClick={onLoginClick}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupModal
