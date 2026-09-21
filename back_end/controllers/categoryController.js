const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");


exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ msg: "Category already exists" });
    }

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all categories
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };
exports.getCategories = async (req, res) => {
    try {
      const categories = await Category.find().lean(); // Use lean for better performance
      if (!categories || categories.length === 0) {
        return res.status(404).json({ msg: "No categories found" });
      }
  
      // Fetch all subcategories
      const subcategories = await SubCategory.find().lean();
  
      // Map subcategories to categories
      const categoriesWithSubCategories = categories.map((category) => ({
        ...category,
        subcategories: subcategories.filter(
          (sub) => sub.category.toString() === category._id.toString()
        ),
      }));
  
      res.json(categoriesWithSubCategories);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
// Get single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server error");
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  const { name } = req.body;

  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    // Check if another category has the same name
    const existingCategory = await Category.findOne({ name });
    if (existingCategory && existingCategory._id.toString() !== req.params.id) {
      return res.status(400).json({ msg: "Category name already taken" });
    }

    category.name = name;
    await category.save();

    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server error");
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: "Category removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server error");
  }
};