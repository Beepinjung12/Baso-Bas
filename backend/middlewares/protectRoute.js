import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👑 System Admin (.env)
    if (decoded.isSystemAdmin) {
      req.user = {
        id: null,
        name: process.env.SYSTEM_ADMIN_NAME,
        phone: process.env.SYSTEM_ADMIN_PHONE,
        role: "admin",
        isSystemAdmin: true,
      };

      return next();
    }

    // 👤 Owner / User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Add flag for consistency
    user.isSystemAdmin = false;

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default protectRoute;