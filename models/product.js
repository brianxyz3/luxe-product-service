const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Product Schema
const ProductSchema = new Schema({
  name: String,
  category: [{
    type: String,
    enum: [
      "all",
      "skin-care",
      "hair-care",
      "dental-care",
      "facial-care",
      "nail-care",
      "makeup",
      "fragrance",
    ],
  }],
  brandName: String,
  description: String,
  units: Number,
  price: Number,
  type: [{
    type: String,
    enum: [
      "all",
      "serum",
      "cream",
      "lotion",
      "liquid",
      "scrub",
      "wash",
      "soap",
      "perfume",
      "powder",
      "tool",
    ],
  }],
});

module.exports = mongoose.model("Product", ProductSchema);