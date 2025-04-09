"use client"

import { useRef, useEffect } from "react"
import { Send, Loader } from "lucide-react"
import MessageBubble from "./MessageBubble"
import "../styles/ChatInterface.css"

function ChatInterface({ messages, input, setInput, handleSubmit, isLoading }) {
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content loading">
              <Loader className="loading-icon" size={20} />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about resume tips, interview preparation, career changes..."
          className="chat-input"
          disabled={isLoading}
        />
        <button type="submit" className="send-button" disabled={isLoading || !input.trim()} aria-label="Send message">
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

export default ChatInterface
