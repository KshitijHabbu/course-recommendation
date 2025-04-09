import { Link } from "react-router-dom"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Career Compass</h3>
            <p>
              Your AI-powered career guidance platform helping you navigate your professional journey with confidence.
            </p>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/chat">AI Chat</Link>
              </li>
              <li>
                <Link to="/career-suggester">Career Suggester</Link>
              </li>
              <li>
                <Link to="/job-recommender">Job Recommender</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li>
                <a href="#">Career Blog</a>
              </li>
              <li>
                <a href="#">Resume Templates</a>
              </li>
              <li>
                <a href="#">Interview Tips</a>
              </li>
              <li>
                <a href="#">Skill Development</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>
              <i className="fas fa-envelope"></i> support@careercompass.ai
            </p>
            <p>
              <i className="fas fa-phone"></i> +91 98765 43210
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> Pune, Maharashtra, India
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Career Compass. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
