import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import adminOnly from "../middlewares/adminOnly.js";
import { adminLogin } from "../controllers/adminAuth.controller.js";
import {
  getAdminStats,
  getAllUsers,
  deleteUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", adminLogin);

router.use(protectRoute, adminOnly);

router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

export default router;
