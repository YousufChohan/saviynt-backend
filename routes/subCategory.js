const CategoryRouter = require("express").Router();

const UploadSubCategory = require("../controllers/UploadSubCategory");


const customerAuth = require("../middleware/customerAuth");
const adminAuth = require("../middleware/adminAuth");

CategoryRouter.post("/subcategory", adminAuth, async (req, res) => {
    UploadSubCategory.Execute(req, res);
});




module.exports = CategoryRouter;
