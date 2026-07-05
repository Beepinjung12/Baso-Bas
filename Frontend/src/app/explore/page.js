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
    const res = await fetch(`${config.apiUrl}/api/rooms`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;

    return [];
  } catch {
    return [];
  }
}

export default async function ExplorePage() {
  const submittedRooms = await getSubmittedRooms();

  return (
    <ExploreClient
      popularCities={popularCities}
      submittedRooms={submittedRooms}
    />
  );
}