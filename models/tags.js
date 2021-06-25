const { model, Schema } = require("mongoose");

module.exports = model(
  "tags",
  new Schema({
    Guild: String,
    Name: String,
    Uses: Number,
    createdBy: String,
    Response: String,
    authorAvatar: String,
  })
);
