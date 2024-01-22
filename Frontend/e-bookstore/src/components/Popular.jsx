import React, { useState } from "react";

import Tabview1 from "./Tabview1";
import Tabview2 from "./Tabview2";
import Tabview3 from "./Tabview3";
import Tabview4 from "./Tabview4";
import Tabview5 from "./Tabview5";
import Tabview6 from "./Tabview6";

const Popular = () => {
  const [toggle, setToggle] = useState(1);

  console.log(toggle);
  const switchTab = (index) => {
    setToggle(index);
  };
  return (
    <section className="popular-books-container  bg-[#EDEBE4] py-5">
      <div className="popular-container">
        <div className="popular-title-container">
          <h2>Popular Books</h2>
        </div>
        <div className="tab-switch-btn">
          <button
            className={toggle === 1 ? "tabs active-tab" : "tabs"}
            onClick={() => switchTab(1)}
          >
            All Genres
          </button>
          <button
            className={toggle === 2 ? "tabs active-tab" : "tabs"}
            onClick={() => switchTab(2)}
          >
            Business
          </button>
          <button
            className={toggle === 3 ? "tabs active-tab" : "tabs"}
            onClick={() => switchTab(3)}
          >
            Technology
          </button>
          <button
            className={toggle === 4 ? "tabs active-tab" : "tabs"}
            onClick={() => switchTab(4)}
          >
            Romantic
          </button>
          <button
            className={toggle === 5 ? "tabs active-tab" : "tabs"}
            onClick={() => switchTab(5)}
          >
            Adventure
          </button>
          <button
            className={toggle === 6 ? "tabs active-tab" : "tabs"}
            onClick={() => switchTab(6)}
          >
            Fictional
          </button>
        </div>
        <div className="tab-container">
          <div className={toggle === 1 ? "content active-content" : "content"}>
            <Tabview1 />
          </div>
          <div className={toggle === 2 ? "content active-content" : "content"}>
            <Tabview2 />
          </div>
          <div className={toggle === 3 ? "content active-content" : "content"}>
            <Tabview3 />
          </div>
          <div className={toggle === 4 ? "content active-content" : "content"}>
            <Tabview4 />
          </div>
          <div className={toggle === 5 ? "content active-content" : "content"}>
            <Tabview5 />
          </div>
          <div className={toggle === 6 ? "content active-content" : "content"}>
            <Tabview6 />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
{
  /* <div className="popular-container">
        <div className="popular-title-container">
          <h2>Popular Books</h2>
        </div>
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
      </div> */
}
