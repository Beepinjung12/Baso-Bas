"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/app/config";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const res = await axios.get(
        `${config.apiUrl}/api/bookings`,
        {
          withCredentials: true,
        }
      );

      setBookings(res.data.data || []);
    } catch (error) {
      console.log("ADMIN BOOKINGS ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBooking(id) {
    const confirmDelete = window.confirm(
      "Delete this booking permanently?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${config.apiUrl}/api/bookings/${id}`,
        {
          withCredentials: true,
        }
      );

      setBookings((prev) =>
        prev.filter(
          booking => booking._id !== id
        )
      );

      alert("Booking deleted successfully");
    } catch (error) {
      console.log("DELETE BOOKING ERROR:", error);
      alert("Failed to delete booking");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="rounded-3xl bg-white px-10 py-8 shadow-xl">
          Loading bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10 md:px-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
          Admin Panel
        </p>

        <h1 className="mt-3 text-5xl font-bold text-slate-800">
          All Bookings 📅
        </h1>

        <p className="mt-3 text-slate-500">
          Manage all user booking history.
        </p>
      </div>

      {/* Empty */}
      {bookings.length === 0 ? (
        <div className="rounded-3xl bg-white p-16 text-center shadow-lg">
          <div className="text-7xl">📭</div>
          <h2 className="mt-5 text-3xl font-bold text-slate-800">
            No Bookings Found
          </h2>
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
                    booking.room?.image
                      ? `${config.apiUrl}${booking.room.image}`
                      : "/default-room.jpg"
                  }
                  className="h-28 w-28 rounded-2xl object-cover"
                  alt="room"
                />

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {booking.room?.title}
                  </h2>

                  <p className="text-slate-500">
                    📍 {booking.room?.location}
                  </p>

                  <p className="mt-2 font-semibold text-sky-600">
                    Rs. {booking.room?.rent}
                  </p>
                </div>
              </div>

              {/* Users */}
              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <h3 className="font-bold">Tenant</h3>
                <p className="mt-2">👤 {booking.user?.name}</p>
                <p>📧 {booking.user?.email}</p>
                <p>📞 {booking.user?.phone || "N/A"}</p>

                <h3 className="mt-5 font-bold">Owner</h3>
                <p>👤 {booking.owner?.name}</p>
                <p>📧 {booking.owner?.email}</p>
              </div>

              {/* Status */}
              <div className="mt-6 flex items-center justify-between">
                <span
                  className={`
                    rounded-full
                    px-5
                    py-2
                    font-semibold
                    ${
                      booking.status === "ACCEPTED"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {booking.status}
                </span>

                <button
                  onClick={() => deleteBooking(booking._id)}
                  className="
                    rounded-xl
                    bg-red-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    hover:bg-red-700
                  "
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}