import React, { useEffect, useState } from "react";
import Img1 from "../assets/icon.png";
import "../css/orderdetail.scss";

const Userprofile = () => {
  const [activeTab, setActiveTab] = useState("UserProfile");
  const [userData, setUserData] = useState({ username: "", email: "" });

  useEffect(() => {
    // Fetch user data from localStorage or context/state
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      setUserData({
        username: storedUserData.username,
        email: storedUserData.email,
      });
    }
  }, []);

  //tab view
  const toggleTab = () => {
    setActiveTab(activeTab === "UserProfile" ? "OrderDetail" : "UserProfile");
  };

  return (
    <div className="flex items-center justify-center flex-col sm:flex-row ">
      {activeTab === "UserProfile" && (
        <div className="w-full p-4 sm:p-8 mt-4 mb-4 sm:w-1/2 lg:w-1/3 xl:w-1/4" style={{ maxWidth: "500px" }}>
          <div className="rounded shadow p-4 sm:p-6">
            <img
              src={Img1}
              alt="User"
              className="mx-auto mb-3 h-16 w-16 rounded-full object-cover"
            />
            <h2 className="font-bold mb-4 text-[15px] text-center">Hi, {userData.username}</h2>
            <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">
              Username
            </label>
            <div className="flex">
              <input
                disabled
                id="username"
                className="border-2 rounded-r px-4 py-2 w-full"
                type="text"
                value={userData.username}
              />
            </div>
            <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">
              Email
            </label>
            <input
              disabled
              id="email"
              className="border-2 rounded-r px-4 py-2 w-full"
              type="email"
              value={userData.email}
            />
            <span className="text-gray-600 pt-2 block sm:pt-4 opacity-70">
              Personal login information of your account
            </span>
            <button
              className="border px-3 py-2 mt-4 border-black bg-black text-white font-semibold rounded-md text-sm"
              type="submit"
            >
              Edit
            </button>
            <button
              disabled
              className="border ml-3 px-3 py-2 mt-4 border-black bg-black text-white font-semibold rounded-md text-sm"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {activeTab === "OrderDetail" && (
        <div className="w-full container border-t  mt-8 mb-8 sm:w-1/2 lg:w-2/3 xl:w-3/4 justify-center items-center" style={{ maxWidth: "900px" }}>
          <h3 className="font-bold text-gray-900 p-2 mb-6" style={{ fontSize: "30px", fontFamily: "Prata", fontWeight: "800" }}>
            Your Order
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
                  <td style={{ paddingBottom: "20px" }}>Bibhakta</td>
                  <td style={{ paddingBottom: "20px" }}>9813056161</td>
                  <td style={{ paddingBottom: "20px" }}>kalanki</td>
                  <td style={{ paddingBottom: "20px" }}>
                    <select style={{ backgroundColor: "#edebe4" }}>
                      <option value="" style={{ backgroundColor: "#edebe4" }}>The earth</option>
                      <option value="" style={{ backgroundColor: "#edebe4" }}>The Nature</option>
                    </select>
                  </td>
                  <td style={{ paddingBottom: "20px" }}>2</td>
                  <td style={{ paddingBottom: "20px" }}>$20</td>
                  <td style={{ paddingBottom: "20px" }}>status</td>
                  <td style={{ paddingBottom: "20px" }}>
                    <button className="action-button rounded text-white bg-black p-1 mr-2 w-auto">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

<div className="absolute top-0 right-0 p-4 mt-12">
        <button
          className="border px-3 py-2 border-black bg-black text-white font-semibold rounded-md text-sm"
          onClick={toggleTab}
        >
          {activeTab === "UserProfile" ? "Order Detail" : "User Profile"}
        </button>
      </div>
    </div>
  );
};

//using tab view
export default Userprofile;
