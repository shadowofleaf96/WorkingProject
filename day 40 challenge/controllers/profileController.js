const csrf = require("csurf");
const multer = require("multer");
const bcrypt = require("bcrypt");
const axios = require("axios");
const moment = require("moment");
const path = require("path");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-fs-backend");
const winston = require("winston");
const { passport, csrfProtect } = require("./authController"); // Import the passport object

// Create a logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      backend: {
        loadPath: path.resolve(__dirname, "../locales/{{lng}}/{{ns}}.json"),
      },
      debug: false,
      detection: {
        order: ["querystring", "cookie"],
        caches: ["cookie"],
      },
      saveMissing: true,
      fallbackLng: "en",
      preload: ["en", "fr"],
      ns: ["common"], // Namespaces for translations
      defaultNS: "common", // Default namespace
      nsSeparator: "#||#",
      keySeparator: "#|#",
    },
    (err, t) => {
      if (err) return console.error(err);
    }
  );
const profile = async (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.user.username;
    const logo = req.user.image;
    await axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=ff1a83ae59474a648a902aad7abe8621"
      )
      .then((response) => {
        const blogPosts = response.data.articles;
        res.render("profile", {
          username,
          t: i18next.t,
          blogPosts,
          logo,
          moment,
          csrfToken: req.csrfToken(),
        });
      })
      .catch(function (error) {
        logger.error("An error occurred!", { error: error });
      });
  } else {
    await axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=ff1a83ae59474a648a902aad7abe8621"
      )
      .then((response) => {
        const blogPosts = response.data.articles;
        res.render("index", {
          t: i18next.t,
          blogPosts,
          moment,
          csrfToken: req.csrfToken(),
        });
      })
      .catch(function (error) {
        logger.error("An error occurred!", { error: error });
      });
  }
};

const editProfile = (req, res) => {
  // Add this route for editing user information
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  // Access csrfToken from the req object
  const csrfToken = req.csrfToken();
  // Render the edit profile form with user data
  res.render("edit-profile", {
    csrfToken,
    user: req.user, // Pass the user object to the template
  });
};

const editProfilePost = (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const { newUsername, newPassword } = req.body;

  // Access csrfToken from the req object
  const csrfToken = req.csrfToken();

  // Access the current user's data from req.user
  const currentUser = req.user;

  // Update the user's information based on the form inputs
  if (newUsername) {
    // If a new username is provided, update it
    currentUser.username = newUsername;
  }

  // Define a route that handles file uploads
  // Access the uploaded file details
  const newImage = req.file.originalname;

  if (newImage) {
    currentUser.image = "images/" + newImage;
  }

  if (newPassword) {
    // If a new password is provided, hash it and update the passwordHash
    const saltRounds = 10; // Number of salt rounds for password hashing
    currentUser.passwordHash = bcrypt.hashSync(newPassword, saltRounds);
  }

  // Redirect the user to their profile page or another appropriate page
  res.redirect("/");
};

module.exports = {
  profile,
  i18next,
  i18nextMiddleware,
  editProfile,
  editProfilePost,
};
