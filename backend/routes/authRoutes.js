const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getProfile);

module.exports = router;
