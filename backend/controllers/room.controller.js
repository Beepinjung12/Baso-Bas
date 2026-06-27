import Room from "../models/room.model.js";

// =======================
// Create Room
// =======================
export const postRoom = async (req, res) => {
  const room = req.body;

  if (!room.title || !room.location) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const newRoom = new Room(room);

  try {
    await newRoom.save();

    res.status(201).json({
      success: true,
      data: newRoom,
    });
  } catch (error) {
    console.log("Error creating room:", error.message);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry not allowed",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Get All Rooms
// =======================
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    console.log("Error fetching rooms:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Search Rooms
// =======================
export const searchRooms = async (req, res) => {
  try {
    const { keyword } = req.query;

    let filter = {};

    if (keyword) {
      filter = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { location: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { roomSize: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    const rooms = await Room.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    console.log("Error searching rooms:", error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};