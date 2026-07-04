"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { logout as logoutApi } from "../api/auth";

const Header = () => {
  const router = useRouter();
  const { user, logout, isLoggedIn } = useAuth();

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
      <nav className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-sky-100 bg-white/90 px-8 backdrop-blur-md">

        <Logo />

        {/* NAV LINKS */}
        <ul className="flex list-none gap-8">
          <li><Link href="explore" className="text-[14px] text-slate-500">Explore</Link></li>
          <li><Link href="list-room" className="text-[14px] text-slate-500">List Room</Link></li>
          <li><Link href="/services" className="text-[14px] text-slate-500">Services</Link></li>
          <li><Link href="/about" className="text-[14px] text-slate-500">About</Link></li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

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
      </nav>
    </>
  );
};

export default Header;