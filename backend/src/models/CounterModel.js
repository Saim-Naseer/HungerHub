const mongoose = require("mongoose");

const CounterSchema = mongoose.Schema({
  collectionName: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 1,
  },
});

module.exports = CounterModel = mongoose.model("counters", CounterSchema);
