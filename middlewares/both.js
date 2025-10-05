import jwt from 'jsonwebtoken';
import User from '../model/userModel.js'
import ServiceProvider from '../model/serviceProviderModel.js';


const protectAll = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (user) {
      req.user = user;
      return next();
    }

    const provider = await ServiceProvider.findById(decoded.id).select('-password');
    if (provider) {
      req.provider = provider;
      return next();
    }

    return res.status(401).json({ success: false, message: 'Not authorized, token holder not found' });

  } catch (error) {
    console.error('protectAll Error:', error.message);
    return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
  }
};

export default protectAll ;
