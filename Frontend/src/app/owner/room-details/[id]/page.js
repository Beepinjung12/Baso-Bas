"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import config from "@/app/config";

export default function OwnerRoomDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `${config.apiUrl}/api/rooms/${id}`,
          {
            withCredentials: true,
          }
        );

        setRoom(res.data.data);
      } catch (error) {
        console.log("FETCH ROOM ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-3xl bg-white px-10 py-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600"></div>
            <p className="text-slate-600">
              Loading room details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-3xl bg-white p-10 shadow-xl text-center">
          <h2 className="text-3xl font-bold text-red-500">
            Room Not Found
          </h2>

          <button
            onClick={() => router.back()}
            className="mt-6 rounded-xl bg-sky-600 px-6 py-3 text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images =
    room.images && room.images.length > 0
      ? room.images
      : ["/default-room.jpg"];

  const imageURL = (img) => {
    if (img.startsWith("http")) return img;

    if (img.startsWith("/")) {
      return `${config.apiUrl}${img}`;
    }

    return `${config.apiUrl}/${img}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 px-5 py-10 md:px-10">
      {/* HEADER */}
      <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
            My Property
          </p>

          <h1 className="mt-2 font-playfair text-5xl font-bold text-slate-800">
            Room Details
          </h1>

          <p className="mt-3 text-slate-500">
            Complete information about your listed property.
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 shadow hover:bg-slate-50"
        >
          ← Back
        </button>
      </div>

      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* IMAGE SECTION */}
        <div className="grid gap-5 p-6 lg:grid-cols-4">
          {/* MAIN IMAGE */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={imageURL(images[activeImage])}
                alt={room.title}
                className="h-[500px] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* THUMBNAILS */}
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`overflow-hidden rounded-2xl border-4 ${
                  activeImage === index
                    ? "border-sky-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={imageURL(img)}
                  alt="room"
                  className="h-28 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* TITLE AREA */}
        <div className="border-t p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-4xl font-bold text-slate-800">
                {room.title}
              </h2>

              <p className="mt-3 text-lg text-slate-500">
                📍 {room.location}
              </p>
            </div>

            <div className="rounded-2xl bg-sky-50 px-8 py-5 text-center">
              <p className="text-sm text-slate-500">
                Monthly Rent
              </p>

              <p className="mt-2 text-3xl font-bold text-sky-600">
                Rs. {room.rent}
              </p>
            </div>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="grid gap-6 border-t p-8 md:grid-cols-3">
          <InfoCard
            title="Room Size"
            value={room.roomSize || "Not specified"}
            icon="📐"
          />

          <InfoCard
            title="Rooms"
            value={`${room.numberOfRooms || 1} Rooms`}
            icon="🚪"
          />

          <InfoCard
            title="Tenancy"
            value={room.tenancy || "Anyone"}
            icon="👥"
          />

          <InfoCard
            title="Parking"
            value={room.parking ? "Available" : "Not Available"}
            icon="🚗"
          />

          <InfoCard
            title="Rent Type"
            value={room.rentType || "Monthly"}
            icon="💰"
          />

          <InfoCard
            title="Facilities"
            value={
              room.facilities?.length
                ? room.facilities.join(", ")
                : "None"
            }
            icon="✨"
          />
        </div>

        {/* CONTACT */}
        <div className="grid gap-6 border-t p-8 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-cyan-400 p-8 text-white">
            <h3 className="text-2xl font-bold">
              Contact Information
            </h3>

            <p className="mt-5">
              📞 {room.contact}
            </p>

            <p className="mt-3">
              WhatsApp: {room.whatsapp || "Not provided"}
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-8">
            <h3 className="text-2xl font-bold text-slate-800">
              Description
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              {room.description || "No description provided"}
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4 border-t p-8">
          <button
            onClick={() =>
              router.push(`/owner/edit-room/${room._id}`)
            }
            className="rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white shadow hover:bg-sky-700"
          >
            ✏ Edit Room
          </button>

          <button
            onClick={() =>
              router.push("/owner/list-rooms")
            }
            className="rounded-xl border border-slate-300 px-8 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            🏠 My Rooms
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-2xl">
          {icon}
        </div>

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}