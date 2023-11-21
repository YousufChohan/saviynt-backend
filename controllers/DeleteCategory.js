const Category = require("../models/category");


class DeleteCategoryController {
    static async Execute(req, res) {

        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                message: "Invalid Request"
            })
        } else {

            await Category.findOneAndDelete({ _id: id }).then(result => {
                return res.status(200).json({
                    message: "Category Deleted Sucessfully"
                })
            }).catch(err => {
                return res.status(400).json({
                    message: "Error Deleting Category",
                    error: err
                })
            })

        }

    }
}

module.exports = DeleteCategoryController;