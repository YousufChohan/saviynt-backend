const Product = require("../models/product");
const File = require("../models/file");

class UploadProductController {
  static async Execute(req, res) {
    const {
      productName,
      productCategory,
      productTag,
      productDetail,
      productPrice,
      isArchived,
      colorVariant,
    } = req.body;

    if (!productName || !productCategory || !productTag || !productDetail || !productPrice || !isArchived || (req.files && Object.keys(req.files).length === 0)) {

      return res.status(400).json({
        message: "Missing required fields",
      });
    } else {
      console.log(req.files)
      var productPicture = [];

      for (const file of req.files.productPicture) {
        var final_file = {
          file: file.filename,
          contentType: file.mimetype,
          docOF: req.route.path,
        };
        const fileNew = await File.create(final_file);

        productPicture.push(fileNew._id);
      }

      console.log(productPicture)

      const newProduct = new Product({
        productName,
        productCategory,
        productTag,
        productDetail,
        productPrice,
        productRating: 0,
        isArchived,
        colorVariant,
        productPicture
      });

      try {
        const savedProduct = await newProduct.save();

        res.status(201).json({
          message: "Product uploaded successfully",
          product: savedProduct,
        });
      } catch (error) {
        res.status(500).json({
          message: "Error uploading the product",
          error: error.message,
        });
      }
    }
  }
}

module.exports = UploadProductController;
