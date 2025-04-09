"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage"
import ChatbotPage from "./pages/ChatbotPage"
import SuggesterPage from "./pages/SuggesterPage"
import RecommenderPage from "./pages/RecommenderPage"
import LoginModal from "./components/LoginModal"
import SignupModal from "./components/SignupModal"
import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"
import "./App.css"

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="app-container">
            <Header onLoginClick={() => setShowLoginModal(true)} onSignupClick={() => setShowSignupModal(true)} />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/chat" element={<ChatbotPage />} />
                <Route path="/career-suggester" element={<SuggesterPage />} />
                <Route path="/job-recommender" element={<RecommenderPage />} />
              </Routes>
            </main>

            <Footer />

            {showLoginModal && (
              <LoginModal
                onClose={() => setShowLoginModal(false)}
                onSignupClick={() => {
                  setShowLoginModal(false)
                  setShowSignupModal(true)
                }}
              />
            )}

            {showSignupModal && (
              <SignupModal
                onClose={() => setShowSignupModal(false)}
                onLoginClick={() => {
                  setShowSignupModal(false)
                  setShowLoginModal(true)
                }}
              />
            )}
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
