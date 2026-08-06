const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadMedia, getAllMedia, deleteMedia } = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');

// Configure Multer in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Admin Media Routes
router.get('/', protect, getAllMedia);
router.post('/upload', protect, upload.single('file'), uploadMedia);
router.delete('/:id', protect, deleteMedia);

module.exports = router;
