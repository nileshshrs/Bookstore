import React, { useState } from "react";
import "../css/orderdetail.scss";

const Orderdetail = () => {
  const [status, setStatus] = useState("Pending");
  const [statusbtn, setStatusbtn] = useState("Complete");

  const handleCompleteClick = () => {
    setStatus(status === "Pending" ? "Completed" : "Pending");
    setStatusbtn(statusbtn === "Complete" ? "Pending" : "Complete");
  };


  return (
    <>
      <div className="container border-t ml-8 mt-8 mb-8" style={{ maxWidth: "900px" }}>
        <h3 className="font-bold text-gray-900 p-2 mb-6" style={{ fontSize: "30px", fontFamily: "Prata", fontWeight: "700" }}>
          Order Detail
        </h3>

        <div className="max-w-lg mx-auto rounded-md shadow-lg table-container" style={{ maxWidth: "900px", backgroundColor: "#edebe4" }}>
          <table className="w-full ml-4" style={{ fontFamily: "Prata", fontWeight: "100", fontSize: "15px" }}>
            <thead>
              <tr>
                <th className="p-2">User</th>
                <th className="p-2">Number</th>
                <th className="p-2">Address</th>
                <th className="p-2">Book</th>
                <th className="p-2">Qnt</th>
                <th className="p-2">Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{paddingBottom:"20px"}}>Bibhakta</td>
                <td style={{paddingBottom:"20px"}}>9813056161</td>
                <td style={{paddingBottom:"20px"}}>kalanki</td>
                <td style={{paddingBottom:"20px"}}>
                  <select style={{ backgroundColor: "#edebe4" }}>
                    <option value="" style={{ backgroundColor: "#edebe4" }}>The earth</option>
                    <option value="" style={{ backgroundColor: "#edebe4" }}>The Nature</option>
                  </select>
                </td>
                <td style={{paddingBottom:"20px"}}>2</td>
                <td style={{paddingBottom:"20px"}}>$20</td>
                <td style={{paddingBottom:"20px"}}>{status}</td>
                <td style={{paddingBottom:"20px"}}>
                  <button className="action-button rounded text-white bg-black p-1 w-12 mr-2">Edit</button>
                  <button className="action-button rounded text-white bg-black  p-1 mr-2 w-auto">Delete</button>
                  <button className="action-button rounded text-white bg-black p-1 w-auto" onClick={handleCompleteClick}>{statusbtn}</button>
                </td>
              </tr>

 
            </tbody>
          </table>
        </div>
      
      </div>
    </>
  );
};

export default Orderdetail;
