const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const csurf = require("csurf");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/userRoutes'); // Adjust the path based on your project structure
const {blogArticles, router} = require('./routes/blogRoutes'); // Import only the router
const app = express();

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
      secure: false, // This makes me debug for hours, and it is simple
    },
  })
);

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

app.use('/users', userRoutes);
app.use('/blogs', router);

const formParser = bodyParser.urlencoded({ extended: false });
app.use(cookieParser());
const csrfProtect = csurf({ cookie: true });
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // Handle CSRF token errors here
  res.status(403);
  res.send("Form tampered with");
});
// Middleware
app.use(passport.initialize());

// Add the middleware to implement a session with Passport.js below:
app.use(passport.session());
app.use(express.json());
app.set("view engine", "ejs"); // Set EJS as the view engine

// Routes
app.get("/", formParser, csrfProtect, (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.user.username;
    const userRole = req.user.role; // Assuming the user role is stored in req.user.role
    res.render("index", { username, escapeHtml, blogArticles, csrfToken: req.csrfToken(), user: { role: userRole } });
  } else {
    res.redirect("/users/login"); // Use an absolute path to redirect
  }
});

// Profile route (protected)
app.get("/profile", formParser, csrfProtect, (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.user.username;
    res.render("profile", { username, escapeHtml, csrfToken: req.csrfToken() });
  } else {
    res.redirect("users/login");
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

// Server
app.listen(3000, () => {
  console.log("Server is working on http://127.0.0.1:3000");
});
