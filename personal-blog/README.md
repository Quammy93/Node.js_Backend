# Personal Blog App

A minimalist blog platform built with Node.js, Express, and EJS. It features a public guest section for reading articles and an admin section for managing blog posts (create, edit, delete) using basic file-based storage.

---

## ✨ Features

### Guest Section
- 🏠 **Home Page** — Displays a list of published articles
- 📄 **Article Page** — View full content of each article

### Admin Section
- 🔐 **Login System** — Basic authentication (hardcoded credentials)
- 🧾 **Dashboard** — Manage articles (add, edit, delete)
- 📝 **Add/Edit Article** — Form to create or update articles
- ❌ **Delete Article** — Remove unwanted articles

---

## 📁 Project Structure

personal-blog/
├── articles/ # Blog posts saved as JSON files
├── public/ # Static assets (CSS)
├── views/ # EJS templates
├── app.js # Main Express application
├── package.json
└── README.md


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/personal-blog.git
cd personal-blog


# Install dependencies
npm install

# Create folders (if not present)

mkdir articles public views


# Run the server
node app.js
Visit: http://localhost:3000


# Admin Login

Field	    Value
Username	admin
Password	password

# Technologies Used
Node.js

Express.js

EJS (Embedded JavaScript Templates)

Express-Session

HTML + CSS (no JavaScript required)

File system (fs module)

