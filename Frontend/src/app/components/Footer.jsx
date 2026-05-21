import React from "react";
import Link from "next/link";
import Logo from "./Logo";


const Footer = () => {
  return (

<footer className="bg-sky-900 px-8 py-12 text-white/70">
  {/* TOP */}
  <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-0">
    {/* BRAND */}
    <div className="max-w-sm">
      <Logo />
      <p className="text-[13px] font-light text-white/60 leading-[1.6]">
        Room rental made simple. Find, book, and move in — all in one place.
      </p>
    </div>
    {/* COLUMN 1 */}
    <div className="flex flex-col gap-2 text-[13px]">
      <h4 className="mb-2 text-[14px] font-semibold text-white/60">Explore</h4>
      <Link href="#" className="text-white/70 hover:text-sky-100 transition">Search rooms</Link>
      <Link href="#" className="text-white/70 hover:text-sky-100 transition">View listings</Link>
      <Link href="#" className="text-white/70 hover:text-sky-100 transition">Map view</Link>
    </div>
    {/* COLUMN 2 */}
    <div className="flex flex-col gap-2 text-[13px]">
      <h4 className="mb-2 text-[14px] font-semibold text-white/60">Platform</h4>
      <Link href="#" className="text-white/70 hover:text-sky-100 transition">List your room</Link>
      <Link href="#" className="text-white/70 hover:text-sky-100 transition">Admin dashboard</Link>
      <Link href="#" className="text-white/70 hover:text-sky-100 transition">Pricing</Link>
    </div>
    {/* COLUMN 3 */}
    <div className="flex flex-col gap-2 text-[13px]">
      <h4 className="mb-2 text-[14px] font-semibold text-white/60">Company</h4>
      <Link href="#" className="text-white/70 hover:text-sky-100 transition">About</Link>
      <Link href="#" className="text-white/70 hover:text-sky-100 transition">Contact</Link>
      <Link href="#" className="text-white/70 hover:text-sky-100 transition">Privacy policy</Link>
    </div>
  </div>
  {/* BOTTOM */}
  <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center md:flex-row md:justify-between md:text-left">
    <p className="text-[12px] text-white/60">
      © 2026 BASOBAS. All rights reserved.
    </p>
    <div className="flex gap-2 flex-wrap justify-center md:justify-end">
      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/70">
        MERN Stack
      </span>
      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/70">
        Socket.io
      </span>
      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/70">
        MongoDB
      </span>
    </div>
  </div>
</footer>


);
};

export default Footer;
