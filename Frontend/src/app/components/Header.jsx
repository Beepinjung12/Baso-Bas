"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import WishlistCount from "@/app/components/WishlistCount";
import { logout as logoutApi } from "../api/auth";

import { HiMenuAlt3, HiX } from "react-icons/hi";

const Header = () => {
  const router = useRouter();
  const { user, logout, isLoggedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.log("Backend logout failed");
    } finally {
      logout();
      router.push("/");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 relative flex h-16 items-center justify-between border-b border-sky-100 bg-white/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md">

        <Logo />

        {/* NAV LINKS */}
        <ul className="hidden lg:flex list-none gap-8">
          <li><Link href="/explore" className="text-[14px] text-slate-500">Explore</Link></li>
          <li><Link href="/list-room" className="text-[14px] text-slate-500">List Room</Link></li>
          <li><Link href="/services" className="text-[14px] text-slate-500">Services</Link></li>
          <li><Link href="/about" className="text-[14px] text-slate-500">About</Link></li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-3">

          {isLoggedIn ? (
            <>
              {/* 🔥 ADMIN BUTTON */}
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="rounded-full border border-violet-200 px-4 py-[7px] text-[13px] font-medium text-violet-600"
                >
                  Admin
                </Link>
              )}

              {/* WISHLIST */}
              <Link
                href="/wishlist"
                className="transition hover:text-sky-600"
              >
                ❤️ <WishlistCount />
              </Link>
              
              {/*  OWNER BUTTON  */}
              {user?.role === "owner" && (
                <Link
                  href="/owner"
                  className="rounded-full border border-sky-300 px-4 py-[7px] text-[13px] font-medium text-sky-700"
                >
                  Owner Dashboard
                </Link>
              )}

              {/* PROFILE */}
              <Link
                href="/profile"
                className="rounded-full bg-sky-500 px-5 py-[7px] text-[13px] font-medium text-white"
              >
                {user?.name ? user.name.split(" ")[0] : "Profile"}
              </Link>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="rounded-full border border-sky-300 px-4 py-[7px] text-[13px] font-medium text-sky-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="rounded-full border px-4 py-[7px] text-[13px]">
                Login
              </Link>

              <Link href="/auth/signup" className="rounded-full bg-sky-500 px-5 py-[7px] text-[13px] text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
        <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-sky-700"
          >
            {mobileMenuOpen ? (
              <HiX size={28} />
            ) : (
              <HiMenuAlt3 size={28} />
            )}
          </button>
      </nav>

        {mobileMenuOpen && (
        <div
            className="
              lg:hidden
              fixed
              top-20
              right-4
              w-72
              max-h-[75vh]
              overflow-y-auto
              rounded-2xl
              bg-white
              shadow-2xl
              border
              border-slate-200
              z-[999]
              transition-all
              duration-300
            "
          >
        <div className="flex flex-col p-5 space-y-4">

        <Link
          href="/explore"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-5 py-3 hover:bg-sky-50 transition"
        >
          Explore
        </Link>

      <Link
        href="/list-room"
        onClick={() => setMobileMenuOpen(false)}
      >
        List Room
      </Link>

      <Link
        href="/services"
        onClick={() => setMobileMenuOpen(false)}
      >
        Services
      </Link>

      <Link
        href="/about"
        onClick={() => setMobileMenuOpen(false)}
      >
        About
      </Link>

      {isLoggedIn ? (
        <>
          {user?.role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          )}

          {user?.role === "owner" && (
            <Link
              href="/owner"
              onClick={() => setMobileMenuOpen(false)}
            >
              Owner Dashboard
            </Link>
          )}

          <Link
            href="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
          >
            Wishlist ❤️ <WishlistCount />
          </Link>

          <Link
            href="/profile"
            onClick={() => setMobileMenuOpen(false)}
          >
            Profile
          </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="
                w-full
                text-left
                px-5
                py-3
                text-red-600
                hover:bg-red-50
                transition
              "
            >
              Logout
            </button>
        </>
      ) : (
        <>
          <Link
            href="/auth/login"
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>

          <Link
            href="/auth/signup"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  </div>
)}
    </>
  );
};

export default Header;