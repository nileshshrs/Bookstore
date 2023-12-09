import React from "react";
import img1 from "../assets/tab-item1.jpg";
import img2 from "../assets/tab-item2.jpg";
import img3 from "../assets/tab-item3.jpg";
import img4 from "../assets/tab-item4.jpg";
import img5 from "../assets/tab-item5.jpg";
import img6 from "../assets/tab-item6.jpg";
import img7 from "../assets/tab-item7.jpg";
import img8 from "../assets/tab-item8.jpg";

const Tabview1 = () => {
  return (
    <div className="popular-books gap-10 px-10 w-full py-12">
      <div className="popularbooks flex flex-col justify-center items-center gap-1">
        <div className="img-container border p-5 bg-[#EFEEE8]">
          <img src={img1} alt="" />
          <button>Add to Cart</button>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
            Portrait Photography
          </h3>
          <p className="m-0 font-[Segoe UI]">Adam Silber</p>
          <div className="text-[#74642f] text-lg">$ 40</div>
        </div>
      </div>
      <div className="popularbooks flex flex-col justify-center items-center gap-1">
        <div className="img-container border p-5 bg-[#EFEEE8]">
          <img src={img2} alt="" />
          <button>Add to Cart</button>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
            Portrait Photography
          </h3>
          <p className="m-0 font-[Segoe UI]">Adam Silber</p>
          <div className="text-[#74642f] text-lg">$ 40</div>
        </div>
      </div>
      <div className="popularbooks flex flex-col justify-center items-center gap-1">
        <div className="img-container border p-5 bg-[#EFEEE8]">
          <img src={img3} alt="" />
          <button>Add to Cart</button>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
            Portrait Photography
          </h3>
          <p className="m-0 font-[Segoe UI]">Adam Silber</p>
          <div className="text-[#74642f] text-lg">$ 40</div>
        </div>
      </div>
      <div className="popularbooks flex flex-col justify-center items-center gap-1">
        <div className="img-container border p-5 bg-[#EFEEE8]">
          <img src={img4} alt="" />
          <button>Add to Cart</button>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
            Portrait Photography
          </h3>
          <p className="m-0 font-[Segoe UI]">Adam Silber</p>
          <div className="text-[#74642f] text-lg">$ 40</div>
        </div>
      </div>
      <div className="popularbooks flex flex-col justify-center items-center gap-1">
        <div className="img-container border p-5 bg-[#EFEEE8]">
          <img src={img5} alt="" />
          <button>Add to Cart</button>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
            Portrait Photography
          </h3>
          <p className="m-0 font-[Segoe UI]">Adam Silber</p>
          <div className="text-[#74642f] text-lg">$ 40</div>
        </div>
      </div>
      <div className="popularbooks flex flex-col justify-center items-center gap-1">
        <div className="img-container border p-5 bg-[#EFEEE8]">
          <img src={img6} alt="" />
          <button>Add to Cart</button>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
            Portrait Photography
          </h3>
          <p className="m-0 font-[Segoe UI]">Adam Silber</p>
          <div className="text-[#74642f] text-lg">$ 40</div>
        </div>
      </div>
      <div className="popularbooks flex flex-col justify-center items-center gap-1">
        <div className="img-container border p-5 bg-[#EFEEE8]">
          <img src={img7} alt="" />
          <button>Add to Cart</button>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
            Portrait Photography
          </h3>
          <p className="m-0 font-[Segoe UI]">Adam Silber</p>
          <div className="text-[#74642f] text-lg">$ 40</div>
        </div>
      </div>
      <div className="popularbooks flex flex-col justify-center items-center gap-1">
        <div className="img-container border p-5 bg-[#EFEEE8]">
          <img src={img8} alt="" />
          <button>Add to Cart</button>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
            Portrait Photography
          </h3>
          <p className="m-0 font-[Segoe UI]">Adam Silber</p>
          <div className="text-[#74642f] text-lg">$ 40</div>
        </div>
      </div>
    </div>
  );
};

export default Tabview1;
