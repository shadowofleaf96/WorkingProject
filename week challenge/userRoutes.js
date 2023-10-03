const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const flash = require("express-flash"); // Added express-flash
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); // Library for password hashing
const { body, validationResult, cookie } = require("express-validator");
const rateLimit = require("express-rate-limit");
const xss = require("xss");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Passport.js Config
router.use(passport.initialize());

// Add the middleware to implement a session with Passport.js below:
router.use(passport.session());

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

// This is to validate and sanitize login inputs
const loginValidator = [
  body("username", "Username cannot be empty").not().isEmpty(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];

// This is for Rate Limiter in login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit to 3 login attempts per IP within the window
});

// Define a strong secret key for sessions (consider using an environment variable)
const secretKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NTY0NzAxOCwiaWF0IjoxNjk1NjQ3MDE4fQ.SMr1eGjU5OJW2Hxa0pzZHLi2a-y-njx2CteH5e0qL5c";

// Middleware
router.use(
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

router.use(flash()); // Added flash middleware
const formParser = bodyParser.urlencoded({ extended: false });
router.use(cookieParser());
const csrfProtect = csurf({ cookie: true });
router.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // Handle CSRF token errors here
  res.status(403);
  res.send("Form tampered with");
});

router.use(express.json());

// Complete the serializeUser function below:
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// Passport.js setup
passport.use(
  new LocalStrategy((username, password, done) => {
    const sanitizedUsername = xss(username);
    const sanitizedPassword = xss(password);
    const user = users.find((u) => u.username === sanitizedUsername);

    if (!user) {
      return done(null, false, { message: "Invalid username or password" });
    }

    if (!bcrypt.compareSync(sanitizedPassword, user.passwordHash)) {
      return done(null, false, { message: "Invalid username or password" });
    }

    return done(null, user);
  })
);

// Registration form route
router.get("/register", csrfProtect, (req, res) => {
  res.render("register", { csrfToken: req.csrfToken(), error: "" }); // Initialize error as an empty string
});

router.post("/register", formParser, (req, res) => {
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
  res.redirect("login");
});

router.get("/login", csrfProtect, (req, res) => {
  // Initialize errors as an empty array
  const errors = [];
  res.render("login", { csrfToken: req.csrfToken(), errors });
});

router.post(
  "/login",
  loginValidator, // to be fixed Later
  loginLimiter,
  formParser,
  csrfProtect,
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render("login", {
          csrfToken: req.csrfToken(),
          errors: [{ msg: info.message }], // Pass the error message as an array
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        if (user.role != "admin") {
        }
        return res.redirect("/");
      });
    })(req, res, next);
  }
);

// Add this route for editing user information
router.get("/edit-profile", formParser, csrfProtect, (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.redirect("/users/login");
  }

  // Render the edit profile form with user data
  res.render("edit-profile", {
    csrfToken: req.csrfToken(),
    user: req.user, // Pass the user object to the template
    successMessage: req.flash("successMessage"), // If you want to display success messages
    errorMessage: req.flash("errorMessage"), // If you want to display error messages
  });
});

router.post("/edit-profile", formParser, csrfProtect, (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.redirect("/users/login");
  }

  const { newUsername, newPassword } = req.body;

  // Access the current user's data from req.user
  const currentUser = req.user;

  // Update the user's information based on the form inputs
  if (newUsername) {
    // If a new username is provided, update it
    currentUser.username = newUsername;
  }

  if (newPassword) {
    // If a new password is provided, hash it and update the passwordHash
    const saltRounds = 10; // Number of salt rounds for password hashing
    currentUser.passwordHash = bcrypt.hashSync(newPassword, saltRounds);
  }

  // Redirect with a success message after updating
  req.flash("successMessage", "Profile updated successfully");

  // Redirect the user to their profile page or another appropriate page
  res.redirect("/"); // Change this to the desired destination
});

router.get("/logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("login");
      }
    });
  }
});

module.exports = router;
