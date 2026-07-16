import Link from "next/link";
import {
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-500 p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
        {/* Decorative circle */}
        <div className="absolute w-72 h-72 rounded-full bg-white/10 -right-20 -top-20" />

        <div className="relative z-10 max-w-xl">
          <p className="uppercase tracking-widest text-sm text-sky-100 mb-3">
            Basobas Community
          </p>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Have a room available? Find your next tenant easily.
          </h2>

          <p className="mt-4 text-sky-100 leading-7">
            List your room on Basobas and connect with people searching for
            affordable rooms and flats.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/owner/list-rooms"
            className="bg-white text-sky-700 px-7 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-slate-100 transition"
          >
            <FaPlusCircle />
            List Room
          </Link>

          <Link
            href="/explore"
            className="border border-white/40 px-7 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition"
          >
            <FaSearch />
            Explore
          </Link>
        </div>
      </div>
    </section>
  );
}