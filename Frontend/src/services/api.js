const API_BASE_URL = "http://localhost:5000/api"

// Helper function for handling API responses
const handleResponse = async (response) => {
  const data = await response.json()
  if (!response.ok) {
    const error = (data && data.error) || response.statusText
    return Promise.reject(error)
  }
  return data
}

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error("API Error:", error)
  if (error.message === "Failed to fetch") {
    return {
      success: false,
      error: "Network error: Unable to connect to the server. Please check if the backend server is running.",
    }
  }
  return {
    success: false,
    error: error.toString(),
  }
}

// Chatbot API
export const sendChatMessage = async (message, history = []) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chatbot/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    })
    return handleResponse(response)
  } catch (error) {
    return handleApiError(error)
  }
}

// Career Suggester API
export const startSuggestion = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/suggester/start`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    return handleResponse(response)
  } catch (error) {
    return handleApiError(error)
  }
}

export const submitSuggesterAnswer = async (answer, currentQuestionIndex, answersSoFar) => {
  try {
    const response = await fetch(`${API_BASE_URL}/suggester/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer,
        current_question_index: currentQuestionIndex,
        answers_so_far: answersSoFar,
      }),
    })
    return handleResponse(response)
  } catch (error) {
    return handleApiError(error)
  }
}

// Course Recommender API
export const startRecommendation = async (keywords, location = "India") => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommender/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords, location }),
    })
    return handleResponse(response)
  } catch (error) {
    return handleApiError(error)
  }
}

export const submitRecommenderSurvey = async (requestId, answers) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommender/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id: requestId, answers }),
    })
    return handleResponse(response)
  } catch (error) {
    return handleApiError(error)
  }
}
