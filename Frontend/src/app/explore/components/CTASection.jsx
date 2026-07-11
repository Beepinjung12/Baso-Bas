import Link from "next/link";
import {
  FaBed,
  FaShower,
  FaRulerCombined,
  FaHeart,
} from "react-icons/fa";

export default function RoomCard({ room }) {

  // Prevent crash if room data is missing
  if (!room) {
    return null;
  }


  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col">


      {/* IMAGE */}
      <div className="relative h-56">

        <img
          src={
            room.img ||
            room.image ||
            "/default-room.jpg"
          }
          alt={room.title || "Room"}
          className="w-full h-full object-cover"
        />


        <button
          type="button"
          className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
        >
          <FaHeart className="text-red-500" />
        </button>


        {room.isUserSubmitted && (
          <span
            className="
            absolute top-4 left-4 
            bg-sky-700 text-white 
            text-xs font-bold 
            px-3 py-1 rounded-full uppercase
            "
          >
            New Listing
          </span>
        )}

      </div>



      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1">


        <p className="text-sky-500 text-xs font-bold uppercase tracking-wider">

          {
            Number(room.rent || room.price) <= 10000
              ? "Great deal"
              : "Best value"
          }

        </p>



        <h2 className="text-xl font-semibold text-slate-900 mt-2">

          {room.title || "Room Available"}

        </h2>



        <p className="text-slate-500 text-sm mt-1">

          {room.location || "Location unavailable"}

        </p>



        {/* DETAILS */}
        <div className="grid grid-cols-3 gap-3 mt-6 text-sm text-slate-600">


          <div className="flex items-center gap-2">
            <FaBed />
            <span>
              {room.beds || "N/A"}
            </span>
          </div>



          <div className="flex items-center gap-2">
            <FaShower />
            <span>
              {room.baths || "N/A"}
            </span>
          </div>



          <div className="flex items-center gap-2">
            <FaRulerCombined />
            <span>
              {room.area || "N/A"}
            </span>
          </div>


        </div>




        {/* FOOTER */}
        <div className="flex justify-between items-center mt-auto pt-6">


          <strong className="text-slate-900">

            Rs. {room.priceLabel || room.rent || "N/A"}

          </strong>



          <Link
            href={`/rooms/${room._id || room.id}`}
            className="
            bg-sky-500 
            text-white 
            px-5 py-2 
            rounded-full 
            font-semibold
            "
          >
            View
          </Link>


        </div>


      </div>


    </article>
  );
}