import ExploreClient from "./ExploreClient";

export const metadata = {
  title: "Explore Rooms | Basobas",
  description: "Find rooms and flats available for rent in Nepal.",
};

const popularCities = [
  {
    name: "Kathmandu",
    rooms: "1,280 rooms",
  },
  {
    name: "Pokhara",
    rooms: "860 rooms",
  },
  {
    name: "Chitwan",
    rooms: "520 rooms",
  },
  {
    name: "Lalitpur",
    rooms: "430 rooms",
  },
];

export default function ExplorePage() {
  return <ExploreClient popularCities={popularCities} />;
}