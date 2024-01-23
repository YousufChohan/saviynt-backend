const Category = require("../models/category");

class UploadCategoryController {
  static async Execute(req, res) {
    const { name, isParent, parentCategory } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Invalid Request",
      });
    }

    try {
      let category;

      if (isParent) {
        // Create a new category when isParent is true
        category = new Category({
          name,
          isParent: true,
        });
        const checkCategory = await Category.findOne({
          name: name,
        });
        if (!checkCategory) {
          await category.save();
        }
        res.status(201).json({
          message: "Category uploaded successfully",
          category,
        });
      } else {
        // Find the existing parent category when isParent is false
        const foundParentCategory = await Category.findOne({
          name: parentCategory,
        });

        if (!foundParentCategory) {
          return res.status(404).json({
            message: "Parent category not found",
          });
        }

        // Add a new subcategory to the found parent category
        const subCategory = new Category({
          name,
          isParent: false,
        });
        foundParentCategory.subCategory.push(subCategory);
        await foundParentCategory.save();

        res.status(201).json({
          message: "Subcategory added successfully",
          category: subCategory,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error uploading the category",
        error: error.message,
      });
    }
  }
}

module.exports = UploadCategoryController;
