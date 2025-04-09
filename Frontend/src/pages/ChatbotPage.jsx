"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Kai, your AI Career Advisor. How can I help with your career questions today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // API call to backend
      const response = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages.map(({ role, content }) => ({ role, content })),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
          },
        ])
      } else {
        // Handle error
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
          },
        ])
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was a problem connecting to the server. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const startNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm Kai, your AI Career Advisor. How can I help with your career questions today?",
      },
    ])
  }

  // Suggested questions
  const suggestedQuestions = [
    "How can I improve my resume?",
    "What skills are in demand for software engineers?",
    "Tips for career transition to data science?",
    "How to prepare for a job interview?",
  ]

  const handleSuggestedQuestion = (question) => {
    setInput(question)
  }

  return (
    <div className="chatbot-page">
      <div className="container">
        <div className="page-header">
          <h1>AI Career Advisor</h1>
          <p>Get personalized career guidance from our AI assistant</p>
        </div>

        <div className="chat-container">
          <div className="chat-sidebar">
            <button className="new-chat-btn" onClick={startNewChat}>
              <i className="fas fa-plus"></i> New Conversation
            </button>

            <div className="chat-help">
              <h3>How can I help you?</h3>
              <ul className="suggested-questions">
                {suggestedQuestions.map((question, index) => (
                  <li key={index} onClick={() => handleSuggestedQuestion(question)}>
                    <i className="fas fa-comment-dots"></i> {question}
                  </li>
                ))}
              </ul>
            </div>

            <div className="chat-features">
              <h3>Other Career Tools</h3>
              <div className="feature-links">
                <Link to="/career-suggester" className="feature-link">
                  <i className="fas fa-compass"></i>
                  <span>Career Path Suggester</span>
                </Link>
                <Link to="/job-recommender" className="feature-link">
                  <i className="fas fa-briefcase"></i>
                  <span>Job Recommender</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="chat-main">
            <div className="messages-container">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <div className="message-avatar">
                    {message.role === "assistant" ? <i className="fas fa-robot"></i> : <i className="fas fa-user"></i>}
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message assistant">
                  <div className="message-avatar">
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            <form className="chat-input-form" onSubmit={handleSubmit}>
              <div className="chat-input-container">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your career question here..."
                  disabled={isLoading}
                />
                <button type="submit" className="send-btn" disabled={!input.trim() || isLoading}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatbotPage
