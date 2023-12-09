import React from "react";
import Carousel from "./Carousels";
import Featured from "./Featured";
import BestSelling from "./BestSelling";
import Popular from "./Popular";

const Home = () => {
  return (
    <>
      <Carousel />
      <Featured />
      <BestSelling />
      <Popular />
    </>
  );
};

export default Home;
