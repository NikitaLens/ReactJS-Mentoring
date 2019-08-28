const mongoose = require('mongoose');

const countersSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number,
});

const Counters = mongoose.model('Counters', countersSchema);
const getIndex = (sequenceName) => () => Counters.findOneAndUpdate({ _id: sequenceName }, { $inc: { sequence_value: 1 } });

async function preSaveIndex(next) {
  const model = this;
  const { sequence_value } = await model.getIndex();

  model.id = sequence_value;
  next();
}

module.exports = {
  Counters,
  getIndex,
  preSaveIndex
};
