import express from "express";

import {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
  checkWishlist,
} from "../controllers/wishlist.controller.js";

import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// Get logged-in user's wishlist
router.get("/", protectRoute, getMyWishlist);

// Check if room is liked
router.get("/check/:roomId", protectRoute, checkWishlist);

// Add room to wishlist
router.post("/:roomId", protectRoute, addToWishlist);

// Remove room from wishlist
router.delete("/:roomId", protectRoute, removeFromWishlist);

export default router;