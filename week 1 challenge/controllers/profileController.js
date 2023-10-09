const csrf = require("csurf");
const multer = require("multer");
const bcrypt = require("bcrypt");
const axios = require("axios");
const moment = require("moment");
const path = require("path");
const i18next = require("i18next");
const bodyParser = require("body-parser");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-fs-backend");
const winston = require("winston");
const { passport, csrfProtect } = require("./authController"); // Import the passport object
const { blogs } = require("../models/blogs"); // Import the passport object

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
    res.render("profile", {
      username,
      t: i18next.t,
      blogs,
      logo,
      moment,
      csrfToken: req.csrfToken(),
    });
  } else {
    res.render("index", {
      t: i18next.t,
      blogs,
      moment,
      csrfToken: req.csrfToken(),
    });
  }
};

const newBlog = (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.user.username;
    const logo = req.user.image;
    res.render("new-blog-post", { logo, username });
  } else {
    res.redirect("/login");
  }
};

const createBlog = (req, res) => {
  const { title, content } = req.body;
  const urlToImage = "images/" + req.file.originalname;

  const newBlogPost = {
    id: blogs.length + 1,
    title,
    content,
    urlToImage,
  };
  blogs.push(newBlogPost);
  res.redirect("/"); // Redirect to the homepage after adding the post
};

const editBlog = (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.user.username;
    const logo = req.user.image;
    res.render("edit-blog-post", { logo, username, blogs });
  } else {
    res.redirect("/login");
  }
};

const updateBlog = (req, res) => {
  const selectedPostId = req.body.selectedPost;
  const editedTitle = req.body.editedTitle;
  const editedContent = req.body.editedContent;

  // Find the selected blog post by its ID
  const selectedPost = blogs.find(
    (post) => post.id === parseInt(selectedPostId)
  );

  if (!selectedPost) {
    // Handle the case where the selected post is not found (e.g., display an error message)
    res.render("edit-blog-post", {
      blogs,
      errorMessage: "Selected blog post not found.",
    });
  } else {
    // Update the selected blog post with the edited title and content
    selectedPost.title = editedTitle;
    selectedPost.content = editedContent;

    // Redirect to a success page or a list of blog posts
    res.redirect("/");
  }
};

const confirmDelete = (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.user.username;
    const logo = req.user.image;
    res.render("delete-blog-post", { logo, username, blogs });
  } else {
    res.redirect("/login");
  }
};

const deleteBlog = (req, res) => {
  const selectedPostId = req.body.selectedPost;

  // Find the index of the selected blog post by its ID
  const selectedIndex = blogs.findIndex(
    (post) => post.id === parseInt(selectedPostId)
  );

  if (selectedIndex === -1) {
    // Handle the case where the selected post is not found (e.g., display an error message)
    res.render("delete-blog-post", {
      blogs,
      errorMessage: "Selected blog post not found.",
    });
  } else {
    // Remove the selected blog post from the array
    blogs.splice(selectedIndex, 1);

    // Redirect to a success page or a list of blog posts
    res.redirect("/");
  }
};

const editProfile = (req, res) => {
  // Add this route for editing user information
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const username = req.user.username;
  const logo = req.user.image;
  // Access csrfToken from the req object
  const csrfToken = req.csrfToken();
  // Render the edit profile form with user data
  res.render("edit-profile", {
    csrfToken,
    user: req.user, // Pass the user object to the template
    blogs,
    username,
    logo,
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
  newBlog,
  createBlog,
  editBlog,
  updateBlog,
  i18next,
  confirmDelete,
  deleteBlog,
  i18nextMiddleware,
  editProfile,
  editProfilePost,
};
