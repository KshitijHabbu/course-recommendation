"""
POST /api/chatbot/message
    ➤ Handles user messages for career advice via LLM.

Request Body:
{
    "message": "What career should I pursue after B.Tech CSE?",
    "history": [
        {"role": "user", "content": "Hi"},
        {"role": "assistant", "content": "Hello! How can I help you today?"}
    ]
}

Response:
{
    "success": true,
    "reply": "Based on your CSE background, consider software development...",
    "history_update": [...]
}
"""

from flask import Blueprint, request, jsonify
from services.llm_service import get_career_advice
import logging

# Get logger instance (child logger of the root logger configured in llm_service or app.py)
log = logging.getLogger(__name__)

chatbot_bp = Blueprint('chatbot_bp', __name__, url_prefix='/api/chatbot')

@chatbot_bp.route('/message', methods=['POST'])
def handle_message():
    """Handles incoming chat messages for career guidance."""
    data = request.get_json()
    if not data or not isinstance(data, dict):
         log.warning("Chatbot request body is missing or not JSON")
         return jsonify({"success": False, "reply": None, "error": "Invalid request body. JSON object expected."}), 400

    user_message = data.get('message')
    history = data.get('history', [])

    if not user_message or not isinstance(user_message, str) or len(user_message) > 2000 : # Added length limit
        log.warning(f"Chatbot validation failed: Missing, invalid, or too long 'message'. Length: {len(user_message) if user_message else 'N/A'}")
        return jsonify({"success": False, "reply": None, "error": "Missing, invalid, or too long 'message' (string, max 2000 chars) in request body"}), 400
    if not isinstance(history, list):
        log.warning(f"Chatbot validation failed: Invalid 'history' format. Received type: {type(history)}")
        return jsonify({"success": False, "reply": None, "error": "Invalid 'history' format (must be a list)"}), 400
    # Optional: Validate history structure (list of dicts with role/content)

    log.info(f"Received chatbot message. History length: {len(history)}")
    response_data = get_career_advice(user_message, history)

    if response_data['success']:
        current_interaction = []
        if user_message: current_interaction.append({"role": "user", "content": user_message})
        if response_data['reply']: current_interaction.append({"role": "assistant", "content": response_data['reply']})
        new_history = history + current_interaction
        history_limit = 10 # How much history to send back
        limited_history_update = new_history[-history_limit:]
        log.info(f"Chatbot reply generated successfully.")
        return jsonify({"success": True, "reply": response_data['reply'], "history_update": limited_history_update})
    else:
        log.error(f"Chatbot error during LLM interaction: {response_data['error']}")
        status_code = 500
        # Refine status code based on error?
        if "client not initialized" in response_data.get('error', ''): status_code = 503 # Service Unavailable
        elif "Rate Limit Error" in response_data.get('error', ''): status_code = 429 # Too Many Requests
        return jsonify({"success": False, "reply": None, "error": response_data['error']}), status_code
