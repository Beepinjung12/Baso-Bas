import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
        type: String,
        unique: true,
        sparse: true,
        default: "",
      },
    bio: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },

    profileImagePublicId: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },
    profileImage: {
        type: String,
        default: ""
    },

    ownerRequestStatus: {
        type: String,
        enum: ["none", "pending", "approved", "rejected"],
        default: "none",
    },

    role: {
      type: String,
      enum: ["owner", "admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
