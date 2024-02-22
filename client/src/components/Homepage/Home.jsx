import React from "react";
import HeroSection from "./HeroSection";
import HowitWork from "./HowitWork";
import PopularCategories from "./PopularCategories";

const Home = () => {
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowitWork />
        <PopularCategories />
      </section>
    </>
  );
};

export default Home;
