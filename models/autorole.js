const { model, Schema } = require("mongoose");

module.exports = model(
  "autorole",
  new Schema({
    Guild: String,
    Roles: Array,
  })
);
