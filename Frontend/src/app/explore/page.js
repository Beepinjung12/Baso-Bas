import ExploreClient from "./ExploreClient";
import config from "@/app/config";

export const metadata = {
  title: "Explore Rooms",
};


const popularCities = [
  { name: "Kathmandu", rooms: "1,280 rooms" },
  { name: "Pokhara", rooms: "860 rooms" },
  { name: "Chitwan", rooms: "520 rooms" },
  { name: "Lalitpur", rooms: "430 rooms" },
];



async function getSubmittedRooms() {

  try {

    const res = await fetch(
      `${config.apiUrl}/api/rooms`,
      {
        cache: "no-store",
      }
    );


    if (!res.ok) return [];


    const data = await res.json();


    if (Array.isArray(data)) return data;


    if (Array.isArray(data.data)) return data.data;


    return [];


  } catch {

    return [];

  }

}




export default async function ExplorePage({ searchParams }) {


  const submittedRooms = await getSubmittedRooms();



  const params = await searchParams;


  const search =
    params?.search?.toLowerCase() || "";


  const price =
    params?.price || "Any price";



  const filteredRooms = submittedRooms.filter((room)=>{


    const title =
      room.title?.toLowerCase() || "";


    const location =
      room.location?.toLowerCase() || "";



    const matchesSearch =
      title.includes(search) ||
      location.includes(search);



    let matchesPrice = true;



    const rent =
      Number(room.rent || room.price || 0);



    if(price === "Under $500"){

      matchesPrice = rent < 500;

    }


    else if(price === "$500 – $1000"){

      matchesPrice =
        rent >= 500 &&
        rent <= 1000;

    }


    else if(price === "$1000+"){

      matchesPrice = rent >= 1000;

    }



    return matchesSearch && matchesPrice;


  });





  return (

    <ExploreClient
      popularCities={popularCities}
      submittedRooms={filteredRooms}
    />

  );

}