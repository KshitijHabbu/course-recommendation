"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Layouts
import MainLayout from "./components/layout/MainLayout"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Chatbot from "./pages/Chatbot"
import CareerSuggester from "./pages/CareerSuggester"
import CourseRecommender from "./pages/CourseRecommender"
import NotFound from "./pages/NotFound"

// Components
import GuideTour from "./components/onboarding/GuideTour"

function App() {
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    // Check if it's the user's first visit
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")
    if (!hasVisitedBefore) {
      setShowTour(true)
      localStorage.setItem("hasVisitedBefore", "true")
    }
  }, [])

  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        {showTour && <GuideTour onClose={() => setShowTour(false)} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/chatbot"
            element={
              <MainLayout>
                <Chatbot />
              </MainLayout>
            }
          />
          <Route
            path="/career-suggester"
            element={
              <MainLayout>
                <CareerSuggester />
              </MainLayout>
            }
          />
          <Route
            path="/course-recommender"
            element={
              <MainLayout>
                <CourseRecommender />
              </MainLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
