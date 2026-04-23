const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} = require("../controllers/taskController");

const router = express.Router();

// Task Management Routes
router.get("/dashboard-data", protect, getDashboardData); // Get dashboard data (Admin: all tasks, user: assigned tasks)
router.get("/user-dashboard-data", protect, getUserDashboardData); // Get user dashboard data (Admin: all tasks, user: assigned tasks)
router.get("/", protect, getTasks); // Get all tasks (admin only, users:assigned tasks)
router.get("/:id", protect, getTaskById); // Get task by ID
router.post("/", protect, adminOnly, createTask); // Create a new task (admin only)
router.put("/:id", protect, updateTask); // Update a task details
router.delete("/:id", protect, adminOnly, deleteTask); // Delete a task (admin only)
router.put("/:id/status", protect, updateTaskStatus); // Update task status (users can update their assigned tasks, admin can update any task)
router.put("/:id/todo", protect, updateTaskChecklist); // Update task checklist (users can update their assigned tasks, admin can update any task)

module.exports = router;
