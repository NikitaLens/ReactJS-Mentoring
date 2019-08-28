const mongoose = require('mongoose');
const { getIndex, preSaveIndex } = require('./counters');

const commentsSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  photo_id: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

commentsSchema.methods.getIndex = getIndex('comments_id');
commentsSchema.pre('save', preSaveIndex);

module.exports = mongoose.model('Comments', commentsSchema);
