// models/user.js
const bcrypt = require("bcrypt");

const saltRounds = 10;

const users = [
  {
    id: 1,
    username: "alice",
    passwordHash: bcrypt.hashSync("user123", saltRounds),
    image: "images/alice.png",
    role: "user",
  },
  {
    id: 2,
    username: "admin",
    passwordHash: bcrypt.hashSync("admin1234", saltRounds),
    image: "images/admin.png",
    role: "admin",
  },
];

function findByUsername(username) {
  return users.find((user) => user.username === username);
}

module.exports = {
  findByUsername,
  saltRounds,
  users,
};