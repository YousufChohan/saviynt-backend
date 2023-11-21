const Category = require("../models/category");

class UploadCategoryController {
    static async Execute(req, res) {

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Invalid Request",
            });
        } else {

            const category = new Category(
                { name: name }
            )

            await category.save().then(result => {
                res.status(201).json({
                    message: "Category uploaded successfully",
                    category: result,
                });
            }).catch(err => {
                res.status(400).json({
                    message: "Error uploading the category",
                    error: err,
                });
            })
        }

    }

}

module.exports = UploadCategoryController;
