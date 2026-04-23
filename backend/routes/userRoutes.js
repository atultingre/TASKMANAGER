const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById } = require("../controllers/userController");
const router = express.Router();

router.get("/", protect, adminOnly, getUsers); // Get all users (Admin only)
router.get("/:id", protect, getUserById); // Get a specific user by ID
//router.delete("/:id", protect, adminOnly, deleteUser); // Delete a user (Admin only)
// router.put("/:id", protect, updateUser); // Update a user (Admin or the user themselves)

module.exports = router;
