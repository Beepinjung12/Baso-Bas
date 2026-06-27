import express from "express";
import { connectDB } from "./config/db.js";
import roomRoutes from "./routes/room.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // ← your exact frontend URL
    credentials: true, // ← allow cookies
  }),
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/rooms", roomRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});