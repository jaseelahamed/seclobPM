const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/subCategoryController");
const { isAdmin } = require("../middleware/authMiddleware");


router.post("/", isAdmin, subCategoryController.createSubCategory);


router.get("/", subCategoryController.getsubcategories);


router.get("/:id", subCategoryController.getSubCategoryById);

router.put("/:id", isAdmin, subCategoryController.updateSubCategory);


router.delete("/:id", isAdmin, subCategoryController.deleteSubCategory);

module.exports = router;