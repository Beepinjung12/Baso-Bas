import React from "react";
import { Check } from "lucide-react";

const roomTypes = [
  {
    name: "Single Room",
    priceRange: "Rs 3,500 – 8,000",
    period: "/month",
    description: "A private room, ideal for students and single tenants.",
    facilities: [
      "Attached or shared bathroom",
      "Water & electricity included",
      "Close to public transport",
    ],
    theme: "blue",
    highlighted: false,
  },
  {
    name: "1BHK / 1BK",
    priceRange: "Rs 8,000 – 15,000",
    period: "/month",
    description: "One bedroom, hall, and kitchen — great for couples or small families.",
    facilities: [
      "Private bedroom & kitchen space",
      "Attached bathroom",
      "Balcony (in most units)",
      "Parking space available",
    ],
    theme: "orange",
    highlighted: true,
  },
  {
    name: "2BHK / 2BK",
    priceRange: "Rs 15,000 – 25,000",
    period: "/month",
    description: "Two bedrooms with hall and kitchen — suited for small families or roommates.",
    facilities: [
      "2 private bedrooms",
      "Separate hall & kitchen space",
      "2 bathrooms in most units",
      "Parking & storage space",
    ],
    theme: "blue",
    highlighted: false,
  },
  {
    name: "3BHK",
    priceRange: "Rs 25,000 – 40,000+",
    period: "/month",
    description: "Spacious three-bedroom units, ideal for larger families.",
    facilities: [
      "3 private bedrooms",
      "Large hall & kitchen space",
      "Multiple bathrooms",
      "Dedicated parking & terrace",
    ],
    theme: "orange",
    highlighted: false,
  },
];

const themeStyles = {
  blue: {
    accent: "#0284c7",
    badgeBg: "#e0f2fe",
    badgeText: "#0c4a6e",
  },
  orange: {
    accent: "#ea580c",
    badgeBg: "#ffedd5",
    badgeText: "#9a3412",
  },
};

const PricingCard = ({ room }) => {
  const style = themeStyles[room.theme];

  return (
    <div
      className={`relative rounded-2xl border bg-white p-8 shadow-sm ${
        room.highlighted ? "border-2 shadow-md" : "border-slate-200"
      }`}
      style={room.highlighted ? { borderColor: style.accent } : undefined}
    >
      {room.highlighted && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{ backgroundColor: style.badgeBg, color: style.badgeText }}
        >
          Most Booked
        </span>
      )}

      <h3 className="text-center text-lg font-bold text-slate-800">
        {room.name}
      </h3>
      <p className="mt-2 text-center text-sm text-slate-500">
        {room.description}
      </p>

      <div className="my-6 text-center">
        <div className="text-2xl font-bold text-slate-800">{room.priceRange}</div>
        <span className="text-sm text-slate-500">{room.period}</span>
      </div>

      <ul className="mb-8 flex flex-col gap-3">
        {room.facilities.map((facility) => (
          <li key={facility} className="flex items-start gap-2 text-[14px] text-slate-600">
            <Check size={16} style={{ color: style.accent }} className="mt-0.5 shrink-0" />
            {facility}
          </li>
        ))}
      </ul>

      <a
        href="/explore"
        className="block w-full rounded-full py-2.5 text-center text-sm font-semibold text-white no-underline transition hover:opacity-90"
        style={{ backgroundColor: style.accent }}
      >
        Browse {room.name} rooms
      </a>
    </div>
  );
};

const Pricing = () => {
  return (
    <section className="bg-sky-50 px-8 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-slate-800">Room Pricing</h1>
        <p className="mt-3 text-sm text-slate-500">
          Typical rental price ranges on BASOBAS, based on room type. Actual prices
          vary by location, furnishing, and amenities.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {roomTypes.map((room) => (
          <PricingCard key={room.name} room={room} />
        ))}
      </div>

      <p className="mt-10 text-center text-[13px] text-slate-500">
        Looking to list your own room?{" "}
        <a href="/list-room" className="font-semibold text-sky-600 no-underline hover:underline">
          List it on BASOBAS
        </a>
        .
      </p>
    </section>
  );
};

export default Pricing;
