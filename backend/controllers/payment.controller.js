import crypto from "crypto-js";
import axios from "axios";
import Booking from "../models/booking.model.js";

export const initiateEsewaPayment = async (req, res) => {
  try {
    const {
      amount,
      roomId,
    } = req.body;

    const transactionUuid = `ROOM${Date.now()}`;
    const totalAmount = Number(amount).toFixed(2);

    const productCode = "EPAYTEST";

    const message =
      `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;

    const secretKey = "8gBm/:&EnhH.1/q";

    const signature = crypto
      .HmacSHA256(message, secretKey)
      .toString(crypto.enc.Base64);

    res.json({
      success: true,
      paymentUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
      data: {
        amount: totalAmount,
        tax_amount: "0",
        total_amount: totalAmount,
        transaction_uuid: transactionUuid,
        product_code: productCode,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: `http://localhost:3000/payment-success?roomId=${roomId}`,
        failure_url: `http://localhost:3000/payment-failed`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature
      }
    });
  } catch (error) {
    console.log("ESEWA PAYMENT ERROR", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const verifyEsewaPayment = async (req, res) => {
  try {
    const { data, roomId } = req.body;

    const decoded = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );

    if (decoded.status !== "COMPLETE") {
      return res.status(400).json({
        success: false,
        message: "Payment failed"
      });
    }

    res.json({
      success: true,
      message: "Payment verified",
      data: {
        roomId,
        transactionId: decoded.transaction_code,
        amount: Number(decoded.total_amount),
      },
    });
  } catch (error) {
    console.log("ESEWA VERIFY ERROR", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};