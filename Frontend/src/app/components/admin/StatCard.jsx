export default function StatCard({ label, value, icon: Icon, accent = "sky" }) {
  const accents = {
    sky: "bg-sky-50 text-sky-600 border-sky-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-1 text-3xl font-bold text-slate-800">{value}</p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${accents[accent]}`}
        >
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}
