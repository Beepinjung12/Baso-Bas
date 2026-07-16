import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";

// =====================
// Create Booking
// =====================
export const createBooking = async (req, res) => {
  try {
    const {
      roomId,
      message,
      payment,
      bookingStatus
    } = req.body;

    const paymentMethod = payment?.method || "COD";

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    // Prevent owner booking own room
    if (room.owner.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot book your own room."
      });
    }

    // Check existing booking
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      room: roomId,
      bookingStatus: {
        $in: [
          "PAYMENT_PENDING",
          "PENDING"
        ]
      }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You already have a booking request for this room."
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      room: room._id,
      owner: room.owner,
      message: message || "",
      // Hide until payment success
      bookingStatus: bookingStatus || "PENDING",
      payment: {
        method: paymentMethod,
        amount: room.rent,
        status: payment?.status || (
          paymentMethod === "COD"
            ? "UNPAID"
            : "PENDING"
        )
      }
    });

    res.status(201).json({
      success: true,
      message: "Booking created",
      data: booking
    });
  } catch (error) {
    console.log("CREATE BOOKING ERROR", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================
// User Bookings
// =====================
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id
    })
      .populate("room")
      .populate("owner", "name email");

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ============================
// OWNER GET BOOKING REQUESTS
// ============================
export const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      owner: req.user.id,
    })
      .populate("user", "name email phone")
      .populate("room", "title location rent image")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.log("OWNER BOOKINGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// Update Status
// =====================
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    booking.bookingStatus = status;

    await booking.save();

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ============================
// ACCEPT BOOKING
// ============================
export const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // only room owner can accept
    if (booking.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const alreadyAccepted = await Booking.findOne({
      room: booking.room,
      bookingStatus: "ACCEPTED",
      _id: {
        $ne: booking._id
      }
    });

    if (alreadyAccepted) {
      return res.status(400).json({
        success: false,
        message: "This room already has an accepted booking."
      });
    }

    booking.bookingStatus = "ACCEPTED";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking accepted",
      data: booking,
    });
  } catch (error) {
    console.log("ACCEPT BOOKING ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// REJECT BOOKING
// ============================
export const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    booking.bookingStatus = "DECLINED";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking rejected",
      data: booking,
    });
  } catch (error) {
    console.log("REJECT BOOKING ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// ADMIN DELETE BOOKING
// ============================
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.log("DELETE BOOKING ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// GET ALL BOOKINGS (ADMIN)
// ============================
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone")
      .populate("owner", "name email")
      .populate("room", "title location rent image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};