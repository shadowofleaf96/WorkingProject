const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const registerController = require("./controllers/registerController");
const authController = require("./controllers/authController");
const profileController = require("./controllers/profileController");
const { i18next, i18nextMiddleware } = require("./controllers/profileController");
const { loginLimiter, loginValidator } = require("./utils/utilsFunct");
const { csrfProtect } = require("./controllers/authController"); // Import the csrfProtect middleware from authController
const { passport } = require("./controllers/authController");

const app = express();
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
app.use(i18nextMiddleware.handle(i18next));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder for uploaded files
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // Use the original filename
    cb(null, file.originalname);
  },
});

// Define a scheduled task
const task = cron.schedule("*/5 * * * *", () => {
  console.log("Running a task every 5 minutes");
});

// Start the task
task.start();

// Stop the task after 1 hour
setTimeout(() => {
  task.stop();
  console.log("Task stopped after 1 hour");
}, 3600000);

const upload = multer({ storage: storage });
app.use(express.json());
// Passport.js Config
app.use(passport.initialize());

// Add the middleware to implement a session with Passport.js below:
app.use(passport.session());
// Define the path to your static files (images)
const staticPath = path.join(__dirname, "public", "images");
const cssPath = path.join(__dirname, "public", "css");

const locales = path.join(__dirname, "locales");

// Serve static files (images) with caching headers
app.use(
  "/images",
  express.static(staticPath, {
    maxAge: "1y", // Set the maximum age for caching (1 day in this example)
    etag: true, // Enable ETag for RESTful API
  })
);

// Serve CSS files with caching headers
app.use(
  "/css",
  express.static(cssPath, {
    maxAge: "1y", // Set the maximum age for caching (1 day in this example)
    etag: true, // Enable ETag for RESTful API
  })
);

app.use(
  "/locales",
  express.static(locales, {
    maxAge: "1y", // Set the maximum age for caching (1 day in this example)
    etag: true, // Enable ETag for RESTful API
  })
);

// Serve CSS files with caching headers
app.use(
  "/locales",
  express.static(cssPath, {
    maxAge: "1y", // Set the maximum age for caching (1 day in this example)
    etag: true, // Enable ETag for RESTful API
  })
);

// Error handling middleware for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .send("File size is too large. Max allowed size is 2MB.");
    }
    // Handle other Multer errors as needed.
    return res.status(500).send("Internal Server Error");
  } else if (err) {
    // Handle other errors that are not Multer-related.
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
  // If no error occurred, continue to the next middleware or route handler.
  next();
});

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
app.get("/profile", formParser, csrfProtect, profileController.profile);
app.get(
  "/edit-profile",
  formParser,
  csrfProtect,
  profileController.editProfile
);
app.post(
  "/edit-profile",
  upload.single("myFile"),
  formParser,
  csrfProtect,
  profileController.editProfilePost
);

// Registration routes
app.get("/register", registerController.showRegistrationForm);
app.post("/register", formParser, registerController.registerUser);

// Logout Routes
app.get("/logout", authController.logout);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
