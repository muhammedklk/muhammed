const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * @desc    Register initial admin (Allowed only if no user exists in DB)
 * @route   POST /api/auth/register-initial
 * @access  Public
 */
const registerInitialAdmin = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return errorResponse(res, 400, 'Initial Admin already registered. Please log in.');
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 400, 'Please provide name, email, and password');
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'superadmin',
    });

    const token = user.getSignedJwtToken();

    return successResponse(res, 201, 'Initial Admin registered successfully', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login Admin User
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, 'Please provide an email and password');
    }

    // Check for user (include password explicitly)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return errorResponse(res, 401, 'Invalid credentials');
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return errorResponse(res, 401, 'Invalid credentials');
    }

    // Update last login timestamp
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    const token = user.getSignedJwtToken();

    return successResponse(res, 200, 'Logged in successfully', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Current Logged in User Profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    return successResponse(res, 200, 'User profile fetched successfully', { user });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Profile Details
 * @route   PUT /api/auth/updatedetails
 * @access  Private
 */
const updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {};
    if (req.body.name) fieldsToUpdate.name = req.body.name;
    if (req.body.email) fieldsToUpdate.email = req.body.email.toLowerCase();
    if (req.body.avatar) fieldsToUpdate.avatar = req.body.avatar;

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    return successResponse(res, 200, 'Profile details updated successfully', { user });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Password
 * @route   PUT /api/auth/updatepassword
 * @access  Private
 */
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return errorResponse(res, 400, 'Please provide both current and new password');
    }

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(currentPassword))) {
      return errorResponse(res, 401, 'Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    const token = user.getSignedJwtToken();

    return successResponse(res, 200, 'Password updated successfully', { token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerInitialAdmin,
  login,
  getMe,
  updateDetails,
  updatePassword,
};
