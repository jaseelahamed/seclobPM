const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "seclob_products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage }).array("images", 5); 

router.post("/images", (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ msg: "Image upload failed", error: err.message });

    
    const urls = req.files.map((file) => file.path);

    res.json({ urls });
  });
});

module.exports = router;