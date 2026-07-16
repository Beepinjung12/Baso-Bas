import express from "express";

import {
  initiateEsewaPayment,
  verifyEsewaPayment
} from "../controllers/payment.controller.js";

const router = express.Router();

// Initiate eSewa payment
router.post("/esewa", initiateEsewaPayment);

// Verify eSewa payment
router.post("/esewa/verify", verifyEsewaPayment);

export default router;