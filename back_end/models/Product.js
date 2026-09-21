const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  ram: {
    type: String,
    required: true,
  },
 
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
 
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
  images: {
    type: [String], 
    required: true,
    validate: [arrayLimit, "{PATH} must have at least 3 images"],
  },
});

// Validator for minimum 3 images
function arrayLimit(val) {
  return val.length >= 3;
}

module.exports = mongoose.model("Product", productSchema);