"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getUserProfile,
  requestOwnerAccess,
} from "@/app/api/auth";

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
const [requestLoading, setRequestLoading] = useState(false);

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
  const handleOwnerRequest = async () => {
  try {
    setRequestLoading(true);

    const res = await requestOwnerAccess();

    alert(res.data.message);

    // Refresh profile so the new status is shown
    const profileRes = await getUserProfile();
    setProfile(profileRes.data.data);
  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Failed to send owner request."
    );
  } finally {
    setRequestLoading(false);
  }
};

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

              <div className="flex justify-end gap-3">
        {profile?.role === "user" && (
          <button
            onClick={handleOwnerRequest}
            disabled={
              requestLoading ||
              profile.ownerRequestStatus === "pending"
            }
            className={`rounded-lg px-5 py-2 text-white ${
              profile.ownerRequestStatus === "pending"
                ? "bg-yellow-500 cursor-not-allowed"
                : profile.ownerRequestStatus === "rejected"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {requestLoading
              ? "Sending..."
              : profile.ownerRequestStatus === "pending"
              ? "Request Pending"
              : profile.ownerRequestStatus === "rejected"
              ? "Request Again"
              : "Request Owner Access"}
          </button>
        )}

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