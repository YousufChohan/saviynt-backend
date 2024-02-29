const mongoose = require("mongoose");

const CventSchema = mongoose.Schema(
  {
    data: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cvent", CventSchema);
