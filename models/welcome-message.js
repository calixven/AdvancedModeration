const { Schema, model } = require("mongoose");

module.exports = model(
  "welcome-message",
  new Schema({
    Guild: String,
    Channel: String,
    Message: String,
  })
);
