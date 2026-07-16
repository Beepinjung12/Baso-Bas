"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

import config from "@/app/config";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyPayment() {
      try {
        const data = searchParams.get("data");
        const roomId = searchParams.get("roomId");

        console.log(searchParams.toString());
        console.log("roomId:", roomId);
        console.log("data:", data);

        if (!data || !roomId) {
          router.push("/explore");
          return;
        }

        const res = await axios.post(
          `${config.apiUrl}/api/payment/esewa/verify`,
          {
            data,
            roomId
          },
          {
            withCredentials: true
          }
        );

        if (res.data.success) {

          const {
            roomId,
            transactionId,
            amount,
          } = res.data.data;

          const bookingRes = await axios.post(
            `${config.apiUrl}/api/bookings`,
            {
              roomId,
              message: "I am interested in renting this room.",
              bookingStatus: "PENDING",
              payment: {
                method: "ESEWA",
                amount,
                status: "PAID",
                transactionId,
              },
            },
            {
              withCredentials: true,
            }
          );

          console.log("BOOKING CREATED", bookingRes.data);

          router.push(`/rooms/${roomId}?booking=success`);
        }
      } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
        console.log(error);

        router.push("/explore");
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, []);

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
    ">
      <div className="text-center">
        {loading ? (
          <h1 className="text-xl">
            Verifying payment...
          </h1>
        ) : (
          <h1 className="
            text-3xl
            font-bold
            text-green-600
          ">
            Payment Successful ✅
            <br />
            Redirecting...
          </h1>
        )}
      </div>
    </div>
  );
}