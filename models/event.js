const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    dayStarts: {
      type: String,
      required: true,
    },
    dayEnds: {
      type: String,
      required: false,
    },
    dateStarts: {
      type: String,
      required: true,
    },
    dateEnds: {
      type: String,
      required: false,
    },
    timeStarts: {
      type: String,
      required: false,
    },
    timeEnds: {
      type: String,
      required: false,
    },
    venue: {
      type: String,
      required: true,
    },
    specialFeatures: {
      type: String,
      required: false,
    },
    eventPicture: [
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
    price: {
      type: Number,
      required: true,
    },

    // productCategory: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "category",
    //     required: false,
    //   },
    // ],
    // productTag: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "tag",
    //     required: false,
    //   },
    // ],
    // variants: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     values: {
    //       type: [String],
    //       required: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
