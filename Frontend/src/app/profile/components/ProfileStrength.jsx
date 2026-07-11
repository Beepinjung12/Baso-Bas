"use client";

export default function ProfileStrength({ profile }) {

  const progress =
    profile?.phone &&
    profile?.email &&
    profile?.name
      ? 100
      : 90;

  return (
    <div className="mt-10 rounded-[32px] overflow-hidden bg-gradient-to-br from-sky-700 via-sky-500 to-cyan-400 text-white shadow-2xl">

      <div className="p-10">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">

            ⭐

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              Profile Strength
            </h2>

            <p className="mt-1 text-white/80">
              Complete your profile to build trust with tenants.
            </p>

          </div>

        </div>

        <div className="mt-10">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium">
              Completion
            </span>

            <span className="font-bold">
              {progress}%
            </span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-white/20">

            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl bg-white/10 p-5">

            <h3 className="font-semibold">
              ✅ Profile Status
            </h3>

            <p className="mt-2 text-sm text-white/80">
              Your owner profile is active and visible to users.
            </p>

          </div>

          <div className="rounded-2xl bg-white/10 p-5">

            <h3 className="font-semibold">
              🏠 Property Owner
            </h3>

            <p className="mt-2 text-sm text-white/80">
              Continue updating your information for better credibility.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}