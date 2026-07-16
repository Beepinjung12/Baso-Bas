import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    rent: {
      type: Number,
      default: 0,
    },

    rentType: {
      type: String,
      default: "Monthly",
    },

    tenancy: {
      type: String,
      default: "Anyone",
    },

    roomSize: {
      type: String,
      default: "",
    },

    numberOfRooms: {
      type: Number,
      default: 1,
    },

    parking: {
      type: Boolean,
      default: false,
    },

    facilities: [
      {
        type: String,
      },
    ],

    contact: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    // Cloudinary images only
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    // Thumbnail / Cover Image
    image: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);