const RatingRouter = require("express").Router();

const Rating = require("../controllers/UploadRatingController");
// const GetRating = require("../controllers/GetRatingController");

RatingRouter.post(
  "/rating",

  async (req, res) => {
    Rating.Execute(req, res);
  }
);

// RatingRouter.get(
//   "/rating",

//   async (req, res) => {
//     GetRating.Execute(req, res);
//   }
// );

module.exports = RatingRouter;
