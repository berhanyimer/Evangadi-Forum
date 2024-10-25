const express = require("express");
const router = express.Router();

//authentication middleware
const authMiddleware = require("../MiddleWare/AuthMiddleware");

//import user controllers
const {
  register,
  login,
  checkUser,
} = require("../controller/UserController.js");

//Register route
router.post("/register", register);

//login user
router.post("/login", login);

//check user
router.get("/checkUser", authMiddleware, checkUser);

module.exports = router;
