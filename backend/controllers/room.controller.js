import Room from "../models/room.model.js";
import cloudinary from "../config/cloudinary.js";

function parseKeepImages(value) {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// =======================
// Create Room
// =======================
export const postRoom = async (req, res) => {
  try {
    const {
      title,
      location,
      description,
      rent,
      rentType,
      tenancy,
      roomSize,
      numberOfRooms,
      parking,
      facilities,
      contact,
      whatsapp,
    } = req.body;

    if (!title || !location || !rent || !contact) {
      return res.status(400).json({
        success: false,
        message: "Title, location, rent and contact are required",
      });
    }

    // Uploaded images
    const uploadedImages = req.files
      ? req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }))
      : [];

    const newRoom = new Room({
      title,
      location,
      description,
      rent: Number(rent),
      rentType: rentType || "Monthly",
      tenancy: tenancy || "Anyone",
      roomSize: roomSize || "",
      numberOfRooms: Number(numberOfRooms) || 1,
      parking: parking === true || parking === "true",
      facilities: typeof facilities === "string"
        ? facilities
            .split(",")
            .map(item => item.trim())
            .filter(Boolean)
        : [],
      images: uploadedImages,
      image: uploadedImages.length > 0
        ? uploadedImages[0].url
        : "/default-room.jpg",
      contact,
      whatsapp: whatsapp || "",
      owner: req.user.id || req.user._id,
    });

    await newRoom.save();

    res.status(201).json({
      success: true,
      data: newRoom,
    });
  } catch (error) {
    console.log("🔥 POST ROOM ERROR:", error);

    res.status(500).json({
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

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const userId = req.user.id || req.user._id;

    const isOwner = room.owner.toString() === userId.toString();
    const isAdmin = req.user.isSystemAdmin === true;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const {
      title,
      location,
      description,
      rent,
      rentType,
      tenancy,
      roomSize,
      numberOfRooms,
      parking,
      facilities,
      contact,
      whatsapp,
      existingImages,
    } = req.body;

    // =======================
    // Update Text Data
    // =======================

    if (title !== undefined) room.title = title;
    if (location !== undefined) room.location = location;
    if (description !== undefined) room.description = description;
    if (rent !== undefined) room.rent = Number(rent);
    if (rentType !== undefined) room.rentType = rentType;
    if (tenancy !== undefined) room.tenancy = tenancy;
    if (roomSize !== undefined) room.roomSize = roomSize;
    if (numberOfRooms !== undefined) room.numberOfRooms = Number(numberOfRooms);

    if (parking !== undefined) {
      room.parking = parking === true || parking === "true";
    }

    if (facilities !== undefined) {
      room.facilities = typeof facilities === "string"
        ? facilities
            .split(",")
            .map(item => item.trim())
            .filter(Boolean)
        : facilities;
    }

    if (contact !== undefined) room.contact = contact;
    if (whatsapp !== undefined) room.whatsapp = whatsapp;

    // =======================
    // Keep Remaining Images
    // =======================

    let keepImages = [];

    if (existingImages) {
      try {
        keepImages = typeof existingImages === "string"
          ? JSON.parse(existingImages)
          : existingImages;
      } catch (error) {
        keepImages = [];
      }
    }

    // Delete removed images from Cloudinary
    const removedImages = room.images.filter(
      (oldImage) =>
        !keepImages.some(
          (keepImage) => keepImage.public_id === oldImage.public_id
        )
    );

    await Promise.all(
      removedImages.map((image) =>
        image.public_id
          ? cloudinary.uploader.destroy(image.public_id)
          : Promise.resolve()
      )
    );

    // =======================
    // Add New Images
    // =======================

    let newImages = [];

    if (req.files && req.files.length > 0) {
      newImages = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    // =======================
    // Final Images
    // =======================

    room.images = [
      ...keepImages,
      ...newImages
    ];

    // =======================
    // Main Image
    // =======================

    room.image = room.images.length > 0
      ? room.images[0]?.url
      : "/default-room.jpg";

    await room.save();

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.log("🔥 UPDATE ROOM ERROR:", error);

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

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    if (
      !req.user.isSystemAdmin &&
      room.owner?.toString() !== (req.user.id || req.user._id).toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this room",
      });
    }

    // Delete all room images from Cloudinary
    if (room.images && room.images.length > 0) {
      await Promise.all(
        room.images.map((image) =>
          image.public_id
            ? cloudinary.uploader.destroy(image.public_id)
            : Promise.resolve()
        )
      );
    }

    // Delete room from MongoDB
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
      owner: req.user.id || req.user._id,
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

// =======================
// Get Single Room
// =======================
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate(
      "owner",
      "name phone role"
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.log("GET ROOM ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};