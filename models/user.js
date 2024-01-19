const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    // default: "Customer",
  },
  gender: {
    type: String,
    required: false,
    // default: "Customer",
  },
  role: {
    type: String,
    required: false,
    // default: "Customer",
  },
  isVerified: {
    type: Boolean,
    required: false,
  },
  // wishlist: {
  //   type: Array,
  //   required: false,
  // },
  // profilePicture: [
  //     {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "File",
  //         required: false,
  //     },
  // ],
});

module.exports = mongoose.model("User", UserSchema);
