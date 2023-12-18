import React from "react";
import img1 from "../assets/product-item1.jpg";
import img2 from "../assets/product-item2.jpg";
import img3 from "../assets/product-item3.jpg";
import img4 from "../assets/product-item4.jpg";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const Featured = () => {
  return (
    <section className="featured-books-container mb-5">
      <div className="book-container">
        <div className="title-container">
          <h2 className="">Featured Books</h2>
        </div>
        <div className="featured-books py-12 gap-10 px-10 w-full">
          <div className="books flex flex-col justify-center items-center gap-1">
            <div className="border p-5 bg-[#EFEEE8] img-container">
              <img src={img1} alt="" />
              <button>Add to Cart</button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
                Simple Way of Piece Life
              </h3>
              <p className="m-0 font-[Segoe UI]">Armor Ramsey</p>
              <div className="text-[#74642f] text-lg">$ 40.00</div>
            </div>
          </div>
          <div className="books flex flex-col justify-center items-center gap-1">
            <div className="border p-5 bg-[#EFEEE8] img-container">
              <img src={img2} alt="" />
              <button>Add to Cart</button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
                Great Travel At Desert
              </h3>
              <p className="m-0 font-[Segoe UI]"> Sanchit Howdy</p>
              <div className="text-[#74642f] text-lg">$ 38.00</div>
            </div>
          </div>
          <div className="books flex flex-col justify-center items-center gap-1">
            <div className="border p-5 bg-[#EFEEE8] img-container">
              <img src={img3} alt="" />
              <button>Add to Cart</button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
                The Lady Beauty Scarlett
              </h3>
              <p className="m-0 font-[Segoe UI]">Arthur Doyle</p>
              <div className="text-[#74642f] text-lg">$ 45.00</div>
            </div>
          </div>
          <div className="books flex flex-col justify-center items-center gap-1">
            <div className="border p-5 bg-[#EFEEE8] img-container">
              <img src={img4} alt="" />
              <button>Add to Cart</button>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
                Once Upon A Time
              </h3>
              <p className="m-0 font-[Segoe UI]">Klien Marry</p>
              <div className="text-[#74642f] text-lg">$ 35.00</div>
            </div>
          </div>
        </div>
      </div>
      <div className="all-book-link flex justify-end items-center p-3 border-t-2">
        <Link
          to=""
          className="flex gap-3 justify-center items-center font-bold text-lg hover:text-[#74642f] transition ease-in "
        >
          View All Books <FaLongArrowAltRight />
        </Link>
      </div>
    </section>
  );
};

export default Featured;
