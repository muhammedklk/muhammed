const express = require('express');
const router = express.Router();
const {
  sendContactMessage,
  getContactMessages,
  toggleMessageReadStatus,
  replyContactMessage,
  deleteContactMessage,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public Contact Submission Route
router.post('/', sendContactMessage);

// Admin Inbox Routes
router.get('/messages', protect, getContactMessages);
router.patch('/messages/:id/read', protect, toggleMessageReadStatus);
router.post('/messages/:id/reply', protect, replyContactMessage);
router.delete('/messages/:id', protect, deleteContactMessage);

module.exports = router;
