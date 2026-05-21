import Hero from "./components/home/Hero";
import Stats from "./components/home/Stats";
import Featured from "./components/home/Featured";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Featured />
    </main>
  );
}