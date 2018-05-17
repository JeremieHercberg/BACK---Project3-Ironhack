const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  //schema fields
  {
    totalPrice: { type: Number },
    lineItem: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number }
      }
    ],
    // payment: {
    //   cardNumber: { type: Number },
    //   expirationDate: { type: Date },
    //   cardHolder: { type: String }
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
