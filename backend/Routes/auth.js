const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");

const {
  activationController,
  register,
  login,
  logout,
  getAccessToken,
  forgotPassword,
  resetPassword,
  contactMe,
  loginGoogle
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/activation").post(activationController);
router.route("/login").post(login);
router.route("/refreshtoken").post(getAccessToken);
router.route("/googlething").post(loginGoogle);
router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset").post(resetPassword);
router.route("/contact").post(contactMe);
router.route("/logout").post(logout);


module.exports = router;