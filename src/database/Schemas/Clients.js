const { Schema } = require("mongoose");

module.exports = new Schema({
  name: String,
  email: String,
  postalCode: String,
  address1: String,
  address2: String,
  address3: String,
  city: String,
  state: String,
  county: String,
});
