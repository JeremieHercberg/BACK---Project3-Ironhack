const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  //schema fields
  {
    name: { type: String },
    image: { type: String },
    description: { type: String },
    rating: { type: Number },
    sellingPrice: { type: Number },
    itemStock: { type: Number },
    details: [String],
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        comments: { type: String }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
