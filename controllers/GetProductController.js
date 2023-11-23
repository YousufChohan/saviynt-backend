const Product = require("../models/product");

class GetProductController {
  static async Execute(req, res) {

    const { category, tag } = req.query;

    if (category && tag) {

      Product.find({ productCategory: category, productTag: tag })
        .populate({
          path: "productTag",
        })
        .populate({
          path: "productCategory",
        })
        .then((results) => {
          if (results.length == 0) {
            res.status(404).json({
              products: "No Products Were Found",
            });
          } else {
            res.status(200).json({
              products: results,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send(err);
        });

    } else if (category) {

      Product.find({ productCategory: category })
        .populate({
          path: "productTag",
        })
        .populate({
          path: "productCategory",
        })
        .then((results) => {
          if (results.length == 0) {
            res.status(200).json({
              message: "No Products Were Found",
              products: []
            });
          } else {
            res.status(200).json({
              products: results,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send(err);
        });

    } else if (tag) {

      Product.find({ productTag: tag })
        .populate({
          path: "productTag",
        })
        .populate({
          path: "productCategory",
        })
        .then((results) => {
          if (results.length == 0) {
            res.status(200).json({
              message: "No Products Were Found",
              products: []
            });
          } else {
            res.status(200).json({
              products: results,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send(err);
        });

    } else {


      Product.find({})
        .populate({
          path: "productTag",
        })
        .populate({
          path: "productCategory",
        })
        .then((results) => {
          if (results.length == 0) {
            res.status(200).json({
              message: "No Products Were Found",
              products: []
            });
          } else {
            res.status(200).json({
              products: results,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send(err);
        });


    }
  }
}

module.exports = GetProductController;
