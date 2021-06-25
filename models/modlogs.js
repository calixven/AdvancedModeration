const { model, Schema } = require("mongoose");

const schema = new Schema({
  Guild: String,
  Channel: String,
});

module.exports = model("modlogs", schema);
