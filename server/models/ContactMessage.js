const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide a valid email address'],
      lowercase: true,
      trim: true
    },
    subject: {
      type: String,
      default: 'Portfolio Contact Inquiry'
    },
    message: {
      type: String,
      required: [true, 'Please write a message']
    },
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: {
      type: Date
    },
    isReplied: {
      type: Boolean,
      default: false
    },
    replyMessage: {
      type: String,
      default: ''
    },
    repliedAt: {
      type: Date
    },
    ipAddress: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
