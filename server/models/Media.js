const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: 'png'
    },
    bytes: {
      type: Number,
      default: 0
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    folder: {
      type: String,
      default: 'portfolio_cms'
    },
    alt: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Media', MediaSchema);
