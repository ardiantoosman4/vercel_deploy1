import HeroLanding from "@/components/HeroLanding";
import HomeProduct from "@/components/HomeProduct";
import HomePromo from "@/components/HomePromo";
import Navbar from "@/components/Navbar";
import React from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroLanding />
      <HomePromo />
      <HomeProduct />
    </>
  );
}
