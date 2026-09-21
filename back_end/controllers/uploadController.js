const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueName}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage }).array("images", 5); // Up to 5 images

// POST /api/upload/images
router.post("/images", (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ msg: "Image upload failed" });

    const urls = req.files.map((file) => `/uploads/${file.filename}`);

    res.json({ urls });
  });
});

module.exports = router;