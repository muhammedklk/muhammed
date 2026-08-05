import mongoose from 'mongoose';
import crypto from 'crypto';

const settingSchema = new mongoose.Schema(
  {
    maintenanceMode: {
      type: Boolean,
      default: false
    },
    maintenanceMessage: {
      type: String,
      default: 'We are improving the experience for you. Please check back shortly.'
    },
    previewToken: {
      type: String,
      default: () => crypto.randomBytes(32).toString('hex')
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: String,
      default: 'System Admin'
    }
  },
  { timestamps: true }
);

const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);

export default Setting;
