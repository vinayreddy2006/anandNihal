import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Check Authorization header first
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2️⃣ If no header token, check cookies
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  // 3️⃣ If no token found, deny access
  if (!token) {
    return res.status(401).json({ success: false, msg: 'Not authorized, no token found' });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get user from DB
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, msg: 'Not authorized, user not found' });
    }

    // ✅ Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return res.status(401).json({ success: false, msg: 'Not authorized, token invalid or expired' });
  }
};

export default  protect ;
