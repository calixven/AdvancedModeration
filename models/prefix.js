const { Schema, model } = require("mongoose");

const prefixSchema = new Schema({
  Guild: String,
  Prefix: String,
});

module.exports = model("prefix", prefixSchema);
