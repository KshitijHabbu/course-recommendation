"use client"

import { useState, useEffect, useRef } from "react"
import { FiSend, FiMessageCircle, FiLoader, FiAlertCircle } from "react-icons/fi"
import ChatMessage from "./ChatMessage"
import { sendChatMessage } from "../../services/api"
import { toast } from "react-toastify"
import "./ChatWindow.css"

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm Kai, your AI Career Guide. How can I help with your career questions today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Convert messages to the format expected by the API
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await sendChatMessage(input, history)

      if (response.success && response.reply) {
        const assistantMessage = {
          role: "assistant",
          content: response.reply,
        }

        setMessages((prev) => [...prev, assistantMessage])
      } else {
        throw new Error(response.error || "Failed to get response")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error.toString())

      const errorMessage = {
        role: "assistant",
        content:
          "I'm sorry, I'm having trouble connecting to the server. Please check if the backend is running and try again.",
        isError: true,
      }

      setMessages((prev) => [...prev, errorMessage])
      toast.error("Connection error. Please check if the backend server is running.")
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-title">
          <FiMessageCircle />
          <h2>Career Guide Chat</h2>
        </div>
        <p>Ask any career-related questions</p>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} isLast={index === messages.length - 1} />
        ))}

        {isLoading && (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}

        {error && !isLoading && (
          <div className="connection-error">
            <FiAlertCircle />
            <p>Connection error. Please check if the backend server is running.</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your career question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          ref={inputRef}
        />
        <button type="submit" disabled={isLoading || !input.trim()} className={isLoading ? "loading" : ""}>
          {isLoading ? <FiLoader className="spin" /> : <FiSend />}
        </button>
      </form>
    </div>
  )
}

export default ChatWindow
