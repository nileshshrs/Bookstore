import React  from "react";


const Orderdetail = () => {
  
  return (
<>
<div className="container border-t ml-8 mt-8 mb-8" style={{ maxWidth: "900px"}}>
      <h3 className="font-bold text-gray-900 p-4" style={{ fontSize: "30px",fontFamily:"Prata",fontWeight:"700" }}>
        Order Detail
      </h3>
      <hr className="border-t border-gray-450" />

      <div className="max-w-lg mx-auto rounded-md overflow-hidden shadow-lg" style={{ maxWidth: "900px", backgroundColor: "#edebe4" }}>
        <h2 className="text-lg font-medium text-gray-900 p-4">
          <span className="flex justify-between">
            <span>User</span>
            <span>Number</span>
            <span>Address</span>
            <span>Book</span>
            <span>Qnt</span>
            <span>Price</span>
            <span>Status</span>
          </span>
        </h2>


      </div>
    </div>
</>
  );
};

export default Orderdetail;
