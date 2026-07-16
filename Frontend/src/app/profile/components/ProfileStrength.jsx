"use client";

export default function ProfileStrength({ profile }) {
  const profileFields = [
    { label: "Name", value: profile?.name },
    { label: "Phone", value: profile?.phone },
    { label: "Email", value: profile?.email },
    { label: "Address", value: profile?.address },
    { label: "Bio", value: profile?.bio },
    { label: "Profile Photo", value: profile?.profileImage },
  ];

  const completed = profileFields.filter(
    (field) => field.value && field.value.toString().trim() !== ""
  ).length;

  const progress = Math.round(
    (completed / profileFields.length) * 100
  );

  const missingFields = profileFields
    .filter(
      (field) => !field.value || field.value.toString().trim() === ""
    )
    .map((field) => field.label);

  return (
    <div className="mt-10 overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-700 via-sky-500 to-cyan-400 text-white shadow-2xl">
      <div className="p-10">
        {/* Header */}
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

        {/* Progress */}
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

          <p className="mt-3 text-sm text-white/80">
            {completed} of {profileFields.length} profile fields completed.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-5">
            <h3 className="font-semibold">
              ✅ Profile Status
            </h3>

            <p className="mt-2 text-sm text-white/80">
              {progress === 100
                ? "Your profile is complete and ready for tenants to view."
                : "Complete your remaining information to improve your profile."}
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <h3 className="font-semibold">
              📝 Missing Information
            </h3>

            {missingFields.length === 0 ? (
              <p className="mt-2 text-sm text-white/80">
                Great! Your profile is fully completed.
              </p>
            ) : (
              <ul className="mt-2 list-inside list-disc text-sm text-white/80 space-y-1">
                {missingFields.map((field) => (
                  <li key={field}>{field}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}