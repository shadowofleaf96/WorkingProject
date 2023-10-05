// controllers/chatController.js
const socketio = require("socket.io");
const userController = require("./userController"); // Import userController

// Initialize Socket.io with the Express server
module.exports.initializeChat = (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.emit("notification", "Thanks for connecting to Codedamn!");

    // Add the connected user to the user list
    userController.addUser(socket.request.user.username);

    // Emit the updated user list to all clients
    io.emit("userList", userController.getUserList());

    socket.on("message", (message) => {
      // Get the username of the sender
      const username = socket.request.user.username;

      // Broadcast the message to all connected clients, including the sender
      io.emit("message", { from: username, text: message });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      // Remove the disconnected user from the user list
      userController.removeUser(socket.request.user.username);

      // Emit the updated user list to all clients
      io.emit("userList", userController.getUserList());
    });
  });
};