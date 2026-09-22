
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const path = require("path");
app.use(express.json());
app.use(cors()); 
app.use(cookieParser());


app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/subcategories", require("./routes/subCategoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/upload", require("./controllers/uploadController"));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

const createDefaultAdmin = async () => {
    const adminExists = await User.findOne({ role: "admin" });
  
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10); 
      await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Default admin created.");
    }
  };
  
  connectDB()
    .then(async () => {
      await createDefaultAdmin(); 
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });