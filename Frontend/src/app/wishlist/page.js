"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getMyWishlist,
  removeFromWishlist,
} from "@/app/api/wishlist";

import config from "@/app/config";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      const res = await getMyWishlist();
      setWishlist(res.data.data || []);
    } catch (error) {
      console.log("WISHLIST FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeRoom(roomId) {
    try {
      await removeFromWishlist(roomId);

      setWishlist((prev) =>
        prev.filter(
          item => item.room?._id !== roomId
        )
      );
    } catch (error) {
      console.log("REMOVE WISHLIST ERROR:", error);
    }
  }

  function imageURL(image) {
    if (!image) {
      return "/default-room.jpg";
    }

    if (
      image.startsWith("http") ||
      image.startsWith("blob:")
    ) {
      return image;
    }

    if (image === "/default-room.jpg") {
      return image;
    }

    return `${config.apiUrl}${image}`;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-3xl bg-white px-10 py-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600"></div>
            <p className="text-slate-600">
              Loading wishlist...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10 md:px-10">
      {/* Header */}
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
          Saved Properties
        </p>

        <h1 className="mt-3 font-playfair text-5xl font-bold text-slate-800">
          My Wishlist ❤️
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          Your favorite rooms saved for future booking.
        </p>
      </section>

      {wishlist.length === 0 ? (
        <div className="mx-auto mt-10 max-w-xl rounded-3xl bg-white p-12 text-center shadow-xl">
          <div className="text-7xl">🏠</div>

          <h2 className="mt-5 text-3xl font-bold text-slate-800">
            No saved rooms yet
          </h2>

          <p className="mt-3 text-slate-500">
            Explore available rooms and save the ones you like.
          </p>

          <Link
            href="/explore"
            className="mt-8 inline-block rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Explore Rooms
          </Link>
        </div>
      ) : (
        <div className="mx-auto mt-10 grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => {
            const room = item.room;

            if (!room) return null;

            return (
              <div
                key={item._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={imageURL(
                      room.image ||
                      room.images?.[0]
                    )}
                    alt={room.title}
                    className="h-64 w-full object-cover"
                  />

                  <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-red-500 shadow">
                    ❤️ Saved
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {room.title}
                  </h2>

                  <p className="mt-2 text-slate-500">
                    📍 {room.location}
                  </p>

                  <p className="mt-3 text-xl font-bold text-sky-600">
                    Rs. {room.rent}
                    <span className="text-sm text-slate-500">
                      {" "} / {room.rentType}
                    </span>
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.tenancy && (
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-sm text-sky-700">
                        👥 {room.tenancy}
                      </span>
                    )}

                    {room.roomSize && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                        📐 {room.roomSize}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/rooms/${room._id}`}
                      className="flex-1 rounded-xl bg-sky-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-sky-700"
                    >
                      View Room
                    </Link>

                    <button
                      onClick={() =>
                        removeRoom(room._id)
                      }
                      className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}