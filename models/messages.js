const { model, Schema } = require("mongoose");

module.exports = model(
  "messages",
  new Schema({
    Guild: String,
    User: String,
    Username: String,
    Messages: Number,
  })
);
