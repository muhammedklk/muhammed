const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Please add a question'],
      trim: true
    },
    answer: {
      type: String,
      required: [true, 'Please add an answer']
    },
    category: {
      type: String,
      default: 'General'
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Faq', FaqSchema);
