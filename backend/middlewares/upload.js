import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: `basobas/owner/${req.user.id}/rooms`,

    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    transformation: [
      {
        width: 1200,
        height: 800,
        crop: "limit",
      },
    ],
  }),
});

export const uploadRoomImages = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
}).array("images", 5);