import "../styles/MessageBubble.css"

function MessageBubble({ message }) {
  const isUser = message.role === "user"

  return (
    <div className={`message ${isUser ? "user" : "assistant"}`}>
      <div className="avatar">{isUser ? "👤" : "🤖"}</div>
      <div className="message-content">{message.content}</div>
    </div>
  )
}

export default MessageBubble
