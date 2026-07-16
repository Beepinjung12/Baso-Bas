"use client";

export default function RoomFilters({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  cities,
  maxPrice,
  setMaxPrice,
}) {
  const priceOptions = [
    {
      label: "Any price",
      value: 999999,
    },
    {
      label: "Under Rs 8,000",
      value: 8000,
    },
    {
      label: "Under Rs 10,000",
      value: 10000,
    },
    {
      label: "Under Rs 15,000",
      value: 15000,
    },
    {
      label: "Under Rs 25,000",
      value: 25000,
    },
    {
      label: "Under Rs 50,000",
      value: 50000,
    },
  ];

  function clearFilters() {
    setSearchQuery("");
    setSelectedCity("All");
    setMaxPrice(50000);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-8">
      <div className="grid md:grid-cols-3 gap-5">
        {/* Search */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">
            Search rooms
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title or location..."
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">
            City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none bg-white"
          >
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">
            Maximum rent
          </label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none bg-white"
          >
            {priceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5">
        <p className="text-sm text-slate-500">
          Find your perfect room
        </p>
        <button
          onClick={clearFilters}
          className="text-sm text-sky-600 hover:text-sky-700 font-medium"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}