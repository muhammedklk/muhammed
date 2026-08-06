const Media = require('../models/Media');
const ActivityLog = require('../models/ActivityLog');
const { cloudinary } = require('../config/cloudinary');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * @desc    Upload Media Asset to Cloudinary & DB (Admin)
 * @route   POST /api/media/upload
 * @access  Private/Admin
 */
const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file && !req.body.fileUrl) {
      return errorResponse(res, 400, 'Please upload an image file or provide a valid image URL');
    }

    let resultUrl = '';
    let publicId = `media_${Date.now()}`;
    let format = 'png';
    let bytes = 0;

    if (req.file) {
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
        // Buffer upload via Cloudinary upload_stream
        const uploadPromise = new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'portfolio_cms', resource_type: 'image' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });

        const uploadResult = await uploadPromise();
        resultUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
        format = uploadResult.format;
        bytes = uploadResult.bytes;
      } else {
        // Local Disk Fallback
        const fs = require('fs');
        const path = require('path');
        const uploadsDir = path.join(__dirname, '../../public/assets/uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const ext = path.extname(req.file.originalname) || '.png';
        const filename = `upload_${Date.now()}${ext}`;
        const filePath = path.join(uploadsDir, filename);
        fs.writeFileSync(filePath, req.file.buffer);
        
        resultUrl = `/assets/uploads/${filename}`;
        publicId = filename;
        format = ext.replace('.', '');
        bytes = req.file.size;
      }
    } else {
      resultUrl = req.body.fileUrl;
    }

    const media = await Media.create({
      name: req.body.name || req.file?.originalname || 'Asset',
      url: resultUrl,
      publicId,
      format,
      bytes,
      alt: req.body.alt || ''
    });

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'UPLOADED_MEDIA',
      module: 'Media Library',
      details: `Uploaded media: ${media.name}`,
      ipAddress: req.ip
    });

    return successResponse(res, 201, 'Media uploaded successfully', { media });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get All Media Assets (Admin)
 * @route   GET /api/media
 * @access  Private/Admin
 */
const getAllMedia = async (req, res, next) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    return successResponse(res, 200, 'Media assets fetched successfully', { media });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Media Asset (Admin)
 * @route   DELETE /api/media/:id
 * @access  Private/Admin
 */
const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return errorResponse(res, 404, 'Media asset not found');
    }

    if (media.publicId && media.publicId.startsWith('portfolio_cms')) {
      try {
        await cloudinary.uploader.destroy(media.publicId);
      } catch (err) {
        console.warn(`[Cloudinary Warning] Could not destroy image ${media.publicId}`);
      }
    }

    await media.deleteOne();

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'DELETED_MEDIA',
      module: 'Media Library',
      details: `Deleted media: ${media.name}`,
      ipAddress: req.ip
    });

    return successResponse(res, 200, 'Media asset deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadMedia,
  getAllMedia,
  deleteMedia,
};
