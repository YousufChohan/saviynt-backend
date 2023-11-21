const Category = require("../models/category");

class PutCategoryController {
    static async Execute(req, res) {

        const { id } = req.query;
        const { name } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "invalid request"
            })
        } else {

            await Category.findOneAndUpdate({
                _id: id
            },
                {
                    $set:
                    {
                        name: name,
                    }
                },
            ).then(result => {
                return res.status(200).json({
                    message: `Category edited sucessfully`,
                });
            }).catch(err => {
                return res.status(400).json({
                    message: `Error editing Category `,
                    error: err
                });
            })

        }
    }
}

module.exports = PutCategoryController;