const { Schema, model } = require("mongoose");

module.exports = model(
  "goodbye-message",
  new Schema({
    Guild: String,
    Channel: String,
    Message: String,
  })
);
