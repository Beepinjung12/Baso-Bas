"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUserProfile } from "@/app/api/auth";

import Hero from "./components/Hero";
import ProfileCard from "./components/ProfileCard";
import QuickStats from "./components/QuickStats";
import AccountOverview from "./components/AccountOverview";
import PersonalInfo from "./components/PersonalInfo";
import ProfileStrength from "./components/ProfileStrength";

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-slate-600">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">
          {error}
        </p>
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
      <Hero
        profile={profile}
        initials={initials}
      />

      <div className="relative z-20 -mt-12 px-10 pb-12 space-y-10">
        <ProfileCard
          profile={profile}
          initials={initials}
        />

        <div className="flex justify-end">
          <button
            onClick={() => router.push("/profile/edit")}
            className="rounded-lg bg-sky-600 px-5 py-2 text-white hover:bg-sky-700"
          >
            Edit Profile
          </button>
        </div>

        <QuickStats profile={profile} />

        <AccountOverview />

        <PersonalInfo profile={profile} />

        <ProfileStrength profile={profile} />
      </div>
    </div>
  );
}