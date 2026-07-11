export default function RoomFilters({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  cities,
  maxPrice,
  setMaxPrice,
}) {

  const priceOptions=[
    15000,
    12000,
    10000,
    8000
  ];

  return(
    <div className="grid gap-5 mb-8">

      <div className="grid md:grid-cols-3 gap-4">

        <label className="flex flex-col gap-2">

          <span className="text-sm text-slate-600">
            Search rooms
          </span>

          <input
            type="text"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            placeholder="Search by title or location"
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-sky-500"
          />

        </label>


        <label className="flex flex-col gap-2">

          <span className="text-sm text-slate-600">
            City
          </span>

          <select
            value={selectedCity}
            onChange={(e)=>setSelectedCity(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none"
          >

            {cities.map(city=>(
              <option
                key={city}
                value={city}
              >
                {city}
              </option>
            ))}

          </select>

        </label>


        <label className="flex flex-col gap-2">

          <span className="text-sm text-slate-600">
            Max price
          </span>

          <select
            value={maxPrice}
            onChange={(e)=>setMaxPrice(Number(e.target.value))}
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none"
          >

            {priceOptions.map(price=>(
              <option
                key={price}
                value={price}
              >
                Up to Rs {price.toLocaleString()}
              </option>
            ))}

          </select>

        </label>

      </div>

    </div>
  );
}