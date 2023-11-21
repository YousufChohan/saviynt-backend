const CategoryRouter = require("express").Router();

const UploadCategory = require("../controllers/UploadCategory");
const GetCategory = require("../controllers/GetCategory");
const PutCategory = require("../controllers/PutCategory");
const DeleteCategory = require("../controllers/DeleteCategory");

CategoryRouter.post("/category", async (req, res) => {
    UploadCategory.Execute(req, res);
});


CategoryRouter.get("/category", async (req, res) => {
    GetCategory.Execute(req, res);
});

CategoryRouter.put("/category", async (req, res) => {
    PutCategory.Execute(req, res);
});

CategoryRouter.delete("/category", async (req, res) => {
    DeleteCategory.Execute(req, res);
});


module.exports = CategoryRouter;
