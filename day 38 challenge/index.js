const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const registerController = require("./controllers/registerController");
const authController = require("./controllers/authController");
const profileController = require("./controllers/profileController");
const { loginLimiter, loginValidator } = require("./utils/utilsFunct");
const { csrfProtect } = require("./controllers/authController"); // Import the csrfProtect middleware from authController
const { passport } = require("./controllers/authController");

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const formParser = bodyParser.urlencoded({ extended: false }); // Add formParser middleware here
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
app.use(cookieParser());
app.use(express.json());
// Passport.js Config
app.use(passport.initialize());

// Add the middleware to implement a session with Passport.js below:
app.use(passport.session());
app.set("view engine", "ejs"); // 

// Login routes
app.get("/", csrfProtect, authController.redirect);
app.get("/login", csrfProtect, authController.login);
app.post(
  "/login",
  loginLimiter,
  loginValidator,
  formParser,
  csrfProtect,
  authController.postLogin
);

// Profile route (protected)
app.get("/profile", formParser,csrfProtect, profileController.profile);
app.get("/edit-profile", formParser, csrfProtect, profileController.editProfile);
app.post("/edit-profile", formParser, csrfProtect, profileController.editProfilePost)

// Registration routes
app.get("/register", registerController.showRegistrationForm);
app.post("/register", formParser, registerController.registerUser);

// Logout Routes
app.get("/logout", authController.logout);

io.on('connection', (socket) => {
  socket.emit('connect', {message: 'a new client connected'})
})

socket.on('chat', message => {
  // console.log('From client: ', message)
  io.emit('chat', message)
})

socket.on('chat', message => {
  console.log('From server: ', message)})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});