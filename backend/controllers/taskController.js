const Task = require("../models/Task");

//@desc     GET all tasks (Admin:all, user:only assigned tasks)
//@route    GET /api/tasks
//@access   Private
const getTasks = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    GET task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new task (Admin only)
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      assignedTo,
      dueDate,
      attachments,
      todoChecklist,
    } = req.body;
    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo,
      createdBy: req.user._id,
      dueDate,
      attachments,
      todoChecklist,
    });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a task details
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a task (Admin only)
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private (Admin can update any task, users can update their assigned tasks)
const updateTaskStatus = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update task checklist (Users can update their assigned tasks, Admin can update any task)
// @route   PUT /api/tasks/:id/todo
// @access  Private (Admin can update any task, users can update their assigned tasks)
const updateTaskChecklist = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get dashboard data (Admin only)
// @route  GET /api/tasks/dashboard-data
// @access Private
const getDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get user dashboard data (user specific)
// @route  GET /api/tasks/user-dashboard-data
// @access Private
const getUserDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
};
