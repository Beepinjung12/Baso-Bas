import React from "react";
import Image from "next/image";
import budgetRoom from "../../assets/budget.jpg";
import cozyRoom from "../../assets/cozy.avif";
import modernRoom from "../../assets/Modern.avif";
import sharedRoom from "../../assets/shared.avif";
const Featured = () => {
  return (
    <div>
      {/* ================= FEATURED ================= */}
      <section className="px-8 py-14 max-md:px-4">
        {/* HEADER */}
        <div className="mb-7 flex items-baseline justify-between">
          <h2 className="font-playfair text-[26px] font-semibold text-sky800">
            Featured listings
          </h2>
          <a href="#" className="text-[13px] font-medium text-sky500">
            {" "}
            View all →{" "}
          </a>
        </div>
        {/* FILTERS */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button className="rounded-full border border-sky500 bg-sky500 px-4 py-1.5 text-[13px] font-medium text-white">
            All rooms
          </button>
          <button className="rounded-full border border-sky300 bg-white px-4 py-1.5 text-[13px] text-sky700 transition hover:bg-sky100">
            Studio
          </button>
          <button className="rounded-full border border-sky300 bg-white px-4 py-1.5 text-[13px] text-sky700 transition hover:bg-sky100">
            Single bed
          </button>
          <button className="rounded-full border border-sky300 bg-white px-4 py-1.5 text-[13px] text-sky700 transition hover:bg-sky100">
            Shared
          </button>
        </div>
        {/* ROOM GRID */}
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {/* CARD */}
          <div className="overflow-hidden rounded-2xl border border-sky200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* IMAGE */}
            <div className="relative h-[220px] overflow-hidden">
              <Image
  src={modernRoom}
  alt=""
  className="h-full w-full object-cover"
/>
              {/* Badge */}
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-sky700">
                Featured
              </span>
              {/* Favorite */}
              <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[15px] text-slate-600">
                <i className="ri-heart-line" />
              </button>
            </div>
            {/* BODY */}
            <div className="p-4">
              <h3 className="mb-1 text-[15px] font-medium text-sky900">
                Modern studio near metro
              </h3>
              {/* LOCATION */}
              <div className="mb-3 flex items-center gap-1 text-[12px] text-slate-500">
                <i className="ri-map-pin-line" />
                Thamel, Kathmandu
              </div>
              {/* FOOTER */}
              <div className="flex items-center justify-between">
                <div className="text-[16px] font-medium text-sky600">
                  $320
                  <span className="text-[11px] font-light text-slate-500">
                    /month
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[12px] text-slate-500">
                  <i className="ri-star-fill text-yellow-400" />
                  4.9
                </div>
              </div>
            </div>
          </div>
          {/* CARD */}
          <div className="overflow-hidden rounded-2xl border border-sky200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-[220px] overflow-hidden">
              <Image
                src={cozyRoom}
                alt=""
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-sky700">
                Popular
              </span>
              <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[15px] text-slate-600">
                <i className="ri-heart-line" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-[15px] font-medium text-sky900">
                Cozy single room
              </h3>
              <div className="mb-3 flex items-center gap-1 text-[12px] text-slate-500">
                <i className="ri-map-pin-line" />
                Lazimpat, Kathmandu
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[16px] font-medium text-sky600">
                  $210
                  <span className="text-[11px] font-light text-slate-500">
                    /month
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[12px] text-slate-500">
                  <i className="ri-star-fill text-yellow-400" />
                  4.7
                </div>
              </div>
            </div>
          </div>
          {/* CARD */}
          <div className="overflow-hidden rounded-2xl border border-sky200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-[220px] overflow-hidden">
              <Image
                src={sharedRoom}
                alt=""
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-sky700">
                New
              </span>
              <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[15px] text-slate-600">
                <i className="ri-heart-line" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-[15px] font-medium text-sky900">
                Shared apartment
              </h3>
              <div className="mb-3 flex items-center gap-1 text-[12px] text-slate-500">
                <i className="ri-map-pin-line" />
                Patan, Lalitpur
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[16px] font-medium text-sky600">
                  $180
                  <span className="text-[11px] font-light text-slate-500">
                    /month
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[12px] text-slate-500">
                  <i className="ri-star-fill text-yellow-400" />
                  4.8
                </div>
              </div>
            </div>
          </div>
          {/* CARD */}
          <div className="overflow-hidden rounded-2xl border border-sky200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-[220px] overflow-hidden">
              <Image
                src={budgetRoom}
                alt=""
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-sky700">
                Verified
              </span>
              <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[15px] text-slate-600">
                <i className="ri-heart-line" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-[15px] font-medium text-sky900">
                Budget room near college
              </h3>
              <div className="mb-3 flex items-center gap-1 text-[12px] text-slate-500">
                <i className="ri-map-pin-line" />
                Kirtipur, Kathmandu
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[16px] font-medium text-sky600">
                  $95
                  <span className="text-[11px] font-light text-slate-500">
                    /month
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[12px] text-slate-500">
                  <i className="ri-star-fill text-yellow-400" />
                  4.5
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CHAT CTA */}
      <div className="mx-8 mb-9 flex items-center gap-4 rounded-[14px] border border-sky-200 bg-sky-100 px-[22px] py-5">
        {/* ICON */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sky-200 text-[22px]">
          <i className="ri-chat-3-fill" />
        </div>
        {/* TEXT */}
        <div>
          <h3 className="mb-[3px] text-[15px] font-medium text-sky-800">
            Chat with room owners directly
          </h3>
          <p className="text-[13px] font-light text-gray-500">
            Ask questions, negotiate, and confirm your stay in real time
          </p>
        </div>
        {/* BUTTON */}
        <button className="ml-auto flex-shrink-0 whitespace-nowrap rounded-[20px] bg-sky-500 px-[18px] py-[9px] font-['DM_Sans'] text-[13px] font-medium text-white">
          Start chatting
        </button>
      </div>
      {/* ================= FEATURES ================= */}
      <section className="bg-sky700 px-8 py-[52px]">
        {/* TITLE */}
        <h2 className="mb-[6px] text-center font-playfair text-[26px] font-semibold text-sky100">
          Everything you need
        </h2>
        {/* SUBTITLE */}
        <p className="mb-8 text-center text-[14px] font-light text-white/55">
          Powered by a modern MERN stack with real-time features
        </p>
        {/* GRID */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[14px]">
          {/* CARD 1 */}
          <div className="rounded-[14px] border border-white/10 bg-white/10 px-4 py-5 text-center hover:bg-white/15 transition">
            <div className="mx-auto mb-3 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-sky600/30">
              <i className="ri-search-eye-fill text-[20px] text-sky100" />
            </div>
            <div className="mb-1 text-[14px] font-medium text-sky100">
              Smart search
            </div>
            <div className="text-[12px] font-light leading-[1.5] text-white/50">
              Filter by price, location, amenities, and more
            </div>
          </div>
          {/* CARD 2 */}
          <div className="rounded-[14px] border border-white/10 bg-white/10 px-4 py-5 text-center hover:bg-white/15 transition">
            <div className="mx-auto mb-3 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-sky600/30">
              <i className="ri-shield-keyhole-fill text-[20px] text-sky100" />
            </div>
            <div className="mb-1 text-[14px] font-medium text-sky100">
              JWT Auth
            </div>
            <div className="text-[12px] font-light leading-[1.5] text-white/50">
              Secure login and registration for all users
            </div>
          </div>
          {/* CARD 3 */}
          <div className="rounded-[14px] border border-white/10 bg-white/10 px-4 py-5 text-center hover:bg-white/15 transition">
            <div className="mx-auto mb-3 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-sky600/30">
              <i className="ri-calendar-check-fill text-[20px] text-sky100" />
            </div>
            <div className="mb-1 text-[14px] font-medium text-sky100">
              Booking system
            </div>
            <div className="text-[12px] font-light leading-[1.5] text-white/50">
              Instant booking with calendar management
            </div>
          </div>
          {/* CARD 4 */}
          <div className="rounded-[14px] border border-white/10 bg-white/10 px-4 py-5 text-center hover:bg-white/15 transition">
            <div className="mx-auto mb-3 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-sky600/30">
              <i className="ri-notification-badge-fill text-[20px] text-sky100" />
            </div>
            <div className="mb-1 text-[14px] font-medium text-sky100">
              Notifications
            </div>
            <div className="text-[12px] font-light leading-[1.5] text-white/50">
              Real-time alerts via Socket.io
            </div>
          </div>
          {/* CARD 5 */}
          <div className="rounded-[14px] border border-white/10 bg-white/10 px-4 py-5 text-center hover:bg-white/15 transition">
            <div className="mx-auto mb-3 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-sky600/30">
              <i className="ri-settings-4-fill text-[20px] text-sky100" />
            </div>
            <div className="mb-1 text-[14px] font-medium text-sky100">
              Admin panel
            </div>
            <div className="text-[12px] font-light leading-[1.5] text-white/50">
              Full room, booking, and user management
            </div>
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="bg-white px-8 py-[52px]">
        {/* TITLE */}
        <h2 className="mb-9 text-center font-playfair text-[26px] font-semibold text-sky800">
          How it works
        </h2>
        {/* STEPS WRAPPER */}
        <div className="mx-auto flex max-w-[640px] items-start gap-0">
          {/* STEP 1 */}
          <div className="relative flex-1 px-[10px] text-center">
            {/* NUMBER */}
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-sky300 bg-sky100 text-[16px] font-medium text-sky600">
              1
            </div>
            {/* TITLE */}
            <div className="mb-1 text-[14px] font-medium text-sky800">
              Create account
            </div>
            {/* DESC */}
            <div className="text-[12px] font-light leading-[1.5] text-gray-500">
              Sign up and verify your identity securely
            </div>
            {/* LINE */}
            <div className="absolute right-[-10px] top-5 h-[1px] w-[20px] bg-sky200" />
          </div>
          {/* STEP 2 */}
          <div className="relative flex-1 px-[10px] text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-sky300 bg-sky100 text-[16px] font-medium text-sky600">
              2
            </div>
            <div className="mb-1 text-[14px] font-medium text-sky800">
              Search rooms
            </div>
            <div className="text-[12px] font-light leading-[1.5] text-gray-500">
              Browse and filter thousands of listings
            </div>
            <div className="absolute right-[-10px] top-5 h-[1px] w-[20px] bg-sky200" />
          </div>
          {/* STEP 3 */}
          <div className="relative flex-1 px-[10px] text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-sky300 bg-sky100 text-[16px] font-medium text-sky600">
              3
            </div>
            <div className="mb-1 text-[14px] font-medium text-sky800">
              Chat &amp; book
            </div>
            <div className="text-[12px] font-light leading-[1.5] text-gray-500">
              Message the owner and confirm booking
            </div>
            <div className="absolute right-[-10px] top-5 h-[1px] w-[20px] bg-sky200" />
          </div>
          {/* STEP 4 */}
          <div className="flex-1 px-[10px] text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-sky300 bg-sky100 text-[16px] font-medium text-sky600">
              4
            </div>
            <div className="mb-1 text-[14px] font-medium text-sky800">
              Move in
            </div>
            <div className="text-[12px] font-light leading-[1.5] text-gray-500">
              Enjoy your new room with peace of mind
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Featured;
