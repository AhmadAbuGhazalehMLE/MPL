const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  labs: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      pcs: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("group", groupSchema);
