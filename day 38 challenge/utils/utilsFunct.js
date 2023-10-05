const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");


const loginValidator = [
  body("username", "Username cannot be empty").not().isEmpty(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit to 3 login attempts per IP within the window
  });

  module.exports = {
    loginLimiter,
    loginValidator,
  };


