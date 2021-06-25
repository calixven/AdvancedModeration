const { Schema, model } = require("mongoose");

const schema = new Schema({
  Guild: String,
  User: String,
  Amount: Number,
});

module.exports = model("warnings", schema);
