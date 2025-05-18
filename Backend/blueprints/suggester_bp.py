# blueprints/suggester_bp.py (Improved)

from flask import Blueprint, request, jsonify
from services.llm_service import get_career_suggestions_from_answers
import logging

log = logging.getLogger(__name__)
suggester_bp = Blueprint('suggester_bp', __name__, url_prefix='/api/suggester')

# ✅ Improved Static Questions (11 total)
QUESTIONS = [
    {"id": "q1", "text": "What subjects or activities did you enjoy most in school/university, and why?"},
    {"id": "q2", "text": "What are 2-3 of your strongest skills (e.g., communication, problem-solving, specific software, technical skills)?"},
    {"id": "q3", "text": "Describe your ideal work environment (e.g., collaborative team, independent work, fast-paced, structured, creative)."},
    {"id": "q4", "text": "What kind of problems or challenges do you find motivating or enjoyable to tackle?"},
    {"id": "q5", "text": "What are your salary expectations or financial goals for your career (optional)?"},
    {"id": "q6", "text": "Are there any industries or types of companies you are particularly interested in or want to avoid?"},
    # New Questions:
    {"id": "q7", "text": "What is your current level of education (e.g., 12th, UG, PG, Diploma, PhD)?"},
    {"id": "q8", "text": "Have you done any internships or projects? If yes, briefly describe them."},
    {"id": "q9", "text": "Do you have any certifications or courses completed (e.g., AWS, Python, Marketing, etc.)?"},
    {"id": "q10", "text": "Would you prefer a technical, managerial, creative, research-oriented, or people-facing role?"},
    {"id": "q11", "text": "Are you open to relocation or do you prefer working in a specific city or region?"},
]

@suggester_bp.route('/start', methods=['GET'])
def start_suggestion():
    if not QUESTIONS:
        log.error("Suggester questions list is empty.")
        return jsonify({"success": False, "error": "No questions defined."}), 500
    return jsonify({
        "success": True,
        "next_question": QUESTIONS[0],
        "answers_so_far": {},
        "current_question_index": 0
    })

@suggester_bp.route('/answer', methods=['POST'])
def handle_answer():
    data = request.get_json()
    if not data or not isinstance(data, dict):
        return jsonify({"success": False, "error": "Invalid JSON body."}), 400

    required_keys = ['answer', 'current_question_index', 'answers_so_far']
    if not all(key in data for key in required_keys):
        return jsonify({"success": False, "error": "Missing required fields."}), 400

    answer = data['answer']
    index = data['current_question_index']
    answers = data['answers_so_far']

    if not isinstance(answer, str) or len(answer.strip()) == 0 or len(answer) > 1500:
        return jsonify({"success": False, "error": "Invalid answer (must be 1–1500 characters)."}), 400

    if not isinstance(index, int) or index < 0 or index >= len(QUESTIONS):
        return jsonify({"success": False, "error": "Invalid question index."}), 400

    question_text = QUESTIONS[index]['text']
    answers[question_text] = answer.strip()

    next_index = index + 1
    if next_index < len(QUESTIONS):
        return jsonify({
            "success": True,
            "next_question": QUESTIONS[next_index],
            "answers_so_far": answers,
            "current_question_index": next_index
        })

    # All questions answered → call LLM
    log.info("All questions answered. Sending to LLM.")
    response_data = get_career_suggestions_from_answers(answers)
    if response_data['success']:
        return jsonify({
            "success": True,
            "suggestions": response_data['data'],
            "final_answers": answers,
            "next_question": None
        })
    else:
        return jsonify({
            "success": False,
            "error": response_data['error'],
            "raw_content_debug": response_data.get('raw_content', '')
        }), 500
