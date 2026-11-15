
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import re

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), "contacts.db")

def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL
            )
        """)

init_db()

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "Python backend is running"})

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not email or not message:
        return jsonify({"error": "Please fill in all fields"}), 400

    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        return jsonify({"error": "Please enter a valid email"}), 400

    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
            (name, email, message)
        )

    return jsonify({"success": True, "message": "Message received!"}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
