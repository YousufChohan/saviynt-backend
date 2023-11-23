const GetProductController = require("../controllers/GetProductController");
const UploadProductController = require("../controllers/UploadProductController");
const { files, validationResult } = require("express-validator");


const adminAuth = require("../middleware/adminAuth")
const customerAuth = require("../middleware/customerAuth")

const ProductRouter = require("express").Router();

module.exports = (upload) => {
  ProductRouter.post(
    "/product",
    adminAuth,
    upload.fields([{ name: "productPicture", maxCount: 5 }]),
    async (req, res) => {
      const errors = validationResult(req);

      UploadProductController.Execute(req, res);
    }
  );

  ProductRouter.get("/product", customerAuth, async (req, res) => {
    GetProductController.Execute(req, res);
  });

  return ProductRouter;
};
