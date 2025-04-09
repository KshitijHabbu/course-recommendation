"use client"

import { useState } from "react"

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your Career Advisor AI. How can I help with your career questions today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([{ id: "default", title: "New Chat", timestamp: new Date() }])

  const handleSubmit = async (e) => {
    e?.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate API call to AI service
      setTimeout(() => {
        const responses = {
          resume:
            "To improve your resume, focus on quantifiable achievements rather than just listing responsibilities. Use action verbs and include relevant keywords from the job description.",
          interview:
            "Prepare for interviews by researching the company, practicing common questions, and preparing stories that demonstrate your skills and experience.",
          "career change":
            "When changing careers, identify transferable skills, consider additional education or certifications, and network with professionals in your target industry.",
          salary:
            "When negotiating salary, research industry standards, highlight your value, and consider the entire compensation package including benefits.",
          skills:
            "To stay competitive, focus on developing both technical skills specific to your field and soft skills like communication, leadership, and adaptability.",
        }

        // Check if any keywords match
        let responseText =
          "I'd be happy to help with that. Could you provide more specific details about your career question?"

        Object.entries(responses).forEach(([keyword, response]) => {
          if (input.toLowerCase().includes(keyword)) {
            responseText = response
          }
        })

        const aiResponse = {
          id: Date.now() + 1,
          role: "assistant",
          content: responseText,
        }

        setMessages((prev) => [...prev, aiResponse])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error getting AI response:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ])
      setIsLoading(false)
    }
  }

  const startNewChat = () => {
    const newChatId = Date.now().toString()
    setChatHistory([{ id: newChatId, title: "New Chat", timestamp: new Date() }, ...chatHistory])

    setMessages([
      {
        id: 1,
        role: "assistant",
        content: "Hello! I'm your Career Advisor AI. How can I help with your career questions today?",
      },
    ])
  }

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    chatHistory,
    setChatHistory,
    startNewChat,
  }
}
