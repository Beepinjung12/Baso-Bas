"use client";

import { useEffect, useMemo, useState } from "react";
import ExploreHero from "./components/ExploreHero";
import PopularCities from "./components/PopularCities";
import RoomFilters from "./components/RoomFilters";
import RoomCard from "./components/RoomCard";
import CTASection from "./components/CTASection";
import RoomSkeleton from "./components/RoomSkeleton";
import { getRooms } from "@/app/api/rooms";
import { getRoomImageUrl } from "@/app/utils/roomImages";

const FALLBACK_IMG = "/default-room.jpg";

function normalizeRoom(room) {
  const price = Number(room.rent || room.price || 0);

  return {
    id: room._id || room.id,
    title: room.title || "Room Available",
    location: room.location || "Location unavailable",
    city: room.city || room.location?.split(",")[0] || "Kathmandu",
    price,
    priceLabel: price ? `Rs. ${price.toLocaleString()}/mo` : "Contact",
    beds: Number(room.numberOfRooms) || 1,
    baths: Number(room.baths) || 1,
    area: room.roomSize || "N/A",
    img:
      room.images?.[0]?.url ||
      room.image ||
      FALLBACK_IMG,
    description: room.description || "",
    rentType: room.rentType || "Monthly",
    isUserSubmitted: true,
  };
}

export default function ExploreClient({ popularCities = [] }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50000);

  useEffect(() => {
    let active = true;

    async function fetchRooms() {
      try {
        setLoading(true);
        setError("");
        const response = await getRooms();


          const data =
            response?.data?.rooms ||
            response?.data?.data ||
            response?.data ||
            [];

        if (active) {
          setRooms(data.map(normalizeRoom));
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        if (active) {
          setError("Failed to load rooms.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchRooms();

    return () => {
      active = false;
    };
  }, []);

  const cities = useMemo(() => {
    return [
      "All",
      ...new Set(rooms.map(room => room.city))
    ];
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const search = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !search ||
        room.title.toLowerCase().includes(search) ||
        room.location.toLowerCase().includes(search);
      const matchesCity = selectedCity === "All" || room.city === selectedCity;
      const matchesPrice = room.price <= maxPrice;

      return matchesSearch && matchesCity && matchesPrice;
    });
  }, [rooms, searchQuery, selectedCity, maxPrice]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <ExploreHero />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <PopularCities
          cities={popularCities.length ? popularCities : cities}
        />

        <RoomFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          cities={cities}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        {error && (
          <div className="text-center py-10 text-red-500">
            {error}
          </div>
        )}

        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <RoomSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && !error && filteredRooms.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No rooms found</h3>
            <p className="text-slate-500 mt-2">Try changing your filters.</p>
          </div>
        )}

        {!loading && !error && filteredRooms.length > 0 && (
          <div id="listings" className="grid md:grid-cols-3 gap-6">
            {filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </main>

      <CTASection />
    </div>
  );
}