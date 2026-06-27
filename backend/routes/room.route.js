import express from "express";

import {
  postRoom,
  getRooms,
  searchRooms,
} from "../controllers/room.controller.js";

const router = express.Router();

// Create Room
router.post("/", postRoom);

// Search Room
router.get("/search", searchRooms);

// Get All Rooms
router.get("/", getRooms);

export default router;