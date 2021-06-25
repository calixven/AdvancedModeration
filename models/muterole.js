const { model, Schema } = require("mongoose");

module.exports = model(
  "muterole",
  new Schema({
    Guild: String,
    Role: String,
  })
);
