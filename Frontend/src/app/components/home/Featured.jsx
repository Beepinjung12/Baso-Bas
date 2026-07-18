"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import budgetRoom from "../../assets/budget.jpg";
import cozyRoom from "../../assets/cozy.avif";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/app/config";
import modernRoom from "../../assets/Modern.avif";
import sharedRoom from "../../assets/shared.avif";

import { RiMapPinLine, RiStarFill, RiHeartLine, RiChatSmile3Fill } from "react-icons/ri";
import { MdOutlineTravelExplore } from "react-icons/md";
import { RiShieldKeyholeFill, RiCalendarCheckFill, RiNotification3Fill, RiSettings4Fill, RiSearchEyeFill } from "react-icons/ri";

const rooms = [
  { image: modernRoom, badge: "Featured", title: "Modern studio near metro",    location: "Thamel, Kathmandu",   price: "$320", rating: "4.9" },
  { image: cozyRoom,   badge: "Popular",  title: "Cozy single room, city view", location: "Lazimpat, Kathmandu", price: "$210", rating: "4.7" },
  { image: sharedRoom, badge: "New",      title: "Spacious shared apartment",   location: "Patan, Lalitpur",     price: "$180", rating: "4.8" },
  { image: budgetRoom, badge: "Verified", title: "Budget room, near college",   location: "Kirtipur, Kathmandu", price: "$95",  rating: "4.5" },
];

const features = [
  { icon: <RiSearchEyeFill />,      title: "Smart search",   desc: "Filter by price, location, amenities, and more" },
  { icon: <RiShieldKeyholeFill />,  title: "JWT Auth",       desc: "Secure login and registration for all users" },
  { icon: <RiCalendarCheckFill />,  title: "Booking system", desc: "Instant booking with calendar management" },
  { icon: <RiNotification3Fill />,  title: "Notifications",  desc: "Real-time alerts via Socket.io" },
  { icon: <RiSettings4Fill />,      title: "Admin panel",    desc: "Full room, booking, and user management" },
];

const steps = [
  { n: "1", title: "Create account", desc: "Sign up and verify your identity securely" },
  { n: "2", title: "Search rooms",   desc: "Browse and filter thousands of listings" },
  { n: "3", title: "Chat & book",    desc: "Message the owner and confirm booking" },
  { n: "4", title: "Move in",        desc: "Enjoy your new room with peace of mind" },
];

    const Featured = () => {
      const router = useRouter();
      const [featuredRooms, setFeaturedRooms] = useState([]);
      useEffect(() => {
      const loadFeaturedRooms = async () => {
        try {
          const res = await axios.get(
            `${config.apiUrl}/api/rooms/featured`
          );
          console.log("FEATURED ROOMS:", res.data.data);
          setFeaturedRooms(res.data.data);
        } catch (err) {
          console.log(err);
        }
      };

      loadFeaturedRooms();
    }, []);

    const displayRooms = [
  ...featuredRooms,
  ...rooms.slice(Math.max(0, 4 - featuredRooms.length)),
];
console.log("DISPLAY ROOMS:", displayRooms);
  return (
    <div>
      {/* ===== FEATURED LISTINGS ===== */}
      <section className="px-8 py-14 max-md:px-4">
        {/* Header */}
        <div className="mb-7 flex items-baseline justify-between">
          <h2
            className="text-[26px] font-semibold text-sky-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured listings
          </h2>
          <a href="#" className="text-[13px] font-medium text-sky-500 no-underline hover:underline">
            View all →
          </a>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button className="rounded-full border border-sky-500 bg-sky-500 px-4 py-1.5 text-[13px] font-medium text-white">
            All rooms
          </button>
          {["Studio", "Single bed", "Shared", "Near university"].map((f) => (
            <button
              key={f}
              className="rounded-full border border-sky-300 bg-white px-4 py-1.5 text-[13px] text-sky-700 transition hover:bg-sky-50"
            >
              {f}
            </button>
          ))}
        </div>

        {/* Room grid */}
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {displayRooms.map((room, index) => (
            <div
                key={room._id || index}
                onClick={() => {
                  if (room._id) {
                    router.push(`/rooms/${room._id}`);
                  }
                }}
                className={`overflow-hidden rounded-2xl border border-sky-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  room._id ? "cursor-pointer" : ""
                }`}
              >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={room.image || modernRoom}
                  alt={room.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-sky-700">
                  {room.featured ? "Featured" : room.badge}
                </span>
                <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 hover:text-red-400 transition">
                  <RiHeartLine size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="mb-1 text-[15px] font-medium text-sky-900">{room.title}</h3>
                <div className="mb-3 flex items-center gap-1 text-[12px] text-slate-500">
                  <RiMapPinLine size={13} />
                  {room.location}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[16px] font-medium text-sky-600">
                    {room.rent ? `$${room.rent}` : room.price}
                    <span className="text-[11px] font-light text-slate-500"> /mo</span>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] text-slate-500">
                    <RiStarFill size={13} className="text-yellow-400" />
                    {room.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CHAT CTA ===== */}
      <div className="mx-8 mb-9 flex items-center gap-4 rounded-[14px] border border-sky-200 bg-sky-50 px-[22px] py-5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sky-200 text-sky-600 text-[22px]">
          <RiChatSmile3Fill size={24} />
        </div>
        <div>
          <h3 className="mb-[3px] text-[15px] font-medium text-sky-800">
            Chat with room owners directly
          </h3>
          <p className="text-[13px] font-light text-gray-500">
            Ask questions, negotiate, and confirm your stay in real time via our built-in chat system
          </p>
        </div>
        <button className="ml-auto flex-shrink-0 whitespace-nowrap rounded-[20px] bg-sky-500 px-[18px] py-[9px] text-[13px] font-medium text-white transition hover:bg-sky-600">
          Start chatting
        </button>
      </div>

      {/* ===== EVERYTHING YOU NEED ===== */}
      <section className="px-8 py-[52px]" style={{ backgroundColor: "#0369a1" }}>
        <h2
          className="mb-[6px] text-center text-[26px] font-semibold text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Everything you need
        </h2>
        <p className="mb-8 text-center text-[14px] font-light text-white/55">
          Powered by a modern MERN stack with real-time features
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[14px]">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-[14px] border border-white/10 bg-white/10 px-4 py-5 text-center transition hover:bg-white/15"
            >
              <div className="mx-auto mb-3 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-sky-600/30 text-white text-[22px]">
                {f.icon}
              </div>
              <div className="mb-1 text-[14px] font-medium text-white">{f.title}</div>
              <div className="text-[12px] font-light leading-[1.5] text-white/50">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-white px-8 py-[52px]">
        <h2
          className="mb-9 text-center text-[26px] font-semibold text-sky-800"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          How it works
        </h2>

        <div className="mx-auto flex max-w-[640px] items-start">
          {steps.map((step, i, arr) => (
            <div key={step.n} className="relative flex-1 px-[10px] text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-sky-300 bg-sky-100 text-[16px] font-medium text-sky-600">
                {step.n}
              </div>
              <div className="mb-1 text-[14px] font-medium text-sky-800">{step.title}</div>
              <div className="text-[12px] font-light leading-[1.5] text-gray-500">{step.desc}</div>
              {i < arr.length - 1 && (
                <div className="absolute right-[-10px] top-5 h-[1px] w-[20px] bg-sky-200" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Featured;
