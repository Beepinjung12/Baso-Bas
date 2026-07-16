import Link from "next/link";

const heroHighlights = [
  {
    label: "Available Rooms",
    value: "1000+ Listings",
  },
  {
    label: "Locations",
    value: "Kathmandu • Pokhara",
  },
  {
    label: "Trusted",
    value: "Direct Owner Contact",
  },
];

export default function ExploreHero() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 text-white"
      style={{
        background: "linear-gradient(135deg,#075985,#0284c7,#38bdf8)"
      }}
    >
      {/* Background shapes */}
      <div className="absolute w-96 h-96 rounded-full bg-white/10 blur-3xl -right-32 -top-32" />
      <div className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl -left-32 bottom-0" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <p className="uppercase tracking-[0.3em] text-xs opacity-80 mb-5">
          Explore verified rooms
        </p>

        <h1 className="text-5xl max-md:text-3xl font-bold leading-tight mb-6">
          Find a room that feels like home
        </h1>

        <p className="max-w-3xl mx-auto text-lg leading-8 opacity-90">
          Browse affordable rooms and flats, compare locations, and connect
          directly with owners through Basobas.
        </p>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {heroHighlights.map(item => (
            <div
              key={item.label}
              className="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-left border border-white/20 hover:bg-white/20 transition"
            >
              <p className="text-xs uppercase tracking-widest opacity-75 mb-2">
                {item.label}
              </p>
              <h3 className="text-xl font-semibold">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          <Link
            href="#listings"
            className="bg-white text-sky-700 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Browse Rooms
          </Link>

          <Link
            href="/auth/signup"
            className="px-8 py-3 rounded-full font-semibold border border-white/40 bg-white/10 hover:bg-white/20 transition"
          >
            Become a Host
          </Link>
        </div>
      </div>
    </section>
  );
}