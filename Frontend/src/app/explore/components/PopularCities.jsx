import {
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

export default function PopularCities({ cities = [] }) {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Popular Cities
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Find rooms in popular locations
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {cities.map(city => (
          <div
            key={city.name}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                <FaMapMarkerAlt className="text-sky-600" />
              </div>
              <FaArrowRight className="text-slate-300 text-sm" />
            </div>

            <h3 className="font-semibold text-slate-900 text-lg">
              {city.name}
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              {city.rooms}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}