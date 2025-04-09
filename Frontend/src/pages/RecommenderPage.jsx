"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

function RecommenderPage() {
  const [currentStep, setCurrentStep] = useState("search") // search, survey, results
  const [keywords, setKeywords] = useState("")
  const [location, setLocation] = useState("India")
  const [requestId, setRequestId] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [jobCount, setJobCount] = useState(0)

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/recommender/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: keywords,
          location: location,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setRequestId(data.request_id)
        setQuestions(data.questions)
        setJobCount(data.job_count)

        if (data.job_count > 0) {
          setCurrentStep("survey")
        } else {
          setError("No jobs found matching your criteria. Please try different keywords.")
        }
      } else {
        setError(data.error || "Failed to start job search.")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("Failed to connect to the server. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    })
  }

  const handleSubmitSurvey = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/recommender/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_id: requestId,
          answers: answers,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setRecommendations(data.recommendations)
        setCurrentStep("results")
      } else {
        setError(data.error || "Failed to process your answers.")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("Failed to connect to the server. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetSearch = () => {
    setCurrentStep("search")
    setKeywords("")
    setLocation("India")
    setRequestId(null)
    setQuestions([])
    setAnswers({})
    setRecommendations([])
    setError(null)
  }

  const renderSearchForm = () => (
    <div className="search-container">
      <div className="search-content">
        <h2>Find Job Recommendations</h2>
        <p>Enter keywords related to your desired role or skills to get personalized job recommendations.</p>
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label htmlFor="keywords">Keywords (Skills, Job Titles, etc.)</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-search"></i>
              <input
                type="text"
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="E.g., Python Developer, Data Science, Marketing"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-map-marker-alt"></i>
              <select id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="India">India (All)</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Search Jobs"}
          </button>
        </form>
      </div>
      <div className="search-image">
        <img src="/src/assets/job-search.svg" alt="Job Search" />
      </div>
    </div>
  )

  const renderSurvey = () => (
    <div className="survey-container">
      <div className="survey-header">
        <h2>Personalize Your Job Recommendations</h2>
        <p>
          We found {jobCount} potential jobs matching your criteria. Answer these questions to help us find the best
          matches for you.
        </p>
      </div>

      <div className="survey-questions">
        {questions.map((q) => (
          <div className="survey-question" key={q.id}>
            <h3>{q.text}</h3>
            {q.text.includes("Rate") || q.text.includes("interested") ? (
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="rating-label">
                    <input
                      type="radio"
                      name={q.id}
                      value={value}
                      checked={answers[q.id] === value.toString()}
                      onChange={() => handleAnswerChange(q.id, value.toString())}
                    />
                    <span className="rating-value">{value}</span>
                  </label>
                ))}
              </div>
            ) : q.text.includes("Yes/No") ? (
              <div className="yes-no-input">
                <label className="radio-label">
                  <input
                    type="radio"
                    name={q.id}
                    value="Yes"
                    checked={answers[q.id] === "Yes"}
                    onChange={() => handleAnswerChange(q.id, "Yes")}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name={q.id}
                    value="No"
                    checked={answers[q.id] === "No"}
                    onChange={() => handleAnswerChange(q.id, "No")}
                  />
                  <span>No</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name={q.id}
                    value="Learning"
                    checked={answers[q.id] === "Learning"}
                    onChange={() => handleAnswerChange(q.id, "Learning")}
                  />
                  <span>Learning</span>
                </label>
              </div>
            ) : (
              <input
                type="text"
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                placeholder="Type your answer here..."
              />
            )}
          </div>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="survey-actions">
        <button className="btn btn-secondary" onClick={resetSearch} disabled={isLoading}>
          Back to Search
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmitSurvey}
          disabled={isLoading || Object.keys(answers).length < questions.length}
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Get Recommendations"}
        </button>
      </div>
    </div>
  )

  const renderResults = () => (
    <div className="results-container">
      <div className="results-header">
        <h2>Your Job Recommendations</h2>
        <p>Based on your skills and preferences, here are the top job matches for you.</p>
      </div>

      <div className="job-recommendations">
        {recommendations.map((job, index) => (
          <div className="job-card" key={job.id}>
            <div className="job-header">
              <h3>{job.title}</h3>
              <div className="job-company">{job.company}</div>
              <div className="job-location">
                <i className="fas fa-map-marker-alt"></i> {job.location}
              </div>
            </div>
            <div className="job-match">
              <div className="match-score">
                <div className="score-label">Match</div>
                <div className="score-value">{Math.round(job.match_score * 100)}%</div>
              </div>
              <div className="match-bar">
                <div className="match-fill" style={{ width: `${job.match_score * 100}%` }}></div>
              </div>
            </div>
            <div className="job-description">
              <p>{job.description}</p>
            </div>
            <div className="job-skills">
              <h4>Skills</h4>
              <div className="skills-list">
                {job.skills.split(",").map((skill, i) => (
                  <span className="skill-tag" key={i}>
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div className="job-match-reason">
              <h4>Why This Matches You</h4>
              <p>{job.reason}</p>
            </div>
            <div className="job-actions">
              <a href={job.source_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View Job
              </a>
              <Link to="/chat" className="btn btn-outline">
                Discuss with AI
              </Link>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">
            <i className="fas fa-search"></i>
          </div>
          <h3>No Matching Jobs Found</h3>
          <p>Try adjusting your search criteria or survey answers.</p>
        </div>
      )}

      <div className="results-actions">
        <button className="btn btn-secondary" onClick={resetSearch}>
          New Search
        </button>
      </div>
    </div>
  )

  return (
    <div className="recommender-page">
      <div className="container">
        <div className="page-header">
          <h1>Job Recommender</h1>
          <p>Find job opportunities that match your skills and preferences</p>
        </div>

        {currentStep === "search" && renderSearchForm()}
        {currentStep === "survey" && renderSurvey()}
        {currentStep === "results" && renderResults()}
      </div>
    </div>
  )
}

export default RecommenderPage
