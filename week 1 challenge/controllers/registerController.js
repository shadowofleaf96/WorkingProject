const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

const showRegistrationForm = (req,res) => {
  res.render("register", { error: "" });
}

const registerUser = (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const existingUser = UserModel.findByUsername(username);
  if (existingUser) {
    return res.render("register", { error: "Username already exists" });
  }

  // Hash the password
  const passwordHash = bcrypt.hashSync(password, UserModel.saltRounds);

  // Create a new user object and add it to the array
  const newUser = {
    id: UserModel.users.length + 1,
    username,
    passwordHash,
    role: "user",
  };

  UserModel.users.push(newUser);

  // Redirect to a success page or login page
  res.redirect("/login");
}

module.exports = {
  showRegistrationForm: showRegistrationForm,
  registerUser: registerUser,
}
