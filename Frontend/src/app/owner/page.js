"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import config from "@/app/config";

export default function OwnerDashboard() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(
          `${config.apiUrl}/api/rooms/my-rooms`,
          { withCredentials: true }
        );

        setRooms(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRooms();
  }, []);

  const totalRooms = rooms.length;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-400 to-sky-200 px-10 py-14">

        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10" />

        <div className="relative z-10">

          <h1 className="font-playfair text-5xl font-semibold leading-tight text-white">
            Manage your <br />
            rooms effortlessly
          </h1>

          <p className="mt-4 max-w-xl text-lg text-white/80">
            Welcome back. Manage your listings, monitor your properties,
            and keep everything organized from one place.
          </p>

        </div>

      </section>

      {/* ================= CONTENT ================= */}

      <div className="-mt-10 relative z-20 px-10 pb-10">

        {/* ================= STATS ================= */}

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg transition hover:-translate-y-1">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm uppercase tracking-wider text-slate-500">
                  My Listings
                </p>

                <h2 className="mt-3 text-5xl font-bold text-slate-800">
                  {totalRooms}
                </h2>

              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-3xl">
                🏠
              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg transition hover:-translate-y-1">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm uppercase tracking-wider text-slate-500">
                  Active Rooms
                </p>

                <h2 className="mt-3 text-5xl font-bold text-emerald-600">
                  {totalRooms}
                </h2>

              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                ✅
              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg transition hover:-translate-y-1">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm uppercase tracking-wider text-slate-500">
                  Pending
                </p>

                <h2 className="mt-3 text-5xl font-bold text-amber-500">
                  0
                </h2>

              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
                ⏳
              </div>

            </div>

          </div>

        </div>

        {/* ================= WELCOME + SUMMARY ================= */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

            <h2 className="font-playfair text-3xl font-semibold text-slate-800">
              Welcome Back 👋
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              You can create new room listings, edit existing rooms,
              manage your profile, and monitor your properties from
              this dashboard.
            </p>

          </div>

          <div className="rounded-3xl bg-gradient-to-br from-sky-600 via-sky-500 to-sky-400 p-8 text-white shadow-xl">

            <p className="text-sm uppercase tracking-widest text-white/70">
              Quick Summary
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {totalRooms} Properties
            </h2>

            <p className="mt-4 text-white/80">
              Use the navigation panel to manage your rooms,
              update your profile, and create new listings.
            </p>

          </div>

        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

          <h2 className="font-playfair text-2xl font-semibold text-slate-800">
            Quick Actions
          </h2>

          <p className="mt-2 text-slate-500">
            Jump directly to the most common tasks.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            <Link
              href="/owner/create-room"
              className="rounded-xl bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
            >
              ➕ Create Room
            </Link>

            <Link
              href="/owner/list-rooms"
              className="rounded-xl border border-sky-600 px-6 py-3 font-medium text-sky-700 transition hover:bg-sky-50"
            >
              🏠 Manage Rooms
            </Link>

            <Link
              href="/owner/profile"
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              👤 Profile
            </Link>

          </div>

        </div>

        {/* ================= RECENT ROOMS ================= */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="font-playfair text-2xl font-semibold text-slate-800">
              Recent Listings
            </h2>

            <Link
              href="/owner/list-rooms"
              className="text-sm font-medium text-sky-600 hover:underline"
            >
              View All →
            </Link>

          </div>

          {rooms.length === 0 ? (
            <p className="text-slate-500">
              You haven't listed any rooms yet.
            </p>
          ) : (
            <div className="space-y-4">

              {rooms.slice(0, 5).map((room) => (
                <div
                  key={room._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
                >
                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {room.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {room.location}
                    </p>

                  </div>

                  <Link
                    href={`/owner/edit-room/${room._id}`}
                    className="rounded-lg bg-sky-600 px-4 py-2 text-sm text-white transition hover:bg-sky-700"
                  >
                    Edit
                  </Link>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}