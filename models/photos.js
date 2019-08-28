const mongoose = require('mongoose');
const { getIndex, preSaveIndex } = require('./counters');

const photosSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  userId: {
    type: Number,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  src: {
    type: String,
    required: true
  },
  likes: {
    type: Array
  }
}, {
  versionKey: false
});

photosSchema.methods.getIndex = getIndex('photos_id');
photosSchema.pre('save', preSaveIndex);

module.exports = mongoose.model('Photos', photosSchema);
