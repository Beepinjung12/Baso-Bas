"use client";

export default function PersonalInfo({ profile }) {
  return (
    <div className="mt-10">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">
          Personal Information
        </h2>

        <p className="mt-2 text-slate-500">
          Your personal details used across the Basobas platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Full Name */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-3xl">
            👤
          </div>

          <p className="text-xs uppercase tracking-widest text-slate-400">
            Full Name
          </p>

          <h3 className="mt-3 text-lg font-bold text-slate-800">
            {profile?.name || "Not Added"}
          </h3>
        </div>

        {/* Email */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
            📧
          </div>

          <p className="text-xs uppercase tracking-widest text-slate-400">
            Email Address
          </p>

          <h3 className="mt-3 break-all text-lg font-bold text-slate-800">
            {profile?.email || "Not Added"}
          </h3>
        </div>

        {/* Phone */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
            📞
          </div>

          <p className="text-xs uppercase tracking-widest text-slate-400">
            Phone Number
          </p>

          <h3 className="mt-3 text-lg font-bold text-slate-800">
            {profile?.phone || "Not Added"}
          </h3>
        </div>

        {/* Address */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
            📍
          </div>

          <p className="text-xs uppercase tracking-widest text-slate-400">
            Address
          </p>

          <h3 className="mt-3 text-lg font-bold text-slate-800">
            {profile?.address || "Not Added"}
          </h3>
        </div>

        {/* Role */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-3xl">
            🛡️
          </div>

          <p className="text-xs uppercase tracking-widest text-slate-400">
            Account Type
          </p>

          <h3 className="mt-3 text-lg font-bold capitalize text-slate-800">
            {profile?.role || "User"}
          </h3>
        </div>

        {/* Bio */}
        <div className="rounded-3xl bg-white p-6 shadow-lg md:col-span-2 lg:col-span-3">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-3xl">
            📝
          </div>

          <p className="text-xs uppercase tracking-widest text-slate-400">
            Bio
          </p>

          <p className="mt-3 leading-7 text-slate-700">
            {profile?.bio ||
              "No bio has been added yet. Tell other users a little about yourself."}
          </p>
        </div>
      </div>
    </div>
  );
}