import Wishlist from "../models/wishlist.model.js";
import Room from "../models/room.model.js";

// =======================
// Add Room To Wishlist
// =======================
export const addToWishlist = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const existing = await Wishlist.findOne({
      user: req.user.id,
      room: roomId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      room: roomId,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    console.log("ADD WISHLIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Remove From Wishlist
// =======================
export const removeFromWishlist = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const wishlist = await Wishlist.findOneAndDelete({
      user: req.user.id,
      room: roomId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.log("REMOVE WISHLIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get My Wishlist
// =======================
export const getMyWishlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const wishlist = await Wishlist.find({
      user: req.user.id,
    })
      .populate("room")
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      data: wishlist,
    });
  } catch (error) {
    console.log("GET WISHLIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Check Wishlist Status
// =======================
export const checkWishlist = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!req.user) {
      return res.status(200).json({
        success: true,
        liked: false,
      });
    }

    const exists = await Wishlist.findOne({
      user: req.user.id,
      room: roomId,
    });

    res.status(200).json({
      success: true,
      liked: !!exists,
    });
  } catch (error) {
    console.log("CHECK WISHLIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};