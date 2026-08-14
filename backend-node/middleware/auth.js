const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.status(503).json({ success: false, message: 'Authentication service is not configured' });
      }

      const decoded = jwt.verify(token, secret);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) return res.status(401).json({ success: false, message: 'User not found' });
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'No token' });
  }
};

module.exports = { protect };
