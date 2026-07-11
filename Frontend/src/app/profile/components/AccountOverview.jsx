"use client";

export default function AccountOverview() {
  return (
    <div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">

      <div className="flex flex-col gap-8 lg:flex-row">

        {/* Left */}
        <div className="flex-1">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-slate-800">
              Account Overview
            </h2>

            <div className="flex items-center gap-2 text-sm text-slate-500">

              📅

              <span>Updated Recently</span>

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

        {/* Right */}

        <div className="w-full rounded-3xl bg-gradient-to-br from-sky-600 to-sky-400 p-8 text-white lg:w-80">

          <h3 className="text-xl font-bold">
            Profile Strength
          </h3>

          <p className="mt-2 text-white/80">
            Complete your profile for better visibility.
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

    </div>
  );
}