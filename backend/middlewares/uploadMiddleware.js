const multer = require("multer");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Create a unique filename
  },
});

const fileFilter = (req, file, cb) => {
  const allwedTypes = ["image/jpeg", "image/png", "image/jpg"];

  // Accept only image files
  if (allwedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed"), false);
  }
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;
