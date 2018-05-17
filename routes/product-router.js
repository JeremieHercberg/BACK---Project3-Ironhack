const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product-model");

const productRouter = express.Router();

//GET all the products
productRouter.get("/products", (req, res, next) => {
  Product.find()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      next(err);
    });
});

//GET one product
productRouter.get("/products/:productId", (req, res, next) => {
  console.log("bka");
  if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
    next(); //show 404 if no phone was found or show 404 if bad ObjectId was found
    return;
  }
  Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        next(); //show 404 if no phone was found or show 404 if bad ObjectId was found
        return;
      }
      res.json(product);
    })
    .catch(err => {
      next(err);
    });
});

// POST product (add a product)
productRouter.post("/products", (req, res, next) => {
  const { name, image, description, sellingPrice, itemStock } = req.body;
  Product.create({ name, image, description, sellingPrice, itemStock })
    .then(newProduct => {
      res.json(newProduct);
    })
    .catch(err => {
      next(err);
    });
});

// PUT product (edit specific product)
productRouter.put("/products/:productId", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
    next();
    return;
  }
  Product.findByIdAndUpdate(
    req.params.productId,
    {
      name,
      image,
      descripction,
      sellingPrice,
      itemStock
    },
    { runValidators: true, new: true }
  )
    .then(product => {
      if (!updatedProduct) {
        next(); // show 404 if no phone was found
        return;
      }
      res.json(updatedProduct);
    })
    .catch(err => {
      next(err);
    });
});

// DELETE one product
productRouter.delete("/products/:productId", (req, res, next) => {
  console.log("yooooo");
  // if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
  //   next();
  //   return;
  // }
  Product.findOneAndRemove(req.params.productId)
    .then(removedProduct => {
      if (!removedProduct) {
        next();
        return;
      }
      res.json(removedProduct);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = productRouter;
