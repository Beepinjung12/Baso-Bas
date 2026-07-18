import express from "express";

import protectRoute from "../middlewares/protectRoute.js";
import adminOnly from "../middlewares/adminOnly.js";

import { adminLogin } from "../controllers/adminAuth.controller.js";

import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAdminRooms,
  toggleFeaturedRoom,
} from "../controllers/admin.controller.js";

const router = express.Router();

// =======================
// Admin Login (Public)
// =======================
router.post("/login", adminLogin);

// =======================
// Protected Admin Routes
// =======================
router.use(protectRoute, adminOnly);

// =======================
// Dashboard
// =======================
router.get("/stats", getAdminStats);

// =======================
// User Management
// =======================
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// =======================
// Room Management
// =======================
// Get all rooms with owner details
router.get("/rooms", getAdminRooms);

// Add / Remove featured room
router.put("/rooms/:id/featured", toggleFeaturedRoom);

export default router;