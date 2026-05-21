import React from "react";
import Link from "next/link";



const Hero = () => {
  return (
    
<section className="relative overflow-hidden bg-gradient-to-br from-sky600 via-sky400 to-sky200 px-8 py-[70px] pb-20 text-center max-md:px-4 max-md:py-12">
  
  <div className="absolute -right-20 -top-16 h-[340px] w-[340px] rounded-full bg-white/10" />
  <div className="absolute -bottom-20 -left-16 h-[260px] w-[260px] rounded-full bg-white/10" />
  
  <div className="relative z-10 mb-5 inline-block rounded-full border border-white/30 bg-white/20 px-4 py-1 text-[12px] font-medium uppercase tracking-[0.5px] text-white">
    Room Rental &amp; Booking
  </div>
  
  <h1 className="relative z-10 mb-4 font-playfair text-[44px] font-semibold leading-tight text-white max-lg:text-[34px] max-md:text-[28px] max-sm:text-[24px]">
    Find your perfect <br />
    room, effortlessly
  </h1>
  
  <p className="relative z-10 mb-9 text-[16px] font-light text-white/85 max-md:text-[14px]">
    Search thousands of verified rooms — for students, travelers, and
    professionals
  </p>
  
  <div className="relative z-10 mx-auto flex max-w-[620px] items-center gap-2 rounded-full bg-white px-5 py-[6px] shadow-[0_4px_24px_rgba(3,105,161,0.18)] max-md:flex-col max-md:rounded-2xl max-md:p-3">
  
    <i className="ri-search-line text-slate-400" />
    <input type="text" placeholder="Search by location or room type..." className="flex-1 bg-transparent text-[14px] outline-none" />
    <select className="cursor-pointer border-l border-sky200 bg-transparent px-3 text-[13px] text-slate-500 outline-none max-md:w-full max-md:border-l-0 max-md:border-t max-md:pt-2">
      <option>Any price</option>
      <option>Under $500</option>
      <option>$500 – $1000</option>
      <option>$1000+</option>
    </select>
    <button className="whitespace-nowrap rounded-full bg-sky500 px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-sky600 max-md:w-full">
      Search rooms
    </button>
  </div>
</section>

  )
}

export default Hero