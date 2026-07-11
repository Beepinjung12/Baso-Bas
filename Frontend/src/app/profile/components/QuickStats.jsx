"use client";

export default function QuickStats({ profile }) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {/* Full Name */}
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

          <div className="rounded-2xl bg-sky-100 p-4 text-3xl">
            👤
          </div>

        </div>

      </div>

      {/* Phone */}
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

          <div className="rounded-2xl bg-emerald-100 p-4 text-3xl">
            📞
          </div>

        </div>

      </div>

      {/* Role */}
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

          <div className="rounded-2xl bg-purple-100 p-4 text-3xl">
            🛡️
          </div>

        </div>

      </div>

      {/* Account */}
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

          <div className="rounded-2xl bg-amber-100 p-4 text-3xl">
            ✔️
          </div>

        </div>

      </div>

    </div>
  );
}