const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subCategory: [
    {
      type: String,
      required: false,
    },
  ],
  isParent: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.model("category", categorySchema);
