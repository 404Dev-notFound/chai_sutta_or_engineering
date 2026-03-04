import os
import sqlite3
import json
from flask import Flask, request, jsonify, send_file, session, redirect, url_for
import joblib

app = Flask(__name__, static_folder=".", static_url_path="")
app.secret_key = "cse_super_secret_key"  # Simple secret for session

DB_PATH = "database.db"
MODEL_PATH = "model.pkl"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS anonymous_posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            likes INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

@app.route("/")
def index():
    return send_file("index.html")

@app.route("/dashboard")
def dashboard():
    return send_file("dashboard.html")

@app.route("/anonymous")
def anonymous():
    return send_file("anonymous.html")

@app.route("/about")
def about():
    return send_file("about.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return send_file("login.html")
    else:
        email = request.form.get("email")
        password = request.form.get("password")
        # Simple plain-text check for MVP (password_hash should ideally be hashed)
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("SELECT id, password_hash FROM users WHERE email=?", (email,))
        user = c.fetchone()
        
        if not user:
            # Register user automatically for MVP purposes
            c.execute("INSERT INTO users (email, password_hash) VALUES (?, ?)", (email, password))
            conn.commit()
            user_id = c.lastrowid
        else:
            if user[1] != password:
                conn.close()
                return jsonify({"error": "Invalid password"}), 401
            user_id = user[0]
            
        conn.close()
        session["user_id"] = user_id
        session["email"] = email
        return redirect(url_for("dashboard"))

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

@app.route("/user-info")
def user_info():
    if "user_id" in session:
        return jsonify({"email": session["email"]})
    return jsonify({"error": "Not logged in"}), 401

@app.route("/calculate-dropout", methods=["POST"])
def calculate_dropout():
    data = request.json
    try:
        study_hours = float(data.get("study_hours", 0))
        internship_attempts = float(data.get("internship_attempts", 0))
        skill_growth = float(data.get("skill_growth", 0))
        clarity_score = float(data.get("clarity_score", 0))
        consistency = float(data.get("consistency", 0))
        confidence = float(data.get("confidence", 0))

        risk_percentage = 0
        risk_level = "Unknown"
        suggestions = []

        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
            features = [[study_hours, internship_attempts, skill_growth, clarity_score, consistency, confidence]]
            prob = model.predict_proba(features)[0][1] # Probability of dropout (1)
            risk_percentage = round(prob * 100, 2)
        else:
            # Fallback logic scoring
            score = 0
            if study_hours < 2: score -= 2
            elif study_hours > 5: score += 2
            
            if internship_attempts == 0: score -= 3
            else: score += internship_attempts * 1.5
            
            score += skill_growth * 0.5
            score += clarity_score * 0.5
            score += consistency * 0.5
            score += confidence * 0.5
            
            # Normalize score to roughly 0-100 inverted (higher score = lower risk)
            # Max possible rough score is around 20-30. Let's make a simple mapping:
            max_score = 30
            normalized = max(0, min(100, (score / max_score) * 100))
            risk_percentage = round(100 - normalized, 2)
            
        if risk_percentage > 70:
            risk_level = "High Risk"
            suggestions = ["Start building min-viable projects.", "Join the CS.E community.", "Focus on 1 core skill."]
        elif risk_percentage > 40:
            risk_level = "Moderate Risk"
            suggestions = ["Apply for more internships.", "Increase your consistency.", "Participate in hackathons."]
        else:
            risk_level = "Safe Zone"
            suggestions = ["Keep grinding.", "Mentor others.", "Start your own side hustle."]

        return jsonify({
            "risk_percentage": risk_percentage,
            "risk_level": risk_level,
            "suggestions": suggestions
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/anonymous-post", methods=["POST"])
def create_anonymous_post():
    data = request.json
    content = data.get("content", "").strip()
    if not content:
        return jsonify({"error": "Content cannot be empty"}), 400
        
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO anonymous_posts (content) VALUES (?)", (content,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

@app.route("/anonymous-posts", methods=["GET"])
def get_anonymous_posts():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT id, content, created_at, likes FROM anonymous_posts ORDER BY created_at DESC")
    posts = [{"id": row[0], "content": row[1], "created_at": row[2], "likes": row[3]} for row in c.fetchall()]
    conn.close()
    return jsonify({"posts": posts})

@app.route("/anonymous-post/<int:post_id>/like", methods=["POST"])
def like_anonymous_post(post_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("UPDATE anonymous_posts SET likes = likes + 1 WHERE id = ?", (post_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
