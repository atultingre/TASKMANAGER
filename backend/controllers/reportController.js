const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

// @desc    Export all tasks to Excel
// @route   GET /api/report/export/tasks
// @access  Private (admin)
const exportTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Report");
    worksheet.columns = [
      { header: "Task ID", key: "_id", width: 25 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Status", key: "status", width: 20 },
      { header: "Due Date", key: "dueDate", width: 20 },
      { header: "Assigned To", key: "assignedTo.name", width: 30 },
    ];

    tasks.forEach((task) => {
      const assignedTo = task.assignedTo
        .map((user) => `${user.name} (${user.email})`)
        .join(", ");
      worksheet.addRow({
        _id: task._id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate.toISOString().split("T")[0],
        assignedTo: assignedTo || "Unassigned",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Tasks_Report.xlsx",
    );

    return workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    res.status(500).json({
      message: "Error exporting tasks to Excel",
      error: error.message,
    });
  }
};

// @desc    Export all users to Excel
// @route   GET /api/report/export/users
// @access  Private (admin)
const exportUsersReport = async (req, res) => {
  try {
    console.log("Starting user report export...");

    // ============================================
    // 1. GET ALL USERS
    // ============================================
    const users = await User.find({}).select("name email _id").lean();

    console.log("Users found:", users.length);

    // ============================================
    // 2. GET ALL TASKS
    // ============================================
    const tasks = await Task.find({}).select("assignedTo status").lean();

    console.log("Tasks found:", tasks.length);

    // ============================================
    // 3. CREATE USER TASK MAP
    // ============================================
    const userTaskMap = {};

    users.forEach((user) => {
      const userId = user._id.toString();

      userTaskMap[userId] = {
        name: user.name || "",
        email: user.email || "",
        taskCount: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
      };
    });

    // ============================================
    // 4. COUNT TASKS FOR EACH USER
    // ============================================
    tasks.forEach((task) => {
      // Handle assignedTo safely
      if (!task.assignedTo) {
        return;
      }

      // If assignedTo is an array
      const assignedUsers = Array.isArray(task.assignedTo)
        ? task.assignedTo
        : [task.assignedTo];

      assignedUsers.forEach((assignedUserId) => {
        if (!assignedUserId) {
          return;
        }

        const userId = assignedUserId.toString();

        // User may have been deleted
        if (!userTaskMap[userId]) {
          return;
        }

        // Total task count
        userTaskMap[userId].taskCount += 1;

        // Status counts
        switch (task.status) {
          case "Pending":
            userTaskMap[userId].pendingTasks += 1;
            break;

          case "In Progress":
            userTaskMap[userId].inProgressTasks += 1;
            break;

          case "Completed":
            userTaskMap[userId].completedTasks += 1;
            break;

          default:
            console.log(`Unknown task status: ${task.status}`);
            break;
        }
      });
    });

    console.log("User task map:", Object.values(userTaskMap));

    // ============================================
    // 5. CREATE EXCEL WORKBOOK
    // ============================================
    const workbook = new excelJS.Workbook();

    workbook.creator = "Task Manager";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("User Task Report");

    // ============================================
    // 6. DEFINE COLUMNS
    // ============================================
    worksheet.columns = [
      {
        header: "User Name",
        key: "name",
        width: 30,
      },
      {
        header: "Email",
        key: "email",
        width: 40,
      },
      {
        header: "Total Assigned Tasks",
        key: "taskCount",
        width: 25,
      },
      {
        header: "Pending Tasks",
        key: "pendingTasks",
        width: 20,
      },
      {
        header: "In Progress Tasks",
        key: "inProgressTasks",
        width: 20,
      },
      {
        header: "Completed Tasks",
        key: "completedTasks",
        width: 20,
      },
    ];

    // ============================================
    // 7. ADD DATA
    // ============================================
    const reportData = Object.values(userTaskMap);

    worksheet.addRows(reportData);

    // ============================================
    // 8. STYLE HEADER
    // ============================================
    const headerRow = worksheet.getRow(1);

    headerRow.font = {
      bold: true,
    };

    headerRow.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    headerRow.height = 25;

    // ============================================
    // 9. CELL STYLING
    // ============================================
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: {
            style: "thin",
          },
          left: {
            style: "thin",
          },
          bottom: {
            style: "thin",
          },
          right: {
            style: "thin",
          },
        };

        // Center numeric columns
        if (rowNumber > 1 && colNumber >= 3) {
          cell.alignment = {
            vertical: "middle",
            horizontal: "center",
          };
        }
      });
    });

    // ============================================
    // 10. FREEZE HEADER
    // ============================================
    worksheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    // ============================================
    // 11. ADD FILTER
    // ============================================
    worksheet.autoFilter = {
      from: {
        row: 1,
        column: 1,
      },
      to: {
        row: 1,
        column: 6,
      },
    };

    // ============================================
    // 12. GENERATE EXCEL BUFFER
    // ============================================
    const buffer = await workbook.xlsx.writeBuffer();

    console.log("Excel file generated successfully");

    // ============================================
    // 13. SEND FILE
    // ============================================
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Users_Report.xlsx"',
    );

    res.setHeader("Content-Length", buffer.length);

    return res.status(200).send(buffer);
  } catch (error) {
    console.error("=================================");

    console.error("ERROR EXPORTING USERS REPORT");

    console.error("=================================");

    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    return res.status(500).json({
      message: "Error exporting users to Excel",
      error: error.message,
    });
  }
};

module.exports = {
  exportTasksReport,
  exportUsersReport,
};
