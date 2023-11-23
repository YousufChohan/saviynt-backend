const Category = require("../models/category");

class UploadSubCategoryController {
    static async Execute(req, res) {

        const { name, parentCategory } = req.body;

        if (!name || !parentCategory) {
            return res.status(400).json({
                message: "Invalid Request",
            });
        } else {

            Category.findOne({ _id: parentCategory }).then(async parentCategory => {

                var subCategoryArray = parentCategory.subCategory



                const category = new Category(
                    {
                        name,
                        isParent: false
                    }
                )



                await category.save().then(async result => {


                    subCategoryArray.push(result._id)


                    await Category.findOneAndUpdate({
                        _id: parentCategory._id
                    },
                        {
                            $set:
                            {
                                subCategory: subCategoryArray,
                            }
                        },
                    ).then((result) => {
                        res.status(201).json({
                            message: "SubCategory uploaded successfully",
                            category: result,
                        });
                    }).catch(err => {
                        res.status(400).json({
                            message: "Error uploading the category",
                            error: err,
                        });
                    })





                }).catch(err => {
                    res.status(400).json({
                        message: "Error uploading the category",
                        error: err,
                    });
                })



            })



        }
    }

}

module.exports = UploadSubCategoryController;