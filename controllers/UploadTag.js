const Tag = require("../models/tag");

class UploadTagController {
    static async Execute(req, res) {

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Invalid Request",
            });
        } else {

            const tag = new Tag({
                name: name
            })

            await tag.save().then(result => {
                res.status(201).json({
                    message: "Tag uploaded successfully",
                    tag: result,
                });
            }).catch(err => {
                res.status(400).json({
                    message: "Error uploading the tag",
                    error: err,
                });
            })
        }

    }

}

module.exports = UploadTagController;