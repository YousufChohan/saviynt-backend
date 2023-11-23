const CategoryRouter = require("express").Router();

const UploadCategory = require("../controllers/UploadCategory");
const GetCategory = require("../controllers/GetCategory");
const PutCategory = require("../controllers/PutCategory");
const DeleteCategory = require("../controllers/DeleteCategory");


const customerAuth = require("../middleware/customerAuth");
const adminAuth = require("../middleware/adminAuth");

CategoryRouter.post("/category", adminAuth, async (req, res) => {
    UploadCategory.Execute(req, res);
});


CategoryRouter.get("/category", customerAuth, async (req, res) => {
    GetCategory.Execute(req, res);
});

CategoryRouter.put("/category", adminAuth, async (req, res) => {
    PutCategory.Execute(req, res);
});

CategoryRouter.delete("/category", adminAuth, async (req, res) => {
    DeleteCategory.Execute(req, res);
});


module.exports = CategoryRouter;
