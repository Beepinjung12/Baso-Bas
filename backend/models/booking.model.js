import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Payment Information
    payment: {
      method: {
        type: String,
        enum: [
          "ESEWA",
          "COD"
        ],
        required: true
      },

      amount: {
        type: Number,
        required: true
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "PAID",
          "UNPAID",
          "REFUNDED"
        ],
        default: "PENDING"
      },

      transactionId: {
        type: String,
        default: ""
      }
    },

    // Owner approval status
    bookingStatus: {
      type: String,
      enum: [
        "PAYMENT_PENDING",
        "PENDING",
        "ACCEPTED",
        "DECLINED",
        "CANCELLED"
      ],
      default: "PAYMENT_PENDING"
    },

    message: {
      type: String,
      default: ""
    },

    receipt: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Booking", bookingSchema);