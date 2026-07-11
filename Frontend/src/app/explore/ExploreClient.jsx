"use client";

import { useMemo, useState } from "react";
import ExploreHero from "./components/ExploreHero";
import PopularCities from "./components/PopularCities";
import RoomFilters from "./components/RoomFilters";
import RoomCard from "./components/RoomCard";
import CTASection from "./components/CTASection";

const demoRoomListings=[
  {
    id:1,
    title:"Single Room in Thamel",
    location:"Thamel, Kathmandu",
    city:"Kathmandu",
    price:12000,
    priceLabel:"Rs 12,000/mo",
    beds:1,
    baths:1,
    area:"220 sqft",
    img:"https://images.unsplash.com/photo-1554995207-c18c203602cb"
  },
  {
    id:2,
    title:"Double Room in Lakeside",
    location:"Lakeside, Pokhara",
    city:"Pokhara",
    price:14500,
    priceLabel:"Rs 14,500/mo",
    beds:1,
    baths:1,
    area:"260 sqft",
    img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  }
];

const FALLBACK_IMG="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688";

function normalizeRoom(room){
  const price=Number(room.rent??room.price??0);

  return{
    id:room._id||room.id,
    title:room.title||"Room Listing",
    location:room.location||"Unknown",
    city:room.city||"Kathmandu",
    price,
    priceLabel:price?`Rs ${price.toLocaleString()}/mo`:"Contact",
    beds:Number(room.numberOfRooms)||1,
    baths:room.baths||1,
    area:room.roomSize||"—",
    img:FALLBACK_IMG,
    isUserSubmitted:true
  };
}

export default function ExploreClient({popularCities,submittedRooms=[]}){

  const [searchQuery,setSearchQuery]=useState("");
  const [selectedCity,setSelectedCity]=useState("All");
  const [maxPrice,setMaxPrice]=useState(15000);

  const rooms=useMemo(()=>{
    return[
      ...submittedRooms.map(normalizeRoom),
      ...demoRoomListings
    ];
  },[submittedRooms]);

  const cities=[
    "All",
    ...new Set(rooms.map(room=>room.city))
  ];

  const filteredRooms=rooms.filter(room=>{
    const searchMatch=searchQuery
      ?room.title.toLowerCase().includes(searchQuery.toLowerCase())||
       room.location.toLowerCase().includes(searchQuery.toLowerCase())
      :true;

    const cityMatch=
      selectedCity==="All"||
      room.city===selectedCity;

    const priceMatch=
      room.price<=maxPrice;

    return searchMatch&&cityMatch&&priceMatch;
  });

  return(
    <div className="bg-slate-50 min-h-screen">

      <ExploreHero/>

      <main className="max-w-6xl mx-auto px-6 py-12">

        <PopularCities cities={popularCities}/>

        <RoomFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          cities={cities}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {filteredRooms.map(room=>(
            <RoomCard
              key={room.id}
              room={room}
            />
          ))}
        </div>

      </main>

      <CTASection/>

    </div>
  );
}