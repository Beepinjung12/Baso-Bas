"use client";

import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaHome,
  FaRulerCombined,
  FaHeart,
} from "react-icons/fa";

export default function RoomCard({ room }) {
  if (!room) return null;

  const image =
    room.img ||
    room.images?.[0]?.url ||
    room.image ||
    "/default-room.jpg";

  return (
    <article
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        flex
        flex-col
      "
    >
      {/* IMAGE */}
      <div className="relative h-60 overflow-hidden">

        <img
          src={image}
          alt={room.title || "Room"}
          loading="lazy"
          className="
            w-full
            h-full
            object-cover
            hover:scale-105
            transition
            duration-500
          "
          onError={(e) => {
            e.currentTarget.src = "/default-room.jpg";
          }}
        />

        <button
          type="button"
          className="
            absolute
            top-4
            right-4
            bg-white
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
            shadow
          "
        >
          <FaHeart className="text-red-500" />
        </button>

      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1">

        <h2 className="text-2xl font-bold text-slate-900 line-clamp-1">
          {room.title || "Room Available"}
        </h2>

        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <FaMapMarkerAlt />
          <span>
            {room.location || "Location unavailable"}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">

          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3">
            <FaMoneyBillWave className="text-sky-500 text-xl" />
            <span className="text-xs text-gray-500 mt-2">
              Rent
            </span>
            <strong>
              Rs. {room.rent || 0}
            </strong>
          </div>

          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3">
            <FaHome className="text-sky-500 text-xl" />
            <span className="text-xs text-gray-500 mt-2">
              Rooms
            </span>
            <strong>
              {room.numberOfRooms || 1}
            </strong>
          </div>

          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3">
            <FaRulerCombined className="text-sky-500 text-xl" />
            <span className="text-xs text-gray-500 mt-2">
              Size
            </span>
            <strong>
              {room.roomSize || "N/A"}
            </strong>
          </div>

        </div>

        <p className="text-gray-600 mt-6 line-clamp-3">
          {room.description || "No description available."}
        </p>


        <div className="flex justify-between items-center mt-auto pt-8">

          <div>
            <p className="text-sm text-gray-500">
              Rent Type
            </p>

            <p className="font-semibold text-sky-600">
              {room.rentType || "Monthly"}
            </p>
          </div>


          <Link
            href={`/rooms/${room._id || room.id}`}
            className="
              bg-sky-600
              hover:bg-sky-700
              transition
              text-white
              px-6
              py-3
              rounded-full
              font-semibold
            "
          >
            View Details
          </Link>

        </div>

      </div>

    </article>
  );
}