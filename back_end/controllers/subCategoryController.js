const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");




exports.createSubCategory = async (req, res) => {
  const { name, categoryId } = req.body;

  try {
  
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    const existingSubCategory = await SubCategory.findOne({ name, category: categoryId });
    if (existingSubCategory) {
      return res.status(400).json({ msg: "Subcategory already exists under this category" });
    }

    const newSubCategory = new SubCategory({ name, category: categoryId });
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all subcategories
// exports.getsubcategories = async (req, res) => {
//     try {
//       const categories = await Category.find().lean(); // Use lean for better performance
//       if (!categories || categories.length === 0) {
//         return res.status(404).json({ msg: "No categories found" });
//       }
  
//       // Fetch all subcategories
//       const subcategories = await SubCategory.find().lean();
  
//       // Map subcategories to categories
//       const categoriesWithSubCategories = categories.map((category) => ({
//         ...category,
//         subcategories: subcategories.filter(
//           (sub) => sub.category.toString() === category._id.toString()
//         ),
//       }));
  
//       res.json(categoriesWithSubCategories);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   };
exports.getsubcategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate("category").lean(); // Optional: populate category info

    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({ msg: "No subcategories found" });
    }

    res.status(200).json(subcategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get single subcategory by ID
exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate("category", "name");
    if (!subCategory) {
      return res.status(404).json({ msg: "Subcategory not found" });
    }
    res.json(subCategory);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Subcategory not found" });
    }
    res.status(500).send("Server error");
  }
};

// Update subcategory
exports.updateSubCategory = async (req, res) => {
  const { name, categoryId } = req.body;

  try {
    let subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ msg: "Subcategory not found" });
    }

    // Optional: Validate if category still exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    // Check if another subcategory has same name + category
    const existing = await SubCategory.findOne({
      name,
      category: categoryId,
      _id: { $ne: req.params.id }, // exclude current subcategory
    });

    if (existing) {
      return res.status(400).json({ msg: "Subcategory already exists under this category" });
    }

    subCategory.name = name;
    subCategory.category = categoryId;
    await subCategory.save();

    res.json(subCategory);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Subcategory not found" });
    }
    res.status(500).send("Server error");
  }
};

// Delete subcategory
exports.deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ msg: "Subcategory not found" });
    }

    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ msg: "Subcategory removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Subcategory not found" });
    }
    res.status(500).send("Server error");
  }
};