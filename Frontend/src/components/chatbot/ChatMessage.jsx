"use client"

import { useState, useEffect } from "react"
import { FiUser } from "react-icons/fi"
import "./ChatMessage.css"

const ChatMessage = ({ message, isLast }) => {
  const [displayedContent, setDisplayedContent] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const isUser = message.role === "user"

  useEffect(() => {
    if (isLast && !isUser) {
      setIsTyping(true)
      let i = 0
      const content = message.content
      const typingInterval = setInterval(() => {
        if (i < content.length) {
          setDisplayedContent(content.substring(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
        }
      }, 15) // Adjust typing speed here

      return () => clearInterval(typingInterval)
    } else {
      setDisplayedContent(message.content)
    }
  }, [message, isLast, isUser])

  return (
    <div className={`chat-message ${isUser ? "user" : "assistant"}`}>
      <div className="message-avatar">
        {isUser ? (
          <div className="user-avatar">
            <FiUser />
          </div>
        ) : (
          <div className="assistant-avatar">
            <img src="/ai-avatar.svg" alt="AI Assistant" />
          </div>
        )}
      </div>
      <div className="message-content">
        <div className="message-bubble">
          {isUser ? message.content : displayedContent}
          {isTyping && <span className="cursor"></span>}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
