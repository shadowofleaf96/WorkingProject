const csrf = require("csurf");
const bcrypt = require("bcrypt");
const { passport, csrfProtect } = require("./authController"); // Import the passport object

const profile = (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.user.username; // Use escapeHtml here
    res.render("profile", { username, csrfToken: req.csrfToken() });
  } else {
    res.redirect("/login");
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

  if (newPassword) {
    // If a new password is provided, hash it and update the passwordHash
    const saltRounds = 10; // Number of salt rounds for password hashing
    currentUser.passwordHash = bcrypt.hashSync(newPassword, saltRounds);
  }
  // Redirect the user to their profile page or another appropriate page
  res.redirect("/"); // Change this to the desired destination
};

module.exports = {
  profile,
  editProfile,
  editProfilePost,
};
