const { Schema } = require("mongoose");

module.exports = new Schema({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Category", default: null }, // subcategoria
});
