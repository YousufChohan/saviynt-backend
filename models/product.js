const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    productDetail: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productRating: {
      type: String,
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    },
    highestBid: {
      type: Number,
      default: 0,
      required: false,
    },
    colorVariant: {
      type: Array,
      default: [],
      required: false,
    },
    productPicture: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
