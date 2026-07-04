"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/app/config";
import Link from "next/link";

export default function ListRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `${config.apiUrl}/api/rooms/my-rooms`,
        {
          withCredentials: true,
        }
      );

      setRooms(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Delete this room permanently?")) return;

    try {
      await axios.delete(
        `${config.apiUrl}/api/rooms/${id}`,
        {
          withCredentials: true,
        }
      );

      setRooms((prev) =>
        prev.filter((room) => room._id !== id)
      );

      alert("Room deleted successfully.");
    } catch (err) {
      console.log(err);
      alert("Failed to delete room.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-8 py-5 shadow-lg">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600"></div>
          <span className="text-slate-600">
            Loading your rooms...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-400 to-sky-200 px-10 py-14">

        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10"></div>

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="font-playfair text-5xl font-semibold leading-tight text-white">
              Manage your
              <br />
              room listings
            </h1>

            <p className="mt-4 max-w-xl text-lg text-white/80">
              View, edit and organize all your properties in one place.
            </p>

          </div>

          <Link
            href="/owner/create-room"
            className="rounded-2xl bg-white px-7 py-4 font-semibold text-sky-700 shadow-xl transition hover:scale-105"
          >
            ➕ Create Room
          </Link>

        </div>

      </section>

      {/* CONTENT */}

      <div className="relative z-20 -mt-10 px-10 pb-10">

        {/* STATS */}

        <div className="mb-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-7 shadow-lg">

            <p className="text-sm uppercase tracking-wider text-slate-500">
              Total Listings
            </p>

            <h2 className="mt-3 text-5xl font-bold text-slate-800">
              {rooms.length}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-7 shadow-lg">

            <p className="text-sm uppercase tracking-wider text-slate-500">
              Active
            </p>

            <h2 className="mt-3 text-5xl font-bold text-emerald-600">
              {rooms.length}
            </h2>

          </div>

          <div className="rounded-3xl bg-white p-7 shadow-lg">

            <p className="text-sm uppercase tracking-wider text-slate-500">
              Available
            </p>

            <h2 className="mt-3 text-5xl font-bold text-sky-600">
              {rooms.length}
            </h2>

          </div>

        </div>

        {/* EMPTY */}

        {rooms.length === 0 ? (
          <div className="rounded-3xl bg-white p-20 text-center shadow-lg">

            <div className="text-7xl">🏠</div>

            <h2 className="mt-5 text-3xl font-bold text-slate-800">
              No Rooms Found
            </h2>

            <p className="mt-3 text-slate-500">
              Start by creating your first room listing.
            </p>

            <Link
              href="/owner/create-room"
              className="mt-8 inline-block rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              Create First Room
            </Link>

          </div>
        ) : (

          <div className="space-y-6">

            {rooms.map((room) => (

              <div
                key={room._id}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  {/* LEFT */}

                  <div>

                    <div className="flex items-center gap-3">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-2xl">
                        🏠
                      </div>

                      <div>

                        <h2 className="text-2xl font-bold text-slate-800">
                          {room.title}
                        </h2>

                        <p className="text-slate-500">
                          📍 {room.location}
                        </p>

                      </div>

                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">

                      {room.roomSize && (
                        <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700">
                          📐 {room.roomSize}
                        </span>
                      )}

                      {room.numberOfRooms && (
                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                          🚪 {room.numberOfRooms} Rooms
                        </span>
                      )}

                      {room.price && (
                        <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                          💰 Rs. {room.price}
                        </span>
                      )}

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="flex gap-3">

                    <Link
                      href={`/owner/edit-room/${room._id}`}
                      className="rounded-xl bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
                    >
                      ✏️ Edit
                    </Link>

                    <button
                      onClick={() => deleteRoom(room._id)}
                      className="rounded-xl bg-red-500 px-6 py-3 font-medium text-white transition hover:bg-red-600"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}