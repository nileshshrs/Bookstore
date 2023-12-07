import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/main-banner2.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";

const BestSelling = () => {
  return (
    <section className="bestselling my-12 py-24">
   
      <div className="w-[80%] mx-auto flex gap-5 justify-center items-center">
        <div className="">
          <img src={img1} alt="" />
        </div>
        <div className="flex flex-col gap-3 justify-center items-start px-4">
          <h2 className="">Best Selling Book</h2>
          <p className="text-[#74642f] text-lg">By Timbur Hood</p>
          <h3>Birds Gonna Be Happy</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam
            rem asperiores ab architecto ratione possimus, doloremque maiores
            laboriosam. Dolorem, earum.
          </p>
          <div className="text-lg font-bold text-[#74642f]">$ 45.00</div>
          <div className="">
            <Link to="" className="flex items-center justify-center gap-3 font-bold hover:text-[#74642f] transition ease-in text-lg">Shop it Now <FaLongArrowAltRight /></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
