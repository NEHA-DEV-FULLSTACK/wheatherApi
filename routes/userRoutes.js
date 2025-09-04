const express = require("express");
const router = express.Router();
const { validateUser } = require("../middlewares/userValidator");
const {
  signUpUser,
  login,
  logoutUser,
} = require("../controllers/usersController");

router.post("/signup", validateUser, signUpUser);
router.post("/login", validateUser, login);
router.post("/logout", logoutUser);

module.exports = router;
