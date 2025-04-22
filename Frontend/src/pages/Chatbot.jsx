"use client"

import { useState } from "react"
import { FiMessageCircle, FiHelpCircle } from "react-icons/fi"
import ChatWindow from "../components/chatbot/ChatWindow"
import "./Chatbot.css"

const Chatbot = () => {
  const [showTips, setShowTips] = useState(true)

  const sampleQuestions = [
    "What skills should I develop to transition from teaching to instructional design?",
    "How can I prepare for a career in data science if I have a background in marketing?",
    "What certifications are most valuable for a career in cybersecurity?",
    "How do I create a portfolio for UX design with no professional experience?",
    "What's the career outlook for AI specialists in India over the next 5 years?",
  ]

  // Add click handler for suggested prompts
  const handleSampleQuestionClick = (question) => {
    if (window.handleSuggestedPrompt) {
      window.handleSuggestedPrompt(question)
    }
  }

  return (
    <div className="chatbot-page">
      <div className="page-header">
        <div className="header-icon">
          <FiMessageCircle />
        </div>
        <div className="header-content">
          <h1>Career Guide Chat</h1>
          <p>Ask any questions about career paths, skills, education, or job market trends</p>
        </div>
      </div>

      <div className="chatbot-container">
        <div className="chat-main">
          <ChatWindow />

          {showTips && (
            <div className="chat-tips">
              <div className="tips-header">
                <h3>
                  <FiHelpCircle />
                  Tips for Better Conversations
                </h3>
                <button onClick={() => setShowTips(false)}>Hide</button>
              </div>
              <ul>
                <li>Be specific about your background, skills, and goals</li>
                <li>Ask about specific industries or roles you're interested in</li>
                <li>Inquire about skills, certifications, or education needed for specific careers</li>
                <li>Ask for advice on career transitions or upskilling</li>
              </ul>
            </div>
          )}
        </div>

        <div className="chat-sidebar">
          <div className="sample-questions">
            <h3>Try Asking</h3>
            <ul>
              {sampleQuestions.map((question, index) => (
                <li key={index}>
                  <button onClick={() => handleSampleQuestionClick(question)}>{question}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="chat-info">
            <h3>About This Chatbot</h3>
            <p>
              Our AI Career Guide is trained on career data and job market trends in India. It can provide guidance on
              career paths, skill development, education options, and job market insights.
            </p>
            <p>
              While our AI provides valuable information, consider consulting with human career counselors for
              personalized guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
