import Link from "next/link";
import {
  FaBed,
  FaShower,
  FaRulerCombined,
  FaHeart,
} from "react-icons/fa";

export default function RoomCard({ room }) {

  return(
    <article className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col">

      <div className="relative h-56">

        <img
            src={room.img || "/default-room.jpg"}
            alt={room.title || "Room"}
            className="w-full h-full object-cover"
        />

        <button
          type="button"
          className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
        >
          <FaHeart className="text-red-500"/>
        </button>

        {room.isUserSubmitted && (
          <span className="absolute top-4 left-4 bg-sky-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            New Listing
          </span>
        )}

      </div>


      <div className="p-6 flex flex-col flex-1">

        <p className="text-sky-500 text-xs font-bold uppercase tracking-wider">
          {room.price <= 10000 ? "Great deal" : "Best value"}
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-2">
          {room.title}
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          {room.location}
        </p>


        <div className="grid grid-cols-3 gap-3 mt-6 text-sm text-slate-600">

          <div className="flex items-center gap-2">
            <FaBed/>
            <span>{room.beds}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaShower/>
            <span>{room.baths}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaRulerCombined/>
            <span>{room.area}</span>
          </div>

        </div>


        <div className="flex justify-between items-center mt-auto pt-6">

          <strong className="text-slate-900">
            {room.priceLabel}
          </strong>

          <Link
            href={`/rooms/${room.id}`}
            className="bg-sky-500 text-white px-5 py-2 rounded-full font-semibold"
          >
            View
          </Link>

        </div>

      </div>

    </article>
  );
}