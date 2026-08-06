const ContactMessage = require('../models/ContactMessage');
const ActivityLog = require('../models/ActivityLog');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * @desc    Submit Contact Form (Public)
 * @route   POST /api/contact
 * @access  Public
 */
const sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return errorResponse(res, 400, 'Please fill in all required fields (Name, Email, Message)');
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject: subject || 'Portfolio Contact Inquiry',
      message,
      ipAddress: req.ip
    });

    return successResponse(res, 201, 'Thank you! Your message has been sent successfully.', {
      messageId: contactMessage._id
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact messages (Admin)
 * @route   GET /api/contact/messages
 * @access  Private/Admin
 */
const getContactMessages = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const filter = {};

    if (status === 'unread') filter.isRead = false;
    if (status === 'read') filter.isRead = true;
    if (status === 'replied') filter.isReplied = true;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
    const unreadCount = await ContactMessage.countDocuments({ isRead: false });

    return successResponse(res, 200, 'Contact messages fetched successfully', {
      messages,
      unreadCount
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark Message as Read/Unread (Admin)
 * @route   PATCH /api/contact/messages/:id/read
 * @access  Private/Admin
 */
const toggleMessageReadStatus = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return errorResponse(res, 404, 'Contact message not found');
    }

    message.isRead = req.body.isRead !== undefined ? req.body.isRead : !message.isRead;
    if (message.isRead) message.readAt = Date.now();

    await message.save();

    return successResponse(res, 200, 'Message read status updated', { message });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reply to Contact Message (Admin)
 * @route   POST /api/contact/messages/:id/reply
 * @access  Private/Admin
 */
const replyContactMessage = async (req, res, next) => {
  try {
    const { replyMessage } = req.body;
    if (!replyMessage) {
      return errorResponse(res, 400, 'Please provide a reply message');
    }

    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return errorResponse(res, 404, 'Contact message not found');
    }

    message.isReplied = true;
    message.replyMessage = replyMessage;
    message.repliedAt = Date.now();
    message.isRead = true;
    await message.save();

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'REPLIED_CONTACT_MESSAGE',
      module: 'Contact System',
      details: `Replied to message from ${message.name} (${message.email})`,
      ipAddress: req.ip
    });

    return successResponse(res, 200, 'Reply recorded successfully', { message });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Contact Message (Admin)
 * @route   DELETE /api/contact/messages/:id
 * @access  Private/Admin
 */
const deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return errorResponse(res, 404, 'Contact message not found');
    }

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'DELETED_CONTACT_MESSAGE',
      module: 'Contact System',
      details: `Deleted message from ${message.name}`,
      ipAddress: req.ip
    });

    return successResponse(res, 200, 'Contact message deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendContactMessage,
  getContactMessages,
  toggleMessageReadStatus,
  replyContactMessage,
  deleteContactMessage,
};
