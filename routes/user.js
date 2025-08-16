const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveredirectUrl } = require("../middlewares.js");
const usersController = require("../controllers/users.js");

router.get("/signup", usersController.renderSignupform);

router.post("/signup", wrapAsync(usersController.postSignupform));

router.get("/login", usersController.renderLoginform);

router.post(
  "/login",
  saveredirectUrl,
  passport.authenticate("local", {
    successRedirect: "/listings",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  usersController.postLogin
);

router.get("/logout", usersController.logout);
module.exports = router;
