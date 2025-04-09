import { Link } from "react-router-dom"
import heroImage from "../assets/hero-image.svg"
import featureChat from "../assets/feature-chat.svg"
import featureSuggester from "../assets/feature-suggester.svg"
import featureRecommender from "../assets/feature-recommender.svg"

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Navigate Your Career Journey with AI-Powered Guidance</h1>
              <p>
                Discover personalized career paths, get expert advice, and find job opportunities tailored to your
                skills and interests.
              </p>
              <div className="hero-buttons">
                <Link to="/career-suggester" className="btn btn-primary btn-lg">
                  Find Your Career Path
                </Link>
                <Link to="/chat" className="btn btn-outline btn-lg">
                  Chat with AI Advisor
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src={heroImage || "/placeholder.svg"} alt="Career guidance illustration" />
            </div>
          </div>
        </div>
        <div className="hero-wave"></div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Explore Our Features</h2>
            <p>Three powerful tools to help you make informed career decisions</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src={featureChat || "/placeholder.svg"} alt="AI Chat" />
              </div>
              <h3>AI Career Advisor</h3>
              <p>
                Get personalized career advice through an interactive chat with our AI career counselor. Ask questions,
                seek guidance, and receive expert insights.
              </p>
              <Link to="/chat" className="btn btn-secondary">
                Start Chatting
              </Link>
            </div>

            <div className="feature-card highlight">
              <div className="feature-icon">
                <img src={featureSuggester || "/placeholder.svg"} alt="Career Suggester" />
              </div>
              <h3>Career Path Suggester</h3>
              <p>
                Answer a few questions about your interests, skills, and preferences to discover career paths that align
                with your unique profile.
              </p>
              <Link to="/career-suggester" className="btn btn-primary">
                Find Your Path
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src={featureRecommender || "/placeholder.svg"} alt="Job Recommender" />
              </div>
              <h3>Job Recommender</h3>
              <p>
                Get personalized job recommendations based on your skills and preferences. Find opportunities that match
                your career goals.
              </p>
              <Link to="/job-recommender" className="btn btn-secondary">
                Explore Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple steps to navigate your career journey</p>
          </div>

          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose Your Tool</h3>
              <p>Select from our AI Chat, Career Suggester, or Job Recommender based on your needs.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Share Your Information</h3>
              <p>Answer questions about your skills, interests, and career preferences.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Personalized Results</h3>
              <p>Receive tailored career advice, suggestions, or job recommendations.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Take Action</h3>
              <p>Use the insights to make informed decisions about your career path.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Hear from professionals who transformed their careers with our guidance</p>
          </div>

          <div className="testimonials-slider">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "The Career Suggester helped me discover a career path I hadn't considered before. Now I'm working in
                  a field I love and growing professionally every day."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">PR</div>
                <div className="author-info">
                  <h4>Priya Rao</h4>
                  <p>UX Designer, Bangalore</p>
                </div>
              </div>
            </div>

            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "The AI chat advisor gave me practical tips for my job interviews. I landed my dream job at a top tech
                  company within a month!"
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">AK</div>
                <div className="author-info">
                  <h4>Arjun Kumar</h4>
                  <p>Software Engineer, Pune</p>
                </div>
              </div>
            </div>

            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "The job recommender found me opportunities that perfectly matched my skills and career goals. The
                  personalized approach made all the difference."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">NS</div>
                <div className="author-info">
                  <h4>Neha Sharma</h4>
                  <p>Data Analyst, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Take the Next Step in Your Career?</h2>
            <p>Join thousands of professionals who have found their ideal career path with our AI-powered guidance.</p>
            <div className="cta-buttons">
              <Link to="/career-suggester" className="btn btn-primary btn-lg">
                Get Started Now
              </Link>
              <Link to="/chat" className="btn btn-outline-light btn-lg">
                Talk to AI Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
