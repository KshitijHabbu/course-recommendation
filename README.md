
#  Course Recommendation

Course Recommendation is a Flask-based API system that provides personalized course recommendations using Large Language Models (LLMs). It analyzes user inputs—either through chat or structured Q&A—and suggests relevant career paths and courses to help users build the skills needed for those roles. The system combines static data with AI reasoning (via Groq’s LLaMA3 model) to offer accurate, India-focused guidance for career and learning development.

---

##  Features

- 🤖 Chatbot for career advice (LLM-powered)
- 📋 Q&A-based career suggester
- 🔍 Survey-based course recommender
- 🔗 RESTful API with modular Flask Blueprints

---

##  Project Structure

```
course-recommendation-backend/
├── app.py                   # Flask entrypoint
├── chatbot_bp.py            # Chatbot routes
├── suggester_bp.py          # Q&A suggester routes
├── recommender_bp.py        # Job recommender routes
├── services/
│   ├── job_search_service.py  # Static job data
│   └── llm_service.py         # LLM integration
├── .env                    # Environment variables
├── requirements.txt        # Python dependencies
└── README.md
```

---

##  API Endpoints

| Endpoint                            | Method | Purpose                             |
|-------------------------------------|--------|-------------------------------------|
| `/api/chatbot/message`             | POST   | Get career advice via chatbot       |
| `/api/suggester/start`             | GET    | Start Q&A career suggestion survey  |
| `/api/suggester/answer`            | POST   | Submit answer and get next question |
| `/api/recommender/start`           | POST   | Start job survey                    |
| `/api/recommender/submit`          | POST   | Submit answers and get jobs         |
| `/`                                | GET    | Health check and endpoint overview  |

---

##  Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/KshitijHabbu/course-recommendation.git
cd Backend
```

2. **Install dependencies**
```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

3. **Create `.env` file**
```
FLASK_SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_key
```

4. **Run the app**
```bash
python app.py
```

---

##  Requirements

```
Flask
python-dotenv
groq
requests
```

---

##  Example: Chatbot Request

**POST** `/api/chatbot/message`
```json
{
  "message": "What can I do after B.Tech in IT?",
  "history": []
}
```

**Response:**
```json
{
  "success": true,
  "reply": "You can consider roles like software developer, data analyst..."
}
```

---
