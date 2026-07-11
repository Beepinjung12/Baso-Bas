import { FaMapMarkerAlt } from "react-icons/fa";

export default function PopularCities({ cities = [] }) {

  return(
    <section className="grid md:grid-cols-3 gap-5 mb-8">

      {cities.map((city)=>(
        <div
          key={city.name}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >

          <div className="flex items-center gap-3 mb-2">

            <FaMapMarkerAlt className="text-sky-700"/>

            <h3 className="font-semibold text-slate-900">
              {city.name}
            </h3>

          </div>

          <p className="text-slate-500 text-sm">
            {city.rooms}
          </p>

        </div>
      ))}

    </section>
  );
}