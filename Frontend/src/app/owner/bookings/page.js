"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/app/config";

export default function OwnerBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const res = await axios.get(
        `${config.apiUrl}/api/bookings/owner`,
        {
          withCredentials: true,
        }
      );

      setBookings(res.data.data || []);
    } catch (error) {
      console.log("FETCH OWNER BOOKINGS ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, action) {
    try {
      await axios.put(
        `${config.apiUrl}/api/bookings/${id}/${action}`,
        {},
        {
          withCredentials: true,
        }
      );

      setBookings((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                bookingStatus: action === "accept"
                  ? "ACCEPTED"
                  : "DECLINED",
              }
            : item
        )
      );
    } catch (error) {
      console.log("STATUS UPDATE ERROR:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="rounded-3xl bg-white px-10 py-8 shadow-xl">
          Loading booking requests...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10 md:px-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
          Owner Dashboard
        </p>

        <h1 className="mt-3 text-5xl font-bold text-slate-800">
          Booking Requests 📩
        </h1>

        <p className="mt-3 text-slate-500">
          Manage tenants who requested your rooms.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-3xl bg-white p-16 text-center shadow-lg">
          <div className="text-7xl">📭</div>
          <h2 className="mt-5 text-3xl font-bold text-slate-800">
            No Booking Requests
          </h2>
          <p className="mt-3 text-slate-500">
            When tenants book your rooms, requests will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-3xl bg-white p-7 shadow-lg"
            >
              {/* Room */}
              <div className="flex gap-5">
                <img
                  src={
                    booking.room?.images?.length > 0
                      ? booking.room.images[0].url
                      : "/default-room.jpg"
                  }
                  className="h-28 w-28 rounded-2xl object-cover"
                  alt="room"
                />

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {booking.room?.title}
                  </h2>

                  <p className="mt-1 text-slate-500">
                    📍 {booking.room?.location}
                  </p>

                  <p className="mt-2 font-semibold text-sky-600">
                    Rs. {booking.room?.rent}
                  </p>
                </div>
              </div>

              {/* Tenant */}
              <div className="mt-7 rounded-2xl bg-slate-50 p-5">
                <h3 className="font-bold text-lg">
                  Tenant Information
                </h3>

                <p className="mt-3">
                  👤 {booking.user?.name}
                </p>

                <p className="mt-2">
                  📧 {booking.user?.email}
                </p>

                <p className="mt-2">
                  📞 {booking.user?.phone || "Not Provided"}
                </p>
              </div>

              {/* Status */}
              <div className="mt-6 flex items-center justify-between">
                <span
                  className="
                    rounded-full
                    bg-yellow-100
                    px-5
                    py-2
                    font-semibold
                    text-yellow-700
                  "
                >
                  {booking.bookingStatus || "PENDING"}
                </span>

                {booking.bookingStatus === "PENDING" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        updateStatus(booking._id, "accept")
                      }
                      className="
                        rounded-xl
                        bg-emerald-600
                        px-5
                        py-3
                        font-semibold
                        text-white
                        hover:bg-emerald-700
                      "
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(booking._id, "reject")
                      }
                      className="
                        rounded-xl
                        bg-red-500
                        px-5
                        py-3
                        font-semibold
                        text-white
                        hover:bg-red-600
                      "
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}