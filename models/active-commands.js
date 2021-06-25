const { model, Schema } = require("mongoose");

module.exports = model(
  "active-commands",
  new Schema({
    Guild: String,
    Command: String,
  })
);
