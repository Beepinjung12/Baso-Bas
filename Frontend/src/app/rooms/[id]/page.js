import RoomGallery from "./RoomGallery";
import RoomCard from "@/app/explore/components/RoomCard";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from "@/app/components/WishlistButton";
import BookingButton from "@/app/components/BookingButton";
import BookingSuccessPopup from "./BookingSuccessPopup";
import {
  FaMapMarkerAlt,
  FaBed,
  FaPhone,
  FaWhatsapp,
  FaUser,
  FaCheckCircle,
  FaArrowLeft,
  FaShareAlt,
  FaCar,
} from "react-icons/fa";
import {
  getAllRoomImageUrls,
  getRoomImageUrl,
} from "@/app/utils/roomImages";

export default async function RoomDetails({ params }) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/api/rooms/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Room Not Found</h1>
          <Link href="/explore" className="text-sky-600 font-semibold">
            Back to Explore
          </Link>
        </div>
      </main>
    );
  }

  const result = await res.json();
  const room = result.data;

  const allRoomsRes = await fetch(
  "http://localhost:5000/api/rooms",
  {
    cache:"no-store",
  }
);


const allRoomsData = await allRoomsRes.json();


const similarRooms =
  allRoomsData?.data
    ?.filter(
      (item)=>
        item._id !== room._id &&
        item.location
          ?.toLowerCase()
          .includes(
            room.location
              ?.split(",")[0]
              ?.toLowerCase()
          )
    )
    .slice(0,3) || [];

  const imageList = room.images?.length
      ? room.images.map(img => img.url)
      : [room.image || "/default-room.jpg"];

  const mainImage = imageList[0];

  return (
    <main className="bg-slate-50 min-h-screen py-10">
      {/* <BookingSuccessPopup /> */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Similar Rooms */}
            {similarRooms.length > 0 && (
            <section className="mt-12">

                <h2 className="text-3xl font-bold mb-6">
                Similar Rooms
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                {similarRooms.map((item)=>(
                    <RoomCard
                    key={item._id}
                    room={item}
                    />
                ))}

                </div>

            </section>
            )}
        <Link
          href="/explore"
          className="flex items-center gap-2 text-sky-600 font-semibold mb-6"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl overflow-hidden shadow">
                <RoomGallery
                    images={imageList}
                    title={room.title}
                />

              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-4xl font-bold">
                      {room.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-500 mt-3">
                      <FaMapMarkerAlt />
                      {room.location}
                    </div>
                    <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-4xl font-bold">
                        {room.title}
                        </h1>

                        <p className="mt-2 text-slate-500">
                        📍 {room.location}
                        </p>

                        <p className="mt-3 text-xl font-semibold text-sky-600">
                        Rs. {room.rent}
                        </p>
                    </div>
                    <WishlistButton roomId={room._id} />
                    </div>
                  </div>

                  <button className="bg-slate-100 p-3 rounded-full">
                    <FaShareAlt />
                  </button>
                </div>

                <div className="mt-8 bg-sky-50 rounded-2xl p-6">
                  <p className="text-sm text-gray-500">Monthly Rent</p>
                  <h2 className="text-3xl font-bold text-sky-600">
                    Rs. {room.rent}
                  </h2>
                </div>

                <h2 className="text-2xl font-bold mt-8">Description</h2>
                <p className="text-gray-600 mt-3 leading-8">
                  {room.description || "No description available."}
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-5">Amenities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Info
                    icon={<FaBed />}
                    label="Rooms"
                    value={room.numberOfRooms}
                  />
                  <Info
                    icon={<FaCheckCircle />}
                    label="Room Size"
                    value={room.roomSize || "N/A"}
                  />
                  <Info
                    icon={<FaCar />}
                    label="Parking"
                    value={room.parking ? "Available" : "Not Available"}
                  />
                  <Info
                    icon={<FaCheckCircle />}
                    label="Rent Type"
                    value={room.rentType}
                  />
                </div>
              </div>
            </div>
          </div>

        {/* OWNER CARD */}
        <div>
        <div className="bg-white rounded-3xl shadow p-8 sticky top-24">
            <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center">
                <FaUser className="text-sky-600 text-3xl" />
            </div>

            <div>
                <h2 className="text-xl font-bold">
                {room.owner?.name || "Unknown Owner"}
                </h2>
                <p className="text-sm text-gray-500">
                Verified Room Owner
                </p>
            </div>
            </div>

            <div className="space-y-5">
            <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="font-semibold capitalize">
                {room.owner?.role || "Owner"}
                </p>
            </div>

            <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold">
                {room.owner?.phone || "Not Available"}
                </p>
            </div>
            </div>

            <div className="mt-8 space-y-4">

            <BookingButton roomId={room._id}/>


            <a
                href={room.owner?.phone ? `tel:${room.owner.phone}` : "#"}
                className="flex justify-center items-center gap-3 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-semibold"
            >
                <FaPhone />
                Call Owner
            </a>


            <a
                href={
                    room.owner?.phone
                    ? `https://wa.me/${room.owner.phone}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
                <FaWhatsapp />
                WhatsApp
            </a>

            </div>
        </div>
        </div>
        </div>
        {/* SIMILAR ROOMS */}
            {similarRooms.length > 0 && (
            <section className="mt-12">
                <h2 className="text-3xl font-bold mb-6">
                Similar Rooms
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                {similarRooms.map((similar) => (
                    <RoomCard
                    key={similar._id}
                    room={{
                        ...similar,
                        id: similar._id,
                        img: similar.image || "/default-room.jpg"
                    }}
                    />
                ))}
                </div>
            </section>
            )}
      </div>
    </main>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-5">
      <div className="text-sky-600 text-xl">
        {icon}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {label}
      </p>
      <p className="font-semibold">
        {value}
      </p>
    </div>
  );
}