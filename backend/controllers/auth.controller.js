import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;

    const userExists = await User.findOne({ phone });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN
// export const loginUser = async (req, res) => {
//   try {
//     const { phone, password } = req.body;

//     // find user
//     const user = await User.findOne({ phone });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // create jwt token
//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       },
//     );
//     // save token in cookie
//     res.cookie("jwt", token, {
//       httpOnly: true,
//       secure: false, // true in production (HTTPS)
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    // Handle system admin from .env
    if (req.user.isSystemAdmin) {
      return res.status(200).json({
        success: true,
        data: {
          name: process.env.SYSTEM_ADMIN_NAME,
          phone: process.env.SYSTEM_ADMIN_PHONE,
          role: "admin",
        },
      });
    }

    // Normal owner/user
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    // 👑 System admin cannot be updated
    if (req.user.isSystemAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "System admin profile cannot be updated.",
      });
    }

    const userId = req.user.id;
    const { name, phone, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update password
    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Both current and new password are required",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Update name
    if (name) {
      user.name = name;
    }

    // Update phone
    if (phone) {
      const phoneExists = await User.findOne({ phone });

      if (phoneExists && phoneExists._id.toString() !== userId.toString()) {
        return res.status(400).json({
          success: false,
          message: "Phone already in use",
        });
      }

      user.phone = phone;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//logout user
export const logoutUser = async (req, res) => {
  try {
    // Clear the httpOnly cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // 👑 1. SYSTEM ADMIN (.env check FIRST)
    const isSystemAdmin =
      phone === process.env.SYSTEM_ADMIN_PHONE &&
      password === process.env.SYSTEM_ADMIN_PASSWORD;

    if (isSystemAdmin) {
      const token = jwt.sign(
        {
          phone,
          role: "admin",
          isSystemAdmin: true,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
        user: {
          phone,
          role: "admin",
        },
      });
    }

    // 🏠 2. NORMAL USER / OWNER LOGIN
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};