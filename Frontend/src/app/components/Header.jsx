import React from "react";
import Link from "next/link";
import Logo from "./Logo";
const Header = () => {
  return (
    /* ================= NAVBAR ================= */

    <nav className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-sky-200 bg-white/90 px-8 backdrop-blur-md max-md:h-auto max-md:flex-wrap max-md:px-4 max-md:py-3">
       
       <Logo />
      
      {/* LINKS */}
      <ul className="flex list-none gap-8 max-md:mt-3 max-md:w-full max-md:justify-center max-md:gap-4">
        <li>
          <Link
            href="#"
            className="text-[14px] text-slate-500 transition hover:text-sky-600"
          >
            Explore
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="text-[14px] text-slate-500 transition hover:text-sky-600"
          >
            List Room
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="text-[14px] text-slate-500 transition hover:text-sky-600"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="text-[14px] text-slate-500 transition hover:text-sky-600"
          >
            About
          </Link>
        </li>
      </ul>
      {/* ACTIONS */}
      <div className="flex items-center gap-3 max-md:mt-3 max-md:w-full max-md:justify-center">
        <Link
          href="/auth/login"
          className="rounded-full border border-sky-300 px-4 py-[7px] text-[13px] font-medium text-sky-700 transition hover:bg-sky-100"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-sky-500 px-5 py-[7px] text-[13px] font-medium text-white transition hover:bg-sky-600"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Header
