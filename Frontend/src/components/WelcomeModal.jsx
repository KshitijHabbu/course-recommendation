"use client"

import { X } from "lucide-react"
import "../styles/Modal.css"

function WelcomeModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal welcome-modal">
        <div className="modal-header">
          <h2>Welcome to Career Advisor AI</h2>
          <button className="icon-button" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="welcome-icon">🚀</div>
          <p>Your AI-powered career guidance assistant is ready to help you with:</p>

          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon">📝</div>
              <h3>Resume Building</h3>
              <p>Get expert tips to make your resume stand out</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Interview Prep</h3>
              <p>Practice with common interview questions</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📈</div>
              <h3>Career Planning</h3>
              <p>Map out your professional growth path</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <h3>Salary Negotiation</h3>
              <p>Learn strategies to maximize your compensation</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeModal
