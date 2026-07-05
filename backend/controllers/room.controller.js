import Room from "../models/room.model.js";

// =======================
// Create Room
// =======================
export const postRoom = async (req, res) => {
  try {
    const { title, location, description, roomSize } = req.body;

    if (!title || !location) {
      return res.status(400).json({
        success: false,
        message: "Title and location are required",
      });
    }

    const newRoom = new Room({
      title,
      location,
      description,
      roomSize,
      owner: req.user?.id || null, // Logged-in user or null
    });

    await newRoom.save();

    return res.status(201).json({
      success: true,
      data: newRoom,
    });

  } catch (error) {
    console.log("🔥 POST ROOM ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
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

// =======================
// Update Room
// =======================
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find room
    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // 2. Safety check: req.user must exist
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // 3. Permission check (admin OR owner)
    const isOwner = room.owner?.toString() === req.user.id;
    const isAdmin = req.user.isSystemAdmin === true;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to update this room",
      });
    }

    // 4. Prevent accidental overwrite of owner field
    const { owner, ...updateData } = req.body;

    // 5. Apply updates safely
    Object.assign(room, updateData);

    await room.save();

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.log("🔥 UPDATE ROOM ERROR:", error);

    // 6. Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry not allowed",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =======================
// Delete Room
// =======================
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Safety check
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Only the room owner or the system admin can delete
    if (
      !req.user.isSystemAdmin &&
      room.owner?.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this room",
      });
    }

    await room.deleteOne();

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.log("🔥 DELETE ROOM ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Get My Rooms
// =======================
export const getMyRooms = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const rooms = await Room.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    console.log("🔥 GET MY ROOMS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};