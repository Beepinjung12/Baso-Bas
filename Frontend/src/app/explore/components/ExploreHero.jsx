import Link from "next/link";

const heroHighlights=[
  {
    label:"Search",
    value:"Kathmandu"
  },
  {
    label:"When",
    value:"Available now"
  },
  {
    label:"Price",
    value:"Under Rs 15,000"
  }
];

export default function ExploreHero(){

  return(
    <section
      className="relative overflow-hidden text-center px-6 py-20 text-white"
      style={{
        background:"linear-gradient(135deg,#0369a1,#0ea5e9,#7dd3fc)"
      }}
    >

      <div className="absolute w-80 h-80 rounded-full bg-white/10 blur-xl -right-20 -top-20"/>

      <div className="absolute w-72 h-72 rounded-full bg-white/10 blur-xl -left-20 -bottom-20"/>

      <div className="relative z-10 max-w-5xl mx-auto">

        <p className="uppercase tracking-[0.25em] text-sm opacity-80 mb-4">
          Explore verified rooms
        </p>

        <h1
          className="text-5xl max-md:text-3xl font-normal mb-5"
          style={{
            fontFamily:"Georgia,serif"
          }}
        >
          Find your next room with ease
        </h1>

        <p className="max-w-2xl mx-auto text-base leading-8 opacity-90">
          Discover local rooms, view trusted listings,
          and connect directly with owners —
          all in one place.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-9">

          {heroHighlights.map(item=>(
            <div
              key={item.label}
              className="bg-white/15 rounded-2xl p-5 text-left backdrop-blur-md"
            >

              <p className="text-xs uppercase tracking-widest opacity-80 mb-2">
                {item.label}
              </p>

              <strong>
                {item.value}
              </strong>

            </div>
          ))}

        </div>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">

          <Link
            href="#listings"
            className="bg-white text-sky-700 px-7 py-3 rounded-full font-bold"
          >
            Browse Rooms
          </Link>

          <Link
            href="/auth/signup"
            className="bg-white/20 border border-white/30 px-7 py-3 rounded-full font-bold"
          >
            Start Free
          </Link>

        </div>

      </div>

    </section>
  );
}