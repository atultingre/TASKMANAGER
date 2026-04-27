const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  exportTasksReport,
  exportUsersReport,
} = require("../controllers/reportController");
const router = express.Router();

// @route   GET /api/reports
// @desc    Get all reports
// @access  Private
router.get("/export/tasks", protect, adminOnly, exportTasksReport); // Export all tasks as Excel/PDF
router.get("/export/users", protect, adminOnly, exportUsersReport); // Export user-task report as Excel/PDF

module.exports = router;
