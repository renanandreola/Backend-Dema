const { Schema } = require("mongoose");

module.exports = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  stock: Number,
  hasPromotion: Boolean,
  pricePromotion: Number,
});
