import React from "react";
import Khalti from "../assets/khalti.png"

const Order = () => {
    
  return (
    <>
     <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[120px] h-[1024px] relative">
        <div className="w-[814px] h-[725px] left-[51px] absolute top-[194px] bg-[#edebe4]">
          <div className="absolute w-[393px] top-[21px] left-[20px] [font-family:'Roboto',Helvetica] font-semibold text-black text-[40px] tracking-[0] leading-[normal] whitespace-nowrap">
            Shipping Information
          </div>
        </div>
        <div className="w-[491px] h-[523px] left-[894px] absolute top-[194px] bg-[#edebe4]">
          <div className="absolute w-[81px] top-[467px] left-[386px] [font-family:'Roboto',Helvetica] font-light text-black text-[30px] tracking-[0] leading-[normal]">
            100
          </div>
          <div className="absolute w-[286px] top-[21px] left-[103px] [font-family:'Roboto',Helvetica] font-semibold text-black text-[40px] tracking-[0] leading-[normal] whitespace-nowrap">
            Order Summary
          </div>
          <div className="absolute w-[157px] top-[458px] left-[15px] [font-family:'Roboto',Helvetica] font-semibold text-black text-[40px] tracking-[0] leading-[normal] whitespace-nowrap">
            Subtotal
          </div>
          <div className="absolute top-[109px] left-[15px] [font-family:'Roboto',Helvetica] font-light text-black text-[35px] tracking-[0] leading-[normal] whitespace-nowrap">
            Items
          </div>
          <div className="absolute w-[157px] top-[190px] left-[15px] [font-family:'Roboto',Helvetica] font-light text-black text-[30px] tracking-[0] leading-[normal]">
            The Nature
          </div>
          <div className="w-[35px] left-[252px] absolute top-[190px] [font-family:'Roboto',Helvetica] font-light text-black text-[30px] tracking-[0] leading-[normal]">
            1
          </div>
          <div className="w-[81px] left-[389px] absolute top-[190px] [font-family:'Roboto',Helvetica] font-light text-black text-[30px] tracking-[0] leading-[normal]">
            100
          </div>
          <div className="absolute top-[109px] left-[205px] [font-family:'Roboto',Helvetica] font-light text-black text-[35px] tracking-[0] leading-[normal] whitespace-nowrap">
            Quantity
          </div>
          <div className="absolute top-[109px] left-[388px] [font-family:'Roboto',Helvetica] font-light text-black text-[35px] tracking-[0] leading-[normal] whitespace-nowrap">
            Price
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Order;
