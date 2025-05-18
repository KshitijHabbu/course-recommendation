"use client"

import { useState, useEffect } from "react"
import { FiCompass, FiArrowRight, FiArrowLeft, FiLoader, FiAlertCircle } from "react-icons/fi"
import { startSuggestion, submitSuggesterAnswer } from "../services/api"
import { toast } from "react-toastify"
import "./CareerSuggester.css"

const CareerSuggester = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answersSoFar, setAnswersSoFar] = useState({})
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [suggestions, setSuggestions] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  useEffect(() => {
    const fetchFirstQuestion = async () => {
      try {
        setLoading(true)
        setError(null)
        setConnectionError(false)

        const response = await startSuggestion()

        if (response.success) {
          setCurrentQuestion(response.next_question)
          setCurrentQuestionIndex(response.current_question_index)
          setAnswersSoFar(response.answers_so_far)
        } else {
          setError("Failed to start the career suggestion process.")
          if (response.error && response.error.includes("Network error")) {
            setConnectionError(true)
          }
        }
      } catch (error) {
        setError("Network error. Please try again later.")
        setConnectionError(true)
        console.error("Error fetching first question:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFirstQuestion()
  }, [])

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) {
      toast.warning("Please provide an answer before continuing.")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const response = await submitSuggesterAnswer(currentAnswer, currentQuestionIndex, answersSoFar)

      if (response.success) {
        if (response.next_question) {
          setCurrentQuestion(response.next_question)
          setCurrentQuestionIndex(response.current_question_index)
          setAnswersSoFar(response.answers_so_far)
          setCurrentAnswer("")
        } else {
          // Final step - we have suggestions
          setSuggestions(response.suggestions)
        }
      } else {
        setError("Failed to submit your answer. Please try again.")
        if (response.error && response.error.includes("Network error")) {
          setConnectionError(true)
        }
      }
    } catch (error) {
      setError("Network error. Please try again later.")
      setConnectionError(true)
      console.error("Error submitting answer:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleRestart = () => {
    setLoading(true)
    setError(null)
    setCurrentQuestion(null)
    setCurrentQuestionIndex(0)
    setAnswersSoFar({})
    setCurrentAnswer("")
    setSuggestions(null)
    setConnectionError(false)

    // Fetch the first question again
    startSuggestion()
      .then((response) => {
        if (response.success) {
          setCurrentQuestion(response.next_question)
          setCurrentQuestionIndex(response.current_question_index)
          setAnswersSoFar(response.answers_so_far)
        } else {
          setError("Failed to restart the career suggestion process.")
          if (response.error && response.error.includes("Network error")) {
            setConnectionError(true)
          }
        }
      })
      .catch((error) => {
        setError("Network error. Please try again later.")
        setConnectionError(true)
        console.error("Error restarting:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <div className="suggester-loading">
        <FiLoader className="spin" />
        <p>Loading career suggester...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="suggester-error">
        <FiAlertCircle className="error-icon" />
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        {connectionError && (
          <div className="connection-error-message">
            <p>It looks like there might be an issue connecting to the backend server.</p>
            <p>Please make sure the Flask server is running on port 5000.</p>
          </div>
        )}
        <button onClick={handleRestart} className="restart-button">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="career-suggester-page">
      <div className="page-header">
        <div className="header-icon">
          <FiCompass />
        </div>
        <div className="header-content">
          <h1>Career Path Suggester</h1>
          <p>Answer a few questions to discover career paths that match your profile</p>
        </div>
      </div>

      <div className="suggester-container">
        {!suggestions ? (
          <div className="question-section">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((currentQuestionIndex + 1) / 11) * 100}%` }}></div>
            </div>
            <div className="progress-text">Question {currentQuestionIndex + 1} of 11</div>

            <div className="question-card">
              <h2>{currentQuestion?.text}</h2>
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={5}
                disabled={submitting}
              ></textarea>

              <div className="question-actions">
                {currentQuestionIndex > 0 && (
                  <button
                    className="back-button"
                    onClick={() => {
                      // This is a simplified back functionality
                      // In a real app, you'd need to handle this with the API
                      if (currentQuestionIndex > 0) {
                        toast.info("Going back is not supported in this demo.")
                      }
                    }}
                  >
                    <FiArrowLeft /> Back
                  </button>
                )}

                <button
                  className="next-button"
                  onClick={handleSubmitAnswer}
                  disabled={submitting || !currentAnswer.trim()}
                >
                  {submitting ? (
                    <>
                      <FiLoader className="spin" /> Processing
                    </>
                  ) : (
                    <>
                      Next <FiArrowRight />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="question-tips">
              <h3>Tips for Better Results</h3>
              <ul>
                <li>Be specific about your interests and skills</li>
                <li>Mention any industries or roles you're curious about</li>
                <li>Include your values and what matters to you in a career</li>
                <li>Share any constraints or preferences (location, work style, etc.)</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="results-section">
            <div className="results-header">
              <h2>Your Career Path Suggestions</h2>
              <p className="results-summary">{suggestions.summary}</p>
            </div>

            <div className="career-suggestions">
              {suggestions.suggestions.map((suggestion, index) => (
                <div className="career-card" key={index}>
                  <div className="career-number">{index + 1}</div>
                  <div className="career-content">
                    <h3>{suggestion.career}</h3>
                    <p>{suggestion.reason}</p>
                    <div className="career-actions">
                      <button className="explore-button">Explore This Path</button>
                      <button className="courses-button">Find Courses</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="results-actions">
              <button className="restart-button" onClick={handleRestart}>
                Start Over
              </button>
              <button className="save-button">Save Results</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareerSuggester
