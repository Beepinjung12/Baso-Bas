import React from "react";
import Link from "next/link";
import Logo from "./Logo";

const Header = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <nav
        className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-sky-100 bg-white/90 px-8 backdrop-blur-md"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* LOGO */}
        <Logo />

        {/* LINKS */}
        <ul className="flex list-none gap-8">
          <li>
            <Link
              href="#"
              className="text-[14px] text-slate-500 no-underline transition hover:text-sky-600"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-[14px] text-slate-500 no-underline transition hover:text-sky-600"
            >
              List Room
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="text-[14px] text-slate-500 no-underline transition hover:text-sky-600"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-[14px] text-slate-500 no-underline transition hover:text-sky-600"
            >
              About
            </Link>
          </li>
        </ul>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="rounded-full border border-sky-300 px-4 py-[7px] text-[13px] font-medium text-sky-700 no-underline transition hover:bg-sky-50"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-full bg-sky-500 px-5 py-[7px] text-[13px] font-medium text-white no-underline transition hover:bg-sky-600"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
