"use client"

import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FiArrowRight, FiMessageSquare, FiCompass, FiBookOpen, FiUsers } from "react-icons/fi"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import "./Home.css"

const Home = () => {
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const testimonialsRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".animate")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="home-page">
      <Header />

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title animate">
            Discover Your <span className="highlight">Perfect</span> Career Path
          </h1>
          <p className="hero-subtitle animate">
            AI-powered guidance to help you navigate career transitions, find the right courses, and build the skills
            you need for success.
          </p>
          <div className="hero-cta animate">
            <Link to="/signup" className="primary-btn">
              Get Started <FiArrowRight />
            </Link>
            <Link to="/chatbot" className="secondary-btn">
              Try the Chatbot
            </Link>
          </div>
        </div>
        <div className="hero-image animate">
          <img src="/hero-image.svg" alt="Career guidance illustration" />
        </div>
      </section>

      <section className="features-section" ref={featuresRef}>
        <div className="section-header animate">
          <h2>How We Help You Succeed</h2>
          <p>Our AI-powered platform offers personalized guidance for every stage of your career journey</p>
        </div>

        <div className="features-grid">
          <div className="feature-card animate">
            <div className="feature-icon">
              <FiMessageSquare />
            </div>
            <h3>AI Career Chat</h3>
            <p>Get instant answers to all your career questions from our intelligent chatbot assistant</p>
          </div>

          <div className="feature-card animate">
            <div className="feature-icon">
              <FiCompass />
            </div>
            <h3>Career Suggester</h3>
            <p>
              Discover career paths that match your skills, interests, and goals through personalized recommendations
            </p>
          </div>

          <div className="feature-card animate">
            <div className="feature-icon">
              <FiBookOpen />
            </div>
            <h3>Course Finder</h3>
            <p>Find the perfect courses and learning resources to help you acquire the skills you need</p>
          </div>

          <div className="feature-card animate">
            <div className="feature-icon">
              <FiUsers />
            </div>
            <h3>Community Support</h3>
            <p>Connect with others on similar career paths and learn from their experiences</p>
          </div>
        </div>
      </section>

      <section className="how-it-works" ref={howItWorksRef}>
        <div className="section-header animate">
          <h2>How It Works</h2>
          <p>Three simple steps to transform your career journey</p>
        </div>

        <div className="steps-container">
          <div className="step animate">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Share Your Background</h3>
              <p>Tell us about your education, skills, interests, and career goals</p>
            </div>
          </div>

          <div className="step animate">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Get Personalized Recommendations</h3>
              <p>Our AI analyzes your profile to suggest optimal career paths and courses</p>
            </div>
          </div>

          <div className="step animate">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Take Action</h3>
              <p>Follow your customized roadmap with detailed guidance every step of the way</p>
            </div>
          </div>
        </div>

        <div className="cta-container animate">
          <Link to="/signup" className="primary-btn">
            Start Your Journey <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="testimonials-section" ref={testimonialsRef}>
        <div className="section-header animate">
          <h2>Success Stories</h2>
          <p>Hear from people who transformed their careers with our guidance</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card animate">
            <div className="testimonial-content">
              <p>
                "After 10 years as a teacher, I wanted to transition to tech. The Career Suggester helped me identify UX
                design as a perfect fit for my skills, and recommended courses that got me job-ready in 6 months."
              </p>
            </div>
            <div className="testimonial-author">
              <img src="/placeholder.svg?height=60&width=60" alt="Priya S." className="author-image" />
              <div className="author-info">
                <h4>Priya S.</h4>
                <p>Teacher → UX Designer</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card animate">
            <div className="testimonial-content">
              <p>
                "The AI chatbot helped me understand exactly what skills I needed to develop for a data science role.
                The personalized learning path saved me months of figuring things out on my own."
              </p>
            </div>
            <div className="testimonial-author">
              <img src="/placeholder.svg?height=60&width=60" alt="Rahul M." className="author-image" />
              <div className="author-info">
                <h4>Rahul M.</h4>
                <p>Marketing Analyst → Data Scientist</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card animate">
            <div className="testimonial-content">
              <p>
                "As a mid-career professional, I was skeptical about changing industries. The Course Finder recommended
                specialized certifications that helped me leverage my existing experience while building new skills."
              </p>
            </div>
            <div className="testimonial-author">
              <img src="/placeholder.svg?height=60&width=60" alt="Ananya K." className="author-image" />
              <div className="author-info">
                <h4>Ananya K.</h4>
                <p>Finance Manager → FinTech Consultant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content animate">
          <h2>Ready to Find Your Perfect Career Path?</h2>
          <p>Join thousands of professionals who have transformed their careers with our AI-powered guidance</p>
          <Link to="/signup" className="primary-btn">
            Get Started for Free <FiArrowRight />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
