import jwt from "jsonwebtoken";
import ServiceProvider from "../model/serviceProviderModel.js";

const protectProvider = async (req, res, next) => {
  let token;

  // 1️⃣ Check Authorization header first
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ If no header token, check cookies
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.provider = await ServiceProvider.findById(decoded.id).select("-password");
    if (!req.provider) {
      return res.status(401).json({ success: false, msg: "Provider not found" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: "Invalid or expired token" });
  }
};

export default protectProvider;