import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { uploadRoomImages } from "../middlewares/upload.js";

import {
  postRoom,
  getRooms,
  getRoomById,
  searchRooms,
  updateRoom,
  deleteRoom,
  getMyRooms,
} from "../controllers/room.controller.js";

const router = express.Router();

// Handle multer upload errors
function handleUpload(req, res, next) {
  uploadRoomImages(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
}

// Get all rooms
router.get("/", getRooms);

// Search rooms
router.get("/search", searchRooms);

// Owner dashboard rooms
router.get("/my-rooms", protectRoute, getMyRooms);

// Single room details
router.get("/:id", getRoomById);

// Create room with images
router.post("/", protectRoute, handleUpload, postRoom);

// Update room with images
router.put("/:id", protectRoute, handleUpload, updateRoom);

// Delete room
router.delete("/:id", protectRoute, deleteRoom);

export default router;