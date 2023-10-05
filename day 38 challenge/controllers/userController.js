const connectedUsers = new Set();

function addUser(username) {
  connectedUsers.add(username);
}

function removeUser(username) {
  connectedUsers.delete(username);
}

function getUserList() {
  return Array.from(connectedUsers);
}

module.exports = {
  addUser,
  removeUser,
  getUserList,
};