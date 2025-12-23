const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
 
 
// POST http://localhost:3000/api/auth/register
router.post("/register", authController.register);
 
// POST http://localhost:3000/api/auth/login
router.post("/login", authController.login);
 
// POST http://localhost:3000/api/auth/profile
router.get("/profile", authMiddleware, authController.getUser);
 
module.exports = router;
 