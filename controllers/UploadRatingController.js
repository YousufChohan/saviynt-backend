const Rating = require("../models/rating");

class UploadRatingController {
  static async Execute(req, res) {
    const { id, productid } = req.body;
    console.log(req.body);

    if (
      !id ||
      !id.match(/^[0-9a-fA-F]{24}$/) ||
      !productid ||
      !productid.match(/^[0-9a-fA-F]{24}$/) ||
      !rating
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    } else {
      Rating.find({ user: id }).then(async (result) => {
        if (result.length == 0) {
          const newRating = new Rating({
            product: productid,
            ratings: [id, rating],
          });

          try {
            const savedRating = await newRating.save();
            res.status(201).json({
              message: "Rating uploaded successfully",
              rating: savedRating,
            });
          } catch (error) {
            res.status(500).json({
              message: "Error uploading the product",
              error: error.message,
            });
          }
        } else if (result.length > 0) {
          var temp = result[0].ratings;
          console.log("second", temp);
          //   if (temp.indexOf(productid) > -1) {
          //     temp.splice(temp.indexOf(productid), 1);

          //     Rating.findOneAndUpdate(
          //       { product: productid },
          //       {
          //         $set: {
          //           ratings: temp,
          //         },
          //       }
          //     )
          //       .then((result) => {
          //         res.status(200).json({
          //           message: "Rating uploaded successfully",
          //           rating: result,
          //         });
          //       })
          //       .catch((err) => {
          //         res.status(500).json({
          //           message: "Error uploading the product",
          //           error: err,
          //         });
          //       });
          //   } else {
          console.log("first", temp);
          temp.push(productid);
          console.log("hgello", temp);
          Rating.findOneAndUpdate(
            { product: productid },
            {
              $set: {
                ratings: temp,
              },
            }
          )
            .then((result) => {
              res.status(200).json({
                message: "Rating uploaded successfully",
                rating: result,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Error uploading the product",
                error: err,
              });
            });
          //   }
        }
      });
    }
  }
}

module.exports = UploadRatingController;
