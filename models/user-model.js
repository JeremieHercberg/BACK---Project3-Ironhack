const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  //schema fields
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    birthday: { type: Date },
    emailAddress: { type: String, unique: true, required: true },
    shippingAddress: {
      address1: { type: String },
      city: { type: String },
      postalCode: { type: String }
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    //normal signup & login
    password: { type: String, required: true },

    //googleId
    googleId: { type: String },

    //facebookId
    facebookId: { type: String }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
