"use client";
import Image from "next/image";

export default function ProfileCard({ profile, initials }) {
  const fields = [
    profile?.name,
    profile?.phone,
    profile?.email,
    profile?.address,
    profile?.bio,
  ];

  const completed = fields.filter(
    (field) => field && field.toString().trim() !== ""
  ).length;

  const profilePercentage = Math.round(
    (completed / fields.length) * 100
  );

  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
      {/* Cover */}
      <div className="relative h-36 bg-gradient-to-r from-sky-700 via-sky-500 to-cyan-400">
        <div className="absolute -bottom-16 left-10">
          <div className="relative">
              {profile?.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt={profile.name}
                  width={128}
                  height={128}
                  className="h-32 w-32 rounded-full border-8 border-white object-cover shadow-2xl"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-white bg-gradient-to-br from-sky-600 to-sky-800 text-5xl font-bold text-white shadow-2xl">
                  {initials}
                </div>
              )}

              <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-sm">
                ✔️
              </div>
            </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-10 pb-10 pt-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Side */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-slate-800">
              {profile?.name}
            </h2>

            <p className="mt-3 flex items-center gap-2 text-slate-600">
              📧
              <span>{profile?.email || "No email added"}</span>
            </p>

            <p className="mt-2 flex items-center gap-2 text-slate-600">
              📞
              <span>{profile?.phone || "No phone number"}</span>
            </p>

            <p className="mt-2 flex items-center gap-2 text-slate-600">
              📍
              <span>{profile?.address || "No address added"}</span>
            </p>

            <div className="mt-5">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Bio
              </h4>

              <p className="max-w-2xl leading-7 text-slate-600">
                {profile?.bio ||
                  "No bio added yet. Tell other users a little about yourself."}
              </p>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 font-semibold capitalize text-emerald-700">
              🛡️
              {profile?.role || "User"}
            </div>
          </div>

          {/* Right Side */}
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
                Profile Completion
              </p>

              <h3 className="mt-2 text-xl font-bold text-sky-600">
                {profilePercentage}%
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {completed} of {fields.length} fields completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}