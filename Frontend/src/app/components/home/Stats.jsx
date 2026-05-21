import React from "react";
import Link from "next/link";



const Stats = () => {
  return (
<section className="flex flex-wrap justify-center bg-sky700">
  
  <div className="flex-1 border-r border-white/10 px-3 py-5 text-center max-md:basis-1/2">
    <span className="block font-playfair text-[24px] font-semibold text-sky200">
      12k+
    </span>
    <span className="mt-1 block text-[11px] uppercase tracking-[0.8px] text-white/60">
      Listings
    </span>
  </div>

  <div className="flex-1 border-r border-white/10 px-3 py-5 text-center max-md:basis-1/2">
    <span className="flex items-center justify-center gap-1 font-playfair text-[24px] font-semibold text-sky200">
      4.8
      <i className="ri-star-fill text-[18px] text-yellow-400" />
    </span>
    <span className="mt-1 block text-[11px] uppercase tracking-[0.8px] text-white/60">
      Avg rating
    </span>
  </div>
  
  <div className="flex-1 border-r border-white/10 px-3 py-5 text-center max-md:basis-1/2">
    <span className="block font-playfair text-[24px] font-semibold text-sky200">
      98%
    </span>
    <span className="mt-1 block text-[11px] uppercase tracking-[0.8px] text-white/60">
      Verified owners
    </span>
  </div>
  
  <div className="flex-1 px-3 py-5 text-center max-md:basis-1/2">
    <span className="block font-playfair text-[24px] font-semibold text-sky200">
      24/7
    </span>
    <span className="mt-1 block text-[11px] uppercase tracking-[0.8px] text-white/60">
      Support
    </span>
  </div>
</section>
    
  )
}

export default Stats
