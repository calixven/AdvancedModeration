const { model, Schema } = require("mongoose");

module.exports = model(
  "mutes",
  new Schema({
    Guild: String,
    User: String,
    End: Number,
  })
);
