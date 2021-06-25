const { model, Schema } = require("mongoose");

module.exports = model(
  "join-message",
  new Schema({
    Guild: String,
    Message: String,
  })
);
