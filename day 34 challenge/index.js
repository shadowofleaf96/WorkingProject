const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); // Library for password hashing
const { body, validationResult, cookie } = require("express-validator");
const rateLimit = require("express-rate-limit");
const xss = require("xss");

const app = express();

const saltRounds = 10; // The number of salt rounds for password hashing
const users = [
  {
    id: 1,
    username: "alice",
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

// this is to validate and sanitize login inputs
const loginValidator = [
  body("username", "Username cannot be empty").not().isEmpty(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
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
const formParser = bodyParser.urlencoded({ extended: false });
app.use(cookieParser());
const csrfProtect = csurf({ cookie: true });
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.send("form tampered with");
});
app.use(express.json());
app.set("view engine", "ejs"); // Set EJS as the view engine

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Basic Authentication App ");
});

// Registration form route
app.get("/register", (req, res) => {
  res.render("register", { error: "" }); // Initialize error as an empty string
});

app.post("/register", formParser, (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    // Pass the error message to the template
    return res.render("register", { error: "Username already exists" });
  }

  // Hash the password
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  // Create a new user object and add it to the array
  const newUser = {
    id: users.length + 1,
    username,
    passwordHash,
    role: "user", // You can set the role as needed
  };

  users.push(newUser);

  // Redirect to a success page or login page
  res.redirect("/login");
});

app.get("/login", csrfProtect, (req, res) => {
  const errors = []; // Create an empty errors array
  res.render("login", { csrfToken: req.csrfToken(), errors }); // Pass the errors array to the template
});

app.post(
  "/login",
  formParser,
  csrfProtect,
  loginLimiter,
  loginValidator,
  (req, res) => {
    try {
      const { username, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("login", {
          csrfToken: req.csrfToken(),
          errors: "Invalid username or password",
          errors: errors.array(), // Pass the errors array to the template
        });
      }
      const sanitizedData = {
        name: xss(username),
        password: xss(password),
      };

      // Validate and authenticate the user securely
      const user = users.find((u) => u.username === sanitizedData.name);
      if (
        user &&
        bcrypt.compareSync(sanitizedData.password, user.passwordHash)
      ) {
        if (username === sanitizedData.name || password === user.passwordHash) {
          req.session.isAuthenticated = true;
          req.session.username = username; // Set the username in the session
          res.redirect("/profile");
        } else {
          res.redirect("/");
        }
      } else {
        // Redirect to '/' if the username or password is incorrect
        res.render("login", { csrfToken: req.csrfToken(), errors: "Invalid username or password" });
        res.redirect("/login");
      }
    } catch (errors) {
      console.error("Error during login:", errors);
      res.redirect("/");
    }
  }
);

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
  if (req.session.isAuthenticated) {
    const username = req.session.username; // Retrieve the username from the session
    res.render("profile", { username, escapeHtml, csrfToken: req.csrfToken() });
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/login");
      }
    });
  }
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
