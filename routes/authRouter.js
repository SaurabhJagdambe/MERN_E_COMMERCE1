
const express = require("express");

const { registerController, loginController, tokenController } = require("../controllers/authController");
const { signIn, isAdmin } = require("../middelweres/authMiddelwere");


//router object
const router = express.Router();

// //Get all users || Get user
// router.get("/allusers", getAllUsers);

// //Create  users || Post user
router.post("/register", registerController);

// login users || Post user
router.post("/login", loginController);

// test users || get user
router.get("/test",signIn,isAdmin, tokenController);

module.exports = router;
