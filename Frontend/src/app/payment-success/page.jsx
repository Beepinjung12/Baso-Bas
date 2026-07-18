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
        console.log("FULL URL:", window.location.href);
        console.log("PATHNAME:", window.location.pathname);
        console.log("SEARCH:", window.location.search);
        console.log("PARAMS:", searchParams.toString());

        const data = searchParams.get("data");

        console.log("data:", data);

        if (!data) {
          router.push("/explore");
          return;
        }

        // Verify payment with backend
        const res = await axios.post(
          `${config.apiUrl}/api/payment/esewa/verify`,
          {
            data,
          },
          {
            withCredentials: true,
          }
        );

        if (!res.data.success) {
          router.push("/explore");
          return;
        }

        const {
          roomId,
          transactionId,
          amount,
        } = res.data.data;

        console.log("VERIFY RESPONSE:", res.data);

        // Create booking after successful payment verification
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

        console.log("BOOKING CREATED:", bookingRes.data);

        router.push(`/rooms/${roomId}?booking=success`);
      } catch (error) {
        console.log("PAYMENT SUCCESS PAGE ERROR");
        console.log(error.response?.status);
        console.log(error.response?.data);
        console.log(error);

        router.push("/explore");
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {loading ? (
          <>
            <h1 className="text-2xl font-semibold">
              Verifying Payment...
            </h1>
            <p className="mt-2 text-gray-500">
              Please wait while we verify your payment.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-green-600">
              Payment Successful ✅
            </h1>
            <p className="mt-2 text-gray-500">
              Redirecting...
            </p>
          </>
        )}
      </div>
    </div>
  );
}