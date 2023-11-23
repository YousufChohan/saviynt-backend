const TagRouter = require("express").Router();

const UploadTag = require("../controllers/UploadTag");


TagRouter.post("/tag", async (req, res) => {
    UploadTag.Execute(req, res);
});




module.exports = TagRouter;
