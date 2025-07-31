const express = require("express")
const fs = require("fs")
const path = require("path")
const session = require("express-session")
const bodyParser = require("body-parser")

const app = express()
const PORT = 3000
const ARTICLES_DIR = path.join(__dirname, "articles")

// Middleware
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.use(session({
  secret: "blog_secret",
  resave: false,
  saveUninitialized: true,
}))

// Authentication middleware
function isAuthenticated(req, res, next) {
  if (req.session && req.session.loggedIn) {
    return next()
  }
  res.redirect("/login")
}

// Routes

// Home page - list of articles
app.get("/", (req, res) => {
  const files = fs.readdirSync(ARTICLES_DIR)
  const articles = files.map(file => {
    const data = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, file)))
    return { ...data, id: file }
  }).sort((a, b) => b.date.localeCompare(a.date))

  res.render("home", { articles })
})

// Article page
app.get("/article/:id", (req, res) => {
  const filepath = path.join(ARTICLES_DIR, req.params.id)
  if (!fs.existsSync(filepath)) return res.status(404).send("Not found")
  const article = JSON.parse(fs.readFileSync(filepath))
  res.render("article", { article })
})

// Login page
app.get("/login", (req, res) => res.render("login"))

app.post("/login", (req, res) => {
  const { username, password } = req.body
  if (username === "admin" && password === "password") {
    req.session.loggedIn = true
    return res.redirect("/dashboard")
  }
  res.send("Invalid credentials")
})

app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"))
})

// Admin dashboard
app.get("/dashboard", isAuthenticated, (req, res) => {
  const files = fs.readdirSync(ARTICLES_DIR)
  const articles = files.map(file => {
    const data = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, file)))
    return { ...data, id: file }
  }).sort((a, b) => b.date.localeCompare(a.date))

  res.render("dashboard", { articles })
})

// Add new article
app.get("/add", isAuthenticated, (req, res) => res.render("add", { article: null }))

app.post("/add", isAuthenticated, (req, res) => {
  const { title, content, date } = req.body
  const filename = `${date}-${title.replace(/\s+/g, "-")}.json`
  fs.writeFileSync(path.join(ARTICLES_DIR, filename), JSON.stringify({ title, content, date }))
  res.redirect("/dashboard")
})

// Edit article
app.get("/edit/:id", isAuthenticated, (req, res) => {
  const filepath = path.join(ARTICLES_DIR, req.params.id)
  const article = JSON.parse(fs.readFileSync(filepath))
  res.render("edit", { article, id: req.params.id })
})

app.post("/edit/:id", isAuthenticated, (req, res) => {
  const { title, content, date } = req.body
  const filepath = path.join(ARTICLES_DIR, req.params.id)
  fs.writeFileSync(filepath, JSON.stringify({ title, content, date }))
  res.redirect("/dashboard")
})

// Delete article
app.get("/delete/:id", isAuthenticated, (req, res) => {
  fs.unlinkSync(path.join(ARTICLES_DIR, req.params.id))
  res.redirect("/dashboard")
})

app.listen(PORT, () => console.log(`Blog running on http://localhost:${PORT}`))
