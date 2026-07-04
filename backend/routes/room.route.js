import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import adminOnly from "../middlewares/adminOnly.js";
import { getMyRooms } from "../controllers/room.controller.js";
import {
  postRoom,
  getRooms,
  searchRooms,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/search", searchRooms);

router.post("/", protectRoute,  postRoom);
router.put("/:id", protectRoute, updateRoom);
router.delete("/:id", protectRoute, deleteRoom);
router.get("/my-rooms", protectRoute, getMyRooms);

export default router;
