import React from "react";
import Khalti from "../assets/khalti.png"

const Order = () => {
    
  return (
    <>
      <div className="container border-t mx-auto mt-8 mb-8" style={{ maxWidth: "800px"}}>
                
        <h3 className="text-lg font-bold text-gray-900 p-4">1. Order Summary</h3>
        <hr className="border-t border-gray-450" />
        <div
          className="max-w-lg mx-auto rounded-md overflow-hidden shadow-lg"
          style={{ maxWidth: "900px", backgroundColor: "#edebe4" }}
        >
          <h2 className="text-lg font-medium text-gray-900 p-4">
            <span className="flex justify-between">
              <span>Your Books</span>
              <span>Quantity</span>
              <span>Price</span>
            </span>
          </h2>

          <div className="max-h-[300px] overflow-y-auto  pl-2 pr-2">
            <div className="flex mb-3">
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className="">The nature</p>
                    <p className="">2</p>
                    <p className="">$ 200</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
