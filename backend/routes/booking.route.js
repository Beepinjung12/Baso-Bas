import express from "express";

import {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  acceptBooking,
  rejectBooking,
  deleteBooking,
  updateBookingStatus,
  getAllBookings,
} from "../controllers/booking.controller.js";

import protectRoute from "../middlewares/protectRoute.js";
import adminOnly from "../middlewares/adminOnly.js";

const router = express.Router();

// Create booking
router.post("/", protectRoute, createBooking);

// Get user's bookings
router.get("/my", protectRoute, getMyBookings);

// Get owner's bookings
router.get("/owner", protectRoute, getOwnerBookings);

// Update booking status
router.put("/:id", protectRoute, updateBookingStatus);

// Accept booking
router.put("/:id/accept", protectRoute, acceptBooking);

// Reject booking
router.put("/:id/reject", protectRoute, rejectBooking);

// Delete booking (admin only)
router.delete("/:id", protectRoute, adminOnly, deleteBooking);

// Get all bookings (admin only)
router.get("/", protectRoute, adminOnly, getAllBookings);

export default router;