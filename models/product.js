const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: false,
      },
    ],
    productTag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",
        required: false,
      },
    ],
    productDetail: {
      type: String,
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
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
    creatorName: {
      type: String,
      ref: "User",
      required: true,
    },
    // addedBy: {
    //   type: String,
    //   required: false,
    // },
    shippedBy: {
      type: String,
      required: true,
    },
    upcCode: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: String,
      required: true,
    },
    formattedPrice: {
      type: String,
      default: "$ " + currentPrice,
      required: true,
    },
    // defaultSize: {
    //   type: String,
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    // avatar: {
    //   type: String,
    //   required: true,
    // },
    longitude: {
      type: String,
      required: false,
    },
    latitude: {
      type: String,
      required: false,
    },
    noOfViews: {
      type: String,
      required: false,
    },
    noOfLikes: {
      type: String,
      required: false,
    },
    noOfDislikes: {
      type: String,
      required: false,
    },
    noOfReviews: {
      type: String,
      required: false,
    },
    noOfShares: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
