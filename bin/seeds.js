const mongoose = require("mongoose");
const Product = require("../models/product-model");

const dbZoulidery = "Zoulidery-Project";
mongoose.connect(`mongodb://localhost/${dbZoulidery}`);

const products = [
  {
    name: "blahproduct",
    image: "blahimage",
    description: "blahdescription",
    rating: 4,
    sellingPrice: 2,
    itemStock: 5,
    details: "blahdetails",
    reviews: ""
  }
];

Product.create(products, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${products.length} products`);
  mongoose.connection.close();
});
