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

      <div className="grid gap-6 md:grid-cols-3">

        {/* Full Name */}

        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-3xl">
            👤
          </div>

          <p className="text-xs uppercase tracking-widest text-slate-400">
            Full Name
          </p>

          <h3 className="mt-3 text-lg font-bold text-slate-800">
            {profile?.name}
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
            {profile?.email}
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

      </div>
    </div>
  );
}