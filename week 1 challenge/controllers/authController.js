const passport = require("passport");
const UserModel = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const csrf = require("csurf");
const xss = require("xss");
const winston = require('winston');
const bcrypt = require("bcrypt");

let authenticated = ""
const csrfProtect = csrf({ cookie: true });
// Complete the serializeUser function below:
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = UserModel.users.find((u) => u.id === id);
  done(null, user);
});

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

// Passport.js setup
passport.use(
  new LocalStrategy((username, password, done) => {
    const sanitizedUsername = xss(username);
    const sanitizedPassword = xss(password);
    const user = UserModel.users.find((u) => u.username === sanitizedUsername);

    if (!user) {
      logger.error('An error occurred!', { error: 'Invalid username or password' });
      return done(null, false, { message: "Invalid username or password" });
    }

    if (!bcrypt.compareSync(sanitizedPassword, user.passwordHash)) {
      logger.error('An error occurred!', { error: 'Invalid username or password' });
      return done(null, false, { message: "Invalid username or password" });
    }

    return done(null, user);
  })
);

function loginGet(req, res) {
  const csrfToken = req.csrfToken();
  res.render("login", { csrfToken, errors: [] });
}

function loginPost(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const csrfToken = req.csrfToken();
      return res.render("login", {
        csrfToken,
        errors: [{ msg: info.message }],
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/profile");
    });
  })(req, res, next);
}

function redirect(req, res) {
    res.redirect("/profile");
}

function logout(req, res) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
}

  module.exports = {
    passport, 
    authenticated,
    login: loginGet,
    postLogin: loginPost,
    redirect: redirect,
    logout: logout,
    csrfProtect,
  };
