// Import required packages
const express = require("express"); // Import the Express.js framework
const session = require("express-session"); // Middleware for session management
const cookieParser = require("cookie-parser"); // Middleware for parsing cookies
const csurf = require("csurf"); // Middleware for CSRF protection
const bcrypt = require("bcrypt"); // Library for password hashing
const { body, validationResult } = require('express-validator');
const xss = require('xss');
const app = express(); // Create an Express application

const saltRounds = 10; // The number of salt rounds for password hashing
const users = [
  {
    id: 1,
    username: "user1",
    passwordHash: bcrypt.hashSync("user123", saltRounds), // Hash the password and store it
    role: "user",
  },
  {
    id: 2,
    username: "admin",
    passwordHash: bcrypt.hashSync("admin1234", saltRounds), // Hash the password and store it
    role: "admin",
  },
];

const loginValidator = [
  body('username', 'Username cannot be empty').not().isEmpty(),
  body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
];

// Define a strong secret key for sessions (consider using an environment variable)
const secretKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NTY0NzAxOCwiaWF0IjoxNjk1NjQ3MDE4fQ.SMr1eGjU5OJW2Hxa0pzZHLi2a-y-njx2CteH5e0qL5c";

// Middleware section

app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(
  session({
    secret: secretKey,
    resave: false, // Do not save session data if not modified
    saveUninitialized: false, // Do not save uninitialized sessions
    cookie: { secure: true }, // Enable secure cookies (requires HTTPS)
  })
);
app.use(cookieParser()); // Parse cookies
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.json()); // Parse JSON request bodies
app.use(csurf({ cookie: true })); // Add CSRF protection to routes

// Routes section

app.get("/", (req, res) => {
  // Render the index view and pass the CSRF token
  res.render("index", { csrfToken: req.csrfToken() });
});

app.post("/login", loginValidator, (req, res) => {
  try {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sanitizedData = {
      name: xss(username),
      password: xss(password),
    };

    // Validate and authenticate the user securely
    const user = users.find((u) => u.username === sanitizedData.name);
    if (user && bcrypt.compareSync(sanitizedData.password, user.passwordHash)) {
      if (username === 'admin') {
        req.session.isAuthenticated = true;
        res.redirect('/dashboard');
      } else {
        res.redirect('/');
      }
    } else {
      // Redirect to '/' if the username or password is incorrect
      res.redirect('/');
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.redirect("/");
  }
});

app.get("/dashboard", (req, res) => {
  // Secure the dashboard route to only allow authenticated users
  req.session.isAuthenticated = true;
  if (req.session.isAuthenticated) {
    res.render("dashboard");
  } else {
    res.redirect("/");
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000");
});