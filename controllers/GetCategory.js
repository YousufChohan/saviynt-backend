const Category = require("../models/category");

class GetCategoryController {
    static async Execute(req, res) {

        const { id } = req.query;

        if (id) {

            await Category.findOne({ _id: id }).then(result => {
                res.status(200).json({
                    message: "Success",
                    category: result,
                });
            }).catch(err => {
                res.status(400).json({
                    message: "Error Fetching Category"
                })
            })
        } else {
            await Category.find().then(result => {
                res.status(200).json({
                    message: "Success",
                    category: result,
                });
            }).catch(err => {
                res.status(400).json({
                    message: "Error Fetching Category"
                })
            })
        }
    }
}

module.exports = GetCategoryController;