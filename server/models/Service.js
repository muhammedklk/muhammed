const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a service title'],
      trim: true
    },
    shortDesc: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    fullDesc: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'Code'
    },
    features: [
      {
        type: String
      }
    ],
    tags: [
      {
        type: String
      }
    ],
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to mirror description/shortDesc
ServiceSchema.pre('save', function (next) {
  if (!this.shortDesc && this.description) {
    this.shortDesc = this.description;
  }
  if (!this.description && this.shortDesc) {
    this.description = this.shortDesc;
  }
  next();
});

module.exports = mongoose.model('Service', ServiceSchema);
