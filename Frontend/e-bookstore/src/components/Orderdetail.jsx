import React, { useState } from "react";

const Orderdetail = () => {

  return (
    <>
      <div className="container border-t ml-8 mt-8 mb-8" style={{ maxWidth: "900px" }}>
        <h3 className="font-bold text-gray-900 p-2 mb-6" style={{ fontSize: "30px", fontFamily: "Prata", fontWeight: "700" }}>
          Order Detail
        </h3>

        <div className="max-w-lg mx-auto rounded-md  shadow-lg" style={{ maxWidth: "900px", backgroundColor: "#edebe4" }}>
          <table className="w-full ml-4" style={{ fontFamily: "Prata", fontWeight: "100", fontSize: "15px", overflowY: "auto" }}>
            <thead>
              <tr>
                <th>User</th>
                <th>Number</th>
                <th>Address</th>
                <th>Book</th>
                <th>Qnt</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bibhakta</td>
                <td>9813056161</td>
                <td>kalanki</td>
                <td>
                  <select style={{backgroundColor: "#edebe4"}}>
                    <option value="" style={{backgroundColor: "#edebe4"}}>The earth</option>
                    <option value="" style={{backgroundColor: "#edebe4"}}>The Nature</option>
                  </select>
                </td>
                <td>2</td>
                <td>$20</td>
                <td><input type="checkbox" name="" id="" /></td>
              </tr>
              <tr>
                <td>Rohan</td>
                <td>9815473757</td>
                <td>sitapaila</td>
                <td>
                  <select style={{backgroundColor: "#edebe4"}}>
                    <option value="" style={{backgroundColor: "#edebe4"}}>The earth</option>
                    <option value="" style={{backgroundColor: "#edebe4"}}>The Nature</option>
                  </select>
                </td>
                <td>2</td>
                <td>$40</td>
                <td><input type="checkbox" name="" id="" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="submit" className="h-8 w-14 mt-4 rounded text-white bg-black ">
          Save
        </button>
      </div>
    </>
  );
};

export default Orderdetail;
