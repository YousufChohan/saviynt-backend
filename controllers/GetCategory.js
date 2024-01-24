const path = require("path");
const Category = require("../models/category");

class GetCategoryController {
  static async Execute(req, res) {
    console.log("Category Getting api Hit");

    const { id } = req.query;

    if (id) {
      await Category.findOne({ _id: id, isParent: true })
        .populate({
          path: "subCategory",
        })
        .then((result) => {
          res.status(200).json({
            message: "Success",
            category: result,
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Error Fetching Category",
          });
        });
    } else {
      await Category.find({ isParent: true })
        .populate({
          path: "subCategory",
        })
        .then((result) => {
          res.status(200).json({
            message: "Success",
            category: result,
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Error Fetching Category",
          });
        });
    }
  }
}

module.exports = GetCategoryController;
