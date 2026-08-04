import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, default: 'uiux' },
  budget: { type: String, default: '1k-3k' },
  message: { type: String, required: true },
  status: { type: String, default: 'unread', enum: ['unread', 'read', 'archived'] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
