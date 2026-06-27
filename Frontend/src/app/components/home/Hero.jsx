import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-8 py-[70px] pb-20 text-center max-md:px-4 max-md:py-12"
      style={{ background: "linear-gradient(135deg, #0284c7, #38bdf8, #bae6fd)" }}>

      {/* BG circles */}
      <div className="absolute -right-20 -top-16 h-[340px] w-[340px] rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -left-16 h-[260px] w-[260px] rounded-full bg-white/10" />

      {/* Badge */}
      <div className="relative z-10 mb-5 inline-block rounded-full border border-white/30 bg-white/20 px-4 py-1 text-[12px] font-medium uppercase tracking-[0.5px] text-white">
        Room Rental &amp; Booking
      </div>

      {/* Headline */}
      <h1
        className="relative z-10 mb-4 text-[44px] font-semibold leading-tight text-white max-lg:text-[34px] max-md:text-[28px]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Find your perfect <br />
        room, effortlessly
      </h1>

      {/* Subtext */}
      <p className="relative z-10 mb-9 text-[16px] font-light text-white/85 max-md:text-[14px]">
        Search thousands of verified rooms — for students, travelers, and professionals
      </p>

      {/* Search bar */}
      <div className="relative z-10 mx-auto flex max-w-[620px] items-center gap-2 rounded-full bg-white px-5 py-[6px] shadow-[0_4px_24px_rgba(3,105,161,0.18)]">
        <svg className="h-4 w-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by location or room type..."
          className="flex-1 bg-transparent text-[14px] outline-none text-slate-700 placeholder-slate-400"
        />
        <select className="cursor-pointer border-l border-sky-200 bg-transparent pl-3 pr-1 text-[13px] text-slate-500 outline-none">
          <option>Any price</option>
          <option>Under $500</option>
          <option>$500 – $1000</option>
          <option>$1000+</option>
        </select>
        <button className="whitespace-nowrap rounded-full bg-sky-500 px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-sky-600">
          Search rooms
        </button>
      </div>
    </section>
  );
};

export default Hero;
