"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import config from "@/app/config";

export default function BookingButton({ roomId }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);


async function handleBooking(paymentMethod){

  try{

    setLoading(true);


if (paymentMethod === "ESEWA") {

  const paymentRes = await axios.post(
    `${config.apiUrl}/api/payment/esewa`,
    {
      amount: 0, // You can set the actual amount here if needed
      roomId,
    },
    {
      withCredentials: true,
    }
  );

  const form = document.createElement("form");

  form.method = "POST";
  form.action = paymentRes.data.paymentUrl;

  Object.entries(paymentRes.data.data).forEach(([key, value]) => {
    const input = document.createElement("input");

    input.type = "hidden";
    input.name = key;
    input.value = value;

    form.appendChild(input);
  });

document.body.appendChild(form);

console.log("Payment Response:");
console.log(paymentRes.data);

console.log("Form Data:");
console.log(paymentRes.data.data);


form.submit();

  return;
}



    if(paymentMethod==="COD"){

      const res = await axios.post(
        `${config.apiUrl}/api/bookings`,
        {
          roomId,

          message:
          "I am interested in renting this room.",

          payment:{
            method:"COD",
            amount:0
          }
        },
        {
          withCredentials:true
        }
      );


      if(res.data.success){

        setMessage(
          "Booking request sent successfully ✅"
        );

      }

    }


  }
  catch(error){

    console.log(error);

  }
  finally{

    setLoading(false);

  }

}
  return (
    <div>
      <button
        onClick={() => setShowPayment(true)}
        disabled={loading}
        className="
          flex w-full
          justify-center
          items-center
          gap-3
          rounded-xl
          bg-sky-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-sky-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading
          ? "Sending Request..."
          : "🏠 Book This Room"
        }
      </button>

      {showPayment && (
        <div className="mt-4 rounded-xl bg-white p-5 shadow">
          <h3 className="font-bold text-lg">
            Choose Payment Method
          </h3>

          <button
            className="mt-3 w-full rounded-lg bg-green-600 p-3 text-white"
            onClick={() => handleBooking("ESEWA")}
          >
            💳 Pay with eSewa
          </button>

          <button
            className="mt-3 w-full rounded-lg bg-blue-600 p-3 text-white"
            onClick={() => handleBooking("COD")}
          >
            💵 Cash on Delivery
          </button>
        </div>
      )}

      {message && (
        <p
          className={`
            mt-3
            rounded-xl
            p-3
            text-center
            text-sm
            font-medium
            ${
              message.includes("success")
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {message}
        </p>
      )}
    </div>
  );
}