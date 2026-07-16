import express from "express";
import wishlistRoutes from "./routes/wishlist.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import roomRoutes from "./routes/room.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bookingRoutes from "./routes/booking.route.js";
import paymentRoute from "./routes/payment.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://127.0.0.1:5500",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "../Frontend/admin")));

app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.use("/api/rooms", roomRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/bookings",bookingRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
app.use(
"/api/payment",
paymentRoute
);