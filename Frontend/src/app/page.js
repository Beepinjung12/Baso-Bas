"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Hero from "./components/home/Hero";
import Stats from "./components/home/Stats";
import Featured from "./components/home/Featured";


export default function Home() {


  const router = useRouter();


  const [search,setSearch] = useState("");

  const [price,setPrice] = useState("Any price");



  function handleSearch(){

    router.push(
      `/explore?search=${search}&price=${price}`
    );

  }



  return (

    <main>

      <Hero
        search={search}
        setSearch={setSearch}
        price={price}
        setPrice={setPrice}
        handleSearch={handleSearch}
      />


      <Stats />

      <Featured />

    </main>

  );

}