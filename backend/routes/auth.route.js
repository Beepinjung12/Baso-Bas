import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  deleteProfileImage,
} from "../controllers/auth.controller.js";
import { get } from "mongoose";
import protectRoute from "../middlewares/protectRoute.js";
import uploadProfileImage from "../middlewares/profileUpload.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile/update", protectRoute,  uploadProfileImage.single("profileImage"),  updateUserProfile);
router.get("/profile", protectRoute, getUserProfile);
router.delete("/profile/image", protectRoute, deleteProfileImage);

router.post("/logout", protectRoute, logoutUser);

export default router;
