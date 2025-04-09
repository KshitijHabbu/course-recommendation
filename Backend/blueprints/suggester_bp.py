# blueprints/suggester_bp.py
from flask import Blueprint, request, jsonify
from services.llm_service import get_career_suggestions_from_answers
import logging

log = logging.getLogger(__name__)

suggester_bp = Blueprint('suggester_bp', __name__, url_prefix='/api/suggester')

# Static Questions
QUESTIONS = [
    {"id": "q1", "text": "What subjects or activities did you enjoy most in school/university, and why?"},
    {"id": "q2", "text": "What are 2-3 of your strongest skills (e.g., communication, problem-solving, specific software, technical skills)?"},
    {"id": "q3", "text": "Describe your ideal work environment (e.g., collaborative team, independent work, fast-paced, structured, creative)."},
    {"id": "q4", "text": "What kind of problems or challenges do you find motivating or enjoyable to tackle?"},
    {"id": "q5", "text": "What are your salary expectations or financial goals for your career (optional)?"},
    {"id": "q6", "text": "Are there any industries or types of companies you are particularly interested in or want to avoid?"},
]

@suggester_bp.route('/start', methods=['GET'])
def start_suggestion():
    """Starts the Q&A process, returns the first question."""
    if not QUESTIONS:
         log.error("Suggester questions list is empty.")
         return jsonify({"success": False, "error": "Internal configuration error: No questions defined."}), 500
    first_question = QUESTIONS[0]
    log.info("Starting career suggester Q&A.")
    return jsonify({"success": True, "next_question": first_question, "answers_so_far": {}, "current_question_index": 0})

@suggester_bp.route('/answer', methods=['POST'])
def handle_answer():
    """Handles user's answer, returns next question or final suggestions."""
    data = request.get_json()
    if not data or not isinstance(data, dict):
         log.warning("Suggester answer request body is missing or not JSON")
         return jsonify({"success": False, "error": "Invalid request body. JSON object expected."}), 400
    required_keys = ['answer', 'current_question_index', 'answers_so_far']
    if not all(key in data for key in required_keys):
        log.warning(f"Suggester answer request missing required keys. Received: {data.keys()}")
        return jsonify({"success": False, "error": f"Missing required fields: {', '.join(required_keys)}"}), 400

    answer = data['answer']
    current_index = data['current_question_index']
    answers_so_far = data['answers_so_far']

    if not isinstance(answer, str) or len(answer.strip()) == 0 or len(answer) > 1500: # Added length limit and non-empty check
         log.warning(f"Suggester answer validation failed: Invalid or empty 'answer'. Length: {len(answer)}")
         return jsonify({"success": False, "error": "Invalid, empty, or too long 'answer' (string, 1-1500 chars) provided"}), 400
    if not isinstance(current_index, int) or current_index < 0 or current_index >= len(QUESTIONS):
         log.warning(f"Suggester answer validation failed: Invalid 'current_question_index'. Received: {current_index}")
         return jsonify({"success": False, "error": "Invalid 'current_question_index'"}), 400
    if not isinstance(answers_so_far, dict):
         log.warning(f"Suggester answer validation failed: Invalid 'answers_so_far' format. Received: {type(answers_so_far)}")
         return jsonify({"success": False, "error": "Invalid 'answers_so_far' format (must be a dictionary/object)"}), 400

    log.info(f"Received answer for suggester question index {current_index}.")
    try:
         question_text = QUESTIONS[current_index]['text']
         answers_so_far[question_text] = answer # Store answer using question text as key
    except IndexError:
         log.error(f"IndexError: current_question_index {current_index} is out of bounds for QUESTIONS list.")
         return jsonify({"success": False, "error": "Internal error: question index out of bounds."}), 500

    next_index = current_index + 1
    if next_index < len(QUESTIONS):
        next_question = QUESTIONS[next_index]
        log.info(f"Returning suggester question index {next_index}.")
        return jsonify({"success": True, "next_question": next_question, "answers_so_far": answers_so_far, "current_question_index": next_index})
    else:
        log.info("All suggester questions answered. Requesting LLM analysis.")
        response_data = get_career_suggestions_from_answers(answers_so_far)
        if response_data['success']:
            log.info("Career suggestions generated and returned successfully.")
            return jsonify({"success": True, "suggestions": response_data['data'], "final_answers": answers_so_far, "next_question": None})
        else:
            log.error(f"Suggester LLM analysis failed: {response_data['error']}")
            error_payload = {"success": False, "suggestions": None, "error": response_data['error']}
            if 'raw_content' in response_data: error_payload['raw_content_debug'] = response_data['raw_content']
            status_code = 500
            if "client not initialized" in response_data.get('error', ''): status_code = 503
            elif "Rate Limit Error" in response_data.get('error', ''): status_code = 429
            return jsonify(error_payload), status_code