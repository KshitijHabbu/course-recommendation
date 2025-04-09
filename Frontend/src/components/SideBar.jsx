"use client"

import { X, Plus, MessageSquare, Clock } from "lucide-react"
import "../styles/Sidebar.css"

function Sidebar({ isOpen, onClose, chatHistory, startNewChat, isLoggedIn }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>Chat History</h2>
        <button className="icon-button" onClick={onClose} aria-label="Close sidebar">
          <X size={20} />
        </button>
      </div>

      <button className="new-chat-button" onClick={startNewChat}>
        <Plus size={16} />
        <span>New Chat</span>
      </button>

      <div className="chat-history">
        {isLoggedIn ? (
          chatHistory.length > 0 ? (
            chatHistory.map((chat) => (
              <div key={chat.id} className="chat-history-item">
                <MessageSquare size={16} />
                <div className="chat-info">
                  <span className="chat-title">{chat.title}</span>
                  <span className="chat-time">
                    <Clock size={12} />
                    {formatDate(chat.timestamp)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-history">No chat history yet</p>
          )
        ) : (
          <div className="login-prompt">
            <p>Sign in to save your chat history</p>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="features-list">
          <h3>Features</h3>
          <ul>
            <li>Resume Review</li>
            <li>Interview Preparation</li>
            <li>Career Path Planning</li>
            <li>Salary Negotiation</li>
            <li>Skills Assessment</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
