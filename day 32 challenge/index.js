const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const xss = require("xss");

const app = express();

// this is to validate and sanitize login inputs
const loginValidator = [
  body("username", "Username cannot be empty").not().isEmpty(),
  body("password", "The minimum password length is 6 characters").isLength({ min: 6 }),
];

// this is for Rate Limiter in login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit to 3 login attempts per IP within the window
});

// Define a strong secret key for sessions (consider using an environment variable)
const secretKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NTY0NzAxOCwiaWF0IjoxNjk1NjQ3MDE4fQ.SMr1eGjU5OJW2Hxa0pzZHLi2a-y-njx2CteH5e0qL5c";

// Middleware
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, //this make me debug for hours and it is simple
    },
  })
);
const formParser = bodyParser.urlencoded({extended: false})
app.use(cookieParser());
const csrfProtect = csurf({ cookie: true });
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.send('form tampered with')
})

app.use(express.json());
app.set("view engine", "ejs"); // Set EJS as the view engine

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Sample Vulnerable Node.js Application");
});

app.get("/login", csrfProtect, (req, res) => {
  
  res.render('login', { csrfToken: req.csrfToken() });
});

app.post("/login", formParser, csrfProtect, loginLimiter, loginValidator, (req, res) => {
  const { username, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const sanitizedData = {
    name: xss(username),
    password: xss(password),
  };

  // Authenticate user (vulnerable code for the challenge)
  if (sanitizedData.name === "admin" && sanitizedData.password === "password") {
    req.session.authenticated = true;
    req.session.username = sanitizedData.name; // Set the username in the session
    res.redirect("/profile");
  } else {
    res.send("Invalid username or password");
  }
});

const escapeHtml = (unsafe) => {
  return unsafe.replace(/[&<"']/g, (match) => {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
    }
  });
};

app.get("/profile", csrfProtect, (req, res) => {
  if (req.session.authenticated && req.session.username) {
    res.send(
      `<h1>Welcome to your profile, ${escapeHtml(req.session.username)}</h1>`
    );
  } else {
    res.redirect("/login");
  }
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
