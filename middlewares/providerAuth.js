import jwt from 'jsonwebtoken';
import ServiceProvider from "../model/serviceProviderModel.js";

const protectProvider = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.provider = await ServiceProvider.findById(decoded.id).select('-password');

      if (!req.provider) {
        return res.status(401).json({ success: false, msg: "Provider not found" });
      }

      return next(); 
    } catch (error) {
      return res.status(401).json({ success: false, msg: "Invalid or expired token" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, msg: "No token, authorization denied" });
  }
};

export default protectProvider;
