"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import config from "@/app/config";

export default function OwnerRoomCard({ room, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const image =
    room.images?.[0]?.url ||
    room.image ||
    "/default-room.jpg";

  function getImageUrl(image) {
    if (!image) {
      return "/default-room.jpg";
    }

    // Cloudinary URL
    if (image.startsWith("http")) {
      return image;
    }

    // Old local images fallback
    return `${config.apiUrl}${image}`;
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await axios.delete(
        `${config.apiUrl}/api/rooms/${room._id}`,
        {
          withCredentials: true,
        }
      );

      onDelete(room._id);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
        "Delete failed"
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-lg">
      {/* Image */}
      <div className="h-56 overflow-hidden">
        <img
          src={getImageUrl(image)}
          alt={room.title || "Room"}
          onError={(e) => {
            e.currentTarget.src = "/default-room.jpg";
          }}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-800">
          {room.title}
        </h2>

        <p className="mt-2 text-slate-500">
          📍 {room.location}
        </p>

        <p className="mt-3 font-semibold text-sky-600">
          Rs. {room.rent}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/owner/room-details/${room._id}`}
            className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-white"
          >
            👁 View Details
          </Link>

          <Link
            href={`/owner/edit-room/${room._id}`}
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm text-white"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}