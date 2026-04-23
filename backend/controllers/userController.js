const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password"); // Exclude password from results
    // add task count for each user
    const usersWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "in-progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "completed",
        });
        return {
          ...user._doc, // Include all user data except password
          taskCounts: {
            pending: pendingTasks,
            inProgress: inProgressTasks,
            completed: completedTasks,
          },
        };
      }),
    );

    res.json(usersWithTaskCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get a specific user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
// const deleteUser = async (req, res) => {
//   try {
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// @desc    Update a user (Admin or the user themselves)
// @route   PUT /api/users/:id
// @access  Private
// const updateUser = async (req, res) => {
//   try {
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

module.exports = { getUsers, getUserById };
