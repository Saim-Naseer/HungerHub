const CounterModel = require("../models/Counter")

module.exports = {
  Get: async (collectionName) => {
    const check = await CounterModel.findOne({ collectionName });
    if (check) return check.value;

    const val = await CounterModel.create({ collectionName });
    return val.value;
  },
  Inc: async (collectionName) => {
    await CounterModel.findOneAndUpdate(
      { collectionName },
      { $inc: { value: 1 } },
    );
  },
};
