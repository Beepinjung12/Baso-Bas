import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteProfileImage,
  logoutUser,
  requestOwnerAccess,
  getOwnerRequests,
  demoteOwner,
  approveOwnerRequest,
  rejectOwnerRequest,
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
router.post("/request-owner", protectRoute, requestOwnerAccess);
router.get("/owner-requests", protectRoute, getOwnerRequests);
router.put("/owner-requests/:id/approve", protectRoute, approveOwnerRequest);
router.put("/owner-requests/:id/reject", protectRoute, rejectOwnerRequest);
router.put(
  "/owner-requests/:id/demote",
  protectRoute,
  demoteOwner
);


router.post("/logout", protectRoute, logoutUser);

export default router;
