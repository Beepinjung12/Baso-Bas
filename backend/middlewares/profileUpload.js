import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: `basobas/${
      req.user.role === "owner" ? "owner" : "user"
    }/${req.user.id}/profile`,

    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    transformation: [
      {
        width: 500,
        height: 500,
        crop: "fill",
        gravity: "face",
      },
    ],
  }),
});

const uploadProfileImage = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});

export default uploadProfileImage;