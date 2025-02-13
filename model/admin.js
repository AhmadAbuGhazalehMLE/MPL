const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("admin", adminSchema);
