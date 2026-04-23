const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login an existing user
router.get("/profile", protect, getUserProfile); // Get user profile (protected route)
router.put("/profile", protect, updateUserProfile); // Update user profile (protected route)
// router.post('/logout', logoutUser); // Logout the user
// router.post('/forgot-password', forgotPassword); // Handle forgot password
// router.post('/reset-password', resetPassword); // Handle password reset

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file,
    imageUrl,
  });
});

module.exports = router;
