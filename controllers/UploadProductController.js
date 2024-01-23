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
      creatorName, // Adding creatorName to the request body
      shippedBy,
      upcCode,
      currentPrice,
      variants,
      description,
      businessName,
      website,
      address,
      longitude,
      latitude,
      noOfViews,
      noOfLikes,
      noOfDislikes,
      noOfReviews,
      noOfShares,
      rating,
    } = req.body;

    if (
      !productName ||
      !productCategory ||
      !productTag ||
      !productDetail ||
      !productPrice ||
      !isArchived ||
      !variants ||
      !creatorName ||
      !shippedBy ||
      !upcCode ||
      !currentPrice ||
      !description ||
      !businessName ||
      !website ||
      !address ||
      !longitude ||
      !latitude ||
      !noOfViews ||
      !noOfLikes ||
      !noOfDislikes ||
      !noOfReviews ||
      !noOfShares ||
      !rating ||
      (req.files && Object.keys(req.files).length === 0)
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    } else {
      try {
        const productPicture = [];

        for (const file of req.files.productPicture) {
          const finalFile = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(finalFile);

          productPicture.push(fileNew._id);
        }

        console.log("Product Picture:", productPicture);

        const newProduct = new Product({
          productName,
          productCategory,
          productTag,
          productDetail,
          productPrice,
          productRating: 0,
          isArchived,
          variants,
          productPicture,
          creatorName,
          shippedBy,
          upcCode,
          currentPrice,
          description,
          businessName,
          website,
          address,
          longitude,
          latitude,
          noOfViews,
          noOfLikes,
          noOfDislikes,
          noOfReviews,
          noOfShares,
          rating,
        });

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
