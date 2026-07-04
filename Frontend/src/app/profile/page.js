"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
  Sparkles,
  BadgeCheck,
  Pencil,
  ChevronRight,
} from "lucide-react";

import { getUserProfile } from "@/app/api/auth";
import EditProfileForm from "@/app/components/profile/EditProfileForm";

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setProfile(res.data?.data ?? null);
      } catch (err) {
        setError("Failed to load profile. Please login again.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleProfileUpdated = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">

        <div className="rounded-3xl bg-white px-10 py-8 shadow-xl">

          <div className="flex items-center gap-5">

            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600"></div>

            <div>

              <h2 className="text-lg font-semibold text-slate-800">
                Loading Profile
              </h2>

              <p className="text-sm text-slate-500">
                Please wait while we prepare your dashboard...
              </p>

            </div>

          </div>

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">

        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">

          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-5xl">
            ⚠️
          </div>

          <h2 className="text-3xl font-bold text-red-600">
            Unable to Load Profile
          </h2>

          <p className="mt-3 text-slate-500">
            {error}
          </p>

        </div>

      </div>
    );
  }

  const initials =
    profile?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-sky-500 to-sky-300 px-10 py-16">

        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-lg">

              <Sparkles size={16} />

              Premium Owner Profile

            </div>

            <h1 className="font-playfair text-6xl font-bold text-white">

              Welcome,

              <br />

              {profile?.name}

            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">

              Keep your account updated, manage your information,
              and maintain a professional owner profile for tenants.

            </p>

          </div>

          <div className="hidden lg:block">

            <div className="rounded-[40px] border border-white/20 bg-white/10 p-10 backdrop-blur-xl">

              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white text-6xl font-bold text-sky-700 shadow-2xl">

                {initials}

              </div>

            </div>

          </div>

        </div>

      </section>

      <div className="relative z-20 -mt-12 px-10 pb-12">
        {/* ================= PROFILE CARD ================= */}

        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">

          <div className="relative h-36 bg-gradient-to-r from-sky-700 via-sky-500 to-cyan-400">

            <div className="absolute -bottom-16 left-10">

              <div className="relative">

                <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-white bg-gradient-to-br from-sky-600 to-sky-800 text-5xl font-bold text-white shadow-2xl">

                  {initials}

                </div>

                <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-500">

                  <BadgeCheck size={16} className="text-white" />

                </div>

              </div>

            </div>

          </div>

          <div className="px-10 pb-10 pt-20">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h2 className="text-4xl font-bold text-slate-800">
                  {profile?.name}
                </h2>

                <p className="mt-2 flex items-center gap-2 text-slate-500">
                  <Mail size={17} />
                  {profile?.email || "No email"}
                </p>

                <p className="mt-2 flex items-center gap-2 text-slate-500">
                  <Phone size={17} />
                  {profile?.phone || "No phone number"}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 font-semibold capitalize text-emerald-700">

                  <ShieldCheck size={18} />

                  {profile?.role || "User"}

                </div>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-slate-50 px-6 py-5">

                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Account Status
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-emerald-600">
                    Active
                  </h3>

                </div>

                <div className="rounded-2xl bg-slate-50 px-6 py-5">

                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Profile
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-sky-600">
                    100%
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= QUICK STATS ================= */}

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm uppercase tracking-wider text-slate-500">
                  Full Name
                </p>

                <h3 className="mt-3 text-2xl font-bold text-slate-800">
                  {profile?.name}
                </h3>

              </div>

              <div className="rounded-2xl bg-sky-100 p-4">

                <User className="text-sky-700" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm uppercase tracking-wider text-slate-500">
                  Phone
                </p>

                <h3 className="mt-3 text-xl font-bold text-slate-800">
                  {profile?.phone || "Not Added"}
                </h3>

              </div>

              <div className="rounded-2xl bg-emerald-100 p-4">

                <Phone className="text-emerald-700" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm uppercase tracking-wider text-slate-500">
                  Role
                </p>

                <h3 className="mt-3 text-2xl font-bold capitalize text-sky-600">
                  {profile?.role}
                </h3>

              </div>

              <div className="rounded-2xl bg-purple-100 p-4">

                <ShieldCheck className="text-purple-700" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm uppercase tracking-wider text-slate-500">
                  Account
                </p>

                <h3 className="mt-3 text-2xl font-bold text-emerald-600">
                  Verified
                </h3>

              </div>

              <div className="rounded-2xl bg-amber-100 p-4">

                <BadgeCheck className="text-amber-700" />

              </div>

            </div>

          </div>

        </div>

        {/* ================= ACCOUNT OVERVIEW ================= */}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow-lg lg:col-span-2">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-slate-800">
                Account Overview
              </h2>

              <div className="flex items-center gap-2 text-sm text-slate-500">

                <CalendarDays size={16} />

                Updated Recently

              </div>

            </div>

            <p className="leading-7 text-slate-600">

              Your profile helps tenants and system users identify you
              as a trusted property owner. Keeping your information
              accurate improves credibility and visibility.

            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <div className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-600">
                Verified Identity
              </div>

              <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
                Active Owner
              </div>

              <div className="rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600">
                Trusted Listings
              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-sky-400 p-8 text-white shadow-xl">

            <h3 className="text-xl font-bold">
              Profile Strength
            </h3>

            <p className="mt-2 text-white/80">
              Complete your profile for better visibility
            </p>

            <div className="mt-6">

              <div className="h-3 w-full rounded-full bg-white/20">

                <div className="h-3 w-[90%] rounded-full bg-white"></div>

              </div>

              <p className="mt-3 text-sm text-white/80">
                90% Complete
              </p>

            </div>

          </div>

        </div>

        {/* ================= PERSONAL INFO GRID ================= */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <p className="text-xs uppercase tracking-widest text-slate-400">
              Full Name
            </p>

            <h3 className="mt-3 text-lg font-bold text-slate-800">
              {profile?.name}
            </h3>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <p className="text-xs uppercase tracking-widest text-slate-400">
              Email Address
            </p>

            <h3 className="mt-3 text-lg font-bold text-slate-800">
              {profile?.email}
            </h3>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <p className="text-xs uppercase tracking-widest text-slate-400">
              Phone Number
            </p>

            <h3 className="mt-3 text-lg font-bold text-slate-800">
              {profile?.phone || "Not Added"}
            </h3>

          </div>

        </div>

        {/* NEXT SECTION BELOW */}
                {/* ================= EDIT PROFILE SECTION ================= */}

        <div className="mt-10 rounded-[32px] bg-white shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 px-8 py-6">

            <h2 className="text-3xl font-bold text-white">
              Edit Profile
            </h2>

            <p className="mt-1 text-white/80">
              Update your personal details and keep your account fresh
            </p>

          </div>

          {/* Content */}
          <div className="p-8 lg:p-10">

            <div className="mb-8 rounded-2xl bg-slate-50 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100">
                  ✏️
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    Quick Tip
                  </h3>

                  <p className="text-sm text-slate-500">
                    Keep your phone and email updated so tenants can contact you easily.
                  </p>

                </div>

              </div>

            </div>

            {/* YOUR EXISTING FORM */}
            <EditProfileForm
              profile={profile}
              onProfileUpdated={handleProfileUpdated}
            />

          </div>

        </div>
      </div>
    </div>
  );
}