const { model, Schema } = require("mongoose");

module.exports = model(
  "blacklist-words",
  new Schema({
    Guild: String,
    Words: Array,
  })
);
